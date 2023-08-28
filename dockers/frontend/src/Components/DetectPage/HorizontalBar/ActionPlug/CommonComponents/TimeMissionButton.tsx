/** @format */

import React, { useContext } from "react";
import { DetectContext } from "../../../../../AppContext/DetectProvider";
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../../../../utiles/ProtectedRoutes";
import { API, scheduledRoot } from "../../../../../constant";
import { Button } from "@mui/material";

const TimeMissionButton = () => {
	const {
		selectedId,
		scheduleForensicsTime,
		scheduleForensics,
		scheduleDownload,
		scheduleDownloadTime,
		settingBarShowOptions,
	} = useContext(DetectContext);

	const scheduledForensicsRequest = useMutation({
		mutationKey: ["scheduledForensicsRequest"],
		mutationFn: () => {
			return axiosClient.post(
				`${scheduledRoot}${API.scheduledForensics}`,
				{
					mode: scheduleForensics,
					date: scheduleForensicsTime.date,
					time: scheduleForensicsTime.time,
					deviceId: selectedId,
				}
			);
		},
		onSuccess: (res) => {
			console.log("onSuccess", res.data);
			if (!res.data.isSuccess) {
				alert(res.data.message);
			}
		},
	});

	const scheduledDownloadRequest = useMutation({
		mutationKey: ["scheduledDownloadRequest"],
		mutationFn: () => {
			return axiosClient.post(
				`${scheduledRoot}${API.scheduledDownload}`,
				{
					mode: scheduleDownload,
					date: scheduleDownloadTime.date,
					time: scheduleDownloadTime.time,
					deviceId: selectedId,
				}
			);
		},
		onSuccess: (res) => {
			console.log("onSuccess", res.data);
			if (!res.data.isSuccess) {
				alert(res.data.message);
			}
		},
	});

	return (
		<Button
			variant="contained"
			style={{ marginLeft: 10, marginRight: 10 }}
			disabled={selectedId.length === 0}
			onClick={() => {
				if (settingBarShowOptions === "痕跡取證") {
					scheduledForensicsRequest.mutate();
				} else if (settingBarShowOptions === "檔案總表") {
					scheduledDownloadRequest.mutate();
				}
			}}
		>
			套用
		</Button>
	);
};

export default TimeMissionButton;
