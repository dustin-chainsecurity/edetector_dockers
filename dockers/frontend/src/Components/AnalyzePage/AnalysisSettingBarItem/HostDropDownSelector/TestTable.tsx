
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import React, { useMemo, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { oneHostData } from '../../../../constant/interfaceBoard';





function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}



type Order = 'asc' | 'desc';

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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

interface HeadCell {
  disablePadding: boolean;
  id: keyof oneHostData;
  label: string;
  numeric: boolean;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

// 控制 table header 列內容
const headCells: readonly HeadCell[] = [
  // {
  //   id: 'uuid',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'id',
  // },
  {
    id: 'ip',
    numeric: false,
    disablePadding: true,
    label: '電腦內部ip',
    align: 'left'
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: '電腦名稱',
    align: 'left'
  },
  {
    id: 'macAddress',
    numeric: true,
    disablePadding: false,
    label: 'Mac Address',
    align: 'left'
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof oneHostData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof oneHostData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              IconComponent={ArrowDropDownIcon}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}


interface ChildProps {
  selected: string[];  // 記錄所有被選擇的電腦
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  responseList: oneHostData[]
}



const TestTable: React.FC<ChildProps> = ({ selected, setSelected, responseList }) => {
  const [order, setOrder] = useState<Order>('asc'); // 決定排序的方式
  const [orderBy, setOrderBy] = useState<keyof oneHostData>('id');  // 決定表格生成時用哪一行排序
  const [page, setPage] = useState(0);  // 顯示第幾分頁
  const [dense, setDense] = useState(false);   //是否隱藏表格間空白
  const [rowsPerPage, setRowsPerPage] = useState(5);   //決定table一頁要顯示的資料數，預設給100行
  // const []
  // const [searchValue,setSearchValue] = useState<string>("")
  const [showHostList, setShowHostList] = useState<oneHostData[]>(responseList)
  const [searched, setSearched] = useState("");
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof oneHostData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    console.log(order, orderBy)

  };
  // 控制全選 checkbox 
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = showHostList.map((n) => n.id.toString());  // 把全部選項加入新陣列
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    // selectedIndex 如果等於-1，表示輸入的name不在selected陣列中 ; 
    // 如果 selectedIndex 等於 0 ，表示 name 是 selected 陣列中第一個元素 ， 那么将selected数组的第二个元素到最后一个元素添加到newSelected数组中
    // 如果selectedIndex 等於 selected数组的最后一个元素的索引，表示name是 selected 数组的最后一个元素，那么将selected数组的第一个元素到倒数第二个元素添加到newSelected数组中
    // 如果selectedIndex大于0，表示name在selected数组中的索引大于0但不是最后一个元素，那么将selected数组的前selectedIndex个元素和从selectedIndex+1开始的元素添加到newSelected数组中
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name); //
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    // 重新設定選定列表
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - showHostList.length) : 0;




  //   const searchRows = (searchedVal: string) => { //表格關鍵字搜索
  //     const filteredRows = responseList.filter((row) => {
  //         return Object.entries(row).some(([key, value]) => {
  //             // if (key === 'tableFinishTime' || key === 'ImageFinishTime' || key === 'scanFinishTime' || key === 'traceFinishTime') {
  //             //     return formatTimestamp(value).includes(searchedVal);
  //             //     // return value.toString().includes(searchedVal);
  //             // }
  //             return value.toString().toLowerCase().includes(searchedVal.toLowerCase());
  //         });
  //     });
  //     setDataQuery(filteredRows);
  // };
  // const useStyles = makeStyles({
  //   table: {
  //     minWidth: 650,
  //   },
  // });
  // const classes = useStyles();

  // 搜尋功能
  const requestSearch = (searchedVal: string) => {
    const filteredRows = responseList.filter((row) => {
      if (row.ip.toLowerCase().includes(searchedVal.toLowerCase()) || row.name.toLocaleLowerCase().includes(searchedVal.toLocaleLowerCase()) || row.macAddress.toLocaleLowerCase().includes(searchedVal.toLocaleLowerCase())) {
        return row
      }
    });
    setShowHostList(filteredRows);
    console.log("123456")
    // if (filteredRows.length !== 0) {
    //   setRows(filteredRows);
    // } else {
    //   console.log(filteredRows.length);
    // }
  };
  // const cancelSearch = () => {
  //   setSearched("");
  //   requestSearch("");
  // };
  // const showNowList = () => {
  //   console.log(showHostList)
  // }

  return (
    <div>
      <div style={{ float: 'right', marginBottom: "10px" }}>
        <TextField
          value={searched}
          InputProps={{
            // sx: { height: 40, padding: '2px 0px 5px 2px', },
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon cursor='pointer' />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            console.log(e)
            requestSearch(e.target.value)
            setSearched(e.target.value)
          }}
        ></TextField>
      </div>
      <Box sx={{ width: 500, height: "470px", overflowY: "auto" }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          {/* <EnhancedTableToolbarInAnalysisSettingBar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ whiteSpace: "nowrap" }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={showHostList.length}
              />
              <TableBody>
                {showHostList.map((row, index) => {
                  const isItemSelected = isSelected(row.id.toString());
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id.toString())}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      {/* uuid欄位隱藏 */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{ display: "none" }}
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.ip}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.macAddress}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
          rowsPerPageOptions={[...pagNumArray, { label: 'All', value: -1 }]}
          component="div"
          count={showHostList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        </Paper>
      </Box>
    </div>

  );
}





export default TestTable