import '../styles/App.css';
import LoginView from './login/LoginView.tsx';
import Popup from '../components/Popup.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar.tsx';
import Insight from './insight/Insight.tsx';
import RewardView from './reward/RewardView.tsx';
import Home from './home/Home.tsx';
import popupStore from '../zustand/popup/popup.tsx';

const App = () => {
  const { popupData } = popupStore();
  const { popupState } = popupData;

  return (
    <div className="relative min-h-screen w-f flex items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route element={<NavigationBar />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/insight" element={<Insight />}></Route>
            <Route path="/reward" element={<RewardView />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {popupState && <Popup />}
    </div>
  );
};

export default App;
