import { getRewardState } from '../../../apis/homeApi/homeapi.tsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../../assets/img/arrow_icon.png';
import noReward from '../../../assets/img/noReward.png';

interface rewardType {
  id: number;
  gameName: string;
  itemName: string;
  achievementScore: number;
  pendingPaymentCount: number;
}

const dummy = {
  data: [
    {
      id: 9,
      achievementScore: 102320,
      gameName: '탈출하라',
      name: '리워드',
      actionType: 'MANUAL',
      limit: 100,
      itemType: 'PRODUCT',
      itemName: '물병',
      status: 'PAYING',
      pendingPaymentCount: 0,
      registeredAt: '2023.06.29 05:47:13',
    },
    {
      id: 11,
      achievementScore: 202320,
      gameName: '탈출하라',
      name: '리워드2',
      actionType: 'MANUAL',
      limit: 100,
      itemType: 'PRODUCT',
      itemName: '물병',
      status: 'PAYING',
      pendingPaymentCount: 0,
      registeredAt: '2023.06.29 06:16:47',
    },
    {
      id: 12,
      achievementScore: 223300,
      gameName: '탈출하라',
      name: '리워드3',
      actionType: 'MANUAL',
      limit: 1,
      itemType: 'PRODUCT',
      itemName: '물병',
      status: 'PAYING',
      pendingPaymentCount: 0,
      registeredAt: '2023.06.29 06:16:55',
    },
    {
      id: 13,
      achievementScore: 422300,
      gameName: '탈출하라',
      name: '리워드4',
      actionType: 'MANUAL',
      limit: 100,
      itemType: 'PRODUCT',
      itemName: '물병',
      status: 'PAYING',
      pendingPaymentCount: 0,
      registeredAt: '2023.06.29 06:17:03',
    },
    {
      id: 14,
      achievementScore: 1500,
      gameName: '탈출하라',
      name: '리워드5',
      actionType: 'MANUAL',
      limit: 4,
      itemType: 'PRODUCT',
      itemName: '물병',
      status: 'PAYING',
      pendingPaymentCount: 0,
      registeredAt: '2023.06.29 06:17:10',
    },
  ],
  pagingInfo: {
    totalPages: 2,
    totalElements: 10,
    pageSize: 5,
    pageNumber: 1,
    isFirst: true,
    isLast: false,
    hasNext: true,
    hasPrevious: false,
    isEmpty: false,
  },
};

const dummyData = {
  data: [],
  pagingInfo: {
    totalPages: 2,
    totalElements: 10,
    pageSize: 5,
    pageNumber: 1,
    isFirst: true,
    isLast: false,
    hasNext: true,
    hasPrevious: false,
    isEmpty: false,
  },
};

const Reward = () => {
  const [rewardData, setRewardData] = useState<rewardType[]>([
    {
      id: 0,
      gameName: '',
      itemName: '',
      achievementScore: 0,
      pendingPaymentCount: 0,
    },
  ]);

  /* 리워드 지급현황 데이터를 가져오고 셋팅해줌  */
  const getRewardData = async () => {
    const data = {
      pageSize: 5,
      sortOption: 'REWARD_ACHIEVEMENT_SCORE',
      sortType: 'ASC',
    };

    const rewardData = await getRewardState(data);
    setRewardData(rewardData.data);
    // setRewardData(dummy.data);
    // setRewardData(dummyData.data);
  };

  useEffect(() => {
    getRewardData();
  }, []);

  return (
    <div className="w-[1163px] h-[550px] flex">
      <div className="w-f h-[550px] ">
        <div className="mt-10 text-xl font-bold flex-row flex">
          <div className="flex">리워드 지급현황</div>
          <Link to="/reward">
            <img className="flex mt-[7px] ml-[8px]" src={arrow} />
          </Link>
        </div>
        <div className="text-xs mt-3 text-[#121212B8]">
          진행 중인 리워드에 한해, 리워드 지급현황을 최대 5개까지 안내합니다.
        </div>

        <div className="w-f h-[64px] flex flex-row border-[#E0E0E0] border border-x-0 border-t-0">
          <div className="w-[35%] h-f text-center font-bold text-sm leading-[64px]">
            리워드 명
          </div>
          <div className="w-[20%] h-f text-center font-bold text-sm leading-[64px]">
            목표 블리피 포인트
          </div>
          <div className="w-[20%] h-f text-center font-bold text-sm leading-[64px]">
            지급대기자 수
          </div>
          <div className="w-[25%] h-f text-center font-bold text-sm leading-[64px]">
            리워드 품목
          </div>
        </div>

        {rewardData.length > 0 ? (
          <>
            {rewardData.map((val) => (
              <div
                key={val.id}
                className="w-f h-[64px] flex flex-row border-[#E0E0E0] border border-x-0 border-t-0"
              >
                <div className="w-[35%] h-f text-center text-sm leading-[64px]">
                  {val.gameName}
                </div>
                <div className="w-[20%] h-f text-center text-sm leading-[64px] text-[#FB6218]">
                  {val.achievementScore.toLocaleString()} BP
                </div>
                <div className="w-[20%] h-f text-center text-sm leading-[64px]">
                  {val.pendingPaymentCount}
                </div>
                <div className="w-[25%] h-f text-center text-sm leading-[64px]">
                  {val.itemName}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>
            <div className="flex justify-center items-center w-f h-[320px]">
              <div className='flex flex-col w-[220px] items-center text-center' >
                <img className="w-[84px] h-[84px]" src={noReward} />
                <div className='text-lg text-[#FF3D00] font-bold mt-4'>등록된 리워드가 없습니다</div>
                <div className='text-[11px] mt-3 text-[#1212127A]'>리워드를 등록하고 사용자를 모아보세요!</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reward;
