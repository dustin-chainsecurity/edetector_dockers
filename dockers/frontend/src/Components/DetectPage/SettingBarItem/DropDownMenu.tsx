/** @format */

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlert } from "../../../hooks/useAlert";


interface IDropDownMenu {
	paramas : NumberString0To24[];
	onParamChange: React.Dispatch<React.SetStateAction<NumberString0To24[]>>
}

export type NumberString0To24 = "00" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24";
const defaultHours: NumberString0To24[] = [ "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
const AllHourList: NumberString0To24[] = [ "00", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13", "14", "15", "16","17","18","19","20", "21", "22", "23", "24",];


const DropDownMenu: React.FC<IDropDownMenu> = (props:IDropDownMenu) => {
	const { paramas, onParamChange } = props;

	const [ selectedHourList, setSelectedHourList ] = useState<NumberString0To24[]>([]) // for rendering items that can be chosen
	const [ editHourList, setEditHourList ] = useState<NumberString0To24[]>([]) // for rendering selected items that cna be added into the selectedHourList

	// * 拿到'可選擇'選單中的元素
	useEffect(()=>{
		const timeList = localStorage.getItem("timeList");
		console.log('timeList = ',timeList)
		if (timeList) {
			const newTime = JSON.parse(timeList) as NumberString0To24[];
			if (Array.isArray(newTime)) {
				console.log('newTime = ',newTime)
				setSelectedHourList([...newTime]);
			}
		}
		else{
			localStorage.setItem("timeList", JSON.stringify(defaultHours));
			setSelectedHourList(defaultHours);
		}

	},[])

	// * 拿到'增加'選單中的元素
	useEffect(()=>{
		const newEditHourList = AllHourList.filter((item) => !selectedHourList.includes(item))
		setEditHourList(newEditHourList)
	},[selectedHourList])


	// // * 篩選送出的時間參數
	// useEffect(()=>{},[

	// ])

	
	// * 刪除'可選擇'選單中的元素
	const deleteSelectedHourList = (input: NumberString0To24) => {
		// 更新被可以被選擇的時間
		const newSelectedHourList = selectedHourList.filter((item) => item !== input)
		setSelectedHourList(newSelectedHourList)
		localStorage.setItem("timeList", JSON.stringify(newSelectedHourList));
		
		// 如果送出的參數被刪除則從陣列中移除
		if(paramas.includes(input)){
			onParamChange(paramas.filter((item) => item !== input))
		}
	}

	// * 勾選'可選擇'選單中的元素
	const chooseSelectedHourList = (input: NumberString0To24) => {
		if(paramas.includes(input)){
			onParamChange(paramas.filter((item) => item !== input))
		}
		else{
			onParamChange([...paramas, input])
		}
	}


	return (
		<div>
			<FormControl
				sx={{ m: 1, minWidth: 200, maxWidth: 250 }}
				size="small"
			>
				<InputLabel id="demo-multiple-checkbox-label">每日時間</InputLabel>
				<Select
					multiple
					value={selectedHourList}
					input={<OutlinedInput label="每日時間" />}
					renderValue={() => {
						return <div style={{ color:'rgba(0, 0, 0, 0.6)' }}>{paramas.length} 個預定時間</div>;
					}}
					// MenuProps={MenuProps}
				>

				{selectedHourList.map((value, idx) => (
					<MenuItem
						key={`${value}-${idx}-time`}
						value={value}
						style={{ fontSize:'14px', backgroundColor:'#fff'  }}
					>
						<Checkbox 
							checked={paramas.includes(value)} 
							onClick={()=>{chooseSelectedHourList(value)}}
						/>
						<ListItemText primary={`${value}:00`} sx={{ cursor:'default' }}/>
						<span onClick={()=>{deleteSelectedHourList(value)}}>
							<DeleteIcon fontSize="small" />
						</span>
					</MenuItem>
				))}
					<HourSelector hourList={editHourList} selectedHourList={selectedHourList} setSelectedHourList={setSelectedHourList}/>
				</Select>
			</FormControl>
		</div>
	);
};

export default DropDownMenu;

type HourSelectorProps = {
	hourList: NumberString0To24[];
	selectedHourList : NumberString0To24[];
	setSelectedHourList : React.Dispatch<React.SetStateAction<NumberString0To24[]>>;
};

const HourSelector = (props: HourSelectorProps) => {
	const alert = useAlert().showAlert ;
	const { hourList, selectedHourList, setSelectedHourList } = props;
		// * 增加'可選擇'選單中的元素
	const addSelectedHourList = (input: NumberString0To24|undefined) => {
		if(!input){
			alert('請選擇時間')
			return;
		}
		const newSelectedHourList = [...selectedHourList, input]
		setSelectedHourList(newSelectedHourList)
		localStorage.setItem("timeList", JSON.stringify(newSelectedHourList));
	}
	// const targetHour = useRef<NumberString0To24|undefined>(undefined);
	const [targetHour, setTargetHour] = useState<NumberString0To24|undefined>(undefined)

	useEffect(()=>{
		setTargetHour(hourList[0])
	},[selectedHourList, hourList])

	return (
		<div style={{ display:'flex', padding:'6px 30px', alignItems:'center', width:'70%' }}>
		<span 
			style={{ fontSize: "20px", marginRight:'8px', cursor:'pointer', color:'#1E88E5' }}
			onClick={() => { addSelectedHourList(targetHour)}}
		>+</span>
		<div style={{ display:'flex', alignItems:'center', width:'70%', justifyContent:'space-evenly' }}>
			<Select
				size="small"
				displayEmpty
				value={selectedHourList}
				onChange={(e) => {
					const hourValue = e.target.value as NumberString0To24;
					setTargetHour(hourValue)
				}}
				renderValue={(selected) => {
					return <div>{targetHour}</div>;
				}}
			>
				{hourList.map((option:NumberString0To24,id) => (
					<MenuItem 
						key={`${option}-${id}-option`} 
						value={option}
						sx={{ fontSize:'14px', backgroundColor:'#fff'  }}
					>
						{option}
					</MenuItem>
				))}
			</Select>
			<span>:00</span>
		</div>
		</div>
	);
};
