import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import PartialLoading from "../../CommonConponents/PartialLoading/PartialLoading";
import { useEffect, useState } from "react";
import { DynamicObject, translateTime } from ".";
import { IelasticQuery } from "../ElasticGrid.tsx";
import { copyFile } from "fs";
import CircularProgress from '@mui/material/CircularProgress';

interface IRightBarProps {
  fetchElasticDetail: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    void,
    unknown
  >;
  reRender: boolean;
  uidOnHand: IelasticQuery
}

const excludingList: string[] = ["uuid", "agent", "index", "id"]; //不需要的欄位，可以持續增加

const RightBar = (props: IRightBarProps) => {
  const { fetchElasticDetail, reRender, uidOnHand } = props;
  const { data, isLoading, isError } = fetchElasticDetail;
  const [elasticDetail, setElasticDetail] = useState<DynamicObject>({});

  useEffect(() => {
    setElasticDetail({})  //避免有殘留，先清空，之後需要優化
    if (data?.data && data.data.hits.hits.length !== 0) {  //判斷是否elastic有搜尋成功的方法

      const transDateRes = translateTime(data.data.hits.hits[0]._source); //將時間戳轉換成日期格式
      const filterRes = Object.keys(transDateRes).filter((item) => !excludingList.includes(item)); //過濾掉不需要的欄位
      const filterObj = filterRes.reduce((acc, cur) => { //如果物件中的key有在filterRes中，就將其加入新的物件中
        acc[cur] = transDateRes[cur];
        return acc;
      }, {} as DynamicObject);
      
      setElasticDetail(filterObj);
    }
  
  }, [fetchElasticDetail]);

  if (isError && !reRender) return (
    <div
          style={{
            backgroundColor: "#F5F5F5",
            padding: 10,
            margin: "0px auto",
            width: "90%",
          }}
        >
    <p style={{ color: "#00000099", marginTop: 30 }}>連線錯誤</p>
  </div>
  )

  return (
    <>
      {reRender ? null : (
        <div
          style={{
            backgroundColor: "#F5F5F5",
            // padding: 10,
            paddingLeft: 20,
            margin: "0px auto",
            width: "90%",
            height: '100%',
            overflow: 'auto',
            overflowX: 'hidden'
          }}
        >
          <p style={{ color: "#00000099", marginTop: 30 }}>詳細資訊</p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-start',
            justifyContent: 'center'
          }}
          >
            {isLoading ? <PartialLoading /> : 
            Object.keys(elasticDetail).map((key, index) => (
              <div
                key={`${key}-${index}-Grid`}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '8px auto',
                }}
              >
                <p style={{ backgroundColor: 'transparent', width: '100%', wordBreak: 'break-word', margin: '3px auto' }}>{key}</p>
                <p style={{ backgroundColor: 'white', width: '100%', margin: '3px auto', wordBreak: 'break-word', padding: '5px 8px' }}>{elasticDetail[key]}</p>
              </div>
            ))
            }
            </div>
          </div>
      )}
    </>
  );
};

export default RightBar;




// 需要被我剔除的欄位
// setGridData(transDateRes) ;
// style