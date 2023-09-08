import React from 'react'
import { ChildContainer } from '../../commonComponent/StyledComponents'
import ChildContainerTitle from '../../commonComponent/ChildContainerTitle'
import Parent from './Child/Parent'

// ! 這邊的功能後端未定，先省略

const SettingWhiteList = () => {
  return (
    <ChildContainer>
      <ChildContainerTitle title='黑白名單' />
      <Parent/>
    </ChildContainer>
  )
}

export default SettingWhiteList