import { Checkbox, FormControlLabel, InputAdornment, Menu, MenuItem, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { ChangeEvent, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';




interface EnhancedTableToolbarProps {
    numSelected: number;
    searchRows: (key: string) => void;
    refreshLoading: boolean;
    activeFetch: boolean;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    const [hint, setHint] = useState<string>('搜尋')
    const [key, setKey] = useState<string>('')


    const searchKeyWords = (key: string) => {
        console.log('search key', key);
        if (key === '') {
            setHint('請輸入關鍵字');
            return;
        }
        props.searchRows(key);
    };

    const clearSearchKeyWords = (key: string) => {
        if (key.length === 0) {
            // console.log('clear search key successful', props.originData.length);
            // props.setDataQuery(props.originData);
        }
    };

    const onChangeFunc = (e: ChangeEvent<HTMLInputElement>) => {
        setHint('搜尋')
        setKey(e.target.value)
        clearSearchKeyWords(e.target.value)
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
                <div style={{ width: 400, display: 'flex', alignItems: 'flex-end' }}>
                    {/* <FilterDrop /> */}
                    {/* <FilterAltIcon style={{ color: '#BDBDBD', cursor: 'pointer', marginRight: 10 }} fontSize="large" /> */}
                    {/* <SearchBar labelValue={hint} query={key} onChangeFunc={onChangeFunc} onSearchFunc={searchKeyWords} /> */}
                    {/* {props.refreshLoading && props.activeFetch ? <PartialLoading /> : null} */}
                </div>
            </Typography>
        </Toolbar>
    );
}

