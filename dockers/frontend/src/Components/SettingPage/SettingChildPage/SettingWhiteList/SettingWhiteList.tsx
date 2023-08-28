import React from 'react'
import { ChildContainer } from '../../commonComponent/StyledComponents'
import ChildContainerTitle from '../../commonComponent/ChildContainerTitle'
import Parent from './Child/Parent'

const SettingWhiteList = () => {
  return (
    <ChildContainer>
      <ChildContainerTitle title='黑白名單' />
      <Parent/>
    </ChildContainer>
  )
}

export default SettingWhiteList