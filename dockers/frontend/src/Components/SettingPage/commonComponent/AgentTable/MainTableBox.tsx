import React, { useEffect, useState } from 'react'
import { ChildInnerWhiteContainer } from '../../commonComponent/StyledComponents'
import Formtable, { IDeviceData } from './Formtable'
import { useGet } from '../../../../hooks/useGet';
import { axiosClient } from '../../../../utiles/ProtectedRoutes';
import { API, urlRoot } from '../../../../constant';
import * as R from "ramda";
import GroupTable from './GroupTable';
import { useAlert } from '../../../../hooks/useAlert';
import { error } from 'console';
import { resolve } from 'path/win32';
interface IRawGroupData {
  id: string;
  ip: string;
  name: string;
  macAddress: string;
  clientUid: string;
  group: string[] | [];
}

interface IGroupData {
  name: string;
  id: number;
  amount: number;
}

interface IGroupTableData {
  showGroup: boolean;
  selectedId: string[];
  setSelectedId: React.Dispatch<React.SetStateAction<string[]>>;
  buttonComponent?: () => JSX.Element;
  renewTable: boolean;
  setRenewTable: React.Dispatch<React.SetStateAction<boolean>>;
  selectedGroupList: number[];
  setSelectedGroupList: React.Dispatch<React.SetStateAction<number[]>>;
}

const MainTableBox = (props: IGroupTableData) => {
  const alert = useAlert().showAlert;
  const { showGroup, selectedId, setSelectedId, buttonComponent, renewTable, setRenewTable, selectedGroupList, setSelectedGroupList } = props;
  // group to string
  const [tableData, setTableData] = useState<IDeviceData[]>([]);
  // group count
  const [groupTableData, setGroupTableData] = useState<IGroupData[]>([]);
  // group as tags

  // selectedGroupList 
  // const [selectedGroupList, setSelectedGroupList] = useState<number[]>([]);

  const { data: defaultAgentData, isLoading: getLoading } = useGet({
    query: "AllAgentDetail",
    root: `${urlRoot}`,
    route: `${API.deviceGroups}`,
  });
  const { data: defaultGroupData, isLoading: groupLoading } = useGet({
    query: "AllGroupDetail",
    root: `${urlRoot}`,
    route: `${API.allGroupsInfo}`,
  });

  useEffect(() => {
    console.log("renewTable", renewTable)
    if (renewTable) {
      getNewGroupData();
      getNewAgentData();
      setRenewTable(!renewTable)
    }

  }, [renewTable])


  const getNewGroupData = () => {
    const newFetchGroupData = axiosClient.get(
      `${urlRoot}${API.allGroupsInfo}`
    ).then((res) => {
      if (res.data.groups) {
        const groupDataList = res.data.groups.map((item: any) => {
          console.log(item.devices.length);
          return {
            id: item.id,
            name: item.name,
            amount: item.devices.length,
          };
        })
        setGroupTableData(groupDataList)
      }
    })
      .catch((err) => {
        alert(err.message)
      })
  }

  const getNewAgentData = async () => {
    await axiosClient.get(`${urlRoot}${API.deviceGroups}`)
      .then((res) => {
        if (res.data.data) {
          const agentDataList = res.data.data.map((item: any) => {
            return {
              groups: ArrayToString(item.group),
              deviceId: item.id,
              deviceName: item.name,
              address: item.macAddress,
              innerIP: item.ip,
            };
          })
          setTableData(agentDataList)
        }
      })
      .catch((err) => {
        alert(err.message)
      })
      ;
  }




  // 取得群組資料
  useEffect(() => {
    console.log("groupData", defaultGroupData)
    const groupsDataList = defaultGroupData?.groups?.map((item: any) => {
      // console.log(item.devices.length);
      return {
        id: item.id,
        name: item.name,
        amount: item.devices.length,
      };
    })
    setGroupTableData(groupsDataList);
  }, [defaultGroupData]);


  useEffect(() => {
    setTableData(
      generateDeviceData(defaultAgentData?.data as IRawGroupData[])
    );

    const genGroupData = R.pipe(
      spreadGroups, // spread groups into string array
      // generateResultArray, // count the amount of each group and generate result array
      // R.tap(data => console.log('call data', data)),
      // setGroupTableData
    );
    genGroupData(defaultAgentData?.data as IRawGroupData[]);
  }, [defaultAgentData]);


  return (
    <ChildInnerWhiteContainer style={{ display: "flex", flexWrap: "wrap", width: "100%" }} id='kkk'>
      {showGroup ?
        <p style={{ width: "100%" }}>
          <span >群組統計</span>  <span>電腦 {tableData?.length}  </span><span>群組 {groupTableData?.length}</span>
        </p> : null
      }

      {tableData?.length > 0 &&
        <Formtable
          defaultAgentData={defaultAgentData}
          setGroupTableData={setGroupTableData}
          setTableData={setTableData}
          tableData={tableData}
          selectedGroupList={selectedGroupList}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          buttonComponent={buttonComponent}
          setRenewTable={setRenewTable}
          showGroup={showGroup}
        />}
      {groupTableData?.length > 0 && showGroup && (
        <GroupTable
          tableData={groupTableData}
          selectedId={selectedGroupList}
          setSelectedId={setSelectedGroupList}
          renewTable={renewTable}
          setRenewTable={setRenewTable}
        />
      )}
    </ChildInnerWhiteContainer>

  )
}

export default MainTableBox


const ArrayToString = (data: string[]): string => {
  if (data.length === 0) return "未分類群組";
  return data.join(",");
};

// Converts raw group data to device table data format.
const generateDeviceData = (
  rawData: IRawGroupData[] | undefined | null
): IDeviceData[] => {
  return (rawData || []).map((item: IRawGroupData) => {
    const res: IDeviceData = {
      groups: ArrayToString(item.group),
      deviceId: item.id,
      deviceName: item.name,
      address: item.macAddress,
      innerIP: item.ip,
    };
    return res;
  });
};

// spread groups into string array
const spreadGroups = (data: IRawGroupData[] | undefined | null): string[] => {
  return (data || []).reduce((acc: string[], cur: IRawGroupData) => {
    return cur.group.length === 0
      ? acc.concat("未分類")
      : acc.concat(cur.group);
  }, []);
};

