import React, { ChangeEvent, useEffect } from 'react'
import SearchBar from '../../CommonConponents/SearchBar/SearchBar'
import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import PartialLoading from '../../CommonConponents/PartialLoading/PartialLoading'
import { IOneNode, MemorySelectedData } from '../../../constant/interfaceBoard'
import { generateUrlAndBodyForElasticsearch } from '../../../constant/FunctionForElasticsearch/functionToolbox'
import SubKeywordBox from './SubKeywordBox'

interface IGridHeaderProps {
    fetchElasticDetail: UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
    totalCount: number
    fetchElasticSearch: UseMutationResult<AxiosResponse<any, any>, any, any, unknown>
    dataForDisplay: any
    setDataForDisplay: React.Dispatch<any>
    memoryDropDownSelected: MemorySelectedData
}

const GridHeader = (props: IGridHeaderProps) => {
    const { fetchElasticDetail, totalCount, fetchElasticSearch, dataForDisplay, setDataForDisplay, memoryDropDownSelected } = props
    const [key, setKey] = React.useState<string>('')
    const onChangeFunc = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setKey(e.target.value)
    }
    const setDataFromTableSearchBar = (afterSelectedLeftListResponseState: any) => {
        setDataForDisplay({ type: "setDataFromTableSearchBar", data: afterSelectedLeftListResponseState })
    }

    useEffect(() => {
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
        let selectedHost = dataForDisplay.hostList
        let startTime = dataForDisplay.timeRange.startTime
        let endTime = dataForDisplay.timeRange.endTime
        let mainSearchKeyword = dataForDisplay.mainKeyword
        let newSubSearchKeywordList = dataForDisplay.subSearchKeywordList
        let mutationDataForTable = generateUrlAndBodyForElasticsearch("normal", indexList, memoryDropDownSelected, selectedHost, startTime, endTime, mainSearchKeyword, 0, newSubSearchKeywordList)
        console.log(mutationDataForTable)
        fetchElasticSearch.mutate(mutationDataForTable)
    }, [dataForDisplay.subSearchKeywordList])

    const searchKeyWords = (key: string) => {
        try {
            const subSearchKeyword: string = key
            if (!dataForDisplay.subSearchKeywordList.includes(subSearchKeyword) && subSearchKeyword !== '') {
                const newSubSearchKeywordList: string[] = [...dataForDisplay.subSearchKeywordList, subSearchKeyword]
                let afterSelectedLeftListResponseState = {
                    fromIndex: 0,
                    subSearchKeywordList: newSubSearchKeywordList
                }
                setDataFromTableSearchBar(afterSelectedLeftListResponseState)
            }
        }
        catch (err) {
            console.log(err)
        }
    };

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{flex:1}}>
                <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', margin: '0px auto 0px auto' }}>
                    <div style={{ width: '50%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>目前篩選之總筆數</p>
                        <p>{totalCount > 0 ? totalCount : '--'}</p>


                        <SearchBar
                            labelValue={'搜尋'}
                            query={key}
                            onChangeFunc={onChangeFunc}
                            onSearchFunc={searchKeyWords}

                            fetchElasticSearch={fetchElasticSearch}
                            dataForDisplay={dataForDisplay}
                            setDataForDisplay={setDataForDisplay}
                            memoryDropDownSelected={memoryDropDownSelected}
                        />
                    </div>


                    <div style={{ width: '50%', display: 'flex' }}>
                        <div style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                            {fetchElasticDetail.isLoading ? <PartialLoading /> : null}
                        </div>

                    </div>

                </div>
            </div>

            <div style={{ height: 40 ,display:"flex",alignItems:"center" }}>
                <SubKeywordBox
                    dataForDisplay={dataForDisplay}
                    setDataForDisplay={setDataForDisplay}
                />
            </div>
        </div>

    )
}

export default GridHeader

// 篩選筆數
// 局部搜尋
// 產出報告

interface THeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}


const headCells: readonly THeadCell[] = [
    {
        id: 'ip',
        numeric: false,
        disablePadding: false,
        label: '電腦內部IP',
    }
];

