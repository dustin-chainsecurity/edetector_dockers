import { Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableHead } from "./EnhancedTableHead";

interface IIPTable {
	IPData: string[][];
	selectedId: readonly string[];
	setSelectedId: React.Dispatch<React.SetStateAction<readonly string[]>>;
}

export const IPTable = (props: IIPTable) => {
	const { IPData, selectedId, setSelectedId } = props;

	// const dataQuery = mockSettingData.data;

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
	    if (event.target.checked) {
	        const newSelected = IPData.map((n, i) => `${n[0]}${n[1]}${i}`);
	        console.log(newSelected)
			setSelectedId(newSelected);
	        return;
	    }
	    setSelectedId([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, name: string) => { //表格單列排序
	    const selectedIndex = selectedId.indexOf(name);
	    let newSelected: readonly string[] = [];

	    if (selectedIndex === -1) {
	        newSelected = newSelected.concat(selectedId, name);
	    } else if (selectedIndex === 0) {
	        newSelected = newSelected.concat(selectedId.slice(1));
	    } else if (selectedIndex === selectedId.length - 1) {
	        newSelected = newSelected.concat(selectedId.slice(0, -1));
	    } else if (selectedIndex > 0) {
	        newSelected = newSelected.concat(
	            selectedId.slice(0, selectedIndex),
	            selectedId.slice(selectedIndex + 1),
	        );
	    }
	    setSelectedId(newSelected);
	};

	const isSelected = (name: string) => selectedId.indexOf(name) !== -1;

	return (
		<div style={{ width: "100%" }}>
			<Box
				sx={{
					width: 400,
					backgroundColor: "#F5F5F5",
					marginLeft: "160px",
				}}
			>
				<EnhancedTableToolbar numSelected={selectedId.length} />
				<TableContainer
					sx={{
						width: "95%",
						margin: "0px auto",
						backgroundColor: "white",
						maxHeight: "500px",
						overflow: "scroll",
					}}
				>
					<Table aria-labelledby="tableTitle" size={"medium"}>
						<EnhancedTableHead
							onSelectAllClick={handleSelectAllClick}
							numSelected={selectedId.length}
							rowCount={IPData.length}
						/>
						<TableBody>
							{IPData.map((row, index) => {
								const labelId = `${row[0]}${row[1]}${index}`;
								const isItemSelected = isSelected(labelId);
							
								return (
									<TableRow
										hover
										role="checkbox"
										aria-checked={isItemSelected}
										onClick={(event) => handleClick(event, labelId)}
										tabIndex={-1}
										key={`${row[0]}${row[1]}${index}`}
										selected={isItemSelected}
										sx={{ cursor: "pointer" }}
									>
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												checked={isItemSelected}
												inputProps={{
													"aria-labelledby": labelId,
												}}
											/>
										</TableCell>

										<TableCell align="left">
											{`${row[0]} - ${row[1]}`}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<div style={{ width: "100%", height: 10 }}></div>
			</Box>
		</div>
	);
};