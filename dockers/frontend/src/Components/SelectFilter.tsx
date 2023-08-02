import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
// import { axiosClient } from '../api/api';
import { API, urlRoot } from '../constant';
import { TactionType } from '../constant/interfaceBoard';
import Error404Page from '../Page/ErrorPage/404Page';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { DetectContext } from '../AppContext/DetectProvider';
import { axiosClient } from '../utiles/ProtectedRoutes';
import { useNavigate } from 'react-router-dom';

interface SelectFilterProps {
    title: TactionType;
    isOption: boolean;
    isThemeColor: boolean;
    settingBarShowOptions: TactionType;
    setSettingBarShowOptions: React.Dispatch<React.SetStateAction<TactionType>>;
}



const elelmentStyle = {
    display: 'flex',
    height: 70,
    minWidth: 280,
    width: '19%',
    margin: '5px auto',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4
}

const tileMatchName = (title: TactionType) => {
    switch (title) {
        case '記憶體':
            return { buttonTitle: '立即掃描', axiosTitle: 'StartScan' }
        case '痕跡取證':
            return { buttonTitle: '立即取證', axiosTitle: 'StartCollect' }
        case '檔案總表':
            return { buttonTitle: '立即下載', axiosTitle: 'StartGetDrive' }
        case '關鍵映像檔':
            return { buttonTitle: '立即製作', axiosTitle: 'StartGetImage' }
        case '任務執行':
            return { buttonTitle: '終止任務', axiosTitle: 'Terminate' }
        default:
            return { buttonTitle: '錯誤', axiosTitle: 'error' }
    }
}

const SelectFilter = (props: SelectFilterProps) => {
    const { selectedId } = useContext(DetectContext);
    const navigate = useNavigate();

    const actionRequest = useMutation({
        mutationKey: ["missionRequest"],
        mutationFn: () => {
            return axiosClient.post(`${urlRoot}${API.SendMission}`, {
                action: tileMatchName(props.title).axiosTitle,
                deviceId: selectedId
            });
        },
        onSuccess: (res) => {
            console.log('onSuccess', res.data);
            if (!res.data.isSuccess) {
                alert(res.data.message)
            }
        }
    });

    const handleFetchMission = () => {
        actionRequest.mutate()
    }

    const onOptionClick = (param: TactionType) => {
        props.setSettingBarShowOptions(prevOption => prevOption === param ? "" : param);
    }

    const ArrowDirection = () => {
        if (props.settingBarShowOptions === props.title) {
            return <ArrowDropUpIcon color="action" />
        }
        return <ArrowDropDownIcon color="action" />
    }

    if (actionRequest.error) {
        navigate('/error')
    }

    return (
        <div style={{
            backgroundColor: props.isThemeColor ? '#B3E5FC' : '#FECDD2',
            ...elelmentStyle
        }}>
            <div style={{ width: '50%', textAlign: 'center' }}>
                <p>{props.title}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button sx={{ backgroundColor: props.isThemeColor ? '#2196F3' : '#D32F2F', color: 'white', cursor: 'pointer' }}
                    variant="contained"
                    disabled={selectedId.length === 0}
                    onClick={() => { handleFetchMission() }}
                >
                    {actionRequest.isLoading ? 'loading...' : tileMatchName(props.title).buttonTitle}
                </Button>
                {props.isOption ?
                    <div
                        onClick={() => { onOptionClick(props.title) }}
                        style={{ cursor: 'pointer', padding: 5 }}
                    >
                        <ArrowDirection />
                    </div> :
                    null
                }
            </div>


        </div>
    )
}

export default SelectFilter