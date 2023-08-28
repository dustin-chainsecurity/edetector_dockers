import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { IDateModule, IDateModuleData } from '../../../constant/interfaceBoard';
import { useState } from 'react';
import { ListItemButton } from '@mui/material';
import { DropDownLabel } from '../GroupFilter/StyledComponents';

interface IAnalysisSettingBarProps {
    dateModuleData: IDateModuleData
    setDateModuleData: React.Dispatch<React.SetStateAction<IDateModuleData>>
}

const AnalysisTimeSettingBarSelector = (props: IAnalysisSettingBarProps) => {
    const { dateModuleData, setDateModuleData } = props
    const [startDateValue, setStartDateValue] = useState<Dayjs | null>(null);
    const [endDateValue, setEndDateValue] = useState<Dayjs | null>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(3); // 選擇哪時間選項

    const handleChange = (item: IDateModule) => {
        console.log(item)
        const newValue = item.value.toString()
        // 檢查是否是有效的選項，如果是就更新狀態，否則設定預設值或顯示錯誤訊息
        if (['24', '168', '720', '0', ''].includes(newValue)) {
            console.log(dayjs(+new Date()))   // 取得日期物件
            console.log(+new Date())  // 取得timestamp
            let startTimestamp = (+new Date()) - 60 * 60 * 1000 * (parseInt(newValue))
            let endTimestamp = (+new Date())
            let startDayjs = dayjs(startTimestamp)
            let endDayjs = dayjs(endTimestamp)
            setStartDateValue(startDayjs)
            setEndDateValue(endDayjs)
            setDateModuleData({ ...dateModuleData, startTime: startTimestamp, endTime: endTimestamp })

        } else {
            console.error('無效的選項：', newValue);
        }
    };
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyItems: 'center',
            justifyContent: 'space-evenly',
            width: 200
        }}>
            <div style={{ width: 200, height: 50, display: 'flex', alignItems: 'flex-end' }}>
                <FormControl fullWidth size='small' sx={{ backgroundColor: 'white' }}>
                    {/* <InputLabel id="demo-simple-select-label">自訂</InputLabel> */}
                    <Select
                        multiple
                        value={[""]}
                        renderValue={() => <em>設定時間</em>}
                    >
                        <div style={{ display: "flex", gridTemplateColumns: "1fr 5fr" }}>
                            <div style={{ width: 150 }}>
                                {dateModuleData.dateModuleData.map((item: IDateModule, i) => {
                                    return <ListItemButton
                                        defaultValue=""
                                        style={{ paddingRight: '5px', marginRight: '0px' }}
                                        selected={selectedIndex === i}
                                        key={i}
                                        onClick={() => { setSelectedIndex(i); handleChange(item) }}
                                    >{item.name}</ListItemButton>
                                })}
                            </div>

                            <div style={{ width: 400,marginLeft:5 }}>
                                <div style={{ display: "flex", alignItems: "center" ,marginTop:10,marginBottom:5}}>
                                    {dateModuleData.dateModuleData[selectedIndex].name}
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ display: "flex", alignItems: "center", marginRight: 20 }}>開始時間</div>
                                        <DemoContainer sx={{ paddingTop: '0px', height: 50, justifyContent: 'flex-end' }} components={['DateTimePicker', 'DateTimePicker']}>
                                            <DateTimePicker
                                                slotProps={{ textField: { size: 'small', sx: { backgroundColor: 'white' } } }}
                                                label="開始時間"
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                    seconds: null,
                                                }}
                                                value={startDateValue}
                                                onChange={(e) => { console.log(typeof (dayjs(e).valueOf())); setStartDateValue(e); setSelectedIndex(3); setDateModuleData({ ...dateModuleData, startTime: dayjs(e).valueOf() }) }}
                                            />
                                        </DemoContainer>
                                    </div>

                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ display: "flex", alignItems: "center", marginRight: 20 }}>結束時間</div>
                                        <DemoContainer sx={{ paddingTop: '0px', height: 50, justifyContent: 'flex-end' }} components={['DateTimePicker', 'DateTimePicker']}>
                                            <DateTimePicker
                                                slotProps={{ textField: { size: 'small', sx: { backgroundColor: 'white' } } }}
                                                label="結束時間"
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                    seconds: null,
                                                }}
                                                value={endDateValue}
                                                onChange={(e) => { console.log(e); setEndDateValue(e); setSelectedIndex(3); setDateModuleData({ ...dateModuleData, endTime: dayjs(e).valueOf() }) }}
                                            />
                                        </DemoContainer>
                                    </div>
                                </LocalizationProvider>
                            </div>
                        </div>
                    </Select>
                </FormControl>
            </div>
        </div>

    )
}

export default AnalysisTimeSettingBarSelector


