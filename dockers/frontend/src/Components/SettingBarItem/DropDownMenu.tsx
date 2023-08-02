
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
interface ChildProps {
    onParamChange: (param: string[]) => void
}


const names = [
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
];


const DropDownMenu: React.FC<ChildProps> = ({ onParamChange }) => {
    const [itemsInMenu, setItemsInMenu] = useState<string[]>(() => {
        const timeList = localStorage.getItem('timeList');
        if (timeList) {
            const newTime = JSON.parse(timeList);
            if (Array.isArray(newTime)) {
                return newTime;
            }
        }
        return names;
    });

    // const [itemsInMenu, setItemsInMenu] = useState<string[]>(names)
    const [selectedItemInMenu, setSelectedItemInMenu] = useState<string[]>([])
    const [personName, setPersonName] = useState<string[]>([]);
    const [editItem, setEditItem] = useState<string>('')
    let itemsInMemuVariable: string[] = names;



    // 控制 checkbox 狀態
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    // 將選項從下拉選單中移除
    const deleteItemFromMenu = (input: string) => {
        console.log('delete', input)
        let newListInMenu = []
        for (let i = 0; i < itemsInMenu.length; i++) {
            if (itemsInMenu[i] !== input) {
                newListInMenu.push(itemsInMenu[i])
            }
        }
        newListInMenu.sort()
        itemsInMemuVariable = newListInMenu
        setItemsInMenu(newListInMenu)
        // 刪除選項的同時將選項從以選清單中移除
        let newList = selectedItemInMenu.filter(word => word !== input)
        setSelectedItemInMenu(newList)
    }

    // 新增選項到下拉選單中
    const addItmeIntoItemsInMenu = (input: string) => {
        let newList = []
        for (let i = 0; i < itemsInMenu.length; i++) {
            newList.push(itemsInMenu[i])
        }
        // 新增 item 到 itemsInMemuVariable 變數中
        itemsInMemuVariable.push(input)
        if (!newList.includes(input)) {
            newList.push(input)
        }
        newList.sort()
        setItemsInMenu(newList)
    }

    // 判斷Item是否有被加入到selectedItemInMenu陣列中，如果有的畫移除，如果沒有的話加入
    const addOrRemoveItemFromSelectedItemInMenu = (input: string) => {
        let tempList = selectedItemInMenu.map(x => x)
        if (itemsInMemuVariable.includes(input)) {
            console.log("點選或取消")
            console.log(itemsInMenu)
            if (selectedItemInMenu.includes(input)) {
                tempList = tempList.filter(word => word !== input)
                setSelectedItemInMenu(tempList)
            } else {
                tempList = addIntoListAndUnique(tempList, input)
                setSelectedItemInMenu(tempList)
            }
        }
        onParamChange(tempList)
        console.log(tempList)
    }

    // 將 item 加入 list 中，並判斷 list 中是否有item，避免重複
    function addIntoListAndUnique(list: string[], item: string) {
        if (list.includes(item)) { return list }
        list.push(item)
        return list
    }



    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">每日時間</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="每日時間" />}
                    renderValue={() => {
                        let text: string = ""
                        if (selectedItemInMenu.length === 1) {
                            text = selectedItemInMenu[0]
                        } else {
                            text = selectedItemInMenu.join()
                        }
                        return <div>{text}</div>
                    }}
                    MenuProps={MenuProps}
                >
                    {itemsInMenu.map((name) => (
                        <MenuItem key={name} value={name} onClick={() => addOrRemoveItemFromSelectedItemInMenu(name)}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                            <div onClick={() => deleteItemFromMenu(name)}>
                                <DeleteIcon fontSize='small' />
                            </div>
                        </MenuItem>
                    ))}
                    <div onClick={(e) => { console.log(e.target) }}>
                        <span style={{ fontSize: "20px" }} onClick={() => {
                            // console.log(editItem)
                            addItmeIntoItemsInMenu(editItem)
                        }}>+</span>
                        <input type="text" maxLength={4} placeholder={"請輸入欲設定時間(ex:1100)"} onChange={(e) => {
                            console.log(e.target.value)
                            // setEditItem(e.target.value)
                        }} />
                    </div>
                </Select>
            </FormControl>
        </div>
    );
}



export default DropDownMenu