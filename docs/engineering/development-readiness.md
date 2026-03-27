# 开发就绪检查清单

## 当前结论

项目已经具备继续进入需求拆解、任务分发和模块开发的基础条件。

## 前端

- uni-app 核心入口文件已存在
- 微信小程序 CLI 构建已通过
- HBuilderX 可按标准 uni-app 工程方式导入
- 页面骨架、Vuex、API 目录已经建立

关键文件：
- frontend/src/main.js
- frontend/src/App.vue
- frontend/src/pages.json
- frontend/src/manifest.json
- frontend/src/uni.scss
- frontend/postcss.config.js

## 后端

- Spring Boot 单体工程主结构已建立
- Maven `pom.xml` 已存在
- `src/main`、`src/test`、`sql`、`docker` 目录已保留
- 可在现有基础上继续按模块扩展实现

关键文件：
- backend/pom.xml
- backend/src/main/java/com/petboarding/PetBoardingApplication.java
- backend/src/main/resources/application.yml
- backend/docker-compose.yml

## spec-kit / speckit

- `specs/` 目录已存在
- 当前已有功能规范、计划、任务样例
- 可以继续新增 feature 规范并进入 `specify -> plan -> tasks -> implement` 流程

## 建议启动顺序

1. 明确下一个业务模块范围
2. 生成或完善对应的 spec
3. 生成 plan 和 tasks
4. 先做后端接口和数据模型
5. 再做前端页面和联调

## 非阻塞提醒

- 当前前端构建仍有 Sass 废弃告警，但不影响开发与构建
- 当前依赖链对 Node 16/18 更友好，长期开发建议使用 LTS 版本