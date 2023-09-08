/** @format */

import {
	Box,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import { mockSettingData } from "./MockData"; // 假資料
import { useMemo, useState } from "react";
import {
	Order,
	fixPaginationNumber,
	getComparator,
	stableSort,
} from "../../TableFunction";
import {
	GridCheck,
	TableCellComponent,
	TableStatusomponent,
} from "./EnhancedTableElement";

import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { formatTimestamp } from "../../../../constant/functionToolbox";
import { headCells } from "../../../../constant/interfaceBoard";


export interface IDeviceData {
	deviceId: string;
	innerIP: string;
	deviceName: string;
	address: string;
	groups: string;
}
interface IFormTable {
	tableData: IDeviceData[];
}

interface HeadCell {
	id: keyof IDeviceData;
	label: string;
  }

//   const headCells: readonly HeadCell[] = [
// 	{
// 	  id: 'deviceId',
// 	  label: '群組名稱',
// 	},
// 	{
// 	  id: 'amount',
// 	  label: '電腦數量',
// 	},
//   ];

// {
// 	"deviceId": "deviceIDNumber1",
// 	"innerIP": "192.168.10.1",
// 	"deviceName": "PC-1",
// 	"address": "AA-BB-C6-DD-EE-01",
// 	"groups": "group1, group2, group3,group1, group2, group3,group1, group2, group3"
//   },



const FormTable = (props: IFormTable) => {
	// const { control, fields } = props;
	const [selectedId, setSelectedId] = useState<readonly string[]>([]);
	const [orderBy, setOrderBy] = useState<keyof IDeviceData>("deviceId");
	const [order, setOrder] = useState<Order>("asc");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const dataQuery = mockSettingData.data;

	const handleRequestSort = (
		//排序方法
		event: React.MouseEvent<unknown>,
		property: keyof IDeviceData
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	// const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
	//     if (event.target.checked) {
	//         const newSelected = data.map((n) => n.deviceId);
	//         setSelectedId(newSelected);
	//         return;
	//     }
	//     setSelectedId([]);
	// };

	// const handleClick = (event: React.MouseEvent<unknown>, name: string) => { //表格單列排序
	//     const selectedIndex = selectedId.indexOf(name);
	//     let newSelected: readonly string[] = [];

	//     if (selectedIndex === -1) {
	//         newSelected = newSelected.concat(selectedId, name);
	//     } else if (selectedIndex === 0) {
	//         newSelected = newSelected.concat(selectedId.slice(1));
	//     } else if (selectedIndex === selectedId.length - 1) {
	//         newSelected = newSelected.concat(selectedId.slice(0, -1));
	//     } else if (selectedIndex > 0) {
	//         newSelected = newSelected.concat(
	//             selectedId.slice(0, selectedIndex),
	//             selectedId.slice(selectedIndex + 1),
	//         );
	//     }
	//     setSelectedId(newSelected);
	// };

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const pagNumArray = fixPaginationNumber(dataQuery.length);

	const isSelected = (name: string) => selectedId.indexOf(name) !== -1;

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataQuery.length) : 0;

	const visibleRows = useMemo(
		() =>
			stableSort(dataQuery, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[order, orderBy, page, rowsPerPage, dataQuery]
	);

	const searchRows = (searchedVal: string) => { //表格關鍵字搜索
	    const filteredRows = dataQuery.filter((row) => {
	        return Object.entries(row).some(([key, value]) => {
	            if (key === 'tableFinishTime' || key === 'ImageFinishTime' || key === 'scanFinishTime' || key === 'traceFinishTime') {
	                return formatTimestamp(value).includes(searchedVal);
	                // return value.toString().includes(searchedVal);
	            }
	            return value.toString().toLowerCase().includes(searchedVal.toLowerCase());
	        });
	    });
	    // setDataQuery(filteredRows);
	};

	return (
		<Box sx={{ width: 1000, backgroundColor:'#F5F5F5',marginLeft:'160px' }}>
				<EnhancedTableToolbar 
                    numSelected={999} 
                    // setDataQuery={setDataQuery} 
                    searchRows={searchRows} 
                    // originData={data} 
                    refreshLoading={false} 
                    activeFetch={false} 
                />
				<TableContainer sx={{ width:'95%', margin:'0px auto',backgroundColor:'white'  }}>
					<Table aria-labelledby="tableTitle" size={"medium"}>
						<EnhancedTableHead
							numSelected={5}
							order={order}
							orderBy={orderBy}
							// onSelectAllClick={handleSelectAllClick}
							// handleRequestSort={handleRequestSort}
							rowCount={dataQuery.length}
							headCells={headCells} // todo : fix
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
											{/* <GridCheck
												// control={control}
												name={row.deviceId}
												// field={fields[index]}
											/> */}
											<Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
										</TableCell>


										<TableCellComponent align="left">
											{row.innerIP}
										</TableCellComponent>
										<TableCellComponent align="left">
											{row.deviceName}
										</TableCellComponent>
										<TableCellComponent align="left">
											{row.address}
										</TableCellComponent>
										<TableCellComponent align="left">
											{row.groups}
										</TableCellComponent>
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 40 * emptyRows }}>
									<TableCell colSpan={visibleRows.length} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					sx={{ width:'95%', margin:'5px auto',backgroundColor:'white'  }}
					rowsPerPageOptions={[
						...pagNumArray,
						{ label: "全部", value: -1 },
					]}
					component="div"
					count={dataQuery.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
		</Box>
	);
};

export default FormTable;
