import ChildContainerTitle from "../../commonComponent/ChildContainerTitle"
import { ChildContainer } from "../../commonComponent/StyledComponents"
import Parent from "./Child/Parent"



const SettingSystem = () => {
  return (
    <ChildContainer>
      <ChildContainerTitle title='系統'/>
      <Parent/>
    </ChildContainer>
  )
}

export default SettingSystem

// 主機伺服器與信箱 常用功能 AGENT設定 AGENT更新 AGENT派送 介接設定



