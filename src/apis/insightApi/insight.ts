import axios from "axios";

const BASE_URL = "https://mvp-api.bleepy.net/api/client-admin/insight";
const token = localStorage.getItem("accessToken");

const baseAPI = (url: string) => {
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const insightApi = baseAPI(BASE_URL);
