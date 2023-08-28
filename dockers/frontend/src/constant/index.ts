export const socketRoute ={
    local: 'wss://localhost:6969',
    dev : 'ws://192.168.200.161:5050/ws'
}

const rootRoute = {
    local: 'http://localhost:6969/',
    dev:'http://192.168.200.161:5000/',
}

const scheduledRoute = {
    local: 'http://localhost:6969/',
    dev:'http://192.168.200.161:5050/',
}

const elasticRoute = {
    local: 'http://localhost:6969/',
    dev : 'http://192.168.200.129:9200/'
}

export const API = {
    login :'login',
    loginWithToken :'loginWithToken',
    DetectDevices:'searchEvidence/detectDevices', // searchEvidence/DetectDevices?pages={page} …
    SearchDevices:'searchEvidence/queryKey', // searchEvidence/DetectDevices?pages={page} …
    DevicesConnect:'searchEvidence/DevicesConnect',
    RefreshDevices:'searchEvidence/refresh',
    // searchEvidense
    SendMission:'task/sendMission',
    detectionMode: 'task/detectionMode',
    scheduledScan:'task/scheduledScan', //5050
    scheduledForensics:'task/scheduledCollect', //5050
    scheduledDownload:'task/scheduledDownload', //5050
    // analysisPage
    deviceGroups:'analysisPage/allDeviceDetail',
    
    //setting page
    interfaceSetting:'setting/Interface',
    agentSetting:'setting/Agent',
    CommonFunc :'setting/Function',
    ServerAndEmail : 'setting/ServerAndEmail',

}

const elasticParentUrl = {  //todo
    dev: 'ed_main/',
    local : 'oneindex/',
}

export const mainTableName={
    ed_main:'ed_main/',
    ed_all:"ed_*/"
}

export const elasticChildUrl = {  //todo
    search: '_search',
    msearch:"_msearch",
    count:"_count"
}



export const urlRoot = rootRoute.dev;
export const scheduledRoot = scheduledRoute.local;
export const socketRoot = socketRoute.dev;

//要連接elastic的url，要把elasticRoute跟elasticParentUrl改成dev
export const elasticRoot = elasticRoute.dev;
export const elasticParent = elasticParentUrl.dev;


