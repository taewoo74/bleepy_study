import { loginApi } from "./loginapi.ts";

const login = async (userInfo: { email : string , password : string }) => {
  try {
    const { data } = await loginApi.post("/login", userInfo);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { login };
