/** @format */

import { useState } from "react";
import Child_ServerAndEmail from "./Child_ServerAndEmail";
import { SettingSystemChildren } from "../../../constant";
import HeaderNavigation from "../../../commonComponent/HeaderNavigation";
import Child_InterfaceSetting from "./Child_InterfaceSetting";
import Child_CommonFunc from "./Child_CommonFunc";
import Child_AgentSetting from "./Child_AgentSetting";
import Child_AgentRefresh from "./Child_AgentRefresh";
import Child_AgentDeliver from "./Child_AgentDeliver/Child_AgentDeliver";
import { ChildInnerWhiteContainer } from "../../../commonComponent/StyledComponents";

const Parent = () => {
	const HeaderList: SettingSystemChildren[] = [
		"主機伺服器與信箱",
		"常用功能",
		"AGENT設定",
		"AGENT更新",
		"AGENT派送",
		"介接設定",
	];
	const [header, setHeader] = useState<SettingSystemChildren>("主機伺服器與信箱");

	return (
		<ChildInnerWhiteContainer>
			<HeaderNavigation
				header={header}
				setHeader={setHeader}
				HeaderList={HeaderList}
			/>
			{header === "主機伺服器與信箱" && <Child_ServerAndEmail />}
			{header === "常用功能" && <Child_CommonFunc />}
			{header === "AGENT設定" && <Child_AgentSetting />}
			{header === "AGENT更新" && <Child_AgentRefresh />}
			{header === "AGENT派送" && <Child_AgentDeliver />}
			{header === "介接設定" && <Child_InterfaceSetting />}
			
		</ChildInnerWhiteContainer>
	);
};

export default Parent;
