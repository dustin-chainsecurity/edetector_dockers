import React from 'react';
import TestTable from './TestTable';
import GroupListTableInAnalysisSettingBar from '../GroupListTableInAnalysisSettingBar'
import './HostDropDownSelector.css'
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { oneHostData } from '../../../../constant/interfaceBoard'



interface ChildProps {
    selectedHost: string[];  // 記錄所有被選擇的電腦
    setSelectedHost: React.Dispatch<React.SetStateAction<string[]>>;
    selectedHostGroup: string[];
    setSelectedHostGroup: React.Dispatch<React.SetStateAction<string[]>>;
    responseList: oneHostData[]
    initHostGroupList: string[]
}



const HostDropDownSelector: React.FC<ChildProps> = ({ selectedHost, setSelectedHost, selectedHostGroup, setSelectedHostGroup, responseList, initHostGroupList }) => {
    // 將打勾選項清空
    const revertAllSelectList = () => {
        setSelectedHostGroup([])
        setSelectedHost([])
    }
    return (
        <div >
            <div style={{ zIndex: 100, position: "relative" }}>
                <div>
                    <FormControl sx={{ m: 1, width: 200, top: '4px' }}>
                        <Select
                            multiple
                            displayEmpty
                            value={selectedHostGroup}
                            input={<OutlinedInput />}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>選擇主機</em>;
                                }
                                return selected.join(', ');
                            }}
                        >
                            <MenuItem value="" style={{ width: "700px", height: "620px" }}>

                                <div style={{ zIndex: "100", width: "700px", height: "620px", position: "relative", }}>

                                    <div style={{ right: "15px", padding: "10px", zIndex: "100", position: "relative", backgroundColor: "white" }}>
                                        <div className='XBar' style={{ height: "30px" }}>
                                            <span>以勾選</span>
                                            <span>群組{selectedHostGroup.length}/{initHostGroupList.length}</span>
                                            <span>電腦{selectedHost.length}/{responseList.length}</span>
                                            {/* <button onClick={handleChange} style={{ cursor: "pointer" }}>確定</button> */}
                                            <button onClick={revertAllSelectList} style={{ cursor: "pointer" }}>清空</button>
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "10px" }}>
                                            <div style={{ width: "150px", height: "546px", backgroundColor: "white" }}>
                                                {/* <GroupListTableInAnalysisSettingBar  // grouplist table
                                                    selectedHost={selectedHost}
                                                    setSelectedHost={setSelectedHost}
                                                    selectedHostGroup={selectedHostGroup}
                                                    setSelectedHostGroup={setSelectedHostGroup}
                                                    initHostGroupList={initHostGroupList}
                                                    responseList={responseList} /> */}
                                            </div>
                                            <div style={{ width: "500px", height: "525px", padding: "10px", backgroundColor: "#F5F5F5" }}>
                                                <TestTable                        // allHostList table
                                                    selected={selectedHost}
                                                    setSelected={setSelectedHost}
                                                    responseList={responseList}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    );

}


export default HostDropDownSelector

