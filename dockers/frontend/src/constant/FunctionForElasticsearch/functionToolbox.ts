import { IOneNode, ITimeNode, MemorySelectedData } from "../interfaceBoard"
import { elasticRoot, elasticChildUrl, mainTableName } from ".././index"
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { translateChineseToElasticsearchTableIndex, mainTimeColumnInTable } from "../AnalysisPage/functionToolbox";


export function generateLeftListCountQueryList(
  cleanIndex: (string | IOneNode)[],
  memoryDropDownSelected: MemorySelectedData,
  selectedId: readonly string[],
  startTime: number,
  endTime: number,
  mainSearchKeyword: string
) {
  let requests = [{}]
  let nodeList = dealCleanIndex(cleanIndex)
  const indexArr = generateIndexArr(cleanIndex)
  let indexInElasticsearchTable = indexArr.map((item) => translateChineseToElasticsearchTableIndex(item))
  let indexStringList = indexInElasticsearchTable.join(",")
  const url =
    elasticRoot === 'http://localhost:6969/' ?   // 判斷環境是否為local
      `${elasticRoot}${mainTableName.ed_all}${elasticChildUrl.search}` :
      `${elasticRoot}${indexStringList}/${elasticChildUrl.msearch}`
  nodeList.map((oneNode) => {
    let tempArr = [oneNode]
    let mutationDataForOneNodeInChart = generateUrlAndBodyForElasticsearch("box", tempArr, memoryDropDownSelected, selectedId, startTime, endTime, mainSearchKeyword)
    // 這邊不適用mutationDataForOneNodeInChart內帶的 url ， 因為搜尋邏輯不同
    requests.push(mutationDataForOneNodeInChart.body)
    requests.push({})
  })
  console.log(requests)



  const headers = {
    'Content-Type': 'application/x-ndjson'
  };
  const requestBody = requests.map(req => JSON.stringify(req)).join('\n') + '\n';
  let res = {
    headers: headers,
    requestBody: requestBody,
    url: url,
  }
  return res




  function dealCleanIndex(cleanIndex: (string | IOneNode)[]) {
    let list: IOneNode[] = []
    cleanIndex.map((oneNode) => {
      if (typeof oneNode !== "string") {
        goAll(oneNode, list)
      }
    })
    return list
    function goAll(oneNode: IOneNode, list: IOneNode[]) {
      if (oneNode.type === "group") {
        oneNode.children.map((childNode) => {
          goAll(childNode, list)
        })
      } else {
        list.push(oneNode)
      }

    }
  }
}




export function generateDotsListForChartWithBoxQuery(responseFromElasticsearchForChart: AxiosResponse<any, any>, timeList: ITimeNode[]) {
  let res = []
  try {
    console.log(responseFromElasticsearchForChart)
    for (let i = 0; i < responseFromElasticsearchForChart.data.responses.length; i++) {
      let oneNode = {
        name: dayjs(timeList[i].startTime).format("YYYY/MM/DD/HH:mm"),
        totalCount: responseFromElasticsearchForChart.data.responses[i].hits.total  // 改成oneTimeResponse.data.
      }
      res.push(oneNode)
    }
    return res
  } catch {
    console.log("錯誤回報123")
    return []
  }
}


export function generateTimeListForChart(startTime: number, endTime: number): ITimeNode[] {
  interface ITimeNode {
    startTime: number;
    endTime: number;
  }
  //   //  1天以內，給格1小時，一筆資料
  //   //  8天內，每1格式，天小時
  //   //  8天以上~15天，每天12小時1格
  //   //  15天以上，每24小時1格
  enum TimeRange {
    OneHour = 60 * 60 * 1000,
    EightDays = 60 * 60 * 24 * 8 * 1000,
    FifteenDays = 60 * 60 * 24 * 15 * 1000,
  }
  const timeRangeInTimestamp = endTime - startTime;
  const timeNodeArr: ITimeNode[] = [];
  let timeLength: number;
  if (timeRangeInTimestamp <= TimeRange.OneHour) {
    timeLength = TimeRange.OneHour;
  } else if (timeRangeInTimestamp <= TimeRange.EightDays) {
    const oneBlockHour = Math.ceil(timeRangeInTimestamp / (24 * 60 * 60 * 1000));
    timeLength = oneBlockHour * TimeRange.OneHour;
  } else if (timeRangeInTimestamp <= TimeRange.FifteenDays) {
    timeLength = 12 * TimeRange.OneHour;
  } else {
    timeLength = 24 * TimeRange.OneHour;
  }
  for (let i = 0; i < timeRangeInTimestamp; i += timeLength) {
    const currentStartTime = startTime + i;
    const currentEndTime = Math.min(currentStartTime + timeLength, endTime);
    const timeNode: ITimeNode = {
      startTime: currentStartTime,
      endTime: currentEndTime,
    };

    timeNodeArr.push(timeNode);

    if (currentEndTime === endTime) {
      break;
    }
  }

  return timeNodeArr;
}




export function generateDotsListForChartInBoxQuery(
  cleanIndex: (string | IOneNode)[],
  memoryDropDownSelected: MemorySelectedData,
  selectedId: readonly string[],
  startTime: number,
  endTime: number,
  mainSearchKeyword: string
) {
  let requests = [{}]
  let url = ""
  let timeListForChart = generateTimeListForChart(startTime, endTime)
  for (let i = 0; i < timeListForChart.length; i++) {
    let mutationDataForOneNodeInChart = generateUrlAndBodyForElasticsearch("box", cleanIndex, memoryDropDownSelected, selectedId, timeListForChart[i].startTime, timeListForChart[i].endTime, mainSearchKeyword)
    url = mutationDataForOneNodeInChart.url
    requests.push(mutationDataForOneNodeInChart.body)
    requests.push({})
  }
  const headers = {
    'Content-Type': 'application/x-ndjson'
  };
  const requestBody = requests.map(req => JSON.stringify(req)).join('\n') + '\n';
  let res = {
    headers: headers,
    requestBody: requestBody,
    url: url,
    timeList: timeListForChart
  }
  return res
}



export function generateUrlAndBodyForElasticsearch(
  queryType: "normal" | "box",
  cleanData: (string | IOneNode)[],
  memoryDropDownSelected: MemorySelectedData,
  selectedId: readonly string[],
  startTime: number,
  endTime: number,
  mainSearchKeyword: string,
  fromIndex: number = 0,
  subSearchKeyword: string[] = []
) {
  const resForMemory = generateMemoryDetailForElasitcSearch(memoryDropDownSelected)
  const indexArr = generateIndexArr(cleanData)
  const indexInElasticsearchTable = indexArr.map((item) => translateChineseToElasticsearchTableIndex(item))
  const indexStringList = indexInElasticsearchTable.join(",")
  const url =
    elasticRoot === 'http://localhost:6969/' ?   // 判斷環境是否為local
      `${elasticRoot}${mainTableName.ed_all}${elasticChildUrl.search}` :
      queryType === "normal" ?
        `${elasticRoot}${indexStringList}/${elasticChildUrl.search}` :
        `${elasticRoot}${indexStringList}/${elasticChildUrl.msearch}`
  const fieldTypeInElasticsearchIsInteger = ["pid", "parent_pid", "processid", "startboundary",
    "endboundary", "estimatedsize", "runcount", "eventrecordid", "eventid", "version", "task", "opcode", "executionprocessid", "executionthreadid", "of_times_executed", "focus_count", "slotnum", "visit_count", "received_bytes",
    "total_bytes", "creation_utc", "expires_utc", "last_access_utc", "source_port", "parent", "content_length", "usage_counter", "reuse_counter", "syncStatus", "fetch_count", "frequency", "table_id", "filesize", "entry_id", "priority", "is_local_only",
    "etag", "created_in_cloud", "record_id", "app_id", "bytes_sent", "bytes_recvd", "interfaceluid", "TimeToLive", "InstanceId", "DataLength", "Section", "Status", "Type", "dhcp_enabled", "ddns_enabled"]
  const indexListInQueryString = indexInElasticsearchTable.join(" OR ")
  const agentListInQueryString = selectedId.join(" OR ")
  const gte = startTime / 1000
  const lte = endTime / 1000
  const allFileKeyWord = mainSearchKeyword ? mainSearchKeyword : ""
  const mainSearchKeywordQuery = generateMainSearchKeywordQuery(allFileKeyWord)
  const subSearchKeywordQuery = generateSubSearchKeywordQuery(subSearchKeyword)

  // 針對除了ed_memory以外的query body特別處理
  const without_ed_memory_query_body = {
    "bool": {
      "must_not": [
        {
          "query_string": {
            "fields": [
              "_index"
            ],
            "query": "ed_memory"
          }
        }
      ],
      "must": [
        // {       // 選定主機
        //   "query_string": {
        //     "fields": [
        //       "agent"
        //     ],
        //     "query": `${agentListInQueryString}`
        //   }
        // },
        {     // 選定的index
          "query_string": {
            "fields": [
              "_index"
            ],
            "query": `${indexListInQueryString}`
            // "query": "ed_arpcache"
          }
        },
        // 加入全域搜尋主關鍵字
        ...mainSearchKeywordQuery,
        // 加入全域搜尋子關鍵字
        ...subSearchKeywordQuery,
        // 限制時間範圍
        {
          "query_string": {
            fields: ["date_main"],
            "query": `[${gte} TO ${lte}]`
          }
        }
      ]
    }
  }

  // 針對ed_memory的query body特別處理
  const ed_memory_query_body = {
    "bool": {
      "must": [
        {       // 限制_index為ed_memory
          "query_string": {
            "fields": [
              "_index"
            ],
            "query": "ed_memory"
          }
        },
        // {       // 選定主機
        //   "query_string": {
        //     "fields": [
        //       "agent"
        //     ],
        //     "query": `${agentListToQueryString}`
        //   }
        // },
        // 加入全域搜尋主關鍵字
        ...mainSearchKeywordQuery,
        // 加入全域搜尋關子鍵字
        ...subSearchKeywordQuery,
        // 限制時間範圍
        {
          "query_string": {
            "fields": ["date_main"],   // 這邊加入要篩選table的時間欄位名稱
            "query": `[${gte} TO ${lte}]`
          }
        },
        // 下方為針對ed_memory的特別條件    程序名稱=processName 程序連線IP=processConnectIP 動指令=dynamicCommand 程序MD5=processMD5 程序路徑=processPath  父程序路徑=parentProcessPath  數位簽章=digitalSign  載入其他dll=importOtherDLL 程序編號=processId 
        //                                風險等級=riskLevel  注入行為=injectActive 程序被注入行為=processBeInjected 開機起動=boot Hook=hook 隱藏=hide
        { "query_string": { "fields": ["processName"], "query": `*${resForMemory.processName}*` } },
        { "query_string": { "fields": ["processConnectIP"], "query": `*${resForMemory.processConnectIP}*` } },
        { "query_string": { "fields": ["dynamicCommand"], "query": `*${resForMemory.dynamicCommand}*` } },
        { "query_string": { "fields": ["processMD5"], "query": `*${resForMemory.processMD5}*` } },
        { "query_string": { "fields": ["processPath"], "query": `*${resForMemory.processPath}*` } },
        { "query_string": { "fields": ["parentProcessPath"], "query": `*${resForMemory.parentProcessPath}*` } },
        { "query_string": { "fields": ["digitalSign"], "query": `*${resForMemory.digitalSign}*` } },
        { "query_string": { "fields": ["importOtherDLL"], "query": `*${resForMemory.importOtherDLL}*` } },
        { "query_string": { "fields": ["processId"], "query": `${resForMemory.processId}` } },
        { "query_string": { "fields": ["riskLevel"], "query": `${resForMemory.riskLevel.join(" OR ")}` } },
        { "query_string": { "fields": ["injectActive"], "query": `${resForMemory.injectActive.join(" OR ")}` } },
        { "query_string": { "fields": ["processBeInjected"], "query": `${resForMemory.processBeInjected.join(" OR ")}` } },
        { "query_string": { "fields": ["boot"], "query": `${resForMemory.boot.join(" OR ")}` } },
        { "query_string": { "fields": ["hook"], "query": `${resForMemory.hook.join(" OR ")}` } },
        { "query_string": { "fields": ["hide"], "query": `${resForMemory.hide.join(" OR ")}` } }
      ]
    }
  }

  const requestModule = {
    url: url,
    body: {
      "from": fromIndex,
      "size": 1000,
      // "from": fromIndex,
      "query": {
        "bool": {
          "should":
            indexListInQueryString.includes("ed_memory") ?
              [ed_memory_query_body, without_ed_memory_query_body] :
              [without_ed_memory_query_body]
        }
      }
    }
  }
  return requestModule
  interface IMemoryDetailForElasitcSearch {
    "processName": string,
    "processConnectIP": string,
    "dynamicCommand": string,
    "processMD5": string,
    "processPath": string,
    "parentProcessPath": string,
    "digitalSign": string,
    "importOtherDLL": string,
    "processId": number | "*",
    "riskLevel": IRiskLevel[],
    "injectActive": IInjectActive[],      //PE=1,0 非PE=0,1  無=0,0
    "processBeInjected": IProcessBeInjected[],
    "boot": IBoot[],
    "hook": IHook[],
    "hide": IHide[],
  }
  type IRiskLevel = 0 | 1 | 2 | 3
  type IInjectActive = "0,0" | "0,1" | "1,0" | "1,1"
  type IProcessBeInjected = 0 | 1 | 2
  type IBoot = "0,0" | "0,1" | "1,0" | "1,1"
  type IHide = "0,0" | "0,1" | "1,0" | "1,1"
  type IHook = null | string

  function generateMainSearchKeywordQuery(allFileKeyWord: string) {
    const mainSearchKeywordQuery: any = []
    const mainSearchKeywordQueryForTypeIsNumber: any[] = []
    const mainSearchKeywordQueryForTypeIsString: any[] = []
    if (parseFloat(allFileKeyWord)) {
      fieldTypeInElasticsearchIsInteger.map((item) => {
        mainSearchKeywordQueryForTypeIsNumber.push(
          {
            "term": {
              [item]: `${allFileKeyWord}`
            }
          }
        )
      })
    }
    mainSearchKeywordQueryForTypeIsString.push(
      {
        "query_string": {
          "query": `*${allFileKeyWord}*`,
          "fuzziness": "AUTO",
        }
      }
    )
    mainSearchKeywordQuery.push({
      "bool": {
        "should": [
          ...mainSearchKeywordQueryForTypeIsNumber,
          ...mainSearchKeywordQueryForTypeIsString
        ]
      }
    })
    return mainSearchKeywordQuery
  }

  function generateSubSearchKeywordQuery(subSearchKeyword: string[]) {
    const subSearchKeywordQuery = []
    for (let i = 0; i < subSearchKeyword.length; i++) {
      const subSearchKeywordQueryForTypeIsNumber: any[] = []
      const subSearchKeywordQueryForTypeIsString: any[] = []
      if (parseFloat(subSearchKeyword[i])) {
        fieldTypeInElasticsearchIsInteger.map((item) => {
          subSearchKeywordQueryForTypeIsNumber.push(
            {
              "term": {
                [item]: `${subSearchKeyword[i]}`
              }
            }
          )
        })
      }

      subSearchKeywordQueryForTypeIsString.push(
        {
          "query_string": {
            "query": `*${subSearchKeyword[i]}*`,
            "fuzziness": "AUTO",
            // "operator": "and"
            // "flags": "CASE_INSENSITIVE"
          }
        }
      )

      subSearchKeywordQuery.push({
        "bool": {
          "should": [
            ...subSearchKeywordQueryForTypeIsNumber,
            ...subSearchKeywordQueryForTypeIsString
          ]
        }
      })
    }
    return subSearchKeywordQuery
  }

  function generateMemoryDetailForElasitcSearch(memoryDropDownSelected: MemorySelectedData) {
    const { processName, processConnectIP, dynamicCommand, processMD5, processPath, parentProcessPath, digitalSign, importOtherDLL, processId, riskLevel, injectActive, processBeInjected, boot, hook, hide } = memoryDropDownSelected
    const riskLevelArr: IRiskLevel[] = []
    const injectActiveArr: IInjectActive[] = []
    const processBeInjectedArr: IProcessBeInjected[] = []
    const bootArr: IBoot[] = []
    const hideArr: IHide[] = []
    const hookArr: IHook[] = []
    let processIdNumber: number = 0
    if (riskLevel) {
      riskLevel.map((item) => {
        switch (item) {
          case "一":
            riskLevelArr.push(0)
            break
          case "二":
            riskLevelArr.push(1)
            break
          case "三":
            riskLevelArr.push(2)
            break
          case "四":
            riskLevelArr.push(3)
            break
          default:
            break
        }
      })
    }
    if (processId) {
      processIdNumber = Number(processId)
    }
    if (injectActive) {
      injectActive.map((item) => {
        switch (item) {
          case "PE":
            injectActiveArr.push("1,0")
            break
          case "非PE程式碼":
            injectActiveArr.push("0,1")
            break
          case "無":
            injectActiveArr.push("0,0")
            break
          default:
            break
        }
      })
    }
    if (processBeInjected) {
      processBeInjected.map((item) => {
        switch (item) {
          case "有":
            processBeInjectedArr.push(1)
            break
          case "無":
            processBeInjectedArr.push(0)
            break
          default:
            break
        }
      })
    }
    if (boot) {
      boot.map((item) => {
        switch (item) {
          case "AutoRun":
            bootArr.push("0,1")
            break
          case "Service":
            bootArr.push("1,0")
            break
          case "無":
            bootArr.push("0,0")
            break
          default:
            break
        }
      })
    }
    if (hide) {
      hide.map((item) => {
        switch (item) {
          case "Process":
            hideArr.push("1,0")
            break
          case "File":
            hideArr.push("0,1")
            break
          case "無":
            hideArr.push("0,0")
            break
          default:
            break
        }
      })
    }
    if (hook) {
      hook.map((item) => {
        switch (item) {
          case "有":
            hookArr.push("*")
            break
          case "無":
            hookArr.push("null")
            break
          default:
            break
        }
      })
    }
    let res: IMemoryDetailForElasitcSearch = {
      processName: processName ? processName : "",
      processConnectIP: processConnectIP ? processConnectIP : "",
      dynamicCommand: dynamicCommand ? dynamicCommand : "",
      processMD5: processMD5 ? processMD5 : "",
      processPath: processPath ? processPath : "",
      parentProcessPath: parentProcessPath ? parentProcessPath : "",
      digitalSign: digitalSign ? digitalSign : "",
      importOtherDLL: importOtherDLL ? importOtherDLL : "",
      processId: processIdNumber !== 0 ? processIdNumber : "*",
      riskLevel: riskLevelArr,
      injectActive: injectActiveArr,
      processBeInjected: processBeInjectedArr,
      boot: bootArr,
      hook: hookArr,
      hide: hideArr,
    }
    return res
  }
}
function generateIndexArr(cleanData: (string | IOneNode)[], res: string[] = []) {
  for (let i = 0; i < cleanData.length; i++) {
    if (typeof (cleanData[i]) !== "string") {
      let oneNode = cleanData[i] as IOneNode
      if (oneNode.type === "item") {
        res.push(oneNode.name)
      } else {
        let secondNodeList = oneNode.children as IOneNode[]
        generateIndexArr(secondNodeList, res)
      }
    }
  }
  return res
}

