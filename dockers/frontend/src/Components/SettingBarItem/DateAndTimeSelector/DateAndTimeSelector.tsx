import DateSelector from '../DateSelector/DateSelector'
import './DateAndTimeSelector.css'
import TimeSelector from '../TimeSelector/TimeSelector'
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import { Dispatch, useState } from 'react';
import { ITimeForm } from '../../../constant/interfaceBoard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
interface ChildProps {
  setScheduleTime: Dispatch<React.SetStateAction<ITimeForm>>
  scheduleTime: ITimeForm
}

type IselectedModule = 'date' | 'time';

const DateAndTimeSelector: React.FC<ChildProps> = ({ setScheduleTime, scheduleTime }) => {

  const [selectedModule, setSelectedModule] = useState<IselectedModule>('date')
  const [showOptions, setShowOptions] = useState(false);


  // focus 時跳出日期、時間選擇器
  const handleFocus = () => {
    setShowOptions(true);
  };
  // 隱藏日期、時間選擇器
  const handleBlur = () => {
    setShowOptions(false);
  };

  // 控制日期選擇器上點擊日期時
  const handleSelectDate = (param: number) => {
    setScheduleTime({ ...scheduleTime, date: param })
  }


  // 控制日期選擇器上點擊時間時要執行的事件
  const handleSelectedTime = (param: number) => {
    setScheduleTime({ ...scheduleTime, time: param })
  }

  return (
    <div style={{ width: "320px", height: "72px" }}>
      <div >
        <div style={{ display: "flex" }}>
          <TextField
            style={{ margin: "10px" }}
            id="outlined-textarea"
            label="每月日期"
            multiline
            value={scheduleTime.date}
            onFocus={() => {
              handleFocus();
              setSelectedModule('date')
            }}
          />
          <TextField
            style={{ margin: "10px" }}
            id="outlined-textarea"
            label="每日時間"
            multiline
            onFocus={() => {
              handleFocus();
              setSelectedModule('time')
            }}
            value={`${scheduleTime.time}:00`}
          />
        </div>
        <div style={{ zIndex: "100", position: 'relative', backgroundColor: "white", boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)" }}>
          {showOptions &&
            <div style={{ zIndex: "100" }}>
              <div>
                <div className='XBar'>
                  <div onClick={handleBlur} style={{ cursor: "pointer" }}>
                    <CloseIcon fontSize='small' />
                  </div>
                </div>
                {selectedModule === 'date' && <DateSelector dateProps={scheduleTime.date} onDateSelectFunc={handleSelectDate} />}
                {selectedModule === 'time' && <TimeSelector fontSize={20} clockSize={220} childProps={scheduleTime.time} onParamChange={handleSelectedTime}></TimeSelector>}
              </div>
              <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ backgroundColor: "white" }} className='moduleButton' onClick={() => setSelectedModule('date')}>
                  <DateRangeIcon fontSize='small' color={selectedModule === 'date' ? 'primary' : 'action'} />
                </div>
                <div className='moduleButton' onClick={() => setSelectedModule('time')}>
                  <AccessTimeIcon fontSize='small' color={selectedModule === 'time' ? 'primary' : 'action'} />
                </div>
              </div>
            </div>
          }
        </div>
      </div>

    </div>
  );
}



export default DateAndTimeSelector