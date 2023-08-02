import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material'
import GroupHeader from './GroupHeader';
import GroupNav from './GroupNav';
import GroupGrid from './GroupGrid/GroupGrid';
import { IGenerateGroup, oneHostData } from '../../../../constant/interfaceBoard';
import { useCallback, useEffect, useState } from 'react';

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
            setSelectedHost(groups[0].group)
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
        <div style={{ minWidth: 200, display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <p>主機</p>
            <FormControl sx={{ m: 1, width: '70%', top: '4px' }}>
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