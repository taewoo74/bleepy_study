import axios from 'axios';

const baseURL = 'https://mvp-api.bleepy.net/api/client-admin/';
const token = localStorage.getItem('accessToken');

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

// const instance = axios.create({
//   baseURL: BASE_URL,
// });

//

export const homeApi = instance;
