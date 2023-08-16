import { useState, ChangeEvent } from 'react';
import InputForm from './loginComponent/InputForm.tsx';
import FullButton from '../../components/FullButton.tsx';
import { login, adminLogin } from '../../apis/loginApi/loginapi.ts';
import { useNavigate } from 'react-router-dom';
import popupStore from '../../zustand/popup/popup.tsx';

const LoginView = () => {
  const { setState } = popupStore();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [passWord, setPassWord] = useState(''); // 한개로

  const openPopup = () => {
    setState({
      title: '현재 준비중인 서비스입니다.',
      text: '조금만 기다려주세요.',
      button: '확인',
      type: 'default',
      popupState: true,
    });
  };

  const InputChangeValue = (
    event: ChangeEvent<HTMLInputElement>,
    title: string,
  ) => {
    const value = event.target.value;
    const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (check.test(value)) {
      return;
    }

    if (title === '아이디') {
      setId(value);
    } else {
      setPassWord(value);
    }
  };

  const LoginSubmit = async () => {
    if (!buttonState) {
      return;
    }
    const loginInfo = {
      email: id,
      password: passWord,
    };
    const accessToken = await login(loginInfo);
    localStorage.setItem('accessToken', accessToken.accessToken);
    const code = {
      code: 'bleepyAdminDK',
    };
    const adminAccessToken = await adminLogin(code);
    localStorage.setItem('adminAccessToken', adminAccessToken.accessToken);

    navigate('/home');
  };

  let buttonState = false;
  if ((id && id.length > 0) || (passWord && passWord.length > 0)) {
    buttonState = true;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-f ">
      <div className="w-[440px] h-sm border rounded-lg border-gray-300 text-center p-5">
        <div className="text-2xl font-extrabold my-28">로그인</div>

        <div className="flex justify-center">
          <InputForm
            title={'아이디'}
            placeholder={'이메일 주소 입력'}
            value={id}
            InputChangeValue={InputChangeValue}
          />
        </div>
        <div className="flex justify-center">
          <InputForm
            title={'비밀번호'}
            placeholder={''}
            value={passWord}
            InputChangeValue={InputChangeValue}
          />
        </div>

        <div className="flex justify-center mt-4">
          <FullButton
            buttonState={buttonState}
            text={'로그인'}
            LoginSubmit={LoginSubmit}
          />
        </div>

        <div className="flex mt-4 h-tch items-start flex-col text-sm">
          <div className="text-gray-400">
            계정이 없으신가요?{' '}
            <span
              onClick={() => openPopup()}
              className="underline text-black ml-2 cursor-pointer"
            >
              회원가입
            </span>
          </div>
          <div className="text-gray-400">
            아이디/비빌번호를 잊으셨나요?{' '}
            <span
              onClick={() => openPopup()}
              className="underline text-black ml-2 cursor-pointer"
            >
              아이디/비밀번호
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
