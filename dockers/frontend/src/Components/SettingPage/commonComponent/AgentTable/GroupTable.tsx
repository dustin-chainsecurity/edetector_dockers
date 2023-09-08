/** @format */

import React, { useEffect, useMemo, useState } from "react";
import {
	Order,
	fixPaginationNumber,
	getComparator,
	stableSort,
} from "../../../CommonConponents/TableFunction";
import { formatTimestamp } from "../../../../constant/functionToolbox";
import { Box, Checkbox, List, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import FormDialog from "./FormDialog";
import EnhancedTableHead from "./EnhancedTableHead";
import { TableCellComponent } from "../../../CommonConponents/FormInput/FormTable/EnhancedTableElement";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { axiosClient } from "../../../../utiles/ProtectedRoutes";
import { range } from "ramda";
import EditIcon from '@mui/icons-material/Edit';
import { useAlert } from "../../../../hooks/useAlert";
import { table } from "console";

export interface IGroupData {
	name: string;
	id: number;
	amount: number;
}

interface IGroupTable {
	tableData: IGroupData[];
	selectedId: number[];
	setSelectedId: React.Dispatch<React.SetStateAction<number[]>>
	setRenewTable: React.Dispatch<React.SetStateAction<boolean>>;
	renewTable: boolean;
}

interface HeadCell {
	id: keyof IGroupData;
	label: string;

}

const headCells: readonly HeadCell[] = [
	{
		id: 'name',
		label: '群組名稱',
	},
	{
		id: 'amount',
		label: '電腦數量',
	},
];


const GroupTable = (props: IGroupTable) => {
	const alert = useAlert().showAlert;
	const { tableData, selectedId, setSelectedId, setRenewTable, renewTable } = props;
	// const [selectedId, setSelectedId] = useState<readonly string[]>([]);
	const [orderBy, setOrderBy] = useState<keyof IGroupData>("name");
	const [order, setOrder] = useState<Order>("asc");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(-1);

	useEffect(() => {
		setRowsPerPage(tableData.length)
	}, [tableData])


	const handleRequestSort = (
		//排序方法
		event: React.MouseEvent<unknown>,
		property: keyof IGroupData
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
	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = tableData?.map((n) => n.id);
			setSelectedId(newSelected);
			return;
		} else {
			setSelectedId([]);
		}

	}

	const pagNumArray = fixPaginationNumber(tableData.length);

	const isSelected = (name: number) => selectedId.indexOf(name) !== -1;

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

	const visibleRows = useMemo(
		() => {
			if (rowsPerPage === -1) {
				return stableSort(tableData, getComparator(order, orderBy))
			}
			else {
				return stableSort(tableData, getComparator(order, orderBy)).slice(
					page * rowsPerPage,
					page * rowsPerPage + rowsPerPage
				)
			}
		},
		[order, orderBy, page, rowsPerPage, tableData]
	);

	const searchRows = (searchedVal: string) => {
		//表格關鍵字搜索
		const filteredRows = tableData.filter((row) => {
			return Object.entries(row).some(([key, value]) => {
				if (
					key === "tableFinishTime" ||
					key === "ImageFinishTime" ||
					key === "scanFinishTime" ||
					key === "traceFinishTime"
				) {
					return formatTimestamp(value).includes(searchedVal);
					// return value.toString().includes(searchedVal);
				}
				return value
					.toString()
					.toLowerCase()
					.includes(searchedVal.toLowerCase());
			});
		});
		// setDataQuery(filteredRows);
	};

	const addGroup = async (input: string) => {
		console.log(input)
		const res = await axiosClient.post('http://192.168.200.161:5000/group/add', {
			name: input,
		}).then((res) => {
			setRenewTable(true)
			console.log(res)
		})
	}

	const deleteGroups = async () => {
		const totalCount = selectedId.length
		let successCount = 0

		for (let i = 0; i < selectedId?.length; i++) {
			const res = await axiosClient.delete(`http://192.168.200.161:5000/group/${selectedId[i]}`,)
				.then((res) => {
					successCount++
					console.log(res)
				})
			if (selectedId.length === successCount) {
				alert(`成功刪除${totalCount}筆群組`)
				setRenewTable(true)
				setSelectedId([])
			}
		}
	}
	// todo : fix width
	const editGroup = async () => {
		console.log("edit")
	}

	return (
		<Box sx={{ width: '300px', backgroundColor: '#F5F5F5', padding: '10px' }}>
			{/* <EnhancedTableToolbar
				numSelected={999}
				// setDataQuery={setDataQuery} 
				searchRows={searchRows}
				// originData={data} 
				refreshLoading={false}
				activeFetch={false}
			/> */}
			<div style={{ height: 74 }}>
				<div>
					清單群組
				</div>
				<div style={{ display: "flex", float: "right" }}>
					<FormDialog
						titleText="新增群組"
						inputLable="新增群組名稱"
						confirmText="確認"
						cancelText="取消"
						icon={<AddIcon />}
						confirmAction={addGroup}
					/>
					<FormDialog
						titleText="刪除群組"
						// inputLable=""
						confirmText="確認"
						cancelText="取消"
						cancelAlert="請確認是否刪除群組"
						icon={<DeleteIcon />}
						selectedGroup={selectedId}
						confirmAction={deleteGroups}
					/>
				</div>
			</div>
			<TableContainer sx={{ width: '95%', height: "400px", margin: '0px auto', backgroundColor: 'white', overflowX: "hidden" }}>
				<Table aria-labelledby="tableTitle" size={"medium"}>
					<EnhancedTableHead
						numSelected={selectedId.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestGroupDataSort={handleRequestSort}
						rowCount={tableData.length}
						headCells={headCells}
						isGroupFilterOpen={false}
						setIsGroupFilterOpen={() => { }}
					/>
					<TableBody>
						{visibleRows.map((row, index) => {
							// const genId = `${row.name}${index}`
							const genId = row.id;
							const isItemSelected = isSelected(row.id);
							const labelId = `enhanced-table-checkbox-${index}`;
							return (
								<TableRow
									hover
									role="checkbox"
									// aria-checked={isItemSelected}
									tabIndex={-1}
									key={genId}
									// selected={isItemSelected}
									sx={{ cursor: "pointer" }}
								>
									<TableCell padding="checkbox">
										<Checkbox
											color="primary"
											checked={isItemSelected}
											inputProps={{ 'aria-labelledby': labelId }}
											onChange={() => {
												console.log(genId)
												if (isItemSelected) {
													setSelectedId(selectedId.filter((id) => id !== genId))
												} else {
													setSelectedId([...selectedId, genId])
												}
											}}
										/>
									</TableCell>
									<TableCellComponent align="left" minWidth="80px">
										{row.name}
									</TableCellComponent>

									<TableCellComponent align="left" minWidth="80px">
										<Box sx={{ display: "flex", alignItems: "center" }}>
											{row.amount}

											<Stack direction="row" justifyContent={"right"} width={"100%"}>
												<IconButton
													onClick={editGroup}
												// todo : fix hover 
												>
													<EditIcon fontSize="small" />
												</IconButton>
											</Stack>

										</Box>

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
			{/* <TablePagination
					sx={{ width:'95%', margin:'5px auto',backgroundColor:'white'  }}
					rowsPerPageOptions={[
						...pagNumArray,
						{ label: "全部", value: -1 },
					]}
					component="div"
					count={tableData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/> */}
		</Box >
	);
};

export default GroupTable;
