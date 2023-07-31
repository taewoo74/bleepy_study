import Chart from '../../../components/Chart'
import { chartDataType } from '../Home.tsx'

export type chartType = {
    chartData: Array<chartDataType>
}


const HomeChart = ({ chartData }: chartType) => {
    return (
        <div className="w-f h-[350px] flex-row flex" >
            <div className="w-[676px] h-[300px]" >
                <div className='mt-10 text-xl font-bold' >최근 30일간 방문현황 그래프 </div>
                <Chart chartData={chartData} />
            </div>
            <div className='relative flex ' >
                <div className='w-[405px] h-[346px] bg-[#FFF8F5] ml-28 p-5 blur-sm' >
                    공지사항
                    <div className='flex mt-5' >
                        <div className='mr-auto' >TEXT</div>
                        <div>YY.MM.DD</div>
                    </div>
                    <div className='flex mt-5' >
                        <div className='mr-auto' >TEXT</div>
                        <div>YY.MM.DD</div>
                    </div>
                    <div className='flex mt-5' >
                        <div className='mr-auto' >TEXT</div>
                        <div>YY.MM.DD</div>
                    </div>
                    <div className='flex mt-5' >
                        <div className='mr-auto' >TEXT</div>
                        <div>YY.MM.DD</div>
                    </div>
                    <div className='flex mt-5' >
                        <div className='mr-auto' >TEXT</div>
                        <div>YY.MM.DD</div>
                    </div>
                    <div className='flex mt-5' >
                        <div className='mr-auto' >TEXT</div>
                        <div>YY.MM.DD</div>
                    </div>
                </div>
                <div className='w-[108px] h-[41px] bg-black absolute text-white text-center rounded-2xl leading-10 text-sm top-[148.5px] left-[264.5px]' >준비중입니다.</div>
            </div>
        </div>
    )
}

export default HomeChart;



