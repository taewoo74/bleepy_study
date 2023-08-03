import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { chartDataType } from '../views/home/homeComponent/HomeChart';
import { useEffect, useState } from 'react';

interface ChartType {
  chartData: chartDataType[];
  state: string;
}

interface subDataType {
  width: number;
  height: number;
}

const Chart = ({ chartData, state }: ChartType) => {
  const [graphData, setGraphData] = useState([]);
  const [lineData, setLineData] = useState([
    { name: '', dataKey: '', color: '' },
  ]);
  const [subdata, setSubdata] = useState<subDataType>({ width: 0, height: 0 });

  const settingChartData = (chartData: chartDataType[], state: string) => {
    if (state === 'monthVisit') {
      const data: any = [];
      chartData.forEach((one) => {
        data.push({ name: one.date.substring(5), visitCount: one.visitCount });
      });
      setGraphData(data);
      const result = { width: 670, height: 290 };
      const lineData = [
        { name: 'visit', dataKey: 'visitCount', color: '#A8C7D1' },
      ];
      setLineData(lineData);
      setSubdata(result);
    }
  };

  useEffect(() => {
    settingChartData(chartData, state);
  }, [chartData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={subdata.width}
        height={subdata.height}
        data={graphData}
        margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lineData.map((val) => (
          <Line
            type="monotone"
            key={val.name}
            dataKey={val.dataKey}
            name={val.name}
            stroke={val.color}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
export default Chart;
