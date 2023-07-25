import React from "react";
import InputForm from "./loginComponent/InputForm.tsx";

const Login = () => {
  return (
    <div className="w-sm h-sm border rounded-lg border-gray-300 text-center">
      <div className="text-2xl font-extrabold my-32">로그인</div>

      <div className="flex justify-center">
        <InputForm title={"아이디"} />
      </div>
      <div className="flex justify-center">
        <InputForm title={"비밀번호"} />
      </div>

      <div className="flex justify-center" >
        <div className="w-tcw h-bh mt-2 bg-slate-200 text-center leading-10">
          로그인
        </div>
      </div>

    </div>
  );
};

export default Login;
