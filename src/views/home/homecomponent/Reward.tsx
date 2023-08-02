import { rewardType } from '../Home.tsx';

export type rewardDataType = {
  rewardData: Partial<rewardType>[];
};

const Reward = ({ rewardData }: rewardDataType) => {
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
