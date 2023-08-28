/** @format */

import { FieldValues, useForm } from "react-hook-form";
import {
	CommonHoriLine,
	CommonTitle,
} from "../../../../CommonConponents/CommonStyledComponent";
import {
	HookFormSubmit,
	HookFormSubmitContainer,
} from "../../../../CommonConponents/FormInput/StyledComponent";
import CheckInputByHooks from "../../../../CommonConponents/FormInput/CheckInputByHooks";
import { MenuItem } from "@mui/material";
import SelectInputByHooks from "../../../../CommonConponents/FormInput/SelectInputByHooks";
import FormInputByHooks from "../../../../CommonConponents/FormInput/FormInputByHooks";

import { API, urlRoot } from "../../../../../constant";
import { usePost } from "../../../../../hooks/usePost";
import { useGet } from "../../../../../hooks/useGet";
import { useContext, useEffect, useState } from "react";
import FullLoading from "../../../../CommonConponents/FullLoading/FullLoading";
import { SettingContext } from "../../../../../AppContext/SettingProvider";

export interface InterfaceSettingType {
	cefLog: boolean;
	riskLevel: string;
	ip: string;
	port: number;
	signatureID: string;
}

const defaultValues: InterfaceSettingType = {
	cefLog: false,
	riskLevel: "level4",
	ip: "",
	port: 0,
	signatureID: "",
}

// 轉換型別規則
const handleType = (data: InterfaceSettingType) => {
	return {
		...data,
		port: Number(data.port),
	};
};

const Child_InterfaceSetting = () => {
	const { setIsGlobalDirty } = useContext(SettingContext);
	const [pageData, setPageData] = useState<InterfaceSettingType>(defaultValues);

	const {
		control,
		handleSubmit,
		watch,
		reset,
		formState: { isSubmitting, isDirty, isValid },
	} = useForm<InterfaceSettingType>({ defaultValues: pageData });


	const { mutate, isSuccess, isLoading:postLoading } = usePost();
	const { data: defaultData, isLoading:getLoading } = useGet({
		query: "interfaceSetting",
		root: `${urlRoot}`,
		route: `${API.interfaceSetting}`,
	});

	useEffect(() => {
		if (defaultData?.isSuccess) {
			const reTypeData = defaultData?.data as InterfaceSettingType;
			setPageData(reTypeData);
			reset(reTypeData);
		}
	}, [reset, defaultData]);

	// request server date
	const onSubmit = (result: InterfaceSettingType) => {
		console.log("onSubmit", result);
		const reTypeResult = handleType(result);
		mutate({
			root: `${urlRoot}`,
			route: `${API.interfaceSetting}`,
			body: reTypeResult,
		});
	};

	useEffect(()=>{
		if(isDirty){
			setIsGlobalDirty(true);
		}
		return ()=>{
			setIsGlobalDirty(false);
		}
	},[isDirty])	
	
	useEffect(() => {
		if (isSuccess) {
			alert("儲存成功"); //todo :自製彈窗
		}
	}, [isSuccess]);

	return (
		<div>
			<FullLoading open={postLoading || getLoading}/>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ display: "flex", flexWrap: "wrap" }}
			>
				<CommonTitle>介接設定</CommonTitle>
				<CheckInputByHooks
					control={control}
					title="CEF log"
					name="cefLog"
					watch={watch("cefLog")}
					defaultChecked={pageData.cefLog}
				/>
				<SelectInputByHooks
					control={control}
					title="風險等級大於"
					name="riskLevel"
					label="settingInterfaceRiskLevel"
					formControlWidth={150}
					// marginGap={170}
				>
					<MenuItem value="level4">風險等級四</MenuItem>
					<MenuItem value="level3">風險等級三</MenuItem>
					<MenuItem value="level2">風險等級二</MenuItem>
					<MenuItem value="level1">風險等級一</MenuItem>
				</SelectInputByHooks>

				<FormInputByHooks
					control={control}
					title="IP"
					name="ip"
					defaultType="string"
				/>
				<FormInputByHooks
					control={control}
					title="Port"
					name="port"
					defaultType="number"
				/>
				<FormInputByHooks
					control={control}
					title="Signature ID"
					name="signatureID"
					defaultType="string"
				/>

				<CommonHoriLine />
				<HookFormSubmitContainer>
					<HookFormSubmit
						type="submit"
						disabled={
							!isDirty || !isValid || isSubmitting
						}
						value={isSubmitting ? "儲存中..." : "儲存"}
					/>
				</HookFormSubmitContainer>
			</form>
		</div>
	);
};

export default Child_InterfaceSetting;
