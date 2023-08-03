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
import {
  homeChartDataType,
  chartNameType,
  chartSizeType,
} from '../views/home/homeComponent/HomeChart';

interface ChartType {
  chartData: homeChartDataType[];
  nameData: chartNameType[];
  chartSize: chartSizeType;
}

const Chart = ({ chartData, nameData, chartSize }: ChartType) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={chartSize.width}
        height={chartSize.height}
        data={chartData}
        margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {nameData.map((val) => (
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
