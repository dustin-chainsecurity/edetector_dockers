/** @format */

import { Box, Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { DetectContext } from "../../../../../AppContext/DetectProvider";
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../../../../utiles/ProtectedRoutes";
import { API, urlRoot } from "../../../../../constant";
import { titleMatchedhName } from "../../HorizontalBar";
import ActionButtonLoading from "../../../../CommonConponents/PartialLoading/ActionButtonLoading";
import { IFormatedDevice, TactionType } from "../../../../../constant/interfaceBoard";
import { updateGridInitial } from "../../../../../constant/functionToolbox";
import { useAlert } from "../../../../../hooks/useAlert";

interface PActionButton {
	name?: string;
	isColor?: boolean;
	setData: React.Dispatch<React.SetStateAction<IFormatedDevice[]>>;
}

// The action button is used to send mission to the device,
// and the theme will be shared with normal mission and stop permission.
// the action Type = "記憶體" | "痕跡取證" | "檔案總表" | "關鍵映像檔" | "任務執行"

const ActionButton = (props: PActionButton) => {
	const alert = useAlert().showAlert;
	const { name, isColor, setData } = props;
	const { selectedId, settingBarShowOptions, setDialogOpen } =
		useContext(DetectContext);

	const actionRequest = useMutation({
		mutationKey: ["missionRequest"],
		mutationFn: () => {
			return axiosClient.post(`${urlRoot}${API.SendMission}`, {
				action: titleMatchedhName(settingBarShowOptions).axiosTitle,
				deviceId: selectedId,
			});
		},
		onSuccess: (res) => {
			if (res.data.isSuccess) {
				console.log("onSuccess", res.data);
				setData((prev) =>
					prev.map((obj) =>
						updateGridInitial(obj, selectedId, conditionalMission(settingBarShowOptions))
					)
				);
			} else {
				alert(res.data.message);
			}
		},
	});

	const handleFetchMission = () => {
		actionRequest.mutate();
	};

	// if the action is stop, then the page will alert the user .
	useEffect(() => {
		const handleCloseDialog = () => {
			const timer = setTimeout(() => {
				if (actionRequest.isSuccess) {
					setDialogOpen(false);
				} else if (actionRequest.isError) {
					alert("發生錯誤");
				}
			}, 2000);
			return () => clearTimeout(timer);
		};
		handleCloseDialog();
	}, [actionRequest]);

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ m: 1, position: "relative" }}>
				<Button
					color={isColor ? "error" : "primary"}
					variant="contained"
					disabled={
						selectedId.length === 0 || actionRequest.isLoading
					}
					onClick={() => {
						handleFetchMission();
					}}
				>
					{name
						? name
						: titleMatchedhName(settingBarShowOptions).buttonTitle}
				</Button>
				<ActionButtonLoading loading={actionRequest.isLoading} />
			</Box>
		</Box>
	);
};

export default ActionButton;


// const conditionalMission = (settingBarShowOptions: string):Partial<IFormatedDevice> => {
// 	if(settingBarShowOptions === "記憶體"){
// 		return {scanFinishTime: 0}
// 	}
// 	else if(settingBarShowOptions === "痕跡取證"){
// 		return {collectFinishTime: 0}
// 	}
// 	else if(settingBarShowOptions === "檔案總表"){
// 		return {fileFinishTime: 0}
// 	}
// 	else if(settingBarShowOptions === "關鍵映像檔"){
// 		return {imageFinishTime: 0}
// 	}
// 	else{
// 		return {
// 			scanFinishTime: 0,
// 			collectFinishTime: 0,
// 			fileFinishTime: 0,
// 			imageFinishTime: 0,
// 		}
// 	}
// }

const conditionalMission = (settingBarShowOptions: TactionType): Partial<IFormatedDevice> => {
	const optionsMap: Record<string, Partial<IFormatedDevice>> = {
	  "記憶體": { scanFinishTime: 0 },
	  "痕跡取證": { collectFinishTime: 0 },
	  "檔案總表": { fileFinishTime: 0 },
	  "關鍵映像檔": { imageFinishTime: 0 },
	  "任務執行": {
		scanFinishTime: "終止任務中",
		collectFinishTime: "終止任務中",
		fileFinishTime: "終止任務中",
		imageFinishTime: "終止任務中",
	  },
	};
  
	return optionsMap[settingBarShowOptions] || optionsMap["任務執行"];
  };
  
