
import React, { useState, useEffect } from 'react'
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
const AnalysisPageTable = () => {

    return (
        <div></div>       
    )
}

export default AnalysisPageTable
