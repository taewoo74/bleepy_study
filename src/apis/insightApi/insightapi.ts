import { insightApi } from './insight.ts';

interface DateType {
  startDate: string;
  endDate: string;
}

interface MonthType {
  startMonth: string;
  endMonth: string;
}
/**
 * 조회 기간별 방문횟수 조회 api
 * @param params  startDate - 시작날짜 , endDate - 끝나는 날짜
 * @returns 조회 기간별 방문횟수
 */

const getDau = async (params: DateType) => {
  try {
    const { data } = await insightApi.get(`/dau/by-period`, { params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 조회 기간별 신규 방문자 수 조회 api
 * @param params  startDate - 시작날짜 , endDate - 끝나는 날짜
 * @returns 조회 기간별 방문횟수
 */

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

/**
 * 조회 기간별 재 방문자 수 조회 api
 * @param params  startDate - 시작날짜 , endDate - 끝나는 날짜
 * @returns 조회 기간별 재 방문자 수
 */

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

/**
 * 일자별 방문 현황 목록 조회 api
 * @param params  startDate - 시작날짜 , endDate - 끝나는 날짜
 * @returns  [{"date": "2023-08-02", "visitCount": 0, "dau": 0, "newVisitorCount": 0, "returningVisitorCount": 0 }]
 */

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

export { getDau, getNewVisitor, getReturnVisitor, getDateVisits, getMau };
