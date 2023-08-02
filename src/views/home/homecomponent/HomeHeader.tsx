import chart from '../../../assets/img/chart.png';
import clock from '../../../assets/img/clock.png';
import vector from '../../../assets/img/Vector.png';
import { useEffect, useState } from 'react';
import { monthDateFormat } from '../../../utils/utils.ts';
import {
  getMonthVisit,
  getMonthTimeVisit,
  getMau,
} from '../../../apis/homeApi/homeapi.tsx';
import { dateDataType } from '../Home.tsx';

interface HomeHeaderType {
  dateData: dateDataType;
}

interface headerDataType {
  monthVisit: string;
  monthVisitTime: string;
  mau: string;
}

const dummyMonthVisit = 1580232;
const dummyMonthVisitTime = 364;
const dummyMau = [
  {
    yearMonth: {
      year: 2342,
      month: 'JANUARY',
      monthValue: 543,
      leapYear: true,
    },
    visitCount: 231,
    mau: 15878238,
    returningVisitorCount: 3442,
  },
];

const HomeHeader = ({ dateData }: HomeHeaderType) => {
  const [headerData, sethHaderData] = useState<headerDataType>({
    monthVisit: '',
    monthVisitTime: '',
    mau: '',
  });

  const d = new Date();
  const month = d.getMonth();

  /* Home 상단 방문횟수, 체류시간 , MAU 데이터를 불러오고 셋팅 해줌  */
  const getHeaderData = async () => {
    const mauData = {
      startMonth: monthDateFormat(new Date()),
      endMonth: monthDateFormat(new Date()),
    };

    // const monthVisit = dummyMonthVisit; 
    // const monthVisitTime = dummyMonthVisitTime; 
    // const mau = dummyMau; 
    const monthVisit =await getMonthVisit(dateData);
    const monthVisitTime = await getMonthTimeVisit(dateData);; 
    const mau = await getMau(mauData);;

    const headerData = { monthVisit: '', monthVisitTime: '', mau: '' };
    headerData.monthVisit = monthVisit.toLocaleString();
    headerData.monthVisitTime =
      Math.floor(monthVisitTime / 60) + '분' + (monthVisitTime % 60) + '초';
    let result = '0';
    if (mau.length > 0) {
      result = mau[0].mau.toLocaleString();
    }
    headerData.mau = result;

    sethHaderData(headerData);
  };

  useEffect(() => {
    getHeaderData();
  }, []);

  return (
    <div className="w-f h-[200px]">
      <div className="text-3xl font-extrabold">
        클라이언트 사업자명님 환영합니다!
      </div>
      <div className="text-sm mt-2">
        그동안 몇 명의 사용자가 방문했는지, 리워드 미지급자는 없는지 빠르게
        확인해보세요!
      </div>

      <div className="mt-3 flex-row flex pt-6">
        <div className="small_box">
          <div className="text-xs text-gray-500">최근 30일간 방문 횟수</div>
          <div className="flex flex-row justify-start">
            <img className="w-[24px] h-[28px] mt-4 ml-3 mr-auto" src={vector} />
            <div className="mt-6 font-semibold text-xl">{headerData.monthVisit}</div>
          </div>
        </div>
        <div className="small_box">
          <div className="text-xs text-gray-500">최근 30일간 평균 체류시간</div>
          <div className="flex flex-row">
            <img className="w-[30px] h-[30px] mt-4 ml-2 mr-auto" src={clock} />
            <div className="mt-6 font-semibold text-xl">{headerData.monthVisitTime}</div>
          </div>
        </div>
        <div className="small_box">
          <div className="text-xs text-gray-500">{month}월 MAU</div>
          <div className="flex flex-row">
            <img className="w-[30px] h-[30px] mt-4 ml-2 mr-auto" src={chart} />
            <div className="mt-6 font-semibold text-xl">{headerData.mau}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
