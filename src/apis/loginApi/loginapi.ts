import { loginApi, adminApi } from './login.ts';

interface codeType {
  code: string;
}
interface userInfoType {
  email: string;
  password: string;
}
/**
 * 클라이언트 어드민 로그인
 * @param userInfo email: string , password:string
 * @returns  "accessToken": "string"
 */

const login = async (userInfo: userInfoType) => {
  try {
    const { data } = await loginApi.post('/login', userInfo);
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 어드민 로그인
 * @param code 값 string
 * @returns "accessToken": "string"
 */

const adminLogin = async (code: codeType) => {
  try {
    const { data } = await adminApi.post('/login', code);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { login, adminLogin };
