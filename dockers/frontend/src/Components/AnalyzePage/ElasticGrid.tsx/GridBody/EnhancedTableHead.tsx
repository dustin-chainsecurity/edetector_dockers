// import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { visuallyHidden } from '@mui/utils';
// import { useEffect, useState } from "react";

import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { useEffect, useState } from "react";



interface EnhancedTableProps {
  columnName : string[]
}

const EnhancedTableHead = (props:EnhancedTableProps) => {
  const { columnName } = props
  const [reList, setReList] = useState<string[]>([])

  useEffect(()=>{
    const filteredColumns = columnName.filter((item) => item !== 'uuid' && item !== 'index'); // 這兩個變數不需要被印出來
    const newArr = capitalizeFirstWord(filteredColumns)
    setReList(newArr)
  },[columnName])


  return (
    <TableHead>
        <TableRow>
            <TableCell padding="checkbox"/>
            {reList.map((headCell, idx) => (
                <TableCell
                    key={`${idx}headcell`}
                    align='left'
                    sx={{ position:'fix', top:0 }}
                >
                    <TableSortLabel
                        // active={orderBy === headCell.id}
                        // direction={orderBy === headCell.id ? order : 'asc'}
                        // IconComponent={ArrowDropDownIcon}
                        // onClick={createSortHandler(headCell.id)}
                    >
                        <span style={{ fontWeight:'bold' }}>{headCell}</span>
                    </TableSortLabel>
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
);
}

export default EnhancedTableHead

function capitalizeFirstWord(arr: string[]) {
  return arr.map((str) => {
    const regex = /^[A-Za-z]+/;
    const match = str.match(regex);
    if (match) {
      const firstWord = match[0];
      const capitalizedWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
      return str.replace(regex, capitalizedWord);
    } else {
      return str;
    }
  });
}