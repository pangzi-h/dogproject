# Frontend 工程说明

## 当前形态

这是一个 uni-app Vue2 CLI 结构项目，源码位于 `src/` 目录下。

关键文件：
- `src/main.js`
- `src/App.vue`
- `src/pages.json`
- `src/manifest.json`
- `src/uni.scss`
- `postcss.config.js`

## 使用 HBuilderX

1. 打开 HBuilderX
2. 选择“打开目录”
3. 打开 `frontend` 目录
4. 等待 HBuilderX 识别 uni-app 工程
5. 通过“运行 -> 运行到小程序模拟器 -> 微信开发者工具”启动

## 使用命令行

1. 在 `frontend` 目录执行 `npm install --legacy-peer-deps`
2. 执行 `npm run dev:mp-weixin` 进行微信小程序开发编译
3. 执行 `npm run build:mp-weixin` 进行生产构建

## 环境建议

- 推荐 Node.js 16 或 18 LTS
- 当前 Node 22 环境下可继续修复兼容问题，但不建议作为长期开发环境