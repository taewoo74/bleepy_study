import { insightApi } from './insight.ts';

interface DateType {
  startDate: string;
  endDate: string;
}

interface MonthType {
  startMonth: string;
  endMonth: string;
}

const getDau = async (params: DateType) => {
  try {
    const { data } = await insightApi.get(`/dau/by-period`, { params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getNewVisitor = async (params: DateType) => {
  try {
    const { data } = await insightApi.get('/new-visitor-count/by-period', {
      params,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getReturnVisitor = async (params: DateType) => {
  try {
    const { data } = await insightApi.get(
      '/returning-visitor-count/by-period',
      { params },
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getDateVisits = async (params: DateType) => {
  try {
    const { data } = await insightApi.get(`/visits/by-date`, { params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 월별 활성사용자수(MAU) 월별 데이터를 가져와주는 함수
 * @param params startMonth 시작연월 , endMonth 종료연월
 * @returns MAU 데이터 
 */

const getMau = async (params: MonthType) => {
  try {
    const { data } = await insightApi.get(`/visits/by-month`, { params });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getDau, getNewVisitor, getReturnVisitor , getDateVisits ,  getMau };
