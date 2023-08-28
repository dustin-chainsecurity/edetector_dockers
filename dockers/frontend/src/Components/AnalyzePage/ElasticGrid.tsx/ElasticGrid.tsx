import { UseMutateFunction, UseMutationResult } from '@tanstack/react-query'
import GridBody from './GridBody/GridBody'
import GridFooter from './GridFooter'
import GridHeader from './GridHeader'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { formatTimestamp } from '../../../constant/functionToolbox'
import { DynamicObject, IelasticQuery, excludingList, filterExcludingList, filterExcludingObj, combineIndexIntoSource } from '.'
import { MemorySelectedData } from '../../../constant/interfaceBoard'

export interface IElasticGridProps {
    fetchData: UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
    uidOnHand: IelasticQuery;
    setUidOnHand: React.Dispatch<React.SetStateAction<IelasticQuery>>
    fetchElasticDetail: UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
    setReRender: React.Dispatch<React.SetStateAction<boolean>>
    selectedIndexCount: number

    // fetchElasticSearch: UseMutationResult<AxiosResponse<any, any>, any, any, unknown>
    dataForDisplay: any
    setDataForDisplay: React.Dispatch<any>
    memoryDropDownSelected: MemorySelectedData
}

interface detailObject {
    agent: string;
    uuid: string;
    index: string;
}
let count = 0

const ElasticGrid = (props: IElasticGridProps) => {
    count++
    console.log('ElasticGrid', count)
    const { fetchData,
        setUidOnHand,
        fetchElasticDetail,
        setReRender,
        uidOnHand,
        selectedIndexCount,
        // fetchElasticSearch,
        dataForDisplay,
        setDataForDisplay,
        memoryDropDownSelected

    } = props
    const [columnName, setColumnName] = useState<string[]>([]) //store column array
    const [gridData, setGridData] = useState<DynamicObject[]>([])
    const [totalCount, setTotalCount] = useState<number>(0)

    // console.log('selectedIndexCount',selectedIndexCount)
    // console.log(fetchData)
    // 如果沒拿到需要先印no data

    useEffect(() => {
        console.log('fetchData ---->', fetchData)
    }, [fetchData])

    useEffect(() => {
        if (fetchData.data && fetchData.data.data.hits.hits.length !== 0) {

            const handleHeader = () => {
                const arrList: string[] = Object.keys(fetchData.data?.data.hits.hits[0]._source)
                const filterRes = filterExcludingList(arrList, excludingList)
                setColumnName(filterRes)
                // totoal Number 
                const allCounts = fetchData.data?.data.hits.total && typeof fetchData.data?.data.hits.total === 'number' ?
                    fetchData.data?.data.hits.total : 0
                setTotalCount(allCounts)
            }
            handleHeader()

            const handleBody = () => {
                const arrList: DynamicObject[] = fetchData.data?.data.hits.hits
                // 將_index放入item._source內
                let putIndexInto_source = arrList.map((item) => combineIndexIntoSource(item))
                const filterRes = putIndexInto_source.map((item) => filterExcludingObj(item._source, excludingList))
                const transDateRes = filterRes.map((item) => {
                    if (typeof item.date === 'number') {
                        item.date = formatTimestamp(item.date)
                        return item
                    }
                    else if (typeof item.date === 'string' && item.date.length > 6) {
                        const timstamp = Number(item.date);
                        item.date = formatTimestamp(timstamp)
                        return item
                    }
                    return item
                })
                if (transDateRes.length !== 0) setGridData(transDateRes)
            }
            console.log()
            handleBody()
        } else {
            setGridData([])
            setTotalCount(0)
        }

    }, [fetchData])
    const height = totalCount > 0 ? 300 : 100

    return (
        <>
            {/* {fetchData.isIdle || fetchData.isLoading ? null : */}
            <div style={{ width: '100%' }}>
                {/* <div>{dataForDisplay.}</div> */}
                <div style={{
                    minHeight: 100,
                    // maxHeight: height,
                    width: '95%',
                    maxWidth: "1200px",
                    padding: '20px',
                    margin: '20px auto',
                    backgroundColor: '#F5F5F5',
                    // overflowX: 'auto',
                    overflowY: 'auto'


                }}>
                    <GridHeader
                        fetchElasticDetail={fetchElasticDetail}
                        totalCount={totalCount}

                        fetchElasticSearch={fetchData}
                        dataForDisplay={dataForDisplay}
                        setDataForDisplay={setDataForDisplay}
                        memoryDropDownSelected={memoryDropDownSelected}
                    />
                    <GridBody
                        columnName={columnName} gridData={gridData} setUidOnHand={setUidOnHand}
                        fetchElasticDetail={fetchElasticDetail}
                        setReRender={setReRender} uidOnHand={uidOnHand}
                        // queryString={queryString}
                        selectedIndexCount={selectedIndexCount}
                        fetchElasticSearch={fetchData}
                    />
                    {
                        totalCount !== 0 ?
                            <GridFooter
                                totalCount={totalCount}
                                fetchElasticSearch={fetchData}
                                dataForDisplay={dataForDisplay}
                                setDataForDisplay={setDataForDisplay}
                                memoryDropDownSelected={memoryDropDownSelected}
                            /> : null
                    }
                </div>
            </div>
            {/* } */}
        </>

    )
}

export default ElasticGrid

// deal with the data

// grid header

// grid body
// --> grid column  according index to set grid column
// --> each row

// grid footer
// --> amounts of each page
// --> arrow for next page


// 定位為管理介面
// 需要濾掉 "uuid", "agent"
// 都固定放在 hits -> hits -> _source