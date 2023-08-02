import { Table, TableContainer } from "@mui/material";
import EnhancedTableBody from "./EnhancedTableBody";
import EnhancedTableHead from "./EnhancedTableHead";
import { DynamicObject, IelasticQuery } from "..";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


// column

interface IGridBodyProps {
  columnName: string[];
  gridData: DynamicObject[];
  setUidOnHand : React.Dispatch<React.SetStateAction<IelasticQuery>>
  fetchElasticDetail : UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
}

const GridBody = (props: IGridBodyProps) => {
  const { columnName, gridData, setUidOnHand, fetchElasticDetail } = props;

  return (
    <TableContainer sx={{ maxHeight: 440 }}>
    <Table stickyHeader sx={{ minWidth: 750, backgroundColor:'white' }} aria-labelledby="tableTitle" size={"medium"} >
      <EnhancedTableHead columnName={columnName} />
      <EnhancedTableBody columnName={columnName} gridData={gridData} setUidOnHand={setUidOnHand} fetchElasticDetail={fetchElasticDetail}/>
    </Table>
    </TableContainer>
  );
};

export default GridBody;

// column 根據es回傳的資料去設定
