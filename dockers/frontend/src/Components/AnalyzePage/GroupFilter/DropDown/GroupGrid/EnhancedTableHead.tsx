import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { visuallyHidden } from '@mui/utils';
import { Order } from "../../../../../constant/TableInterfaces";
import { IGenerateGroup, oneHostData } from "../../../../../constant/interfaceBoard";
import { useEffect, useState } from "react";
import { areArraysHasOne, areArraysIncluding } from "../..";


interface EnhancedTableProps {
    pageData: oneHostData[]
    selectedId: readonly string[]
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof oneHostData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    selectedHost: string
}


const EnhancedTableHead = (props: EnhancedTableProps) => {

    const { onSelectAllClick, order, orderBy, onRequestSort, pageData, selectedId } = props;
    const createSortHandler =
        (property: keyof oneHostData) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    const [compareCheck, setCompareCheck] = useState<boolean>(false)
    const [minusCheck, setMinusCheck] = useState<boolean>(false)


    useEffect(() => {
        const allIds: readonly string[] = pageData.map((item) => item.id) // all ids of this page and turn it into readonly array
        const compareResult = areArraysIncluding(selectedId, allIds) // selectedId全部被選會是所有裝置 ,allIds被選會是當頁所有id
        setCompareCheck(compareResult)

        const compareMinus = areArraysHasOne(selectedId, allIds, compareResult) //  只要有一個就回傳true，但不能兩減號ㄌㄨㄛ
        setMinusCheck(compareMinus)

    }, [selectedId, pageData])

    return (
        <TableHead>
            <TableRow style={{ whiteSpace: 'pre-line' }}>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={minusCheck}
                        checked={compareCheck}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell, idx) => (
                    <TableCell
                        key={`${headCell.id}${idx}headcell`}
                        align='left'
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

export default EnhancedTableHead

interface GroupGrid_HeadCell {
    disablePadding: boolean;
    id: keyof oneHostData;
    label: string;
    numeric: boolean;
}


const headCells: readonly GroupGrid_HeadCell[] = [
    {
        id: 'ip',
        numeric: false,
        disablePadding: false,
        label: '電腦內部IP',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: '電腦名稱',
    },
    {
        id: 'macAddress',
        numeric: false,
        disablePadding: true,
        label: 'Mac Address',
    }
];



