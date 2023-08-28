/** @format */

// 引入所需的套件和組件
import { FormControl, TextField } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";
import { HookFormContainer, HookFormFlexBox } from "./StyledComponent";
import { ICommonFuncData } from "../../SettingPage/SettingChildPage/SettingSystem/Child/Child_CommonFunc";
import { IAgentSettingData } from "../../SettingPage/SettingChildPage/SettingSystem/Child/Child_AgentSetting";

// 定義組件所需的屬性接口
interface ICommonTextForm {
  control: Control<FieldValues, any> | Control<ICommonFuncData |any> | Control<IAgentSettingData |any> ;
  title: string; // 表單標題
  name: string; // 表單項目名稱
  defaultType? : "string" | "number" | "boolean"
  
  marginGap?: number; // 邊距間隔
  fullWidthPX?: number; // 整體寬度
  partWidthPX?: number; // 項目寬度
  returnToZero?: boolean; // 是否歸零邊距
  flexClose?: boolean; // 是否使用 flex 排列
}

// 表單輸入組件
const FormInputByHooks = (props: ICommonTextForm) => {
  // 解構取得屬性
  const {
    control,
    title,
    name,
    marginGap,
    fullWidthPX,
    partWidthPX,
    returnToZero,
    flexClose,
    defaultType
  } = props;

  // 設定邊距間隔、整體寬度、項目寬度的預設值
  const marginGapValue = marginGap || 0;
  const FullWidth = fullWidthPX || 100;
  const PartWidth = partWidthPX || 400;
  const defaultTypeValue = defaultType || "string"

  // 判斷是否需要歸零邊距
  const marginToZero = returnToZero ? { margin: "10px 0px" } : {};

  // 判斷是否使用 flex 排列
  const FlexClose = flexClose ? { justifyContent: 'space-evenly' } : {};

  return (
    <HookFormContainer style={{ width: `${FullWidth}%`, ...marginToZero }}>
      <HookFormFlexBox style={{ marginLeft: marginGapValue, ...FlexClose }}>
        <span>{title} :</span>
        <div style={{ width: 400 }}>
          <FormControl style={{ width: PartWidth }}>
            <Controller
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  size="small"
                  hiddenLabel
                  {...field}
                  error={!!error}
                  type={defaultTypeValue}
                  helperText={error ? error.message : null}
                />
              )}
              name={name}
              control={control}
            />
          </FormControl>
        </div>
      </HookFormFlexBox>
    </HookFormContainer>
  );
};

export default FormInputByHooks;


