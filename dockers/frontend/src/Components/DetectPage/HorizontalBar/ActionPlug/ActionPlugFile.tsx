import React, { useContext } from 'react'
import { ActionPlugContainer, ActionPlugTitle, StraightSeparator } from '../../commonComponent/StyledComponents'
import RadioGroupEnd from '../../SettingBarItem/RadioGroupEnd'
import { DetectContext } from '../../../../AppContext/DetectProvider';
import DateAndTimeSelector from '../../SettingBarItem/DateAndTimeSelector/DateAndTimeSelector';
import ActionButton from './CommonComponents/ActionButton';
import TimeMissionButton from './CommonComponents/TimeMissionButton';
import { IFormatedDevice } from '../../../../constant/interfaceBoard';

interface ActionPlugFileProps {
  setData: React.Dispatch<React.SetStateAction<IFormatedDevice[]>>;
}

const ActionPlugFile = (props:ActionPlugFileProps) => {
    const { setData } = props;
    const { setScheduleDownload, setScheduleDownloadTime, scheduleDownloadTime } = useContext(DetectContext);

  return (
    <ActionPlugContainer>
        <ActionPlugTitle>定時下載</ActionPlugTitle>
        <RadioGroupEnd setTrueOrFalse={setScheduleDownload} />
        <DateAndTimeSelector setScheduleTime={setScheduleDownloadTime} scheduleTime={scheduleDownloadTime} />
        <TimeMissionButton/>
        <StraightSeparator/>
        <ActionPlugTitle>檔案總表</ActionPlugTitle>
        <ActionButton setData={setData}/>
    </ActionPlugContainer>
  )
}

export default ActionPlugFile