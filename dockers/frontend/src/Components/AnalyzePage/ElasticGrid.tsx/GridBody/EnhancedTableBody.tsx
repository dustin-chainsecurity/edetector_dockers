import {
  Checkbox,
  TableBody,
  TableCell,
  TableCellProps,
  TableRow,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { DynamicObject, IelasticQuery } from "..";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { formatTimestamp } from "../../../../constant/functionToolbox";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { ifError } from "assert";

interface ITableBodyProps {
  gridData: DynamicObject[];
  columnName: string[];
  uidOnHand: IelasticQuery;
  setUidOnHand: React.Dispatch<React.SetStateAction<IelasticQuery>>;
  fetchElasticDetail: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    void,
    unknown
  >;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIndexCount: number;
  excludeProperties: string[];
  importantFourProperties: string[];
}

interface AllRowsProps {
  data: DynamicObject[];
  index: number;
  style: React.CSSProperties;
}

// const excludeProperties = ["uuid", "index"];
// const importantFourProperties = ["item_main", "date_main", "type_main", "etc_main"]


const EnhancedTableBody = (props: ITableBodyProps) => {
  const {
    gridData,
    columnName,
    setUidOnHand,
    fetchElasticDetail,
    setReRender,
    selectedIndexCount,
    excludeProperties,
    importantFourProperties
  } = props;

  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [rememberId, setRememberId] = useState<string>(""); // 用來記錄上一次的selectedId
  const isSelected = (uid: string) => selectedId.indexOf(uid) !== -1;
  const [checkedRowId, setCheckedRowId] = useState<string>("");
  console.log("gridData+++++++++++", gridData);

  const handleClick = (
    event: React.MouseEvent<unknown>,
    uid: string,
    index: string
  ) => {
    console.log("hahah");
    console.log("uid", uid);
    console.log("index", index);
    setReRender(false); // 出現右邊資訊欄
    setUidOnHand({ uuid: uid, index: index });
    setCheckedRowId(uid);  // 記錄點擊的row
  };

  const handleCheckclick = (uid: string) => {
    // if name is selected, remove it from selectedId
    console.log(uid);
    if (isSelected(uid)) {
      setSelectedId(selectedId.filter((item) => item !== uid));
    }
    //if name is not selected, add it to selectedId
    else {
      setSelectedId([uid, ...selectedId]);
    }
  };

  // useEffect(() => {
  //   console.log("gridData", gridData);
  // }, [gridData]);

  const AllRows = (props: AllRowsProps) => {
    const { data, index, style } = props;
    const item = data[index];
    const labelId = `enhanced-table-checkbox-${index}`;
    const isItemSelected = isSelected(item["uuid"]);
    const translateItem = convertTimestampsToStrings(item);

    return (
      <TableRow
        hover
        style={{ ...style, background: checkedRowId === item["uuid"] ? "#e6f7ff" : "white" ,borderTop:"1px solid #e0e0e0"}}
        key={`AllRows-${index}`}
        onClick={(e) => {
          console.log(props)
          const uid = item["uuid"];
          const index =
            item["index"] !== undefined ? item["index"] : "";
          console.log(uid)
          if (rememberId !== `${labelId}-${item}-${index}`) {
            setRememberId(`${labelId}-${item}-${index}`);
            fetchElasticDetail.mutate();
          }

          handleClick(e, uid, index);
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{ "aria-labelledby": labelId }}
            onClick={() => {
              handleCheckclick(item.uuid);
            }}
          />
        </TableCell>
        {columnName.map((col, idx) => {
          // 依照選取的Index數量來決定要顯示欄位的方式
          if (selectedIndexCount === 1) {
            if (!excludeProperties.includes(col)) {
              return (
                <TableCellComponent
                  key={`AllRows-${index}-${idx}`}
                >
                  {translateItem[col]}
                </TableCellComponent>
              );
            }
          } else {
            if (importantFourProperties.includes(col)) {
              return (
                <TableCellComponent
                  key={`AllRows-${index}-${idx}`}
                >
                  {translateItem[col]}
                </TableCellComponent>
              );
            }

          }



          return null;
        })}
      </TableRow>
    );
  };

  return (
    <TableBody
      component={"div"}
      sx={{ overflowX: "hidden", border: "1px solid black", width: "100%" }}
      style={{ width: "100%", height: 330 }}  //調整表格內不可移動高度
      id="ensBody1"
    >
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <List
            width={width}
            height={height}
            itemCount={gridData.length}
            itemSize={40}
            itemData={gridData}
          >
            {AllRows}
          </List>
        )}
      </AutoSizer>
    </TableBody>
  );
};

// todo : 加入boolean判斷

export default EnhancedTableBody;

interface TableCellComponentProps extends TableCellProps {
  align?: "inherit" | "left" | "center" | "right" | "justify";
  children: React.ReactNode;
}

function TableCellComponent({
  align = "left",
  onClick,
  children,
  ...other
}: TableCellComponentProps) {
  return (
    <TableCell
      align={align}
      sx={{ width: "240px", padding: "10px 20px 10px 14px", cursor: "pointer" }}
      {...other}
    >
      <div
        style={{
          width: 180,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        {children}
      </div>
    </TableCell>
  );
}

// 轉換物件中的時間資料
const convertTimestampsToStrings = (obj: DynamicObject) => {
  let newObj: DynamicObject = {
    date: "",
  };
  for (const key in obj) {
    if (typeof obj[key] === "number" && obj[key].toString().length > 6) {
      newObj[key] = formatTimestamp(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};




