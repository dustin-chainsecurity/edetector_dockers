import { UseMutationResult } from '@tanstack/react-query'
import GridBody from './GridBody/GridBody'
import GridFooter from './GridFooter'
import GridHeader from './GridHeader'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { formatTimestamp } from '../../../constant/functionToolbox'
import { DynamicObject, IelasticQuery, excludingList, filterExcludingList, filterExcludingObj } from '.'

export interface IElasticGridProps {
    fetchData: UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
    setUidOnHand : React.Dispatch<React.SetStateAction<IelasticQuery>>
    fetchElasticDetail : UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
}

interface detailObject{
    agent : string;
    uuid : string;
    index : string;
  }


const ElasticGrid = (props: IElasticGridProps) => {
    const { fetchData, setUidOnHand, fetchElasticDetail } = props
    const [columnName, setColumnName] = useState<string[]>([]) //store column array
    const [gridData, setGridData] = useState<DynamicObject[]>([])

    // 如果沒拿到需要先印no data

    useEffect(() => {
        if (fetchData.data && fetchData.data.data.hits.hits.length !== 0) {          

            const handleHeader = () => {
                const arrList: string[] = Object.keys(fetchData.data?.data.hits.hits[0]._source) 
                const filterRes = filterExcludingList(arrList, excludingList)
                setColumnName(filterRes)
            }
            handleHeader()

            const handleBody = () => {
                const arrList: DynamicObject[] = fetchData.data?.data.hits.hits
                const filterRes = arrList.map((item) => filterExcludingObj(item._source, excludingList))                
                const transDateRes = filterRes.map((item) => {
                    if(typeof item.date === 'number') {
                        item.date = formatTimestamp(item.date)
                        return item
                    }
                    else if(typeof item.date === 'string' && item.date.length > 6){
                        const timstamp = Number(item.date) ;
                        item.date = formatTimestamp(timstamp)
                        return item
                    }
                    return item
                })
                if(transDateRes.length !== 0) setGridData(transDateRes) ;
            }
            handleBody()
        }

    }, [fetchData])

    return (
        <div>
        {fetchData.data ?
            <div style={{
                minHeight: 600,
                width: '95%',
                padding: '20px',
                margin: '20px auto',
                backgroundColor: '#F5F5F5',
                
            }}>
                <GridHeader />
                <GridBody columnName={columnName} gridData={gridData} setUidOnHand={setUidOnHand} fetchElasticDetail={fetchElasticDetail}/>
                <GridFooter />
            </div> :
            null}
        </div>
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