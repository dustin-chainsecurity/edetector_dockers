import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box, IconButton, Stack, Paper, styled } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { Order } from "../../../CommonConponents/TableFunction";
import { visuallyHidden } from '@mui/utils'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React, { useState, useEffect, useRef } from 'react';
import './TableStyle.css';
import { IGroupData } from "./GroupTable";
import { IDeviceData } from "./Formtable";



interface HeadCell {
    id: any;
    label: string;
}

interface EnhancedTableProps {
    numSelected: number;
    onRequestAgentSort?: (event: React.MouseEvent<unknown>, property: keyof IDeviceData) => void;
    onRequestGroupDataSort?: (event: React.MouseEvent<unknown>, property: keyof IGroupData) => void;
    onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    headCells: readonly HeadCell[]
    filterGroupList?: string[];
    selectedGroupsInFilter?: string[];
    setSelectedGroupsInFilter?: React.Dispatch<React.SetStateAction<string[]>>;
    isGroupFilterOpen: boolean;
    setIsGroupFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


interface MultiSelectDropdownProps {
    options: string[];
    selectedGroupsInFilter: string[];
    setSelectedGroupsInFilter: React.Dispatch<React.SetStateAction<string[]>>;
    isGroupFilterOpen: boolean;
    setIsGroupFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    // height: 60,
    lineHeight: '60px',
}));

const MultiSelectDropdown = (option: MultiSelectDropdownProps) => {
    const { options, selectedGroupsInFilter, setSelectedGroupsInFilter,isGroupFilterOpen,setIsGroupFilterOpen } = option;
    // const [isOpen, setIsOpen] = useState(false);
    // const [selectedGroupsInFilter, setSelectedGroupsInFilter] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {

                setIsGroupFilterOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleOption = (option: string) => {
        if (selectedGroupsInFilter.includes(option)) {
            setSelectedGroupsInFilter(selectedGroupsInFilter.filter((item) => item !== option));
        } else {
            setSelectedGroupsInFilter([...selectedGroupsInFilter, option]);
        }
    };

    return (
        <>
            <div className="multi-select-dropdown" ref={dropdownRef}>

                <IconButton className="dropdown-header" onClick={() => setIsGroupFilterOpen(!isGroupFilterOpen)}>
                    <FilterAltIcon fontSize="small" />
                </IconButton>
                {isGroupFilterOpen && (
                    // <Item>
                    <div className="filterListInTable"
                        style={{ position: "absolute", zIndex: 2, margin: 3, backgroundColor: "white", padding: 5, transition: "box-shadow .25s" }}>
                        <div style={{ height: "100%", maxHeight: 100, width: "100%", overflow: "auto" }}>
                            {options.map((option, i) => (
                                <div key={i.toString() + (Math.floor(Math.random() * 1000) + 1).toString()}>
                                    <label key={option}>
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={selectedGroupsInFilter.includes(option)}
                                            onChange={() => toggleOption(option)}
                                        />
                                        {option}
                                    </label>
                                </div>

                            ))}
                        </div>

                    </div>
                    // </Item>

                )}
            </div>
        </>
    );
};




const EnhancedTableHead = (props: EnhancedTableProps) => {
    const { order,
        orderBy,
        numSelected,
        rowCount,
        headCells, onSelectAllClick,
        filterGroupList,
        selectedGroupsInFilter,
        setSelectedGroupsInFilter,
        onRequestGroupDataSort,
        onRequestAgentSort,
        isGroupFilterOpen,
        setIsGroupFilterOpen } = props;
    const createGroupSortHandler = (property: keyof IGroupData) => (event: React.MouseEvent<unknown>) => {
        onRequestGroupDataSort && onRequestGroupDataSort(event, property);
    }
    const createAgentSortHandler = (property: keyof IDeviceData) => (event: React.MouseEvent<unknown>) => {
        onRequestAgentSort && onRequestAgentSort(event, property);
    }
    return (
        <>
            <TableHead>
                <TableRow style={{ whiteSpace: 'nowrap', textOverflow: "ellipsis" }}>
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
                    {headCells.map((headCell, i) => (

                        headCell.id === "groups" ?
                            <TableCell
                                key={headCell.id + (Math.floor(Math.random() * 1000) + 1).toString()}
                            >
                                <Stack
                                    alignItems={"center"}
                                    direction={"row"}
                                >
                                    {headCell.label}
                                    {filterGroupList && selectedGroupsInFilter && setSelectedGroupsInFilter &&
                                        <MultiSelectDropdown
                                            options={filterGroupList}
                                            selectedGroupsInFilter={selectedGroupsInFilter}
                                            setSelectedGroupsInFilter={setSelectedGroupsInFilter}
                                            isGroupFilterOpen={isGroupFilterOpen}
                                            setIsGroupFilterOpen={setIsGroupFilterOpen}
                                        ></MultiSelectDropdown>
                                    }

                                    {/* <IconButton>
                                    <FilterAltIcon fontSize="small" />
                                </IconButton> */}
                                </Stack>
                            </TableCell> :

                            <TableCell
                                key={headCell.id + (Math.floor(Math.random() * 1000) + 1).toString()}
                                align='left'
                                // padding={headCell.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                {
                                    onRequestAgentSort ?
                                        <TableSortLabel
                                            id={headCell.id}
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            IconComponent={ArrowDropDownIcon}
                                            onClick={createAgentSortHandler(headCell.id)}
                                        >
                                            {headCell.label}
                                            {orderBy === headCell.id ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel> : null
                                }
                                {
                                    onRequestGroupDataSort ?
                                        <TableSortLabel
                                            id={headCell.id}
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            IconComponent={ArrowDropDownIcon}
                                            onClick={createGroupSortHandler(headCell.id)}
                                        >
                                            {headCell.label}
                                            {orderBy === headCell.id ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel> : null
                                }
                            </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        </>

    );
}

export default EnhancedTableHead


