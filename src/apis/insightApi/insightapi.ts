import { insightApi } from "./insight.ts";


interface DateType {
  startDate: string;
  endDate: string;
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
    const { data } = await insightApi.get("/new-visitor-count/by-period", {
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
      "/returning-visitor-count/by-period",
      { params }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getDau , getNewVisitor , getReturnVisitor };

