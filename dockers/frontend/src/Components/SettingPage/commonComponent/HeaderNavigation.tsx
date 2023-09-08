/** @format */

import { useContext } from "react";
import { SettingSystemChildren } from "../constant";
import { SettingContext } from "../../../AppContext/SettingProvider";
import { useAlert } from "../../../hooks/useAlert";

interface HeaderNavigationProps {
	header: SettingSystemChildren;
	setHeader: React.Dispatch<React.SetStateAction<SettingSystemChildren>>;
	HeaderList: SettingSystemChildren[];
}
// 設定頁面 - 系統子頁面的header
// 負責切換子頁面

const HeaderNavigation = (props: HeaderNavigationProps) => {
	const { isGlobalDirty } = useContext(SettingContext);
	const { header, setHeader, HeaderList } = props;
	const alert = useAlert().showAlert;

	const leavePage = (item:SettingSystemChildren)=>{
		setHeader(item);
	}

	return (
		<div style={{ display: "flex", width: "80%" }}>
			{HeaderList.map((item, index) => {
				return (
					<p
						style={{
							cursor: "pointer",
							minWidth: 90,
							height: 40,
							padding: 10,
							color: header === item ? "#2196F3" : "#00000099",
							borderBottom:
								header === item
									? "2px solid #2196F3"
									: "2px solid #00000000",
							textAlign: "center",
							boxSizing: "border-box",
						}}
						key={index}
						onClick={
							// 判斷是否有修改過，有修改過需要確認
							() => {
								if (isGlobalDirty) {
									alert("是否要離開此頁面?",()=>{
										leavePage(item)
									})
								} else {
									setHeader(item);
								}
							}
						}
					>
						{item}
					</p>
				);
			})}
		</div>
	);
};

export default HeaderNavigation;
