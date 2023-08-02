import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { IOneNode } from '../../../constant/interfaceBoard'
import { Button } from '@mui/material';
import { generateUrlAndBodyForElasticsearch, generateDotsListForChart } from '../../../constant/functionToolbox';
import { useMutation } from '@tanstack/react-query'
import { axiosClient, axiosElastic } from '../../../utiles/ProtectedRoutes';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
interface SearchResult {
    // 定義你期望的搜尋結果型別
    // 這裡使用 any 作為示例
    data: any;
}

const fetchDataAfterDelay = (data: string, delay: number): Promise<SearchResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: data }); // 這裡返回了一個假的搜尋結果，你需要替換為實際的資料
        }, delay);
    });
};




export default function LeftSelectList({ state, setDataForDisplay, fetchElasticSearch }: { state: any, setDataForDisplay: React.Dispatch<any>, fetchElasticSearch: any }) {
    // console.log(ConditionWhenQuerySendToElasticsearch)
    const [selectedIndex, setSelectedIndex] = React.useState<number[]>([]);
    const [openedGroup, setOpenedGroup] = React.useState<number[]>([])
    const [selectedItemName, setSelectedItemName] = React.useState<string[]>([])
    const setDataFromLeftSelectedList = (afterSelectedLeftListResponseState: any) => {
        setDataForDisplay({ type: "setDataFromLeftSelectedList", data: afterSelectedLeftListResponseState })
    }

    // const [searchTerm, setSearchTerm] = useState<string>('');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const handleSearch = (): void => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // 改變狀態後延遲三秒
        timeoutRef.current = setTimeout(() => {
            fetchDataAfterDelay("searchTerm", 0)
                .then((result) => {
                    // 在這裡處理資料
                    console.log('Received data:', result.data);
                    selectedListSendRequet()
                })
                .finally(() => {
                });
        }, 1000);
    };
    useEffect(() => {
        console.log(selectedItemName)
        handleSearch()
    }, [selectedItemName])


    // 存放左方欄位要顯示的清單
    // const [groupList, setGroupList] = React.useState<oneNode[]>(initGroupList)
    // 控制item被選取
    const handleListItemClick = (
        event: any,
        index: number,
    ) => {
        // dispatch({type:"leftSelectedList",payload:index})
        //根據所選取的index(所選主機、時間不變)，重新發送請求，並更換chart、table的資料，根據所選取的index
        if (event.ctrlKey) {
            if (!selectedIndex.includes(index)) {
                setSelectedIndex([...selectedIndex, index]);
            } else {
                setSelectedIndex(selectedIndex.filter((item) => item !== index))
            }
            if (!selectedItemName.includes(event.target.innerText)) {
                console.log(selectedItemName)
                setSelectedItemName(selectedItemName => [...selectedItemName, event.target.innerText]);
            } else {
                setSelectedItemName(selectedItemName => { return selectedItemName.filter((item) => item !== event.target.innerText) })
            }
            console.log(selectedItemName)
        } else {
            console.log(selectedItemName)
            setSelectedIndex([index]);
            setSelectedItemName(selectedItemName => [event.target.innerText])
            console.log(selectedItemName)
        }
    };
    // 判斷item是否被選取
    const isItemSelected = (index: number) => selectedIndex.includes(index);

    //控制group展開
    function handleGroupOpen(index: number) {
        if (openedGroup.includes(index)) {
            console.log(index)
            setOpenedGroup(openedGroup.filter((item) => item !== index))
        } else {
            setOpenedGroup([...openedGroup, index])
        }
    }
    // 判斷group是否被展開
    function isGroupopen(index: number) {
        if (openedGroup.includes(index)) {
            return true
        } else {
            return false
        }
    }
    // 根據左方所選取的index，發送請求，並更換chart、table的資料，根據所選取的index
    async function selectedListSendRequet() {
        try {
            let indexList: IOneNode[] = []
            console.log("目前被選到的index", selectedItemName)
            for (let i = 0; i < selectedItemName.length; i++) {
                let tempNode: IOneNode = {
                    name: selectedItemName[i],
                    type: "item",
                    children: []
                }
                indexList.push(tempNode)
            }
            console.log(indexList)
            console.log(state)
            let selectedHost = state.hostList
            let startTime = state.timeRange.startTime
            let endTime = state.timeRange.endTime
            let mutationDataForTable = generateUrlAndBodyForElasticsearch(indexList, selectedHost, startTime, endTime)
            let dotsInChart = await generateDotsListForChart(indexList, selectedHost, startTime, endTime, fetchElasticSearch)
            let responseFromElasticsearchForTable = await fetchElasticSearch.mutateAsync(mutationDataForTable)
            let afterSelectedLeftListResponseState = {
                formIndex: 0,
                leftSelectedList: {
                    selectedIndex: selectedItemName
                },
                chartData: dotsInChart,
                tableData: responseFromElasticsearchForTable,
                detailData: {}
            }
            setDataFromLeftSelectedList(afterSelectedLeftListResponseState)
        }
        catch (err) {
            let afterSelectedLeftListResponseState = {
                formIndex: 0,
                leftSelectedList: {
                    selectedIndex: selectedItemName
                },
                chartData: [],
                tableData: [],
                detailData: {}
            }
            setDataFromLeftSelectedList(afterSelectedLeftListResponseState)
            console.log(err)
        }


    }
    let itemId = 0
    function generateLeftList(groupList: IOneNode[], level: number = 0) {

        return groupList.map((item: any) => {
            let tempItemId = itemId
            itemId++

            if (item.type === "group") {
                // 產生group,同時將group的children放入generateLeftList繼續生成
                return <div key={tempItemId}>
                    <ListItemButton
                        sx={{ pl: level }}
                        selected={isItemSelected(tempItemId)}
                        // onKeyDown={(event) => { handleListItemClick(event, tempItemId); handleGroupOpen(tempItemId) }}
                        onClick={(event) => { handleGroupOpen(tempItemId) }}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                        {isGroupopen(tempItemId) ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={isGroupopen(tempItemId)} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {generateLeftList(item.children, level + 2)}
                        </List>
                    </Collapse>
                </div>
            } else {

                // 產生item
                return <ListItemButton
                    key={tempItemId}
                    sx={{ pl: level }}
                    selected={isItemSelected(tempItemId)}
                    // onKeyDown={(event) => { handleListItemClick(event, tempItemId) }}

                    onClick={(event) => handleListItemClick(event, tempItemId)}>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItemButton>
            }
        })

    }


    return (
        <div style={{ minWidth: "350px" }}>
            {/* <Button variant="contained" onClick={() => { console.log(selectedItemName); selectedListSendRequet() }}>儲存</Button> */}
            {generateLeftList(state.leftSelectedList.analysisIndex)}
            {/* <List
                sx={{ width: '100%', maxWidth: "500px", bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Nested List Items
                    </ListSubheader>
                }
            >
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => { handleListItemClick(event, 2); handleClick() }}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 3)}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 8 }}
                            selected={selectedIndex === 4}
                            onClick={(event) => handleListItemClick(event, 4)}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 8 }}
                            selected={selectedIndex === 2}
                            onClick={(event) => { handleListItemClick(event, 2); handleClick2() }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                            {open2 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </List>
                </Collapse>

            </List> */}
        </div>

    );
}




