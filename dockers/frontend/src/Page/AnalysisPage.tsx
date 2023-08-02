import CommonHeader from '../Components/CommonConponents/CommonHeader/CommonHeader'
import AnalysisSettingBar from '../Components/AnalyzePage/AnalysisSettingBar'
import { useState, useEffect, useReducer } from 'react'
import AnalysisPageChart from '../Components/AnalyzePage/AnalysisPageChart'
import { oneHostData, AllFilesDropDownData, ForensicsSelectedData, MemorySelectedData, IGenerateGroup, requestHostData, IDateModule, IOneNode, IDateModuleData } from '../constant/interfaceBoard'
import { API, elasticChildUrl, elasticParent, elasticRoot, urlRoot } from '../constant';
import LeftSelectList from '../Components/AnalyzePage/LeftSelectList/LeftSelectList';
import { axiosClient, axiosElastic } from '../utiles/ProtectedRoutes';
import ElasticGrid from '../Components/AnalyzePage/ElasticGrid.tsx/ElasticGrid'
import { useMutation } from '@tanstack/react-query'
import Button from '@mui/material/Button';
import { forensicsDropSelectorTranfer, pickUpUsefulData, generateOneListWithCleanData, generateUrlAndBodyForElasticsearch, generateTimeListForChart, generateCleanIndexs, generateDotsListForChart } from '../constant/functionToolbox'
import RightBar from '../Components/AnalyzePage/RightBar/RightBar'
import { IelasticQuery } from '../Components/AnalyzePage/ElasticGrid.tsx'
import { error } from 'console'



const AnalysisPage = () => {
    const [selectedId, setSelectedId] = useState<readonly string[]>([]); //all devices of selected row
    const [selectedHost, setSelectedHost] = useState<string[]>(["1", "2", "3"])
    const [selectedHostGroup, setSelectedHostGroup] = useState<string[]>([])
    const initMemoryDropDownSelected: MemorySelectedData = { isMemoryGroupSelected: true, processName: "", processConnectIP: "", dynamicCommand: "", processMD5: "", processPath: "", parentProcessPath: "", digitalSign: "", importOtherDLL: "", processId: "", riskLevel: ['三', "四"], injectActive: ['非PE程式碼', '無'], processBeInjected: ['無'], boot: ['AutoRun', '無'], hook: ['無'], hide: ['File', '無'], }
    const initForensicsSelectedData: ForensicsSelectedData = { isForensicsSelected: true, keywordType: 'keywordType', keyword: 'keyword', browsingHistoryAndBookmarks: false, chromeBrowsingHistory: false, chromeDownloadHistory: false, chromeKeywordSearchHistory: false, chromeLoginAccountAndPassword: false, chromeBookmarks: false, cacheAndCookieHistory: false, chromeCache: false, chromeCookies: false, edgeCache: false, edgeCookies: false, ieCache: false, firefoxCache: false, firefoxCookies: false, currentNetworkConnectionsHistory: false, internetInformation: false, unlimitedBasicInformation: false, internetResources: false, recentlyExecutedSoftwareLog: false, softwareInstalled: false, detailedSystemServices: false, remoteDesktopLoginAccountPassword: false, systemInformation: false, prefetch: false, scheduleWork: false, programNetworkTrafficTrace: false, dnsInformation: false, generalSystemServices: false, bootProgram: false, jumpList: false, muicache: false, applicationLogFiles: false, machineCodeTraces: false, programReadAndWriteTraces: false, evanescentRecords: false, executeProgram: false, fileOpenedByTheProgram: false, programConnectionInformation: false, arpCache: false, recentlyOpenedFileHistory: false, relativeShortcuts: false, maasterUserProfiles: false, windowsActivity: false, openFolderPath: false, recentlyOpenedFile: false, usbUsageDeviceRecord: false, usbDeviceInformation: false, syslogFile: false, securityLogFile: false, emailListReacord: false, emailPath: false, emailListRecord: false, }
    const initAllFilesDropDownData: AllFilesDropDownData = { isAllFilesSelected: true, keyPath: '', keywordType: '影音檔', keywordFileName: '', keywordContent: '', fileSize: 'min', fileSizeValue: 0, fileUnit: 'MB', onlySearchDeletedFile: false }
    const initDateModuleData: IDateModuleData = { dateModuleData: [{ name: '最近24小時', value: 24 }, { name: "最近1周", value: 168 }, { name: "最近1個月", value: 720 }, { name: "自訂", value: 0 }], startTime: 0, endTime: 0 }
    const [memoryDropDownSelected, setMemoryDropDownSelected] = useState<MemorySelectedData>(initMemoryDropDownSelected)
    const [forensicsSelectedData, setForensicsSelectedData] = useState<ForensicsSelectedData>(initForensicsSelectedData)
    const [allFilesDropDownData, setallFilesDropDownData] = useState<AllFilesDropDownData>(initAllFilesDropDownData)
    const [dateModuleData, setDateModuleData] = useState<IDateModuleData>(initDateModuleData)
    const [responseFromElasticsearch, setResponseFromElasticsearch] = useState<any>([])
    const [ConditionWhenQuerySendToElasticsearch, setConditionWhenQuerySendToElasticsearch] = useState<any>([])

    const [groups, setGroups] = useState<IGenerateGroup[]>([])
    const [uidOnHand, setUidOnHand] = useState<IelasticQuery>({uuid: '', index: ''})
    const [reRender, setReRender] = useState<boolean>(true);

    

    const fetchGroups = async () => {
        const fetchData = await axiosClient.get(`${urlRoot}${API.deviceGroups}`);
        const generateData = generateGroup(fetchData.data.data)
        setGroups(generateData)
    }



    const fetchElasticSearch = useMutation({  // elastic search entry
        mutationFn: (mutationData: any) => {
            // console.log("input", mutationData)
            return axiosElastic.post(mutationData.url, mutationData.body)
        },
        onSuccess: (result) => {
            // console.log('onSuccess', result.data.hits);
        },
        onError: (error:any) => {
            console.log("Error Message",error.response.data.error.reason,"-----",error.response.data.error.index);
        }
    })

      
      
    const fetchElasticDetail= useMutation({  // elastic search entry
        mutationFn: () => {
            return axiosElastic.post(`${elasticRoot}${uidOnHand.index}/${elasticChildUrl.search}`, {
                "size": 1,
                "query": {
                    "query_string": {
                        "fields": ["uuid"],
                        "query": uidOnHand.uuid
                    }
                }
            }
            );
        },
        onSuccess: (result) => {
            console.log('onSuccess', result.data.hits);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    useEffect(()=>{
        if(fetchElasticDetail.data && fetchElasticDetail.data.data.hits.hits.length === 0){
          setReRender(true)
        }else{
          setReRender(false)
        }
    },[fetchElasticDetail.data])
      
      

    useEffect(() => {
        fetchGroups()
    }, [])


    const generateGroup = (arr: requestHostData[]): IGenerateGroup[] => { //重新排序群組
        // todo 需要重構成fp
        // todo 加入錯誤判斷
        const groupMap: Map<string, oneHostData[]> = new Map();
        arr.forEach((item) => {
            item.group.forEach((groupName) => {
                const devicesInGroup = groupMap.get(groupName) || [];
                devicesInGroup.push(item);
                groupMap.set(groupName, devicesInGroup);
            });
        });
        const result: IGenerateGroup[] = [];
        groupMap.forEach((devices, groupName) => {
            result.push({ group: groupName, devices: devices });
        });
        return result;
    }




    const handleSubmit = async () => {
        try {
            console.log('submit')
            let cleanIndex = generateCleanIndexs(memoryDropDownSelected, forensicsSelectedData, allFilesDropDownData)
            // 用所使用到的indexs生成左方列表node
            // TODO: 這邊要根據單選或複選決定URL 與 request body
            console.log(cleanIndex)
            let mutationDataForTable = generateUrlAndBodyForElasticsearch(cleanIndex, selectedHost, dateModuleData.startTime, dateModuleData.endTime)
            // 得到chart資料
            let dotsInChart = await generateDotsListForChart(cleanIndex, selectedHost, dateModuleData.startTime, dateModuleData.endTime, fetchElasticSearch)
            // 得到table資料
            // let responseFromElasticsearchForTable = await fetchElasticSearch.mutateAsync(mutationDataForTable)
            let responseFromElasticsearchForTable = await fetchElasticSearch.mutateAsync(mutationDataForTable)
            let afterResponseState = {
                fromIndex: 0, // 從第幾筆開始
                size: 999, // 一次取得幾筆
                hostList: selectedHost, // 所有主機列表
                indexList: cleanIndex, // 所有index列表
                timeRange: { // 時間範圍
                    startTime: dateModuleData.startTime,
                    endTime: dateModuleData.endTime
                },
                leftSelectedList: { // 左方列表
                    analysisIndex: cleanIndex,
                    selectedIndex: []
                },
                chartData: dotsInChart,   // 圖表資料
                tableData: responseFromElasticsearchForTable, // 表格資料
                detailData: {  // 詳細資料
                }
            }
            setDataFromTopAnalysisButton(afterResponseState)
        }
        catch (error) {
            setDataFromTopAnalysisButton(initialState)
        }

    }

    interface IinitialState {
        fromIndex: number, // 從第幾筆開始
        size: number, // 一次取得幾筆
        hostList: string[], // 所有主機列表
        indexList: IOneNode[], // 所有index列表
        timeRange: { // 時間範圍
            startTime: number,
            endTime: number
        },
        leftSelectedList: { // 左方列表
            analysisIndex: IOneNode[],    // 所有index列表
            selectedIndex: string[]     // 所有被選取的index列表
        },
        chartData: any,// 圖表資料
        tableData: {  // 表格資料
            // ...
        },
        detailData: {  // 詳細資料
        }
    }

    const initialState: IinitialState = {
        fromIndex: 0, // 從第幾筆開始
        size: 999, // 一次取得幾筆
        hostList: [], // 所有主機列表
        indexList: [], // 所有index列表
        timeRange: { // 時間範圍
            startTime: dateModuleData.startTime,
            endTime: dateModuleData.endTime
        },
        leftSelectedList: { // 左方列表
            analysisIndex: [],    // 所有index列表
            selectedIndex: []     // 所有被選取的index列表
        },
        chartData: [],// 圖表資料
        tableData: {  // 表格資料
            // ...
        },
        detailData: {  // 詳細資料
        }
    }
    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case "setDataFromTopAnalysisButton":
                // 更改 1.左方列表 2.中上圖表 3.中下表格 4.右方詳細資料 , 5.儲存所選取的主機們、時間範圍
                // console.log("更改 1.左方列表 2.中上圖表 3.中下表格 4.右方詳細資料 5.儲存所選取的主機們、時間範圍")
                return {
                    ...state,
                    fromIndex: 0,  // 從第幾筆開始歸零
                    size: 999,
                    hostList: action.data.hostList,  //儲存主機們
                    indexList: action.data.indexList, // 儲存index們
                    timeRange: {     // 儲存時間範圍
                        startTime: action.data.timeRange.startTime,
                        endTime: action.data.timeRange.endTime
                    },
                    leftSelectedList: {
                        ...state.leftSelectedList,
                        analysisIndex: action.data.leftSelectedList.analysisIndex      //左方列表
                    },
                    tableData: action.data.tableData,  //中下表格
                    chartData: action.data.chartData   //中上圖表
                }
            case "setDataFromLeftSelectedList":
                // 更改 1.中上圖表 2.中下表格 3.右方詳細資料
                console.log("更改 1.中上圖表 2.中下表格 3.右方詳細資料 4.累計比數歸零 5.紀錄被點選到的左方index")
                return {
                    ...state,
                    fromIndex: 0,  // 4.累計比數歸零
                    leftSelectedList: {
                        ...state.leftSelectedList,
                        selectedIndex: action.data.leftSelectedList.selectedIndex  //5.紀錄被點選到的左方index
                    },
                    chartData: action.data.chartData,   //1.中上圖表
                    tableData: action.data.tableData,  //2.中下表格
                    detailData: {} //3.右方詳細資料
                }
            case "setDataFromTableRowClick":
                // 更改 1.右方詳細資料
                console.log("更改 1.右方詳細資料")
                return state
            default:
                return state
        }
    }
    const [dataForDisplay, setDataForDisplay] = useReducer(reducer, initialState)

    // 這個function 開始分析按鈕成功從elasticsearch取得資料後
    const setDataFromTopAnalysisButton = (afterResponseState: any) => {
        setDataForDisplay({ type: "setDataFromTopAnalysisButton", data: afterResponseState })
    }
    // 這個function 用在左方列表被點選並從elasticsearch取得資料後
    const setDataFromLeftSelectedList = (afterSelectedLeftListResponseState: any) => {
        setDataForDisplay({ type: "setDataFromLeftSelectedList", data: afterSelectedLeftListResponseState })
    }
    // 這個function 用在表格其中一列被點選並從elasticsearch取得資料後
    const setDataFromTableRowClick = () => {
        setDataForDisplay({ type: "setDataFromTableRowClick" })
    }




    return (
        <div>
            <CommonHeader isDarkTheme={false} />
            <button onClick={() => console.log(dataForDisplay)}>123</button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
                <AnalysisSettingBar
                    groups={groups}
                    selectedHost={selectedHost}
                    setSelectedHost={setSelectedHost}
                    selectedHostGroup={selectedHostGroup}
                    setSelectedHostGroup={setSelectedHostGroup}
                    memoryDropDownSelected={memoryDropDownSelected}
                    setMemoryDropDownSelected={setMemoryDropDownSelected}
                    forensicsSelectedData={forensicsSelectedData}
                    setForensicsSelectedData={setForensicsSelectedData}
                    allFilesDropDownData={allFilesDropDownData}
                    setallFilesDropDownData={setallFilesDropDownData}
                    setResponseFromElasticsearch={setResponseFromElasticsearch}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    // fetchElasticSearch={fetchElasticSearch}
                    dateModuleData={dateModuleData}
                    setDateModuleData={setDateModuleData}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right', paddingRight: '10px' }}>
                    <Button
                        disabled={selectedId.length === 0}
                        variant="contained"
                        size="large"
                        onClick={() => {
                            handleSubmit()
                        }}
                    >
                        開始分析
                    </Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 5fr 2fr', height: "200px" }}>
                <div style={{ padding: "10px" }}>
                    <LeftSelectList
                        state={dataForDisplay}
                        fetchElasticSearch={fetchElasticSearch}
                        setDataForDisplay={setDataForDisplay}
                    />
                </div>
                <div style={{ width: "1200px" }}>
                    <div style={{ height: "400px" }}>
                        <AnalysisPageChart
                            dotsInChart={dataForDisplay.chartData}
                        />
                    </div>
                    <ElasticGrid fetchData={fetchElasticSearch} setUidOnHand={setUidOnHand} fetchElasticDetail={fetchElasticDetail} />

                </div>
                <RightBar fetchElasticDetail={fetchElasticDetail} reRender={reRender}/>
            </div>

        </div>
    )
}

export default AnalysisPage