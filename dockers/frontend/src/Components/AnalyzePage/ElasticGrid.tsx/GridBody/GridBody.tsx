/** @format */

import { Table } from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import { DynamicObject, IelasticQuery } from "..";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useCallback, useMemo, useRef, useState } from "react";
import EnhancedTableBody from "./EnhancedTableBody";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

// column

interface IGridBodyProps {
	columnName: string[];
	gridData: DynamicObject[];
	uidOnHand: IelasticQuery;
	setUidOnHand: React.Dispatch<React.SetStateAction<IelasticQuery>>;
	fetchElasticDetail: UseMutationResult<
		AxiosResponse<any, any>,
		unknown,
		void,
		unknown
	>;
	setReRender: React.Dispatch<React.SetStateAction<boolean>>;
	// queryString: string
	selectedIndexCount: number;
	fetchElasticSearch: UseMutationResult<
		AxiosResponse<any, any>,
		unknown,
		void,
		unknown
	>;
}

const GridBody = (props: IGridBodyProps) => {
	const {
		columnName,
		gridData,
		setUidOnHand,
		fetchElasticDetail,
		uidOnHand,
		setReRender,
		selectedIndexCount,
		fetchElasticSearch,
	} = props;
	const excludeProperties = [
		"uuid",
		"index",
		"item_main",
		"date_main",
		"type_main",
		"etc_main",
	];
	const importantFourProperties = [
		"item_main",
		"date_main",
		"type_main",
		"etc_main",
		"agentIP",
		"agentName",
	];
	const icon = (
		<p
			style={{
				textAlign: "center",
				margin: "20px auto",
				color: "rgba(0, 0, 0, 0.6)",
			}}
		>
			查無此資料
		</p>
	);
	const element = useRef<Element | null>(null);
	const [cellWidth, setCellWidth] = useState<number>(0);
	const observer = useMemo(
		() =>
			new ResizeObserver((entries) => {
				const { contentBoxSize } = entries[0];
				if (contentBoxSize) {
					// Use the content box size if supported
					setCellWidth(contentBoxSize[0].inlineSize);
				} else {
					const rect = entries[0].target.getBoundingClientRect();
					const padding =
						parseFloat(
							getComputedStyle(entries[0].target).paddingLeft
						) +
						parseFloat(
							getComputedStyle(entries[0].target).paddingRight
						);
					setCellWidth(rect.width - padding);
				}
			}),
		[]
	);

	const sizeRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (element.current !== null) {
				observer.unobserve(element.current);
			}
			if (node !== null) {
				element.current = node;
				observer.observe(node);
			}
		},
		[observer]
	);

	return (
		<div
			style={{
				width: "100%",
				overflowX: "auto",
				overflowY: "hidden",
				height: 400,
			}}
		>
			{gridData.length === 0 && !fetchElasticSearch.isLoading && (
				<Box sx={{ height: 180 }}>
					<Box sx={{ display: "flex" }}>
						<Fade in={true} timeout={2000}>
							{icon}
						</Fade>
					</Box>
				</Box>
			)}

			{fetchElasticSearch.isLoading && (
				<div style={{width:"100%",height:"100%"}}>
					<p
						style={{
							width: "100%",
							maxHeight: 200,
							textAlign: "center",
							margin: "20px auto",
							color: "rgba(0, 0, 0, 0.6)",
						}}
					>
						資料查詢中
					</p>
				</div>

			)} 
			{gridData.length !== 0 ? (
				<Table
					stickyHeader
					sx={{
						width: "100%",
						minWidth: 750,
						maxHeight: 100,
						backgroundColor: "white",
						overflow: "scroll",
					}}
					// aria-labelledby="tableTitle"
					size={"medium"}
				>
					<EnhancedTableHead
						columnName={columnName}
						selectedIndexCount={selectedIndexCount}
						excludeProperties={excludeProperties}
						importantFourProperties={importantFourProperties}
						sizeRef={sizeRef}
					/>
					<EnhancedTableBody
						columnName={columnName}
						gridData={gridData}
						setUidOnHand={setUidOnHand}
						fetchElasticDetail={fetchElasticDetail}
						uidOnHand={uidOnHand}
						setReRender={setReRender}
						selectedIndexCount={selectedIndexCount}
						excludeProperties={excludeProperties}
						importantFourProperties={importantFourProperties}
						cellWidth={cellWidth}
					/>
				</Table>
			) : null}
		</div>
	);
};

export default GridBody;

// column 根據es回傳的資料去設定
