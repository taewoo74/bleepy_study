import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface sideMenuType {
    value: { title: string; href: string; side?: undefined; } |
    { title: string; href: string; side: { title: string; href: string; }[]; }
}

const SideMenuOne = ({ value }: sideMenuType) => {
    const [sideMenu, setSideMenu] = useState(false);
    // const location = useLocation().pathname;

    return (
        <Link to={value.side ? '#' : value.href} >
            <div className={'w-f min-height-[40px] leading-10 pl-4 text-white'} key={value.title} onClick={() => setSideMenu(!sideMenu)} >
                {value.title}
                {sideMenu && value.side && (
                    <>
                        {value.side.map((sideOne) => (
                            <Link to={sideOne.href} key={sideOne.title}  >
                                <div className='w-f h-[40px]' >
                                    {sideOne.title}
                                </div>
                            </Link>
                        ))
                        }
                    </>
                )}
            </div>
        </Link>
    )
}

export default SideMenuOne;