import { InputAdornment, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { MemorySelectedData } from '../../../constant/interfaceBoard';

interface SearchBarProps {
    labelValue: string
    query: string
    onChangeFunc: (e: ChangeEvent<HTMLInputElement>) => void
    onSearchFunc: (key: string) => void
    fetchElasticSearch?: UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
    dataForDisplay?: any
    setDataForDisplay?: React.Dispatch<any>
    memoryDropDownSelected?: MemorySelectedData
}

const SearchBar = (props: SearchBarProps) => {

    const { labelValue, onChangeFunc, onSearchFunc, query } = props




    return (
        <TextField
            style={{ backgroundColor: 'white' }}
            sx={{ width: 250 }}
            id="input-with-icon-textfield"
            label={labelValue}
            size="small"
            onChange={(e: ChangeEvent<HTMLInputElement>) => { onChangeFunc(e) }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon cursor='pointer' onClick={() => { onSearchFunc(query) }} />
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default SearchBar