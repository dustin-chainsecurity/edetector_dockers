/** @format */
import { useContext, useEffect, useRef, useState } from "react";
import * as R from "ramda";

import { API, socketRoot, urlRoot } from "../constant";
import GridTable from "../Components/DetectPage/DetectGridTable/GridTable/GridTable";
import CommonHeader from "../Components/CommonConponents/CommonHeader/CommonHeader";
import Error404Page from "./ErrorPage/404Page";
import { IDevice, IFormatedDevice } from "../constant/interfaceBoard";
import { customData, matchDiffObjects } from "../constant/functionToolbox";
import DetectProvider from "../AppContext/DetectProvider";
import { AuthContext } from "../AppContext/AuthProvider";
import HorizontalBar from "../Components/DetectPage/HorizontalBar/HorizontalBar";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
import FullLoading from "../Components/CommonConponents/FullLoading/FullLoading";

// 2 types of table data
// 1. raw data → type: IDevice
// 2. formed data → type: IFormatedDevice

const DetectPage = () => {
	const { token } = useContext(AuthContext);
	const [data, setData] = useState<IFormatedDevice[]>([]);


	const {
		data: detectData,
		isLoading: detectLoading,
		isError: detectError,
	} = useGet({
		query: "detectData",
		root: `${urlRoot}`,
		route: `${API.DetectDevices}`,
		refetchInterval: 30000,
	});
	
	const {
		data: refreshData,
		mutate,
		isLoading: refreshLoading,
		isError: refreshError,
	} = usePost();


	// clean data
	useEffect(() => {
		if (detectData?.isSuccess) {
			console.log("detectData", detectData);
			const rawData = detectData.data as IDevice[];
			const handleClean = R.pipe(
				R.map((obj: IDevice) => customData(obj)),  // 整理物件的 raw data
				R.tap((data) => console.log("clean data", data)),
				setData
			);
			handleClean(rawData);
		}
	}, [detectData]);

	// clean refresh data
	useEffect(() => {
		if (refreshData?.isSuccess) {
			console.log("refreshData", refreshData);
			const rawData = refreshData.data as IDevice[];
			const cleanedList = rawData.map((obj: IDevice) => customData(obj));
			const matchedList = matchDiffObjects(
				data,
				cleanedList
			) as IFormatedDevice[];
			console.log("matchedList", matchedList);
			setData(matchedList);
		}
	}, [refreshData]);

	// wss start
	// const socketAddress = socketRoute.local;
	const WebSocketURL = socketRoot;
	const socketRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		const socket = new WebSocket(WebSocketURL);
		socketRef.current = socket;

		socket.onopen = (e) => {
			// fix it after lunch time
			console.log("ws sending token");
			const sockeObject = JSON.stringify({
				authorization: token,
				message: "",
			});
			socket.send(sockeObject);
		};
		socket.onclose = (e) => console.log("ws status", e.type);
		socket.onerror = (e) => {
			console.log("ws onerror :", e);
		};
		return () => {
			// Disconnect from WebSocket server when component unmounts
			socket.close();
		};
	}, []);

	useEffect(() => {
		if (socketRef.current) {
			socketRef.current.onmessage = (event) => {
				const message = JSON.parse(event.data);
				if (message.isSuccess && message.deviceId.length > 0) {
					mutate({
						root: `${urlRoot}`,
						route: `${API.RefreshDevices}`,
						body: { deviceId: message.deviceId },
					});
				}
			};
		}
	}, [socketRef]);

	if (detectError) return <Error404Page errorMessage="資料庫連線錯誤" />;
	if (refreshError) return <Error404Page errorMessage="資料庫更新錯誤" />;

	return (
		<DetectProvider>
			<FullLoading open={detectLoading} />
			<div>
				<CommonHeader isDarkTheme={false} />
				<HorizontalBar setData={setData}/>
				<div
					style={{
						margin: 5,
						padding: 5,
						backgroundColor: "#F5F5F5",
						overflow: "scroll",
					}}
				>
					<GridTable data={data} refreshLoading={refreshLoading} />
				</div>
			</div>
		</DetectProvider>
	);
};

export default DetectPage;

// data maniuplations
// 要資料方式，一次要500筆（硬上限）
// 亮燈的api另外去call
// 因此是否存活會有三種訊號 連線 斷線 未知
