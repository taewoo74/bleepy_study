import React from 'react';
import App from './views/App.tsx';
import '../src/styles/index.css';
import ReactDOM from 'react-dom/client';

import { worker } from './mocks/worker';
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
