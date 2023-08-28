import React from 'react'
import { ChildContainer } from '../../commonComponent/StyledComponents'
import Parent from './Child/Parent'
import ChildContainerTitle from '../../commonComponent/ChildContainerTitle'

const SettingDailyLog = () => {
  return (
    <ChildContainer>
      <ChildContainerTitle title="系統日誌" />
      <Parent/>
    </ChildContainer>
  )
}

export default SettingDailyLog