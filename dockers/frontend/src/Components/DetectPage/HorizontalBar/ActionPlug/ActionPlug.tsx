/** @format */

import { useContext, useState } from "react";
import { DetectContext } from "../../../../AppContext/DetectProvider";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../../../utiles/ProtectedRoutes";
import { API, scheduledRoot, urlRoot } from "../../../../constant";
import {
	convertTimeStringsToString,
	updateGridInitial,
} from "../../../../constant/functionToolbox";
import RadioGroupEnd from "../../SettingBarItem/RadioGroupEnd";
import DropDownMenu, {
	NumberString0To24,
} from "../../SettingBarItem/DropDownMenu";
import { Button } from "@mui/material";
import {
	ActionPlugContainer,
	ActionPlugTitle,
	StraightSeparator,
} from "../../commonComponent/StyledComponents";
import ActionButton from "./CommonComponents/ActionButton";
import { IFormatedDevice } from "../../../../constant/interfaceBoard";
import { useAlert } from "../../../../hooks/useAlert";
import FullLoading from "../../../CommonConponents/FullLoading/FullLoading";

interface ActionPlugProps {
	setData: React.Dispatch<React.SetStateAction<IFormatedDevice[]>>;
}

const ActionPlug = (props: ActionPlugProps) => {
	const { setData } = props;
	const navigate = useNavigate();
	const alert = useAlert().showAlert;

	const {
		scheduleScan,
		setScheduleScan,
		scanModule,
		setScanModule,
		selectedId,
	} = useContext(DetectContext);

	const [selectedTimes, setSelectedTimes] = useState<NumberString0To24[]>([]);

	// command to schedule scan
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
			console.log("onSuccess", "detectionMode", res.data);
			if (res.data.isSuccess) {
				console.log("onSuccess", res.data);
			} else {
				const message = res.data.message as string;
				alert(message);
			}
		},
	});

	// command to change detection mode
	const detectionModeRequest = useMutation({
		mutationKey: ["detectionModeRequest"],
		mutationFn: () => {
			return axiosClient.post(`${urlRoot}${API.detectionMode}`, {
				mode: scanModule,
				deviceId: selectedId,
			});
		},
		onSuccess: (res) => {
			console.log("onSuccess", "detectionMode", res.data);
			if (res.data.isSuccess) {
				console.log("onSuccess", res.data)
				setData((prev) =>
					prev.map((obj) =>
						updateGridInitial(obj, selectedId, {
							detectionMode: scanModule ? "true" : "false",
						})
					)
				);
			} else {
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
			<FullLoading open={scheduledScanRequest.isLoading || detectionModeRequest.isLoading} />
			<ActionPlugTitle>定時掃描</ActionPlugTitle>
			<RadioGroupEnd setTrueOrFalse={setScheduleScan} />
			<DropDownMenu
				paramas={selectedTimes}
				onParamChange={setSelectedTimes}
			/>
			<Button
				disabled={
					(selectedTimes.length === 0 && scheduleScan) ||
					selectedId.length === 0
				}
				variant="contained"
				style={{ marginLeft: 10, marginRight: 10 }}
				onClick={() => { scheduledScanRequest.mutate() }}
			>
				套用
			</Button>
			<StraightSeparator />
			<ActionPlugTitle>偵測模式</ActionPlugTitle>
			<RadioGroupEnd setTrueOrFalse={setScanModule}></RadioGroupEnd>
			<Button
				variant="contained"
				disabled={selectedId.length === 0}
				style={{ marginLeft: 20, marginRight: 20 }}
				onClick={() => { detectionModeRequest.mutate() }}
			>
				套用
			</Button>

			<StraightSeparator />
			<ActionPlugTitle>記憶體</ActionPlugTitle>
			<ActionButton setData={setData} />
		</ActionPlugContainer>
	);
};

export default ActionPlug;
