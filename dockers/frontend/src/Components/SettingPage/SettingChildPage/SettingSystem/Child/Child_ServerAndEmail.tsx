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
import CheckInputByHooks from "../../../../CommonConponents/FormInput/CheckInputByHooks";
import SelectInputByHooks from "../../../../CommonConponents/FormInput/SelectInputByHooks";
import { MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { usePost } from "../../../../../hooks/usePost";
import { useGet } from "../../../../../hooks/useGet";
import { API, urlRoot } from "../../../../../constant";
import FullLoading from "../../../../CommonConponents/FullLoading/FullLoading";
import { SettingContext } from "../../../../../AppContext/SettingProvider";
import { useAlert } from "../../../../../hooks/useAlert";

interface ServerAndEmailType {
	workerPort: number;
	detectPort: number;
	detectDefault: boolean;
	updatePort: number;
	email: string;
	password: string;
	ip: string;
	port: number;
	encryption: string;
}


const defaultValues: ServerAndEmailType = {
	workerPort: 0,
	detectPort: 0,
	detectDefault: true,
	updatePort: 0,
	email: "test@example.com",
	password: "password",
	ip: "192.168.0.0",
	port: 25,
	encryption: "TLS",
};

// 轉換型別規則
const handleType = (data: ServerAndEmailType):ServerAndEmailType => {
	return {
		...data,
		workerPort: Number(data.workerPort),
		detectPort: Number(data.detectPort),
		updatePort: Number(data.updatePort),
		port: Number(data.port)
	};
};

const Child_ServerAndEmail = () => {
	const alert = useAlert().showAlert ;
	const { setIsGlobalDirty } = useContext(SettingContext);
	const [pageData, setPageData] = useState<ServerAndEmailType>(defaultValues);

	const {
		control,
		handleSubmit,
		watch,
		reset,
		formState: { isSubmitting, isDirty, isValid },
	} = useForm<ServerAndEmailType>({ defaultValues: pageData });

	const { mutate, isSuccess, isLoading:postLoading } = usePost();
	const { data: defaultData, isLoading:getLoading } = useGet({
		query: "ServerAndEmail",
		root: `${urlRoot}`,
		route: `${API.ServerAndEmail}`,
	});

	useEffect(() => {
		if (defaultData?.isSuccess) {
			const reTypeData = defaultData?.data as ServerAndEmailType;
			setPageData(reTypeData);
			reset(reTypeData);
		}
	}, [reset, defaultData]);

	// request server date
	const onSubmit = (result: ServerAndEmailType) => {
		console.log("onSubmit", result);
		const reTypeResult = handleType(result); // 轉換型別規則，useForm會把全部自動轉換成string
		mutate({
			root: `${urlRoot}`,
			route: `${API.ServerAndEmail}`,
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
			alert("儲存成功");
		}
	}, [isSuccess]);

	return (
		<div>
			<FullLoading open={postLoading || getLoading}/>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ display: "flex", flexWrap: "wrap" }}
			>
				<CommonTitle>主機伺服器</CommonTitle>
				<FormInputByHooks
					control={control}
					title="系統連結埠"
					name="workerPort"
					defaultType="number"
				/>
				<FormInputByHooks
					control={control}
					title="偵測資料傳遞埠"
					name="detectPort"
					defaultType="number"
				/>
				<CheckInputByHooks
					control={control}
					title="用戶端預設偵測"
					name="detectDefault"
					watch={watch("detectDefault")}
					defaultChecked={pageData.detectDefault}
				/>
				<FormInputByHooks
					control={control}
					title="用戶端更新埠"
					name="updatePort"
					marginGap={170}
					defaultType="number"
				/>
				<CommonHoriLine />
				<CommonTitle>信箱</CommonTitle>
				<FormInputByHooks
					control={control}
					title="寄件人信箱"
					name="email"
				/>
				<FormInputByHooks
					control={control}
					title="信箱密碼"
					name="password"
				/>
				<div style={{ width: "100%", display: "flex" }}>
					<FormInputByHooks
						control={control}
						title="郵件伺服器(IP)"
						name="ip"
						fullWidthPX={40}
						returnToZero={true}
					/>
					<FormInputByHooks
						control={control}
						title="埠"
						name="port"
						partWidthPX={100}
						fullWidthPX={20}
						flexClose={true}
						defaultType="number"
					/>
				</div>
				<SelectInputByHooks
					control={control}
					title="郵件加密模式"
					name="encryption"
					label="encryption"
					formControlWidth={100}
				>
					<MenuItem value="TLS">TLS</MenuItem>
					<MenuItem value="No Idea">No Idea</MenuItem>
				</SelectInputByHooks>

				<CommonHoriLine />

				<HookFormSubmitContainer>
					<HookFormSubmit
						type="submit"
						disabled={
							!isDirty || !isValid || isSubmitting
						}
					/>
				</HookFormSubmitContainer>
			</form>
		</div>
	);
};

export default Child_ServerAndEmail;
