/** @format */

import { useLocation } from "react-router-dom";
import {
	NavBarContainer,
	NavLink,
	NavOutterLink,
} from "./commonComponent/StyledComponents";
import { TSettingPageName } from "../../Page/SettingPage";
import LogOutButton from "./commonComponent/LogOutButton";


interface routerObj {
	name: TSettingPageName;
	path: string;
}

const SettingSideBar = () => {
	const { pathname } = useLocation();

	const routerList:routerObj[] = [
		{
			name: "系統",
			path: "/setting/SettingSystem",
		},
		{
			name: "主機群組",
			path: "/setting/SettingGroup",
		},
		{
			name: "關鍵邏輯映像檔",
			path: "/setting/SettingImage",
		},
		{
			name: "安裝/重啟/移除伺服器",
			path: "/setting/SettingServer",
		},
		{
			name: "Agent 移除操作",
			path: "/setting/SettingAgentRemove",
		},
		{
			name: "使用者權限",
			path: "/setting/SettingUserPermission",
		},
		{
			name: "黑白名單",
			path: "/setting/SettingWhiteList",
		},
		{
			name: "版本與授權",
			path: "/setting/SettingVersion",
		},
		{
			name: "系統日誌",
			path: "/setting/SettingDailyLog",
		},
	];

	return (
		<NavBarContainer>
			{/* navigation Side Bar */}
			{routerList.map((item: routerObj, index: number) => {
				return (
					<NavOutterLink
						key={`${index}${item.name}`}
						style={{
							backgroundColor:
								pathname === item.path ? "#2196F30A" : "white"
						}}
					>
						<NavLink to={item.path}>{item.name}</NavLink>
					</NavOutterLink>
				);
			})}
			<LogOutButton/>
		</NavBarContainer>
	);
};

export default SettingSideBar;
