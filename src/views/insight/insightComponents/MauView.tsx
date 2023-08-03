import DateSelete from '../../../components/DateSelete.tsx';
import { useState, useEffect } from 'react';

interface DauViewType {
  settingPopup: (
    str: string,
    str2: string,
    str3: string,
    str4: string,
    bol: boolean,
  ) => void;
}

const MauView = ({ settingPopup }: DauViewType) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [datePickerFormat, setDatePickerFormat] = useState<string>('yyyy.MM');

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
    if (diffDays > 365) {
      settingPopup(
        '조회 일자 확인',
        '조회 가능한 일자는 최대 1년 입니다.',
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
    if (diffDays > 365) {
      settingPopup(
        '조회 일자 확인',
        '조회 가능한 일자는 최대 1년 입니다.',
        '확인',
        'error',
        true,
      );
      return;
    }
    setEndDate(new Date(date));
  };

  const settingDate = () => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    setStartDate(new Date(year - 1, month));
    setEndDate(new Date(year, month - 1));
  };

  useEffect(() => {
    settingDate();
  }, []);

  return (
    <div className="flex">
      <div className="flex ml-auto">
        <DateSelete
          startDate={startDate}
          onChangeStartDate={onChangeStartDate}
          endDate={endDate}
          onChangeEndDate={onChangeEndDate}
          datePickerFormat={datePickerFormat}
          state={true}
        />
        <div
          //   onClick={submitInsightData}
          className="bg-og w-[53px] h-[33px] rounded text-white text-base text-center leading-8 ml-4"
        >
          조회
        </div>
      </div>
    </div>
  );
};
export default MauView;
