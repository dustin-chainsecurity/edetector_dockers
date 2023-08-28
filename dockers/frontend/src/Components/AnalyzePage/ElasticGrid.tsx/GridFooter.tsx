import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { IOneNode, MemorySelectedData,IinitialState } from '../../../constant/interfaceBoard';
import { generateUrlAndBodyForElasticsearch, generateDotsListForChartInBoxQuery } from '../../../constant/FunctionForElasticsearch/functionToolbox';
import { useEffect, useState } from 'react';

interface IDridFooter {
    totalCount: number
    fetchElasticSearch: UseMutationResult<AxiosResponse<any, any>, any, any, unknown>
    dataForDisplay: IinitialState
    setDataForDisplay: React.Dispatch<any>
    memoryDropDownSelected: MemorySelectedData
}
// interface IinitialState {
//     mainKeyword: string, // 主搜尋關鍵字
//     fromIndex: number, // 從第幾筆開始
//     size: number, // 一次取得幾筆
//     hostList: string[], // 所有主機列表
//     indexList: (string | IOneNode)[], // 所有index列表
//     timeRange: { // 時間範圍
//         startTime: number,
//         endTime: number
//     },
//     leftSelectedList: { // 左方列表
//         analysisIndex: (string | IOneNode)[],    // 所有index列表
//         selectedIndex: string[]     // 所有被選取的index列表
//     },
//     chartData: any,// 圖表資料
//     tableData: {  // 表格資料
//         // ...
//     },
//     detailData: {  // 詳細資料
//     }
// }

const GridFooter = (props: IDridFooter) => {
    const { totalCount,
        fetchElasticSearch,
        dataForDisplay,
        setDataForDisplay,
        memoryDropDownSelected } = props;
    const setDataFromTableRowClick = (afterSelectedLeftListResponseState: any) => {
        setDataForDisplay({ type: "setDataFromTableRowClick", data: afterSelectedLeftListResponseState })
    }
    const onePageCount = 1000
    const totalPage = Math.ceil(totalCount / onePageCount)  // 3頁  分別是 0 1 2 
    // const [nowPageNumber, setNowPageNumber] = useState<number>(0)
    // useEffect(() => {
    //     if (dataForDisplay.fromIndex === 0) {
    //         setNowPageNumber(0)
    //     }
    // }, [dataForDisplay.fromIndex])
    const startCount = dataForDisplay.fromIndex===0? 0 : dataForDisplay.fromIndex+1
    const endCount = dataForDisplay.fromIndex + onePageCount > totalCount ? totalCount : dataForDisplay.fromIndex + onePageCount



    function handlePageChange(pageChange: number) {
        try {
            let indexList: (string | IOneNode)[] = []
            const selectedItemName = dataForDisplay.leftSelectedList.selectedIndex
            for (let i = 0; i < selectedItemName.length; i++) {
                let tempNode: IOneNode = {
                    name: selectedItemName[i],
                    type: "item",
                    children: []
                }
                indexList.push(tempNode)
            }
            if (indexList.length === 0) {
                indexList = dataForDisplay.indexList
            }
            console.log(totalCount)
            let selectedHost = dataForDisplay.hostList
            let startTime = dataForDisplay.timeRange.startTime
            let endTime = dataForDisplay.timeRange.endTime
            let mainSearchKeyword = dataForDisplay.mainKeyword
            const subSearchKeyword: string[] = dataForDisplay.subSearchKeywordList
            // const nextPageNumber = nowPageNumber + pageChange
            const nextPageNumber = dataForDisplay.fromIndex/onePageCount + pageChange
            if (nextPageNumber >= 0 && nextPageNumber < totalPage) {
                const fromIndex = dataForDisplay.fromIndex + pageChange * onePageCount > 0 ?
                    dataForDisplay.fromIndex + pageChange * onePageCount : 0
                let mutationDataForTable = generateUrlAndBodyForElasticsearch("normal", indexList, memoryDropDownSelected, selectedHost, startTime, endTime, mainSearchKeyword, fromIndex, subSearchKeyword)
                console.log(mutationDataForTable)
                let responseFromElasticsearchForTable = fetchElasticSearch.mutate(mutationDataForTable)
                let afterSelectedLeftListResponseState = {
                    fromIndex:fromIndex
                }
                setDataFromTableRowClick(afterSelectedLeftListResponseState)
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div style={{
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'flex-end',
            height: 40,
            alignItems: 'center',
        }}>
            {/* <p style={{ color: '#00000099', marginRight: 20 }}>目前頁面筆數 &nbsp; {totalCount > 1000 ? 1000 : totalCount} </p> */}
            <p style={{ color: '#00000099', marginRight: 20 }}>目前頁面筆數 &nbsp;{startCount} - {endCount} / 總筆數 &nbsp;{totalCount}</p>
            {/* <div>{'1-5 of 13'}</div> */}
            <div
                style={{
                    margin: 'auto 20px',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    // alert('上一頁')
                    handlePageChange(-1)
                }}
            >
                <KeyboardArrowLeftIcon />
            </div>
            <div
                style={{
                    margin: 'auto 20px',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    // alert('下一頁')
                    handlePageChange(1)
                }}
            >
                <KeyboardArrowRightIcon />
            </div>


        </div>
    )
}

export default GridFooter