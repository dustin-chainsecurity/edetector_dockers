

import AnalysisTimeSettingBarSelector from './AnalysisTimeSettingBar/AnalysisTimeSettingBarSelector';
import KeywordSearchInput from './AnalysisSettingBarItem/KeywordSearchInput/KeywordSearchInput';
import AnalysisDataDropSelector from './AnalysisSettingBarItem/ForensicsDropDownSelector/AnalysisDataDropSelector';
import './AnalysisSettingBar.css'
import { AllFilesDropDownData, ForensicsSelectedData, MemorySelectedData, IGenerateGroup, IDateModuleData } from '../../constant/interfaceBoard'
import GroupDropDown from './GroupFilter/DropDown/GroupDropDown';
import { DropDownContainer, DropDownLabel } from './GroupFilter/StyledComponents';
import React from 'react'

interface IAnalysisSettingBarProps {
    groups: IGenerateGroup[];
    selectedHost: string[];  // 記錄所有被選擇的電腦
    setSelectedHost: React.Dispatch<React.SetStateAction<string[]>>;
    selectedHostGroup: string[];
    setSelectedHostGroup: React.Dispatch<React.SetStateAction<string[]>>;
    memoryDropDownSelected: MemorySelectedData,
    setMemoryDropDownSelected: React.Dispatch<React.SetStateAction<Object>>
    forensicsSelectedData: ForensicsSelectedData
    setForensicsSelectedData: React.Dispatch<React.SetStateAction<ForensicsSelectedData>>
    allFilesDropDownData: AllFilesDropDownData
    setallFilesDropDownData: React.Dispatch<React.SetStateAction<AllFilesDropDownData>>
    selectedId: readonly string[];
    setSelectedId: React.Dispatch<React.SetStateAction<readonly string[]>>;
    dateModuleData: IDateModuleData
    setDateModuleData: React.Dispatch<React.SetStateAction<IDateModuleData>>
    setMainSearchKeyword: React.Dispatch<React.SetStateAction<string>>
}

const
    AnalysisSettingBar = (props: IAnalysisSettingBarProps) => {

        const { groups, memoryDropDownSelected, setMemoryDropDownSelected, forensicsSelectedData,
            setForensicsSelectedData, allFilesDropDownData, setallFilesDropDownData,
            selectedId, setSelectedId, dateModuleData, setDateModuleData, setMainSearchKeyword } = props

        return (
            <div style={{ maxWidth: '90%', marginBottom: 20, marginTop: 10, marginRight: 40 }}>
                <div style={{ minWidth: 800, display: 'flex', marginLeft: 50 }}>
                    <DropDownContainer >
                        <GroupDropDown groups={groups} selectedId={selectedId} setSelectedId={setSelectedId} />
                    </DropDownContainer>

                    <DropDownContainer >
                        {/* <DropDownLabel style={{ height: "100%", display: "flex", alignItems: "center" }}>
                            <span>分析資料</span>
                        </DropDownLabel> */}
                        <AnalysisDataDropSelector
                            memoryDropDownSelected={memoryDropDownSelected}
                            setMemoryDropDownSelected={setMemoryDropDownSelected}
                            forensicsSelectedData={forensicsSelectedData}
                            setForensicsSelectedData={setForensicsSelectedData}
                            allFilesDropDownData={allFilesDropDownData}
                            setallFilesDropDownData={setallFilesDropDownData}
                        />
                    </DropDownContainer>


                    <DropDownContainer >
                        <AnalysisTimeSettingBarSelector
                            dateModuleData={dateModuleData}
                            setDateModuleData={setDateModuleData}
                        />
                    </DropDownContainer>



                    <DropDownContainer >
                        <KeywordSearchInput
                            setMainSearchKeyword={setMainSearchKeyword}
                        />
                    </DropDownContainer>
                </div>
            </div>
        )
    }

export default AnalysisSettingBar
