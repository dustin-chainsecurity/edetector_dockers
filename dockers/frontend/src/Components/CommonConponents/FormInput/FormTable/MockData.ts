import { IDeviceData } from "./FormTable";

interface ISettingData {
    isSuccess: boolean;
    data: readonly IDeviceData[];
}

export const mockSettingData: ISettingData = {
    "isSuccess": true,
    "data": [
      {
        "deviceId": "deviceIDNumber1",
        "innerIP": "192.168.10.1",
        "deviceName": "PC-1",
        "address": "AA-BB-C6-DD-EE-01",
        "groups": "group1, group2, group3,group1, group2, group3,group1, group2, group3"
      },
      {
        "deviceId": "deviceIDNumber2",
        "innerIP": "192.168.10.1",
        "deviceName": "PC-1",
        "address": "AA-BB-C6-DD-EE-01",
        "groups": "group1, group2, group4"
      },
      {
        "deviceId": "deviceIDNumber3",
        "innerIP": "192.168.10.1",
        "deviceName": "PC-1",
        "address": "AA-BB-C6-DD-EE-01",
        "groups": "group1, group2, group5"
      },
      {
        "deviceId": "deviceIDNumber4",
        "innerIP": "192.168.10.1",
        "deviceName": "PC-1",
        "address": "AA-BB-C6-DD-EE-01",
        "groups": "group1, group2, group6"
      },
      {
        "deviceId": "deviceIDNumber5",
        "innerIP": "192.168.10.1",
        "deviceName": "PC-1",
        "address": "AA-BB-C6-DD-EE-01",
        "groups": "group2"
      },
      {
        "deviceId": "deviceIDNumber6",
        "innerIP": "192.168.10.1",
        "deviceName": "PC-1",
        "address": "AA-BB-C6-DD-EE-01",
        "groups": "group1, group2"
      },
      {
        "deviceId": "deviceIDNumber7",
        "innerIP": "192.168.10.1",
        "deviceName": "PC-1",
        "address": "AA-BB-C6-DD-EE-01",
        "groups": "group1, group2"
      },
      {
        "deviceId": "deviceIDNumber8",
        "innerIP": "1.2.4.34",
        "deviceName": "PC-1",
        "address": "AA-BB-C6-DD-EE-01",
        "groups": "group1, group2"
      },
      {
        "deviceId": "deviceIDNumber9",
        "innerIP": "1.2.4.34",
        "deviceName": "PC-1",
        "address": "AA-BB-C6-DD-EE-01",
        "groups": "group1, group2"
      },
      
    ]
  }