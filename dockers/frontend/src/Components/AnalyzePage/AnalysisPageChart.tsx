import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateDotsListForChartWithBoxQuery, generateTimeListForChart } from '../../constant/FunctionForElasticsearch/functionToolbox';
import { IDateModuleData } from '../../constant/interfaceBoard';
import CircularProgress from '@mui/material/CircularProgress';


interface IDotsForChart {
  name: string,
  totalCount: number
}
const AnalysisPageChart = ({ dateModuleData, fetchElasticSearchForChart }: { dateModuleData: IDateModuleData, fetchElasticSearchForChart: UseMutationResult<AxiosResponse<any, any>, any, any, unknown> }) => {

  const [dotsForChart, setDotsForChart] = React.useState<IDotsForChart[]>([])

  useEffect(() => {
    setDotsForChart([])
    if (fetchElasticSearchForChart.isSuccess) {
      let timeList = generateTimeListForChart(dateModuleData.startTime, dateModuleData.endTime)
      let dotsListForChartInBoxQuery = generateDotsListForChartWithBoxQuery(fetchElasticSearchForChart.data, timeList)
      setDotsForChart(dotsListForChartInBoxQuery)

    }
  }, [fetchElasticSearchForChart])
  if (fetchElasticSearchForChart.isLoading) {
    return (
      <div style={{height:"200px",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <CircularProgress></CircularProgress>
      </div>
    )
  }

  if (dotsForChart.length !== 0) {
    return (
      <ResponsiveContainer>
        <LineChart
          // width={500}
          height={400}
          data={dotsForChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* //調整格線 */}
          <CartesianGrid strokeDasharray="0 1" />  
          <XAxis dataKey="name" minTickGap={40} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalCount" stroke="#8884d8" activeDot={{ r:  0}} />
        </LineChart>
      </ResponsiveContainer>
    );
  } else {
    return (
      <div></div>
    )
  }
}

export default AnalysisPageChart;

