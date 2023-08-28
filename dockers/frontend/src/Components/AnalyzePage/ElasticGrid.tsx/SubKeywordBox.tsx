import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { events } from '@elastic/elasticsearch';

interface ISubKeywordBoxProps {
    dataForDisplay: any
    setDataForDisplay: React.Dispatch<any>
}

const SubKeywordBox = (props: ISubKeywordBoxProps) => {
    const { dataForDisplay, setDataForDisplay } = props
    const deleteSubKeyword = (afterSelectedLeftListResponseState: any) => {
        setDataForDisplay({ type: "deleteSubKeyword", data: afterSelectedLeftListResponseState })
    }
    const handleDelete = (name:string) => {
        let newSubSearchKeywordList = dataForDisplay.subSearchKeywordList.filter(
            (item: string) => item !== name
        )
        // 更新fromIndex = 0 並且更新subSearchKeywordList
        let afterSelectedLeftListResponseState = {
            fromIndex: 0,
            subSearchKeywordList: newSubSearchKeywordList
        }
        deleteSubKeyword(afterSelectedLeftListResponseState)
    };
    const subKeywordList = dataForDisplay.subSearchKeywordList


    return (
        <Stack direction="row" spacing={1} style={{marginBottom:5}} >
            {subKeywordList.map((item: string, index: number) => {
                return <Chip key={index} label={item} onDelete={()=>{handleDelete(item)}} />
            })}
        </Stack>
    );
}

export default SubKeywordBox