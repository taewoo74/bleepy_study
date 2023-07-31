import HomeHeader from './homecomponent/HomeHeader.tsx';
import HomeChart from './homecomponent/HomeChart.tsx';
import Reward from './homecomponent/Reward.tsx';
import { getMonthVisit, getMonthTimeVisit, getMau, getDayVisits, getRewardState } from '../../../src/apis/homeApi/homeapi.tsx'
import { useEffect, useState } from 'react';
import { dateFormat, dateFormat2 } from '../../utils/utils.ts';

export interface headerDataType {
    monthVisit: number;
    monthVisitTime: number;
    mau: number;
}

export interface chartDataType {
    name: string;
    visite: number;
}

export interface rewardType {
    id:number;
    gameName: string;
    itemName: string;
    achievementScore: number,
    pendingPaymentCount: number;
}

const Home = () => {
    const [headerData, sethHaderData] = useState<headerDataType>({ monthVisit: 0, monthVisitTime: 0, mau: 0 });
    const [chartData, setChartData] = useState<Array<chartDataType>>([{ name: '', visite: 0 }]);
    const [rewardData, setRewardData] = useState<Array<rewardType>>([{id: 0 , gameName: '', itemName: '', achievementScore: 0, pendingPaymentCount: 0 }]);

    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    const data = {
        "startDate": dateFormat(new Date(year, month, day - 31)),
        "endDate": dateFormat(new Date(year, month, day - 1)),
    };

    const getHeaderData = async () => {
        const mauData = {
            "startMonth": dateFormat2(new Date(year, month, day)),
            "endMonth": dateFormat2(new Date(year, month, day)),
        }

        const monthVisit = await getMonthVisit(data);
        const monthVisitTime = await getMonthTimeVisit(data);
        const mau = await getMau(mauData);
        const headerData = {
            monthVisit,
            monthVisitTime,
            mau: mau[0].mau
        }
        sethHaderData(headerData);
    }

    const getChartData = async () => {
        const monthVisit = await getDayVisits(data);
        let reulst: Array<chartDataType> = [];
        monthVisit.forEach((arr: any) => {
            let one = { name: '', visite: 0 }
            one.name = arr.date.substring(5);
            one.visite = arr.visitCount
            reulst.push(one);
        });
        setChartData(reulst);
    }

    const getRewardData = async () => {
        const data = {
            "pageSize": 5,
            "sortOption": "REWARD_ACHIEVEMENT_SCORE",
            "sortType": "ASC"
        }

        const rewardData = await getRewardState(data);
        console.log(rewardData);
        let result: Array<rewardType> = [];
        rewardData.data.forEach((arr: any) => {
            let one = { id:0 , gameName: '', itemName: '', achievementScore: 0, pendingPaymentCount: 0 }
            one.id = arr.id;
            one.gameName = arr.gameName;
            one.itemName = arr.itemName;
            one.achievementScore = arr.achievementScore;
            one.pendingPaymentCount = arr.pendingPaymentCount;
            result.push(one);
        });
        setRewardData(result);


    }

    useEffect(() => {
        getHeaderData();
        getChartData();
        getRewardData();
    }, []);

    return (
        <div className="flex p-20 w-f h-f flex-col" >
            <HomeHeader headerData={headerData} />
            <HomeChart chartData={chartData} />
            <Reward  rewardData={rewardData} />
        </div>
    )
}

export default Home;



