import React from 'react'
import { ChildContainer } from '../../commonComponent/StyledComponents'
import ChildContainerTitle from '../../commonComponent/ChildContainerTitle'
import Parent from './Child/Parent'

const SettingGroup = () => {
  return (
    <ChildContainer>
      <ChildContainerTitle title="主機群組" />
      <Parent/>
    </ChildContainer>
  )
}

export default SettingGroup