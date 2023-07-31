import chart from '../../../assets/img/chart.png'
import clock from '../../../assets/img/clock.png'
import vector from '../../../assets/img/Vector.png'
import { headerDataType } from '../Home'

interface propsType {
    headerData: headerDataType
}

const HomeHeader = ({ headerData }: propsType) => {
    return (
        <div className="w-f h-[200px]">
            <div className="text-3xl font-extrabold">클라이언트 사업자명님 환영합니다!</div>
            <div className="text-sm mt-2">
                그동안 몇 명의 사용자가 방문했는지, 리워드 미지급자는 없는지 빠르게 확인해보세요!
            </div>

            <div className="mt-3 flex-row flex pt-6" >
                <div className="small_box">
                    <div className="text-xs text-gray-500" >최근 30일간 방문 횟수</div>
                    <div className='flex flex-row justify-start' >
                        <img className='w-[24px] h-[28px] mt-4 ml-3 mr-auto' src={vector} />
                        <div className='mt-6' >{headerData.monthVisit}</div>
                    </div>
                </div>
                <div className="small_box">
                    <div className="text-xs text-gray-500" >최근 30일간 평균 체류시간</div>
                    <div className='flex flex-row' >
                        <img className='w-[30px] h-[30px] mt-4 ml-2 mr-auto' src={clock} />
                        <div className='mt-6'>{headerData.monthVisitTime}</div>
                    </div>
                </div>
                <div className="small_box">
                    <div className="text-xs text-gray-500" >5월 MAU</div>
                    <div className='flex flex-row' >
                        <img className='w-[30px] h-[30px] mt-4 ml-2 mr-auto' src={chart} />
                        <div className='mt-6'>{headerData.mau}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader;



