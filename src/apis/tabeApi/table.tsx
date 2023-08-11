import axios from 'axios';

const baseURL = 'https://mvp-api.bleepy.net/api/bleepy-admin/';
const token = localStorage.getItem('adminAccessToken');
const instance = axios.create({ baseURL });

if (token) {
  instance.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    },
  );
}

if (token) instance.defaults.headers.common['Authorization'] = token;

export const tableApi = instance;
