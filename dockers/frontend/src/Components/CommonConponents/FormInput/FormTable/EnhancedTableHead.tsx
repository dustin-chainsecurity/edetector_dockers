import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Order } from "../../TableFunction";
import { IDeviceData } from "./FormTable";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { visuallyHidden } from '@mui/utils'


interface EnhancedTableProps {
    numSelected: number;
    handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof IDeviceData) => void
    // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

interface DetectGrid_HeadCell {
    id: keyof IDeviceData;
    label: string;
}

// export interface IDeviceData{
//     deviceId: string; 
//     innerIP: string; //電腦內部IP
//     deviceName: string;  //電腦名稱
//     address : string; //MAC Address
//     clientUid: string; //流水編號
//     groups: string; //所屬群組
// }

const headCells: readonly DetectGrid_HeadCell[] = [
    {
        id: 'innerIP',
        label: '電腦內部IP',
    },
    {
        id: 'deviceName',
        label: '電腦名稱',
    },
    {
        id: 'address',
        label: 'MAC Address',
    },
    {
        id: 'clientUid',
        label: '流水編號',
    },
    {
        id: 'groups',
        label: '所屬群組',
    }
];

const EnhancedTableHead = (props: EnhancedTableProps) => {
    // const { dectectiveHead } = useContext(DetectContext);
    const { order, orderBy, numSelected, rowCount, handleRequestSort } = props;
    // const createSortHandler =
    //     (property: keyof IDeviceData) => (event: React.MouseEvent<unknown>) => {
    //         onRequestSort(event, property);
    // };

    return (
        <TableHead>
            <TableRow style={{ whiteSpace: 'pre-line' }}>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        // onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
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
                            // onClick={createSortHandler(headCell.id)}
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


