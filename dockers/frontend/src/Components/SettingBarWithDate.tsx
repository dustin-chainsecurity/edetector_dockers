import RadioGroupEnd from './SettingBarItem/RadioGroupEnd'
import Button from '@mui/material/Button';
import DateAndTimeSelector from './SettingBarItem/DateAndTimeSelector/DateAndTimeSelector';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
// import { axiosClient } from '../api/api';
import { API, scheduledRoot, urlRoot } from '../constant';
import { TactionType } from '../constant/interfaceBoard';
import { DetectContext } from '../AppContext/DetectProvider';
import { axiosClient } from '../utiles/ProtectedRoutes';

interface ChildProps {
    settingBarShowOptions: TactionType;
}

const SettingBarWithDate = ({ settingBarShowOptions }: ChildProps) => {
    const { setScheduleDownload, setScheduleForensics, selectedId, scheduleForensicsTime, scheduleForensics, scheduleDownload,
        setScheduleForensicsTime, scheduleDownloadTime, setScheduleDownloadTime } = useContext(DetectContext);


    const scheduledForensicsRequest = useMutation({
        mutationKey: ["scheduledForensicsRequest"],
        mutationFn: () => {
            return axiosClient.post(`${scheduledRoot}${API.scheduledForensics}`, {
                mode: scheduleForensics,
                date: scheduleForensicsTime.date,
                time: scheduleForensicsTime.time,
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

    const scheduledDownloadRequest = useMutation({
        mutationKey: ["scheduledDownloadRequest"],
        mutationFn: () => {
            return axiosClient.post(`${scheduledRoot}${API.scheduledDownload}`, {
                mode: scheduleDownload,
                date: scheduleDownloadTime.date,
                time: scheduleDownloadTime.time,
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


    return (
        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#E1F5FE", margin: 10, borderRadius: 5 }} >

            <span style={{ marginLeft: 20, marginRight: 20 }}>{settingBarShowOptions === '痕跡取證' && '定時取證'}</span>
            <span style={{ marginLeft: 20, marginRight: 20 }}>{settingBarShowOptions === '檔案總表' && '定時下載'}</span>

            <RadioGroupEnd setTrueOrFalse={settingBarShowOptions === '痕跡取證' ? setScheduleForensics : setScheduleDownload}></RadioGroupEnd>
            {settingBarShowOptions === '痕跡取證' && <DateAndTimeSelector setScheduleTime={setScheduleForensicsTime} scheduleTime={scheduleForensicsTime} />}
            {settingBarShowOptions === '檔案總表' && <DateAndTimeSelector setScheduleTime={setScheduleDownloadTime} scheduleTime={scheduleDownloadTime} />}
            <Button variant="contained" style={{ marginLeft: 10, marginRight: 10 }}
                disabled={selectedId.length === 0}
                onClick={
                    () => {
                        if (settingBarShowOptions === "痕跡取證") {
                            scheduledForensicsRequest.mutate()
                        } else if (settingBarShowOptions === "檔案總表") {
                            scheduledDownloadRequest.mutate()
                        }
                    }

                }>套用</Button>
        </div >
    )
}

export default SettingBarWithDate


