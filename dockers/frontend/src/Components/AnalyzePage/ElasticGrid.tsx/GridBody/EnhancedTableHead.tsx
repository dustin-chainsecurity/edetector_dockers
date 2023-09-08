/** @format */

// import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { visuallyHidden } from '@mui/utils';
// import { useEffect, useState } from "react";

import {
	Box,
	Checkbox,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

interface EnhancedTableProps {
	columnName: string[];
	selectedIndexCount: number;
	excludeProperties: string[];
	importantFourProperties: string[];
	sizeRef: (node: HTMLDivElement | null) => void;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
	const {
		columnName,
		selectedIndexCount,
		excludeProperties,
		importantFourProperties,
		sizeRef,
	} = props;
	const [reList, setReList] = useState<string[]>([]);

	useEffect(() => {
		if (selectedIndexCount === 1) {
			const filteredColumns = columnName.filter(
				(item) => !excludeProperties.includes(item)
			); // 這兩個變數不需要被印出來
			const newArr = capitalizeFirstWord(filteredColumns);
			setReList(newArr);
		} else {
			const filteredColumns = importantFourProperties.filter((item) =>
				columnName.includes(item)
			);
			const newArr = capitalizeFirstWord(filteredColumns);
			setReList(newArr);
		}
		// const filteredColumns = columnName.filter((item) => item !== 'uuid' && item !== 'index'); // 這兩個變數不需要被印出來
		// const newArr = capitalizeFirstWord(filteredColumns)
		// setReList(newArr)
	}, [columnName]);

	return (
		<TableHead sx={{ width: "100%" }}>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox />
				</TableCell>

				{reList.map((headCell, idx) => (
					<TableCell
						key={`${idx}headcell`}
						align="left"
						id={`tablesortlabel-${idx}`}
						ref={sizeRef}
					// sx={{ width: "200px" }}
					>
						<TableSortLabel
							sx={{ width: "200px" }}
						// active={orderBy === headCell.id}
						// direction={orderBy === headCell.id ? order : 'asc'}
						// IconComponent={ArrowDropDownIcon}
						// onClick={createSortHandler(headCell.id)}
						>
							<span
								style={{
									fontWeight: "bold",
								}}
							>
								{headCell}
							</span>
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default EnhancedTableHead;

function capitalizeFirstWord(arr: string[]) {
	return arr.map((str) => {
		const regex = /^[A-Za-z]+/;
		const match = str.match(regex);
		if (match) {
			const firstWord = match[0];
			const capitalizedWord =
				firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
			return str.replace(regex, capitalizedWord);
		} else {
			return str;
		}
	});
}
