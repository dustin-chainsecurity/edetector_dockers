/** @format */

import { useContext, useState } from "react";
import { DetectContext } from "../../../../AppContext/DetectProvider";
import { useNavigate } from "react-router-dom";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../../../utiles/ProtectedRoutes";
import { API, scheduledRoot, urlRoot } from "../../../../constant";
import { convertTimeStringsToString } from "../../../../constant/functionToolbox";
import RadioGroupEnd from "../../SettingBarItem/RadioGroupEnd";
import DropDownMenu, { NumberString0To24 } from "../../SettingBarItem/DropDownMenu";
import { Button } from "@mui/material";
import { ActionPlugContainer, ActionPlugTitle, StraightSeparator } from "../../commonComponent/StyledComponents";
import ActionButton from "./CommonComponents/ActionButton";



const ActionPlug = () => {

    const navigate = useNavigate();

	const {
		scheduleScan,
		setScheduleScan,
		scanModule,
		setScanModule,
		selectedId
	} = useContext(DetectContext);
	

	const [selectedTimes, setSelectedTimes] = useState<NumberString0To24[]>([]);

	const scheduledScanRequest = useMutation({
		mutationKey: ["scheduledScanRequest"],
		mutationFn: () => {
			return axiosClient.post(`${scheduledRoot}${API.scheduledScan}`, {
				mode: scheduleScan,
				time: convertTimeStringsToString(selectedTimes),
				deviceId: selectedId,
			});
		},
		onSuccess: (res) => {
			console.log("onSuccess", res.data);
			if (!res.data.isSuccess) {
				alert(res.data.message);
			}
		},
	});

	const detectionModeRequest = useMutation({
		mutationKey: ["detectionModeRequest"],
		mutationFn: () => {
			return axiosClient.post(`${urlRoot}${API.detectionMode}`, {
				mode: scanModule,
				deviceId: selectedId,
			});
		},
		onSuccess: (res) => {
			console.log("onSuccess", res.data);
			if (!res.data.isSuccess) {
				alert(res.data.message);
			}
		},
	});

	if (scheduledScanRequest.error) {
		navigate("/error");
	}
	if (detectionModeRequest.error) {
		navigate("/error");
	}

	return (
		<ActionPlugContainer>
			<ActionPlugTitle>定時掃描</ActionPlugTitle>
			<RadioGroupEnd setTrueOrFalse={setScheduleScan} />
			<DropDownMenu paramas={selectedTimes} onParamChange={setSelectedTimes} />
			<Button
				disabled={
					(selectedTimes.length === 0 && scheduleScan) ||
					selectedId.length === 0
				}
				variant="contained"
				style={{ marginLeft: 10, marginRight: 10 }}
				onClick={() => {
					if (
						selectedTimes.length === 0 &&
						scheduleScan &&
						selectedId.length === 0
					) {
						alert("請選擇時間");
					}
					scheduledScanRequest.mutate();
				}}
			>
				{/* todo : add Loding */}
				{scheduledScanRequest.isLoading ? "套用" : "套用"}
			</Button>
			<StraightSeparator />
			<ActionPlugTitle>偵測模式</ActionPlugTitle>
			<RadioGroupEnd setTrueOrFalse={setScanModule}></RadioGroupEnd>
			<Button
				variant="contained"
				disabled={selectedId.length === 0}
				style={{ marginLeft: 20, marginRight: 20 }}
				onClick={() => {
					detectionModeRequest.mutate();
				}}
			>
				{detectionModeRequest.isLoading ? "Loading..." : "套用"}
			</Button>

			<StraightSeparator />
			<ActionPlugTitle>記憶體</ActionPlugTitle>
			<ActionButton/>
		</ActionPlugContainer>
	);
};

export default ActionPlug;
