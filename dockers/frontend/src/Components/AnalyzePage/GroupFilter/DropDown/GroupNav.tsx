import { Box, Checkbox, Stack, TableCell } from "@mui/material"
import { IGenerateGroup, oneHostData } from "../../../../constant/interfaceBoard"
import { useEffect, useState } from "react"
import { IGroupCount } from "./GroupDropDown"
import { areArraysHasOne, areArraysIncluding } from ".."

interface GroupNavProps {
    data: IGenerateGroup[]
    pageData: oneHostData[]
    selectedHost: string
    setSelectedHost: React.Dispatch<React.SetStateAction<string>>
    selectedId: readonly string[]
    setSelectedId: React.Dispatch<React.SetStateAction<readonly string[]>>
    groupCount: IGroupCount[]
    setGroupCount: React.Dispatch<React.SetStateAction<IGroupCount[]>>
}



const GroupNav = (props: GroupNavProps) => {
    const { data, selectedHost, setSelectedHost, selectedId, setSelectedId, groupCount, setGroupCount } = props

    useEffect(() => {
        const groupBoolean = data.map((item) => { return { group: item.group, state: false } })
        setGroupCount(groupBoolean)
    }, [])


    return (
        <div style={{ width: '20%', height: '100%' }}>
            {data.map((item, index) => {
                return (
                    <Stack key={`checkbox_${index}`} style={{ width: '100%' }}>
                        <CheckTitle
                            id={index}
                            text={item.group}
                            data={data}
                            selectedHost={selectedHost}
                            setSelectedHost={setSelectedHost}
                            selectedId={selectedId} setSelectedId={setSelectedId}
                            groupCount={groupCount} setGroupCount={setGroupCount}
                        />
                    </Stack>
                )
            })}
        </div>
    )
}

export default GroupNav

interface CheckTitleProps {
    id: number
    text: string
    data: IGenerateGroup[]
    selectedHost: string
    setSelectedHost: React.Dispatch<React.SetStateAction<string>>
    selectedId: readonly string[]
    setSelectedId: React.Dispatch<React.SetStateAction<readonly string[]>>
    groupCount: IGroupCount[]
    setGroupCount: React.Dispatch<React.SetStateAction<IGroupCount[]>>
}

const CheckTitle = (props: CheckTitleProps) => {
    const { id, text, data, selectedHost, setSelectedHost, selectedId, setSelectedId, groupCount, setGroupCount } = props
    const [checked, setChecked] = useState<boolean>(false); // checked icon
    const [minusCheck, setMinusCheck] = useState<boolean>(false) // minus icon

    const groupData = data.find((item) => item.group === text)
    const groupIds = groupData?.devices.map((item) => item.id) // 這個群組下的所有id


    const handleAllCheck = () => {
        // confirm condition
        // all check
        if (checked) {
            const filterSelect: readonly string[] = selectedId.filter((item) => groupIds?.includes(item) === false)
            setSelectedId([...filterSelect])
        }
        // minus check
        else if (minusCheck) {
            const concatSelect: readonly string[] = selectedId.concat(groupIds as string[])
            const concatSet = new Set(concatSelect)
            const transformArray = Array.from(concatSet) // 處理set轉array的問題，js 會有跨版本
            setSelectedId([...transformArray])
        }
        // canceled
        else if (!checked && !minusCheck) {
            setSelectedId([...selectedId, ...groupIds as string[]])
        }
    }



    useEffect(() => {
        const compareResult = areArraysIncluding(selectedId, groupIds) // selectedId全部被選會是所有裝置 ,allIds被選會是當頁所有id
        setChecked(compareResult)
        if (compareResult) {
            const result = groupCount.map((item, idx) => {
                if (idx === id) {
                    item.state = true
                    return { ...item }
                }
                return { ...item }
            })
            setGroupCount(result)
        }

        const compareMinus = areArraysHasOne(selectedId, groupIds, compareResult) //  只要有一個就回傳true，但不能被全選
        setMinusCheck(compareMinus)
        if (compareMinus) {
            const result = groupCount.map((item, idx) => {
                if (idx === id) {
                    item.state = false
                    return { ...item }
                }
                return { ...item }
            })
            setGroupCount(result)
        }

        if (!compareResult && !compareMinus) {
            const result = groupCount.map((item, idx) => {
                if (idx === id) {
                    item.state = false
                    return { ...item }
                }
                return { ...item }
            })
            setGroupCount(result)
        }
    }, [selectedId])



    return (
        <div
            style={{
                width: '93%',
                backgroundColor: selectedHost === text ? '#E1F5FE' : 'transparent',
                cursor: 'pointer',
                margin: '3px auto',
            }}
            onClick={() => { setSelectedHost(text) }}
        >
            <Checkbox
                color="primary"
                indeterminate={minusCheck}
                checked={checked}
                onChange={handleAllCheck}
                inputProps={{
                    'aria-label': 'select all desserts',
                }}
            />
            <span>{text}</span>
        </div>
    )
}






