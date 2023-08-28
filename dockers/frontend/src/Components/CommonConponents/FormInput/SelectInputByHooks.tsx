/** @format */

import { FormControl, Select } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import { HookFormContainer, HookFormFlexBox } from "./StyledComponent";
import { ReactNode } from "react";
import { ICommonFuncData } from "../../SettingPage/SettingChildPage/SettingSystem/Child/Child_CommonFunc";
import { IAgentSettingData } from "../../SettingPage/SettingChildPage/SettingSystem/Child/Child_AgentSetting";


interface ISelectInputByHooks {
	control: Control<FieldValues, any> | Control<ICommonFuncData |any> | Control<IAgentSettingData |any> ;

	title: string;
	name: string;
	marginGap?: number;
    children ?: ReactNode;
    label ? : string;
    defaultValue ?: string;
    formControlWidth ?: number;
	fullWidthPX?: number; // 整體寬度
	returnToZero?: boolean; // 是否歸零邊距
}

const SelectInputByHooks = (props: ISelectInputByHooks) => {
	const { control, title, name, marginGap, children, label, defaultValue, formControlWidth, returnToZero, fullWidthPX } = props;
	const marginGapValue = marginGap ? marginGap : 0;
    const formDefaultValue = defaultValue ? defaultValue : '';
    const formControlWidthInt = formControlWidth ? formControlWidth : 400;
    const labelId = `${name}-label`;
	const FullWidth = fullWidthPX || 100;
	const marginToZero = returnToZero ? { margin: "10px 0px" } : {};

	return (
		<HookFormContainer style={{ width: `${FullWidth}%`, ...marginToZero }}>
			<HookFormFlexBox
				style={{
					marginLeft: marginGapValue,
				}}
			>
				<span>{title} :</span>
                <div style={{width:400}}>
				<FormControl style={{ width: formControlWidthInt }}>
					<Controller
                        render={({ field: { onChange, value} }) => (
                            <Select 
                                size="small"
                                value={value}
                                onChange={onChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                                labelId={labelId}
                                label=""
                            >
                                {children}
                            </Select>
                        )} 
						name={name}
						control={control}
						defaultValue={formDefaultValue}
					/>
				</FormControl>
                </div>
			</HookFormFlexBox>
		</HookFormContainer>
	);
};

export default SelectInputByHooks;
