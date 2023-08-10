import React from 'react';
// import Config from 'react-native-config';
import { Provider } from 'react-redux';
import store from '../src/store/index';
import App from './views/App.tsx';
import '../src/styles/index.css';
import ReactDOM from 'react-dom/client';

import { worker } from './mocks/worker';
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </Provider>,
);
