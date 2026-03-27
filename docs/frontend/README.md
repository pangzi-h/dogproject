# Frontend 模块文档

## 架构
- uni-app (Vue2 + Vuex)
- 根目录: frontend/
- 当前按 uni-app CLI 工程结构组织，支持微信小程序与 H5 构建脚本

## 目录
- pages: 页面
- store: 状态管理
- api: 请求层
- styles: 样式变量
- pages.json: uni-app 页面路由与 tabBar 配置
- manifest.json: uni-app 平台与应用基础配置
- babel.config.js: uni-app CLI 构建所需 Babel 配置

## 当前骨架页面
- pages/index/index.vue
- pages/login/index.vue
- pages/orders/list/index.vue
- pages/shop/list/index.vue
- pages/profile/index.vue

## 说明
当前已完成前端框架初始化，后续按业务模块继续补全页面与交互。
当前已补齐 uni-app 运行所需的核心配置文件：frontend/src/pages.json 与 frontend/src/manifest.json。

## 启动
1. 在 frontend 目录执行 npm install
2. 执行 npm run dev:mp-weixin 启动微信小程序编译
3. 执行 npm run dev:h5 启动 H5 本地调试

## 环境说明
- 当前工程使用 uni-app Vue2 CLI 工具链，对新版本 Node/npm 兼容性一般。
- 已在 frontend/.npmrc 中启用 legacy-peer-deps，避免 npm 10+ / 11+ 的严格 peer 依赖解析导致安装失败。
- 建议本地使用 Node 16 或 Node 18 LTS 进行长期开发与构建。
