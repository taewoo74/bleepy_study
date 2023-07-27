import { Outlet } from 'react-router-dom';
import { navigationBarData } from '../data/data.tsx';
import SideMenuOne from './SideMenuOne.tsx';


const NavigationBar = () => {

    return (
        <div className='flex direction-row w-f h-f' >
            <div className='w-[219px] h-f bg-og pt-24' >
                {navigationBarData.map((menuOne) => (
                    <SideMenuOne value={menuOne} key={menuOne.title} />
                ))}
            </div>
            <Outlet />
        </div>
    )
}

export default NavigationBar;