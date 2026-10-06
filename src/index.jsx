import React from 'react';
import { createRoot } from 'react-dom/client';
import Route from './router/';
import FastClick from 'fastclick';
import {Provider} from 'react-redux';
import store from '@/store/store';
import './utils/setRem';
import './style/base.css';
import './assets/iconfonts/iconfont.css';

// fastclick 的 CJS 导出本身就是 attach 函数，直接调用
FastClick(document.body);

// 监听state变化
// store.subscribe(() => {
//   console.log('store发生了变化');
// });

createRoot(document.getElementById('root')).render(
  // 绑定 redux
  <Provider store={store}>
    <Route />
  </Provider>,
);
