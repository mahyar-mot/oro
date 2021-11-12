import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, Empty, message } from 'antd';
import '../node_modules/antd/dist/antd.compact.min.css'
import './assets/scss/style.scss';
import App from './App';
// import {StateProvider} from "./context/store";
import { Provider } from "react-redux";
import store from "./redux/store";
import fair from "antd/lib/locale/fa_IR"
import * as serviceWorker from './serviceWorker';

ConfigProvider.config({
  message: message.config({
    duration: 4,
    maxCount: 3,
    top: 120,
    rtl: true,
  })
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={fair} direction="rtl" renderEmpty={() => <Empty description="موردی برای نمایش وجود ندارد"/>} >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
