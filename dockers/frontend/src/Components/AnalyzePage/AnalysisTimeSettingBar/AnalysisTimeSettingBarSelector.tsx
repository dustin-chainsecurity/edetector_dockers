import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import { DemoContainer } from '@mui/x-date-pickers/internals/DemoContainer';
// import  renderTimeViewClock  from '@mui/x-date-pickers/renderTimeViewClock';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import {  IDateModule, IDateModuleData } from '../../../constant/interfaceBoard';
interface IAnalysisSettingBarProps{
    dateModuleData: IDateModuleData
    setDateModuleData: React.Dispatch<React.SetStateAction<IDateModuleData>>
}

const AnalysisTimeSettingBarSelector = (props:IAnalysisSettingBarProps) => {
    let time = dayjs
    const { dateModuleData, setDateModuleData } = props
    const [startDateValue, setStartDateValue] = React.useState<Dayjs | null>(null);
    const [endDateValue, setEndDateValue] = React.useState<Dayjs | null>(null);

    const [age, setAge] = React.useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value as string);
    // };

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value.toString()
        // 檢查是否是有效的選項，如果是就更新狀態，否則設定預設值或顯示錯誤訊息
        if (['24', '168', '720', '0', ''].includes(newValue)) {
            setAge(newValue);
            console.log(dayjs(+new Date()))   // 取得日期物件
            console.log(+new Date())  // 取得timestamp
            let startTimestamp = (+new Date()) -  60 * 60 * 1000 * (parseInt(newValue))
            let endTimestamp =(+new Date())
            let startDayjs = dayjs(startTimestamp)
            let endDayjs = dayjs(endTimestamp)
            setStartDateValue(startDayjs)
            setEndDateValue(endDayjs)
            setDateModuleData({...dateModuleData, startTime: startTimestamp, endTime: endTimestamp})

        } else {
          // 選項無效，可以設定一個預設值或顯示錯誤訊息
          setAge(''); // 或設定一個其他預設值
          console.error('無效的選項：', newValue);
        }
      };
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto' }}>
            <div style={{display:'flex',alignItems:'end'}}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            {dateModuleData.dateModuleData.map((item: IDateModule,i) => {
                                return <MenuItem value={item.value}>{item.name}</MenuItem>
                            })}
                            {/* <MenuItem value={10}>最近24小時</MenuItem>
                            <MenuItem value={20}>最近一週</MenuItem>
                            <MenuItem value={30}>最近一個月</MenuItem> */}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div style={{ marginLeft: '10px'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                        <DateTimePicker
                            label="開始時間"
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: null,
                            }}
                            value = {startDateValue}
                            onChange={(e) =>{ console.log(typeof(dayjs(e).valueOf()));setStartDateValue(e);setAge("0"); setDateModuleData({...dateModuleData, startTime: dayjs(e).valueOf()})}}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>

            <div style={{ marginLeft: '10px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                        <DateTimePicker
                            label="結束時間"
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: null,
                            }}
                            value={endDateValue}
                            onChange={(e) =>{ console.log(e);setEndDateValue(e);setAge("0"); setDateModuleData({...dateModuleData, endTime: dayjs(e).valueOf()})}}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>

        </div>

    )
}

export default AnalysisTimeSettingBarSelector


