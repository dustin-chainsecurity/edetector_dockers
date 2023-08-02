import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableRow } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { IGenerateGroup, oneHostData } from "../../../../../constant/interfaceBoard";
import EnhancedTableHead from "./EnhancedTableHead";
import { IdIdentify } from "../GroupDropDown";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { descendingComparator, getComparator, stableSort } from "../..";
import { Order } from "../../../../../constant/TableInterfaces";


interface GroupGridProps {
    allData: IGenerateGroup[]
    data: oneHostData[]
    selectedHost: string
    setSelectedHost: React.Dispatch<React.SetStateAction<string>>
    selectedId: readonly string[]
    setSelectedId: React.Dispatch<React.SetStateAction<readonly string[]>>
    handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const GroupGrid = (props: GroupGridProps) => {
    const { data, selectedHost, selectedId, setSelectedId, handleSelectAllClick } = props
    const [order, setOrder] = useState<Order>('asc'); // the order of table
    const [orderBy, setOrderBy] = useState<keyof oneHostData>('ip'); // the origin order of table
    const [dataQuery, setDataQuery] = useState<oneHostData[]>(data);
    //render data by choosen group

    useEffect(() => {
        setDataQuery(data)
    }, [data])

    const handleRequestSort = ( //排序方法
        event: React.MouseEvent<unknown>,
        property: keyof oneHostData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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


    const visibleRows = useMemo(
        () =>
            stableSort(dataQuery, getComparator(order, orderBy)).slice(
                0,
                dataQuery.length + 1,
            ),
        [order, orderBy, selectedHost, dataQuery],
    );

    useEffect(() => {
        console.log(visibleRows);
    }, [visibleRows])

    const searchRows = (searchedVal: string) => { //表格關鍵字搜索
        const filteredRows = dataQuery.filter((row) => {
            return Object.entries(row).some(([key, value]) => {
                return value.toString().toLowerCase().includes(searchedVal.toLowerCase());
            });
        });
        setDataQuery(filteredRows);
    };

    return (
        <Box sx={{ width: '80%', backgroundColor: '#F5F5F5', marginRight: 1, padding: 2 }}>
            <EnhancedTableToolbar pageData={data} selectedHost={selectedHost} selectedId={selectedId} searchRows={searchRows} setDataQuery={setDataQuery} />
            <Paper sx={{ width: '100%', mb: 2 }}>

                <TableContainer>
                    <Table
                        sx={{ minWidth: 450 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >

                        <EnhancedTableHead
                            pageData={data}
                            selectedId={selectedId}
                            numSelected={selectedId.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                            selectedHost={selectedHost}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer', }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCellComponent align='left'>{row.ip}</TableCellComponent>
                                        <TableCellComponent align='left'>{row.name}</TableCellComponent>
                                        <TableCellComponent align='left'>{row.macAddress}</TableCellComponent>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default GroupGrid



interface TableCellComponentProps extends TableCellProps {
    align?: "inherit" | "left" | "center" | "right" | "justify";
    children: React.ReactNode;
}

const TableCellComponent = ({ align = "left", children, ...other }: TableCellComponentProps) => {
    return (
        <TableCell
            style={{ whiteSpace: "pre-line", padding: 0 }}
            align={align}
            {...other}
        >
            {children}
        </TableCell>
    );
}




