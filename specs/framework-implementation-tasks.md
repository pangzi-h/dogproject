# 框架搭建实施计划

**项目**: 边牧寄养 - 前后端应用框架  
**版本**: v1.0  
**创建日期**: 2026-03-27  
**交付目标**: 后端和前端框架完成，项目模板可用，无业务功能  
**预计工期**: 6-8 工作日

---

## 一、总体任务分解

```
┌─────────────────────────────────────────────────────┐
│           后端框架搭建 (task 001-020)               │
│  ├─ Maven 项目结构          (001-005)              │
│  ├─ API Gateway 框架        (006-010)              │
│  ├─ 数据库脚本              (011-015)              │
│  ├─ 公共库和配置            (016-020)              │
│  └─ Docker Compose 环境     (021-025)              │
│                                                     │
├─ 前端框架搭建 (task 026-050)                       │
│  ├─ uni-app 初始化          (026-030)              │
│  ├─ 页面路由结构            (031-035)              │
│  ├─ Vuex 状态管理           (036-040)              │
│  ├─ API 请求层              (041-045)              │
│  ├─ UI 组件集成             (046-050)              │
│  └─ 本地开发环境测试        (051-055)              │
│                                                     │
└─ 项目交付 (task 056-060)                           │
   ├─ 文档编写                (056-058)              │
   ├─ Git 初始化              (059)                  │
   └─ 验收测试                (060)                  │
```

---

## 二、后端框架搭建任务（单体应用）

### Task 001-005: Maven 项目初始化

- [ ] **T001** 创建 pet-boarding-backend 根项目目录
- [ ] **T002** 编写根 pom.xml 文件（依赖版本管理）
- [ ] **T003** [P] 创建 src/main/java/com/petboarding/ 目录结构
- [ ] **T004** [P] 创建 src/main/resources/ 目录结构
- [ ] **T005** [P] 创建 sql/, docs/, docker/ 目录

### Task 006-010: Spring Boot 应用主框架

- [ ] **T006** 创建 PetBoardingApplication.java 主类
- [ ] **T007** 编写 application.yml 主配置文件
- [ ] **T008** 编写 application-dev.yml 开发环境配置
- [ ] **T009** 编写 application-prod.yml 生产环境配置
- [ ] **T010** 配置 logback-spring.xml 日志框架

### Task 011-018: 7 个业务模块框架（可并行）

#### User 模块
- [ ] **T011** [P] 创建 user 模块目录和 entity 类
- [ ] **T011b** [P] 创建 UserRepository 和 UserService 框架
- [ ] **T011c** [P] 创建 UserController REST 接口框架

#### Order 模块
- [ ] **T012** [P] 创建 order 模块目录和 entity 类
- [ ] **T012b** [P] 创建 OrderRepository 和 OrderService 框架
- [ ] **T012c** [P] 创建 OrderController REST 接口框架

#### Payment 模块
- [ ] **T013** [P] 创建 payment 模块目录和 entity 类
- [ ] **T013b** [P] 创建 PaymentRepository 和 PaymentService 框架
- [ ] **T013c** [P] 创建 PaymentController REST 接口框架

#### Feedback 模块
- [ ] **T014** [P] 创建 feedback 模块目录和 entity 类
- [ ] **T014b** [P] 创建 FeedbackRepository 和 FeedbackService 框架
- [ ] **T014c** [P] 创建 FeedbackController REST 接口框架

#### Points 模块
- [ ] **T015** [P] 创建 points 模块目录和 entity 类
- [ ] **T015b** [P] 创建 PointsRepository 和 PointsService 框架
- [ ] **T015c** [P] 创建 PointsController REST 接口框架

#### Service 模块
- [ ] **T016** [P] 创建 service 模块目录和 entity 类
- [ ] **T016b** [P] 创建 ServiceRepository 和 ServiceService 框架
- [ ] **T016c** [P] 创建 ServiceController REST 接口框架

#### Shop 模块
- [ ] **T017** [P] 创建 shop 模块目录和 entity 类
- [ ] **T017b** [P] 创建 ShopRepository 和 ShopService 框架
- [ ] **T017c** [P] 创建 ShopController REST 接口框架

### Task 018-022: 共享基础设施

- [ ] **T018** 创建 common/config/ 配置类（RedisConfig, JpaConfig, SecurityConfig）
- [ ] **T019** 创建 common/exception/ GlobalExceptionHandler 全局异常处理
- [ ] **T020** 创建 common/util/ 工具类（JwtTokenProvider, EncryptUtil, DateUtil）
- [ ] **T021** 创建 common/interceptor/ RequestInterceptor 请求拦截器
- [ ] **T022** 创建 common/constants/ AppConstants 常量定义

### Task 023-027: 数据库脚本和 Docker

- [ ] **T023** 编写 sql/000-init-database.sql (创建库、用户、字符集)
- [ ] **T024** 编写 sql/001-init-tables.sql (所有 7 个模块的表)
- [ ] **T025** 编写 sql/002-init-data.sql (测试数据初始化)
- [ ] **T026** 编写 docker-compose.yml (MySQL + Redis)
- [ ] **T027** 编写 Dockerfile (应用容器配置)



---

## 三、前端框架搭建任务

### Task 026-030: uni-app 初始化

- [ ] **T026** 使用 uni-app CLI 创建新项目: `uni create pet-boarding-frontend`
- [ ] **T027** [P] 安装核心依赖: uView 2.x, Vuex 3.x, ESLint
- [ ] **T028** [P] 配置 .env.development / .env.production 环境变量
- [ ] **T029** 配置 ESLint + Prettier 代码规范
- [ ] **T030** 配置 jest 单元测试框架

### Task 031-035: 页面路由结构

- [ ] **T031** 创建所有 P0 P1 页面目录结构 (index, booking, orders, feedback 等)
- [ ] **T032** [P] 编写 app.json 全局配置 (pages 列表、tabBar、权限声明)
- [ ] **T033** [P] 创建各页面的空 .vue 框架文件
- [ ] **T034** 创建 NavBar.vue 通用导航栏组件
- [ ] **T035** 验证所有页面能正常导航，tabBar 可切换

### Task 036-040: Vuex 状态管理

- [ ] **T036** 初始化 store/ 目录结构
- [ ] **T037** [P] 创建 modules/user.js (userInfo, token, isLoggedIn)
- [ ] **T038** [P] 创建 modules/booking.js (预订流程状态)
- [ ] **T039** [P] 创建 modules/orders.js (订单列表、详情)
- [ ] **T040** [P] 创建 modules/cart.js (购物车) 和 modules/app.js (全局应用状态)

### Task 041-045: API 请求层

- [ ] **T041** 创建 api/base.js (HTTP 请求拦截器、基础配置)
- [ ] **T042** [P] 创建 api/user.js (用户登录、档案 API)
- [ ] **T043** [P] 创建 api/booking.js (预订相关 API)
- [ ] **T044** [P] 创建 api/order.js (订单相关 API)
- [ ] **T045** [P] 创建 api/shop.js (商城 API)

### Task 046-050: UI 组件集成

- [ ] **T046** 集成 uView 2.x 组件库到项目
- [ ] **T047** 配置全局样式文件 (styles/variables.scss)
- [ ] **T048** [P] 创建自定义组件: OrderCard.vue, PetCard.vue, ProductCard.vue
- [ ] **T049** [P] 创建自定义组件: MembershipCard.vue, FeedbackCard.vue
- [ ] **T050** 验证 uView 组件可正常导入和使用

### Task 051-055: 本地开发环境测试

- [ ] **T051** 执行 npm run dev:mp-weixin 启动开发服务
- [ ] **T052** 在微信开发者工具中导入项目，预览无误
- [ ] **T053** 验证 TabBar 导航、页面跳转、状态管理工作正常
- [ ] **T054** 验证 API 请求拦截器工作正常（打印日志）
- [ ] **T055** 验证 localStorage 持久化工作正常

---

## 四、项目交付任务

### Task 056-058: 文档编写

- [ ] **T056** 编写 README.md (项目介绍、快速开始)
- [ ] **T057** [P] 编写 ARCHITECTURE.md (系统架构、目录说明)
- [ ] **T058** [P] 编写 API-INTEGRATION.md (API 集成指南)

### Task 059: Git 初始化

- [ ] **T059** 初始化 git 仓库，创建 main/develop 分支
- [ ] **T059** Commit 初始框架代码

### Task 060: 验收测试

- [ ] **T060** 运行完整的启动流程 (后端 + 前端 + 数据库)
- [ ] **T060** 验证无编译错误、无运行时错误
- [ ] **T060** 验收框架搭建完成

---

## 五、任务依赖关系

### 后端关键路径

```
T001 (根项目)
  ├─ T002 (pom.xml)
  ├─ T003-T005 (目录结构) 依赖 T001
  ├─ T006-T010 (Spring Boot 主框架) 依赖 T002
  ├─ T011-T017 (7 个模块) 可并行，依赖 T003
  ├─ T018-T022 (公共库) 依赖 T002
  └─ T023-T027 (DB + Docker) 独立
```

### 前端关键路径

```
T026 (项目创建)
  ├─ T027-T029 (配置) 立即开始
  ├─ T031-T035 (页面) 依赖 T026
  ├─ T036-T040 (状态) 依赖 T026
  ├─ T041-T045 (API) 依赖 T026
  └─ T046-T055 (集成+测试) 依赖 上述所有

后端和前端任务可以并行执行
```

---

## 六、开发流程建议

### Week 1 (5 Days) - 单体应用框架搭建

| 日期 | 后端任务 | 前端任务 | 
|------|---------|---------|
| Day 1 | T001-T010 (Maven + Spring Boot 主框架) | T026-T030 (uni-app 初始化) |
| Day 2 | T011-T017 (7 个模块框架 - 并行) | T031-T035 (页面结构) |
| Day 3 | T018-T022 (公共库 + 工具) | T036-T040 (Vuex 模块) |
| Day 4 | T023-T027 (DB 脚本 + Docker) | T041-T045 (API 层) |
| Day 5 | 编译验证，framework 测试 | T046-T055 (UI 集成测试) |

**预计工期**: 4-5 天

### 并行性最大化

**后端 (Day 2 并行)**
- T011-T017 可以分给 3-4 个开发者并行：
  - 开发者A: T011 (User) + T012 (Order)
  - 开发者B: T013 (Payment) + T014 (Feedback)
  - 开发者C: T015 (Points) + T016 (Service)
  - 开发者D: T017 (Shop)

**前端 (Day 2 并行)**
- T031-T035 可以分给 2 个开发者并行：
  - 开发者A: 核心页面 (index, login, orders)
  - 开发者B: 功能页面 (booking, shop, profile)

**建议**: 后端和前端从 Day 1 就分别独立推进，Week 2 才做前后端集成


---

## 八、验收标准

### 后端框架验收

- ✅ 所有 7 个 service 都能单独启动 (`java -jar xxx.jar`)
- ✅ API Gateway 能正确转发请求到各 service
- ✅ 数据库连接正常，能执行 SELECT 1
- ✅ Redis 连接正常，能 SET/GET 键值
- ✅ jwt-core 模块编译无误
- ✅ docker-compose up -d 能一键启动全部服务
- ✅ 日志输出符合规范，无错误堆栈

### 前端框架验收

- ✅ npm install 成功，无 warnings
- ✅ npm run dev:mp-weixin 启动成功
- ✅ 微信开发者工具能导入项目，预览无黑屏
- ✅ 所有页面能正常导航，TabBar 可切换
- ✅ Vuex store 正常初始化，devtools 可查看状态
- ✅ 网络请求能正常拦截，console 有日志
- ✅ 无编译警告和运行时错误

---

## 九、风险点和缓解措施

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| Maven 版本冲突 | 编译失败 | 提前测试 pom.xml，使用锁定版本 |
| 数据库脚本有语法错误 | 初始化失败 | 离线测试每个脚本 |
| uni-app CLI 版本过旧 | 兼容性问题 | 使用最新版本，检查教程 |
| Docker 首次启动耗时长 | 延迟测试 | 提前拉取镜像 |
| 前后端通信问题 | 集成失败 | 提前协定 API 协议，使用 Mock API |

---

## 十、交付成果物

| 成果物 | 位置 | 备注 |
|--------|------|------|
| 后端源代码 | `/backend/` | Maven 多模块项目 |
| 前端源代码 | `/frontend/` | uni-app 项目 |
| 数据库脚本 | `/backend/sql/` | 初始化脚本 |
| Docker 配置 | `/backend/docker-compose.yml` | 本地环境 |
| 文档 | `/docs/` | README、Architecture、API 集成指南 |
| 系统设计资料 | `/specs/003-004-005/` | 详细设计文档 |
| Git 仓库 | `origin/main, origin/develop` | 版本控制 |

