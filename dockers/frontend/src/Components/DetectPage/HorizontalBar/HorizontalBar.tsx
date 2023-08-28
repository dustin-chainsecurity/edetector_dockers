/** @format */

import { useContext, useState } from "react";

import { ReactComponent as StopIcon } from "./assests/stopIcon.svg";
import { ReactComponent as IsoIcon } from "./assests/isoIcon.svg";
import { ReactComponent as FileIcon } from "./assests/fileIcon.svg";
import { ReactComponent as EyeIcon } from "./assests/eyeIcon.svg";
import { ReactComponent as MemoryIcon } from "./assests/memoryIcon.svg";

import { TactionType } from "../../../constant/interfaceBoard";
import { DetectContext } from "../../../AppContext/DetectProvider";
import { HorizontalBarContainer } from "../commonComponent/StyledComponents";

import ActionPlug from "./ActionPlug/ActionPlug";
import IconSelector from "./IconSelector";
import ActionPlugCollect from "./ActionPlug/ActionPlugCollect";
import ActionPlugFile from "./ActionPlug/ActionPlugFile";
import ActionISO from "./ActionPlug/ActionISO";
import MissionAlert from "./MissionAlert";

const HorizontalBar = () => {
	const { settingBarShowOptions, dialogOpen } = useContext(DetectContext);


	return (
		<HorizontalBarContainer>
			<div style={{ display: "flex", minWidth: 200 }}>
				<IconSelector Icon={MemoryIcon} title="記憶體" />
				<IconSelector Icon={EyeIcon} title="痕跡取證" />
				<IconSelector Icon={FileIcon} title="檔案總表" />
				<IconSelector Icon={IsoIcon} title="關鍵映像檔" />
				<IconSelector Icon={StopIcon} title="任務執行" />
			</div>
			{dialogOpen && <MissionAlert/>}

			{settingBarShowOptions === "記憶體" && (<ActionPlug/>)}
			{settingBarShowOptions === "痕跡取證" && ( <ActionPlugCollect/>)}
			{settingBarShowOptions === "檔案總表" && (<ActionPlugFile/>)}
			{settingBarShowOptions === "關鍵映像檔" && (<ActionISO/>)}

		</HorizontalBarContainer>
	);
};

export default HorizontalBar;

export const titleMatchedhName = (title: TactionType) => {
	switch (title) {
		case "記憶體":
			return { buttonTitle: "立即掃描", axiosTitle: "StartScan" };
		case "痕跡取證":
			return { buttonTitle: "立即取證", axiosTitle: "StartCollect" };
		case "檔案總表":
			return { buttonTitle: "立即下載", axiosTitle: "StartGetDrive" };
		case "關鍵映像檔":
			return { buttonTitle: "立即製作", axiosTitle: "StartGetImage" };
		case "任務執行":
			return { buttonTitle: "終止任務", axiosTitle: "Terminate" };
		default:
			return { buttonTitle: "錯誤", axiosTitle: "error" };
	}
};
