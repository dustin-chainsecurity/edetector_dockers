import {
  Checkbox,
  TableBody,
  TableCell,
  TableCellProps,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DynamicObject, IelasticQuery } from "..";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface ITableBodyProps {
  gridData: DynamicObject[];
  columnName: string[];
  setUidOnHand : React.Dispatch<React.SetStateAction<IelasticQuery>>
  fetchElasticDetail : UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
}
type MyMap = Map<string, string>;

const EnhancedTableBody = (props: ITableBodyProps) => {
  const { gridData, columnName, setUidOnHand, fetchElasticDetail } = props;
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [MapList, setMapList] = useState<MyMap[]>([]);

  const [tempUidOnHand, setTempUidOnHand] = useState<IelasticQuery>({uuid: '', index: ''}) ;
  
  const isSelected = (uid: string) => selectedId.indexOf(uid) !== -1;
  
  const handleClick = (event: React.MouseEvent<unknown>, uid: string, index:string) => {
    if(tempUidOnHand.index === index && tempUidOnHand.uuid === uid){
      console.log('same') // 相同資料則不發出請求
      return
    }
    setTempUidOnHand({uuid:uid, index:index})
    setUidOnHand({uuid:uid, index:index});
    console.log({uuid:uid, index:index});
  };

  const handleCheckclick = (uid: string) => {
    // if name is selected, remove it from selectedId
    console.log(uid)
    if (isSelected(uid)) {
      setSelectedId(selectedId.filter((item) => item !== uid));
    }
    //if name is not selected, add it to selectedId
    else{
      setSelectedId([uid, ...selectedId]);
    }
  }

  useEffect(() => {
    const handleMapData = () => {
      const cellMap = new Map(columnName.map((item) => [item, ""]));
      const mapData = fillMapFromArray(gridData, cellMap);
      setMapList(mapData);
    };
    handleMapData();
  }, [gridData]);

  return (
    <TableBody sx={{ overflow:'scroll' }}>
      {MapList.map((row, index) => {

        const isItemSelected = isSelected(row.get("uuid")!);
        const labelId = `enhanced-table-checkbox-${index}`;

        const clonedRow= new Map(row); // 複製一個新的map
        clonedRow.delete("uuid"); // 利用新值刪除uuid，並render
        clonedRow.delete("index"); // 利用新值刪除index，並render

        return (
          <TableRow
            hover
            onClick={(event) => handleClick(event, row.get("uuid")!, row.get("index")!)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={labelId}
            selected={isItemSelected}
            sx={{ cursor: "pointer", maxHeight: 150 }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{ "aria-labelledby": labelId }}
                onClick={()=>{handleCheckclick(row.get("uuid")!)}}
              />
            </TableCell>
            {Array.from(clonedRow.values()).map((item, index) => (
              <TableCellComponent
                key={`${labelId}-${item}-${index}`}
                align={"left"}
                onClick={()=>{
                  console.log('span')
                  // 在這裡發出request
                  fetchElasticDetail.mutate()
                }}
              >
                {item}
              </TableCellComponent>
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default EnhancedTableBody;

interface TableCellComponentProps extends TableCellProps {
  align?: "inherit" | "left" | "center" | "right" | "justify";
  children: React.ReactNode;
}

function TableCellComponent({
  align = "left",
  children,
  ...other
}: TableCellComponentProps) {
  return (
    <TableCell 
      align={align} 
      sx={{ width:'auto' }}
      
      {...other}>
        <div
        style={{ 
          width: 200,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
         }} 
        >
          {children}
        </div>

    </TableCell>
  );
}


function fillMapFromArray(objectArray: any[], map: MyMap): MyMap[] {
  // 把array 的值放到map裡面
  const result: MyMap[] = [];
  objectArray.forEach((obj) => {
    const currentMap = new Map<string, string>();
    map.forEach((value, key) => {
      if (obj.hasOwnProperty(key)) {
        currentMap.set(key, obj[key]);
      }
    });
    result.push(currentMap);
  });
  return result;
}
