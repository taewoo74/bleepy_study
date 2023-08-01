import { Outlet, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MouseEventHandler } from "react";

const list = [
  { title: 'DAU', id: 1, dataKey: 'DAU' },
  { title: 'MAU', id: 2, dataKey: 'MAU' },
  { title: '요일별', id: 3, dataKey: 'DATE' },
  { title: '시간대별', id: 4, dataKey: 'TIME' },
];

interface InsightHeaderType {
  DateSetting: (num: number, str: string) => void
  // submitInsightData: MouseEventHandler<HTMLInputElement>
  // submitMauData:() => void;
  onChangeEndDate: (date: Date) => void
  onChangeStartDate: (date: Date) => void
  endDate: Date;
  startDate: Date;
  tabState: string;
  onClickTabMenu: (str: string) => void;
  dateState: string;
  datePickerFormat: string;
  onClickSubmit:MouseEventHandler<HTMLInputElement>
}


const InsightHeader = (props: InsightHeaderType) => {
  const { DateSetting, onClickSubmit, onChangeEndDate, onChangeStartDate, startDate, endDate, tabState, onClickTabMenu, dateState, datePickerFormat } = props

  const tabStyled = (dataKey: string) => {
    if (tabState === dataKey)
      return ''
    else
      return 'text-[#1212127A]'
  }

  const dayStyled = (date: string) => {
    if (date === dateState)
      return ' on'
    else
      return ''
  }



  return (
    <div className="flex w-f h-[220px] flex-col">
      <div className="w-f h-[200px]">
        <div className="text-3xl font-extrabold">방문현황</div>
        <div className="text-sm mt-2">
          게임 인베디드 후, 사용자가 얼마나 방문했는지 확인해보세요
        </div>

        <div className="flex">
          <div className="mt-14 flex text-base font-bold w-[45%]">
            {list.map((value) => (
              <div key={value.id} className={`mr-4  ${tabStyled(value.dataKey)}`} onClick={() => onClickTabMenu(value.dataKey)} >{value.title}</div>
            ))}
          </div>

          <div className="flex mt-20 ml-auto">
            {tabState === 'DAU' && (
              <>
                <div className={`small_button ${dayStyled("eve")}`} onClick={() => DateSetting(1, 'eve')} >
                  전일
                </div>
                <div className={`small_button ${dayStyled("default")}`} onClick={() => DateSetting(8, 'default')} >
                  일주일
                </div>
                <div className={`small_button ${dayStyled("one")}`} onClick={() => DateSetting(31, 'one')}>
                  1개월
                </div>
                <div className={`small_button ${dayStyled("three")}`} onClick={() => DateSetting(91, 'three')}>
                  3개월
                </div>
              </>
            )}

            <DatePicker
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
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default InsightHeader;
