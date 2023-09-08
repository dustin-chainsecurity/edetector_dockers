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
import { IOneNode, IOneObjectName } from '../../../constant/interfaceBoard'
import { generateUrlAndBodyForElasticsearch } from '../../../constant/FunctionForElasticsearch/functionToolbox';
import { generateDotsListForChartInBoxQuery } from '../../../constant/FunctionForElasticsearch/functionToolbox'
import { UseMutationResult } from '@tanstack/react-query'
import { useRef, useEffect } from 'react';
import { MemorySelectedData } from '../../../constant/interfaceBoard'
import { AxiosResponse } from 'axios';
import { indexTree } from '../../../constant/AnalysisPage/functionToolbox'


interface SearchResult {
    // 定義你期望的搜尋結果型別
    // 這裡使用 any 作為示例
    data: any;
}
interface IIndexWithTotal {
    index: string
    total: number

}
interface IIndexForLeftList {
    index: string
    total: number
    name: string
    type: "group" | "item"
    children: IIndexForLeftList[] | []
}

interface LeftSelectListProps {
    fetchElasticSearchForLeftListCount: UseMutationResult<AxiosResponse<any, any>, any, any, unknown>
    fetchElasticSearchForChart: UseMutationResult<AxiosResponse<any, any>, any, any, unknown>
    state: any
    setDataForDisplay: React.Dispatch<any>
    fetchElasticSearch: any
    memoryDropDownSelected: MemorySelectedData

}

// interface EnhancedTableProps {
//     pageData: oneHostData[]
//     selectedId: readonly string[]
//     numSelected: number;
//     onRequestSort: (event: React.MouseEvent<unknown>, property: keyof oneHostData) => void;
//     onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
//     order: Order;
//     orderBy: string;
//     rowCount: number;
//     selectedHost: string
// }



const LeftSelectList = (props: LeftSelectListProps) => {
    const { fetchElasticSearchForLeftListCount, state, setDataForDisplay, fetchElasticSearch, memoryDropDownSelected, fetchElasticSearchForChart } = props
    const [selectedIndex, setSelectedIndex] = React.useState<number[]>([]);
    const [openedGroup, setOpenedGroup] = React.useState<number[]>(Array.from({ length: 100 }, (_, k) => k))  // 預設0~99都是展開的
    const [autoSelectedAll, setAutoSelectedAll] = React.useState<boolean>(false)
    const [leftIndexList, setLeftIndexList] = React.useState<IIndexForLeftList[]>([])
    const setDataFromLeftSelectedList = (afterSelectedLeftListResponseState: any) => {
        setDataForDisplay({ type: "setDataFromLeftSelectedList", data: afterSelectedLeftListResponseState })
    }
    const [selectedItemName, setSelectedItemName] = React.useState<string[]>([])
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    // 點選左方清單時，延遲三秒後發送請求，如果點選內容有更換則3秒內重新計時
    // generateIndexWithTotalList(fetchElasticSearchForLeftListCount)
    // console.log(fetchElasticSearchForLeftListCount)

    useEffect(() => {
        if (selectedItemName.length !== 0) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            // 改變狀態後延遲三秒
            timeoutRef.current = setTimeout(() => {
                selectedListSendRequet();
            }, 1000);
        }
    }, [selectedItemName]);
    useEffect(() => {
        if (fetchElasticSearchForLeftListCount.isSuccess) {
            generateIndexWithTotalList(fetchElasticSearchForLeftListCount)
        }
    }, [fetchElasticSearchForLeftListCount])


    // 存放左方欄位要顯示的清單
    // const [groupList, setGroupList] = React.useState<oneNode[]>(initGroupList)
    // 控制item被選取
    const handleListItemClick = (
        event: any,
        index: number,
        name: string
    ) => {
        // dispatch({type:"leftSelectedList",payload:index})
        //根據所選取的index(所選主機、時間不變)，重新發送請求，並更換chart、table的資料，根據所選取的index
        if (event.ctrlKey) {
            // 控制畫面是否被點選
            // 如果 total result 有被選的話，取消total result的選取
            if (!selectedIndex.includes(index)) {
                selectedIndex.includes(0) ?
                    setSelectedIndex([index]) :
                    setSelectedIndex([...selectedIndex, index]);
            } else {
                setSelectedIndex(selectedIndex.filter((item) => item !== index))
            }

            // 控制送出請求內容，如果全部沒選，送出原先全選的請求，如果有選，送出選取的請求
            if (!selectedItemName.includes(name)) {

                setSelectedItemName(selectedItemName => [...selectedItemName, name]);
            } else {
                if (selectedItemName.filter((item) => item !== name).length === 0) {
                    let allIndexNameList = generateInitIndexArrTableName(state.leftSelectedList.analysisIndex)
                    setSelectedItemName(allIndexNameList)
                    setAutoSelectedAll(true)
                } else {
                    if (autoSelectedAll) {
                        setSelectedItemName([name])
                        setAutoSelectedAll(false)
                    } else {
                        setSelectedItemName(selectedItemName.filter((item) => item !== name))
                    }
                }
            }
        } else {
            setSelectedIndex([index]);
            setSelectedItemName(selectedItemName => [name])
        }

        function generateInitIndexArrTableName(groupList: IOneNode[], nowList: string[] = []) {
            groupList.map((item) => {
                item.type === "group" ? generateInitIndexArrTableName(item.children, nowList) : nowList.push(item.name)
            })
            return nowList
        }
    };


    const handleListTotalItemClick = (
        event: any,
        index: number,
        name: string
    ) => {
        setSelectedIndex([index])
        let allIndexNameList = generateInitIndexArrTableName(state.leftSelectedList.analysisIndex)
        setSelectedItemName(allIndexNameList)
        setAutoSelectedAll(true)

        function generateInitIndexArrTableName(groupList: IOneNode[], nowList: string[] = []) {
            groupList.map((item) => {
                item.type === "group" ? generateInitIndexArrTableName(item.children, nowList) : nowList.push(item.name)
            })
            return nowList
        }


    }

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

    function generateIndexWithTotalList(fetchElasticSearchForLeftListCount: any) {
        // console.log(fetchElasticSearchForLeftListCount)
        let indexWithTotalList: IIndexWithTotal[] = []
        let responseList = fetchElasticSearchForLeftListCount.data?.data.responses
        let total = 0
        // 整理出total不為0的index
        if (responseList) {
            responseList.map((item: any) => {
                try {
                    total = total + item.hits.total
                    let tempIndexWithTotal: IIndexWithTotal = {
                        index: item.hits.hits[0]._index,
                        total: item.hits.total,
                    }
                    indexWithTotalList.push(tempIndexWithTotal)
                } catch {
                    // console.log("error")
                }
            })
        }
        let resLeftList = getNodeWithTableName(indexTree, indexWithTotalList)
        let resLeftListAddTotal: IIndexForLeftList[] = [
            {
                index: "TOTAL RESULT",
                total: total,
                name: "TOTAL RESULT",
                type: "item",
                children: []
            }
        ]
        resLeftListAddTotal = resLeftListAddTotal.concat(resLeftList)
        setLeftIndexList(resLeftListAddTotal)
        function getNodeWithTableName(indexTree: IOneObjectName[], tableName: IIndexWithTotal[]) {
            let nameList: IIndexForLeftList[] = []
            for (let i = 0; i < indexTree.length; i++) {
                if (indexTree[i].type === "group") {
                    let temp = getNodeWithTableName(indexTree[i].child, tableName)
                    let tempGroup: IIndexForLeftList = {
                        name: indexTree[i].name.chineseName,
                        total: 0,
                        index: "",
                        type: "group",
                        children: temp
                    }
                    if (tempGroup.children?.length !== 0) {
                        nameList.push(tempGroup)
                    }
                } else {
                    let indexNumber = tableName.findIndex((item) => item.index === indexTree[i].name.tableName)
                    if (indexNumber !== -1) {
                        let temp: IIndexForLeftList = {
                            name: indexTree[i].name.chineseName,
                            total: tableName[indexNumber].total,
                            index: indexTree[i].name.tableName,
                            type: "item",
                            children: []
                        }
                        nameList.push(temp)
                    }
                }
            }
            return nameList
        }
    }




    // 根據左方所選取的index,生成mutationDataForTable，並發送請求，並更換chart、table的資料，根據所選取的index
    function selectedListSendRequet() {
        try {
            const indexList: IOneNode[] = []
            selectedItemName.map((item) => {
                indexList.push({ name: item, type: "item", children: [] })
            })
            const selectedHost = state.hostList
            const startTime = state.timeRange.startTime
            const endTime = state.timeRange.endTime
            const mainSearchKeyword = state.mainKeyword
            const mutationDataForTable = generateUrlAndBodyForElasticsearch("normal", indexList, memoryDropDownSelected, selectedHost, startTime, endTime, mainSearchKeyword)
            const mutationDataForChart = generateDotsListForChartInBoxQuery(indexList, memoryDropDownSelected, selectedHost, startTime, endTime, mainSearchKeyword)
            fetchElasticSearchForChart.mutate(mutationDataForChart)
            fetchElasticSearch.mutate(mutationDataForTable)
            const afterSelectedLeftListResponseState = {
                formIndex: 0,
                leftSelectedList: {
                    selectedIndex: selectedItemName
                },
                chartData: [],
                tableData: "responseFromElasticsearchForTable",
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
        }
    }
    let itemId = 0
    function generateLeftList(groupList: IIndexForLeftList[], level: number = 0) {
        return groupList.map((item: IIndexForLeftList) => {
            let tempItemId = itemId
            itemId++

            if (item.type === "group") {
                // 產生group,同時將group的children放入generateLeftList繼續生成
                return <div key={tempItemId}>
                    <ListItemButton
                        sx={{ pl: level }}
                        selected={isItemSelected(tempItemId)}
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
                if (item.name === "TOTAL RESULT") {
                    return <ListItemButton
                        key={tempItemId}
                        sx={{ pl: 0 }}
                        selected={isItemSelected(tempItemId)}
                        // onKeyDown={(event) => { handleListItemClick(event, tempItemId) }}
                        onClick={(event) => handleListTotalItemClick(event, tempItemId, item.name)}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"TOTAL RESULT"} />
                        <ListItemText primary={item.total} style={{ display: "flex", justifyContent: "end", marginLeft: "20px" }} />
                    </ListItemButton>
                } else {
                    return <ListItemButton
                        key={tempItemId}
                        sx={{ pl: level }}
                        selected={isItemSelected(tempItemId)}
                        id={item.name}
                        // onKeyDown={(event) => { handleListItemClick(event, tempItemId) }}
                        onClick={(event) => handleListItemClick(event, tempItemId, item.name)}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                        <div>
                            <ListItemText primary={item.total} style={{ display: "flex", justifyContent: "end", marginLeft: "20px" }} />
                        </div>
                    </ListItemButton>
                }
            }
        })
    }
    return (
        <div style={{ width: "100%", backgroundColor: "#F5F5F5" }}>
            {generateLeftList(leftIndexList)}
        </div>
    )
}



export default LeftSelectList