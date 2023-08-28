import { Checkbox } from '@mui/material';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { HookFormContainer, HookFormFlexBox } from './StyledComponent';
import { ICommonFuncData } from '../../SettingPage/SettingChildPage/SettingSystem/Child/Child_CommonFunc';
import { IAgentSettingData } from '../../SettingPage/SettingChildPage/SettingSystem/Child/Child_AgentSetting';

interface ICheckInputByHooks {
    control: Control<FieldValues, any> | Control<ICommonFuncData |any> | Control<IAgentSettingData |any> ;
	title: string;
	name: string;
	subTitle?: string;
	watch?: any;
	defaultChecked?: boolean;
}

const CheckInputByHooks = (props:ICheckInputByHooks) => {
    const { control, title, name, subTitle, watch, defaultChecked } = props;
	// const [checked, setChecked] = useState(false);

	return (
		<HookFormContainer>
			<HookFormFlexBox>
				<span>{title} {title?':':''}</span>
				<div style={{ width: 400, display:'flex', alignItems:'center' }}>
					<Controller
						name={name}
						control={control}
						render={({
							field: { onChange, value,  }
						}) => (
							<Checkbox
								size="small"
								value={value}
								checked={watch}
								onChange={(e)=>{onChange(e.target.checked)}}
							/>
						)}
					/>
					{subTitle && <span>{subTitle}</span>}
					{!subTitle && <span>{watch?'開啟':'關閉'}</span>}
				</div>
				
			</HookFormFlexBox>
		</HookFormContainer>
	);
}

export default CheckInputByHooks