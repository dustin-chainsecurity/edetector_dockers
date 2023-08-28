import React, { useContext } from 'react'
import { ActionPlugContainer, ActionPlugTitle, StraightSeparator } from '../../commonComponent/StyledComponents'
import RadioGroupEnd from '../../SettingBarItem/RadioGroupEnd'
import { DetectContext } from '../../../../AppContext/DetectProvider';
import DateAndTimeSelector from '../../SettingBarItem/DateAndTimeSelector/DateAndTimeSelector';
import ActionButton from './CommonComponents/ActionButton';
import TimeMissionButton from './CommonComponents/TimeMissionButton';

const ActionPlugCollect = () => {
    const { setScheduleForensics, setScheduleForensicsTime, scheduleForensicsTime } = useContext(DetectContext);

  return (
    <ActionPlugContainer>
        <ActionPlugTitle>定時取證</ActionPlugTitle>
        <RadioGroupEnd setTrueOrFalse={setScheduleForensics} />
        <DateAndTimeSelector setScheduleTime={setScheduleForensicsTime} scheduleTime={scheduleForensicsTime} />
        <TimeMissionButton/>
        <StraightSeparator/>
        <ActionPlugTitle>痕跡取證</ActionPlugTitle>
        <ActionButton/>
    </ActionPlugContainer>
  )
}

export default ActionPlugCollect