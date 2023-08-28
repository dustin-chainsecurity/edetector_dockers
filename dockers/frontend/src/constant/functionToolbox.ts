import { IConnectStatus, IDevice, IFormtedConnectStatus, IFormatedDevice, scanning, dateForm, IOneNode, ITimeNode, MemorySelectedData, ForensicsSelectedData, AllFilesDropDownData } from "./interfaceBoard";
import dayjs from 'dayjs';
import { elasticRoot, elasticChildUrl, mainTableName } from "./index"
import { AxiosResponse } from "axios";
import { translateChineseToElasticsearchTableIndex, forensicsDropSelectorTranfer, mainTimeColumnInTable, generateForensicsGroupTree } from "./AnalysisPage/functionToolbox"
import {generateTimeListForChart} from "./FunctionForElasticsearch/functionToolbox"


// 轉換成時間格式
export function formatTimestamp(timestamp?: number): string {
  if (!timestamp) return "- -";
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day}\n${hours}:${minutes}`;
}

// 轉換成字串
export function convertToStringWithCommas(arr: string[] | null): string {
  if (!arr) {
    return "- -";
  }
  return arr.join(", ");
}

export function convertToStringArray(arr: string[] | null): string {
  if (!arr) {
    return "-  -";
  }
  const stringArray = arr.map(item => `${item}:00`);
  return stringArray.join(",");
}

// 轉換成百分比(loading)或時間
// 如果有結束時間則顯示日期時間，否則出現數字progress 
const customObjectTime = (data: scanning) => {
  if (data.isFinish) {
    return data.finishTime !== null ? formatTimestamp(data.finishTime) : "- -";
  } else {
    return data.progress;
  }
};

// 轉換成每月幾號 每日幾點
const formatObjectTime = (data: dateForm) => {
  if (data.date === "" || data.time === "") {
    return "- -";
  }
  return `每月${data.date}日 \n 每日${data.time}`;
};

export const customData = (data: IDevice) => {
  const result: IFormatedDevice = {
    deviceId: data.deviceId,
    connection: data.connection ? 'true' : 'false',
    InnerIP: data.innerIP,
    deviceName: data.deviceName,
    groups: convertToStringWithCommas(data.groups),
    detectionMode: data.detectionMode ? 'true' : 'false',
    scanSchedule: convertToStringArray(data.scanSchedule),
    scanFinishTime: customObjectTime(data.scanFinishTime),
    collectSchedule: formatObjectTime(data.collectSchedule),
    collectFinishTime: customObjectTime(data.collectFinishTime),
    fileDownloadDate: formatObjectTime(data.fileDownloadDate),
    fileFinishTime: customObjectTime(data.fileFinishTime),
    imageFinishTime: customObjectTime(data.imageFinishTime),
  }
  return result;
}

export const customConnectedData = (data: IConnectStatus) => {
  const result: IFormtedConnectStatus = {
    deviceId: data.deviceId,
    connection: data.connection ? 'true' : 'false',
  }
  return result;
}

export const getStringLength = (text: string): number => {

  return text.length;
};


export const mergeObjects = (arr1: IFormatedDevice[], arr2: IFormtedConnectStatus[]) => {
  const merged: Record<string, IFormatedDevice> = {};

  arr1.forEach(obj => {
    merged[obj.deviceId] = {
      ...obj,
    };
  });

  arr2.forEach(obj => {
    if (merged[obj.deviceId]) {
      merged[obj.deviceId].connection = obj.connection;
    }
  });
  return Object.values(merged);
};


export const fixPaginationNumber = (totalPages: number) => {
  if (totalPages === 0) {
    return [5];
  } else if (totalPages > 100) {
    return [5, 25, 50, 100];
  } else if (totalPages > 50) {
    return [5, 25, 50];
  } else if (totalPages > 20) {
    return [5, 25];
  } else {
    return [5];
  }
};

export const matchObjects = (arr1: IFormatedDevice[], arr2: IFormatedDevice[] | []) => {
  const matched: Record<string, IFormatedDevice> = {};

  arr1.forEach(obj => {
    matched[obj.deviceId] = {
      ...obj,
    };
  });

  arr2.forEach(obj => {
    if (matched[obj.deviceId]) {
      matched[obj.deviceId] = obj;
    }
  });
  // console.log(matched);
  return Object.values(matched);
}

export const convertTimeStringsToString = (timeStrings: string[]): string => {
  const res = timeStrings
    .map((timeString) => Number(timeString.split(":")[0]))
    .sort((a, b) => a - b);

  return res.join(",");
};

