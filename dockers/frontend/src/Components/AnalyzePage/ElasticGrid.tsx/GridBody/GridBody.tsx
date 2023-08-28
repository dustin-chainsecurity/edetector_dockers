import { Table, TableContainer } from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import { DynamicObject, IelasticQuery } from "..";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import EnhancedTableBody from "./EnhancedTableBody";
import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';


// column

interface IGridBodyProps {
  columnName: string[];
  gridData: DynamicObject[];
  uidOnHand: IelasticQuery;
  setUidOnHand: React.Dispatch<React.SetStateAction<IelasticQuery>>
  fetchElasticDetail: UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
  setReRender: React.Dispatch<React.SetStateAction<boolean>>
  // queryString: string
  selectedIndexCount: number
  fetchElasticSearch: UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
}

const GridBody = (props: IGridBodyProps) => {
  const { columnName, gridData, setUidOnHand, fetchElasticDetail, uidOnHand, setReRender, selectedIndexCount, fetchElasticSearch } = props;
  const excludeProperties = ["uuid", "index", "item_main", "date_main", "type_main", "etc_main"];
  const importantFourProperties = ["item_main", "date_main", "type_main", "etc_main"]
  const icon = (
    <p style={{ textAlign: 'center', margin: '20px auto', color: 'rgba(0, 0, 0, 0.6)' }}>查無此資料</p>
  );
  const [checked, setChecked] = React.useState(true);




  return (
    <div style={{ width: '100%', overflowX: 'auto', overflowY: "hidden",height:400}}>
      {/* {gridData.length === 0 && !fetchElasticSearch.isLoading &&  <p style={{ textAlign: 'center', margin: '20px auto', color: 'rgba(0, 0, 0, 0.6)' }}>查無此資料</p>} */}
      {gridData.length === 0 && !fetchElasticSearch.isLoading && <Box sx={{ height: 180 }}>
        <Box sx={{ display: 'flex' }}>
          <Fade in={checked} timeout={2000}>
            {icon}
          </Fade>
        </Box>
      </Box>}

      {fetchElasticSearch.isLoading && <p style={{ textAlign: 'center', margin: '20px auto', color: 'rgba(0, 0, 0, 0.6)' }}>資料查詢中</p>}
      {/* <TableContainer sx={{ maxHeight: 440 }}> */}
      {
        gridData.length !== 0 ? <Table
          stickyHeader
          sx={{ width: '100%', minWidth: 750, maxHeight: 100, backgroundColor: 'white', overflow: 'scroll' }}
          // aria-labelledby="tableTitle" 
          size={"medium"}

        >
          <EnhancedTableHead
            columnName={columnName}
            selectedIndexCount={selectedIndexCount}
            excludeProperties={excludeProperties}
            importantFourProperties={importantFourProperties}
          />
          <EnhancedTableBody
            columnName={columnName}
            gridData={gridData}
            setUidOnHand={setUidOnHand}
            fetchElasticDetail={fetchElasticDetail}
            uidOnHand={uidOnHand}
            setReRender={setReRender}
            selectedIndexCount={selectedIndexCount}
            excludeProperties={excludeProperties}
            importantFourProperties={importantFourProperties}
          />
        </Table> : null
      }
      {/* </TableContainer> */}

    </div>
  );
};

export default GridBody;

// column 根據es回傳的資料去設定
