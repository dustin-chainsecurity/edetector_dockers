import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { AllFilesDropDownData, ForensicsSelectedData, MemorySelectedData } from '../../../../constant/interfaceBoard'
import ForensicsDropSelector from './ForensicsDropSelector';
import MemoryDropDownSelector from '../MemoryDropDownSelector/MemoryDropDownSelector';
import AllFilesDropDownSelector from '../AllFilesDropDownSelector/AllFilesDropDownSelector';
import { DropDownLabel } from '../../GroupFilter/StyledComponents';

interface ChildProps {
    memoryDropDownSelected: MemorySelectedData
    setMemoryDropDownSelected: React.Dispatch<React.SetStateAction<MemorySelectedData>>
    forensicsSelectedData: ForensicsSelectedData
    setForensicsSelectedData: React.Dispatch<React.SetStateAction<ForensicsSelectedData>>
    allFilesDropDownData: AllFilesDropDownData
    setallFilesDropDownData: React.Dispatch<React.SetStateAction<AllFilesDropDownData>>
}



const AnalysisDataDropSelector: React.FC<ChildProps> = (props: ChildProps) => {
    const { memoryDropDownSelected, setMemoryDropDownSelected, forensicsSelectedData, setForensicsSelectedData, allFilesDropDownData, setallFilesDropDownData } = props

    const [selectedIndex, setSelectedIndex] = React.useState(0); // 選擇哪個頁面3
    const [selectedMainSelectorName, setSelectedMainSelectorName] = React.useState<string>("記憶體"); // 選擇哪個頁面3
    const handleMainListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index)
    }

    function changeIsMemoryDropDownSelected(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.checked)
        setMemoryDropDownSelected({
            ...memoryDropDownSelected,
            isMemoryGroupSelected: e.target.checked,
        })
    }
    function isSelectAll() {
        const keysToChange = Object.keys(forensicsSelectedData).filter(key => key !== "keyword" && key !== "keywordType" && key !== "isForensicsSelected");
        let count = 0
        for (const key of keysToChange) {
            if (forensicsSelectedData[key] === true) {
                count++
            }
        }
        if (count === keysToChange.length) {
            return true
        } else {
            return false
        }
    }
    function isSelectPart() {
        const keysToChange = Object.keys(forensicsSelectedData).filter(key => key !== "keyword" && key !== "keywordType" && key !== "isForensicsSelected");
        let count = 0
        for (const key of keysToChange) {
            if (forensicsSelectedData[key] === true) {
                // console.log(key)
                count++
            }
        }
        if (count !== keysToChange.length && count !== 0) {
            return true
        } else {
            return false
        }
    }
    // 控制是否選取記憶體
    function handleForensicsDropDownSelected(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.checked)
        console.log(forensicsSelectedData)
        // 除了keyword 和keywordType 其他都要改成 e.target.checked
        const newForensicSelectedData: ForensicsSelectedData = {
            ...forensicsSelectedData,
        }

        const keysToChange = Object.keys(newForensicSelectedData).filter(key => key !== "keyword" && key !== "keywordType");
        console.log("keysToChange", keysToChange)
        for (const key of keysToChange) {
            newForensicSelectedData[key] = e.target.checked;
        }

        setForensicsSelectedData(newForensicSelectedData)
    }
    function changeMemoryDropDownSelected(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.checked)
        setallFilesDropDownData({
            ...allFilesDropDownData,
            isAllFilesSelected: e.target.checked
        })
    }





    const mainSelectorList = () => {
        const mainSelectorNameList = ["記憶體", "痕跡取證", "檔案總表"]
        return <List component="nav" aria-label="main mailbox folders" style={{}}>
            {
                mainSelectorNameList.map((item, i) => {
                    return (
                        <ListItemButton
                            defaultValue=""
                            style={{ paddingRight: '5px', marginRight: '0px' }}
                            selected={selectedIndex === i}
                            key={`${item}${i}-SelectorList`}
                            onClick={(event) => { handleMainListItemClick(event, i); setSelectedMainSelectorName(item) }}
                        >
                            {
                                item === "記憶體" ?
                                    <>
                                        <Checkbox
                                            sx={{ padding: '0px', marginRight: '3px' }}
                                            checked={memoryDropDownSelected.isMemoryGroupSelected}
                                            // name={'isMemoryGroupSelected'}
                                            // value={memoryDropDownSelected.isMemoryGroupSelected}
                                            onChange={(e) => { changeIsMemoryDropDownSelected(e) }} />
                                        <span>{item}</span>
                                    </> : null
                            }
                            {
                                item === "痕跡取證" ?
                                    <>
                                        <Checkbox
                                            sx={{ padding: '0px', marginRight: '3px' }}
                                            // checked={forensicsSelectedData.isForensicsSelected}
                                            checked={isSelectAll()}
                                            indeterminate={isSelectPart() || false}
                                            onChange={(e) => handleForensicsDropDownSelected(e)} />
                                        <span>{item}</span>
                                    </> : null
                            }
                            {
                                item === "檔案總表" ?
                                    <>
                                        <Checkbox
                                            checked={allFilesDropDownData.isAllFilesSelected ? true : false}
                                            // name={'memoryGroupChecked'}
                                            // value={memoryDropDownSelected.memoryGroupChecked}
                                            onChange={(e) => changeMemoryDropDownSelected(e)}
                                            sx={{ padding: '0px', marginRight: '3px' }} />
                                        <span>{item}</span>
                                    </> : null
                            }
                        </ListItemButton>
                    )
                })
            }
        </List>
    }


    return (
        <div style={{ width: "min-content", display: "flex", height: "100%" }}>

            <div style={{ height: "100%", whiteSpace: "nowrap", display: "flex", alignItems: "center",marginLeft:20 }}>
                分析資料
            </div>

            <FormControl sx={{ m: 1, width: 200,  backgroundColor: 'white',height:"min-content" }} size='small'>
                <Select
                    multiple
                    value={["126", "fepfl"]}
                    renderValue={() => <em>記憶體,痕跡取證,檔案總表</em>}
                >
                    <div style={{ minWidth: "300px", height: 600, display: "flex", overflow: "hidden" }}>
                        <div style={{ width: 200, height: "100%" }}>
                            {mainSelectorList()}
                        </div>
                        <div style={{ width: 800, height: "100%" }}>
                            {
                                selectedMainSelectorName === "記憶體" ?
                                    <MemoryDropDownSelector
                                        memoryDropDownSelected={memoryDropDownSelected}
                                        setMemoryDropDownSelected={setMemoryDropDownSelected}
                                    /> : null
                            }
                            {
                                selectedMainSelectorName === "痕跡取證" ?
                                    <ForensicsDropSelector
                                        forensicsSelectedData={forensicsSelectedData}
                                        setForensicsSelectedData={setForensicsSelectedData}
                                    /> : null

                            }
                            {
                                selectedMainSelectorName === "檔案總表" ?
                                    <AllFilesDropDownSelector
                                        allFilesDropDownData={allFilesDropDownData}
                                        setallFilesDropDownData={setallFilesDropDownData}
                                    /> : null
                            }

                        </div>

                    </div>
                </Select>
            </FormControl>
        </div>

    )
}

export default AnalysisDataDropSelector
