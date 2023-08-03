import DateSelete from '../../../components/DateSelete.tsx';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import icon from '../../../assets/img/icon.png';
import { dateFormat } from '../../../utils/utils.ts';
import {
  getDau,
  getNewVisitor,
  getReturnVisitor,
} from '../../../apis/insightApi/insightapi.ts';

interface DauViewType {
  settingPopup: (
    str: string,
    str2: string,
    str3: string,
    str4: string,
    bol: boolean,
  ) => void;
}

export type visitorType = {
  visitorTotal: number;
  dau: number;
  visitor: number;
  returnVisitor: number;
};

const dummyDau = 1342232;
const dummyVisitor = 234232;
const dummyReturnVisitor = 42232;

const DauView = ({ settingPopup }: DauViewType) => {
  const [tooltip, setTooltip] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [visitorData, SetVisitorData] = useState<visitorType>({
    visitorTotal: 0,
    dau: 0,
    visitor: 0,
    returnVisitor: 0,
  });
  const [datePickerFormat, setDatePickerFormat] =
    useState<string>('yyyy-MM-dd');

  /* 날짜 바꿨을때 날짜데이터 셋팅해주는 함수 */
  const DateSetting = (date: number) => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    setStartDate(new Date(year, month, day - date));
    setEndDate(new Date(year, month, day - 1));
  };

  /* 시작 일짜 바꿔주는 함수 */
  const onChangeStartDate = (date: Date) => {
    if (endDate.getTime() < date.getTime()) {
      settingPopup(
        '조회 일자 확인',
        '조회 종료일보다 조회 시작일이 클 수 없습니다.',
        '확인',
        'error',
        true,
      );
      return;
    }
    const diffTime = Math.abs(date.getTime() - endDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 90) {
      settingPopup(
        '조회 일자 확인',
        '조회 가능한 일자는 최대 90일입니다.',
        '확인',
        'error',
        true,
      );
      return;
    }
    setStartDate(new Date(date));
  };

  /* 끝나는 일자 바꿔주는 함수 */
  const onChangeEndDate = (date: Date) => {
    const diffTime = Math.abs(startDate.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 90) {
      settingPopup(
        '조회 일자 확인',
        '조회 가능한 일자는 최대 90일입니다.',
        '확인',
        'error',
        true,
      );
      return;
    }
    setEndDate(new Date(date));
  };

  const submitInsightData = async () => {
    const data = {
      startDate: dateFormat(startDate),
      endDate: dateFormat(endDate),
    };
    // const dau = await getDau(data);
    // const visitor = await getNewVisitor(data);
    // const returnVisitor = await getReturnVisitor(data);
    const dau = dummyDau;
    const visitor = dummyVisitor;
    const returnVisitor = dummyReturnVisitor;

    const visitorTotal = dau + visitor + returnVisitor;
    const result: visitorType = { visitorTotal, dau, visitor, returnVisitor };
    SetVisitorData(result);
    // getChartData(data);
  };

  const didate = (start: Date, end: Date, num: number) => {
    const di = end.getTime() - start.getTime();
    const diTime = di / (1000 * 60 * 60 * 24);
    if (num === diTime) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    DateSetting(8);
  }, []);

  return (
    <div className="flex flex-col">
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
          onClick={submitInsightData}
          className="bg-og w-[53px] h-[33px] rounded text-white text-base text-center leading-8 ml-4"
        >
          조회
        </div>
      </div>

      <div className="text-xl font-bold mt-8">조회기간별 방문현황 합계</div>
      <div className="mt-4 flex">
        <div className="num_container flex-col flex">
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
          <div className="ml-auto mt-5 mr-4 font-semibold text-xl">
            {visitorData.visitorTotal.toLocaleString()}
          </div>
        </div>
        <div className="num_container flex-row flex">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto">
            일일활성사용자
          </div>
          <div className="ml-auto mt-5 mr-4 font-semibold text-xl">
            {visitorData.dau.toLocaleString()}
          </div>
        </div>
        <div className="num_container flex-row flex">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto">
            신규 방문자 수
          </div>
          <div className="ml-auto mt-5 mr-4 font-semibold text-xl">
            {visitorData.visitor.toLocaleString()}
          </div>
        </div>
        <div className="num_container flex-row flex">
          <div className="font-semibold text-xs text-gray-400 mt-3 ml-3 mr-auto">
            재 방문자 수
          </div>
          <div className="ml-auto mt-5 mr-4 font-semibold text-xl">
            {visitorData.returnVisitor.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DauView;
