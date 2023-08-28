import { useQuery } from '@tanstack/react-query'
import { API, socketRoot, urlRoot } from '../constant';
import GridTable from '../Components/DetectPage/DetectGridTable/GridTable/GridTable';
import { useContext, useEffect, useRef, useState } from 'react';
import CommonHeader from '../Components/CommonConponents/CommonHeader/CommonHeader';
import Error404Page from './ErrorPage/404Page';

import { IDevice, TactionType } from '../constant/interfaceBoard';
import { customData, matchObjects } from '../constant/functionToolbox';
import PartialLoading from '../Components/CommonConponents/PartialLoading/PartialLoading';
import DetectProvider from '../AppContext/DetectProvider';
import { axiosClient } from '../utiles/ProtectedRoutes';
import { AuthContext } from '../AppContext/AuthProvider';
import HorizontalBar from '../Components/DetectPage/HorizontalBar/HorizontalBar';



const DetectPage = () => {
  const { token } = useContext(AuthContext);
  const [activeFetch, setActiveFetch] = useState(false);
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
        return formtedData;
      }
    }
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
          //and if message.type === 'some other else' call setActiveFetch
        }
      };
    }
  }, [socketRef])



  if (fetchQuery.error) return <Error404Page errorMessage='資料庫連線錯誤' />
  if (refreshQuery.error) return <Error404Page />


  return (
    <DetectProvider>
      <div>
        <CommonHeader isDarkTheme={false} />
        <HorizontalBar/>        
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
