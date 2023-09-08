import React from 'react'
import { ChildInnerWhiteContainer } from '../../../commonComponent/StyledComponents'
import MainComponent from './MainComponent'

const Parent = () => {
  return (
    <ChildInnerWhiteContainer>
      <MainComponent />
    </ChildInnerWhiteContainer>
  )
}

export default Parent