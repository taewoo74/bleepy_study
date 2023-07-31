import { homeApi } from "./home.tsx";


interface DateType {
  startDate: string;
  endDate: string;
}

interface MonthType {
  startMonth: string;
  endMonth: string;
}

interface RewardType {
  pageSize: number,
  sortOption: string,
  sortType: string,
}

/**
 * 최근 30일 방문횟수 조회 
 * @param params startDate - 시작날짜 , endDate - 끝나는 날짜
 * @returns 최근 30일 방문횟수
 */

const getMonthVisit = async (params: DateType) => {
  try {
    const { data } = await homeApi.get(`insight/visit-count/by-period`, { params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 최근 30일 평균 체류시간 조회 
 * @param params startDate - 시작날짜 , endDate - 끝나는 날짜
 * @returns 최근 30일 체류시간 
 */

const getMonthTimeVisit = async (params: DateType) => {
  try {
    const { data } = await homeApi.get(`insight/stay-time-avg/by-period`, { params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
* 월별 방문 현황 조회
* @param params startMonth - 시작연월 , endMonth - 종료연월
* @returns 월별 방문 현황 목록
*/

const getMau = async (params: MonthType) => {
  try {
    const { data } = await homeApi.get(`insight/visits/by-month`, { params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getDayVisits = async (params: DateType) => {
  try {
    const { data } = await homeApi.get(`insight/visits/by-date`, { params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getRewardState = async (params: RewardType) => {
  try {
    const { data } = await homeApi.get(`rewards`, { params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getMonthVisit, getMonthTimeVisit, getMau, getDayVisits, getRewardState };

