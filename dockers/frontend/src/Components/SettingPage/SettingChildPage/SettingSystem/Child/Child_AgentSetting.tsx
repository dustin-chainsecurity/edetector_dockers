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

export interface IAgentSettingData {
	mission: {
		fileAnalysis: boolean;
		fileAnalysisMainDisk: string;
		memoryScan: boolean;
		collection: boolean;
		generateImage: boolean;
	};
	generateAgent: {
		serverIP: string;
		memoryScan: boolean;
		collection: boolean;
		generateImage: boolean;
	};
	cpuPriority: string;
}

const defaultValues:IAgentSettingData = {
	mission: {
		fileAnalysis: true,
		fileAnalysisMainDisk: "",
		memoryScan: true,
		collection: true,
		generateImage: true,
	},
	generateAgent: {
		serverIP: "",
		memoryScan: true,
		collection: true,
		generateImage: true,
	},
	cpuPriority: "",
};

const Child_AgentSetting = () => {
	const alert = useAlert().showAlert;
	const { setIsGlobalDirty } = useContext(SettingContext);
	const [pageData, setPageData] = useState<IAgentSettingData>(defaultValues);

	const {
		control,
		handleSubmit,
		watch,
		reset,
		formState: { isSubmitting, isDirty, isValid },
	} = useForm<IAgentSettingData>({ defaultValues: pageData });

	const { mutate, isSuccess, isLoading:postLoading } = usePost();
	const { data: defaultData, isLoading:getLoading } = useGet({
		query: "AgentSetting",
		root: `${urlRoot}`,
		route: `${API.agentSetting}`,
	});

	useEffect(() => {
		if (defaultData?.isSuccess) {
			const formData = defaultData?.data as IAgentSettingData;
			setPageData(formData);
			reset(formData);
		}
	}, [reset, defaultData]);



	const onSubmit = (result: IAgentSettingData) => {
		console.log("onSubmit", result);
		mutate({
			root: `${urlRoot}`,
			route: `${API.agentSetting}`,
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
				<CommonTitle>預先執行任務</CommonTitle>
				<CheckInputByHooks
					control={control}
					title="檔案總表分析"
					name="mission.fileAnalysis"
					watch={watch("mission.fileAnalysis")}
				/>
				<SelectInputByHooks
					control={control}
					title="主要磁區"
					name="mission.fileAnalysisMainDisk"
					label="fileAnalysisMainDisk"
					formControlWidth={100}
					marginGap={170}
				>
					<MenuItem value="Disk/C">C :</MenuItem>
					<MenuItem value="Disk/D">D :</MenuItem>
					<MenuItem value="Disk/E">E :</MenuItem>
				</SelectInputByHooks>
				<CheckInputByHooks
					control={control}
					title="記憶體掃描"
					name="mission.memoryScan"
					watch={watch("mission.memoryScan")}
				/>
				<CheckInputByHooks
					control={control}
					title="痕跡取證"
					name="mission.collection"
					watch={watch("mission.collection")}
				/>
				<CheckInputByHooks
					control={control}
					title="關鍵映像檔製作"
					name="mission.generateImage"
					watch={watch("mission.generateImage")}
				/>

				<CommonHoriLine />

				<CommonTitle>Agent產製</CommonTitle>
				<FormInputByHooks
					control={control}
					title="伺服器IP"
					name="generateAgent.serverIP"
				/>
				<CheckInputByHooks
					control={control}
					title="記憶體掃描"
					name="generateAgent.memoryScan"
					watch={watch("generateAgent.memoryScan")}
				/>
				<CheckInputByHooks
					control={control}
					title="痕跡取證"
					name="generateAgent.collection"
					watch={watch("generateAgent.collection")}
				/>
				<CheckInputByHooks
					control={control}
					title="關鍵映像檔製作"
					name="generateAgent.generateImage"
					watch={watch("generateAgent.generateImage")}
				/>

				<CommonHoriLine />
				<CommonTitle>其他</CommonTitle>
				<SelectInputByHooks
					control={control}
					title="CPU優先級"
					name="cpuPriority"
					label="cpuPriority"
					formControlWidth={100}
				>
					<MenuItem value="normal">普通</MenuItem>
					<MenuItem value="veryNormal">非常普通</MenuItem>
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

export default Child_AgentSetting;
