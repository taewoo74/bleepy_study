import { useState } from 'react'
import { Link, Outlet, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InsightHeader = () => {
  const location = useLocation().pathname;
  const [startDate, setStartDate] = useState<Date|null>(new Date());
  const [endDate, setEndDate] = useState<Date|null>(new Date());
  const list = [
    { title: "DAU", link: "/insight/DAU" },
    { title: "MAU", link: "/insight/MAU" },
    { title: "요일별", link: "/insight/DAY" },
    { title: "시간대별", link: "/insight/TIME" },
  ];

  return (
    <div className="flex p-20 w-f h-f flex-col">
      <div className="w-f h-[200px]">
        <div className="text-3xl font-extrabold">방문현황</div>
        <div className="text-sm mt-2">
          게임 인베디드 후, 사용자가 얼마나 방문했는지 확인해보세요
        </div>

        <div className="flex">
          <div className="mt-14 flex text-base font-bold w-[45%]">
            {list.map((value) => (
              <Link to={value.link} key={value.title}>
                <div
                  className={
                    "mr-4" + (location === value.link ? "" : " gray-color")
                  }
                >
                  {value.title}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex mt-20">
            <div className="small_button">전일</div>
            <div className="small_button">일주일</div>
            <div className="small_button">1개월</div>
            <div className="small_button">3개월</div>

            <DatePicker
              className="select_box"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
            />

            <DatePicker
              className="select_box"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
            />

            <div className='bg-og w-[53px] h-[33px] rounded text-white text-base text-center leading-8 ml-4' >조회</div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default InsightHeader;
