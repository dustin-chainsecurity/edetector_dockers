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
    
    //setting page - systems 
    interfaceSetting:'setting/Interface',
    agentSetting:'setting/Agent',
    CommonFunc :'setting/Function',
    ServerAndEmail : 'setting/ServerAndEmail',

    //setting page - groups
    group : 'group/all',
    AllGroup : 'group/device',
    // method : POST - 'group' 新增群組
    // method : GET - 'group' 取得所有群組
    allGroupsInfo:'group/all',
    // method : PUT - 'group/${groupid}' 修改群組
    // method : GET - 'group/${groupid}' 取得特定群組detail
    // method : DELETE - 'group/${groupid}' 刪除群組
    // method : POST - 'group/device' 將多個 device 加入多個群組
    // method : DELETE - 'group/device'  將多個 device 離開多個群組
    addOrRemoveDevicesFromGroups : 'group/device',

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



export const urlRoot = process.env.REACT_APP_URL;
export const scheduledRoot = process.env.REACT_APP_SCHEDULE_URL;
export const socketRoot = process.env.REACT_APP_WS_URL ? process.env.REACT_APP_WS_URL : socketRoute.dev;

//要連接elastic的url，要把elasticRoute跟elasticParentUrl改成dev
export const elasticRoot = process.env.REACT_APP_ELASTIC_URL;
export const elasticParent = elasticParentUrl.dev;

// 改port
