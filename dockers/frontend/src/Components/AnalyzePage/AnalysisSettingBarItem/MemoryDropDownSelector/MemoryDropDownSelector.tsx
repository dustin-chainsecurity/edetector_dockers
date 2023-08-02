import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './MemoryDropDownSelector.css'
import Button from '@mui/material/Button';
import { oneHostData, AllFilesDropDownData, ForensicsSelectedData, MemorySelectedData, RiskLevel, InjectActive, ProcessBeInjected, Boot, Hook, Hide } from '../../../../constant/interfaceBoard'



interface ChildProps {
    memoryDropDownSelected: MemorySelectedData
    setMemoryDropDownSelected: React.Dispatch<React.SetStateAction<MemorySelectedData>>
}



const MemoryDropDownSelector: React.FC<ChildProps> = ({ memoryDropDownSelected, setMemoryDropDownSelected }) => {


    function generateInitMemoryDropDownSelected(
        isMemoryGroupSelected?: boolean,
        processName?: string,
        processConnectIP?: string,
        dynamicCommand?: string,
        processMD5?: string,
        processPath?: string,
        parentProcessPath?: string,
        digitalSign?: string,
        importOtherDLL?: string,
        processId?: string,
        riskLevel?: RiskLevel[],
        injectActive?: InjectActive[],
        processBeInjected?: ProcessBeInjected[],
        boot?: Boot[],
        hook?: Hook[],
        hide?: Hide[],
    ): MemorySelectedData {
        return {
            isMemoryGroupSelected,
            processName,
            processConnectIP,
            dynamicCommand,
            processMD5,
            processPath,
            parentProcessPath,
            digitalSign,
            importOtherDLL,
            processId,
            riskLevel,
            injectActive,
            processBeInjected,
            boot,
            hook,
            hide,
        }
    }
    function changeMemoryDropDownSelected(title: string, newData?: string) {
        console.log('進入判斷是')
        switch (title) {
            case "processName":
                memoryDropDownSelected.processName = newData
                break
            case "processConnectIP":
                memoryDropDownSelected.processConnectIP = newData
                break
            case "dynamicCommand":
                memoryDropDownSelected.dynamicCommand = newData
                break
            case "processMD5":
                memoryDropDownSelected.processMD5 = newData
                break
            case "processPath":
                memoryDropDownSelected.processPath = newData
                break
            case "parentProcessPath":
                memoryDropDownSelected.parentProcessPath = newData
                break
            case "digitalSign":
                memoryDropDownSelected.digitalSign = newData
                break
            case "importOtherDLL":
                memoryDropDownSelected.importOtherDLL = newData
                break
            case "processId":
                memoryDropDownSelected.processId = newData
                break
            case "riskLevel":
                let lastRiskLevelList = memoryDropDownSelected.riskLevel
                if (lastRiskLevelList?.filter((item) => item === newData).length === 0) {
                    lastRiskLevelList?.push(newData as RiskLevel)
                    console.log('新增', lastRiskLevelList)
                } else {
                    const newList = lastRiskLevelList?.filter((item) => item !== newData)
                    lastRiskLevelList = newList
                    console.log('移除', lastRiskLevelList)
                }
                memoryDropDownSelected.riskLevel = lastRiskLevelList
                break
            case "injectActive":
                let injectActiveList = memoryDropDownSelected.injectActive
                if (injectActiveList?.filter((item) => item === newData).length === 0) {
                    injectActiveList?.push(newData as InjectActive)
                    console.log('新增', injectActiveList)
                } else {
                    const newList = injectActiveList?.filter((item) => item !== newData)
                    injectActiveList = newList
                    console.log('移除', injectActiveList)
                }
                memoryDropDownSelected.injectActive = injectActiveList
                break
            case "processBeInjected":
                let processBeInjectedList = memoryDropDownSelected.processBeInjected
                if (processBeInjectedList?.filter((item) => item === newData).length === 0) {
                    processBeInjectedList?.push(newData as ProcessBeInjected)
                    console.log('新增', processBeInjectedList)
                } else {
                    const newList = processBeInjectedList?.filter((item) => item !== newData)
                    processBeInjectedList = newList
                    console.log('移除', processBeInjectedList)
                }
                memoryDropDownSelected.processBeInjected = processBeInjectedList
                break
            case "boot":
                let bootList = memoryDropDownSelected.boot
                if (bootList?.filter((item) => item === newData).length === 0) {
                    bootList?.push(newData as Boot)
                    console.log('新增', bootList)
                } else {
                    const newList = bootList?.filter((item) => item !== newData)
                    bootList = newList
                    console.log('移除', bootList)
                }
                memoryDropDownSelected.boot = bootList
                break
            case "hook":
                let hookList = memoryDropDownSelected.hook
                console.log('進入riskLevel')
                if (hookList?.filter((item) => item === newData).length === 0) {
                    hookList?.push(newData as Hook)
                    console.log('新增', hookList)
                } else {
                    const newList = hookList?.filter((item) => item !== newData)
                    hookList = newList
                    console.log('移除', hookList)
                }
                memoryDropDownSelected.hook = hookList
                break
            case "hide":
                let hideList = memoryDropDownSelected.hide
                console.log('進入riskLevel')
                if (hideList?.filter((item) => item === newData).length === 0) {
                    hideList?.push(newData as Hide)
                    console.log('新增', hideList)
                } else {
                    const newList = hideList?.filter((item) => item !== newData)
                    hideList = newList
                    console.log('移除', hideList)
                }
                memoryDropDownSelected.hide = hideList
                break
            case "deleteAll":
                memoryDropDownSelected = generateInitMemoryDropDownSelected(memoryDropDownSelected.isMemoryGroupSelected, "", "", "", "", "", "", "", "", "", [], [], [], [], [], [])
                break
            default:
                memoryDropDownSelected = memoryDropDownSelected
        }
        let newDataList = generateInitMemoryDropDownSelected(
            memoryDropDownSelected.isMemoryGroupSelected,
            memoryDropDownSelected.processName,
            memoryDropDownSelected.processConnectIP,
            memoryDropDownSelected.dynamicCommand,
            memoryDropDownSelected.processMD5,
            memoryDropDownSelected.processPath,
            memoryDropDownSelected.parentProcessPath,
            memoryDropDownSelected.digitalSign,
            memoryDropDownSelected.importOtherDLL,
            memoryDropDownSelected.processId,
            memoryDropDownSelected.riskLevel,
            memoryDropDownSelected.injectActive,
            memoryDropDownSelected.processBeInjected,
            memoryDropDownSelected.boot,
            memoryDropDownSelected.hook,
            memoryDropDownSelected.hide,
        )
        setMemoryDropDownSelected(newDataList)
        console.log(memoryDropDownSelected)
    }
    function changeIsMemoryDropDownSelected(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.checked)
        setMemoryDropDownSelected({
            ...memoryDropDownSelected,
            isMemoryGroupSelected: e.target.checked,
        })
    }


    return <div>
        <div style={{ zIndex: 100, position: "relative", display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
            <Checkbox
                checked={memoryDropDownSelected.isMemoryGroupSelected}
                // name={'isMemoryGroupSelected'}
                // value={memoryDropDownSelected.isMemoryGroupSelected}
                onChange={(e) => { changeIsMemoryDropDownSelected(e) }} />
            <span>
                <FormControl sx={{ m: 1, width: 100, top: '4px' }}>
                    <Select
                        multiple
                        value={['記憶體']}
                        renderValue={() => <em>記憶體</em>}>
                        <MenuItem value="" style={{ minWidth: "300px", width: "771px", height: "422px", backgroundColor: 'white' }}>

                            <div style={{ zIndex: 100, width: "100%", height: "100%", backgroundColor: "white" }}>
                                <div style={{ height: "30px" }}>
                                    <div style={{ float: 'right' }}><Button variant="contained" onClick={() => changeMemoryDropDownSelected('deleteAll')}>清除</Button></div>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 2fr", width: '100%', height: '90%' }}>
                                    <div className='memoryDropDownSelector'  >
                                        <div><span>程序名稱 :</span></div>
                                        <div><span>程序連線IP :</span></div>
                                        <div><span>動指令 :</span></div>
                                        <div><span>程序MD5 :</span></div>
                                        <div><span>程序路徑 :</span></div>
                                        <div><span>父程序路徑 :</span></div>
                                        <div><span>數位簽章 :</span></div>
                                        <div><span>載入其他dll :</span></div>
                                        <div><span>程序編號 :</span></div>
                                    </div>
                                    <div className='memoryInputBox'>
                                        <div><input type="text" title={"processName"} value={memoryDropDownSelected.processName} onChange={(e) => { changeMemoryDropDownSelected(e.target.title, e.target.value) }} /></div>
                                        <div><input type="text" title={"processConnectIP"} value={memoryDropDownSelected.processConnectIP} onChange={(e) => { changeMemoryDropDownSelected(e.target.title, e.target.value) }} /></div>
                                        <div><input type="text" title={"dynamicCommand"} value={memoryDropDownSelected.dynamicCommand} onChange={(e) => { changeMemoryDropDownSelected(e.target.title, e.target.value) }} /></div>
                                        <div><input type="text" title={"processMD5"} value={memoryDropDownSelected.processMD5} onChange={(e) => { changeMemoryDropDownSelected(e.target.title, e.target.value) }} /></div>
                                        <div><input type="text" title={"processPath"} value={memoryDropDownSelected.processPath} onChange={(e) => { changeMemoryDropDownSelected(e.target.title, e.target.value) }} /></div>
                                        <div><input type="text" title={"parentProcessPath"} value={memoryDropDownSelected.parentProcessPath} onChange={(e) => { changeMemoryDropDownSelected(e.target.title, e.target.value) }} /></div>
                                        <div><input type="text" title={"digitalSign"} value={memoryDropDownSelected.digitalSign} onChange={(e) => { changeMemoryDropDownSelected(e.target.title, e.target.value) }} /></div>
                                        <div><input type="text" title={"importOtherDLL"} value={memoryDropDownSelected.importOtherDLL} onChange={(e) => { changeMemoryDropDownSelected(e.target.title, e.target.value) }} /></div>
                                        <div><input type="text" title={"processId"} value={memoryDropDownSelected.processId} onChange={(e) => { changeMemoryDropDownSelected(e.target.title, e.target.value) }} /></div>
                                    </div>
                                    <div className='memoryDropDownSelector2'>
                                        <div ><span>風險等級 :</span></div>
                                        <div><span>注入行為 :</span></div>
                                        <div><span>程序被注入行為 :</span></div>
                                        <div><span>開機 動 :</span></div>
                                        <div><span>Hook :</span></div>
                                        <div><span>隱藏 :</span></div>
                                        <div style={{ visibility: "hidden" }}><span>1</span></div>
                                        <div style={{ visibility: "hidden" }}><span>1</span></div>
                                        <div style={{ visibility: "hidden" }}><span>1</span></div>
                                    </div>
                                    <div className='checkBoxColumn'>
                                        <div>
                                            <Checkbox
                                                checked={memoryDropDownSelected.riskLevel?.filter((item) => item === "四").length !== 0}
                                                name={'riskLevel'}
                                                value={'四'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />四
                                            <Checkbox
                                                checked={memoryDropDownSelected.riskLevel?.filter((item) => item === "三").length !== 0}
                                                name={'riskLevel'}
                                                value={'三'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />三
                                            <Checkbox
                                                checked={memoryDropDownSelected.riskLevel?.filter((item) => item === "二").length !== 0}
                                                name={'riskLevel'}
                                                value={'二'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />二
                                            <Checkbox
                                                checked={memoryDropDownSelected.riskLevel?.filter((item) => item === "一").length !== 0}
                                                // checked={true && false}
                                                name={'riskLevel'}
                                                value={'一'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />一
                                        </div>
                                        <div>
                                            <Checkbox
                                                checked={memoryDropDownSelected.injectActive?.filter((item) => item === "PE").length !== 0}
                                                name={'injectActive'}
                                                value={'PE'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />PE
                                            <Checkbox
                                                checked={memoryDropDownSelected.injectActive?.filter((item) => item === "非PE程式碼").length !== 0}
                                                name={'injectActive'}
                                                value={'非PE程式碼'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />非PE程式碼
                                            <Checkbox
                                                checked={memoryDropDownSelected.injectActive?.filter((item) => item === "無").length !== 0}
                                                name={'injectActive'}
                                                value={'無'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />無
                                        </div>
                                        <div>
                                            <Checkbox
                                                checked={memoryDropDownSelected.processBeInjected?.filter((item) => item === "有").length !== 0}
                                                name={'processBeInjected'}
                                                value={'有'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />有
                                            <Checkbox
                                                checked={memoryDropDownSelected.processBeInjected?.filter((item) => item === "無").length !== 0}
                                                name={'processBeInjected'}
                                                value={'無'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />無
                                        </div>
                                        <div>
                                            <Checkbox
                                                checked={memoryDropDownSelected.boot?.filter((item) => item === "Service").length !== 0}
                                                name={'boot'}
                                                value={'Service'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />Service
                                            <Checkbox
                                                checked={memoryDropDownSelected.boot?.filter((item) => item === "AutoRun").length !== 0}
                                                name={'boot'}
                                                value={'AutoRun'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />AutoRun
                                            <Checkbox
                                                checked={memoryDropDownSelected.boot?.filter((item) => item === "無").length !== 0}
                                                name={'boot'}
                                                value={'無'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />無
                                        </div>
                                        <div>
                                            <Checkbox
                                                checked={memoryDropDownSelected.hook?.filter((item) => item === "有").length !== 0}
                                                name={'hook'}
                                                value={'有'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />有
                                            <Checkbox
                                                checked={memoryDropDownSelected.hook?.filter((item) => item === "無").length !== 0}
                                                name={'hook'}
                                                value={'無'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />無
                                        </div>
                                        <div>
                                            <Checkbox
                                                checked={memoryDropDownSelected.hide?.filter((item) => item === "Process").length !== 0}
                                                name={'hide'}
                                                value={'Process'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />Process
                                            <Checkbox
                                                checked={memoryDropDownSelected.hide?.filter((item) => item === "File").length !== 0}
                                                name={'hide'}
                                                value={'File'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />File
                                            <Checkbox
                                                checked={memoryDropDownSelected.hide?.filter((item) => item === "無").length !== 0}
                                                name={'hide'}
                                                value={'無'}
                                                onChange={(e) => { changeMemoryDropDownSelected(e.target.name, e.target.value) }} />無
                                        </div>
                                        <div style={{ visibility: "hidden" }}><input type="text" /></div>
                                        <div style={{ visibility: "hidden" }}><input type="text" /></div>
                                        <div style={{ visibility: "hidden" }}><input type="text" /></div>
                                    </div>
                                </div>

                            </div>

                        </MenuItem>
                    </Select>
                </FormControl>
            </span>
        </div>
    </div>
}

export default MemoryDropDownSelector
