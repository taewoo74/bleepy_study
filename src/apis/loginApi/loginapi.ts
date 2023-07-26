import axios from "axios";

const BASE_URL = 'https://mvp-api.bleepy.net/api/client-admin'

const baseAPI = (url : string) => {
  return axios.create({
    baseURL: url,
    // headers: {
    //   Authorization: `bearer ${token}`,
    // },
  });
};


export const loginApi = baseAPI(BASE_URL);