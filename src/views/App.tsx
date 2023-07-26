import "../styles/App.css";
import { useState } from "react";
import LoginView from './login/LoginView.tsx';
import Popup from "../components/Popup.tsx";

const App = () => {
  const [popupState, setPopupState] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-f">
      <LoginView setPopupState = {setPopupState} />
      {popupState && (
        <Popup title="현재 준비중인 서비스 입니다." text="조금만 기다려주세요" button="확인" setPopupState={setPopupState} />
      )}
    </div>
  );
}

export default App;
