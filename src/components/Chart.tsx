import { LineChart, Line, XAxis, YAxis,  Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { chartType } from '@/views/home/homecomponent/HomeChart';


const Chart = ({chartData}: chartType) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={670}
                height={290}
                data={chartData}
                margin={{ top: 20, right: 10, left: 0, bottom: 5, }} >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visite" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
export default Chart;

