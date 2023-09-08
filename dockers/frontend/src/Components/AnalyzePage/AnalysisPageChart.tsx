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
interface IAnalysisPageChartProps {
  fetchElasticSearchForChart: UseMutationResult<AxiosResponse<any>, unknown, IDateModuleData, unknown>
  state: any
}

const AnalysisPageChart = (props: IAnalysisPageChartProps) => {
  const { fetchElasticSearchForChart, state } = props
  const [dotsForChart, setDotsForChart] = React.useState<IDotsForChart[]>([])

  useEffect(() => {
    if (fetchElasticSearchForChart.isSuccess) {
      let timeList = generateTimeListForChart(state.timeRange.startTime, state.timeRange.endTime)
      let dotsListForChartInBoxQuery = generateDotsListForChartWithBoxQuery(fetchElasticSearchForChart.data, timeList)
      setDotsForChart(dotsListForChartInBoxQuery)
    }
  }, [fetchElasticSearchForChart]
  )

  if (fetchElasticSearchForChart.isLoading) {
    return (
      <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress></CircularProgress>
      </div>
    )
  }

  return (

    <ResponsiveContainer  width="100%" height="100%">
      <LineChart
        // width={500}
        // height={400}
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
        <Line type="monotone" dataKey="totalCount" stroke="#8884d8" activeDot={{ r: 0 }} />
      </LineChart>
    </ResponsiveContainer>

  );
}

export default AnalysisPageChart;

