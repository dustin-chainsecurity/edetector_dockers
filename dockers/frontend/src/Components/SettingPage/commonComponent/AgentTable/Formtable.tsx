import { Box, Stack, Button, TableContainer, Table, TableBody, TableRow, TableCell, Checkbox, TablePagination } from "@mui/material";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { urlRoot, API } from "../../../../constant";
import { axiosClient } from "../../../../utiles/ProtectedRoutes";
import { TableCellComponent } from "../../../CommonConponents/FormInput/FormTable/EnhancedTableElement";
import EnhancedTableHead from "./EnhancedTableHead";
import { Order, stableSort, getComparator } from "../../../CommonConponents/TableFunction";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { IGroupData } from "./GroupTable";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { fixPaginationNumber } from "../../../../constant/functionToolbox";
// used in table component
export interface IDeviceData {
	deviceId: string;
	innerIP: string;
	deviceName: string;
	address: string;
	groups: string;
}

interface HeadCell {
	id: keyof IDeviceData;
	label: string;
}
interface IResponse {
	data: { [x: string]: any }
	isSuccess: boolean;
	groups?: { [x: string]: any }
}
interface IFormTable {
	groupData?: IResponse | undefined;
	defaultData?: IResponse | undefined;
	fetchGroupDetail?: UseMutationResult<AxiosResponse<any, any>, any, void, unknown>
	setGroupTableData: React.Dispatch<React.SetStateAction<IGroupData[]>>
	setTableData: React.Dispatch<React.SetStateAction<IDeviceData[]>>;
	tableData: IDeviceData[];
	selectedGroupList: number[];
	defaultAgentData?: IResponse | undefined;
	selectedId: string[];
	setSelectedId: React.Dispatch<React.SetStateAction<string[]>>;
	buttonComponent?: () => JSX.Element;
	setRenewTable: React.Dispatch<React.SetStateAction<boolean>>;
	showGroup: boolean;
}

const headCells:  HeadCell[] = [
	{
		id: 'innerIP',
		label: '電腦內部IP',
	},
	{
		id: 'deviceName',
		label: '電腦名稱',
	},
	{
		id: 'address',
		label: 'MAC Address',
	},
	{
		id: 'groups',
		label: '所屬群組',
	}
];

const Formtable = (props: IFormTable) => {
	const { tableData, selectedGroupList, selectedId, setSelectedId, buttonComponent,showGroup } = props;
	// const [selectedId, setSelectedId] = useState<string[]>([]);
	const [orderBy, setOrderBy] = useState<keyof IDeviceData>("innerIP");
	const [order, setOrder] = useState<Order>("asc");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [dataQuery, setDataQuery] = useState<string>("");
	const [searchKeywordList, setSearchKeywordList] = useState<string[]>([])
	const excludeColumns = ["groups", "deviceId"]   // 濾掉不搜尋的欄位
	const [filtedRows, setFiltedRows] = useState<IDeviceData[]>([])
	const [filterGroupList, setFilterGroupList] = useState<string[]>([])
	const [selectedGroupsInFilter, setSelectedGroupsInFilter] = useState<string[]>([])
	const mainTableWidth = showGroup? "auto":"100%"
	const [isGroupFilterOpen, setIsGroupFilterOpen] = useState<boolean>(false)

	const pagNumArray = fixPaginationNumber(dataQuery.length);
	// 控制圖表顯示資訊，加入搜尋及篩選功能
	//
	useEffect(() => {
		const keywordLisy = searchKeywordList
		console.log("tableData", tableData)
		let filtedTableData: IDeviceData[] = []
		// 如果有關鍵字，進行過濾
		// 比對tableData每行的每個欄位與關鍵字列表是否有符合
		keywordLisy.length === 0 ?
			filtedTableData = tableData :
			filtedTableData = filterSearchKeyWords(keywordLisy, tableData, excludeColumns)
		// 檢查是否有勾選過濾群組
		selectedGroupsInFilter.length === 0 ?
			filtedTableData = filtedTableData :
			filtedTableData = generateFiltedList(filtedTableData, selectedGroupsInFilter)
		//todo 如果有群組，進行過濾
		console.log("filtedTableData", filtedTableData)
		setFiltedRows(filtedTableData)  // 更新過濾後列表內容
		setPage(0)  // 重置頁數
		setFilterGroupList( generateGroupsListInTable(tableData))

	}, [searchKeywordList, tableData, selectedGroupsInFilter])



	const visibleRows:IDeviceData[] = useMemo(
		() => {
			if (rowsPerPage === -1) {
				return stableSort(filtedRows, getComparator(order, orderBy))
			}
			else {
				return stableSort(filtedRows, getComparator(order, orderBy)).slice(
					page * rowsPerPage,
					page * rowsPerPage + rowsPerPage
				)
			}
		},
		[order, orderBy, page, rowsPerPage, tableData, filtedRows, searchKeywordList]
	);


	//// 下方程式用來控制圖表上的排序及勾選功能
	// 搜尋時勾選清單清空
	useEffect(() => {
		setSelectedId([])
	}, [searchKeywordList, selectedGroupsInFilter])

	const handleSelectAllAgentClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		const allAgentList = filtedRows.map((n) => n.deviceId);
		console.log(allAgentList)
		if (event.target.checked) {
			setSelectedId(allAgentList); // get an array of all the ID
		} else {
			setSelectedId([]);
		}
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name: string) => selectedId.indexOf(name) !== -1;
	
	const handleRequestSort = (
		//排序方法
		event: React.MouseEvent<unknown>,
		property: keyof IDeviceData
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};


	// todo : fix width startIcon
	return (
		<Box sx={{ width: mainTableWidth,height:"calc(100%-50px)", backgroundColor: '#F5F5F5', padding: '10px', borderRight: "solid", borderColor: "white", borderWidth: "10px" }}>
			{/* <div style={{ backgroundColor: "red", display: "flex", float: "right" }}> */}

			<Stack
				alignItems={"center"}
				height={80}
				marginLeft={3}
				marginRight={3}
				direction="row" >
				<div style={{ width: 150 }}>
					已勾選{selectedId.length}
				</div>

				<EnhancedTableToolbar
					numSelected={999}
					setDataQuery={setDataQuery}
					originData={""}
					refreshLoading={false}
					activeFetch={false}
					searchKeywordList={searchKeywordList}
					setSearchKeywordList={setSearchKeywordList}
					setSelectedId={setSelectedId}
				/>
				{buttonComponent?.()}
			</Stack>

			<TableContainer sx={{ width: '95%', margin: '0px auto', backgroundColor: 'white',height:350 }}>  {/* 如果要改成全部展開不要scroll更改 height:"calc(90%-80px)" */}
				<Table aria-labelledby="tableTitle" size={"medium"}>
					<EnhancedTableHead
						numSelected={selectedId.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllAgentClick}
						onRequestAgentSort={handleRequestSort}
						rowCount={filtedRows.length}
						headCells={headCells}
						filterGroupList={filterGroupList}
						selectedGroupsInFilter={selectedGroupsInFilter}
						setSelectedGroupsInFilter={setSelectedGroupsInFilter}
						isGroupFilterOpen={isGroupFilterOpen}
						setIsGroupFilterOpen={setIsGroupFilterOpen}
					/>
					<TableBody>
						{visibleRows.map((row, index) => {
							const isItemSelected = isSelected(row.deviceId);
							const labelId = `enhanced-table-checkbox-${index}`;

							return (
								<TableRow
									hover
									role="checkbox"
									// aria-checked={isItemSelected}
									tabIndex={-1}
									key={row.deviceId}
									// selected={isItemSelected}
									sx={{ cursor: "pointer" }}
								>
									<TableCell padding="checkbox">
										<Checkbox
											color="primary"
											checked={isItemSelected}
											inputProps={{ 'aria-labelledby': labelId }}
											onChange={(event) => {
												console.log(row.deviceId)
												if (event.target.checked) {
													setSelectedId([...selectedId, row.deviceId]);
												} else {
													setSelectedId(selectedId.filter((id) => id !== row.deviceId));
												}
											}}
										/>
									</TableCell>
									<TableCellComponent align="left" minWidth="80px" >
										{row.innerIP}
									</TableCellComponent>
									<TableCellComponent align="left" minWidth="80px">
										{row.deviceName}
									</TableCellComponent>
									<TableCellComponent align="left" minWidth="80px">
										{row.address}
									</TableCellComponent>
									<TableCellComponent align="left" minWidth="80px">
										{row.groups}
									</TableCellComponent>
								</TableRow>
							);
						})}
						{/* {emptyRows > 0 && (
							<TableRow style={{ height: 40 * emptyRows }}>
								<TableCell colSpan={visibleRows.length} />
							</TableRow>
						)} */}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				sx={{ width: '95%', margin: '5px auto', backgroundColor: 'white' }}
				rowsPerPageOptions={[
					{ label: "全部", value: -1 },
					5, 10, 25
				]}
				component="div"
				count={filtedRows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
};

export default Formtable;


function filterSearchKeyWords( searchKeywordList: string[], initTableList: IDeviceData[],excludeColumns:string[] ) {
	const keywordLisy = searchKeywordList
	let filtedTableData: IDeviceData[] = []
	// 如果有關鍵字，進行過濾
	// 比對tableData每行的每個欄位與關鍵字列表是否有符合
	keywordLisy.length === 0 ?
		filtedTableData = initTableList :
		initTableList.map((row) => {
			let matchKeywordCount = 0
			searchKeywordList.map((keyword) => {
				let isRowMatchThisKeyword = false
				Object.entries(row).some(([key, value]) => {
					if (value.toString().toLowerCase().includes(keyword.toLowerCase()) && !excludeColumns.includes(key)) {
						isRowMatchThisKeyword = true
					}
				})
				if (isRowMatchThisKeyword) { matchKeywordCount++ }
			})
			if (matchKeywordCount === keywordLisy.length) { filtedTableData.push(row) }
		})
	return filtedTableData	
}

function generateGroupsListInTable(filtedListBySearchKeyword:IDeviceData[]){
	const groupsList:string[] = []
	filtedListBySearchKeyword.map((row)=>{
		row.groups.split(",").map((group)=>{
			if(!groupsList.includes(group)){
				groupsList.push(group)
			}
		})
	})
	return groupsList

}


function generateFiltedList(inputList :IDeviceData[],selectedGroupsInFilter:string[] = []){
	const filtedList:IDeviceData[] = []
	inputList.map((row)=>{
		let isRowMatchThisGroup = false
		row.groups.split(",").some((group) => {
			if (selectedGroupsInFilter.includes(group)) {
				isRowMatchThisGroup = true
			}
		})
		if(isRowMatchThisGroup){
			filtedList.push(row)
		}
	})
	return filtedList
}