import React from 'react'
import { ChildContainer } from '../../commonComponent/StyledComponents'
import Parent from './Child/Parent'
import ChildContainerTitle from '../../commonComponent/ChildContainerTitle'

const SettingVersion = () => {
  return (
    <ChildContainer>
      <ChildContainerTitle title="版本與授權" />
      <Parent/>
    </ChildContainer>
  )
}

export default SettingVersion