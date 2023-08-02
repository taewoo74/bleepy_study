import axios from "axios";

const BASE_URL = "https://mvp-api.bleepy.net/api/client-admin/";
const token = localStorage.getItem("accessToken");

const baseAPI = (url: string) => {
  return axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token ? token : ''} ` }
  });
};


export const homeApi = baseAPI(BASE_URL);
