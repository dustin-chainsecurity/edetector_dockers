import React from 'react'
import { TSettingPageName } from '../../../Page/SettingPage';

interface IChildContainerTitleProps {
    title: TSettingPageName
}

const ChildContainerTitle = (props:IChildContainerTitleProps) => {
    const { title } = props ;

    return (
    <p style={{ width:"100%", margin:'20px 15px' }}>
        {title}
    </p>
  )
}

export default ChildContainerTitle