import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import DropDownMenu from './SettingBarItem/DropDownMenu'
import RadioGroupEnd from './SettingBarItem/RadioGroupEnd'
import Button from '@mui/material/Button';
import { useMutation } from '@tanstack/react-query';
// import { axiosClient } from '../api/api';
import { API, scheduledRoot, urlRoot } from '../constant';
import { DetectContext } from '../AppContext/DetectProvider';
import { useNavigate } from 'react-router-dom';
import { convertTimeStringsToString } from '../constant/functionToolbox';
import { axiosClient } from '../utiles/ProtectedRoutes';


const SettingBar: FC = () => {
    const { scheduleScan, setScheduleScan, scanModule, setScanModule, selectedId } = useContext(DetectContext);

    const navigate = useNavigate();
    const [selectedTimes, setSelectedTimes] = useState<string[]>([])

    const handleChildParam = (param: string[]) => {
        setSelectedTimes(param);
    };

    const scheduledScanRequest = useMutation({
        mutationKey: ["scheduledScanRequest"],
        mutationFn: () => {
            return axiosClient.post(`${scheduledRoot}${API.scheduledScan}`, {
                mode: scheduleScan,
                time: convertTimeStringsToString(selectedTimes),
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

    const detectionModeRequest = useMutation({
        mutationKey: ["detectionModeRequest"],
        mutationFn: () => {
            return axiosClient.post(`${urlRoot}${API.detectionMode}`, {
                mode: scanModule,
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

    if (scheduledScanRequest.error) {
        navigate('/error');
    }
    if (detectionModeRequest.error) {
        navigate('/error');
    }

    return (
        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#E1F5FE", margin: 10, borderRadius: 5 }} >
            <span style={{ marginLeft: 20, marginRight: 20 }}>定時掃描</span>
            <RadioGroupEnd setTrueOrFalse={setScheduleScan} />
            <DropDownMenu onParamChange={handleChildParam} ></DropDownMenu>
            <Button
                disabled={selectedTimes.length === 0 && scheduleScan || selectedId.length === 0}
                variant="contained"
                style={{ marginLeft: 10, marginRight: 10 }}
                onClick={() => {
                    if (selectedTimes.length === 0 && scheduleScan && selectedId.length === 0) {
                        alert("請選擇時間")
                    }
                    scheduledScanRequest.mutate()
                }}>
                {scheduledScanRequest.isLoading ? "Loading..." : "套用"}
            </Button>
            <span style={{ marginLeft: 20, marginRight: 20 }}>偵測模式</span>

            <RadioGroupEnd setTrueOrFalse={setScanModule}></RadioGroupEnd>
            <Button
                variant="contained"
                disabled={selectedId.length === 0}
                style={{ marginLeft: 20, marginRight: 20 }}
                onClick={() => {
                    detectionModeRequest.mutate()
                }}
            >
                {detectionModeRequest.isLoading ? "Loading..." : "套用"}
            </Button>
        </div >
    )
}

export default SettingBar