import DateSelete from '../../../components/DateSelete.tsx';
import classNames from 'classnames';
import { useState } from 'react';

interface DauViewType {
  DateSetting: (num: number) => void;
  startDate: Date;
  onChangeStartDate: (date: Date) => void;
  endDate: Date;
  onChangeEndDate: (date: Date) => void;
  datePickerFormat: string;
}

const DauView = ({
  DateSetting,
  startDate,
  onChangeStartDate,
  endDate,
  onChangeEndDate,
  datePickerFormat,
}: DauViewType) => {
  const [tooltip, setTooltip] = useState<boolean>(false);

  const didate = (start: Date, end: Date, num: number) => {
    const di = end.getTime() - start.getTime();
    const diTime = di / (1000 * 60 * 60 * 24);
    if (num === diTime) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex ml-auto">
      <div
        className={classNames('small_button', {
          on: didate(startDate, endDate, 1),
        })}
        onClick={() => DateSetting(1)}
      >
        전일
      </div>
      <div
        className={classNames('small_button', {
          on: didate(startDate, endDate, 7),
        })}
        onClick={() => DateSetting(8)}
      >
        일주일
      </div>
      <div
        className={classNames('small_button', {
          on: didate(startDate, endDate, 30),
        })}
        onClick={() => DateSetting(31)}
      >
        1개월
      </div>
      <div
        className={classNames('small_button', {
          on: didate(startDate, endDate, 90),
        })}
        onClick={() => DateSetting(91)}
      >
        3개월
      </div>

      <DateSelete
        startDate={startDate}
        onChangeStartDate={onChangeStartDate}
        endDate={endDate}
        onChangeEndDate={onChangeEndDate}
        datePickerFormat={datePickerFormat}
      />
      <div
        // onClick={onClickSubmit}
        className="bg-og w-[53px] h-[33px] rounded text-white text-base text-center leading-8 ml-4"
      >
        조회
      </div>
    </div>
  );
};
export default DauView;

{
  /* <div className="text-xl font-bold">조회기간별 방문현황 합계</div>
      <div className="mt-4 flex">
        <div className="num_container flex-row flex">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto flex direction-row relative">
            방문횟수
            <img
              onMouseOver={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
              className="w-[13px] h-[13px] flex mt-0.5 ml-0.5"
              src={icon}
            />
            {tooltip && (
              <div className="absolute w-[321px] h-[54px] bg-black p-2.5 left-[65px] rounded-[3px] text-white">
                <p>방문 횟수는 사용자가 게임에 접속한 횟수를 집계합니다. </p>
                <p>동일 사용자가 30분 내 재접속 시 집계에 포함되지 않습니다.</p>
              </div>
            )}
          </div>
          <div className="mt-14 mr-4">{visitorData.visitorTotal}</div>
        </div>
        <div className="num_container flex-row flex">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto">
            일일활성사용자
          </div>
          <div className="mt-14 mr-4">{visitorData.dau}</div>
        </div>
        <div className="num_container flex-row flex">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto">
            신규 방문자 수
          </div>
          <div className="mt-14 mr-4">{visitorData.visitor}</div>
        </div>
        <div className="num_container flex-row flex">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto">
            재 방문자 수
          </div>
          <div className="mt-14 mr-4">{visitorData.returnVisitor}</div>
        </div>
      </div> */
}
