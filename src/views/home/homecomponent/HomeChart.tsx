import Chart from '../../../components/Chart.tsx';
import { Link } from 'react-router-dom';
import BulrBox from './BulrBox.tsx';
import { useEffect, useState } from 'react';
import { getDayVisits } from '../../../apis/homeApi/homeapi.tsx';
import { dateDataType } from '../Home.tsx'


interface subDataType {
  dataKey: string;
  color: string;
  name: string
}

interface chartDataType {
  widht: number;
  height: number;
  grid: boolean;
  columnData: Partial<columnDataType>[];
  subData: Array<subDataType>;
}

interface HomeChartType {
  dateData: dateDataType
}

export interface columnDataType {
  name: string;
  visite: number;
  evedau: number | string;
  prevmau: number | string;
  visitCount: number;
  id: number;
  mau: any;
  dau: any;
  newVisitorCount: number;
  returningVisitorCount: number;
}

interface monthVisitType {
  date: string;
  dau: number;
  newVisitorCount: number;
  returningVisitorCount: number;
  visitCount: number;
}

const HomeChart = ({ dateData }: HomeChartType) => {
  const [chartData, setChartData] = useState<chartDataType>({
    widht: 0,
    height: 0,
    grid: false,
    columnData: [],
    subData: [{ dataKey: '', color: '', name: '' }],
  });

  /* ChartData(30일단 방문현황) 가져오고 ChartData 셋팅해줌  */
  const getChartData = async () => {
    const monthVisit = await getDayVisits(dateData);
    const columnData: Partial<columnDataType>[] = [];
    monthVisit.forEach((arr: monthVisitType) => {
      const one = { name: '', visite: 0 };
      one.name = arr.date.substring(5);
      one.visite = arr.visitCount;
      columnData.push(one);
    });
    const result: chartDataType = {
      widht: 670,
      height: 290,
      grid: false,
      columnData: columnData,
      subData: [{ dataKey: 'visite', color: '#8884d8', name: '' }],
    };
    setChartData(result);
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <div className="w-f h-[350px] flex-row flex">
      <div className="w-[676px] h-[300px]">
        <div className="mt-10 text-xl font-bold">
          최근 30일간 방문현황 그래프
          <Link to='/insight' >
            <span> {'>'}</span>
          </Link>
        </div>
        <Chart chartData={chartData} />
      </div>
      <BulrBox />
    </div>
  );
};

export default HomeChart;
