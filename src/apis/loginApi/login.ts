import axios from 'axios';

const BASE_URL = 'https://mvp-api.bleepy.net/api/client-admin';
const ADMIN_URL = 'https://mvp-api.bleepy.net/api/bleepy-admin';

const baseAPI = (url: string) => {
  return axios.create({
    baseURL: url,
  });
};

export const loginApi = baseAPI(BASE_URL);
export const adminApi = baseAPI(ADMIN_URL);
