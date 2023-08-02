import { formatTimestamp } from "../../../constant/functionToolbox";

export interface DynamicObject {
    [key: string]: any;
}

// 判斷是否有時間資料在物件裡的一個函數  //number and length > 8
export const translateTime =(obj:DynamicObject)=>{
  const newObj: DynamicObject = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === 'number' && value.toString().length > 8) {
        newObj[key] = formatTimestamp(value);
      } else {
        newObj[key] = value;
      }
    }
  }

  return newObj;
}