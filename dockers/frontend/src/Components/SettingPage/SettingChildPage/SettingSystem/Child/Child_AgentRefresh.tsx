/** @format */

import { useForm } from "react-hook-form";
import {
	HookFormSubmit,
	HookFormSubmitContainer,
} from "../../../../CommonConponents/FormInput/StyledComponent";
import FormInputByHooks from "../../../../CommonConponents/FormInput/FormInputByHooks";
import {
	CommonHoriLine,
	CommonTitle,
} from "../../../../CommonConponents/CommonStyledComponent";
import SelectInputByHooks from "../../../../CommonConponents/FormInput/SelectInputByHooks";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { useAlert } from "../../../../../hooks/useAlert";
import MainTableBox from '../../../commonComponent/AgentTable/MainTableBox'




const Child_AgentRefresh = () => {
	const alert = useAlert().showAlert;
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isDirty, isValid },
	} = useForm({ mode: "onChange" });


	const onSubmit = (data: any) => {
		alert(JSON.stringify(data));
	};

	const [selectedId, setSelectedId] = useState<string[]>([]);
	const [selectedGroupList, setSelectedGroupList] = useState<number[]>([]);
	const [renewTable, setRenewTable] = useState<boolean>(false);

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

				{/* <FormTable tableData={[]}/>  */}
				{/* todo:fix */}
				<MainTableBox
					showGroup={false}
					// buttonComponent={buttonComponent}
					selectedId={selectedId}
					setSelectedId={setSelectedId}
					renewTable={renewTable}
					setRenewTable={setRenewTable}
					selectedGroupList={selectedGroupList}
					setSelectedGroupList={setSelectedGroupList}

				/>

				<CommonHoriLine />
				<HookFormSubmitContainer>
					<HookFormSubmit
						type="submit"
						disabled={!isDirty || !isValid || selectedId.length === 0 || isSubmitting}
					/>
				</HookFormSubmitContainer>
			</form>
		</div>
	);
};

export default Child_AgentRefresh;
