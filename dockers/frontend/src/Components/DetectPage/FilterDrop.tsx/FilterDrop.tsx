import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Checkbox, FormControlLabel, Menu, MenuItem } from '@mui/material';
import { Dispatch, useContext, useState } from 'react';
import { IFormatedDevice, IallCheckedState, TdetectColumn, TdetectColumn_file, TdetectColumn_memory, TdetectColumn_trace } from '../../../constant/interfaceBoard';
import { DetectContext } from '../../../AppContext/DetectProvider';


const FilterDrop = () => {
    const { dectectiveHead } = useContext(DetectContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // checkbox controller
    // const [allChecked, setAllChecked] = useState<IallCheckedState>({
    //     memory: {
    //         mode: true,
    //         name: '記憶體'
    //     },
    //     trace: {
    //         mode: true,
    //         name: '痕跡取證'
    //     },
    //     file: {
    //         mode: true,
    //         name: '檔案總表'
    //     },
    //     image: {
    //         mode: true,
    //         name: '關鍵映像檔完成時間'
    //     }
    // });

    const [memoryAllChecked, setMemoryAllChecked] = useState(true);
    const [memoryList, setMemoryList] = useState<TdetectColumn_memory[]>(['偵測模式', '定期掃描時間', '最近記憶體掃描完成時間']);

    const [traceAllChecked, setTraceAllChecked] = useState(true);
    const [traceList, setTraceList] = useState<TdetectColumn_trace[]>(['定期取證時間', '最近痕跡取證完成時間']);

    const [fileAllChecked, setFileAllChecked] = useState(true);
    const [fileList, setFileList] = useState<TdetectColumn_file[]>(['定期總表下載時間', '最近檔案總表完成時間']);



    return (
        <div>
            <span onClick={handleMenuClick} style={{ display: 'flex', alignItems: 'flex-end' }}>
                <FilterAltIcon
                    style={{ color: '#BDBDBD', cursor: 'pointer', marginRight: 10 }}
                    fontSize="large"
                />
            </span>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div>
                    {/* <FirstMenuItem title='記憶體' allChecked={memoryAllChecked} setAllChecked={setMemoryAllChecked} setMemoryList={setMemoryList} /> */}
                    {/* <SecondMenuItem titleMemory='偵測模式' allChecked={memoryAllChecked} memoryList={memoryList} setMemoryList={setMemoryList} /> */}
                    {/* <SecondMenuItem titleMemory='定期掃描時間' allChecked={memoryAllChecked} memoryList={memoryList} setMemoryList={setMemoryList} /> */}
                    {/* <SecondMenuItem titleMemory='最近記憶體掃描完成時間' allChecked={memoryAllChecked} memoryList={memoryList} setMemoryList={setMemoryList} /> */}
                    <ChildMenuItem titleMemory='偵測模式' id='detectionMode' />
                    <ChildMenuItem titleMemory='定期掃描時間' id='scanSchedule' />
                    <ChildMenuItem titleMemory='最近記憶體掃描完成時間' id='scanFinishTime' />
                </div>
                <div>
                    {/* <FirstMenuItem title='痕跡取證' allChecked={traceAllChecked} setAllChecked={setTraceAllChecked} setTraceList={setTraceList} /> */}
                    {/* <SecondMenuItem titleTrace='定期取證時間' allChecked={traceAllChecked} traceList={traceList} setTraceList={setTraceList} /> */}
                    {/* <SecondMenuItem titleTrace='最近痕跡取證完成時間' allChecked={traceAllChecked} traceList={traceList} setTraceList={setTraceList} /> */}
                </div>
                {/* <div>
                    <FirstMenuItem title='檔案總表' />
                    <SecondMenuItem titleFile='定期總表下載時間' />
                    <SecondMenuItem titleFile='最近檔案總表完成時間' />
                </div> */}
                {/* <div>
                    <FirstMenuItem title='關鍵映像檔完成時間' />
                </div> */}


            </Menu>
        </div>
    )
}

export default FilterDrop

interface FirstMenuItemProps {
    title: TdetectColumn;
    // allChecked: IallCheckedState
    // setAllChecked?: React.Dispatch<React.SetStateAction<IallCheckedState>>;
    allChecked: boolean;
    setAllChecked: React.Dispatch<React.SetStateAction<boolean>>;

    setMemoryList?: Dispatch<React.SetStateAction<TdetectColumn_memory[]>>

    setTraceList?: Dispatch<React.SetStateAction<TdetectColumn_trace[]>>
}

const FirstMenuItem = ({ title, allChecked, setAllChecked, setMemoryList, setTraceList }: FirstMenuItemProps) => {

    return (
        <MenuItem>
            <FormControlLabel control={
                <Checkbox
                    value={title}
                    size='small'
                    checked={allChecked}
                    onChange={(e) => {
                        setAllChecked!(prev => !prev)
                        console.log('get data,', e.target.checked);
                        if (!allChecked) {
                            if (title === '記憶體') {
                                setMemoryList!(['偵測模式', '定期掃描時間', '最近記憶體掃描完成時間'])
                            }
                            else if (title === '痕跡取證') {
                                setTraceList!(['定期取證時間', '最近痕跡取證完成時間'])
                            }

                        }
                    }
                    }
                />} label={title} />
        </MenuItem>
    )
}


interface SecondMenuItemProps {
    titleMemory?: TdetectColumn_memory;
    titleTrace?: TdetectColumn_trace;
    titleFile?: TdetectColumn_file;
    allChecked: boolean;

    memoryList?: TdetectColumn_memory[];
    setMemoryList?: Dispatch<React.SetStateAction<TdetectColumn_memory[]>>

    traceList?: TdetectColumn_trace[];
    setTraceList?: Dispatch<React.SetStateAction<TdetectColumn_trace[]>>
}

const SecondMenuItem = ({ titleMemory, titleTrace, titleFile, allChecked, memoryList, setMemoryList, traceList, setTraceList }: SecondMenuItemProps) => {

    const title = titleMemory || titleTrace || titleFile;
    const initBoolFunc = (title: TdetectColumn_memory | TdetectColumn_trace | TdetectColumn_file) => {
        if (title === titleMemory && memoryList) {
            return memoryList.includes(title)
        }
        if (title === titleTrace && traceList) {
            return traceList.includes(title)
        }
        return false
    }
    // const initBool = title === titleMemory && title ? memoryList.includes(title) : false
    const initBool = title ? initBoolFunc(title) : false;
    const [checked, setChecked] = useState<boolean>(initBool);

    return (

        <MenuItem>
            <span style={{ width: 20 }}></span>
            <FormControlLabel control={
                <Checkbox
                    size='small'
                    checked={allChecked ? true : checked}
                    disabled={allChecked}
                    onChange={(e) => {
                        setChecked(e.target.checked)
                        if (checked && memoryList) {
                            const FilterList = memoryList.filter(item => item !== title)
                            // FilterList.length > 0 && FilterList ? setMemoryList(FilterList) : setMemoryList!(['偵測模式', '定期掃描時間', '最近記憶體掃描完成時間'])

                        }
                        // if (!checked) {
                        //     if (titleMemory) {
                        //         setMemoryList([...memoryList, titleMemory])
                        //     }
                        // }
                        console.log(memoryList);
                    }}
                />
            } label={title} />
        </MenuItem>
    )

}


interface ChildMenuItemProps {
    titleMemory?: TdetectColumn_memory;
    titleTrace?: TdetectColumn_trace;
    titleFile?: TdetectColumn_file;
    id: keyof IFormatedDevice;
}

const ChildMenuItem = ({ titleMemory, titleTrace, titleFile, id }: ChildMenuItemProps) => {
    const title = titleMemory || titleTrace || titleFile;
    // const initBool = title ? initBoolFunc(title) : false;
    const [checked, setChecked] = useState<boolean>(false);
    return (
        <MenuItem>
            <span style={{ width: 20 }}></span>
            <FormControlLabel control={
                <Checkbox
                    size='small'
                    checked={checked}
                    // disabled={allChecked}
                    onChange={(e) => {
                        setChecked(e.target.checked)
                    }}
                />
            } label={title} />
        </MenuItem>
    )
}