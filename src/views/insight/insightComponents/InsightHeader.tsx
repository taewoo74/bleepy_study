import { Outlet, useLocation } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import { MouseEventHandler } from 'react';

const list = [
  { title: 'DAU', id: 1, dataKey: 'DAU' },
  { title: 'MAU', id: 2, dataKey: 'MAU' },
  { title: '요일별', id: 3, dataKey: 'DATE' },
  { title: '시간대별', id: 4, dataKey: 'TIME' },
];

interface InsightHeaderType {
  onClickTabMenu: (str: string) => void; // 탭메뉴를 변경해주는 함수
  // dateState: string; //
  // DateSetting: (num: number, str: string) => void //
  // onChangeEndDate: (date: Date) => void //
  // onChangeStartDate: (date: Date) => void //
  // endDate: Date; //
  // startDate: Date; //
  // tabState: string; //
  // datePickerFormat: string; //
  // onClickSubmit:MouseEventHandler<HTMLInputElement> //
}

const InsightHeader = ({ onClickTabMenu }: InsightHeaderType) => {
  // const { DateSetting, onClickSubmit, onChangeEndDate, onChangeStartDate, startDate, endDate, tabState, onClickTabMenu, dateState, datePickerFormat } = props

  // const tabStyled = (dataKey: string) => {
  //   if (tabState === dataKey)
  //     return ''
  //   else
  //     return 'text-[#1212127A]'
  // }

  // const dayStyled = (date: string) => {
  //   if (date === dateState)
  //     return ' on'
  //   else
  //     return ''
  // }

  return (
    <div className="flex w-f flex-col">
      <div className="w-f">
        <div className="text-3xl font-extrabold">방문현황</div>
        <div className="text-sm mt-2">
          게임 인베디드 후, 사용자가 얼마나 방문했는지 확인해보세요
        </div>

        <div className="flex">
          <div className="mt-14 flex text-base font-bold w-[45%]">
            {list.map((value) => (
              <div
                key={value.id}
                className={'mr-4'}
                onClick={() => onClickTabMenu(value.dataKey)}
              >
                {value.title}
              </div>
            ))}
          </div>

          <div className="flex mt-20 ml-auto">
            {/* {tabState === 'DAU' && (
              <>
                <div className={'small_button'} onClick={() => DateSetting(1)} >
                  전일
                </div>
                <div className={'small_button'} onClick={() => DateSetting(8)} >
                  일주일
                </div>
                <div className={'small_button'} onClick={() => DateSetting(31)}>
                  1개월
                </div>
                <div className={'small_button'} onClick={() => DateSetting(91)}>
                  3개월
                </div>
              </>
            )} */}

            {/* <DatePicker
              className="select_box"
              selected={startDate}
              onChange={(date: Date) => onChangeStartDate(date)}
              dateFormat={datePickerFormat}
            />

            <DatePicker
              className="select_box"
              selected={endDate}
              onChange={(date: Date) => onChangeEndDate(date)}
              dateFormat={datePickerFormat}
            />

            <div
              onClick={onClickSubmit}
              className="bg-og w-[53px] h-[33px] rounded text-white text-base text-center leading-8 ml-4"
            >
              조회
            </div>*/}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default InsightHeader;
