import { Link, useLocation } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import arrow from '../assets/img/arrow.png'

interface side {
  map: any;
  title: string;
  href: string;
}

interface sideMenuType {
  value: {
    title: string;
    href: string;
    side?: Partial<side>;
  };
}

const SideMenuOne = ({ value }: sideMenuType) => {
  const [sideMenu, setSideMenu] = useState(false);
  const [selectSide, setSelectSide] = useState('');
  const location = useLocation();

  /* side 메뉴 클릭시 해당메뉴 선택되게 바꾸는 함수 */
  const onClickSide = (event: MouseEvent<HTMLDivElement>, title: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectSide(title);
  };

  return (
    <Link to={value.side ? '#' : value.href}>
      <div
        className={`w-f min-height-[40px] leading-10 pl-4 font-bold text-[15px]
        ${location.pathname === value.href ? ' text-white' : ' text-[#FFFFFFB8]'}
        `}
        onClick={() => setSideMenu(!sideMenu)}>
        <div className='flex' >{value.title}
          {value.side &&
            <img className={`w-[11px] h-[7px] ml-[auto] mr-[20px] mt-[14px] ${ sideMenu && ' scale'} `} src={arrow} />
          }
        </div>

        <div className='flex flex-col' >
          {sideMenu && value.side && (
            <>
              {value.side.map((sideOne: side) => (
                <div
                  key={sideOne.title}
                  className={`w-[180px] h-[40px] pl-2 rounded 
                ${selectSide === sideOne.title ? ' bg-[#0000001F]' : ''}
                `}
                  onClick={(event) => onClickSide(event, sideOne.title)}
                >
                  {sideOne.title}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SideMenuOne;
