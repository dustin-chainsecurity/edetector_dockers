import { GridColDef } from '@mui/x-data-grid';
export interface UserData {
    success: boolean;
    message: string;
    code: number;
    user: {
        id: number;
        username: string;
        email: string;
        token: string;
    };
}
export interface IOneNode {
    name: string
    type: "group" | "item"
    children: IOneNode[]
}


// status
// 0: not started
// 1: pending
// 2: working    ->  get progress
// 3: finished   ->  get finish time
// 4: terminated ->  get finish time
// 5: failed     ->  get message

export interface scanning{
	status: 0|1|2|3|4|5,
	progress:number,
	finishTime:number,
    message: string
}

export interface dateForm{
    date: string;
    time: string;
}

export interface IDevice {
    deviceId: string;
    connection: boolean;
    innerIP: string;
    deviceName: string;
    groups: string[]|null;
    detectionMode: boolean;
    scanSchedule: string[]|null;
    scanFinishTime: scanning;
    collectSchedule: dateForm ;
    collectFinishTime: scanning;
    fileDownloadDate: dateForm ;
    fileFinishTime: scanning;
    imageFinishTime: scanning;
}

export interface IFormatedDevice {
    deviceId: string;
    connection: 'true' | 'false';
    InnerIP: string;
    deviceName: string;
    groups: string;
    detectionMode: 'true' | 'false';
    scanSchedule: string;
    scanFinishTime: string | number;
    collectSchedule: string;
    collectFinishTime: string | number;
    fileDownloadDate: string;
    fileFinishTime: string | number;
    imageFinishTime: string | number;
}
    
export interface IAnalyzeDevice {
    deviceId: string;
    Items : string ;
    Date : number ;
    Type : string ;
    ETC : string ;
}

export interface ITimeForm{
    date: number;
    time: number;
}

export const detectCategories: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'connection', headerName: '連線狀態', width: 50 },
    { field: 'InnerIP', headerName: '電腦內部IP', width: 90 },
    { field: 'deviceName', headerName: '電腦名稱', width: 90 },
    { field: 'groups', headerName: '所屬群組', width: 90 },
    { field: 'detectionMode', headerName: '偵測 模式', width: 90 },
    { field: 'scanSchedule', headerName: '定期掃描 時間', width: 90 },
    { field: 'scanFinishTime', headerName: '最近記憶體 掃瞄完成時間', width: 90 },
    { field: 'collectSchedule', headerName: '定期取證 時間', width: 90 },
    { field: 'collectFinishTime', headerName: '最近痕跡取證 完成時間', width: 90 },
    { field: 'fileDownloadDate', headerName: '定期總表 下載時間', width: 90 },
    { field: 'fileFinishTime', headerName: '最近檔案總表 完成時間', width: 90 },
    { field: 'imageFinishTime', headerName: '關鍵映像檔 完成時間', width: 90 }
]

export interface DetectGrid_HeadCell {
    disablePadding: boolean;
    id: keyof IFormatedDevice;
    label: string;
    numeric: boolean;
}
export const headCells: readonly DetectGrid_HeadCell[] = [
    {
        id: 'connection',
        numeric: false,
        disablePadding: false,
        label: '連線\n狀態',
    },
    {
        id: 'InnerIP',
        numeric: false,
        disablePadding: true,
        label: '電腦內部IP',
    },
    {
        id: 'deviceName',
        numeric: false,
        disablePadding: true,
        label: '電腦名稱',
    },
    {
        id: 'groups',
        numeric: true,
        disablePadding: true,
        label: '所屬群組',
    },
    {
        id: 'detectionMode',
        numeric: true,
        disablePadding: true,
        label: '偵測\n模式',
    },
    {
        id: 'scanSchedule',
        numeric: true,
        disablePadding: true,
        label: '定期掃描\n時間',
    },
    {
        id: 'scanFinishTime',
        numeric: true,
        disablePadding: true,
        label: '最近記憶體\n掃描完成時間',
    },
    {
        id: 'collectSchedule',
        numeric: true,
        disablePadding: true,
        label: '定期取證\n時間',
    },
    {
        id: 'collectFinishTime',
        numeric: true,
        disablePadding: true,
        label: '最近痕跡取證\n完成時間',
    },
    {
        id: 'fileDownloadDate',
        numeric: true,
        disablePadding: true,
        label: '定期總表\n下載時間',
    },
    {
        id: 'fileFinishTime',
        numeric: true,
        disablePadding: true,
        label: '最近檔案總表\n完成時間',
    },
    {
        id: 'imageFinishTime',
        numeric: true,
        disablePadding: true,
        label: '關鍵映像檔\n完成時間',
    },
];

export interface IDataFlow {
    isSuccess: boolean;
    totalPages: number;
    Data: IDevice[];
}

export interface IConnectStatus {
    deviceId: string;
    connection: boolean;
}

export interface IFormtedConnectStatus {
    deviceId: string;
    connection: 'true' | 'false';
}




export interface IDateModule {
    name:string,
    value:number
}
export interface IDateModuleData {
    dateModuleData:IDateModule[]
    startTime:number,
    endTime:number
}


export type TactionType = ''|'記憶體' | '痕跡取證' | '檔案總表' | '關鍵映像檔' | '任務執行';



export type TdetectColumn_memory = '偵測模式' | '定期掃描時間' | '最近記憶體掃描完成時間' ;
export type TdetectColumn_trace =  '定期取證時間' | '最近痕跡取證完成時間' ;
export type TdetectColumn_file = '定期總表下載時間' | '最近檔案總表完成時間' ;

export type TdetectColumn = '記憶體' | '痕跡取證' | '檔案總表' | '關鍵映像檔完成時間' ;
export interface IallCheckedState {
    memory: {
      mode: boolean;
      name: TdetectColumn;
    };
    trace: {
      mode: boolean;
      name: TdetectColumn;
    };
    file: {
      mode: boolean;
      name: TdetectColumn;
    };
    image: {
      mode: boolean;
      name: TdetectColumn;
    };
  }

export interface AllFilesDropDownData {
    isAllFilesSelected?:boolean
    keyPath:string
    keywordType:'影音檔' | '圖片檔' | '文字檔' | '自訂'
    keywordFileName:string
    keywordContent:string
    fileSize:'max' | 'min'
    fileSizeValue:number
    fileUnit: 'MB' | 'GB'
    onlySearchDeletedFile:boolean
}
export interface ForensicsSelectedData{
    [key :string] : boolean | undefined | string
    isForensicsSelected?:boolean 
    keywordType?:string
    keyword?:string
    browsingHistoryAndBookmarks?:boolean      //網站瀏覽紀錄與書籤
    chromeBrowsingHistory?:boolean
    chromeDownloadHistory?:boolean
    chromeKeywordSearchHistory?:boolean
    chromeLoginAccountAndPassword?:boolean
    chromeBookmarks?:boolean
    edgeBrowsingHistory?:boolean
    ieBrowsingHistory?:boolean
    edgeLoginAccountAndPassword?:boolean
    ieLoginAccountAndPassword?:boolean
    edgeBookmarks?:boolean
    firefoxBrowsingHistory?:boolean
    firefoxLoginAccountAndPassword?:boolean
    firefoxBookmarks?:boolean 

    cacheAndCookieHistory?:boolean        //cookie和cache紀錄
    chromeCache?:boolean
    chromeCookies?:boolean
    edgeCache?:boolean
    edgeCookies?:boolean
    ieCache?:boolean
    firefoxCache?:boolean
    firefoxCookies?:boolean


    currentNetworkConnectionsHistory?:boolean      //當下網路連線紀錄
    internetInformation?:boolean
    unlimitedBasicInformation?:boolean
    internetResources?:boolean

    recentlyExecutedSoftwareLog?:boolean    //最近執行軟體紀錄
    softwareInstalled?:boolean
    detailedSystemServices?:boolean
    remoteDesktopLoginAccountPassword?:boolean       //
    systemInformation?:boolean
    prefetch?:boolean
    scheduleWork?:boolean
    programNetworkTrafficTrace?:boolean
    dnsInformation?:boolean
    generalSystemServices?:boolean
    bootProgram?:boolean
    jumpList?:boolean
    muicache?:boolean
    applicationLogFiles?:boolean
    machineCodeTraces?:boolean
    programReadAndWriteTraces?:boolean

    evanescentRecords?:boolean   //消逝性紀錄
    executeProgram?:boolean
    fileOpenedByTheProgram?:boolean
    programConnectionInformation?:boolean
    arpCache?:boolean


    recentlyOpenedFileHistory?:boolean      //最近開啟文件紀錄
    relativeShortcuts?:boolean
    maasterUserProfiles?:boolean
    windowsActivity?:boolean
    openFolderPath?:boolean
    recentlyOpenedFile?:boolean


    usbUsageDeviceRecord?:boolean      //usb使用裝置紀錄
    usbDeviceInformation?:boolean
    syslogFile?:boolean
    securityLogFile?:boolean

    emailListReacord?:boolean       //電子郵件清單紀錄=
    emailPath?:boolean
    emailListRecord?:boolean
}


export interface requestHostData extends oneHostData{
    group: string[]|[];
}

export interface oneHostData {
    id: string;
    ip: string;
    macAddress: string;
    name: string;
}
  
export interface IGenerateGroup {
    group: string;
    devices: oneHostData[];
}


export interface MemorySelectedData {
    isMemoryGroupSelected?: boolean
    processName?: string        //程序名稱：
    processConnectIP?: string       //程序連線IP：
    dynamicCommand?: string       //啟動指令：
    processMD5?: string       //程序MD5：
    processPath?: string       //程序路徑：
    parentProcessPath?: string       //父程序路徑：
    digitalSign?: string       //數位簽章：
    importOtherDLL?: string       //載入其他dll：
    processId?: string       //程序編號：
    riskLevel?: RiskLevel[]       //風險等級：
    injectActive?: InjectActive[]       //注入行為：
    processBeInjected?: ProcessBeInjected[]       //程序被注入：
    boot?: Boot[]       //開機啟動：
    hook?: Hook[]       //Hook：
    hide?: Hide[]       //隱藏：
}
export type RiskLevel = "" | "一" | "二" | "三" | "四"
export type InjectActive = "" | "PE" | "非PE程式碼" | "無"
export type ProcessBeInjected = "" | "有" | "無"
export type Boot = "" | "Service" | "AutoRun" | "無"
export type Hook = "" | "有" | "無"
export type Hide = "" | "Process" | "File" | "無"



const detectActionObjection ={
    memory:{
        translate_name : '記憶體',
        column_name : ['偵測模式','定期掃描時間','最近記憶體掃描完成時間'],
        column_type : ['detectionMode','scanSchedule','scanFinishTime'],
    },
    trace:{
        translate_name : '痕跡取證',
        column_name : ['定期取證時間','最近痕跡取證完成時間'],
        column_type : ['collectSchedule','collectFinishTime'],
    },
    file:{
        translate_name : '檔案總表',
        column_name : ['定期總表下載時間','最近檔案總表完成時間'],
        column_type : ['fileDownloadDate','fileFinishTime'],
    },
    image:{
        translate_name : '關鍵映像檔',
        column_name : ['關鍵映像檔完成時間'],
        column_type : ['imageFinishTime'],
    }
} 

export interface ITimeNode {
    startTime: number,
    endTime: number,
}


export interface IOneObjectName {
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
export interface IinitialState {
    mainKeyword: string, // 主搜尋關鍵字
    subSearchKeywordList:string[],
    fromIndex: number, // 從第幾筆開始
    size: number, // 一次取得幾筆
    hostList: string[], // 所有主機列表
    indexList: (string | IOneNode)[], // 所有index列表
    timeRange: { // 時間範圍
        startTime: number,
        endTime: number
    },
    leftSelectedList: { // 左方列表
        analysisIndex: (string | IOneNode)[],    // 所有index列表
        selectedIndex: string[]     // 所有被選取的index列表
    },
    chartData: any,// 圖表資料
    tableData: {  // 表格資料
        // ...
    },
    detailData: {  // 詳細資料
    }
}

