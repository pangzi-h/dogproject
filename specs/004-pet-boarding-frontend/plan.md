# 前端应用框架设计方案

**项目名称**: 边牧寄养 - uni-app 小程序  
**版本**: v1.0  
**创建日期**: 2026-03-27  
**目标交付**: uni-app 项目框架搭建完成，页面路由和状态管理结构确定

---

## 一、架构总体规划

### 技术栈

```
框架: uni-app (基于 Vue 2.x)
UI 组件库: uView 2.x
状态管理: Vuex 3.x
HTTP 客户端: uni.request (或 axios 适配)
路由管理: uni-app 内置页面路由
包管理: npm / yarn
构建工具: Webpack (uni-app 内置)
编程语言: JavaScript ES6+
```

### 适配平台

- ✅ WeChat Mini Program (微信小程序，优先)
- ✅ Alipay Mini Program (支付宝小程序)
- ⏳ Native App (iOS/Android，可选 Phase 2)

---

## 二、项目结构设计

```
pet-boarding-frontend/
├── package.json                  # npm 依赖
├── vue.config.js                 # uni-app 配置
├── .env.development              # 开发环境变量
├── .env.production               # 生产环境变量
├── .eslintrc.js                  # ESLint 配置
├── src/
│   ├── main.js                   # 入口文件
│   ├── App.vue                   # 全局样式和配置
│   ├── pages/                    # 页面（约 15 个核心页面）
│   │   ├── index/                # 首页
│   │   ├── booking/              # 预订流程 (4 个子页)
│   │   ├── orders/               # 订单管理
│   │   ├── feedback/             # 每日反馈
│   │   ├── profile/              # 个人中心
│   │   ├── shop/                 # 商城模块 (3 个子页)
│   │   └── login/                # 登录页
│   ├── components/               # 可复用组件
│   │   ├── NavBar.vue            # 导航栏
│   │   ├── OrderCard.vue         # 订单卡片
│   │   ├── PetCard.vue           # 宠物卡片
│   │   ├── ProductCard.vue       # 商品卡片
│   │   ├── Modal.vue             # 弹窗
│   │   └── ...
│   ├── store/                    # Vuex 状态管理
│   │   ├── modules/
│   │   │   ├── user.js           # 用户信息、认证
│   │   │   ├── booking.js        # 预订流程状态
│   │   │   ├── orders.js         # 订单数据
│   │   │   ├── cart.js           # 购物车
│   │   │   └── app.js            # 全局应用状态
│   │   └── index.js              # store 配置
│   ├── api/                      # API 请求层
│   │   ├── user.js               # 用户 API
│   │   ├── booking.js            # 预订 API
│   │   ├── order.js              # 订单 API
│   │   ├── feedback.js           # 反馈 API
│   │   ├── shop.js               # 商城 API
│   │   └── base.js               # 基础请求配置
│   ├── utils/                    # 工具函数
│   │   ├── request.js            # HTTP 请求拦截
│   │   ├── logger.js             # 日志
│   │   ├── storage.js            # 本地存储
│   │   ├── date.js               # 日期处理
│   │   └── validate.js           # 数据验证
│   ├── config/                   # 配置文件
│   │   ├── app.config.js         # 应用配置
│   │   ├── api.config.js         # API 端点
│   │   └── constants.js          # 常量定义
│   ├── styles/                   # 全局样式
│   │   ├── variables.scss        # 颜色、间距等设计系统
│   │   ├── mixins.scss           # SCSS 混合宏
│   │   └── global.scss           # 全局样式
│   └── assets/                   # 静态资源
│       ├── images/
│       ├── icons/
│       └── fonts/
├── tests/                        # 测试代码
│   ├── unit/
│   └── e2e/
└── docs/                         # 文档
    ├── PAGES.md                  # 页面清单
    ├── COMPONENTS.md             # 组件文档
    └── API-INTEGRATION.md        # API 集成指南
```

---

## 三、核心页面规划

### P0 优先级页面（MVP 必须）

| 页面路径 | 页面名 | 功能 | 状态 |
|---------|--------|------|------|
| `/pages/index/index` | 首页 | 快速预订 + 订单卡片 | 框架 |
| `/pages/login/index` | 登录页 | 微信授权 | 框架 |
| `/pages/booking/step1` | 预订-选时间 | 日期选择器 + 库存展示 | 框架 |
| `/pages/booking/step2` | 预订-选套餐 | 服务等级选择 | 框架 |
| `/pages/booking/step3` | 预订-选宠物 | 宠物档案选择 | 框架 |
| `/pages/booking/confirm` | 预订-确认 | 订单汇总 + 支付 | 框架 |
| `/pages/orders/index` | 我的订单 | 订单列表 (Tab 筛选) | 框架 |
| `/pages/orders/detail` | 订单详情 | 订单信息 + 反馈时间线 | 框架 |
| `/pages/feedback/index` | 反馈列表 | 每日反馈查看 | 框架 |
| `/pages/profile/index` | 个人中心 | 导航入口 | 框架 |

### P1 优先级页面（v1.0 完整版）

| 页面路径 | 页面名 | 功能 |
|---------|--------|------|
| `/pages/profile/pet-list` | 宠物档案列表 | 宠物管理 |
| `/pages/profile/pet-edit` | 宠物档案编辑 | 编辑/新建宠物 |
| `/pages/profile/membership` | 会员卡 | 等级展示 + 升级进度 |
| `/pages/profile/points` | 积分账户 | 积分明细 |
| `/pages/help/index` | 帮助中心 | 文章列表 + 搜索 |
| `/pages/help/ticket-list` | 工单列表 | 工单追踪 |
| `/pages/shop/index` | 商城首页 | 商品展示 |
| `/pages/shop/product-detail` | 商品详情 | 商品介绍 + 下单 |
| `/pages/shop/cart` | 购物车 | 结算页面 |

---

## 四、状态管理设计（Vuex）

### 模块说明

**user.js** - 用户模块
```javascript
state: {
  userInfo: null,
  token: '',
  membershipLevel: 'normal',
  points: 0,
  isLoggedIn: false
}
mutations/actions: login, logout, fetchUserInfo, updateProfile
```

**booking.js** - 预订流程模块
```javascript
state: {
  currentBooking: {
    checkInDate: null,
    checkOutDate: null,
    serviceType: 'standard',
    petId: null,
    notes: ''
  }
}
mutations/actions: updateBooking, resetBooking, submitBooking
```

**orders.js** - 订单模块
```javascript
state: {
  orderList: [],
  currentOrder: null,
  pagination: { page: 1, pageSize: 20 }
}
mutations/actions: fetchOrders, fetchOrderDetail, refreshOrderList
```

**cart.js** - 购物车模块
```javascript
state: {
  items: [],
  totalPrice: 0,
  selectedItems: []
}
mutations/actions: addToCart, removeFromCart, updateCartItem, checkout
```

**app.js** - 全局应用模块
```javascript
state: {
  appVersion: '1.0.0',
  platform: 'wechat',
  apiBaseUrl: 'https://api.xxx.com',
  isOnline: true
}
```

---

## 五、API 请求层设计

### 请求拦截器

```javascript
// base.js - 基础请求配置
export const instance = createRequest({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000,
  
  // 请求拦截
  interceptors: {
    request: (config) => {
      // 自动添加 token
      config.header.Authorization = 'Bearer ' + store.state.user.token
      return config
    },
    response: (response) => {
      // 统一处理错误
      if (response.data.code !== 0) {
        throw new Error(response.data.message)
      }
      return response.data
    }
  }
})
```

### API 模块结构

```javascript
// user.js
export const login = (code, rawData, signature) => request.post('/users/login', {code, rawData, signature})
export const fetchProfile = () => request.get('/users/profile')

// booking.js
export const checkAvailability = (checkIn, checkOut) => request.post('/orders/check-availability', {checkIn, checkOut})
export const createOrder = (params) => request.post('/orders', params)

// shop.js
export const fetchProducts = (page, category) => request.get(`/shop/products?page=${page}&category=${category}`)
export const fetchCartItems = () => request.get('/shop/cart')
```

---

## 六、组件库集成

### uView 2.x 计划

```
使用的组件:
- Button (通用按钮)
- Input (表单输入)
- DatetimePicker (日期选择)
- Picker (单选、多选)
- List (列表)
- Tab (Tab 栏)
- Modal/Dialog (弹窗)
- Loading (加载中)
- NoticeBar (通知栏)
- Grid (宫格)
- Card (卡片)
- Popup (弹出层)
```

### 自定义组件

```javascript
NavBar.vue          // 顶部导航栏
OrderCard.vue       // 订单卡片
PetCard.vue         // 宠物档案卡片
ProductCard.vue     // 商品卡片
FeedbackCard.vue    // 反馈卡片
MembershipCard.vue  // 会员卡展示
```

---

## 七、开发环境配置

### 环境变量

```
VUE_APP_API_URL=http://localhost:8000          # API Gateway
VUE_APP_ENV=development
VUE_APP_DEBUG=true
```

### 本地开发启动

```bash
# 安装依赖
npm install

# 启动开发服务器（微信小程序预览）
npm run dev:mp-weixin

# 启动支付宝小程序
npm run dev:mp-alipay

# 生产构建
npm run build

# 单元测试
npm run test:unit
```

---

## 八、微信小程序特定配置

### app.json (全局配置)

```json
{
  "pages": [
    "pages/index/index",
    "pages/login/index",
    "pages/booking/step1",
    ...
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "边牧寄养"
  },
  "tabBar": {
    "list": [
      { "pagePath": "pages/index/index", "text": "首页" },
      { "pagePath": "pages/orders/index", "text": "我的订单" },
      { "pagePath": "pages/shop/index", "text": "商城" },
      { "pagePath": "pages/profile/index", "text": "我的" }
    ]
  }
}
```

### 权限配置

```json
{
  "permission": {
    "scope.userInfo": {
      "desc": "用于获取你的昵称、头像等信息"
    },
    "scope.userLocation": {
      "desc": "用于获取你的位置信息"
    },
    "scope.address": {
      "desc": "用于获取你的收货地址"
    }
  }
}
```

---

## 九、框架搭建阶段

### Phase 1: 项目初始化 (1-2 工作日)

- [ ] 使用 uni-app CLI 创建项目
- [ ] 安装核心依赖 (uView, Vuex, ESLint)
- [ ] 配置 .env 文件和环境变量
- [ ] 配置 ESLint + Prettier
- [ ] 建立 git 仓库和分支策略

### Phase 2: 页面框架搭建 (2-3 工作日)

- [ ] 创建所有 P0 P1 页面目录和空文件
- [ ] 设计 TabBar 底部导航
- [ ] 创建通用 NavBar 组件
- [ ] 配置页面路由关系

### Phase 3: 状态管理搭建 (1-2 工作日)

- [ ] 初始化 Vuex store 结构
- [ ] 创建各模块 (user, booking, orders, cart, app)
- [ ] 配置 localStorage 持久化
- [ ] 初始化全局状态

### Phase 4: API 请求层搭建 (1 工作日)

- [ ] 创建 HTTP 请求拦截器
- [ ] 配置 API 端点映射
- [ ] 创建各模块的 API 函数
- [ ] 配置错误处理

### Phase 5: UI 组件集成 (1 工作日)

- [ ] 集成 uView 2.x 组件库
- [ ] 配置全局样式和设计变量
- [ ] 创建自定义核心组件
- [ ] 测试组件可用性

### Phase 6: 本地开发环境测试 (1 工作日)

- [ ] npm run dev 启动成功
- [ ] 微信小程序开发者工具导入项目
- [ ] 测试各页面可以正常导航
- [ ] 测试 tabBar 切换无误

---

## 十、设计系统（色彩 + 排版）

### 色彩系统

```scss
$primary: #FF7A45          // 主题色（橙色）
$secondary: #FFB366        // 次要色
$success: #2DCE89          // 成功绿
$warning: #FFD93D          // 警告黄
$danger: #FF6B6B           // 危险红
$text-dark: #2C3E50        // 深色文本
$text-light: #7F8C8D       // 浅色文本
$bg-light: #F5F7FA         // 浅色背景
$bg-white: #FFFFFF         // 白色背景
$border-light: #E0E6ED     // 浅色边框
```

### 排版系统

```scss
$font-size-xs: 12px        // 超小
$font-size-sm: 14px        // 小
$font-size-base: 16px      // 正常
$font-size-lg: 18px        // 大
$font-size-xl: 20px        // 超大

$line-height-normal: 1.5
$font-weight-normal: 400
$font-weight-bold: 600
```

---

## 十一、成功标准

- ✅ 项目能正常 npm install && npm run dev 启动
- ✅ 所有 P0 P1 页面目录都已创建
- ✅ Vuex store 正常初始化，state 可访问
- ✅ API 请求拦截器工作正常
- ✅ uView 组件可正常导入和使用
- ✅ TabBar 导航可正常切换
- ✅ 微信小程序开发者工具可以导入和预览
- ✅ 页面路由跳转无误

