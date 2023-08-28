/** @format */

import { Box, Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { DetectContext } from "../../../../../AppContext/DetectProvider";
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../../../../utiles/ProtectedRoutes";
import { API, urlRoot } from "../../../../../constant";
import { titleMatchedhName } from "../../HorizontalBar";
import ActionButtonLoading from "../../../../CommonConponents/PartialLoading/ActionButtonLoading";
import { useNavigate } from "react-router-dom";

interface PActionButton {
	name? : string ;
	isColor? : boolean ;
}

// The action button is used to send mission to the device, 
// and the theme will be shared with normal mission and stop permission.

const ActionButton = (props:PActionButton) => {
	const { name, isColor } = props;
	const { selectedId, settingBarShowOptions, setDialogOpen } = useContext(DetectContext);
	const navigate = useNavigate();
	

	const actionRequest = useMutation({
		mutationKey: ["missionRequest"],
		mutationFn: () => {
			return axiosClient.post(`${urlRoot}${API.SendMission}`, {
				action: titleMatchedhName(settingBarShowOptions).axiosTitle,
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

	const handleFetchMission = () => {
		actionRequest.mutate();
	};


	// if the action is stop, then the page will alert the user .
	useEffect(()=>{
		const handleCloseDialog =()=>{
			const timer = setTimeout(() => {
				if(actionRequest.isSuccess){
					setDialogOpen(false)
				}
				else if(actionRequest.isError){
					alert("發生錯誤")
				}
			}, 2000);
			return () => clearTimeout(timer);
		}
		handleCloseDialog()
	},[actionRequest])




	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ m: 1, position: "relative" }}>
				<Button
					color={isColor ? "error" : "primary"}
					variant= 'contained'
					disabled={
						selectedId.length === 0 || actionRequest.isLoading
					}
					onClick={() => {
						handleFetchMission();
					}}
				>
					{name ? name : titleMatchedhName(settingBarShowOptions).buttonTitle}
				</Button>
				<ActionButtonLoading loading={actionRequest.isLoading}/>
			</Box>
		</Box>
	);
};

export default ActionButton;
