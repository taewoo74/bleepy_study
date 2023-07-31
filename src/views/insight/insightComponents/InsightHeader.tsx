import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch } from '../../../store';
import popupSlice from '../../../store/slice/popup.ts';
import {
  getDau,
  getNewVisitor,
  getReturnVisitor,
} from '../../../apis/insightApi/insightapi.ts';
import { dateFormat } from '../../../utils/utils.ts';

const list = [
  { title: 'DAU' },
  { title: 'MAU' },
  { title: '요일별' },
  { title: '시간대별' },
];

const InsightHeader = () => {
  const location = useLocation().pathname;
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [dateState, setDateState] = useState<string>('default');
  const dispatch = useAppDispatch();

  const DateSetting = (date: number, state: string) => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    setStartDate(new Date(year, month, day - date));
    setEndDate(new Date(year, month, day - 1));
    setDateState(state);
  };

  const settingPopup = (
    title: string,
    text: string,
    button: string,
    type: string,
    popupState: boolean,
  ) => {
    dispatch(
      popupSlice.actions.setPopup({
        title: title,
        text: text,
        button: button,
        type: type,
        popupState: popupState,
      }),
    );
  };

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
    const dau = await getDau(data);
    const visitor = await getNewVisitor(data);
    const returnVisitor = await getReturnVisitor(data);

    console.log(dau, visitor, returnVisitor);
  };

  useEffect(() => {
    DateSetting(8, 'default');
  }, []);

  return (
    <div className="flex p-20 w-f h-[300px] flex-col">
      <div className="w-f h-[200px]">
        <div className="text-3xl font-extrabold">방문현황</div>
        <div className="text-sm mt-2">
          게임 인베디드 후, 사용자가 얼마나 방문했는지 확인해보세요
        </div>

        <div className="flex">
          <div className="mt-14 flex text-base font-bold w-[45%]">
            {list.map((value) => (
              <div className={'mr-4'}>{value.title}</div>
            ))}
          </div>
          <div className="flex mt-20">
            <div
              className={'small_button' + (dateState === 'eve' ? ' on' : '')}
              onClick={() => DateSetting(1, 'eve')}
            >
              전일
            </div>
            <div
              className={
                'small_button' + (dateState === 'default' ? ' on' : '')
              }
              onClick={() => DateSetting(8, 'default')}
            >
              일주일
            </div>
            <div
              className={'small_button' + (dateState === 'one' ? ' on' : '')}
              onClick={() => DateSetting(31, 'one')}
            >
              1개월
            </div>
            <div
              className={'small_button' + (dateState === 'three' ? ' on' : '')}
              onClick={() => DateSetting(91, 'three')}
            >
              3개월
            </div>

            <DatePicker
              className="select_box"
              selected={startDate}
              onChange={(date: Date) => onChangeStartDate(date)}
              dateFormat="yyyy-MM-dd"
            />

            <DatePicker
              className="select_box"
              selected={endDate}
              onChange={(date: Date) => onChangeEndDate(date)}
              dateFormat="yyyy-MM-dd"
            />

            <div
              onClick={submitInsightData}
              className="bg-og w-[53px] h-[33px] rounded text-white text-base text-center leading-8 ml-4"
            >
              조회
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default InsightHeader;
