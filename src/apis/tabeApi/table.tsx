import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const baseURL = 'https://mvp-api.bleepy.net/api/bleepy-admin/';
const access_token = localStorage.getItem('adminAccessToken');

const authAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 100000000,
  headers: { 'Content-Type': 'application/json' },
});

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig | any => {
  /* 토큰이 있을 경우 헤더에 삽입한다. 없을 경우 빈 문자열을 넣는다(null은 안됨) */
  config.headers = {
    Authorization: !!access_token ? `Bearer ${access_token}` : '',
  };
  return config;
};
const onErrorRequest = (err: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(err);
};
authAxios.interceptors.request.use(onRequest, onErrorRequest);

export const tableApi = authAxios;
