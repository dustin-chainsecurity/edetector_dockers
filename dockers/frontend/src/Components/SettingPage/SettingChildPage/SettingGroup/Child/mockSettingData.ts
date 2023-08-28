import { IDeviceData } from "./Formtable";

export const mockSettingData : readonly IDeviceData[] = [
    {
        deviceId: "uuid1",
        innerIP: "192.168.10.1",
        deviceName: "PC-1",
        address: "AA-BB-CC-DD-EE-FF-AA-BB-CC-DD-EE-FF",
        groups: "group1,group2",
    },
    {
        deviceId: "uuid2",
        innerIP: "192.168.10.2",
        deviceName: "PC-2",
        address: "AA-BB-CC-DD-EE-FF",
        groups: "group1, group2",
    },
    {
        deviceId: "uuid3",
        innerIP: "192.168.10.3",
        deviceName: "PC-3",
        address: "AA-BB-CC-DD-EE-FF",
        groups: "group1, group2",
    }
]