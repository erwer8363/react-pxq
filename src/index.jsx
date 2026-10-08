import React from 'react';
import { createRoot } from 'react-dom/client';
import Route from './router/';
import './utils/setRem';
import './style/base.css';
import './assets/iconfonts/iconfont.css';

// 监听state变化
// store.subscribe(() => {
//   console.log('store发生了变化');
// });

createRoot(document.getElementById('root')).render(
    <Route />
);
