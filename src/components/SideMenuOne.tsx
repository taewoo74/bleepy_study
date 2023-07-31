import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface sideMenuType {
  value:
    | {
        title: string;
        href: string;
        side?: undefined;
      }
    | {
        title: string;
        href: string;
        side: {
          title: string;
          href: string;
        }[];
      };
} // 오밋 파셜 픽

const SideMenuOne = ({ value }: sideMenuType) => {
  const [sideMenu, setSideMenu] = useState(false);

  //페이지 이동 함수 

  return (
    <Link to={value.side ? '#' : value.href}>
      <div
        className={'w-f min-height-[40px] leading-10 pl-4 text-white'}
        onClick={() => setSideMenu(!sideMenu)}
      >
        {value.title}
        {sideMenu && value.side && (
          <>
            {value.side.map((sideOne) => (
              <Link to={sideOne.href} key={sideOne.title}>
                <div key={sideOne.title} className="w-f h-[40px]">{sideOne.title}</div>
              </Link>
            ))}
          </>
        )}
      </div>
    </Link>
  );
};

export default SideMenuOne;
