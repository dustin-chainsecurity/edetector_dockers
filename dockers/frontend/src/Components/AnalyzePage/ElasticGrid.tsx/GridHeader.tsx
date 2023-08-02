import React, { ChangeEvent } from 'react'
import SearchBar from '../../CommonConponents/SearchBar/SearchBar'

const GridHeader = () => {

    const onChangeFunc = (e: ChangeEvent<HTMLInputElement>) => {
        // setHint('搜尋')
        // setKey(e.target.value)
        // clearSearchKeyWords(e.target.value)
    }

    const searchKeyWords = (key: string) => {
        // console.log('search key', key);
        // if (key === '') {
        //     setHint('請輸入關鍵字');
        //     return;
        // }
        // props.searchRows(key);
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', margin:'0px auto 15px auto' }}>
            <div style={{ width: '50%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>目前篩選之總筆數</p>
                <p>{9999}</p>
                <SearchBar labelValue={'搜尋'} query={'搜尋'} onChangeFunc={onChangeFunc} onSearchFunc={searchKeyWords} />
            </div>

            <div style={{ width: '50%' }}>

            </div>

        </div>
    )
}

export default GridHeader

// 篩選筆數
// 局部搜尋
// 產出報告

interface THeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}


const headCells: readonly THeadCell[] = [
    {
        id: 'ip',
        numeric: false,
        disablePadding: false,
        label: '電腦內部IP',
    }
];

