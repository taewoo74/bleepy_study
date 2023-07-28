import { insightApi } from "./insight.ts";
import { dateFormat } from "../../utils/utils.ts";

/**
 * insight 데이터 불러오기
 * @param startDate  시작 날짜
 * @param endDate  끝나는 날짜
 * @returns dau , newvitor , returnvitor 값들 리턴
 */
const getInsightData = async (startDate: Date, endDate: Date) => {
  const data = {
    "startDate": dateFormat(startDate),
    "endDate": dateFormat(endDate),
  };

  const Dau = await getDau(data);
  const newVitor = await getNewVisitor(data);
  const returnVitor = await getReturnVisitor(data);
  return { Dau , newVitor , returnVitor }
  //한개씩만 이페이지는 부르는일만 
};

interface DateType {
    startDate:string;
    endDate:string;
}

const getDau = async (params:DateType ) => {
  try {
    const { data } = await insightApi.get(`/dau/by-period`, {params} );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getNewVisitor = async (params:DateType) => {
  try {
    const { data } = await insightApi.get('/new-visitor-count/by-period', {params });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getReturnVisitor = async (params:DateType) => {
  try {
    const { data } = await insightApi.get('/returning-visitor-count/by-period', {params});
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getInsightData };
