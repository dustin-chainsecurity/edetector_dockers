import { Checkbox, FormControlLabel, InputAdornment, Menu, MenuItem, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { ChangeEvent, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from "./SearchBar";
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { events } from '@elastic/elasticsearch';



interface EnhancedTableToolbarProps {
    numSelected: number;
    // searchRows: (key: string) => void;
    refreshLoading: boolean;
    activeFetch: boolean;
    originData: string;
    setDataQuery: React.Dispatch<React.SetStateAction<string>>;
    searchKeywordList: string[];
    setSearchKeywordList: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedId:React.Dispatch<React.SetStateAction<string[]>>
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, searchKeywordList, setSearchKeywordList,setSelectedId } = props;
    const [hint, setHint] = useState<string>('搜尋')
    const [key, setKey] = useState<string>('')


    const searchKeyWords = (key: string) => {
        console.log('search key', searchKeywordList);
        if (key === '') {
            setHint('請輸入關鍵字');
            return;
        }
        if (!searchKeywordList.includes(key)) {
            setSearchKeywordList([...searchKeywordList, key]);
            // props.searchRows(key);
        }

    };

    const clearSearchKeyWords = (key: string) => {
        if (key.length === 0) {
            console.log('clear search key successful', props.originData.length);
            props.setDataQuery(props.originData);
        }
    };

    const onChangeFunc = (e: ChangeEvent<HTMLInputElement>) => {
        setHint('搜尋')
        setKey(e.target.value)
        clearSearchKeyWords(e.target.value)
    }


    interface ISubKeywordBoxProps {
        dataForDisplay: string[]
        setDataForDisplay: React.Dispatch<React.SetStateAction<string[]>>;
    }

    const SubKeywordBox = (props: ISubKeywordBoxProps) => {
        const { dataForDisplay, setDataForDisplay } = props

        const handleDelete = (name: string) => {
            let newSubSearchKeywordList = dataForDisplay.filter(
                (item: string) => item !== name
            )
            // 更新fromIndex = 0 並且更新subSearchKeywordList
            setDataForDisplay(newSubSearchKeywordList)
        };
        const subKeywordList = dataForDisplay


        return (
            <Stack direction="row" spacing={1} style={{ marginBottom: 5 }} >
                {subKeywordList.map((item: string, index: number) => {
                    return <Chip key={index} label={item} onDelete={() => { handleDelete(item) }} />
                })}
            </Stack>
        );
    }


    return (
        <Toolbar
            style={{ padding: '5px 5px 5px 10px', backgroundColor: '#F5F5F5' }}
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                <div style={{ width: 200, display: 'flex', alignItems: 'flex-end' }}>
                    {/* <FilterDrop /> */}
                    {/* <FilterAltIcon style={{ color: '#BDBDBD', cursor: 'pointer', marginRight: 10 }} fontSize="large" /> */}
                    <SearchBar labelValue={hint} query={key} onChangeFunc={onChangeFunc} onSearchFunc={searchKeyWords} />
                    <SubKeywordBox
                        dataForDisplay={searchKeywordList}
                        setDataForDisplay={setSearchKeywordList}
                    />
                    {/* {props.refreshLoading && props.activeFetch ? <PartialLoading /> : null} */}
                </div>
            </Typography>
        </Toolbar>
    );
}

