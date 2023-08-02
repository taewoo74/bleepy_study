import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { chartType } from '../views/home/homeComponent/HomeChart';


const Chart = ({ chartData }: chartType) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={chartData.widht}
                height={chartData.height}
                data={chartData.columnData}
                margin={{ top: 20, right: 10, left: 0, bottom: 5, }} >
                {chartData.grid && <CartesianGrid strokeDasharray="3 3" />}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {chartData.subData?.map((val) => (
                    <Line type="monotone" key={val.name} dataKey={val.dataKey} name={val.name} stroke={val.color} activeDot={{ r: 8 }} />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}
export default Chart;

