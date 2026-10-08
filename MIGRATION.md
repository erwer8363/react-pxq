# 改造计划：Hooks + TypeScript + SCSS + Jotai

目标：把老项目改成 hooks + TypeScript + SCSS + Jotai，同时借这个项目学习 Jotai。

原则：每个阶段一个提交，每个阶段结束都能 `npm run dev` 跑起来，出问题可单独回滚。

## 已确认的决定

1. 接口（`api.cangdu.org`）原以为已不可用，实测仍可访问，mock 暂缓（见阶段 2）。
2. 升级到 React 18（jotai v2、react-router 6 都更适合）。
3. 节奏：阶段 0、1、2 由 Claude 完成；从 阶段 3b 开始，atom 由 Ever 手写，Claude 负责讲解和 review。

## 现状

- redux 两个 slice：`formData`（首页表单）、`proData`（商品列表，含异步拉取）
- 5 个页面，只有 `home` 用了装饰器 `@mixin`；`record`、`production` 是 class + `shouldComponentUpdate`
- 6 个 less 文件，共约 250 行，都依赖 `mixin.less` 变量

## 阶段 0：地基（TS + React 18）✅

- [x] 安装 `typescript`、`@types/react`、`@types/react-dom`，新增 `tsconfig.json`（`strict` + `allowJs`，允许 `.jsx`/`.tsx` 混用）
- [x] 新增 `npm run typecheck`
- [x] React 16 升到 18，入口改 `createRoot`
- [x] 处理升级带来的 peer 依赖问题（`react-addons-css-transition-group` 等，阶段 4 彻底替换）

## 阶段 1：Less 改 SCSS ✅

- [x] `mixin.less` 改 `_variables.scss`，`@import (reference)` 改 `@use`
- [x] 6 个 `.less` 改 `.scss`（变量 `@x` → `$x`）
- [x] 安装 `sass`，卸载 `less`；px→rem 的 PostCSS 插件保持不变

## 阶段 2：工具层改 TS + 接口 mock ✅

- [x] `envconfig`、`api/server`、`api/api`、`utils/mixin` 改 `.ts`，定义 `Product`、`FormData` 等类型
- [x] 去掉 `@mixin` 装饰器和 babel decorators 插件，`padStr` 改普通函数
- [ ] ~~加本地 mock~~ 暂缓：2026-10 实测 `api.cangdu.org` 的 products / balance / record 接口仍可访问，暂不需要；接口失效时再用 msw 补上

## 阶段 3：按页面纵切，hooks + Jotai

每做完一个页面，删掉对应的 redux slice。

| 顺序 | 页面 | 学到的 Jotai 概念 |
|---|---|---|
| 3a | `TouchableOpacity`、`header`、`alert`、`helpcenter`、`balance` | 无，先热身 hooks 与 Props 类型 |
| 3b ✅ | `production` | 基础 `atom` / `useAtom`；异步 atom（取代 `getProData` thunk）；列表项更新（`atomFamily` / `focusAtom` 可选） |
| 3c ✅ | `home` | 写入型 atom（取代 action creator）；派生 atom（`selectedProListAtom` 取代 `initData`）；一个 atom 写多个 atom（提交后清空表单与选择） |
| 3d | `record`、`recordList` | `flagBarPos` 由路由派生；`atomWithStorage` 等扩展（可选） |

## 阶段 4：路由与动画

- [ ] `react-router-dom` 4 → 6（`Switch`→`Routes`，`Redirect`→`Navigate`，去掉 `match.path`）
- [ ] `asyncComponent` 改 `React.lazy` + `Suspense`
- [ ] `react-addons-css-transition-group` 换 `react-transition-group` 或纯 CSS 过渡
- [ ] 评估移除 `fastclick`（真机确认点击无延迟后再删）

## 阶段 5：收尾

- [ ] 卸载 `redux`、`react-redux`、`redux-thunk`、`immutable`、`prop-types`、`fastclick`
- [ ] ESLint（`typescript-eslint` + `react-hooks` 规则）
- [ ] 用 `createStore()` 给 atom 写单测（不渲染组件）
- [ ] 更新 README
