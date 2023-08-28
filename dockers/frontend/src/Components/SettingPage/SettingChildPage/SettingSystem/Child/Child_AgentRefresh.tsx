/** @format */

import { useFieldArray, useForm } from "react-hook-form";
import {
	HookFormSubmit,
	HookFormSubmitContainer,
} from "../../../../CommonConponents/FormInput/StyledComponent";
import FormInputByHooks from "../../../../CommonConponents/FormInput/FormInputByHooks";
import {
	CommonHoriLine,
	CommonSpaceGap,
	CommonTitle,
} from "../../../../CommonConponents/CommonStyledComponent";
import CheckInputByHooks from "../../../../CommonConponents/FormInput/CheckInputByHooks";
import SelectInputByHooks from "../../../../CommonConponents/FormInput/SelectInputByHooks";
import { MenuItem } from "@mui/material";
import FormTable from "../../../../CommonConponents/FormInput/FormTable/FormTable";
import { useEffect } from "react";

  

const Child_AgentRefresh = () => {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isDirty, isValid },
	} = useForm({ mode: "onChange" });


	const onSubmit = (data: any) => {
		alert(JSON.stringify(data));
	};


	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ display: "flex", flexWrap: "wrap" }}
			>
				<CommonTitle>Agent更新</CommonTitle>
				<FormInputByHooks
					control={control}
					title="選擇程式"
					name="selectProgram"
				/>
				{/* 少兩個欄位 */}
				<SelectInputByHooks
					control={control}
					title="更新Client"
					name="refreshClient"
					label="refreshClient"
					formControlWidth={130}
					fullWidthPX={40}
					returnToZero={true}
				>
					<MenuItem value="customedDevices">自訂電腦</MenuItem>
					<MenuItem value="allDevices">所有電腦</MenuItem>
				</SelectInputByHooks>

				<FormTable/>

				<CommonHoriLine />
				<HookFormSubmitContainer>
					<HookFormSubmit
						type="submit"
						disabled={!isDirty || !isValid}
					/>
				</HookFormSubmitContainer>
			</form>
		</div>
	);
};

export default Child_AgentRefresh;
