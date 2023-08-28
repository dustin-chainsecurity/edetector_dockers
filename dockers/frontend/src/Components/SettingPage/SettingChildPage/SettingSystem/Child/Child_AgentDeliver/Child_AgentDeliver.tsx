/** @format */

import { useForm } from "react-hook-form";
import {
	HookFormSubmit,
	HookFormSubmitContainer,
} from "../../../../../CommonConponents/FormInput/StyledComponent";
import FormInputByHooks from "../../../../../CommonConponents/FormInput/FormInputByHooks";
import {
	CommonHoriLine,
	CommonTitle,
} from "../../../../../CommonConponents/CommonStyledComponent";
import SelectInputByHooks from "../../../../../CommonConponents/FormInput/SelectInputByHooks";
import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { IPTable } from "./IPTable";

const mockIPData = [
	["192.168.1.1", "192.168.1.99"],
	["192.168.2.1", "192.168.2.99"],
	["192.168.3.1", "192.168.3.99"],
	["192.168.1.1", "192.168.1.99"],
	["192.168.2.1", "192.168.2.99"],
	["192.168.3.1", "192.168.3.99"],
	["192.168.1.1", "192.168.1.99"],
	["192.168.2.1", "192.168.2.99"],
	["192.168.3.1", "192.168.3.99"],
	["192.168.1.1", "192.168.1.99"],
	["192.168.2.1", "192.168.2.99"],
	["192.168.3.1", "192.168.3.99"],
	["192.168.1.1", "192.168.1.99"],
	["192.168.2.1", "192.168.2.99"],
	["192.168.3.1", "192.168.3.99"],
	["192.168.1.1", "192.168.1.99"],
	["192.168.2.1", "192.168.2.99"],
	["192.168.3.1", "192.168.3.99"],
	["192.168.1.1", "192.168.1.99"],
	["192.168.2.1", "192.168.2.99"],
	["192.168.3.1", "192.168.3.99"],
	["192.168.1.1", "192.168.1.99"],
	["192.168.2.1", "192.168.2.99"],
	["192.168.3.1", "192.168.3.99"],
];

const Child_AgentDeliver = () => {
	const [selectedId, setSelectedId] = useState<readonly string[]>([]);
	const [listData, setListData] = useState<string[][]>([]);

	const [IPhead, setIPhead] = useState<string>("");
	const [IPTail, setIPTail] = useState<string>("");
	const [isIP, setIsIP] = useState<boolean>(false);

	useEffect(() => {
		// * testingStart = 10.0.0.0
		// *  testingEnd = '10.255.255.255';
		function isIPValid(ip: string): boolean {
			const ipParts = ip.split(".").map((part) => parseInt(part, 10));
			if (ipParts.length !== 4) {
				return false; // IP必須由4個位元組組成
			}
			for (const part of ipParts) {
				if (isNaN(part) || part < 0 || part > 255) {
					return false; // 每個位元組的值必須在0到255之間
				}
			}
			return true;
		}

		function isIPRangeValid(startRange: string, endRange: string): boolean {
			if (!isIPValid(startRange) || !isIPValid(endRange)) {
				return false; // 起始範圍和結束範圍必須是合法的IP地址
			}
			const startParts = startRange
				.split(".")
				.map((part) => parseInt(part, 10));
			const endParts = endRange
				.split(".")
				.map((part) => parseInt(part, 10));
			for (let i = 0; i < 4; i++) {
				if (endParts[i] < startParts[i]) {
					return false; // endRange 必須大於等於 startRange
				}
			}
			return true;
		}
		if (isIPRangeValid(IPhead, IPTail)) {
			// console.log(`IP範圍有效：${IPhead} 到 ${IPTail}`);
			setIsIP(true);
		} else {
			// console.log(`IP範圍無效：${IPhead} 到 ${IPTail}`);
			setIsIP(false);
		}
	}, [IPhead, IPTail]);

	useEffect(() => {
		setListData(mockIPData);
	}, []);

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isDirty, isValid },
	} = useForm({ mode: "onChange" });

	const onSubmit = (data: any) => {
		alert(JSON.stringify(data));
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ display: "flex", flexWrap: "wrap" }}
			>
				<CommonTitle>預先執行任務</CommonTitle>
				<FormInputByHooks
					control={control}
					title="帳號"
					name="portAccount"
				/>
				<FormInputByHooks
					control={control}
					title="密碼"
					name="portPassword"
				/>

				<div style={{ width: "100%", display: "flex" }}>
					<SelectInputByHooks
						control={control}
						title="認證方式"
						name="AccreditationMethod"
						label="AccreditationMethod"
						formControlWidth={100}
						fullWidthPX={40}
						returnToZero={true}
					>
						<MenuItem value="RDT">RDT</MenuItem>
						<MenuItem value="SSH">SSH</MenuItem>
					</SelectInputByHooks>
					<FormInputByHooks
						control={control}
						title="埠"
						name="AccreditationPort"
						partWidthPX={100}
						fullWidthPX={20}
						flexClose={true}
					/>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						width: "700px",
					}}
				>
					<p style={{ marginRight: "100px" }}>IP 範圍 :</p>
					<TextField
						variant="outlined"
						size="small"
						hiddenLabel
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => {
							setIPhead(e.target.value);
						}}
					/>
					<span style={{ margin: "0px 10px" }}> - </span>
					<TextField
						variant="outlined"
						size="small"
						hiddenLabel
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => {
							setIPTail(e.target.value);
						}}
					/>
					<Button
						variant="outlined"
						size="small"
						sx={{ color: "rgb(33, 150, 243)", margin: "0px 10px" }}
						disabled={!isIP}
						onClick={() => {
							setListData([...listData, [IPhead, IPTail]]);
						}}
					>
						新增
					</Button>
				</div>

				<IPTable
					IPData={listData}
					selectedId={selectedId}
					setSelectedId={setSelectedId}
				/>

				<CommonHoriLine />
				<HookFormSubmitContainer>
					<HookFormSubmit
						type="submit"
						disabled={!isDirty || !isValid}
						value={isSubmitting ? "儲存中..." : "儲存"}
					/>
				</HookFormSubmitContainer>
			</form>
		</div>
	);
};

export default Child_AgentDeliver;
