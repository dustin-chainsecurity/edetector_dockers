/** @format */

import {
	IConnectStatus,
	IDevice,
	IFormtedConnectStatus,
	IFormatedDevice,
	scanning,
	dateForm,
	TactionType,
} from "./interfaceBoard";

// 轉換成時間格式
export function formatTimestamp(timestamp?: number): string {
	if (!timestamp) return "- -";
	const date = new Date(timestamp * 1000);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return `${year}/${month}/${day}\n${hours}:${minutes}`;
}

// 轉換成字串
export function convertToStringWithCommas(arr: string[] | null): string {
	if (!arr) {
		return "- -";
	}
	else if(arr.length === 0){
		return "未分類群組"
	}
	return arr.join(", ");
}

// time string array 轉換成字串
export function convertToStringArray(arr: string[] | null): string {
	if (!arr) {
		return "-  -";
	}
	const stringArray = arr.map((item) => `${item}:00`);
	return stringArray.join(",");
}

// 轉換成百分比(loading)或時間
// 如果有結束時間則顯示日期時間，否則出現數字progress
const customObjectTime = (data: scanning) => {
	if(data.status === 0){
		return "- -"
	}
	else if(data.status === 1){
		return "Pending..."
	}
	else if(data.status === 2){
		return data.progress
	}
	else if(data.status === 3 || data.status === 4){
		return formatTimestamp(data.finishTime)
	}
	else if(data.status === 5){
		return `${data.message}`
	}
	else{
		return "重新整理"
	}
};


// 轉換成每月幾號 每日幾點
const formatObjectTime = (data: dateForm) => {
	if (data.date === "" || data.time === "") {
		return "- -";
	}
	return `每月${data.date}日 \n 每日${data.time}`;
};

// 將server拿到的raw data轉換成表格需要的型別與格式
export const customData = (data: IDevice) => {
	const result: IFormatedDevice = {
		deviceId: data.deviceId,
		connection: data.connection ? "true" : "false",
		InnerIP: data.innerIP,
		deviceName: data.deviceName,
		groups: convertToStringWithCommas(data.groups),
		detectionMode: data.detectionMode ? "true" : "false",
		scanSchedule: convertToStringArray(data.scanSchedule),
		scanFinishTime: customObjectTime(data.scanFinishTime),
		collectSchedule: formatObjectTime(data.collectSchedule),
		collectFinishTime: customObjectTime(data.collectFinishTime),
		fileDownloadDate: formatObjectTime(data.fileDownloadDate),
		fileFinishTime: customObjectTime(data.fileFinishTime),
		imageFinishTime: customObjectTime(data.imageFinishTime),
	};
	return result;
};

export const customConnectedData = (data: IConnectStatus) => {
	const result: IFormtedConnectStatus = {
		deviceId: data.deviceId,
		connection: data.connection ? "true" : "false",
	};
	return result;
};



export const fixPaginationNumber = (totalPages: number) => {
	if (totalPages === 0) {
		return [];
	} 
	else if( totalPages>0 && totalPages<=10 ){
		return [5]
	}
	else if( totalPages>=10 && totalPages<=20 ){
		return [5,10]
	}
	else if( totalPages>=20 && totalPages<50 ){
		return [5,10,20]
	}
	else if( totalPages>=50 && totalPages<200 ){
		return [5,10,20,50]
	}
	else if( totalPages>=200 && totalPages<500 ){
		return [5,10,20,50,200]
	}
	else if( totalPages>500 ){
		return [5,10,20,50,200,500]
	}
	else{
		return []
	}
};

export const matchDiffObjects = (
	originArray: IFormatedDevice[],
	newArray: IFormatedDevice[] | []
) => {
	if (originArray.length === 0) return [];
	if (newArray.length === 0) return originArray;

	const extractIds = newArray.map((obj) => obj.deviceId); // extractIds the same Ids
	const matchedList = originArray.map((obj) => {
		if (extractIds.includes(obj.deviceId)) {
			return newArray.find((item) => item.deviceId === obj.deviceId);
		}
		return obj;
	});
	return matchedList;
};

// 依照選取的id，立即更新grid的資料到初始值
export const updateGridInitial = (
	obj: IFormatedDevice,
	selectedId: readonly string[],
	commandObj: Partial<IFormatedDevice>
): IFormatedDevice => {
	if (selectedId.includes(obj.deviceId)) {
		return { ...obj, ...commandObj };
	}
	return obj;
};

export const convertTimeStringsToString = (timeStrings: string[]): string => {
	const res = timeStrings
		.map((timeString) => Number(timeString.split(":")[0]))
		.sort((a, b) => a - b);

	return res.join(",");
};
