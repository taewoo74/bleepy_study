import { Outlet, useLocation } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { MouseEventHandler } from 'react';
import classNames from 'classnames';

const list = [
  { title: 'DAU', id: 1, dataKey: 'DAU' },
  { title: 'MAU', id: 2, dataKey: 'MAU' },
  { title: '요일별', id: 3, dataKey: 'DATE' },
  { title: '시간대별', id: 4, dataKey: 'TIME' },
];

interface InsightHeaderType {
  onClickTabMenu: (str: string) => void; // 탭메뉴를 변경해주는 함수
  tabState: string;
}

const InsightHeader = ({ onClickTabMenu, tabState }: InsightHeaderType) => {
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
                className={classNames('mr-4', {
                  'text-[#1212127A]': value.dataKey !== tabState,
                })}
                onClick={() => onClickTabMenu(value.dataKey)}
              >
                {value.title}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default InsightHeader;
