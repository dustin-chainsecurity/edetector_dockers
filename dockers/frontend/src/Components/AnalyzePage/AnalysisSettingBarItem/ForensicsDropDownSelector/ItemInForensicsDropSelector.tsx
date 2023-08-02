import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../MemoryDropDownSelector/MemoryDropDownSelector.css'
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './ForensicsDropSelector.css'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { oneHostData, AllFilesDropDownData, ForensicsSelectedData, MemorySelectedData, RiskLevel, InjectActive, ProcessBeInjected, Boot, Hook, Hide } from '../../../../constant/interfaceBoard'
import {forensicsDropSelectorTranfer} from '../../../../constant/functionToolbox'

// --網站瀏覽紀錄與書籤--      browsingHistoryAndBookmarks
 
// Chrome 瀏覽紀錄      chromeBrowsingHistory
// Chrome 下載紀錄     chromeDownloadHistory
// Chrome 登入帳密     chromeKeywordSearchHistory
// Chrome 關鍵字搜尋紀錄       chromeLoginAccountAndPassword
// Chrome 書籤         chromeBookmarks

// Edge 瀏覽紀錄        edgeBrowsingHistory
// IE 瀏覽紀錄          ieBrowsingHistory
// Edge 登入帳密          edgeLoginAccountAndPassword
// IE 登入帳密              ieLoginAccountAndPassword
// Edge 書籤            edgeBookmarks

// Firefox 瀏覽紀錄     firefoxBrowsingHistory
// Firefox 登入帳密     firefoxLoginAccountAndPassword
// Firefox 書籤             firefoxBookmarks

// -- cache 和 cookie 紀錄--     cacheAndCookieHistory
// Chrome cache        chromeCache
// Chrome cookies      chromeCookies

// Edge cache          edgeCache
// Edge cookies        edgeCookies

// IE cache        ieCache

// Firefox cache       firefoxCache
// Firefox cookies     firefoxCookies


// --當下網路連線紀錄--        currentNetworkConnectionsHistory

// 網路網路資訊        internetInformation
// 無線基本資訊        unlimitedBasicInformation
// 網路資源        internetResources

// --最近執行軟體紀錄--        recentlyExecutedSoftwareLog

// 已安裝軟體      softwareInstalled
// 一般系統服務        generalSystemServices
// 細部系統服務        detailedSystemServices
// 開機啟動程式            bootProgram
// 遠端桌面登入帳密        remoteDesktopLoginAccountPassword
// JumpList            jumpList
// 系統資訊            systemInformation
// MUI 快取            muicache
// Prefetch            prefetch
// 應用程式日誌檔      applicationLogFiles
// 排程工作            scheduleWork
// 機碼使用痕跡            machineCodeTraces
// 程式網路流量痕跡        programNetworkTrafficTrace
// 程式讀寫痕跡            programReadAndWriteTraces
// DNS資訊             dnsInformation


// --消逝性紀錄--      evanescentRecords
// 執行程序            executeProgram
// 程序連線資訊        fileOpenedByTheProgram
// 程式開啟之檔案      programConnectionInformation
// ARP快取             arpCache


// --最近開啟文件紀錄--        recentlyOpenedFileHistory
// 相關捷徑        relativeShortcuts
// 開啟的資料夾路徑        maasterUserProfiles
// 主機用戶資料              windowsActivity
// 最近開啟檔案            openFolderPath
// Windows Activity        recentlyOpenedFile


// --USB使用設備紀錄--     usbUsageDeviceRecord
// USB 裝置資訊            usbDeviceInformation
// 安全性日誌檔            syslogFile
// 系統日誌檔              securityLogFile


// --電子郵件清單紀錄(.pst,.ost)--         emailListReacord
// 電子郵件路徑            emailPath
// 電子郵件清單紀錄        emailListRecord



// 痕跡取證中英對照表





function handleLittleElementChange(event: React.ChangeEvent<HTMLInputElement>,forensicsSelectedData:ForensicsSelectedData,setForensicsSelectedData: React.Dispatch<React.SetStateAction<ForensicsSelectedData>>) {
    console.log(event.target.name)
    console.log(event.target.value)
    setForensicsSelectedData((prevState) => {
        return {
            ...prevState,
            [event.target.name]: event.target.checked
        }
    })

}




// const ItemInForensicsDropSelector:React.FC<LittleElement> = ({title, forensicsSelectedData,setForensicsSelectedData}) => {
//     let titleInType = title as keyof ForensicsSelectedData;
//     const isLittleElementSelected = () => {
//       if (forensicsSelectedData[titleInType] === undefined || typeof forensicsSelectedData[titleInType] === 'string') {
//         return false;
//       }
//       return forensicsSelectedData[titleInType] === true;
//     };
  
//     const isChecked = isLittleElementSelected();
//     return (
//       <div>
//         <Checkbox size="small" name={title} checked={isChecked} onChange={(e) => { handleLittleElementChange(e,setForensicsSelectedData) }}></Checkbox>
//         <span>電子郵件路徑</span>
//       </div>
//     );
//   };
// export default ItemInForensicsDropSelector



const ItemInForensicsDropSelector:React.FC<{
    parentName: string,
    title: string,
    forensicsSelectedData: ForensicsSelectedData,
    setForensicsSelectedData : React.Dispatch<React.SetStateAction<ForensicsSelectedData>>
}> = ({parentName,title, forensicsSelectedData,setForensicsSelectedData}) => {
    let titleInType = title as keyof ForensicsSelectedData;
    const isLittleElementSelected = () => {
      if (forensicsSelectedData[titleInType] === undefined || typeof forensicsSelectedData[titleInType] === 'string') {
        return false;
      }
      return forensicsSelectedData[titleInType] === true;
    };
    const isChecked = isLittleElementSelected();
    let contextInChinese = forensicsDropSelectorTranfer(title)
    return (
      <div>
        <FormControlLabel 
            label={contextInChinese}
            control={<Checkbox size="small" name={title} value={parentName} checked={isChecked} onChange={(e) => { handleLittleElementChange(e,forensicsSelectedData,setForensicsSelectedData) }} />}
        />
      </div>
    );
  };
export default ItemInForensicsDropSelector


// function ItemInForensicsDropSelector({
//     title,
//     forensicsSelectedData,
//     setForensicsSelectedData,
//   }: {
//     title: string;
//     forensicsSelectedData: ForensicsSelectedData;
//     setForensicsSelectedData: React.Dispatch<React.SetStateAction<ForensicsSelectedData>>;
//   }): JSX.Element {
//     const titleInType = title as keyof ForensicsSelectedData;
//     const isChecked = isLittleElementSelected();
  
//     function isLittleElementSelected(): boolean {
//       if (forensicsSelectedData[titleInType] === undefined || typeof forensicsSelectedData[titleInType] === 'string') {
//         return false;
//       }
//       return forensicsSelectedData[titleInType] === true;
//     }
  
//     return (
//       <div>
//         <Checkbox
//           size="small"
//           name={title}
//           checked={isChecked}
//           onChange={(e) => {
//             handleLittleElementChange(e, setForensicsSelectedData);
//           }}
//         ></Checkbox>
//         <span>電子郵件路徑</span>
//       </div>
//     );
//   }
  
//   export default ItemInForensicsDropSelector;



