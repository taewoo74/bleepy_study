import Chart from '../../../components/Chart.tsx';
import { Link } from 'react-router-dom';
import BulrBox from './BulrBox.tsx';
import { useEffect, useState } from 'react';
import { getDayVisits } from '../../../apis/homeApi/homeapi.tsx';
import { dateDataType } from '../Home.tsx';
import arrow from '../../../assets/img/arrow_icon.png';

interface HomeChartType {
  dateData: dateDataType;
}

export interface chartDataType {
  date: string;
  visitCount: number;
  dau: number;
  newVisitorCount: number;
  returningVisitorCount: number;
}

const dummyData = [
  {
    "date": "2023-08-02",
    "visitCount": 623,
    "dau": 423,
    "newVisitorCount": 234,
    "returningVisitorCount": 500
  },
  {
    "date": "2023-08-03",
    "visitCount": 123,
    "dau": 423,
    "newVisitorCount": 234,
    "returningVisitorCount": 500
  },
  {
    "date": "2023-08-04",
    "visitCount": 321,
    "dau": 423,
    "newVisitorCount": 234,
    "returningVisitorCount": 500
  },
  {
    "date": "2023-08-05",
    "visitCount": 446,
    "dau": 423,
    "newVisitorCount": 234,
    "returningVisitorCount": 500
  }
]

const HomeChart = ({ dateData }: HomeChartType) => {
  const [chartData, setChartData] = useState<Array<chartDataType>>([]);

  /* ChartData(30일단 방문현황) 가져오고 ChartData 셋팅해줌  */
  const getChartData = async () => {
    const monthVisit = await getDayVisits(dateData);
    // setChartData(monthVisit);
    setChartData(dummyData);
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <div className="w-f h-[350px] flex-row flex">
      <div className="w-[676px] h-[300px]">
        <div className="mt-10 text-xl font-bold flex-row flex">
          <div className='flex'>최근 30일간 방문현황 그래프</div>
          <Link to="/insight">
            <img className='flex mt-[7px] ml-[8px]' src={arrow} />
          </Link>
        </div>
        <Chart chartData={chartData} state={"monthVisit"} />
      </div>
      <BulrBox />
    </div>
  );
};

export default HomeChart;
