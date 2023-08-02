import HomeHeader from './homecomponent/HomeHeader.tsx';
import HomeChart from './homecomponent/HomeChart.tsx';
import Reward from './homecomponent/Reward.tsx';
import {
  getMonthVisit,
  getMonthTimeVisit,
  getMau,
  getDayVisits,
  getRewardState,
} from '../../../src/apis/homeApi/homeapi.tsx';
import { useEffect, useState } from 'react';
import { dateFormat, monthDateFormat } from '../../utils/utils.ts';

export interface headerDataType {
  monthVisit: number;
  monthVisitTime: number;
  mau: number;
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

export interface subDataType {
  dataKey: string;
  color: string;
  name: string
}

export interface chartDataType {
  widht: number;
  height: number;
  grid: boolean;
  columnData: Partial<columnDataType>[];
  subData: Array<subDataType>;
}

export interface rewardType {
  id: number;
  gameName: string;
  itemName: string;
  achievementScore: number;
  pendingPaymentCount: number;
}

const Home = () => {
  const [headerData, sethHaderData] = useState<headerDataType>({ monthVisit: 0, monthVisitTime: 0, mau: 0 });
  const [rewardData, setRewardData] = useState<rewardType[]>([{ id: 0, gameName: '', itemName: '', achievementScore: 0, pendingPaymentCount: 0 }]);
  const [chartData, setChartData] = useState<chartDataType>({
    widht: 0,
    height: 0,
    grid: false,
    columnData: [],
    subData: [{ dataKey: '', color: '', name: '' }],
  });

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  const data = {
    startDate: dateFormat(new Date(year, month, day - 31)),
    endDate: dateFormat(new Date(year, month, day - 1)),
  };

  /* Home 상단 방문횟수, 체류시간 , MAU 데이터를 불러오고 셋팅 해줌  */
  const getHeaderData = async () => {
    const mauData = {
      startMonth: monthDateFormat(new Date(year, month, day)),
      endMonth: monthDateFormat(new Date(year, month, day)),
    };

    const monthVisit = await getMonthVisit(data);
    const monthVisitTime = await getMonthTimeVisit(data);
    const mau = await getMau(mauData);
    const headerData = {
      monthVisit,
      monthVisitTime,
      mau: mau.length > 0 && mau[0].mau,
    };
    sethHaderData(headerData);
  };

  /* ChartData(30일단 방문현황) 가져오고 ChartData 셋팅해줌  */
  const getChartData = async () => {
    const monthVisit = await getDayVisits(data);
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

  /* 리워드 지급현황 데이터를 가져오고 셋팅해줌  */
  const getRewardData = async () => {
    const data = {
      pageSize: 5,
      sortOption: 'REWARD_ACHIEVEMENT_SCORE',
      sortType: 'ASC',
    };

    const rewardData = await getRewardState(data);
    setRewardData(rewardData.data);
  };

  useEffect(() => {
    getHeaderData();
    getChartData();
    getRewardData();
  }, []);

  return (
    <div className="flex pt-10 px-10  w-[1220px] h-[auto] flex-col">
      <HomeHeader headerData={headerData} />
      <HomeChart chartData={chartData} />
      <Reward rewardData={rewardData} />
    </div>
  );
};

export default Home;
