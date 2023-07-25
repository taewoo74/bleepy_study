import "../styles/App.css";
import React from 'react'
import Login from './login/Login.tsx';


const App:React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-f">
      <Login />
    </div>
  );
}

export default App;
