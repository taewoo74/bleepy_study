import HomeHeader from './homeComponent/HomeHeader.tsx';
import HomeChart from './homeComponent/HomeChart.tsx';
import Reward from './homeComponent/Reward.tsx';
// import { useState } from 'react';
import { dateFormat } from '../../utils/utils.ts';
import HomeTable from '../home/homeComponent/HomeTable.tsx';

export interface dateDataType {
  startDate: string;
  endDate: string;
}

const Home = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const dateData = {
    startDate: dateFormat(new Date(year, month, day - 31)),
    endDate: dateFormat(new Date(year, month, day - 1)),
  };

  return (
    <div className="flex pt-10 px-10  w-[1220px] h-[auto] flex-col">
      <HomeHeader dateData={dateData} />
      <HomeChart dateData={dateData} />
      <HomeTable />
      {/* <Reward /> */}
    </div>
  );
};

export default Home;
