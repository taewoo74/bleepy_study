import { Link, Outlet } from 'react-router-dom';

const InsightHeader = () => {
    return (
        <div className='flex p-20 w-f h-f flex-col' >

            <div className='w-f h-[200px]' >
                <div className='text-3xl font-extrabold' >방문현황</div>
                <div className='text-sm' >게임 인베디드 후, 사용자가 얼마나 방문했는지 확인해보세요 </div>

                <div>
                    <div>
                        <Link to="/insight/DAU">DAU</Link>
                    </div>
                    <div>
                        <Link to="/articles/MAU">MAU</Link>
                    </div>
                    <div>
                        <Link to="/articles/요일별">요일별</Link>
                    </div>
                    <div>
                        <Link to="/articles/시간대별">시간대별</Link>
                    </div>
                </div>
            </div>
            <Outlet />

        </div>
    )

}

export default InsightHeader;