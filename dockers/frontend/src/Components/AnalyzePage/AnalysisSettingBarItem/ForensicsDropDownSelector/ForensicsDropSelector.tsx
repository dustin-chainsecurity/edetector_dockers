import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ForensicsSelectedData } from '../../../../constant/interfaceBoard'
import ItemContainerInForensicsDropSelector from './ItemContainerInForensicsDropSelector';
interface ChildProps {
    forensicsSelectedData: ForensicsSelectedData
    setForensicsSelectedData: React.Dispatch<React.SetStateAction<ForensicsSelectedData>>
}



const ForensicsDropSelector: React.FC<ChildProps> = ({ forensicsSelectedData, setForensicsSelectedData }) => {

    const [age, setAge] = React.useState('');
    const [selectedPage, setSelectedPage] = React.useState<string>('網站瀏覽紀錄與書籤')
    const [selectedIndex, setSelectedIndex] = React.useState(0); // 選擇哪個頁面
    //  關鍵字類別
    const KeyWordType = (props: ForensicsSelectedData) => {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr' }}>
                <span style={{ display: 'flex', alignItems: 'center', marginRight: "10px" }}>關鍵字類別:</span>
                <div>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        // value={'male'}
                        // onChange={handleChange}
                        >
                            <FormControlLabel value="影音檔" control={<Radio />} label="影音檔" />
                            <FormControlLabel value="圖片檔" control={<Radio />} label="圖片檔" />
                            <FormControlLabel value="文件檔" control={<Radio />} label="文件檔" />
                            <FormControlLabel value="自訂" control={<Radio />} label="自訂" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div></div>
            </div>
        )
    }
    // 關鍵字
    const SearchKeyword = (props: ForensicsSelectedData) => {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr' }}>
                <span style={{ display: 'flex', alignItems: 'center', marginRight: "10px" }}>
                    關鍵字 :
                </span>
                <TextField id="outlined-basic" size='small' onChange={(e) => console.log(e.target.value)} />
                <div></div>
            </div>
        )
    }
    // 控制顯示的子頁面

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    // 快篩欄位
    const QuickSelect = (props: ForensicsSelectedData) => {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto 1fr', marginTop: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', marginRight: "10px" }}>快篩</span>
                <Box sx={{ minWidth: 120, marginRight: "10px" }}>
                    <FormControl fullWidth size="small" >
                        <InputLabel id="demo-simple-select-label">選擇模板</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="選擇模板"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="contained">儲存</Button>
                <div></div>
            </div>
        )
    }
    // 生成選擇頁面清單
    const SelectPageList = () => {
        // groupList 清單
        const groupList = ['網站瀏覽紀錄與書籤', 'cookie和cache紀錄', '當下網路連線紀錄', '最近執行軟體紀錄', '消逝性紀錄', '最近開啟文件紀錄', 'USB使用設備紀錄', '電子郵件清單紀錄(.pst,.ost)']
        // 從group checkbox 控制小項目
        function controlAGroupOfLittleElement(e: React.ChangeEvent<HTMLInputElement>) {
            setForensicsSelectedData((prevState) => {
                switch (e.target.name) {
                    case '網站瀏覽紀錄與書籤':
                        console.log("*********", e.target.checked)
                        return {
                            ...prevState,
                            // ['browsingHistoryAndBookmarks']: undefined,
                            ["chromeBrowsingHistory"]: e.target.checked,
                            ["chromeDownloadHistory"]: e.target.checked,
                            ["chromeKeywordSearchHistory"]: e.target.checked,
                            ["chromeLoginAccountAndPassword"]: e.target.checked,
                            ["chromeBookmarks"]: e.target.checked,
                            ["edgeBrowsingHistory"]: e.target.checked,
                            ["ieBrowsingHistory"]: e.target.checked,
                            ["edgeLoginAccountAndPassword"]: e.target.checked,
                            ["ieLoginAccountAndPassword"]: e.target.checked,
                            ["edgeBookmarks"]: e.target.checked,
                            ["firefoxBrowsingHistory"]: e.target.checked,
                            ["firefoxLoginAccountAndPassword"]: e.target.checked,
                            ["firefoxBookmarks"]: e.target.checked
                        }
                    case 'cookie和cache紀錄':
                        return {
                            ...prevState,
                            ['cacheAndCookieHistory']: e.target.checked,
                            ["chromeCache"]: e.target.checked,
                            ["chromeCookies"]: e.target.checked,
                            ["edgeCache"]: e.target.checked,
                            ["edgeCookies"]: e.target.checked,
                            ["ieCache"]: e.target.checked,
                            ["firefoxCache"]: e.target.checked,
                            ["firefoxCookies"]: e.target.checked
                        }
                    case '當下網路連線紀錄':
                        return {
                            ...prevState,
                            ["currentNetworkConnectionsHistory"]: e.target.checked,
                            ["internetInformation"]: e.target.checked,
                            ["unlimitedBasicInformation"]: e.target.checked,
                            ["internetResources"]: e.target.checked
                        }
                    case '最近執行軟體紀錄':
                        return {
                            ...prevState,
                            ['recentlyExecutedSoftwareLog']: e.target.checked,
                            ["softwareInstalled"]: e.target.checked,
                            ["generalSystemServices"]: e.target.checked,
                            ["detailedSystemServices"]: e.target.checked,
                            ["bootProgram"]: e.target.checked,
                            ["remoteDesktopLoginAccountPassword"]: e.target.checked,
                            ["jumpList"]: e.target.checked,
                            ["systemInformation"]: e.target.checked,
                            ["muicache"]: e.target.checked,
                            ["prefetch"]: e.target.checked,
                            ["applicationLogFiles"]: e.target.checked,
                            ["scheduleWork"]: e.target.checked,
                            ["machineCodeTraces"]: e.target.checked,
                            ["programNetworkTrafficTrace"]: e.target.checked,
                            ["programReadAndWriteTraces"]: e.target.checked,
                            ["dnsInformation"]: e.target.checked
                        }
                    case '消逝性紀錄':
                        return {
                            ...prevState,
                            ['evanescentRecords']: e.target.checked,
                            ["executeProgram"]: e.target.checked,
                            ["fileOpenedByTheProgram"]: e.target.checked,
                            ["programConnectionInformation"]: e.target.checked,
                            ["arpCache"]: e.target.checked
                        }
                    case '最近開啟文件紀錄':
                        return {
                            ...prevState,
                            ['recentlyOpenedFileHistory']: e.target.checked,
                            ["relativeShortcuts"]: e.target.checked,
                            ["maasterUserProfiles"]: e.target.checked,
                            ["windowsActivity"]: e.target.checked,
                            ["openFolderPath"]: e.target.checked,
                            ["recentlyOpenedFile"]: e.target.checked
                        }
                    case 'USB使用設備紀錄':
                        return {
                            ...prevState,
                            ['usbUsageDeviceRecord']: e.target.checked,
                            ["usbDeviceInformation"]: e.target.checked,
                            ["syslogFile"]: e.target.checked,
                            ["securityLogFile"]: e.target.checked
                        }
                    case '電子郵件清單紀錄(.pst,.ost)':
                        return {
                            ...prevState,
                            // ['emailListReacord']: e.target.checked,
                            ["emailPath"]: e.target.checked,
                            ["emailListRecord"]: e.target.checked
                        }
                    default:
                        return prevState
                }
            }
            )
        }
        // 決定group是否只選部分
        function decideSelectAllOrNot(groupName: string): boolean | undefined {
            let allList = {
                '網站瀏覽紀錄與書籤': [forensicsSelectedData.chromeBrowsingHistory, forensicsSelectedData.chromeDownloadHistory, forensicsSelectedData.chromeKeywordSearchHistory, forensicsSelectedData.chromeLoginAccountAndPassword, forensicsSelectedData.chromeBookmarks, forensicsSelectedData.edgeBrowsingHistory, forensicsSelectedData.ieBrowsingHistory, forensicsSelectedData.edgeLoginAccountAndPassword, forensicsSelectedData.ieLoginAccountAndPassword, forensicsSelectedData.edgeBookmarks, forensicsSelectedData.firefoxBrowsingHistory, forensicsSelectedData.firefoxLoginAccountAndPassword, forensicsSelectedData.firefoxBookmarks],
                'cookie和cache紀錄': [forensicsSelectedData.chromeCache, forensicsSelectedData.chromeCookies, forensicsSelectedData.edgeCache, forensicsSelectedData.edgeCookies, forensicsSelectedData.ieCache, forensicsSelectedData.firefoxCache, forensicsSelectedData.firefoxCookies],
                '當下網路連線紀錄': [forensicsSelectedData.internetInformation, forensicsSelectedData.unlimitedBasicInformation, forensicsSelectedData.internetResources],
                '最近執行軟體紀錄': [forensicsSelectedData.softwareInstalled, forensicsSelectedData.generalSystemServices, forensicsSelectedData.detailedSystemServices, forensicsSelectedData.bootProgram, forensicsSelectedData.remoteDesktopLoginAccountPassword, forensicsSelectedData.jumpList, forensicsSelectedData.systemInformation, forensicsSelectedData.muicache, forensicsSelectedData.prefetch, forensicsSelectedData.applicationLogFiles, forensicsSelectedData.scheduleWork, forensicsSelectedData.machineCodeTraces, forensicsSelectedData.programNetworkTrafficTrace, forensicsSelectedData.programReadAndWriteTraces, forensicsSelectedData.dnsInformation],
                '消逝性紀錄': [forensicsSelectedData.executeProgram, forensicsSelectedData.fileOpenedByTheProgram, forensicsSelectedData.programConnectionInformation, forensicsSelectedData.arpCache],
                '最近開啟文件紀錄': [forensicsSelectedData.relativeShortcuts, forensicsSelectedData.maasterUserProfiles, forensicsSelectedData.windowsActivity, forensicsSelectedData.openFolderPath, forensicsSelectedData.recentlyOpenedFile],
                'USB使用設備紀錄': [forensicsSelectedData.usbDeviceInformation, forensicsSelectedData.syslogFile, forensicsSelectedData.securityLogFile],
                '電子郵件清單紀錄': [forensicsSelectedData.emailPath, forensicsSelectedData.emailListRecord]
            }
            let selectedGroup = allList['網站瀏覽紀錄與書籤']
            if (groupName === '網站瀏覽紀錄與書籤') { selectedGroup = allList.網站瀏覽紀錄與書籤 }
            if (groupName === 'cookie和cache紀錄') { selectedGroup = allList.cookie和cache紀錄 }
            if (groupName === '當下網路連線紀錄') { selectedGroup = allList.當下網路連線紀錄 }
            if (groupName === '最近執行軟體紀錄') { selectedGroup = allList.最近執行軟體紀錄 }
            if (groupName === '消逝性紀錄') { selectedGroup = allList.消逝性紀錄 }
            if (groupName === '最近開啟文件紀錄') { selectedGroup = allList.最近開啟文件紀錄 }
            if (groupName === 'USB使用設備紀錄') { selectedGroup = allList.USB使用設備紀錄 }
            if (groupName === '電子郵件清單紀錄(.pst,.ost)') { selectedGroup = allList.電子郵件清單紀錄 }

            let checkedInSelectedGroup = selectedGroup.filter((item) => item === true)
            if (checkedInSelectedGroup.length !== 0 && checkedInSelectedGroup.length !== selectedGroup.length) {
                return true
            }
            return undefined

        }

        // 決定group是否選取
        function decideCheckBoxOfGroupIsChecked(groupName: string) {

            let allList = {
                '網站瀏覽紀錄與書籤': [forensicsSelectedData.chromeBrowsingHistory, forensicsSelectedData.chromeDownloadHistory, forensicsSelectedData.chromeKeywordSearchHistory, forensicsSelectedData.chromeLoginAccountAndPassword, forensicsSelectedData.chromeBookmarks, forensicsSelectedData.edgeBrowsingHistory, forensicsSelectedData.ieBrowsingHistory, forensicsSelectedData.edgeLoginAccountAndPassword, forensicsSelectedData.ieLoginAccountAndPassword, forensicsSelectedData.edgeBookmarks, forensicsSelectedData.firefoxBrowsingHistory, forensicsSelectedData.firefoxLoginAccountAndPassword, forensicsSelectedData.firefoxBookmarks],
                'cookie和cache紀錄': [forensicsSelectedData.chromeCache, forensicsSelectedData.chromeCookies, forensicsSelectedData.edgeCache, forensicsSelectedData.edgeCookies, forensicsSelectedData.ieCache, forensicsSelectedData.firefoxCache, forensicsSelectedData.firefoxCookies],
                '當下網路連線紀錄': [forensicsSelectedData.internetInformation, forensicsSelectedData.unlimitedBasicInformation, forensicsSelectedData.internetResources],
                '最近執行軟體紀錄': [forensicsSelectedData.softwareInstalled, forensicsSelectedData.generalSystemServices, forensicsSelectedData.detailedSystemServices, forensicsSelectedData.bootProgram, forensicsSelectedData.remoteDesktopLoginAccountPassword, forensicsSelectedData.jumpList, forensicsSelectedData.systemInformation, forensicsSelectedData.muicache, forensicsSelectedData.prefetch, forensicsSelectedData.applicationLogFiles, forensicsSelectedData.scheduleWork, forensicsSelectedData.machineCodeTraces, forensicsSelectedData.programNetworkTrafficTrace, forensicsSelectedData.programReadAndWriteTraces, forensicsSelectedData.dnsInformation],
                '消逝性紀錄': [forensicsSelectedData.executeProgram, forensicsSelectedData.fileOpenedByTheProgram, forensicsSelectedData.programConnectionInformation, forensicsSelectedData.arpCache],
                '最近開啟文件紀錄': [forensicsSelectedData.relativeShortcuts, forensicsSelectedData.maasterUserProfiles, forensicsSelectedData.windowsActivity, forensicsSelectedData.openFolderPath, forensicsSelectedData.recentlyOpenedFile],
                'USB使用設備紀錄': [forensicsSelectedData.usbDeviceInformation, forensicsSelectedData.syslogFile, forensicsSelectedData.securityLogFile],
                '電子郵件清單紀錄': [forensicsSelectedData.emailPath, forensicsSelectedData.emailListRecord]
            }
            let selectedGroup = allList['網站瀏覽紀錄與書籤']
            if (groupName === '網站瀏覽紀錄與書籤') { selectedGroup = allList.網站瀏覽紀錄與書籤 }
            if (groupName === 'cookie和cache紀錄') { selectedGroup = allList.cookie和cache紀錄 }
            if (groupName === '當下網路連線紀錄') { selectedGroup = allList.當下網路連線紀錄 }
            if (groupName === '最近執行軟體紀錄') { selectedGroup = allList.最近執行軟體紀錄 }
            if (groupName === '消逝性紀錄') { selectedGroup = allList.消逝性紀錄 }
            if (groupName === '最近開啟文件紀錄') { selectedGroup = allList.最近開啟文件紀錄 }
            if (groupName === 'USB使用設備紀錄') { selectedGroup = allList.USB使用設備紀錄 }
            if (groupName === '電子郵件清單紀錄(.pst,.ost)') { selectedGroup = allList.電子郵件清單紀錄 }
            let checkedInSelectedGroup = selectedGroup.filter((item) => item === true)
            if (checkedInSelectedGroup.length === 0) {
                return false
            } else if (checkedInSelectedGroup.length === selectedGroup.length) {
                return true
            } else {
                return undefined
            }
        }

        return (
            <List component="nav" aria-label="main mailbox folders" style={{ top: '-8px' }}>
                {
                    groupList.map((item, i) => {
                        return (
                            <ListItemButton
                                defaultValue=""
                                style={{ padding: '0px', margin: '0px' }}
                                selected={selectedIndex === i}
                                key={i}
                                onClick={(event) => { handleListItemClick(event, i); setSelectedPage(item) }}
                            >
                                <Checkbox
                                    checked={decideCheckBoxOfGroupIsChecked(item) || false}      // 為何加 || false就解決??
                                    indeterminate={decideSelectAllOrNot(item)}    //當checkbox加上indeterminate屬性時會啟用選取部分功能   true: 有些選有些不選, 會覆蓋掉checked的值狀態
                                    onChange={controlAGroupOfLittleElement}
                                    name={item}
                                ></Checkbox><span>{item}</span>
                            </ListItemButton>
                        )
                    })
                }
            </List>
        )
    }
    // 顯示選擇的頁面
    function showSelectedPage() {
        return <ItemContainerInForensicsDropSelector
            containerName={selectedPage}
            forensicsSelectedData={forensicsSelectedData}
            setForensicsSelectedData={setForensicsSelectedData}
        />
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', width: "750px" }}>
            <div style={{ minWidth: "300px", height: "599px" }}>
                <div style={{ position: 'relative', height: '599px', width: '760px', zIndex: '100', paddingLeft: '20px', backgroundColor: 'white' }}>
                    <div style={{ height: "600px", backgroundColor: 'white' }}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr  auto"}}>
                            <div style={{display:"flex",alignItems:"center"}}>痕跡取證</div>
                            <QuickSelect keywordType={''} />
                        </div>
                        {/* <KeyWordType keywordType={''} />
                        <SearchKeyword keywordType={''} /> */}
                        <hr />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', height: '450px' }}>
                            {SelectPageList()}
                            <div style={{ backgroundColor: "#F5F5F5", padding: "20px" }}>
                                {showSelectedPage()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForensicsDropSelector


// 區塊加上全選 ？