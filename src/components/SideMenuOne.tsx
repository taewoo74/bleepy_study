import { Link, useLocation } from 'react-router-dom';
import { useState, MouseEvent } from 'react';

interface side {
    title: string;
    href: string;
}

interface sideMenuType {
  value: {
    title:string;
    href: string;
    side: any;
  };
}

const SideMenuOne = ({ value }: sideMenuType) => {
  const [sideMenu, setSideMenu] = useState(false);
  const [selectSide, setSelectSide] = useState('');
  const location = useLocation();

  const selected = (href: string) => {
    if (location.pathname === href) {
      return 'text-white';
    } else {
      return 'text-[#FFFFFFB8]';
    }
  };
  const selectedside = (title: string) => {
    if (selectSide === title) {
      return 'bg-[#0000001F]';
    } else {
      return '';
    }
  };

  const onClickSide = (event: MouseEvent<HTMLDivElement>, title: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectSide(title);
  };

  return (
    <Link to={value.side ? '#' : value.href}>
      <div
        className={`w-f min-height-[40px] leading-10 pl-4 font-bold text-[15px] ${selected(
          value.href,
        )}`}
        onClick={() => setSideMenu(!sideMenu)}
      >
        {value.title}
        {sideMenu && value.side && (
          <>
            {value.side.map((sideOne: side) => (
              <div
                key={sideOne.title}
                className={`w-[180px] h-[40px] pl-2 rounded ${selectedside(
                  sideOne.title,
                )}`}
                onClick={(event) => onClickSide(event, sideOne.title)}
              >
                {sideOne.title}
              </div>
            ))}
          </>
        )}
      </div>
    </Link>
  );
};

export default SideMenuOne;
