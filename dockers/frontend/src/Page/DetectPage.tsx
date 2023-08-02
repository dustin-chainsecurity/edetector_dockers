import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  useQueries,
} from '@tanstack/react-query'
import axios from 'axios';
import { API, socketRoot, urlRoot } from '../constant';
import GridTable from '../Components/DetectPage/DetectGridTable/GridTable/GridTable';
import SelectFilter from '../Components/SelectFilter';
import { useContext, useEffect, useRef, useState } from 'react';
import CommonHeader from '../Components/CommonConponents/CommonHeader/CommonHeader';
import Error404Page from './ErrorPage/404Page';
import SettingBar from '../Components/SettingBar'
import SettingBarWithDate from '../Components/SettingBarWithDate'

import { IConnectStatus, IDataFlow, IDevice, IFormtedConnectStatus, IFormatedDevice, TactionType, ITimeForm } from '../constant/interfaceBoard';
import { customConnectedData, customData, matchObjects } from '../constant/functionToolbox';
import PartialLoading from '../Components/CommonConponents/PartialLoading/PartialLoading';
// import { axiosClient } from '../api/api';
import DetectProvider, { DetectContext } from '../AppContext/DetectProvider';
import { axiosClient } from '../utiles/ProtectedRoutes';
import { AuthContext } from '../AppContext/AuthProvider';
import { url } from 'inspector';



const DetectPage = () => {
  const { token } = useContext(AuthContext);
  const [activeFetch, setActiveFetch] = useState(false);
  const [settingBarShowOptions, setSettingBarShowOptions] = useState<TactionType>("");
  const [responseID, setResponseID] = useState<string[]>([]);


  const fetchQuery = useQuery({
    queryKey: ["detectData"],
    queryFn: async () => {
      const res = await axiosClient.get(`${urlRoot}${API.DetectDevices}`);
      if (res.data.isSuccess) {
        const formtedData = res.data.data.map((obj: IDevice, index: number) => {
          const res_1 = customData(obj);
          return { ...res_1, id: index + 1 };
        }) ?? [];
        // setGridData(formtedData);
        return formtedData;
      }
    },
    refetchInterval: 30000
  })


  const refreshQuery = useQuery({
    queryKey: ["detectDataRefresh", responseID],
    queryFn: async () => {
      const res = await axiosClient.post(`${urlRoot}${API.RefreshDevices}`, { deviceId: responseID });
      setActiveFetch(false);
      const formatedData = res.data.data.map((obj: IDevice) => {
        const res_1 = customData(obj);
        return { ...res_1 };
      }) ?? [];
      const resultData = matchObjects(fetchQuery.data, formatedData);
      return resultData;
    },
    enabled: activeFetch && responseID.length !== 0
  })



  // wss start 
  // const socketAddress = socketRoute.local;
  const WebSocketURL = socketRoot;
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WebSocketURL);
    socketRef.current = socket;

    socket.onopen = (e) => { // fix it after lunch time
      console.log('ws sending token');
      const sockeObject = JSON.stringify({
        authorization: token,
        message: ''
      })
      socket.send(sockeObject)
    }
    socket.onclose = (e) => console.log("ws status", e.type);
    socket.onerror = (e) => {
      console.log('ws onerror :', e);
    }
    return () => {
      socket.close(); // Disconnect from WebSocket server when component unmounts
    }
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.isSuccess && message.deviceId.length > 0) {
          setResponseID(message.deviceId);
          if (message.deviceId.length !== 0) {
            setActiveFetch(true)
          }
        }//and if message.type === 'some other else' call setActiveFetch
      };
    }
  }, [socketRef])



  if (fetchQuery.error) return <Error404Page errorMessage='資料庫連線錯誤' />
  if (refreshQuery.error) return <Error404Page />


  return (
    <DetectProvider>
      <div>

        <CommonHeader isDarkTheme={false} />

        {/* <p>我是假的ws觸發按鈕 ：請點我<button onClick={() => {
          setActiveFetch(true)
          setResponseID(['AAA-123'])
        }}>click</button>
        </p> */}

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', padding: '5px' }} >
          <SelectFilter title="記憶體" isOption={true} isThemeColor={true} settingBarShowOptions={settingBarShowOptions} setSettingBarShowOptions={setSettingBarShowOptions} />
          <SelectFilter title="痕跡取證" isOption={true} isThemeColor={true} settingBarShowOptions={settingBarShowOptions} setSettingBarShowOptions={setSettingBarShowOptions} />
          <SelectFilter title="檔案總表" isOption={true} isThemeColor={true} settingBarShowOptions={settingBarShowOptions} setSettingBarShowOptions={setSettingBarShowOptions} />
          <SelectFilter title="關鍵映像檔" isOption={false} isThemeColor={true} settingBarShowOptions={settingBarShowOptions} setSettingBarShowOptions={setSettingBarShowOptions} />
          <SelectFilter title="任務執行" isOption={false} isThemeColor={false} settingBarShowOptions={settingBarShowOptions} setSettingBarShowOptions={setSettingBarShowOptions} />
        </div>

        {settingBarShowOptions === "記憶體" && <SettingBar />}
        {settingBarShowOptions === "痕跡取證" && <SettingBarWithDate settingBarShowOptions={settingBarShowOptions} />}
        {settingBarShowOptions === "檔案總表" && <SettingBarWithDate settingBarShowOptions={settingBarShowOptions} />}
        <div style={{ margin: 5, padding: 5, backgroundColor: '#F5F5F5', overflow: 'scroll' }}>
          {fetchQuery.isLoading ? <PartialLoading /> : <GridTable data={fetchQuery.data}
            connectData={refreshQuery.data ? refreshQuery.data : []}
            refreshLoading={refreshQuery.isFetched} activeFetch={activeFetch} />}
        </div>

      </div>
    </DetectProvider>
  )
}

export default DetectPage

// data maniuplations


// 要資料方式，一次要500筆（硬上限）
// 亮燈的api另外去call
// 因此是否存活會有三種訊號 連線 斷線 未知
