import React from 'react'
import { ChildContainer } from '../../commonComponent/StyledComponents'
import Parent from './Child/Parent'
import ChildContainerTitle from '../../commonComponent/ChildContainerTitle'

const SettingServer = () => {
  return (
    <ChildContainer>
      <ChildContainerTitle title="安裝/重啟/移除伺服器" />
      <Parent/>
    </ChildContainer>
  )
}

export default SettingServer