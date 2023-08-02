import { Outlet } from 'react-router-dom';
import { navigationBarData } from '../data/data.tsx';
import SideMenuOne from './SideMenuOne.tsx';


const NavigationBar = () => {

    return (
        <div className='flex flex items-center justify-center' >
            <div className='flex direction-row w-[1440px] h-[auto] box-s' >
                <div className='w-[219px] h-[auto] bg-og pt-24' >
                    {navigationBarData.map((menuOne) => (
                        <SideMenuOne value={menuOne} key={menuOne.title} />
                    ))}
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default NavigationBar;