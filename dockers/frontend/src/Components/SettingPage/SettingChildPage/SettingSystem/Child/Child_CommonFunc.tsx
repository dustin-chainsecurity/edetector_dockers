/** @format */

import { useForm } from "react-hook-form";
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
import { useContext, useEffect, useState } from "react";
import { usePost } from "../../../../../hooks/usePost";
import { useGet } from "../../../../../hooks/useGet";
import { API, urlRoot } from "../../../../../constant";
import FullLoading from "../../../../CommonConponents/FullLoading/FullLoading";
import { SettingContext } from "../../../../../AppContext/SettingProvider";

interface EmailNotification {
    on: boolean;
    riskLevel: string;
    recepientEmail: string;
}

interface Report {
    on: boolean;
    generateTime: string;
    riskLevel: string;
    recepientEmail: string;
}

interface AutoDefense {
    on: boolean;
    riskLevel: string;
    action: string;
    memoryDump: boolean;
    dumpUploadVirusTotalAnalysis: boolean;
    dumpUploadHybridAnalysis: boolean;
    sampleDownload: boolean;
    sampleUploadVirusTotalAnalysis: boolean;
    sampleUploadHybridAnalysis: boolean;
}

export interface ICommonFuncData {
    emailNotification: EmailNotification;
    report: Report;
    autoDefense: AutoDefense;
}

const defaultValues:ICommonFuncData = {
    emailNotification: {
        on: true,
        riskLevel: "no",
        recepientEmail: "test@example.com"
    },
    report: {
        on: true,
        generateTime: "2200",
        riskLevel: "level4",
        recepientEmail: "test@example.com"
    },
    autoDefense: {
        on: true,
        riskLevel: "level4",
        action: "action",
        memoryDump: true,
        dumpUploadVirusTotalAnalysis: true,
        dumpUploadHybridAnalysis: true,
        sampleDownload: true,
        sampleUploadVirusTotalAnalysis: true,
        sampleUploadHybridAnalysis: true
    }
};

const Child_CommonFunc = () => {
	const { setIsGlobalDirty } = useContext(SettingContext);
	const [pageData, setPageData] = useState<ICommonFuncData>(defaultValues);
	
	const {
		control,
		handleSubmit,
		watch,
		reset,
		formState: { isSubmitting, isDirty, isValid },
	} = useForm<ICommonFuncData>({ defaultValues: pageData });

	const { mutate, isSuccess, isLoading:postLoading } = usePost();
	const { data: defaultData, isLoading:getLoading } = useGet({
		query: "CommonFunc",
		root: `${urlRoot}`,
		route: `${API.CommonFunc}`,
	});


	useEffect(() => {
		if (defaultData?.isSuccess) {
			const formData = defaultData?.data as ICommonFuncData;
			setPageData(formData);
			reset(formData);
		}
	}, [reset, defaultData]);

	const onSubmit = (result: ICommonFuncData) => {
		console.log("onSubmit", result);
		mutate({
			root: `${urlRoot}`,
			route: `${API.CommonFunc}`,
			body: result,
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
				<CommonTitle>主機伺服器</CommonTitle>

				<CheckInputByHooks
					control={control}
					title="郵件通知"
					name="emailNotification.on"
					watch={watch("emailNotification.on")}
				/>
				<SelectInputByHooks
					control={control}
					title="郵件加密模式"
					name="emailNotification.riskLevel"
					label="emailEncryption"
					formControlWidth={100}
					marginGap={170}
				>
					<MenuItem value="no">非白名單程式</MenuItem>
					<MenuItem value="No Idea">No Idea</MenuItem>
				</SelectInputByHooks>
				<FormInputByHooks
					control={control}
					title="收件人信箱"
					name="emailNotification.recepientEmail"
					marginGap={170}
				/>

				<CommonSpaceGap />

				<CheckInputByHooks
					control={control}
					title="定時報表產製"
					name="report.on"
					watch={watch("report.on")}
				/>
				<SelectInputByHooks
					control={control}
					title="每日產製時間"
					name="report.generateTime"
					label="generateTime"
					formControlWidth={150}
					marginGap={170}
				>
					<MenuItem value="2200">22:00</MenuItem>
					<MenuItem value="No Idea">No Idea</MenuItem>
				</SelectInputByHooks>
				<SelectInputByHooks
					control={control}
					title="風險等級大於"
					name="report.riskLevel"
					label="riskLevel"
					formControlWidth={150}
					marginGap={170}
				>
					<MenuItem value="level4">風險等級四</MenuItem>
					<MenuItem value="level3">風險等級三</MenuItem>
					<MenuItem value="level2">風險等級二</MenuItem>
					<MenuItem value="level1">風險等級一</MenuItem>
				</SelectInputByHooks>
				<FormInputByHooks
					control={control}
					title="收件人信箱"
					name="report.recepientEmail"
					marginGap={170}
				/>

				<CommonSpaceGap />

				<CheckInputByHooks
					control={control}
					title="自動防護"
					name="autoDefense.on"
					watch={watch("autoDefense.on")}
				/>
				<SelectInputByHooks
					control={control}
					title="風險等級大於"
					name="autoDefense.riskLevel"
					label="riskLevel"
					formControlWidth={150}
					marginGap={170}
				>
					<MenuItem value="level4">風險等級四</MenuItem>
					<MenuItem value="level3">風險等級三</MenuItem>
					<MenuItem value="level2">風險等級二</MenuItem>
					<MenuItem value="level1">風險等級一</MenuItem>
				</SelectInputByHooks>
				<SelectInputByHooks
					control={control}
					title="風險程序處理"
					name="autoDefense.action"
					label="action"
					formControlWidth={150}
					marginGap={170}
				>
					<MenuItem value="no-action">無動作</MenuItem>
					<MenuItem value="action">有動作</MenuItem>
				</SelectInputByHooks>

				<CommonSpaceGap />

				<CheckInputByHooks
					control={control}
					title=""
					name="autoDefense.memoryDump"
					subTitle="記憶體Dump"
					watch={watch("autoDefense.memoryDump")}
				/>
				<CheckInputByHooks
					control={control}
					title=""
					name="autoDefense.dumpUploadVirusTotalAnalysis"
					subTitle="Dump自動上傳Virustotal深度分析"
					watch={watch("autoDefense.dumpUploadVirusTotalAnalysis")}
				/>
				<CheckInputByHooks
					control={control}
					title=""
					name="autoDefense.dumpUploadHybridAnalysis"
					subTitle="Dump自動上傳hybrid-analysis深度分析"
					watch={watch("autoDefense.dumpUploadHybridAnalysis")}
				/>

				<CommonSpaceGap />

				<CheckInputByHooks
					control={control}
					title=""
					name="autoDefense.sampleDownload"
					subTitle="樣本下載"
					watch={watch("autoDefense.sampleDownload")}
				/>
				<CheckInputByHooks
					control={control}
					title=""
					name="autoDefense.sampleUploadVirusTotalAnalysis"
					subTitle="樣本自動上傳Virustotal深度分析"
					watch={watch("autoDefense.sampleUploadVirusTotalAnalysis")}
				/>
				<CheckInputByHooks
					control={control}
					title=""
					name="autoDefense.sampleUploadHybridAnalysis"
					subTitle="樣本自動上傳hybrid-analysis深度分析"
					watch={watch("autoDefense.sampleUploadHybridAnalysis")}
				/>

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
export default Child_CommonFunc;
