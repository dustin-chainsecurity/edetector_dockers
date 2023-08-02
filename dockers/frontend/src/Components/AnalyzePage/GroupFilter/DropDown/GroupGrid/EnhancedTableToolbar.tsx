import { ChangeEvent, useEffect, useState } from "react"
import { oneHostData } from "../../../../../constant/interfaceBoard"
import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from "../../../../CommonConponents/SearchBar/SearchBar";
interface EnhancedTableToolbarProps {
    selectedHost: string
    selectedId: readonly string[]
    pageData: oneHostData[]
    searchRows: (key: string) => void
    setDataQuery: React.Dispatch<React.SetStateAction<oneHostData[]>>
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { selectedHost, selectedId, pageData, setDataQuery, searchRows } = props
    const [includeIds, setIncludeIds] = useState<string[]>([])
    const [hint, setHint] = useState<string>('搜尋')
    const [key, setKey] = useState<string>('')

    useEffect(() => {
        const groupIds = pageData.map((item) => item.id)
        const includeId = selectedId.filter((item) => groupIds.includes(item))
        setIncludeIds(includeId)
    }, [selectedId, pageData])


    function searchKeyWords(key: string) {
        console.log('search key', key);
        if (key === '') {
            setHint('請輸入關鍵字')
            return;
        }
        searchRows(key)
    }

    function clearSearchKeyWords(key: string) {
        if (key.length === 0) {
            console.log('clear search key successful', pageData.length);
            setDataQuery(pageData)
        }

    }

    const onChangeFunc = (e: ChangeEvent<HTMLInputElement>) => {
        setHint('搜尋')
        setKey(e.target.value)
        clearSearchKeyWords(e.target.value)
    }

    return (
        <div style={{ width: '93%', margin: '8px auto', display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
            <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                <p>{selectedHost}</p>
                <p>{includeIds.length}/{pageData.length}</p>

            </div>
            <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                <SearchBar labelValue={hint} query={key} onChangeFunc={onChangeFunc} onSearchFunc={searchKeyWords} />
            </div>
        </div>
    )
}

export default EnhancedTableToolbar