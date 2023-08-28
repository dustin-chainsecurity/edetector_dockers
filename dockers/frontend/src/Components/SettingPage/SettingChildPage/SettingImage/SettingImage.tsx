import React from 'react'
import { ChildContainer } from '../../commonComponent/StyledComponents'
import Parent from './Child/Parent'
import ChildContainerTitle from '../../commonComponent/ChildContainerTitle'

const SettingImage = () => {
  return (
    <ChildContainer>
      <ChildContainerTitle title="關鍵邏輯映像檔" />
      <Parent/>
    </ChildContainer>
  )
}

export default SettingImage