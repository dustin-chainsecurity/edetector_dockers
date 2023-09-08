/** @format */

import React, { useContext, useEffect, useState } from "react";
import { TactionType } from "../../../constant/interfaceBoard";
import { DetectContext } from "../../../AppContext/DetectProvider";
import { Tooltip } from "@mui/material";

interface IIconSelectorProps {
	Icon: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & {
			title?: string | undefined;
		}
	>;
	title: TactionType;
}

// "#2196F3" // be clicked
// "#BDBDBD" // default
// "#757575" // can be used
// "#D32F2F" // stop action

type TbuttonTheme = "#2196F3" | "#BDBDBD" | "#757575" | "#D32F2F";

const IconSelector = (props: IIconSelectorProps) => {
	const { Icon, title } = props;
	const { settingBarShowOptions, setSettingBarShowOptions, selectedId, setDialogOpen } = useContext(DetectContext);


	// const [isClick, setIsClick] = useState(false);
	const [buttonTheme, setButtonTheme] = useState<TbuttonTheme>("#BDBDBD");

	useEffect(() => {
		const handleTheme = () => {
			if(title === settingBarShowOptions && title !== "任務執行"){
				setButtonTheme("#2196F3");
			}
			else if(selectedId.length ===0){
				setButtonTheme("#BDBDBD");
			}
			else if(title === "任務執行"){
				setButtonTheme("#D32F2F");
			}
			else{
				setButtonTheme("#757575");
			}
		};
		handleTheme()

	}, [settingBarShowOptions, selectedId]);

	const handleClick = (title: TactionType) => {
		handleClickStatus(title)
		handleStopAction(title)
	};

	const handleClickStatus =(title: TactionType)=>{
		if(selectedId.length ===0 )return ;
		if(settingBarShowOptions === title){
			setSettingBarShowOptions("");
			return;
		}
		setSettingBarShowOptions(title);
	}

	const handleStopAction = (title: TactionType) => {
		if(selectedId.length ===0 )return ;
		if(title === '任務執行' && selectedId.length !==0){
			setDialogOpen(true);
		}
	}

	return (
		<Tooltip title={title==='任務執行'?'終止任務':title} arrow>
		<div
			onClick={() => {
				handleClick(title);
			}}
		>
			<div style={{ width: 35, height: 35, cursor:'pointer' }}>
				<Icon style={{ width: "100%", fill: buttonTheme }} />
			</div>
		</div>
		</Tooltip>
	);
};

export default IconSelector;
