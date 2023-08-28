/** @format */

import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import CommonHeader from "../Components/CommonConponents/CommonHeader/CommonHeader";
import SettingSideBar from "../Components/SettingPage/SettingSideBar";
import { useEffect } from "react";
import { SettingPageContainer } from "../Components/SettingPage/commonComponent/StyledComponents";
import SettingProvider from "../AppContext/SettingProvider";

export type TSettingPageName =
	| "系統"
	| "主機群組"
	| "關鍵邏輯映像檔"
	| "安裝/重啟/移除伺服器"
	| "Agent 移除操作"
	| "使用者權限"
	| "黑白名單"
	| "版本與授權"
	| "系統日誌";

const SettingPage = () => {
	const navigate = useNavigate();

	// default page
	useEffect(() => {
		navigate("/setting/SettingSystem");
	}, []);

	return (
		<div>
			<SettingProvider>
				<CommonHeader isDarkTheme={false} />
				<SettingPageContainer>
					<p style={{ width: "100%" }}>系統狀況： 良好</p>
					<SettingSideBar />
					<Outlet />{" "}
					{/*Gate: SettingSystem.tsx, SettingGroup.tsx ... */}
				</SettingPageContainer>
			</SettingProvider>
		</div>
	);
};

export default SettingPage;
