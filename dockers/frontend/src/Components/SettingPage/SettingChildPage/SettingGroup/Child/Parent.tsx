// /** @format */

// import { useEffect, useState } from "react";
// import { API, urlRoot } from "../../../../../constant";
// import { useGet } from "../../../../../hooks/useGet";
// import { ChildInnerWhiteContainer } from "../../../commonComponent/StyledComponents";
// import FormTable, { IDeviceData } from "./Formtable";
// import GroupTable, { IGroupData } from "./GroupTable";

// import * as R from "ramda";
// import { axiosClient } from "../../../../../utiles/ProtectedRoutes";

// // ! fix line 51, the condition of the length

// interface IRawGroupData {
// 	id: string;
// 	ip: string;
// 	name: string;
// 	macAddress: string;
// 	clientUid: string;
// 	group: string[] | [];
// }

// const Parent = () => {
// 	// group to string
// 	const [tableData, setTableData] = useState<IDeviceData[]>([]);
// 	// group count
// 	const [groupTableData, setGroupTableData] = useState<IGroupData[]>([]);
// 	// group as tags
// 	// selectedGroupList 
// 	const [selectedGroupList, setSelectedGroupList] = useState<number[]>([]);
// 	const { data: defaultAgentData, isLoading: getLoading } = useGet({
// 		query: "AllAgentDetail",
// 		root: `${urlRoot}`,
// 		route: `${API.deviceGroups}`,
// 	});
// 	const { data: defaultGroupData, isLoading: groupLoading } = useGet({
// 		query: "AllGroupDetail",
// 		root: `${urlRoot}`,
// 		route: `${API.allGroupsInfo}`,
// 	});
// 	const getNewGroupData = async () => {
// 		const newFetchGroupData = await axiosClient.get(
// 			`${urlRoot}${API.allGroupsInfo}`
// 		)
// 		console.log(newFetchGroupData.data.groups)
// 		const groupDataList = newFetchGroupData.data.groups.map((item: any) => {
// 			console.log(item.devices.length);
// 			return {
// 				id: item.id,
// 				name: item.name,
// 				amount: item.devices.length,
// 			};
// 		})
// 		setGroupTableData(groupDataList);
// 	}
	
// 	const getNewAgentData = async () => {
// 		const newFetchData = await axiosClient.get(
// 			`${urlRoot}${API.deviceGroups}`
// 		);
// 		const agentDataList = newFetchData.data.data.map((item: any) => {
// 			return {
// 				groups: ArrayToString(item.group),
// 				deviceId: item.id,
// 				deviceName: item.name,
// 				address: item.macAddress,
// 				innerIP: item.ip,
// 			};
// 		})
// 		setTableData(agentDataList);
// 	}




// 	// 取得群組資料
// 	useEffect(() => {
// 		console.log("groupData", defaultGroupData)
// 		const groupsDataList = defaultGroupData?.groups?.map((item: any) => {
// 			// console.log(item.devices.length);
// 			return {
// 				id: item.id,
// 				name: item.name,
// 				amount: item.devices.length,
// 			};
// 		})
// 		setGroupTableData(groupsDataList);
// 	}, [defaultGroupData]);


// 	useEffect(() => {
// 		setTableData(
// 			generateDeviceData(defaultAgentData?.data as IRawGroupData[])
// 		);

// 		const genGroupData = R.pipe(
// 			spreadGroups, // spread groups into string array
// 			// generateResultArray, // count the amount of each group and generate result array
// 			// R.tap(data => console.log('call data', data)),
// 			// setGroupTableData
// 		);
// 		genGroupData(defaultAgentData?.data as IRawGroupData[]);
// 	}, [defaultAgentData]);
	
// 	console.log("tableData",typeof tableData)
// 	console.log("groupTableData", groupTableData?.length)
// 	return (
// 		<ChildInnerWhiteContainer style={{ display: "flex", flexWrap: "wrap" }}>
// 			<p style={{ width: "100%" }}>
// 				<span >群組統計</span>  <span>電腦 {tableData?.length}  </span><span>群組 {groupTableData?.length}</span>
// 			</p>
// 			{tableData?.length > 0 &&
// 				<FormTable
// 					// groupData={groupData}
// 					// defaultData={defaultData}
// 					// fetchGroupDetail={fetchGroupDetail}
// 					defaultAgentData  = {defaultAgentData}
// 					setGroupTableData={setGroupTableData}
// 					setTableData={setTableData}
// 					tableData={tableData}
// 					selectedGroupList={selectedGroupList}
// 					getNewGroupData={getNewGroupData}
// 					getNewAgentData={getNewAgentData}
// 				/>}
// 			{groupTableData?.length > 0 && (
// 				<GroupTable
// 					tableData={groupTableData}
// 					selectedId={selectedGroupList}
// 					setSelectedId={setSelectedGroupList}
// 					getNewGroupData={getNewGroupData}
// 					getNewAgentData={getNewAgentData}
// 				/>
// 			)}
// 		</ChildInnerWhiteContainer>
// 	);
// };

// export default Parent;

// const ArrayToString = (data: string[]): string => {
// 	if (data.length === 0) return "未分類群組";
// 	return data.join(",");
// };

// // Converts raw group data to device table data format.
// const generateDeviceData = (
// 	rawData: IRawGroupData[] | undefined | null
// ): IDeviceData[] => {
// 	return (rawData || []).map((item: IRawGroupData) => {
// 		const res: IDeviceData = {
// 			groups: ArrayToString(item.group),
// 			deviceId: item.id,
// 			deviceName: item.name,
// 			address: item.macAddress,
// 			innerIP: item.ip,
// 		};
// 		return res;
// 	});
// };

// // spread groups into string array
// const spreadGroups = (data: IRawGroupData[] | undefined | null): string[] => {
// 	return (data || []).reduce((acc: string[], cur: IRawGroupData) => {
// 		return cur.group.length === 0
// 			? acc.concat("未分類")
// 			: acc.concat(cur.group);
// 	}, []);
// };




import { ChildInnerWhiteContainer } from '../../../commonComponent/StyledComponents'
import MainTableBox from '../../../commonComponent/AgentTable/MainTableBox'
import { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { API, urlRoot } from '../../../../../constant';
import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../../../../../utiles/ProtectedRoutes';
import { useAlert } from '../../../../../hooks/useAlert';


interface IChangeAgentGroupMutation {
  url: string;
  requestBody: IChangeAgentGroupMutationRequestBody;
  isAdd: boolean;
}
interface IChangeAgentGroupMutationRequestBody {
  groups: number[];
  devices: string[];
}



const Parent = () => {
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [selectedGroupList, setSelectedGroupList] = useState<number[]>([]);
  const [renewTable, setRenewTable] = useState<boolean>(false);
  const alert = useAlert().showAlert;


  const fetchChangeAgentGroup = useMutation({
    mutationFn: (mutationData: IChangeAgentGroupMutation) => {
      if (mutationData.isAdd) {
        try {
          return axiosClient.post(
            mutationData.url,
            mutationData.requestBody
          );
        } catch (error) {
          console.log("error", error)
          throw error
        }
      } else {
        try {
          return axiosClient.delete(
            mutationData.url,
            { data: mutationData.requestBody }
          );
        } catch (error) {
          console.log("error", error)
          throw error
        }
      }

    },
    onSuccess: (result) => {
      console.log("onSuccess", result);
    },
    onError: (error: any) => {
      console.log("error", error)
    },
    retryDelay: 1000,
  });

  useEffect(() => {
    if (renewTable) {
      // getNewAgentData()
      // getNewGroupData()
      setRenewTable(false)
    }
  }, [renewTable])



  const handleAgntAddOrRemoveFromGroup = async (isAdd: boolean) => {
    const requestBody: IChangeAgentGroupMutation = {
      url: `${urlRoot}${API.addOrRemoveDevicesFromGroups}`,
      requestBody: {
        groups: selectedGroupList,
        devices: selectedId,
      },
      isAdd: isAdd,
    }
    if (selectedGroupList.length !== 0 && selectedId.length !== 0) {
      console.log(requestBody)
      await fetchChangeAgentGroup.mutateAsync(requestBody);
      setRenewTable(true)
    } else {
      alert("請選擇電腦或群組")
    }
  }


  const buttonComponent = () => {
    return (
      <Stack direction="row" spacing={2} justifyContent={"right"} height={40} width={"100%"}>
        <Button
          onClick={() => handleAgntAddOrRemoveFromGroup(true)}
          variant="contained" startIcon={<NavigateNextIcon />}>
          新增至以勾選群組
        </Button>
        <Button
          color="error"
          onClick={() => handleAgntAddOrRemoveFromGroup(false)}
          variant="contained" endIcon={<NavigateBeforeIcon />}>
          從以勾選群組移除
        </Button>
      </Stack>
    )
  }

  return (
    <ChildInnerWhiteContainer style={{ display: "flex", flexWrap: "wrap",width:"100%" }}>
      <MainTableBox
        showGroup={true}
        buttonComponent={buttonComponent}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        renewTable={renewTable}
        setRenewTable={setRenewTable}
        selectedGroupList={selectedGroupList}
        setSelectedGroupList={setSelectedGroupList}

      />
    </ChildInnerWhiteContainer>

  )
}

export default Parent