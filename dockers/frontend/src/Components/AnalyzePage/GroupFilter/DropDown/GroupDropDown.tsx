import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material'
import GroupHeader from './GroupHeader';
import GroupNav from './GroupNav';
import GroupGrid from './GroupGrid/GroupGrid';
import { IGenerateGroup, oneHostData } from '../../../../constant/interfaceBoard';
import { useCallback, useEffect, useState } from 'react';
import { DropDownContainer, DropDownLabel } from '../StyledComponents';

interface GroupDropDownProps {
    groups: IGenerateGroup[]
    selectedId: readonly string[];
    setSelectedId: React.Dispatch<React.SetStateAction<readonly string[]>>;
}
export interface IGroupCount {
    group: string
    state: boolean
}
export interface IdIdentify {
    group: string
    ids: string[]
}

const GroupDropDown = (props: GroupDropDownProps) => {
    const { groups, selectedId, setSelectedId } = props
    const [selectedHost, setSelectedHost] = useState<string>('') // 指標，被選擇的群組
    const [renderData, setRenderData] = useState<oneHostData[]>([]); // each page's data
    const [groupCount, setGroupCount] = useState<IGroupCount[]>([]) // count the group's state


    useEffect(() => {  // set the default group
        if (selectedHost === '' && groups.length > 0) {
            console.log('set default group', groups)
            // if(groups[1]){ // 預設如果區分群組了，則選group[1]為使用者分類的第一群
            //     setSelectedHost(groups[1].group)
            // }
            // else{ // 預設如果未區分群組，則選group[0]為全部主機
            //     setSelectedHost(groups[0].group)
            // }
            if(groups[0]){
                setSelectedHost(groups[0].group)
            }
            
        }
    }, [groups])

    useEffect(() => { // filter the data by group name
        const selectedGroup = groups.find((item) => item.group === selectedHost)
        if (selectedGroup) {
            setRenderData(selectedGroup.devices)
        }
    }, [selectedHost])

    const handleSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = renderData.map((n) => n.id);
            setSelectedId(newSelected); // get an array of all the ID

        } else {
            setSelectedId([]);
        }
    }, [renderData, setSelectedId]);

    return (
        <div style={{
            display: 'flex',
            width: "min-content",
            height: "100%",
            marginLeft: 20
        }}>
            <div style={{ height: "100%", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
                主機
            </div>
            <FormControl sx={{ m: 1, width: 200, backgroundColor: 'white',height:"min-content" }} size='small'>
                <Select
                    multiple
                    displayEmpty
                    value={selectedId}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        return (
                            <em>
                                {selected.length === 0 ? '選擇主機' : '已選擇' + selected.length + '台主機'}
                            </em>
                        )
                    }}
                >
                    <div style={{ width: 800, height: 700, display: 'flex', flexWrap: 'wrap' }}>
                        <GroupHeader groupData={groups} groupCount={groupCount} selectedId={selectedId} setSelectedId={setSelectedId} />
                        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                            <GroupNav
                                data={groups} pageData={renderData}
                                selectedHost={selectedHost} setSelectedHost={setSelectedHost}
                                selectedId={selectedId} setSelectedId={setSelectedId}
                                groupCount={groupCount} setGroupCount={setGroupCount}
                            />
                            <GroupGrid
                                allData={groups} data={renderData}
                                selectedHost={selectedHost} setSelectedHost={setSelectedHost}
                                selectedId={selectedId} setSelectedId={setSelectedId}
                                handleSelectAllClick={handleSelectAllClick}
                            />
                        </div>
                    </div>

                </Select>
            </FormControl>
        </div>

    )
}

export default GroupDropDown