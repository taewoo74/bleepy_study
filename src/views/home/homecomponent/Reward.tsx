import { getRewardState } from '../../../../src/apis/homeApi/homeapi.tsx';
import { useEffect, useState } from 'react';

interface rewardType {
  id: number;
  gameName: string;
  itemName: string;
  achievementScore: number;
  pendingPaymentCount: number;
}

const Reward = () => {
  const [rewardData, setRewardData] = useState<rewardType[]>([{ id: 0, gameName: '', itemName: '', achievementScore: 0, pendingPaymentCount: 0 }]);

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
    getRewardData();
  }, []);

  return (
    <div className="w-[1163px] h-[550px] flex">
      <div className="w-f h-[550px]">
        <div className="mt-10 text-xl font-bold">리워드 지급현황
          <span> {'>'}</span>
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

        {rewardData.map((val) => (
          <div
            key={val.id}
            className="w-f h-[64px] flex flex-row border-[#E0E0E0] border border-x-0 border-t-0"
          >
            <div className="w-[35%] h-f text-center text-sm leading-[64px]">
              {val.gameName}
            </div>
            <div className="w-[20%] h-f text-center text-sm leading-[64px] text-[#FB6218]">
              {val.achievementScore} BP
            </div>
            <div className="w-[20%] h-f text-center text-sm leading-[64px]">
              {val.pendingPaymentCount}
            </div>
            <div className="w-[25%] h-f text-center text-sm leading-[64px]">
              {val.itemName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reward;
