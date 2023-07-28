import "../styles/App.css";
import LoginView from './login/LoginView.tsx';
import Popup from "../components/Popup.tsx";
import InsightHeader from "./insight/insightComponents/InsightHeader.tsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar.tsx';
import InsightView from './insight/InsightView.tsx'
import RewardView from "./reward/RewardView.tsx";
import { useSelector } from 'react-redux';
import { RootState } from "../store/reducer";

const App = () => {
  const { popupState } = useSelector((state: RootState) => state.popup);

  return (
    <div className="flex flex-col justify-center items-center h-f">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView  />} />
          <Route element={<NavigationBar />} >
            <Route path="/insight" element={<InsightHeader />} >
              <Route path=":id" element={<InsightView />} ></Route>
            </Route>
            <Route path="/reward" element={<RewardView />} ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {popupState && (
        <Popup/>
      )}
    </div>
  );
}

export default App;
