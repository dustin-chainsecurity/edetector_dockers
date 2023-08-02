

import MemoryDropDownSelector from './AnalysisSettingBarItem/MemoryDropDownSelector/MemoryDropDownSelector'
import ForensicsDropSelector from './AnalysisSettingBarItem/ForensicsDropDownSelector/ForensicsDropSelector'
import AllFilesDropDownSelector from './AnalysisSettingBarItem/AllFilesDropDownSelector/AllFilesDropDownSelector'
import AnalysisTimeSettingBarSelector from './AnalysisTimeSettingBar/AnalysisTimeSettingBarSelector';
import './AnalysisSettingBar.css'
import Button from '@mui/material/Button';
import { AllFilesDropDownData, ForensicsSelectedData, MemorySelectedData, IGenerateGroup, IDateModule, IDateModuleData } from '../../constant/interfaceBoard'
import { forensicsDropSelectorTranfer } from '../../constant/functionToolbox'
import GroupDropDown from './GroupFilter/DropDown/GroupDropDown';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { axiosElastic } from '../../utiles/ProtectedRoutes';
import { elasticChildUrl, elasticParent, elasticRoot } from '../../constant';
import { AxiosResponse } from 'axios';
interface oneNode {
    name: string
    type: "group" | "item"
    children: oneNode[]
}

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
    setResponseFromElasticsearch: React.Dispatch<React.SetStateAction<any>>
    selectedId: readonly string[];
    setSelectedId: React.Dispatch<React.SetStateAction<readonly string[]>>;
    // fetchElasticSearch: UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
    dateModuleData: IDateModuleData
    setDateModuleData: React.Dispatch<React.SetStateAction<IDateModuleData>>
}

const AnalysisSettingBar = (props: IAnalysisSettingBarProps) => {

    const { groups, memoryDropDownSelected, setMemoryDropDownSelected, forensicsSelectedData,
        setForensicsSelectedData, allFilesDropDownData, setallFilesDropDownData,
        selectedId, setSelectedId, dateModuleData,setDateModuleData } = props


    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto 1fr' }}>

            <GroupDropDown groups={groups} selectedId={selectedId} setSelectedId={setSelectedId} />

            <div className='analysisDataSettingBar'>
                <div>分析資料</div>
                <div className='analysisDropDownGroup'>
                    <span>
                        <MemoryDropDownSelector
                            memoryDropDownSelected={memoryDropDownSelected}
                            setMemoryDropDownSelected={setMemoryDropDownSelected}
                        />
                    </span>
                    <span>
                        <ForensicsDropSelector
                            forensicsSelectedData={forensicsSelectedData}
                            setForensicsSelectedData={setForensicsSelectedData}
                        />
                    </span>
                    <span>
                        <AllFilesDropDownSelector
                            allFilesDropDownData={allFilesDropDownData}
                            setallFilesDropDownData={setallFilesDropDownData}
                        />
                    </span>

                </div>
            </div>
            <div className='analysisTimeSettingBar'>
                <div style={{ marginRight: '10px' }}>
                    分析時間
                </div>
                <div>
                    <AnalysisTimeSettingBarSelector
                        dateModuleData={dateModuleData}
                        setDateModuleData={setDateModuleData}
                    />
                </div>
            </div>
        </div>
    )
}

export default AnalysisSettingBar
