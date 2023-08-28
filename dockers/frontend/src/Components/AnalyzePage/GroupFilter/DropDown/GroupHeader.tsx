import { useEffect, useState } from 'react'
import { IGenerateGroup } from '../../../../constant/interfaceBoard'
import { IGroupCount } from './GroupDropDown'
import { Button } from '@mui/material'

interface GroupHeaderProps {
    groupData: IGenerateGroup[]
    groupCount: IGroupCount[]
    selectedId: readonly string[]
    setSelectedId: React.Dispatch<React.SetStateAction<readonly string[]>>
}

const GroupHeader = (props: GroupHeaderProps) => {
    const { groupData, groupCount, selectedId, setSelectedId } = props;
    const [count, setCount] = useState<number>(0);
    const [totalDevices, setTotalDevices] = useState<number>(0);

    useEffect(() => {
        const groupSet = groupData.map((item) => item.devices.map((item) => item.id))  // get all the id
        const flatGroupSet = groupSet.flat() // flat the ID array
        const GroupSetLength = new Set(flatGroupSet).size // get the length of all the ID
        setTotalDevices(GroupSetLength)
    }, [])

    useEffect(() => {
        const stateCount = groupCount.filter((item) => item.state === true)
        setCount(stateCount.length)
    }, [groupCount])


    return (
        <div style={{ width: '100%', margin: '3px auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <div style={{ width: '80%', display: 'flex' }}>
                <p style={{ color: 'rgb(0 0 0 / 60%)' }}>已勾選</p>
                <p style={{ marginLeft: 10 }}>{`群組 ${count}/${groupData.length}`}</p>
                <p style={{ marginLeft: 10 }}>{`電腦 ${selectedId.length}/${totalDevices}`}</p>
            </div>
            <div>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => { setSelectedId([]) }}
                >
                    清除
                </Button>
            </div>
        </div>
    )
}

export default GroupHeader