/** @format */

import { useEffect, useState } from "react";
import { API, urlRoot } from "../../../../../constant";
import { useGet } from "../../../../../hooks/useGet";
import { ChildInnerWhiteContainer } from "../../../commonComponent/StyledComponents";
import FormTable, { IDeviceData } from "./Formtable";
import axios from "axios";

interface IRawGroupData {
	id: string;
	ip: string;
	name: string;
	macAddress: string;
	clientUid: string;
	group: string[];
}

const ArrayToString = (data: string[]): string => {
	if (data.length === 0) return "未分類";
	return data.join(",");
};

const Parent = () => {
	const [tableData, setTableData] = useState<IDeviceData[]>([]);
	const { data: defaultData, isLoading: getLoading } = useGet({
		query: "AllGroupDetail",
		root: `${urlRoot}`,
		route: `${API.deviceGroups}`,
	});

	useEffect(() => {
		if (defaultData?.isSuccess) {
			console.log(defaultData.data);
			const formData: IDeviceData[] = defaultData.data?.map(
				(item: IRawGroupData) => {
					const res: IDeviceData = {
						groups: ArrayToString(item.group),
						deviceId: item.id,
						deviceName: item.name,
						address: item.macAddress,
						innerIP: item.ip,
					};
					return res;
				}
			);
			setTableData(formData);
		}
	}, [defaultData]);

	return (
		<ChildInnerWhiteContainer>
			<p>
				群組統計<span>群組{999}</span>
			</p>
			{tableData.length > 0 && <FormTable tableData={tableData} />}
		</ChildInnerWhiteContainer>
	);
};

export default Parent;
