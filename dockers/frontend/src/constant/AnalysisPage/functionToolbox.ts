import { AllFilesDropDownData, ForensicsSelectedData, IOneNode, MemorySelectedData } from "../interfaceBoard"

interface IOneObjectName {
  name: {
    chineseName: string
    englishName: string
    tableName: string
    importTimeColumeName: string
  }
  type: string
  fourImportantColumnNames: {
    type: string
    item: string
    date: string
    etc: string
  }
  child: IOneObjectName[]
}





export const indexTree: IOneObjectName[] = [
  {
    name: {
      chineseName: "記憶體",
      englishName: "memory",
      tableName: "ed_memory",
      importTimeColumeName: "processCreateTime"
    },
    fourImportantColumnNames: {      //等elasticsearch建好對表
      item: "processName",
      date: "processDate",
      type: "memory",
      etc: ""
    },
    type: "item",
    child: []
  },
  {
    name: {
      chineseName: "痕跡取證",
      englishName: "",
      tableName: "",
      importTimeColumeName: ""
    },
    fourImportantColumnNames: {
      item: "",
      date: "",
      type: "",
      etc: ""
    },
    type: "group",
    child: [
      {
        name: {
          chineseName: "網站瀏覽紀錄與書籤",
          englishName: "browsingHistoryAndBookmarks",
          tableName: "",
          importTimeColumeName: ""
        },
        fourImportantColumnNames: {
          item: "",
          date: "",
          type: "",
          etc: ""
        },
        type: "group",
        child: [
          { name: { chineseName: "Chrome 瀏覽紀錄", englishName: "chromeBrowsingHistory", tableName: "ed_chromehistory", importTimeColumeName: "visit_time" }, fourImportantColumnNames: { item: "url", date: "visit_time", type: "website_bookmark", etc: "title" }, type: "item", child: [] },
          { name: { chineseName: "Chrome 下載紀錄", englishName: "chromeDownloadHistory", tableName: "ed_chromedownload", importTimeColumeName: "start_time" }, fourImportantColumnNames: { item: "download_url", date: "start_time", type: "website_bookmark", etc: "target_path" }, type: "item", child: [] },
          { name: { chineseName: "Chrome 關鍵字搜尋紀錄", englishName: "chromeKeywordSearchHistory", tableName: "ed_chromekeywordsearch", importTimeColumeName: "" }, fourImportantColumnNames: { item: "term", date: "", type: "website_bookmark", etc: "title" }, type: "item", child: [] },
          { name: { chineseName: "Chrome 登入帳密", englishName: "chromeLoginAccountAndPassword", tableName: "ed_chromelogin", importTimeColumeName: "date_created" }, fourImportantColumnNames: { item: "origin_url", date: "date_created", type: "website_bookmark", etc: "username_value" }, type: "item", child: [] },
          { name: { chineseName: "Chrome 書籤", englishName: "chromeBookmarks", tableName: "ed_chromebookmarks", importTimeColumeName: "date_added" }, fourImportantColumnNames: { item: "url", date: "date_added", type: "website_bookmark", etc: "name" }, type: "item", child: [] },
          { name: { chineseName: "Edge 瀏覽紀錄", englishName: "edgeBrowsingHistory", tableName: "ed_edgehistory", importTimeColumeName: "last_visit_time" }, fourImportantColumnNames: { item: "url", date: "last_visit_time", type: "website_bookmark", etc: "title" }, type: "item", child: [] },
          { name: { chineseName: "IE 瀏覽紀錄", englishName: "ieBrowsingHistory", tableName: "ed_iehistory", importTimeColumeName: "visitedtime" }, fourImportantColumnNames: { item: "url", date: "visitedtime", type: "website_bookmark", etc: "title" }, type: "item", child: [] },
          { name: { chineseName: "Edge 登入帳密", englishName: "edgeLoginAccountAndPassword", tableName: "ed_edgelogin", importTimeColumeName: "date_created" }, fourImportantColumnNames: { item: "origin_url", date: "date_created", type: "website_bookmark", etc: "username_value" }, type: "item", child: [] },
          { name: { chineseName: "IE 登入帳密", englishName: "ieLoginAccountAndPassword", tableName: "ed_ielogin", importTimeColumeName: "last_written" }, fourImportantColumnNames: { item: "url", date: "last_written", type: "website_bookmark", etc: "username" }, type: "item", child: [] },
          { name: { chineseName: "Edge 書籤", englishName: "edgeBookmarks", tableName: "ed_edgebookmarks", importTimeColumeName: "date_added" }, fourImportantColumnNames: { item: "name", date: "date_added", type: "website_bookmark", etc: "url" }, type: "item", child: [] },
          { name: { chineseName: "Firefox 瀏覽紀錄", englishName: "firefoxBrowsingHistory", tableName: "ed_firefoxhistory", importTimeColumeName: "last_visit_date" }, fourImportantColumnNames: { item: "url", date: "last_visit_date", type: "website_bookmark", etc: "title" }, type: "item", child: [] },
          { name: { chineseName: "Firefox 登入帳密", englishName: "firefoxLoginAccountAndPassword", tableName: "ed_firefoxlogin", importTimeColumeName: "timelastused" }, fourImportantColumnNames: { item: "hostname", date: "timelastused", type: "website_bookmark", etc: "username" }, type: "item", child: [] },
          { name: { chineseName: "Firefox 書籤", englishName: "firefoxBookmarks", tableName: "ed_firefoxbookmarks", importTimeColumeName: "lastModified" }, fourImportantColumnNames: { item: "url", date: "lastModified", type: "website_bookmark", etc: "title" }, type: "item", child: [] },
        ]
      },
      {
        name: {
          chineseName: "cookie和cache紀錄",
          englishName: "cacheAndCookieHistory",
          tableName: "",
          importTimeColumeName: ""
        },
        fourImportantColumnNames: {
          item: "",
          date: "",
          type: "",
          etc: ""
        },
        type: "group",
        child: [
          { name: { chineseName: "Chrome cookies", englishName: "chromeCookies", tableName: "ed_chromecookies", importTimeColumeName: "last_access_utc" }, fourImportantColumnNames: { item: "name", date: "last_access_utc", type: "cookie_cache", etc: "host_key" }, type: "item", child: [] },
          { name: { chineseName: "Chrome cache", englishName: "chromeCache", tableName: "ed_chromecache", importTimeColumeName: "date" }, fourImportantColumnNames: { item: "URL", date: "date", type: "cookie_cache", etc: "web_site" }, type: "item", child: [] },
          { name: { chineseName: "Edge cookies", englishName: "edgeCookies", tableName: "ed_edgecookies", importTimeColumeName: "last_access_utc" }, fourImportantColumnNames: { item: "name", date: "last_access_utc", type: "cookie_cache", etc: "host_key" }, type: "item", child: [] },
          { name: { chineseName: "Edge cache", englishName: "edgeCache", tableName: "ed_edgecache", importTimeColumeName: "last_modified" }, fourImportantColumnNames: { item: "URL", date: "last_modified", type: "cookie_cache", etc: "web_site" }, type: "item", child: [] },
          { name: { chineseName: "Firefox cookies", englishName: "firefoxCookies", tableName: "ed_firefoxcookies", importTimeColumeName: "lastAccessed" }, fourImportantColumnNames: { item: "name", date: "lastAccessed", type: "cookie_cache", etc: "host" }, type: "item", child: [] },
          { name: { chineseName: "Firefox cache", englishName: "firefoxcache", tableName: "ed_firefoxcache", importTimeColumeName: "last_fetched" }, fourImportantColumnNames: { item: "URL", date: "last_fetched", type: "cookie_cache", etc: "server_name" }, type: "item", child: [] },
          { name: { chineseName: "IE cache", englishName: "ieCache", tableName: "ed_iecache", importTimeColumeName: "lastaccesstime" }, fourImportantColumnNames: { item: "sourceurlname", date: "lastaccesstime", type: "cookie_cache", etc: "localfilename" }, type: "item", child: [] },
        ]
      },
      {
        name: {
          chineseName: "當下網路連線紀錄",
          englishName: "currentNetworkConnectionsHistory",
          tableName: "",
          importTimeColumeName: ""
        },
        fourImportantColumnNames: {
          item: "",
          date: "",
          type: "",
          etc: ""
        },
        type: "group",
        child: [
          { name: { chineseName: "網路基本資訊", englishName: "internetInformation", tableName: "ed_netadapters", importTimeColumeName: "valid_lifetime" }, fourImportantColumnNames: { item: "description", date: "valid_lifetime", type: "network_record", etc: "ip" }, type: "item", child: [] },
          //
          { name: { chineseName: "網路資源", englishName: "internetResources", tableName: "ed_networkresources", importTimeColumeName: "" }, fourImportantColumnNames: { item: "resourcesname", date: "", type: "network_record", etc: "ipaddress" }, type: "item", child: [] },
          //
          { name: { chineseName: "無線網路資訊", englishName: "unlimitedBasicInformation", tableName: "ed_wireless", importTimeColumeName: "lastmodifiedtime" }, fourImportantColumnNames: { item: "profilename", date: "lastmodifiedtime", type: "network_record", etc: "authentication" }, type: "item", child: [] },
        ]
      },
      {
        name: {
          chineseName: "最近執行軟體紀錄",
          englishName: "recentlyExecutedSoftwareLog",
          tableName: "",
          importTimeColumeName: ""
        },
        fourImportantColumnNames: {
          item: "",
          date: "",
          type: "",
          etc: ""
        },
        type: "group",
        child: [
          //
          { name: { chineseName: "已安裝軟體", englishName: "softwareInstalled", tableName: "ed_installedsoftware", importTimeColumeName: "registrytime" }, fourImportantColumnNames: { item: "displayname", date: "registrytime", type: "software", etc: "publisher" }, type: "item", child: [] },
          { name: { chineseName: "一般系統服務", englishName: "generalSystemServices", tableName: "ed_service", importTimeColumeName: "" }, fourImportantColumnNames: { item: "name", date: "", type: "software", etc: "pathname" }, type: "item", child: [] },
          { name: { chineseName: "細部系統服務", englishName: "detailedSystemServices", tableName: "ed_baseservice", importTimeColumeName: "" }, fourImportantColumnNames: { item: "name", date: "", type: "software", etc: "pathname" }, type: "item", child: [] },
          { name: { chineseName: "開機啟動程式", englishName: "bootProgram", tableName: "ed_startrun", importTimeColumeName: "" }, fourImportantColumnNames: { item: "name", date: "", type: "software", etc: "command" }, type: "item", child: [] },
          { name: { chineseName: "遠端桌面登入帳密", englishName: "remoteDesktopLoginAccountPassword", tableName: "ed_remotedesktoplogin", importTimeColumeName: "lastWritten" }, fourImportantColumnNames: { item: "targetName", date: "lastWritten", type: "software", etc: "userName" }, type: "item", child: [] },
          { name: { chineseName: "JumpList", englishName: "jumpList", tableName: "ed_jumplist", importTimeColumeName: "recordtime" }, fourImportantColumnNames: { item: "fullpath", date: "recordtime", type: "software", etc: "application_id" }, type: "item", child: [] },
          { name: { chineseName: "系統資訊", englishName: "systemInformation", tableName: "ed_systeminfo", importTimeColumeName: "" }, fourImportantColumnNames: { item: "hotfix", date: "", type: "software", etc: "os" }, type: "item", child: [] },
          { name: { chineseName: "MUI 快取", englishName: "muicache", tableName: "ed_muicache", importTimeColumeName: "" }, fourImportantColumnNames: { item: "applicationpath", date: "", type: "software", etc: "applicationname" }, type: "item", child: [] },
          { name: { chineseName: "Prefetch", englishName: "prefetch", tableName: "ed_prefetch", importTimeColumeName: "lastruntime" }, fourImportantColumnNames: { item: "processname", date: "lastruntime", type: "software", etc: "processpath" }, type: "item", child: [] },
          { name: { chineseName: "應用程式日誌檔", englishName: "applicationLogFiles", tableName: "ed_eventapplication", importTimeColumeName: "createdsystemtime" }, fourImportantColumnNames: { item: "eventid", date: "createdsystemtime", type: "software", etc: "evtrenderdata" }, type: "item", child: [] },
          { name: { chineseName: "排程工作", englishName: "scheduleWork", tableName: "ed_taskschedule", importTimeColumeName: "lastruntime" }, fourImportantColumnNames: { item: "name", date: "lastruntime", type: "software", etc: "path" }, type: "item", child: [] },
          { name: { chineseName: "機碼使用痕跡", englishName: "machineCodeTraces", tableName: "ed_userassist", importTimeColumeName: "modifiedtime" }, fourImportantColumnNames: { item: "name", date: "modifiedtime", type: "software", etc: "of_times_executed" }, type: "item", child: [] },
          { name: { chineseName: "程式網路流量痕跡", englishName: "programNetworkTrafficTrace", tableName: "ed_networkdatausagemonitor", importTimeColumeName: "timestamp" }, fourImportantColumnNames: { item: "app_name", date: "timestamp", type: "software", etc: "bytes_sent" }, type: "item", child: [] },
          { name: { chineseName: "程式讀寫痕跡", englishName: "programReadAndWriteTraces", tableName: "ed_appresourceusagemonitor", importTimeColumeName: "timestamp" }, fourImportantColumnNames: { item: "app_name", date: "timestamp", type: "software", etc: "backgroundbyteswritten" }, type: "item", child: [] },
          { name: { chineseName: "DNS資訊", englishName: "dnsInformation", tableName: "ed_dnsinfo", importTimeColumeName: "" }, fourImportantColumnNames: { item: "Name", date: "", type: "software", etc: "Data" }, type: "item", child: [] },
        ]
      },
      {
        name: {
          chineseName: "消逝性紀錄",
          englishName: "evanescentRecords",
          tableName: "",
          importTimeColumeName: ""
        },
        fourImportantColumnNames: {
          item: "",
          date: "",
          type: "",
          etc: ""
        },
        type: "group",
        child: [
          { name: { chineseName: "執行程序", englishName: "executeProgram", tableName: "ed_process", importTimeColumeName: "processcreatetime" }, fourImportantColumnNames: { item: "process_name", date: "processcreatetime", type: "volatile", etc: "process_path" }, type: "item", child: [] },
          { name: { chineseName: "程序連線資訊", englishName: "fileOpenedByTheProgram", tableName: "ed_network", importTimeColumeName: "" }, fourImportantColumnNames: { item: "processname", date: "", type: "volatile", etc: "remoteaddress" }, type: "item", child: [] },
          { name: { chineseName: "程式開啟之檔案", englishName: "programConnectionInformation", tableName: "ed_openedfiles", importTimeColumeName: "" }, fourImportantColumnNames: { item: "processname", date: "", type: "volatile", etc: "processid" }, type: "item", child: [] },
          { name: { chineseName: "ARP快取", englishName: "arpCache", tableName: "ed_arpcache", importTimeColumeName: "" }, fourImportantColumnNames: { item: "internetaddress", date: "", type: "volatile", etc: "physicaladdress" }, type: "item", child: [] },
        ]
      },
      {
        name: {
          chineseName: "最近開啟文件紀錄",
          englishName: "recentlyOpenedFileHistory",
          tableName: "",
          importTimeColumeName: ""
        },
        fourImportantColumnNames: {
          item: "",
          date: "",
          type: "",
          etc: ""
        },
        // 相關捷徑 開啟的資料夾路徑  主機用戶資料 最近開啟檔案 Windows Activity
        type: "group",
        child: [
          { name: { chineseName: "相關捷徑", englishName: "relativeShortcuts", tableName: "ed_shortcuts", importTimeColumeName: "modifytime" }, fourImportantColumnNames: { item: "shortcutname", date: "modifytime", type: "document", etc: "linkto" }, type: "item", child: [] },
          { name: { chineseName: "開啟的資料夾路徑", englishName: "openFolderPath", tableName: "ed_shellbags", importTimeColumeName: "accesstime" }, fourImportantColumnNames: { item: "path", date: "accesstime", type: "document", etc: "slotpath" }, type: "item", child: [] },
          { name: { chineseName: "主機用戶資料", englishName: "maasterUserProfiles", tableName: "ed_userprofiles", importTimeColumeName: "lastlogontime" }, fourImportantColumnNames: { item: "username", date: "lastlogontime", type: "document", etc: "usersid" }, type: "item", child: [] },
          { name: { chineseName: "最近開啟檔案", englishName: "recentlyOpenedFile", tableName: "ed_recentfile", importTimeColumeName: "accesstime" }, fourImportantColumnNames: { item: "name", date: "accesstime", type: "document", etc: "fullpath" }, type: "item", child: [] },
          { name: { chineseName: "Windows Activity", englishName: "windowsActivity", tableName: "ed_windowsactivity", importTimeColumeName: "last_modified_on_client" }, fourImportantColumnNames: { item: "app_id", date: "last_modified_on_client", type: "document", etc: "activity_type" }, type: "item", child: [] },
        ]
      },
      {
        name: {
          chineseName: "usb使用裝置紀錄",
          englishName: "usbUsageDeviceRecord",
          tableName: "",
          importTimeColumeName: ""
        },
        fourImportantColumnNames: {
          item: "",
          date: "",
          type: "",
          etc: ""
        },
        // USB 裝置資訊  安全性日誌檔   系統日誌檔
        type: "group",
        child: [
          { name: { chineseName: "USB 裝置資訊", englishName: "usbDeviceInformation", tableName: "ed_usbdevices", importTimeColumeName: "last_arrival_date" }, fourImportantColumnNames: { item: "device_description", date: "last_arrival_date", type: "usb", etc: "device_letter" }, type: "item", child: [] },
          { name: { chineseName: "安全性日誌檔", englishName: "securityLogFile", tableName: "ed_eventsecurity", importTimeColumeName: "createdsystemtime" }, fourImportantColumnNames: { item: "eventid", date: "createdsystemtime", type: "usb", etc: "evtrenderdata" }, type: "item", child: [] },
          { name: { chineseName: "系統日誌檔", englishName: "syslogFile", tableName: "ed_eventsystem", importTimeColumeName: "createdsystemtime" }, fourImportantColumnNames: { item: "eventid", date: "createdsystemtime", type: "usb", etc: "evtrenderdata" }, type: "item", child: [] },
        ]
      },
      {
        name: {
          chineseName: "電子郵件清單紀錄",
          englishName: "emailListReacord",
          tableName: "",
          importTimeColumeName: ""
        },
        fourImportantColumnNames: {
          item: "",
          date: "",
          type: "",
          etc: ""
        },
        // 電子郵件路徑  電子郵件清單紀錄
        type: "group",
        child: [
          { name: { chineseName: "電子郵件路徑", englishName: "emailPath", tableName: "ed_emailpath", importTimeColumeName: "" }, fourImportantColumnNames: { item: "Path", date: "", type: "emails", etc: "" }, type: "item", child: [] },
          { name: { chineseName: "電子郵件清單紀錄", englishName: "emailListRecord", tableName: "ed_email", importTimeColumeName: "Delivery_time" }, fourImportantColumnNames: { item: "Subject", date: "Delivery_time", type: "emails", etc: "Sent_Representing_name" }, type: "item", child: [] },
        ]
      },
    ]
  }, {
    name: {
      chineseName: "檔案總表",
      englishName: "allfile",
      tableName: "ed_allfile",
      importTimeColumeName: ""
    },
    fourImportantColumnNames: {
      item: "",
      date: "",
      type: "",
      etc: ""
    },
    type: "item",
    child: []
  }
] 


//透過中文名稱取得tablename
export const translateChineseToElasticsearchTableIndex=(input :string):string=>{
  let result = ""
  indexTree.forEach((item)=>{
    if(item.name.chineseName===input){
      result = item.name.tableName
    }else{
      item.child.forEach((item)=>{
        let temp = goAllChild(item,input)
        if(temp!==""){
          result = temp
        }
      })
    }
  })
  return result!==""?result:"withoutMath"
  function goAllChild(item:IOneObjectName,input:string):string{
    let result = ""
    if(item.name.chineseName===input && item.type==="item"){
      result = item.name.tableName
    }else{
      item.child.forEach((item)=>{
        if(item.name.chineseName===input){
          result = item.name.tableName
        }else{
          goAllChild(item,input)
        }
      })
    }
    return result
  }
}




// 透過englishName取得chineseName
export const forensicsDropSelectorTranfer=(input :string):string=>{
  let result = ""
  indexTree.forEach((item)=>{
    if(item.name.englishName===input){
      result = item.name.chineseName
    }else{
      item.child.forEach((item)=>{
        let temp = goAllChild(item,input)
        if(temp!==""){
          result = temp
        }
      })
    }
  })
  return result!==""?result:"withoutMath"
  function goAllChild(item:IOneObjectName,input:string):string{
    let result = ""
    if(item.name.englishName===input && item.type==="item"){
      result = item.name.chineseName
    }else{
      item.child.forEach((item)=>{
        if(item.name.englishName===input){
          result = item.name.chineseName
        }else{
          goAllChild(item,input)
        }
      })
    }
    return result
  }
}

// 透過tableName取得 importTimeColumeName
export const mainTimeColumnInTable=(input :string):string=>{
  let result = ""
  indexTree.forEach((item)=>{
    if(item.name.tableName===input){
      result = item.name.importTimeColumeName
    }else{
      item.child.forEach((item)=>{
        let temp = goAllChild(item,input)
        if(temp!==""){
          result = temp
        }
      })
    }
  })
  return result!==""?result:"withoutMath"
  function goAllChild(item:IOneObjectName,input:string):string{
    let result = ""
    if(item.name.tableName===input && item.type==="item"){
      result = item.name.importTimeColumeName
    }else{
      item.child.forEach((item)=>{
        if(item.name.tableName===input){
          result = item.name.importTimeColumeName
        }else{
          goAllChild(item,input)
        }
      })
    }
    return result
  }
}



// 要用indexTree生成上方的forensicsGroupTree
export const  generateForensicsGroupTree=() => {
  let indexTree1 = indexTree[1].child
  let result:any = {}
  indexTree1.forEach((item)=>{
    let childNameArr = item.child.map((item)=>item.name.englishName)
    result[item.name.englishName] = {
      name: item.name.chineseName,
      type: item.type,
      children: childNameArr
    }
  })
  console.log(result)
  return result
}



// 過濾出有用選到的 index 們
export function generateCleanIndexs(memoryDropDownSelected: MemorySelectedData, forensicsSelectedData: ForensicsSelectedData, allFilesDropDownData: AllFilesDropDownData) {
  // 整理資料
  let cleanMemorySelectedData = pickUpUsefulData(memoryDropDownSelected)
  let cleanForensicsSelectedData = pickUpUsefulData(forensicsSelectedData)
  let cleanAllFilesDropDownData = pickUpUsefulData(allFilesDropDownData)
  // 整理後資料依照搜尋條件生成左方列表node
  let cleanAllFilesDropDownDataToOneNodeType = generateOneListWithCleanData(cleanAllFilesDropDownData)
  let cleanForensicsSelectedDataToOneNodeType = generateOneListWithCleanData(cleanForensicsSelectedData)
  let cleanMemorySelectedDataToOneNodeType = generateOneListWithCleanData(cleanMemorySelectedData)
  // 存放所有要生成的左方列表node
  let res = []
  if (cleanMemorySelectedDataToOneNodeType) {
    res.push(cleanMemorySelectedDataToOneNodeType)
  }
  if (cleanForensicsSelectedDataToOneNodeType) {
    res.push(cleanForensicsSelectedDataToOneNodeType)
  }
  if (cleanAllFilesDropDownDataToOneNodeType) {
    res.push(cleanAllFilesDropDownDataToOneNodeType)
  }
  return res

  // 將資料整理成可長出左方列表的node串
  // function generateOneListWithCleanData(input: Object, Translator: Function = forensicsDropSelectorTranfer): IOneNode | string {
  //   let inputKeys = Object.keys(input)
  //   if (inputKeys.includes("isMemoryGroupSelected")) {
  //     let memoryNode: IOneNode = {
  //       name: "記憶體", type: "item", children: []
  //     }
  //     return memoryNode
  //   }
  //   if (inputKeys.includes("isForensicsSelected")) {
  //     // 痕跡取證的資料結構
  //     let forensicsGroupTree = generateForensicsGroupTree()
  //     let forensicsGroupTreeKeys = Object.keys(forensicsGroupTree)
  //     // 生成痕跡取證的節點
  //     let forensicsNode: IOneNode = {
  //       name: "痕跡取證", type: "group", children: []
  //     }
  //     for (let k = 0; k < forensicsGroupTreeKeys.length; k++) {
  //       let key = forensicsGroupTreeKeys[k] as keyof typeof forensicsGroupTree
  //       let firstGroup = forensicsGroupTree[key]
  //       // 生成痕跡取證內子群組節點
  //       let firstGroupNode: IOneNode = {
  //         name: firstGroup.name, type: "group", children: []
  //       }
  //       let firstGroupList = []
  //       for (let i = 0; i < firstGroup.children.length; i++) {
  //         for (let j = 0; j < inputKeys.length; j++) {
  //           if (firstGroup.children[i] === inputKeys[j]) {
  //             let name = Translator(inputKeys[j])
  //             let oneNode: IOneNode = { name: name, type: "item", children: [] }
  //             firstGroupList.push(oneNode)
  //           }
  //         }
  //       }
  //       // 判斷子群組節點是否有子節點,有的話才加入
  //       if (firstGroupList.length !== 0) {
  //         firstGroupNode.children = firstGroupList
  //         forensicsNode.children.push(firstGroupNode)
  //       }
  //     }
  //     // 判斷痕跡取證節點是否有子節點,有的話才加入
  //     if (forensicsNode.children.length !== 0) {
  //       return forensicsNode
  //     }
  //   }

  //   if (inputKeys.includes("isAllFilesSelected")) {
  //     let allFilesNode: IOneNode = {
  //       name: "檔案總表", type: "item", children: []
  //     }
  //     return allFilesNode
  //   }
  //   return ""
  // }
  function generateOneListWithCleanData(input: Object): IOneNode | string {
    interface ForensicsGroup {
      name: string;
      children: string[];
    }
    const inputKeys = Object.keys(input);
    // 下方3個if判斷"記憶體","痕跡取整","檔案總表"使否有勾選功能

    if (inputKeys.includes("isMemoryGroupSelected")) {
      return { name: "記憶體", type: "item", children: [] };
    }

    if (inputKeys.includes("isForensicsSelected")) {
      const forensicsGroupTree = generateForensicsGroupTree();
      const forensicsNode: IOneNode = {
        name: "痕跡取證", type: "group", children: []
      };

      for (const key in forensicsGroupTree) {
        if (forensicsGroupTree.hasOwnProperty(key)) {
          const group = forensicsGroupTree[key as keyof typeof forensicsGroupTree];
          const groupNode = generateForensicsGroupNode(group, inputKeys);
          if (groupNode !== null) {
            forensicsNode.children.push(groupNode);
          }
        }
      }

      if (forensicsNode.children.length > 0) {
        return forensicsNode;
      }
    }

    if (inputKeys.includes("isAllFilesSelected")) {
      return { name: "檔案總表", type: "item", children: [] };
    }
    return "";
    function generateForensicsGroupNode(group: ForensicsGroup, inputKeys: string[]): IOneNode | null {
      const groupNode: IOneNode = {
        name: group.name, type: "group", children: []
      };
      const childrenKeys = group.children.filter(child => inputKeys.includes(child));
      const childrenNodes: IOneNode[] = childrenKeys.map(childKey => ({
        name: forensicsDropSelectorTranfer(childKey), type: "item", children: []
      }));
      if (childrenNodes.length > 0) {
        groupNode.children = childrenNodes;
        return groupNode;
      }
      return null;
    }
  }
}




// 整理資料留下被選取的搜尋條件

export function pickUpUsefulData(input: object) {
  const newObject: { [key: string]: any } = {};
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const value = input[key as keyof typeof input]; // 使用类型断言
      if (typeof value === "string" && value !== "") {
        newObject[key] = value;
      } else if (typeof value === "boolean" && value) {
        newObject[key] = value;
      } else if (typeof value === "object" && Object.values(value).length !== 0) {
        newObject[key] = value;
      }
    }
  }
  return newObject;
}