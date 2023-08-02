import { useContext } from "react";
import { IFormatedDevice } from "../../../../constant/interfaceBoard";
import { Order } from "../../../../constant/TableInterfaces";
import { DetectContext } from "../../../../AppContext/DetectProvider";
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { visuallyHidden } from '@mui/utils';


interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IFormatedDevice) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}


const EnhancedTableHead = (props: EnhancedTableProps) => {
    const { dectectiveHead } = useContext(DetectContext);
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler =
        (property: keyof IFormatedDevice) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow style={{ whiteSpace: 'pre-line' }}>
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
                {dectectiveHead.map((headCell) => (
                    <TableCell
                        key={headCell.id + (Math.floor(Math.random() * 1000) + 1).toString()}
                        align='left'
                        // padding={headCell.disablePadding ? 'none' : 'normal'}
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


