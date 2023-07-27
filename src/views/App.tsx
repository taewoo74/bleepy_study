import "../styles/App.css";
import { useState } from "react";
import LoginView from './login/LoginView.tsx';
import Popup from "../components/Popup.tsx";
import InsightHeader from "./insight/insightComponents/InsightHeader.tsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar.tsx';
import InsightView from './insight/InsightView.tsx'
import RewardView from "./reward/RewardView.tsx";

const App = () => {
  const [popupState, setPopupState] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-f">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView setPopupState={setPopupState} />} />
          <Route element={<NavigationBar />} >
            <Route path="/insight" element={<InsightHeader />} >
              <Route path=":id" element={<InsightView />} ></Route>
            </Route>
            <Route path="/reward" element={<RewardView />} ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {popupState && (
        <Popup title="현재 준비중인 서비스 입니다." text="조금만 기다려주세요" button="확인" setPopupState={setPopupState} />
      )}
    </div>
  );
}

export default App;
