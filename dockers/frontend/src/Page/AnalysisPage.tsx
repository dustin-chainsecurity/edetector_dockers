import CommonHeader from "../Components/CommonConponents/CommonHeader/CommonHeader";
import AnalysisSettingBar from "../Components/AnalyzePage/AnalysisSettingBar";
import { useState, useEffect, useReducer } from "react";
import AnalysisPageChart from "../Components/AnalyzePage/AnalysisPageChart";
import {
	oneHostData,
	AllFilesDropDownData,
	ForensicsSelectedData,
	MemorySelectedData,
	IGenerateGroup,
	requestHostData,
	IDateModuleData,
} from "../constant/interfaceBoard";
import { API, elasticChildUrl, elasticRoot, urlRoot } from "../constant";
import LeftSelectList from "../Components/AnalyzePage/LeftSelectList/LeftSelectList";
import {
	axiosClient,
	axiosElastic,
	axiosElasticBoxQuery,
} from "../utiles/ProtectedRoutes";
import ElasticGrid from "../Components/AnalyzePage/ElasticGrid.tsx/ElasticGrid";
import { useMutation } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import { generateUrlAndBodyForElasticsearch } from "../constant/FunctionForElasticsearch/functionToolbox";
import {
	generateLeftListCountQueryList,
	generateDotsListForChartInBoxQuery,
} from "../constant/FunctionForElasticsearch/functionToolbox";
import { generateCleanIndexs } from "../constant/AnalysisPage/functionToolbox";
import RightBar from "../Components/AnalyzePage/RightBar/RightBar";
import { IelasticQuery } from "../Components/AnalyzePage/ElasticGrid.tsx";
import HintWord from "../Components/AnalyzePage/HintWord";

import { IinitialState } from "../constant/interfaceBoard";
import FullLoading from "../Components/CommonConponents/FullLoading/FullLoading";

// interface IinitialState {
//     mainKeyword: string, // 主搜尋關鍵字
//     subSearchKeywordList:string[],
//     fromIndex: number, // 從第幾筆開始
//     size: number, // 一次取得幾筆
//     hostList: string[], // 所有主機列表
//     indexList: (string | IOneNode)[], // 所有index列表
//     timeRange: { // 時間範圍
//         startTime: number,
//         endTime: number
//     },
//     leftSelectedList: { // 左方列表
//         analysisIndex: (string | IOneNode)[],    // 所有index列表
//         selectedIndex: string[]     // 所有被選取的index列表
//     },
//     chartData: any,// 圖表資料
//     tableData: {  // 表格資料
//         // ...
//     },
//     detailData: {  // 詳細資料
//     }
// }

const AnalysisPage = () => {
	const [selectedId, setSelectedId] = useState<readonly string[]>([]); //all devices of selected row
	const [selectedHost, setSelectedHost] = useState<string[]>(["1", "2", "3"]);
	const [selectedHostGroup, setSelectedHostGroup] = useState<string[]>([]);
	const initMemoryDropDownSelected: MemorySelectedData = {
		isMemoryGroupSelected: true,
		processName: "",
		processConnectIP: "",
		dynamicCommand: "",
		processMD5: "",
		processPath: "",
		parentProcessPath: "",
		digitalSign: "",
		importOtherDLL: "",
		processId: "",
		riskLevel: ["三", "四"],
		injectActive: ["非PE程式碼", "無"],
		processBeInjected: ["無"],
		boot: ["AutoRun", "無"],
		hook: ["無"],
		hide: ["File", "無"],
	};
	const initForensicsSelectedData: ForensicsSelectedData = {
		isForensicsSelected: true,
		keywordType: "keywordType",
		keyword: "keyword",
		// browsingHistoryAndBookmarks: true,
		chromeBrowsingHistory: true,
		chromeDownloadHistory: true,
		chromeKeywordSearchHistory: true,
		chromeLoginAccountAndPassword: true,
		chromeBookmarks: true,
		edgeBrowsingHistory: true,
		ieBrowsingHistory: true,
		edgeLoginAccountAndPassword: true,
		ieLoginAccountAndPassword: true,
		edgeBookmarks: true,
		firefoxBrowsingHistory: true,
		firefoxLoginAccountAndPassword: true,
		firefoxBookmarks: true,
		cacheAndCookieHistory: true,
		chromeCache: true,
		chromeCookies: true,
		edgeCache: true,
		edgeCookies: true,
		ieCache: true,
		firefoxCache: true,
		firefoxCookies: true,
		currentNetworkConnectionsHistory: true,
		internetInformation: true,
		unlimitedBasicInformation: true,
		internetResources: true,
		recentlyExecutedSoftwareLog: true,
		softwareInstalled: true,
		detailedSystemServices: true,
		remoteDesktopLoginAccountPassword: true,
		systemInformation: true,
		prefetch: true,
		scheduleWork: true,
		programNetworkTrafficTrace: true,
		dnsInformation: true,
		generalSystemServices: true,
		bootProgram: true,
		jumpList: true,
		muicache: true,
		applicationLogFiles: true,
		machineCodeTraces: true,
		programReadAndWriteTraces: true,
		evanescentRecords: true,
		executeProgram: true,
		fileOpenedByTheProgram: true,
		programConnectionInformation: true,
		arpCache: true,
		recentlyOpenedFileHistory: true,
		relativeShortcuts: true,
		maasterUserProfiles: true,
		windowsActivity: true,
		openFolderPath: true,
		recentlyOpenedFile: true,
		// usbUsageDeviceRecord: true,
		usbDeviceInformation: true,
		syslogFile: true,
		securityLogFile: true,
		// emailListReacord: true,
		emailPath: true,
		emailListRecord: true,
	};
	const initAllFilesDropDownData: AllFilesDropDownData = {
		isAllFilesSelected: true,
		keyPath: "",
		keywordType: "影音檔",
		keywordFileName: "",
		keywordContent: "",
		fileSize: "min",
		fileSizeValue: 0,
		fileUnit: "MB",
		onlySearchDeletedFile: false,
	};
	const initDateModuleData: IDateModuleData = {
		dateModuleData: [
			{ name: "最近24小時", value: 24 },
			{ name: "最近1周", value: 168 },
			{ name: "最近1個月", value: 720 },
			{ name: "自訂", value: 0 },
		],
		startTime: 0,
		endTime: 0,
	};
	const [memoryDropDownSelected, setMemoryDropDownSelected] =
		useState<MemorySelectedData>(initMemoryDropDownSelected);
	const [forensicsSelectedData, setForensicsSelectedData] =
		useState<ForensicsSelectedData>(initForensicsSelectedData);
	const [allFilesDropDownData, setallFilesDropDownData] =
		useState<AllFilesDropDownData>(initAllFilesDropDownData);
	const [dateModuleData, setDateModuleData] =
		useState<IDateModuleData>(initDateModuleData);
	const [mainSearchKeyword, setMainSearchKeyword] = useState<string>("");
	const [groups, setGroups] = useState<IGenerateGroup[]>([]);
	const [uidOnHand, setUidOnHand] = useState<IelasticQuery>({
		uuid: "",
		index: "",
	});
	const [reRender, setReRender] = useState<boolean>(true);
	const [isHideDetail, setIsHideDetail] = useState<boolean>(true);

	//重新排序群組
	const generateGroup = (arr: requestHostData[]): IGenerateGroup[] => {
		const groupMap: Map<string, oneHostData[]> = new Map();
		arr.forEach((item) => {
			if (item.group.length === 0) {
				item.group = ["未分類群組"];  // todo : fix this 
			}
			item.group.forEach((groupName) => {
				const devicesInGroup = groupMap.get(groupName) || [];
				devicesInGroup.push(item);
				groupMap.set(groupName, devicesInGroup);
			});
		});
		const result: IGenerateGroup[] = [];
		groupMap.forEach((devices, groupName) => {
			result.push({ group: groupName, devices: devices });
		});

		const sortedResult = result.sort(); //重新排序空值（未分類群組）在最後
		return sortedResult;
	};

	// For getting groups data
	useEffect(() => {
		const fetchGroups = async () => {
			const fetchData = await axiosClient.get(
				`${urlRoot}${API.deviceGroups}`
			);
			console.log(fetchData.data.data)
			const generateData = generateGroup(fetchData.data.data);
			setGroups(generateData);
		};
		fetchGroups();
	}, []);

	// 取得下方表格資料
	const fetchElasticSearch = useMutation({
		// elastic search entry
		mutationFn: (mutationData: any) => {
			console.log("input", mutationData);
			return axiosElastic.post(mutationData.url, mutationData.body);
		},
		onSuccess: (result) => {
			console.log("onSuccess", result);
			setReRender(true);
		},
		onError: (error: any) => {
			console.log(
				"Error Message",
				error.response.data.error.reason,
				error.response.data.error.index
			);
		},
		retryDelay: 1000,
	});

	// 取得左方列表的數量
	const fetchElasticSearchForLeftListCount = useMutation({
		// elastic search entry
		mutationFn: (mutationData: any) => {
			// console.log("input", mutationData)
			return axiosElasticBoxQuery.post(
				mutationData.url,
				mutationData.requestBody
			);
		},
		onSuccess: (result) => {
			console.log("onSuccess", result);
			// setReRender(true)
		},
		onError: (error: any) => {
			console.log(
				"Error Message",
				error.response.data.error.reason,
				"-----",
				error.response.data.error.index
			);
		},
		retryDelay: 1000,
	});

	// 取得中上圖表的資料
	const fetchElasticSearchForChart = useMutation({
		// elastic search entry
		mutationFn: (mutationData: any) => {
			return axiosElasticBoxQuery.post(
				mutationData.url,
				mutationData.requestBody
			);
		},
		onSuccess: (result) => {
			console.log("onSuccess", result.data.responses);
			setReRender(true);
		},
		onError: (error: any) => {
			console.log(
				"Error Message",
				error.response.data.error.reason,
				"-----",
				error.response.data.error.index
			);
		},
		retryDelay: 1000,
	});

	// 取得右方詳細資料
	const fetchElasticDetail = useMutation({
		// elastic search entry
		mutationFn: () => {
			return axiosElastic.post(
				`${elasticRoot}${uidOnHand.index}/${elasticChildUrl.search}`,
				{
					size: 1,
					query: {
						query_string: {
							fields: ["uuid"],
							query: uidOnHand.uuid,
						},
					},
				}
			);
		},
	});

	const handleSubmit = async () => {
		try {
			// generateDotsListForChartInBoxQuery();
			const cleanIndex = generateCleanIndexs(
				memoryDropDownSelected,
				forensicsSelectedData,
				allFilesDropDownData
			);
			// 用所使用到的indexs生成左方列表node
			// TODO: 這邊要根據單選或複選決定URL 與 request body
			// 產生發送請求至elasticsearch的request body , 1.中下表格 2.中上圖表 3.左方列表

			const mutationDataForTable = generateUrlAndBodyForElasticsearch(
				"normal",
				cleanIndex,
				memoryDropDownSelected,
				selectedId,
				dateModuleData.startTime,
				dateModuleData.endTime,
				mainSearchKeyword
			);
			fetchElasticSearch.mutate(mutationDataForTable);

			const mutationDataForChart = generateDotsListForChartInBoxQuery(
				cleanIndex,
				memoryDropDownSelected,
				selectedId,
				dateModuleData.startTime,
				dateModuleData.endTime,
				mainSearchKeyword
			);
			const leftListCountQueryList = generateLeftListCountQueryList(
				cleanIndex,
				memoryDropDownSelected,
				selectedId,
				dateModuleData.startTime,
				dateModuleData.endTime,
				mainSearchKeyword
			);
			// 發送取得下方 table 資料的請求
			fetchElasticSearch.mutate(mutationDataForTable);
			// 發送取得左方列表數量的請求
			fetchElasticSearchForLeftListCount.mutate(
				leftListCountQueryList
			);
			// 發送取得中上圖表資料的請求
			fetchElasticSearchForChart.mutate(mutationDataForChart);
			const afterResponseState: IinitialState = {
				mainKeyword: mainSearchKeyword,
				subSearchKeywordList: [], // 子搜尋關鍵字重製       //只要subSearchKeywordList有更動，就會觸發fetchElasticSearch
				fromIndex: 0, // 從第幾筆開始
				size: 999, // 一次取得幾筆
				hostList: selectedHost, // 所有主機列表
				indexList: cleanIndex, // 所有index列表
				timeRange: {
					// 時間範圍
					startTime: dateModuleData.startTime,
					endTime: dateModuleData.endTime,
				},
				leftSelectedList: {
					// 左方列表
					analysisIndex: cleanIndex,
					selectedIndex: [],
				},
				chartData: "responseFromElasticsearchForChart", // 圖表資料
				tableData: "responseFromElasticsearchForTable", // 表格資料
				detailData: {
					// 詳細資料
				},
			};
			setReRender(true);
			setDataFromTopAnalysisButton(afterResponseState);
		} catch (error) {
			console.log(error);
		}
	};

	const initialState: IinitialState = {
		mainKeyword: "",
		subSearchKeywordList: [],
		fromIndex: 0, // 從第幾筆開始
		size: 999, // 一次取得幾筆
		hostList: [], // 所有主機列表
		indexList: [], // 所有index列表
		timeRange: {
			// 時間範圍
			startTime: dateModuleData.startTime,
			endTime: dateModuleData.endTime,
		},
		leftSelectedList: {
			// 左方列表
			analysisIndex: [], // 所有index列表
			selectedIndex: [], // 所有被選取的index列表
		},
		chartData: [], // 圖表資料
		tableData: {
			// 表格資料
			// ...
		},
		detailData: {
			// 詳細資料
		},
	};
	const reducer = (state: any, action: any) => {
		const type: string = action.type;
		const data: IinitialState = action.data;
		switch (type) {
			case "setDataFromTopAnalysisButton":
				// 更改 1.左方列表 2.中上圖表 3.中下表格 4.右方詳細資料 , 5.儲存所選取的主機們、時間範圍
				// console.log("更改 1.左方列表 2.中上圖表 3.中下表格 4.右方詳細資料 5.儲存所選取的主機們、時間範圍")
				return {
					...state,
					mainKeyword: data.mainKeyword,
					subSearchKeywordList: [], // 子搜尋關鍵字重製
					fromIndex: 0, // 從第幾筆開始歸零
					size: 999,
					hostList: data.hostList, //儲存主機們
					indexList: data.indexList, // 儲存index們
					timeRange: {
						// 儲存時間範圍
						startTime: data.timeRange.startTime,
						endTime: data.timeRange.endTime,
					},
					leftSelectedList: {
						// ...state.leftSelectedList,
						selectedIndex: [], //左方列表
						analysisIndex: data.leftSelectedList.analysisIndex, //左方列表
					},
					tableData: data.tableData, //中下表格
					chartData: data.chartData, //中上圖表
				};
			case "setDataFromLeftSelectedList":
				// 更改 1.中上圖表 2.中下表格 3.右方詳細資料
				return {
					...state,
					subSearchKeywordList: [], // 子搜尋關鍵字重製
					fromIndex: 0, // 4.累計比數歸零
					leftSelectedList: {
						...state.leftSelectedList,
						selectedIndex: data.leftSelectedList.selectedIndex, //5.紀錄被點選到的左方index
					},
					chartData: data.chartData, //1.中上圖表
					tableData: data.tableData, //2.中下表格
					detailData: {}, //3.右方詳細資料
				};
			case "setDataFromTableRowClick":
				// 更改 1.右方詳細資料
				console.log("更改 1.右方詳細資料");
				console.log(data);
				return {
					...state,
					fromIndex: data.fromIndex, // 4.累計比數歸零
				};

			case "setDataFromTableSearchBar":
				return {
					...state,
					subSearchKeywordList: data.subSearchKeywordList,
					fromIndex: data.fromIndex, // 4.累計比數歸零
				};
			case "deleteSubKeyword":
				return {
					...state,
					subSearchKeywordList: data.subSearchKeywordList,
					fromIndex: data.fromIndex, // 4.累計比數歸零
				};

			default:
				return state;
		}
	};
	const [dataForDisplay, setDataForDisplay] = useReducer(
		reducer,
		initialState
	);

	// 這個function 開始分析按鈕成功從elasticsearch取得資料後
	const setDataFromTopAnalysisButton = (
		afterResponseState: IinitialState
	) => {
		setDataForDisplay({
			type: "setDataFromTopAnalysisButton",
			data: afterResponseState,
		});
	};

	return (
		<div>
			<FullLoading open={fetchElasticSearchForChart.isLoading} />
			<div style={{ height: 136 }}>
				<CommonHeader isDarkTheme={false} />
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr auto",
						flexWrap: "wrap",
						backgroundColor: "#E3F2FD",
						width: "100%",
					}}
				>
					<AnalysisSettingBar
						groups={groups}
						selectedHost={selectedHost}
						setSelectedHost={setSelectedHost}
						selectedHostGroup={selectedHostGroup}
						setSelectedHostGroup={setSelectedHostGroup}
						memoryDropDownSelected={memoryDropDownSelected}
						setMemoryDropDownSelected={setMemoryDropDownSelected}
						forensicsSelectedData={forensicsSelectedData}
						setForensicsSelectedData={setForensicsSelectedData}
						allFilesDropDownData={allFilesDropDownData}
						setallFilesDropDownData={setallFilesDropDownData}
						selectedId={selectedId}
						setSelectedId={setSelectedId}
						dateModuleData={dateModuleData}
						setDateModuleData={setDateModuleData}
						setMainSearchKeyword={setMainSearchKeyword}
					/>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							paddingRight: "10px",
							maxWidth: "10%",
							marginLeft: "20px",
							marginBottom: "10px",
						}}
					>
						<Button
							disabled={
								selectedId.length === 0 ||
								dateModuleData.startTime === 0 ||
								dateModuleData.endTime === 0
							}
							sx={{ minWidth: "150px", maxWidth: "400px" }}
							variant="contained"
							size="large"
							onClick={() => {
								handleSubmit();
							}}
						>
							開始分析
						</Button>
					</div>
				</div>
			</div>

			{dataForDisplay.leftSelectedList.analysisIndex.length === 0 &&
				fetchElasticSearch.isIdle &&
				fetchElasticSearchForLeftListCount.isIdle &&
				fetchElasticSearchForChart.isIdle ? (
				<div
					style={{
						width: "100%",
						height: "calc(100% - 136px)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<HintWord />
				</div>
			) : null}
			{fetchElasticSearch.isIdle ? null : (
				<div
					style={{
						display: "flex",
						width: "99%",
						height: "100%",
						margin: "5px auto",
						// justifyContent:'space-around'
					}}
				>
					{fetchElasticSearchForLeftListCount.isSuccess ? (
						<div
							style={{
								padding: "0px",
								height: "100%",
								width: "280px",
								minWidth: "250px",
								maxHeight: "794px",
								overflow: "auto"
							}}
						>
							<LeftSelectList
								fetchElasticSearchForChart={
									fetchElasticSearchForChart
								}
								fetchElasticSearchForLeftListCount={
									fetchElasticSearchForLeftListCount
								}
								fetchElasticSearch={fetchElasticSearch}
								state={dataForDisplay}
								setDataForDisplay={setDataForDisplay}
								memoryDropDownSelected={
									memoryDropDownSelected
								}
							/>
						</div>
					) : (
						<div></div>
					)}

					{fetchElasticSearchForChart.isSuccess ? (
						<>
							<div
								style={{
									width: reRender ? "80%" : "calc(85% - 300px)",
									maxHeight: "100%",
									display: "flex",
									flexDirection: "column",
									padding: "5px",
									alignItems: 'center'
								}}
							>
								<div
									style={{
										width: "92%",
										height: 150,
										marginRight: "40px",
									}}
								>
									<AnalysisPageChart
										fetchElasticSearchForChart={
											fetchElasticSearchForChart
										}
										state={dataForDisplay}
									/>
								</div>

								<div style={{
									// maxWidth: "99%",
									width:"100%",
								}}>
									{fetchElasticSearch.isIdle ? null : (
										<ElasticGrid
											fetchData={fetchElasticSearch}
											setUidOnHand={setUidOnHand}
											fetchElasticDetail={
												fetchElasticDetail
											}
											setReRender={setReRender}
											uidOnHand={uidOnHand}
											selectedIndexCount={
												dataForDisplay
													.leftSelectedList
													.selectedIndex.length
											}
											dataForDisplay={dataForDisplay}
											setDataForDisplay={
												setDataForDisplay
											}
											memoryDropDownSelected={
												memoryDropDownSelected
											}
										/>
									)}
								</div>
							</div>
							<RightBar
								fetchElasticDetail={fetchElasticDetail}
								reRender={reRender}
								uidOnHand={uidOnHand}
								isHideDetail={isHideDetail}
								setIsHideDetail={setIsHideDetail}
							/>
						</>
					) :null}
				</div>
			)}
		</div>
	);
};

export default AnalysisPage;
