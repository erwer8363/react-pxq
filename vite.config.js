import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// px -> rem，设计稿 750px，remUnit=75（等价于旧的 postcss-px2rem）
const px2rem = ({ remUnit = 75 } = {}) => ({
  postcssPlugin: 'px2rem',
  Declaration(decl) {
    if (!decl.value.includes('px')) return;
    const next = decl.value.replace(/(\d*\.?\d+)px/g, (_, n) => `${parseFloat((n / remUnit).toFixed(6))}rem`);
    if (next !== decl.value) decl.value = next;
  },
});
px2rem.postcss = true;

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic', // 保持 React 16 写法 (import React)
      babel: {
        // home.jsx 使用了 @mixin 装饰器 + class 属性
        plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  css: {
    postcss: {
      plugins: [px2rem({ remUnit: 75 })], // 设计稿 750px
    },
  },
  server: { host: true },
  build: { outDir: 'dist' },
});
