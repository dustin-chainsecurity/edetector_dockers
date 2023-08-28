import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";

interface EnhancedTableProps {
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	numSelected: number;
	rowCount: number;
}

interface IPDataType {
	IPRange: string;
}

interface DetectGrid_HeadCell {
	id: keyof IPDataType;
	label: string;
}

const headCells: readonly DetectGrid_HeadCell[] = [
	{
		id: "IPRange",
		label: "IP範圍",
	},
];

export const EnhancedTableHead = (props: EnhancedTableProps) => {

	const { onSelectAllClick, numSelected, rowCount } = props;
	return (
		<TableHead>
			<TableRow style={{ whiteSpace: "pre-line" }}>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							"aria-label": "select all desserts",
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={
							headCell.id +
							(Math.floor(Math.random() * 1000) + 1).toString()
						}
						align="left"
						// padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};