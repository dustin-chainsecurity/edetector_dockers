import React from 'react'
import { ChildContainer } from '../../commonComponent/StyledComponents'
import Parent from './Child/Parent'
import ChildContainerTitle from '../../commonComponent/ChildContainerTitle'

const SettingAgentRemove = () => {
  return (
    <ChildContainer>
      <ChildContainerTitle title="Agent 移除操作" />
      <Parent/>
    </ChildContainer>
  )
}

export default SettingAgentRemove