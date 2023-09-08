import { ChildInnerWhiteContainer } from '../../../commonComponent/StyledComponents'
import MainTableBox from '../../../commonComponent/AgentTable/MainTableBox'
import { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { API, urlRoot } from '../../../../../constant';
import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../../../../../utiles/ProtectedRoutes';


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


  const removeAgentFromList = () => {
    return (
      <Stack direction="row" spacing={2} justifyContent={"right"} height={40} width={"100%"}>
        <Button
          color="error"
          onClick={() => removeSelectedAgent()}
          variant="contained"
        >
          移除用戶端
        </Button>
      </Stack>
    )
  }
  const removeSelectedAgent = async () => {
    console.log("todo 移除 selectedId")

  }



  return (
    <ChildInnerWhiteContainer style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      <MainTableBox
        showGroup={false}
        buttonComponent={removeAgentFromList}
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