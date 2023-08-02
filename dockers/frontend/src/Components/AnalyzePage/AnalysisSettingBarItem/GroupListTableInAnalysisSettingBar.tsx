import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { oneHostData, requestHostData } from '../../../constant/interfaceBoard';

interface GroupDataList {
    name: string;
}


function createData(
    name: string,
): GroupDataList {
    return {
        name,
    };
}

interface ChildProps {
    selectedHost: string[];  // 記錄所有被選擇的電腦
    setSelectedHost: React.Dispatch<React.SetStateAction<string[]>>;
    selectedHostGroup: string[];
    setSelectedHostGroup: React.Dispatch<React.SetStateAction<string[]>>;
    responseList: requestHostData[]
    initHostGroupList: string[]
}


export default function GroupListTableInAnalysisSettingBar(input: ChildProps) {
    // 建立群組名稱與其對應的主機相關的map
    const groupNameWithHostList: Map<string, string[]> = generateGroupNameWithHostList(input.responseList, input.initHostGroupList)
    function generateGroupNameWithHostList(responseList: requestHostData[], initHostGroupList: string[]) {
        let newGroupNameWithHostList = new Map<string, string[]>([]);
        for (let i = 0; i < initHostGroupList.length; i++) {
            let groupName = initHostGroupList[i]
            let groupList = []
            for (let j = 0; j < responseList.length; j++) {
                const isTheSameGroup = (element: string) => element === groupName;
                let groupNameInOneHostGroupIndex = responseList[j].group.findIndex(isTheSameGroup)
                if (groupNameInOneHostGroupIndex !== -1) {
                    groupList.push(responseList[j].id.toString())
                }
            }
            newGroupNameWithHostList.set(groupName, groupList)
        }
        // console.log(newGroupNameWithHostList)
        return newGroupNameWithHostList
    }

    const handleClick = (event: React.MouseEvent<unknown>, param: string) => {
        //控制hostgroup table的 selectedHostGroup
        const selectedIndex = input.selectedHostGroup.indexOf(param);
        let newSelected: string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(input.selectedHostGroup, param);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(input.selectedHostGroup.slice(1));
        } else if (selectedIndex === input.selectedHostGroup.length - 1) {
            newSelected = newSelected.concat(input.selectedHostGroup.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                input.selectedHostGroup.slice(0, selectedIndex),
                input.selectedHostGroup.slice(selectedIndex + 1),
            );
        }
        input.setSelectedHostGroup(newSelected);

        // 控制點及群組所選取的電腦
        let groupItems = groupNameWithHostList.get(param)
        let res = input.selectedHostGroup.filter(groupName => groupName === param)
        if (res.length === 0) {
            let resultSelectedHostList = input.selectedHost.concat(groupItems ? groupItems.filter((e) => { return input.selectedHost.indexOf(e) === -1 }) : [])
            input.setSelectedHost(resultSelectedHostList)
        } else {
            let resultSelectedHostList = input.selectedHost.filter((e) => { return groupItems?.indexOf(e) === -1 })
            input.setSelectedHost(resultSelectedHostList)
        }
    };
    const isSelected = (name: string) => input.selectedHostGroup.indexOf(name) !== -1;
    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 100 }}
                        aria-labelledby="tableTitle"
                    >
                        <TableBody>
                            {input.initHostGroupList.map((row, index) => {
                                const isItemSelected = isSelected(row);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                console.log(isItemSelected)
                                console.log(index)

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row}
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
                                                onChange={handleChange1}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                        >
                                            {row}
                                        </TableCell>
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