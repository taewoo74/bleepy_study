import { useState, ChangeEvent } from "react";
import InputForm from "./loginComponent/InputForm.tsx";
import FullButton from "../../components/FullButton.tsx";
import { login } from "../../apis/loginApi/login.ts";

type propsType = {
  setPopupState: (result: boolean) => void
}

const LoginView = (props:propsType) => {
  const { setPopupState } = props;
  const [id, setId] = useState('');
  const [passWord, setPassWord] = useState(''); // 한개로

  const InputChangeValue = (event: ChangeEvent<HTMLInputElement>, title: string) => {
    const value = event.target.value;
    var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (check.test(value)) {
      return;
    }

    if (title === "아이디") {
      setId(value);
    } else {
      setPassWord(value);
    }
  }

  const LoginSubmit = () => {
    if(!buttonState) {
      return;
    }

    const loginInfo = { 
      "email": id, 
      "password": passWord 
    }

    const result = login(loginInfo);
    console.log(result);

  }


  let buttonState = false;
  if ((id && id.length > 0) || (passWord && passWord.length > 0)) {
      buttonState = true;
  }

  return (
    <div className="w-[440px] h-sm border rounded-lg border-gray-300 text-center p-5">
      <div className="text-2xl font-extrabold my-28">로그인</div>

      <div className="flex justify-center">
        <InputForm title={"아이디"} placeholder={"이메일 주소 입력"} value={id} InputChangeValue={InputChangeValue} />
      </div>
      <div className="flex justify-center">
        <InputForm title={"비밀번호"} placeholder={""} value={passWord} InputChangeValue={InputChangeValue} />
      </div>

      <div className="flex justify-center mt-4" >
        <FullButton buttonState={buttonState} text={"로그인"} LoginSubmit={LoginSubmit} />
      </div>

      <div className="flex mt-4 h-tch items-start flex-col text-sm" >
        <div className="text-gray-400" >계정이 없으신가요? <span onClick={() => setPopupState(true)} className="underline text-black ml-2 cursor-pointer" >회원가입</span></div>
        <div className="text-gray-400" >아이디/비빌번호를 잊으셨나요? <span onClick={() => setPopupState(true)} className="underline text-black ml-2 cursor-pointer">아이디/비밀번호</span></div>
      </div>
    </div>
  );
};

export default LoginView;
