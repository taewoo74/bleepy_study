import axios from 'axios';

const BASE_URL = 'https://mvp-api.bleepy.net/api/bleepy-admin/clients/';
const token = localStorage.getItem('accessToken');

// login;
// code: 'bleepyAdminDK';

const instance = axios.create({
  baseURL: BASE_URL,
});

if (token) instance.defaults.headers.common['Authorization'] = token;

export const homeApi = instance;
