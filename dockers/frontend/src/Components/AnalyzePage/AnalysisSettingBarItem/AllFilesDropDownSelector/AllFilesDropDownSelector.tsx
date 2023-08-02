import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../MemoryDropDownSelector/MemoryDropDownSelector.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './AllFilesDropDownSelector.css'
import { AllFilesDropDownData } from '../../../../constant/interfaceBoard'



interface ChildProps {
    allFilesDropDownData: AllFilesDropDownData
    setallFilesDropDownData: React.Dispatch<React.SetStateAction<AllFilesDropDownData>>
}




const AllFilesDropDownSelector: React.FC<ChildProps> = ({
    allFilesDropDownData,
    setallFilesDropDownData
}) => {

    function changeAllFilesDropDownData(key: string, event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setallFilesDropDownData((prevState) => {
            if (key === 'onlySearchDeletedFile') {
                let tempValue = event.target.value === 'true' ? true : false
                return {
                    ...prevState,
                    [key]: tempValue
                }
            }
            return {
                ...prevState,
                [key]: event.target.value
            }
        })
    }


    // 關鍵路徑
    const AllFileDropDownSelectorKeyPath = () => {
        return (<div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr' }}>
            <span style={{ display: 'flex', alignItems: 'center', marginRight: "10px" }}>
                關鍵路徑：
            </span>
            <TextField
                id="outlined-basic"
                size='small'
                value={allFilesDropDownData.keyPath}
                onChange={(e) => changeAllFilesDropDownData('keyPath', e)} />
            <div></div>
        </div>
        )
    }


    // // 關鍵路徑
    // const AllFileDropDownSelectorKeyPath: React.FC<ChildProps> = ({ allFilesDropDownData, setallFilesDropDownData }) => {
    //     const [mes, setMes] =React.useState('') ;

    //     return (<div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr' }}>
    //         <span style={{ display: 'flex', alignItems: 'center', marginRight: "10px" }}>
    //             關鍵路徑：
    //         </span>
    //         <TextField
    //             id="outlined-basic"
    //             size='small'
    //             type='text'
    //             // value={allFilesDropDownData.keyPath}
    //             onChange={(e) => {
    //                 console.log(e.target.value)
    //                 setMes(e.target.value)
    //             }

    //             } />
    //         <div></div>
    //     </div>
    //     )
    // }

    // 關鍵字類別:
    const AllFileDropDownSelectorKeywordType = () => {
        return (<div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr' }}>
            <span style={{ display: 'flex', alignItems: 'center', marginRight: "10px" }}>關鍵字類別:</span>
            <div>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={allFilesDropDownData.keywordType}
                        onChange={(e) => changeAllFilesDropDownData("keywordType", e)}
                    >
                        <FormControlLabel value="影音檔" control={<Radio />} label="影音檔" />
                        <FormControlLabel value="圖片檔" control={<Radio />} label="圖片檔" />
                        <FormControlLabel value="文件檔" control={<Radio />} label="文件檔" />
                        <FormControlLabel value="自訂" control={<Radio />} label="自訂" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
        )
    }

    // 關鍵字-檔名：
    const AllFileDropDownSelectorKeywordFileName = () => {
        return (<div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr' }}>
            <span style={{ display: 'flex', alignItems: 'center', marginRight: "10px" }}>
                關鍵字-檔名：
            </span>
            <TextField
                id="outlined-basic"
                size='small'
                value={allFilesDropDownData.keywordFileName}
                onChange={(e) => changeAllFilesDropDownData('keywordFileName', e)} />
            <div></div>
        </div>
        )
    }

    // 關鍵字-內文：
    const AllFileDropDownSelectorKeywordContent = () => {
        return (<div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr' }}>
            <span style={{ display: 'flex', alignItems: 'center', marginRight: "10px" }}>
                關鍵字-內文：
            </span>
            <TextField
                id="outlined-basic"
                size='small'
                value={allFilesDropDownData.keywordContent}
                onChange={(e) => changeAllFilesDropDownData('keywordContent', e)} />
            <div></div>
        </div>
        )
    }

    // 檔案大小：
    const AllFileDropDownSelectorFileSize = () => {
        return (<div>
            <div className='allFileDropDownSelectorFileSizeBar' style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto 1fr' }}>
                <div style={{ display: "flex", alignItems: 'center' }}>
                    <span>檔案大小 :</span>
                </div>

                <div>
                    <Box sx={{ width: 100 }}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={allFilesDropDownData.fileSize}
                                label=""
                                onChange={(e) => changeAllFilesDropDownData('fileSize', e)}
                            >
                                <MenuItem value={'min'}>至少</MenuItem>
                                <MenuItem value={'max'}>至多</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div style={{ width: "200px", display: 'flex', alignItems: 'end' }}>
                    <TextField
                        id="outlined-basic"
                        type='number'
                        value={allFilesDropDownData.fileSizeValue}
                        size='small'
                        // fullWidth
                        onChange={(e) => changeAllFilesDropDownData('fileSizeValue', e)} />
                </div>
                <div>
                    <Box sx={{ width: 100 }}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="fileSizeUnit"></InputLabel>
                            <Select
                                labelId="fileSizeUnit"
                                id="demo-simple-select"
                                value={allFilesDropDownData.fileUnit}
                                label=""
                                onChange={(e) => changeAllFilesDropDownData('fileUnit', e)}
                            >
                                <MenuItem value={'MB'}>MB</MenuItem>
                                <MenuItem value={'GB'}>GB</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>

        </div>
        )
    }

    // 關鍵字-內文：
    const AllFileDropDownSelectorOnlySearchDeletedFile = () => {
        return (<div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr' }}>
            <div style={{ display: "flex", alignItems: 'center', marginRight: "10px" }}>
                <span>只搜刪除檔 :</span>
            </div>

            <div>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-form-control-label-placement"
                        name="position"
                        value={allFilesDropDownData.onlySearchDeletedFile === true ? 'true' : 'false'}
                        onChange={(e) => changeAllFilesDropDownData('onlySearchDeletedFile', e)}
                    >
                        <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="否" />
                        <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="是" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div></div>
        </div>
        )
    }
    function changeMemoryDropDownSelected(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.checked)
        setallFilesDropDownData({
            ...allFilesDropDownData,
            isAllFilesSelected: e.target.checked
        })
    }


    return (<div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
        <Checkbox
            checked={allFilesDropDownData.isAllFilesSelected ? true : false}
            // name={'memoryGroupChecked'}
            // value={memoryDropDownSelected.memoryGroupChecked}
            onChange={(e) => changeMemoryDropDownSelected(e)}
        />
        <FormControl sx={{ m: 1, width: 120, top: '4px' }}>
            <Select
                multiple
                value={["檔案總表"]}
                renderValue={() => <em>檔案總表</em>}
            >
                <div style={{ minWidth: "300px", height: "311px" }}>
                    <div style={{ position: 'relative', height: '311px', width: '534px', zIndex: '100', left: '-20px', paddingLeft: '20px', backgroundColor: 'white' }}>
                        <div style={{ height: "311px", width: '750px', paddingRight: '20px', paddingLeft: '20px', backgroundColor: 'white' }}>
                            {/* <QuickSelect keywordType={''} />
                        <KetWordType keywordType={''} />
                        <SearchKeyword keywordType={''} /> */}
                            <div className='allRow'>
                                {AllFileDropDownSelectorKeyPath()}
                                {/* <AllFileDropDownSelectorKeyPath allFilesDropDownData={allFilesDropDownData} setallFilesDropDownData={setallFilesDropDownData} /> */}
                                {AllFileDropDownSelectorKeywordType()}
                                {AllFileDropDownSelectorKeywordFileName()}
                                {AllFileDropDownSelectorKeywordContent()}
                                <hr />

                                {AllFileDropDownSelectorFileSize()}
                                {AllFileDropDownSelectorOnlySearchDeletedFile()}

                            </div>
                        </div>
                    </div>
                </div>
            </Select>
        </FormControl>
    </div>
    )
}

export default AllFilesDropDownSelector;
