import { IFormatedDevice, DetectGrid_HeadCell } from '../../../../constant/interfaceBoard'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TvIcon from '@mui/icons-material/Tv';
import UnCheck from '../../../../assets/UnCheck.svg';
import { TableStatusomponent, TableCellComponent, ConditionCellcomponent } from './TableCell/TableCellComponent';
import { useContext, useEffect, useMemo, useState } from 'react';
import { fixPaginationNumber, formatTimestamp, getStringLength, mergeObjects } from '../../../../constant/functionToolbox';
import { EnhancedTableToolbar } from '../EnhancedTableToolbar';
import { DetectContext } from '../../../../AppContext/DetectProvider';
import EnhancedTableHead from './EnhancedTableHead';

interface GridTableProps {
    data: IFormatedDevice[];
    connectData: IFormatedDevice[];
    refreshLoading: boolean;
    activeFetch: boolean;
}

type Order = 'asc' | 'desc';

const CheckIcon = <div style={{ width: 22, height: 22 }}><CheckCircleIcon style={{ color: '#2E7D32' }} /></div>
const UnCheckIcon = <div style={{ width: 22, height: 22 }}><img style={{ width: '100%' }} src={UnCheck} alt="UnCheck" /></div>

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const GridTable = ({ data, connectData, refreshLoading, activeFetch }: GridTableProps) => {
    const { selectedId, setSelectedId } = useContext(DetectContext);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof IFormatedDevice>('deviceId');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dataQuery, setDataQuery] = useState<IFormatedDevice[]>(data);


    useEffect(() => {

        if (connectData.length > 0) {
            setDataQuery(connectData);
        }
        else {
            setDataQuery(data);
        }
    }, [data, connectData]) //這個感覺會壞掉


    const handleRequestSort = ( //排序方法
        event: React.MouseEvent<unknown>,
        property: keyof IFormatedDevice,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.deviceId);
            // console.log(newSelected);
            setSelectedId(newSelected);
            return;
        }
        setSelectedId([]); //感覺這裡壞了
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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const pagNumArray = fixPaginationNumber(dataQuery.length)

    const isSelected = (name: string) => selectedId.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(dataQuery, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, dataQuery],
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
        setDataQuery(filteredRows);
    };

    return (
        <Box sx={{ width: '100%', minWidth: 1700 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selectedId.length} setDataQuery={setDataQuery} searchRows={searchRows} originData={data} refreshLoading={refreshLoading} activeFetch={activeFetch} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selectedId.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.deviceId);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.deviceId)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.deviceId}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableStatusomponent index={`${index}${row.connection}`}>
                                            {row.connection === 'true' ? CheckIcon : UnCheckIcon}
                                        </TableStatusomponent>
                                        <TableCellComponent align='left'>{row.InnerIP}</TableCellComponent>
                                        <TableCellComponent>
                                            <div style={{ display: 'flex' }}>
                                                <TvIcon style={{ color: '#29B6F6', marginRight: 5 }} fontSize='small' />
                                                <span>{row.deviceName}</span>
                                            </div>
                                        </TableCellComponent>
                                        <TableCellComponent>{row.groups}</TableCellComponent>
                                        <TableCellComponent>{row.detectionMode === 'true' ? 'On' : 'Off'}</TableCellComponent>
                                        <TableCellComponent>{row.scanSchedule}</TableCellComponent>
                                        <ConditionCellcomponent value={row.scanFinishTime} />
                                        <TableCellComponent>{row.collectSchedule}</TableCellComponent>
                                        <ConditionCellcomponent value={row.collectFinishTime} />
                                        <TableCellComponent>{row.fileDownloadDate}</TableCellComponent>
                                        <ConditionCellcomponent value={row.fileFinishTime} />
                                        <ConditionCellcomponent value={row.imageFinishTime} />
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 40 * emptyRows, }}>
                                    <TableCell colSpan={visibleRows.length} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[...pagNumArray, { label: '全部', value: -1 }]}
                    component="div"
                    count={dataQuery.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export default GridTable