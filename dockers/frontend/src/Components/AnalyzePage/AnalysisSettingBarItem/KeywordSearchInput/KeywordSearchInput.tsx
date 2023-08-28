import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import * as React from 'react';
import Box from '@mui/material/Box';
import { InputAdornment, TextField } from '@mui/material'
import { ChangeEvent } from 'react'




// interface detailObject{
//     agent : string;
//     uuid : string;
//     index : string;
//   }


// const ElasticGrid = (props: IElasticGridProps) => {
//     const { fetchData, setUidOnHand, fetchElasticDetail, setReRender, uidOnHand } = props

interface KeywordSearchInputProps {
    setMainSearchKeyword: React.Dispatch<React.SetStateAction<string>>

}



const KeywordSearchInput = (props: KeywordSearchInputProps) => {
    // 將打勾選項清空
    const { setMainSearchKeyword } = props
    // const [name, setName] = React.useState('');
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch', backgroundColor: '#fff', display: "flex" },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                style={{ backgroundColor: 'white' }}
                sx={{ width: 250 }}
                id="input-with-icon-textfield"
                label={"全域關鍵字"}
                size="small"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMainSearchKeyword(event.target.value); }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon onClick={() => {}} />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );

}


export default KeywordSearchInput
