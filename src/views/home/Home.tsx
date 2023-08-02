import HomeHeader from './homeComponent/HomeHeader.tsx';
import HomeChart from './homeComponent/HomeChart.tsx';
import Reward from './homeComponent/Reward.tsx';
// import { useState } from 'react';
import { dateFormat } from '../../utils/utils.ts';

export interface dateDataType {
  startDate: string;
  endDate: string;
}

const Home = () => {

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  const dateData = {
    startDate: dateFormat(new Date(year, month, day - 31)),
    endDate: dateFormat(new Date(year, month, day - 1)),
  };

  return (
    <div className="flex pt-10 px-10  w-[1220px] h-[auto] flex-col">
      <HomeHeader dateData={dateData} />
      <HomeChart dateData={dateData} />
      <Reward />
    </div>
  );
};

export default Home;
