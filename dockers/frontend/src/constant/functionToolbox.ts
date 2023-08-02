import { IConnectStatus, IDevice, IFormtedConnectStatus, IFormatedDevice, scanning, dateForm, IOneNode, IDateModuleData, ITimeNode, MemorySelectedData, ForensicsSelectedData, AllFilesDropDownData } from "./interfaceBoard";
import dayjs, { Dayjs } from 'dayjs';
import { elasticRoot, elasticParent, elasticChildUrl, mainTableName } from "./index"



// 轉換成時間格式
export function formatTimestamp(timestamp?: number): string {
  if (!timestamp) return "- -";
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day}\n${hours}:${minutes}`;
}

// 轉換成字串
export function convertToStringWithCommas(arr: string[] | null): string {
  if (!arr) {
    return "- -";
  }
  return arr.join(", ");
}

export function convertToStringArray(arr: string[] | null): string {
  if (!arr) {
    return "-  -";
  }
  const stringArray = arr.map(item => `${item}:00`);
  return stringArray.join(",");
}

// 轉換成百分比(loading)或時間
// 如果有結束時間則顯示日期時間，否則出現數字progress 
const customObjectTime = (data: scanning) => {
  if (data.isFinish) {
    return data.finishTime !== null ? formatTimestamp(data.finishTime) : "- -";
  } else {
    return data.progress;
  }
};

// 轉換成每月幾號 每日幾點
const formatObjectTime = (data: dateForm) => {
  if (data.date === "" || data.time === "") {
    return "- -";
  }
  return `每月${data.date}日 \n 每日${data.time}`;
};

export const customData = (data: IDevice) => {
  const result: IFormatedDevice = {
    deviceId: data.deviceId,
    connection: data.connection ? 'true' : 'false',
    InnerIP: data.innerIP,
    deviceName: data.deviceName,
    groups: convertToStringWithCommas(data.groups),
    detectionMode: data.detectionMode ? 'true' : 'false',
    scanSchedule: convertToStringArray(data.scanSchedule),
    scanFinishTime: customObjectTime(data.scanFinishTime),
    collectSchedule: formatObjectTime(data.collectSchedule),
    collectFinishTime: customObjectTime(data.collectFinishTime),
    fileDownloadDate: formatObjectTime(data.fileDownloadDate),
    fileFinishTime: customObjectTime(data.fileFinishTime),
    imageFinishTime: customObjectTime(data.imageFinishTime),
  }
  return result;
}

export const customConnectedData = (data: IConnectStatus) => {
  const result: IFormtedConnectStatus = {
    deviceId: data.deviceId,
    connection: data.connection ? 'true' : 'false',
  }
  return result;
}

export const getStringLength = (text: string): number => {

  return text.length;
};


export const mergeObjects = (arr1: IFormatedDevice[], arr2: IFormtedConnectStatus[]) => {
  const merged: Record<string, IFormatedDevice> = {};

  arr1.forEach(obj => {
    merged[obj.deviceId] = {
      ...obj,
    };
  });

  arr2.forEach(obj => {
    if (merged[obj.deviceId]) {
      merged[obj.deviceId].connection = obj.connection;
    }
  });
  return Object.values(merged);
};


export const fixPaginationNumber = (totalPages: number) => {
  if (totalPages === 0) {
    return [5];
  } else if (totalPages > 100) {
    return [5, 25, 50, 100];
  } else if (totalPages > 50) {
    return [5, 25, 50];
  } else if (totalPages > 20) {
    return [5, 25];
  } else {
    return [5];
  }
};

export const matchObjects = (arr1: IFormatedDevice[], arr2: IFormatedDevice[] | []) => {
  const matched: Record<string, IFormatedDevice> = {};

  arr1.forEach(obj => {
    matched[obj.deviceId] = {
      ...obj,
    };
  });

  arr2.forEach(obj => {
    if (matched[obj.deviceId]) {
      matched[obj.deviceId] = obj;
    }
  });
  // console.log(matched);
  return Object.values(matched);
}

export const convertTimeStringsToString = (timeStrings: string[]): string => {
  const res = timeStrings
    .map((timeString) => Number(timeString.split(":")[0]))
    .sort((a, b) => a - b);

  return res.join(",");
};

// 將資料整理成可長出左方列表的node串
export function generateOneListWithCleanData(input: Object, Translator: Function = forensicsDropSelectorTranfer): IOneNode | string {
  let inputKeys = Object.keys(input)
  if (inputKeys.includes("isMemoryGroupSelected")) {
    let memoryNode: IOneNode = {
      name: "記憶體", type: "item", children: []
    }
    return memoryNode
  }
  if (inputKeys.includes("isForensicsSelected")) {
    // 痕跡取證的資料結構
    let forensicsGroupTree = {
      "browsingHistoryAndBookmarks": {
        "name": "網站瀏覽紀錄與書籤",
        "type": "group",
        "children": ["chromeBrowsingHistory", "chromeDownloadHistory", "chromeKeywordSearchHistory", "chromeLoginAccountAndPassword", "chromeBookmarks", "edgeBrowsingHistory", "ieBrowsingHistory", "edgeLoginAccountAndPassword", "ieLoginAccountAndPassword", "edgeBookmarks", "firefoxBrowsingHistory", "firefoxLoginAccountAndPassword", "firefoxBookmarks"]
      },
      "cacheAndCookieHistory": {
        "name": "cookie和cache紀錄",
        "type": "group",
        "children": ["chromeCache", "chromeCookies", "edgeCache", "edgeCookies", "ieCache", "firefoxCache", "firefoxCookies"]
      },
      "currentNetworkConnectionsHistory": {
        "name": "當下網路連線紀錄",
        "type": "group",
        "children": ["internetInformation", "unlimitedBasicInformation", "internetResources"]
      },
      "recentlyExecutedSoftwareLog": {
        "name": "最近執行軟體紀錄",
        "type": "group",
        "children": ["softwareInstalled", "detailedSystemServices", "remoteDesktopLoginAccountPassword", "systemInformation", "prefetch", "scheduleWork", "programNetworkTrafficTrace", "dnsInformation", "generalSystemServices", "bootProgram", "jumpList", "muicache", "applicationLogFiles", "machineCodeTraces", "programReadAndWriteTraces"]
      },
      "evanescentRecords": {
        "name": "消逝性紀錄",
        "type": "group",
        "children": ["executeProgram", "fileOpenedByTheProgram", "programConnectionInformation", "arpCache"]
      },
      "recentlyOpenedFileHistory": {
        "name": "最近開啟文件紀錄",
        "type": "group",
        "children": ["relativeShortcuts", "maasterUserProfiles", "windowsActivity", "openFolderPath", "recentlyOpenedFile"]
      },
      "usbUsageDeviceRecord": {
        "name": "usb使用裝置紀錄",
        "type": "group",
        "children": ["usbDeviceInformation", "syslogFile", "securityLogFile"]
      },
      "emailListReacord": {
        "name": "電子郵件清單紀錄",
        "type": "group",
        "children": ["emailPath", "emailListRecord"]
      }

    }
    let forensicsGroupTreeKeys = Object.keys(forensicsGroupTree)
    // 生成痕跡取證的節點
    let forensicsNode: IOneNode = {
      name: "痕跡取證", type: "group", children: []
    }
    for (let k = 0; k < forensicsGroupTreeKeys.length; k++) {
      let key = forensicsGroupTreeKeys[k] as keyof typeof forensicsGroupTree
      let firstGroup = forensicsGroupTree[key]
      // 生成痕跡取證內子群組節點
      let firstGroupNode: IOneNode = {
        name: firstGroup.name, type: "group", children: []
      }
      let firstGroupList = []
      for (let i = 0; i < firstGroup.children.length; i++) {
        for (let j = 0; j < inputKeys.length; j++) {
          if (firstGroup.children[i] === inputKeys[j]) {
            let name = Translator(inputKeys[j])
            let oneNode: IOneNode = { name: name, type: "item", children: [] }
            firstGroupList.push(oneNode)
          }
        }
      }
      // 判斷子群組節點是否有子節點,有的話才加入
      if (firstGroupList.length !== 0) {
        firstGroupNode.children = firstGroupList
        forensicsNode.children.push(firstGroupNode)
      }
    }
    // 判斷痕跡取證節點是否有子節點,有的話才加入
    if (forensicsNode.children.length !== 0) {
      return forensicsNode
    }
  }

  if (inputKeys.includes("isAllFilesSelected")) {
    let allFilesNode: IOneNode = {
      name: "檔案總表", type: "item", children: []
    }
    return allFilesNode
  }
  return ""
}



// 整理資料留下被選取的搜尋條件
export function pickUpUsefulData(input: object) {
  let inputKeys = Object.keys(input)
  let newObject: object = new Object()
  for (let i = 0; i < inputKeys.length; i++) {
    let key = inputKeys[i] as keyof typeof input
    if (typeof (input[key]) === "string") {
      if (input[key] !== "") {
        newObject[key] = input[key]
      }
    } else if (typeof (input[key]) === "boolean") {
      if (input[key] === true) {
        newObject[key] = input[key]
      }
    } else {
      let oneContent = Object.values(input[key] as Object)
      if (oneContent.length !== 0) {
        newObject[key] = input[key]
      }
    }
  }
  return newObject
}

export const translateChineseToElasticsearchTableIndex = (input: string): string => {    // 後面有加 // 表示尚未有對應的table名稱
  switch (input) {
    case "記憶體":
      return "ed_memory"
    case "檔案總表":
      return "ed_allfile"    //
    case "Chrome 瀏覽紀錄":
      return "ed_chromehistory"
    case "Chrome 下載紀錄":
      return "ed_chromedownload"
    case "Chrome 關鍵字搜尋紀錄":
      return "ed_chromekeywordsearch"
    case "Chrome 登入帳密":
      return "ed_chromelogin"
    case "Chrome 書籤":
      return "ed_chromebookmarks"
    case "Edge 瀏覽紀錄":
      return "ed_edgehistory"
    case "IE 瀏覽紀錄":
      return "ed_iehistory"
    case "Edge 登入帳密":
      return "ed_edgelogin"
    case "IE 登入帳密":
      return "ed_ielogin"
    case "Edge 書籤":
      return "ed_edgebookmarks"
    case "Firefox 瀏覽紀錄":
      return "ed_firefoxhistory"
    case "Firefox 登入帳密":
      return "ed_firefoxlogin"           //ed_firefoxlogin
    case "Firefox 書籤":
      return "ed_firefoxbookmarks"
    case "Chrome cache":
      return "ed_chromecache"
    case "Chrome cookies":
      return "ed_chromecookies"      //ed_chromecookies
    case "Edge cache":
      return "ed_edgecache"
    case "Edge cookies":
      return "ed_edgecookies"
    case "IE cache":
      return "ed_iecache"         //ed_iecache
    case "Firefox cache":
      return "ed_firefoxcache"
    case "Firefox cookies":
      return "ed_firefoxcookies"
    case "網路基本資訊":
      return "ed_netadapters"
    case "無線網路資訊":
      return "ed_wireless"
    case "網路資源":
      return "ed_networkresources"
    case "已安裝軟體":
      return "ed_installedsoftware"
    case "一般系統服務":
      return "ed_service"
    case "細部系統服務":
      return "ed_baseservice"
    case "開機啟動程式":
      return "ed_startrun"
    case "遠端桌面登入帳密":
      return "ed_remotedesktoplogin"
    case "JumpList":
      return "ed_jumplist"
    case "系統資訊":
      return "ed_systeminfo"       // ed_systeminfo
    case "MUI 快取":
      return "ed_muicache"
    case "Prefetch":
      return "ed_prefetch"
    case "應用程式日誌檔":
      return "ed_eventapplication"
    case "排程工作":
      return "ed_taskschedule"
    case "機碼使用痕跡":
      return "ed_userassist"       //
    case "程式網路流量痕跡":
      return "ed_networkdatausagemonitor"        // ed_appresourceusagemonitor
    case "程式讀寫痕跡":
      return "ed_appresourceusagemonitor"
    case "DNS資訊":
      return "ed_dnsinfo"
    case "執行程序":
      return "ed_process"
    case "程序連線資訊":
      return "ed_network"    //
    case "程式開啟之檔案":
      return "ed_openedfiles"
    case "ARP快取":
      return "ed_arpcache"
    case "相關捷徑":
      return "ed_shortcuts"
    case "開啟的資料夾路徑":
      return "ed_shellbags"     //ed_shellbags
    case "主機用戶資料":
      return "ed_userprofiles"
    case "最近開啟檔案":
      return "ed_recentfile"          // ed_recentfile
    case "Windows Activity":
      return "ed_windowsactivity"
    case "USB 裝置資訊":
      return "ed_usbdevices"
    case "安全性日誌檔":
      return "ed_eventsecurity"
    case "系統日誌檔":
      return "ed_eventsystem"
    case "電子郵件路徑":
      return "ed_emailpath"
    case "電子郵件清單紀錄":
      return "ed_email"
    default:
      return "withoutMatch"
  }
}

export const translateChineseToEnglish = (input: string): string => {
  switch (input) {
    case "Chrome 瀏覽紀錄":
      return "chromeBrowsingHistory"
    case "Chrome 下載紀錄":
      return "chromeDownloadHistory"
    case "Chrome 關鍵字搜尋紀錄":
      return "chromeKeywordSearchHistory"
    case "Chrome 登入帳密":
      return "chromeLoginAccountAndPassword"
    case "Chrome 書籤":
      return "chromeBookmarks"
    case "Edge 瀏覽紀錄":
      return "edgeBrowsingHistory"
    case "IE 瀏覽紀錄":
      return "ieBrowsingHistory"
    case "Edge 登入帳密":
      return "edgeLoginAccountAndPassword"
    case "IE 登入帳密":
      return "ieLoginAccountAndPassword"
    case "Edge 書籤":
      return "edgeBookmarks"
    case "Firefox 瀏覽紀錄":
      return "firefoxBrowsingHistory"
    case "Firefox 登入帳密":
      return "firefoxLoginAccountAndPassword"
    case "Firefox 書籤":
      return "firefoxBookmarks"
    case "Chrome cache":
      return "chromeCache"
    case "Chrome cookies":
      return "chromeCookies"
    case "Edge cache":
      return "edgeCache"
    case "Edge cookies":
      return "edgeCookies"
    case "IE cache":
      return "ieCache"
    case "Firefox cache":
      return "firefoxCache"
    case "Firefox cookies":
      return "firefoxCookies"
    case "網路網路資訊":
      return "internetInformation"
    case "無線基本資訊":
      return "unlimitedBasicInformation"
    case "網路資源":
      return "internetResources"
    case "已安裝軟體":
      return "softwareInstalled"
    case "一般系統服務":
      return "generalSystemServices"
    case "細部系統服務":
      return "detailedSystemServices"
    case "開機啟動程式":
      return "bootProgram"
    case "遠端桌面登入帳密":
      return "remoteDesktopLoginAccountPassword"
    case "JumpList":
      return "jumpList"
    case "系統資訊":
      return "systemInformation"
    case "MUI 快取":
      return "muicache"
    case "Prefetch":
      return "prefetch"
    case "應用程式日誌檔":
      return "applicationLogFiles"
    case "排程工作":
      return "scheduleWork"
    case "機碼使用痕跡":
      return "machineCodeTraces"
    case "程式網路流量痕跡":
      return "programNetworkTrafficTrace"
    case "程式讀寫痕跡":
      return "programReadAndWriteTraces"
    case "DNS資訊":
      return "dnsInformation"
    case "執行程序":
      return "executeProgram"
    case "程序連線資訊":
      return "fileOpenedByTheProgram"
    case "程式開啟之檔案":
      return "programConnectionInformation"
    case "ARP快取":
      return "arpCache"
    case "相關捷徑":
      return "relativeShortcuts"
    case "開啟的資料夾路徑":
      return "maasterUserProfiles"
    case "主機用戶資料":
      return "windowsActivity"
    case "最近開啟檔案":
      return "openFolderPath"
    case "Windows Activity":
      return "recentlyOpenedFile"
    case "USB 裝置資訊":
      return "usbDeviceInformation"
    case "安全性日誌檔":
      return "syslogFile"
    case "系統日誌檔":
      return "securityLogFile"
    case "電子郵件路徑":
      return "emailPath"
    case "電子郵件清單紀錄":
      return "emailListRecord"
    default:
      return "withoutMatch"
  }
}

export const forensicsDropSelectorTranfer = (input: string): string => {
  switch (input) {
    case "chromeBrowsingHistory":
      return "Chrome 瀏覽紀錄"
    case "chromeDownloadHistory":
      return "Chrome 下載紀錄"
    case "chromeKeywordSearchHistory":
      return "Chrome 關鍵字搜尋紀錄"
    case "chromeLoginAccountAndPassword":
      return "Chrome 登入帳密"
    case "chromeBookmarks":
      return "Chrome 書籤"
    case "edgeBrowsingHistory":
      return "Edge 瀏覽紀錄"
    case "ieBrowsingHistory":
      return "IE 瀏覽紀錄"
    case "edgeLoginAccountAndPassword":
      return "Edge 登入帳密"
    case "ieLoginAccountAndPassword":
      return "IE 登入帳密"
    case "edgeBookmarks":
      return "Edge 書籤"
    case "firefoxBrowsingHistory":
      return "Firefox 瀏覽紀錄"
    case "firefoxLoginAccountAndPassword":
      return "Firefox 登入帳密"
    case "firefoxBookmarks":
      return "Firefox 書籤"
    case "chromeCache":
      return "Chrome cache"
    case "chromeCookies":
      return "Chrome cookies"
    case "edgeCache":
      return "Edge cache"
    case "edgeCookies":
      return "Edge cookies"
    case "ieCache":
      return "IE cache"
    case "firefoxCache":
      return "Firefox cache"
    case "firefoxCookies":
      return "Firefox cookies"
    case "internetInformation":
      return "網路網路資訊"
    case "unlimitedBasicInformation":
      return "無線基本資訊"
    case "internetResources":
      return "網路資源"
    case "softwareInstalled":
      return "已安裝軟體"
    case "generalSystemServices":
      return "一般系統服務"
    case "detailedSystemServices":
      return "細部系統服務"
    case "bootProgram":
      return "開機啟動程式"
    case "remoteDesktopLoginAccountPassword":
      return "遠端桌面登入帳密"
    case "jumpList":
      return "JumpList"
    case "systemInformation":
      return "系統資訊"
    case "muicache":
      return "MUI 快取"
    case "prefetch":
      return "Prefetch"
    case "applicationLogFiles":
      return "應用程式日誌檔"
    case "scheduleWork":
      return "排程工作"
    case "machineCodeTraces":
      return "機碼使用痕跡"
    case "programNetworkTrafficTrace":
      return "程式網路流量痕跡"
    case "programReadAndWriteTraces":
      return "程式讀寫痕跡"
    case "dnsInformation":
      return "DNS資訊"
    case "executeProgram":
      return "執行程序"
    case "fileOpenedByTheProgram":
      return "程序連線資訊"
    case "programConnectionInformation":
      return "程式開啟之檔案"
    case "arpCache":
      return "ARP快取"
    case "relativeShortcuts":
      return "相關捷徑"
    case "maasterUserProfiles":
      return "開啟的資料夾路徑"
    case "windowsActivity":
      return "主機用戶資料"
    case "openFolderPath":
      return "最近開啟檔案"
    case "recentlyOpenedFile":
      return "Windows Activity"
    case "usbDeviceInformation":
      return "USB 裝置資訊"
    case "syslogFile":
      return "安全性日誌檔"
    case "securityLogFile":
      return "系統日誌檔"
    case "emailPath":
      return "電子郵件路徑"
    case "emailListRecord":
      return "電子郵件清單紀錄"
    default:
      return "withoutMatch"
  }
}

export const mainTimeColumnInTable = (input: string): string => {
  switch (input) {
    case "ed_chromehistory":
      return "visit_time"
    case "ed_chromedownload":
      return "start_time"
    case "ed_chromekeywordsearch":
      return ""
    case "ed_chromelogin":
      return "date_created"
    case "ed_chromebookmarks":
      return "date_added"
    case "ed_edgehistory":
      return "last_visit_time"
    case "ed_iehistory":
      return "visitedtime"
    case "ed_edgelogin":
      return "date_created"
    case "ed_ielogin":
      return "last_written"
    case "ed_edgebookmarks":
      return "date_added"
    case "ed_firefoxhistory":
      return "last_visit_date"
    case "ed_firefoxlogin":
      return "timelastused"
    case "ed_firefoxbookmarks":
      return "lastModified"
    case "ed_chromecache":
      return "date"
    case "ed_chromecookies":
      return "last_access_utc"
    case "ed_edgecache":
      return "last_modified"
    case "ed_edgecookies":
      return "last_access_utc"
    case "ed_iecache":
      return "lastaccesstime"
    case "ed_firefoxcache":
      return "last_fetched"
    case "ed_firefoxCookies":
      return "lastAccessed"
    case "ed_netadapters":
      return "valid_lifetime"
    case "ed_wireless":
      return "lastmodifiedtime"
    case "ed_networkresources":
      return ""
    case "ed_installedsoftware":
      return "registrytime"
    case "ed_service":
      return ""
    case "ed_baseservice":
      return ""
    case "ed_startrun":
      return ""
    case "ed_remotedesktoplogin":
      return "lastWritten"
    case "ed_jumplist":
      return "recordtime"
    case "ed_systeminfo":
      return ""
    case "ed_muicache":
      return ""
    case "ed_prefetch":
      return "lastruntime"
    case "ed_eventapplication":
      return "createdsystemtime"
    case "ed_taskschedule":
      return "lastruntime"
    case "ed_userassist":    
      return "modifiedtime"
    case "ed_networkdatausagemonitor":       //////////
      return "timestamp"
    case "ed_appresourceusagemonitor":             //////////
      return "timestamp"
    case "ed_dnsinfo":
      return ""
    case "ed_process":
      return "processcreatetime"
    case "ed_network":         //
      return ""
    case "ed_openedfiles":        ////
      return ""
    case "ed_arpcache":
      return ""
    case "ed_shortcuts":
      return "modifytime"
    case "ed_shellbags":
      return "accesstime"
    case "ed_userprofiles":
      return "lastlogontime"
    case "ed_recentfile":
      return "accesstime"
    case "ed_windowsactivity":
      return "last_modified_on_client"
    case "ed_usbdevices":
      return "last_arrival_date"
    case "ed_eventsecurity":
      return "createdsystemtime"
    case "ed_eventsystem":        //系統日誌檔
      return "createdsystemtime"
    case "ed_emailpath":
      return ""
    case "ed_email":
      return "Delivery_time"
    default:
      return "withoutMatch"
  }
}


export function generateUrlAndBodyForElasticsearch(cleanData: (string | IOneNode)[], selectedHost: string[], startTime: number, endTime: number) {
  const indexArr = generateIndexArr(cleanData)
  // console.log("indexArr", indexArr)
  let indexInElasticsearchTable = indexArr.map((item) => translateChineseToElasticsearchTableIndex(item))
  let indexCount = indexInElasticsearchTable.length
  // let urlFor
  let url = indexCount === 1 ? `${elasticRoot}${elasticParent}${elasticChildUrl.search}` : `${elasticRoot}${mainTableName.ed_main}${elasticChildUrl.search}`
  // 用下面if判斷環境辨識是否使用local，如果不是在local，且只有一個index，則將 url 根據indexInElasticsearchTable調整
  // console.log("elasticParent", elasticParent)
  // console.log("indexCount", indexCount)
  if (elasticParent !== "oneindex/" && indexCount === 1) {
    url = `${elasticRoot}${indexInElasticsearchTable[0]}/${elasticChildUrl.search}`
  }

  // console.log("url", url) 
  let indexListToQueryString = indexInElasticsearchTable.join(" OR ")
  let agentListToQueryString = selectedHost.join(" OR ")
  let searchDateColumnName =indexCount !== 1 ? "date" : mainTimeColumnInTable(indexInElasticsearchTable[0])
  let gte = startTime / 1000
  let lte = endTime / 1000

  let requestModuleForEd_Main = {
    url: url,
    body: {
      "size": 500,
      "from": 0,
      "query": {
        "bool": {
          "must": [
              { // 限制選擇的檔案總類
                "query_string": {
                  "fields": [
                    "index"
                  ],
                  "query": indexListToQueryString // 用 OR 連接不同的條件
                }
              },
              // { // 選擇那些主機 
              //   "query_string": {
              //     "fields": [
              //       "agent"
              //     ],
              //     "query": "8beba472f3f44cabbbb44fd232171933" // 用 OR 連接不同的主機ID
              //   }
              // },
              { // 限制時間範圍
                "range": {
                  "date": {
                    "gte": gte,
                    "lte": lte
                  }
                }
              }
          ]
        }
      }
    }
  }
  let requestModuleForOther = {
    url: url,
    body: {
      "size": 999, // 限制單次的資料取得筆數
      "from": 4, // 将其设置为 50（索引从 0 开始，所以从第 51 条数据开始）。这将从第 51 条数据开始返回结果。
      "query": {
        "bool": {
          "must": [
            // { // 選擇那些主機 
            //     "query_string": {
            //         "fields": [
            //             "agent"
            //         ],
            //         "query": "3e716e2d61ba910983cb456817116799 OR 3e716e2d61ba910983copewjfoe1855   " // 用 OR 連接不同的主機ID  {agents}
            //     }
            // },
                { // 限制時間範圍
                "range": {
                    [searchDateColumnName]: {
                        "gte": gte,
                        "lte": lte
                    }
                }
            }
          ]
        }
      }
    }
  }
  if (indexCount === 1) {
    return requestModuleForOther
  } else {
    return requestModuleForEd_Main
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
}


export function generateTimeListForChart(startTime: number, endTime: number) {
  //  1天以內，給格1小時，一筆資料
  //  8天內，每1格式，天小時
  //  8天以上~15天，每天12小時1格
  //  15天以上，每24小時1格
  let timeRangeInTimestamp = endTime - startTime
  let timeLength = 0  // 每個資料間隔時間
  let timeNodeArr: ITimeNode[] = []  // 所有資料點的開始與結束時間
  if (timeRangeInTimestamp > 0 && timeRangeInTimestamp <= 60 * 60 * 24 * 1000) {
    timeLength = 60 * 60 * 1000  // 1小時
  }
  if (timeRangeInTimestamp > 60 * 60 * 24 * 1000 && timeRangeInTimestamp <= 60 * 60 * 24 * 8 * 1000) {
    let oneBlockHour = Math.ceil(timeRangeInTimestamp / 24 / 60 / 60 / 1000)
    timeLength = 60 * 60 * oneBlockHour * 1000 // 1小時
  }
  if (timeRangeInTimestamp > 60 * 60 * 24 * 8 * 1000 && timeRangeInTimestamp <= 60 * 60 * 24 * 15 * 1000) {
    timeLength = 60 * 60 * 12 * 1000  // 12小時
  }
  if (timeRangeInTimestamp > 60 * 60 * 24 * 15 * 1000) {
    timeLength = 60 * 60 * 24 * 1000  // 24小時
  }
  for (let i = 0; i < timeRangeInTimestamp; i = i + timeLength) {
    if (i === 0) {
      let timeNode: ITimeNode = {
        startTime: startTime,
        endTime: startTime + timeLength
      }
      timeNodeArr.push(timeNode)
      continue
    } else {
      if (startTime + i + timeLength > endTime) {
        let timeNode: ITimeNode = {
          startTime: startTime + i,
          endTime: endTime
        }
        timeNodeArr.push(timeNode)
        break
      } else {
        let timeNode: ITimeNode = {
          startTime: startTime + i,
          endTime: startTime + i + timeLength
        }
        timeNodeArr.push(timeNode)
      }
    }
  }
  return timeNodeArr
}

// 過濾出有用選到的 index 們
export function generateCleanIndexs(memoryDropDownSelected: MemorySelectedData, forensicsSelectedData: ForensicsSelectedData, allFilesDropDownData: AllFilesDropDownData) {
  // 整理資料
  let cleanMemorySelectedData = pickUpUsefulData(memoryDropDownSelected)
  let cleanForensicsSelectedData = pickUpUsefulData(forensicsSelectedData)
  let cleanAllFilesDropDownData = pickUpUsefulData(allFilesDropDownData)
  // 整理後資料依照搜尋條件生成左方列表node
  let cleanAllFilesDropDownDataToOneNodeType = generateOneListWithCleanData(cleanAllFilesDropDownData, forensicsDropSelectorTranfer)
  let cleanForensicsSelectedDataToOneNodeType = generateOneListWithCleanData(cleanForensicsSelectedData, forensicsDropSelectorTranfer)
  let cleanMemorySelectedDataToOneNodeType = generateOneListWithCleanData(cleanMemorySelectedData)
  // 存放所有要生成的左方列表node
  let res = []
  if (cleanMemorySelectedDataToOneNodeType !== "" && cleanMemorySelectedDataToOneNodeType !== undefined) {
    res.push(cleanMemorySelectedDataToOneNodeType)
  }
  if (cleanForensicsSelectedDataToOneNodeType !== "" && cleanForensicsSelectedDataToOneNodeType !== undefined) {
    res.push(cleanForensicsSelectedDataToOneNodeType)
  }
  if (cleanAllFilesDropDownDataToOneNodeType !== "" && cleanAllFilesDropDownDataToOneNodeType !== undefined) {
    res.push(cleanAllFilesDropDownDataToOneNodeType)
  }
  return res
}



export async function generateDotsListForChart(cleanIndex: (string | IOneNode)[], selectedHost: string[], startTime: number, endTime: number, fetchElasticSearch: any) {
  let timeListForChart = generateTimeListForChart(startTime, endTime)
  let res = []
  for (let i = 0; i < timeListForChart.length; i++) {
    let mutationDataForOneNodeInChart = generateUrlAndBodyForElasticsearch(cleanIndex, selectedHost, timeListForChart[i].startTime, timeListForChart[i].endTime)
    let oneTimeResponse = await fetchElasticSearch.mutateAsync(mutationDataForOneNodeInChart)
    let oneNode = {
      name: dayjs(timeListForChart[i].startTime).format("YYYY/MM/DD/HH:mm"),
      totalCount: oneTimeResponse.data.hits.total  // 改成oneTimeResponse.data.
    }
    res.push(oneNode)
  }
  return res
}