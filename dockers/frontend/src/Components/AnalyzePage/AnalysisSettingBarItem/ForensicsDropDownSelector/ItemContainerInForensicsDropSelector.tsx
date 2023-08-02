import * as React from 'react';
import './ForensicsDropSelector.css'
import { ForensicsSelectedData } from '../../../../constant/interfaceBoard'
import ItemInForensicsDropSelector from './ItemInForensicsDropSelector'

function generateItemList(containerName: string) {
    switch (containerName) {
        case "網站瀏覽紀錄與書籤":
            return ([['chromeBrowsingHistory', 'chromeDownloadHistory', 'chromeKeywordSearchHistory', 'chromeLoginAccountAndPassword', 'chromeBookmarks'],
            ['edgeBrowsingHistory', 'ieBrowsingHistory', 'edgeLoginAccountAndPassword', 'ieLoginAccountAndPassword', 'edgeBookmarks'],
            ['firefoxBrowsingHistory', 'firefoxLoginAccountAndPassword', 'firefoxBookmarks']])
        case "cookie和cache紀錄":
            return [['chromeCache', 'chromeCookies'], ['edgeCache', 'edgeCookies'], ['ieCache'], ['firefoxCache', 'firefoxCookies']]
        case "當下網路連線紀錄":
            return [['internetInformation', 'unlimitedBasicInformation', 'internetResources']]
        case "最近執行軟體紀錄":
            return [['softwareInstalled', 'generalSystemServices', 'detailedSystemServices', 'bootProgram', 'remoteDesktopLoginAccountPassword', 'jumpList', 'systemInformation', 'muicache', 'prefetch', 'applicationLogFiles', 'scheduleWork', 'machineCodeTraces', 'programNetworkTrafficTrace', 'programReadAndWriteTraces', 'dnsInformation']]
        case "消逝性紀錄":
            return [['executeProgram', 'fileOpenedByTheProgram', 'programConnectionInformation', 'arpCache']]
        case "最近開啟文件紀錄":
            return [['relativeShortcuts', 'maasterUserProfiles', 'windowsActivity', 'openFolderPath', 'recentlyOpenedFile']]
        case "USB使用設備紀錄":
            return [['usbDeviceInformation', 'syslogFile', 'securityLogFile']]
        case "電子郵件清單紀錄(.pst,.ost)":
            return [['emailPath', 'emailListRecord']]
        default:
            return [[]]
    }
}
const ItemContainerInForensicsDropSelector: React.FC<{
    containerName: string,
    forensicsSelectedData: ForensicsSelectedData,
    setForensicsSelectedData: React.Dispatch<React.SetStateAction<ForensicsSelectedData>>
}> = ({ containerName, forensicsSelectedData, setForensicsSelectedData }) => {
    let map = generateItemList(containerName)
    console.log(map)
    return (<div >
        <div>
            {containerName}
        </div>
        {
            map.map((item,i) => {
                return (<div className='forensicsSelectPage' key={i}>

                    {
                        item.map((cell) => {
                            return <ItemInForensicsDropSelector key={cell} parentName={containerName} title={cell} forensicsSelectedData={forensicsSelectedData} setForensicsSelectedData={setForensicsSelectedData} />
                        })
                    }
                </div>
                )
            })
        }
    </div >
    )
}
export default ItemContainerInForensicsDropSelector