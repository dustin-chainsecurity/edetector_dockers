/** @format */

import { useContext, useRef, useState } from "react";
import { IFormatedDevice } from "../../../../constant/interfaceBoard";
import { Order } from "../../../../constant/TableInterfaces";
import { DetectContext } from "../../../../AppContext/DetectProvider";
import {
	Box,
	Checkbox,
	MenuItem,
	Select,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { ChildMenuItem } from "../../../CommonConponents/AnchorMenu/AnchorMenu";

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof IFormatedDevice
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
	groups: string[];
	setGroups: React.Dispatch<React.SetStateAction<string[]>>;
	groupsMenu: string[];
	// render groups list
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
	const { dectectiveHead } = useContext(DetectContext);
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
		groups,
		setGroups,
		groupsMenu,
	} = props;

	// control filter menu

	const createSortHandler =
		(property: keyof IFormatedDevice) =>
		(event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	const handleDirectionType = (id: keyof IFormatedDevice) => {
		if (orderBy === id) {
			return order;
		} else if (id === "groups") {
			return "desc";
		} else {
			return "desc";
		}
	};

	return (
		<TableHead>
			<TableRow style={{ whiteSpace: "pre-line" }}>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							"aria-label": "select all desserts",
						}}
					/>
				</TableCell>
				{dectectiveHead.map((headCell, id) => (
					<TableCell
						key={`${headCell.id}-${id}`}
						align="left"
						sortDirection={orderBy === headCell.id ? order : false}
						onClick={
							headCell.id === "groups"
								? () => {}
								: createSortHandler(headCell.id)
							// openFilterHandler
						}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={handleDirectionType(headCell.id)}
							hideSortIcon={headCell.id === "groups"}
							IconComponent={ArrowDropDownIcon}
						>
							{headCell.label}
							{/* filter drop */}
							{headCell.id === "groups" &&
								groupsMenu !== undefined && (
									<Select
										MenuProps={{
											transformOrigin: {
												vertical: "center",
												horizontal: "center",
											},
										}}
										IconComponent={FilterAltIcon}
										value={
											(groupsMenu.length === 0) ? '' : groupsMenu
										}
										sx={{
											boxShadow: "none",
											".MuiOutlinedInput-notchedOutline":
												{
													border: 0,
												},
											"&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
												{
													border: 0,
												},
											"&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
												{
													border: 0,
												},
										}}
									>
										{groupsMenu.length > 0 && (
											groupsMenu.map((item, idx) => {
												return (
													<ChildMenuItem
														title={item}
														key={`${item}-${idx}`}
														groups={groups}
														setGroups={setGroups}
													/>
												);
											})
										)}
									</Select>
								)}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default EnhancedTableHead;
