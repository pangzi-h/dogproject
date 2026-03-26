# 边牧专业寄养小程序 - 产品设计文档 v1.1

**文档编号**: PRD-002-PET-BOARDING-v1.1  
**创建日期**: 2026-03-26  
**最后修改**: 2026-03-26  
**状态**: 设计审核中  
**作者**: 产品设计团队

---

## 目录
1. [项目概述](#项目概述)
2. [核心定位与差异化](#核心定位与差异化)
3. [产品目标](#产品目标)
4. [商业模式](#商业模式)
5. [系统架构](#系统架构)
6. [核心功能模块](#核心功能模块)
7. [页面流程设计](#页面流程设计)
8. [数据模型](#数据模型)
9. [API 接口清单](#api-接口清单)
10. [非功能性需求](#非功能性需求)
11. [实现计划](#实现计划)
12. [成功指标](#成功指标)

---

## 项目概述

### 产品名称
**边牧寄养** (Border Collie Care) - 微信/支付宝小程序

### 一句话描述
专注中大型犬种（尤其是边牧）的专业寄养与用品服务平台，集预订、每日反馈、会员积分、狗粮商城于一体。

### 目标用户
- **主要用户**: 郑州地区25-45岁，养有中大型犬（边牧、泰迪、金毛等）的白领和家庭用户
- **用户痛点**: 出差/旅游无人照顾宠物，担心专业性和服务质量，希望实时了解宠物状态

### 开发周期
**1个月** (2026-04月初启动 → 2026-04月末上线预约)

### 技术栈
- **前端**: uni-app (微信小程序 + 支付宝小程序)
- **后端**: Java + Spring Boot
- **数据库**: MySQL + Redis
- **存储**: 阿里云 OSS (图片存储)
- **支付**: 微信支付 API
- **部署**: 阿里云 ECS + RDS

---

## 核心定位与差异化

### 竞品对标
| 竞品 | 优势 | 劣势 | 我们的差异 |
|------|------|------|----------|
| 58宠物 | 平台流量大 | 商家良莠不齐，缺专业筛选 | **创始人5年边牧经验背书** |
| 宠那么萌 | 内容+交易结合 | 不够垂直，品种不专业 | **中大型犬专业服务** |
| 宠幸 | 便捷上门 | 缺垂直品种服务 | **垂直深度+内容IP** |

### 核心差异化卖点
1. **专业背书**: 创始人5年边牧养护经验，懂中大型犬需求
2. **垂直专业**: 聚焦中大型犬品种，提供差异化服务（运动、训练、护理）
3. **信任体系**: 每日图文视频反馈，透明展示宠物状态
4. **成本优势**: 狗粮代理渠道，服务套餐具有性价比
5. **内容IP**: 边牧短视频直播运营支撑，持续引流

---

## 产品目标

### MVP 阶段目标（第一个月）
- ✅ 实现核心预订流程完整可用
- ✅ 上线首批50-100个种子用户
- ✅ 累计10-15个成功的寄养订单
- ✅ 用户人均评分 ≥ 4.5/5.0
- ✅ 日活跃用户 ≥ 10人

### 后续运营目标（第2-3个月）
- 用户规模: 500-1000 MAU
- 月均订单: 50-80单
- 复购率: ≥ 40%
- 平均客单价: ￥600-800

---

## 商业模式

### 收入来源

| 来源 | 单价范围 | 目标占比 | 说明 |
|------|---------|---------|------|
| **寄养服务费** | ￥60-180/天 | 70% | 根据服务等级三档定价 |
| **狗粮销售** | ￥20-100/单 | 20% | 伊芙琳代理+配套营养品 |
| **增值服务** | ￥100-500/单 | 10% | 运动训练、美容护理(后期) |

### 服务套餐

#### 宠物寄养套餐
```
基础寄养: ￥60/天
  • 自带狗粮
  • 遛狗2次
  • 基础护理

标准寄养: ￥100/天 ⭐️ 推荐
  • 自带狗粮
  • 遛狗3次
  • 每日图文反馈
  • 梳毛
  • 视频汇报

VIP寄养: ￥150/天
  • 自带狗粮
  • 单独房间
  • 遛狗4次
  • 每日视频直播
  • 训练互动
  • 专业美容护理

节假日溢价: +30%
```

#### 会员体系
```
普通用户: 无折扣，正常消费

银卡会员: 累计消费￥500
  • 寄养9.5折
  • 狗粮满￥200减￥20

金卡会员: 累计消费￥1500
  • 寄养9折
  • 狗粮满￥200减￥30
  • 优先预约排期

钻石会员: 累计消费￥3000
  • 寄养8.5折
  • 狗粮满￥200减￥50
  • 专属客服
  • VIP优先权
```

#### 积分系统
```
规则: 消费1元 = 1分
兑现: 100分 = ￥10 (可自助抵现)
清算: 每月底自动结算已使用积分

示例:
- 寄养7天(标准套餐): ￥700 → 获得700分
- 使用500分抵￥50: 实付￥650
- 剩余200分继续积累
```

---

## 系统架构

### 整体架构图
```
┌──────────────────────────────────────────────────────┐
│            前端用户层 - 小程序客户端                  │
│  • 微信小程序 (uni-app)                              │
│  • 支付宝小程序 (uni-app编译)                        │
└────────────────────┬─────────────────────────────────┘
                     │ HTTPS Api 调用
┌────────────────────▼─────────────────────────────────┐
│         网关层 - Nginx/API Gateway                    │
│  • 请求路由                                          │
│  • SSL 终止                                          │
│  • 限流控制                                          │
└────────────────────┬─────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────┐
│      后端核心服务 - Spring Boot 微服务                │
│  ┌──────────────┬───────────────┬──────────────┬──────────────┐ │
│  │ 用户服务     │ 订单服务      │ 支付服务     │ 商城服务     │ │
│  │(User API)    │(Order API)    │(Payment API) │(Shop API)    │ │
│  └──────────────┴───────────────┴──────────────┴──────────────┘ │
│  ┌──────────────────────────────────────────────┐   │
│  │   共享缓存层 - Redis Cluster                 │   │
│  │  • 会话令牌(Session)                         │   │
│  │  • 用户基础信息缓存                          │   │
│  │  • 订单状态缓存                              │   │
│  │  • 队列(消息推送)                            │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │   数据持久化 - MySQL Master + Slave          │   │
│  │  • 用户表、档案表                            │   │
│  │  • 订单表、反馈表                            │   │
│  │  • 会员表、积分表                            │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────┬─────────────────────────────────┘
                   │
┌──────────────────▼─────────────────────────────────┐
│      第三方服务集成                                 │
│  • 微信支付 API 接入                               │
│  • 阿里云 OSS (图片/视频存储)                      │
│  • 短信通知(腾讯云SMS)                            │
│  • 日志收集(ELK Stack)                            │
└──────────────────────────────────────────────────────┘
```

### 微服务职责分工
```
✅ 用户服务 (User Service)
   - 用户注册/登录认证
   - 微信授权登录处理
   - 用户档案CRUD
   - 会员等级管理
   - 积分账户管理

✅ 订单服务 (Order Service)
   - 订单创建/查询
   - 订单状态流转
   - 订单取消处理
   - 每日反馈记录
   - 图片/视频上传管理

✅ 支付服务 (Payment Service)
   - 微信支付下单
   - 支付结果回调处理
   - 退款流程管理
   - 支付流水记录

✅ 通知服务 (Notification Service)
   - 订单状态推送
   - 运营提醒
   - 每日反馈通知

✅ 商城服务 (Shop Service)
  - 商品管理与分类查询
  - SKU 库存管理
  - 购物车与结算
  - 商城订单处理
  - 与会员积分联动
```

---

## 核心功能模块

### 模块1: 用户认证与档案管理 (Auth & Profile)
```
功能清单:
  ✅ 微信一键登录注册
  ✅ 手机号绑定
  ✅ 个人档案编辑
  ✅ 宠物档案CRUD
    • 基础信息 (名字/品种/体重/年龄)
    • 健康信息 (疫苗/过敏/用药)
    • 行为笔记 (性格/习惯)
  ✅ 档案版本控制 (支持多个宠物)
```

### 模块2: 寄养预订系统 (Booking System)
```
流程:
  Step 1: 选择服务日期和时长
  Step 2: 选择服务等级 (基础/标准/VIP)
  Step 3: 选择或创建宠物档案
  Step 4: 填写寄养备注
  Step 5: 支付确认

功能:
  ✅ 日历选择器 (展示可用时间)
  ✅ 价格实时计算
  ✅ 订单确认页
  ✅ 微信支付集成
  ✅ 订单编号生成
```

### 模块3: 每日反馈系统 (Daily Feedback)
```
功能:
  ✅ 每日反馈记录 (运营侧上传，用户侧查看)
    • 早餐: 进食量/食欲
    • 活动: 遛狗时间/方式
    • 行为: 心情/互动情况
    • 健康: 排便/异常说明
  ✅ 图片上传 (3-5张)
  ✅ 短视频打卡 (可选)
  ✅ 时间线展示
  ✅ 反馈推送通知
```

### 模块4: 订单管理 (Order Management)
```
功能:
  ✅ 订单列表展示 (进行中/已完成/已取消)
  ✅ 订单详情查看
  ✅ 订单取消申请
    • 寄养前24小时: 自助全额退款
    • 寄养进行中: 需客服审批
  ✅ 订单评价体系 (5星评分+文字)
  ✅ 反馈汇总下载 (PDF导出)
```

### 模块5: 会员与积分 (Membership & Points)
```
功能:
  ✅ 会员卡展示 (等级/折扣)
  ✅ 积分账户
    • 当前积分余额
    • 历史积分明细
    • 抵现规则说明
  ✅ 升级提醒
    • 消费￥500升银卡
    • 消费￥1500升金卡
    • 消费￥3000升钻石卡
  ✅ 积分兑现 (100分=￥10)
```

### 模块6: 用户服务 (Customer Service)
```
功能:
  ✅ 在线客服对话 (可选, Phase 2实现)
  ✅ FAQ 帮助中心
  ✅ 订单相关问询
  ✅ 反馈机制
```

### 模块7: 狗粮商城与用品售卖 (Shop)
```
功能:
  ✅ 商城首页与品类导航 (狗粮/零食/营养/洗护/玩具)
  ✅ 商品搜索与筛选 (品牌/年龄段/功能标签)
  ✅ 商品详情 + 规格 SKU 选择
  ✅ 购物车与结算
  ✅ 微信支付下单
  ✅ 商城订单管理 (待发货/已发货/售后)
  ✅ 与会员积分联动 (会员价 + 积分抵现)
  ✅ 与寄养场景联动 (入住前推荐加购)
```

---

## 页面流程设计

### 页面信息架构
```
首页 ──→ 预订 ──→ 订单支付 ──→ 订单详情 ──→ 每日反馈 ──→ 评价
              ↓
           宠物档案选择
              ↓
           支付成功

个人中心 ──→ 订单历史 ──→ 订单详情
         ┌─→ 宠物档案管理
         ├─→ 会员卡
         ├─→ 积分账户
         └─→ 收藏/历史
```

### 核心页面清单
```
P0 优先级 (MVP 必须):
  ✅ 首页 (首屏)
  ✅ 预订流程 (4步表单)
  ✅ 订单详情
  ✅ 每日反馈时间线
  ✅ 登录页
  ✅ 个人中心
  ✅ 我的订单
  ✅ 宠物档案编辑

P1 优先级 (Phase 1 增强):
  ✅ 会员卡页面
  ✅ 积分账户
  ✅ 订单评价
  ✅ 客服在线 (简化版)
  ✅ 商城首页与商品详情页

P2 优先级 (未来迭代):
  □ 内容社区
  □ 直播看养护
```

### 关键页面流程图

#### 预订流程 (4步)
```
[首页] "立即预订" 按钮
    ↓
[选择时间] 日历选择器 + 时长选择
    ↓
[选择服务] 基础/标准/VIP 单选卡
    ↓
[选择宠物] 已有档案列表 OR 新建档案
    ↓
[确认订单] 汇总信息展示
    ↓
[立即支付] → 微信支付弹窗
    ↓
[支付成功] → 订单确认页 → 进入订单详情
    ↓
[每日反馈] 实时查看(寄养期间)
    ↓
[接回确认] 评价 + 反馈汇总 → 完成
```

---

## 数据模型

### Entity-Relationship 关系图

```
┌─────────────────┐
│     Users       │
├─────────────────┤
│ id (UUID)       │
│ openid (string) │  ← 微信唯一ID
│ phone (string)  │
│ nickname        │
│ avatar_url      │
│ membership_level│  ← 普通/银卡/金卡/钻石
│ total_points    │
│ created_at      │
└────────┬────────┘
         │ 1:N
         ↓
┌─────────────────┐
│ PetProfiles     │
├─────────────────┤
│ id (UUID)       │
│ user_id (FK)    │
│ name (string)   │
│ breed (enum)    │
│ age_months      │
│ weight_kg       │
│ allergies (text)│
│ behavior_notes  │
│ created_at      │
└────────┬────────┘
         │ 1:N
         ↓
┌─────────────────┐
│    Orders       │
├─────────────────┤
│ id (UUID)       │
│ user_id (FK)    │
│ pet_id (FK)     │
│ service_type    │  ← 基础/标准/VIP
│ check_in (date) │
│ check_out(date) │
│ total_days      │
│ price_per_day   │
│ total_amount    │
│ order_status    │  ← 已创建/已支付/...
│ created_at      │
└────────┬────────┘
         │ 1:N
         ↓
┌─────────────────────┐
│  DailyFeedbacks     │
├─────────────────────┤
│ id (UUID)           │
│ order_id (FK)       │
│ feedback_date (date)│
│ morning_meal        │
│ afternoon_activity  │
│ behavior_notes      │
│ health_status       │
│ images_urls[] (JSON)│
│ video_url (string)  │
│ staff_name          │
│ created_at          │
└─────────────────────┘
```

### 核心数据表详细字段

#### users 表
```sql
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  openid VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  nickname VARCHAR(50),
  avatar_url VARCHAR(500),
  membership_level ENUM('普通','银卡','金卡','钻石') DEFAULT '普通',
  total_points INT DEFAULT 0,
  status ENUM('active','inactive','banned') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_openid (openid),
  INDEX idx_phone (phone)
);
```

#### pet_profiles 表
```sql
CREATE TABLE pet_profiles (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  name VARCHAR(50) NOT NULL,
  breed VARCHAR(50),
  age_months INT,
  weight_kg DECIMAL(5,2),
  allergies TEXT,
  vaccine_record_url VARCHAR(500),
  behavior_notes TEXT,
  preferred_food VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);
```

#### orders 表
```sql
CREATE TABLE orders (
  id CHAR(36) PRIMARY KEY,
  order_no VARCHAR(50) UNIQUE,
  user_id CHAR(36) NOT NULL,
  pet_id CHAR(36) NOT NULL,
  service_type ENUM('基础','标准','VIP'),
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  total_days INT GENERATED ALWAYS AS (DATEDIFF(check_out_date, check_in_date)),
  price_per_day DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  discount_amount DECIMAL(10,2) DEFAULT 0,
  points_used INT DEFAULT 0,
  actual_payment DECIMAL(10,2),
  order_status ENUM('已创建','已支付','寄养中','已完成','已取消','退款中','已退款') DEFAULT '已创建',
  cancellation_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pet_id) REFERENCES pet_profiles(id),
  INDEX idx_user_id (user_id),
  INDEX idx_order_status (order_status),
  INDEX idx_check_in_date (check_in_date)
);
```

#### daily_feedbacks 表
```sql
CREATE TABLE daily_feedbacks (
  id CHAR(36) PRIMARY KEY,
  order_id CHAR(36) NOT NULL,
  feedback_date DATE NOT NULL,
  morning_meal VARCHAR(200),
  afternoon_activity VARCHAR(200),
  behavior_notes TEXT,
  health_status VARCHAR(50),
  images_json JSON,  -- ["url1", "url2", ...]
  video_url VARCHAR(500),
  staff_name VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  UNIQUE KEY unique_order_date (order_id, feedback_date),
  INDEX idx_order_id (order_id)
);
```

#### payments 表
```sql
CREATE TABLE payments (
  id CHAR(36) PRIMARY KEY,
  order_no VARCHAR(50),
  amount DECIMAL(10,2),
  payment_method ENUM('微信','支付宝','银行卡') DEFAULT '微信',
  transaction_id VARCHAR(100) UNIQUE,
  payment_status ENUM('待支付','已支付','已关闭','已过期') DEFAULT '待支付',
  refund_status ENUM('无','部分退款','全额退款') DEFAULT '无',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP,
  FOREIGN KEY (order_no) REFERENCES orders(order_no),
  INDEX idx_order_no (order_no)
);
```

#### membership_points 表
```sql
CREATE TABLE membership_points (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL UNIQUE,
  current_balance INT DEFAULT 0,
  total_earned INT DEFAULT 0,
  total_used INT DEFAULT 0,
  last_updated TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);
```

---

## API 接口清单

### Authentication API
```
POST /api/v1/auth/login (微信授权登录)
  Request:
    {
      "code": "string",      // 微信授权code
      "rawData": "string",
      "signature": "string"
    }
  Response:
    {
      "code": 0,
      "message": "success",
      "data": {
        "token": "jwt_token",
        "userId": "uuid",
        "userInfo": { ... }
      }
    }

POST /api/v1/auth/bind-phone (绑定手机)
  Request: { "phone": "string" }

POST /api/v1/auth/logout
  Response: { "code": 0, "message": "logout success" }
```

### User API
```
GET /api/v1/users/profile (获取个人档案)
  Response: { "data": { "userId": "...", "phone": "...", ... } }

PUT /api/v1/users/profile (更新个人档案)
  Request: { "avatar": "url", "nickname": "..." }

GET /api/v1/users/membership (获取会员信息)
  Response:
    {
      "membershipLevel": "金卡",
      "discountRate": 0.9,
      "currentPoints": 500,
      ...
    }
```

### Pet API
```
GET /api/v1/pets (获取宠物列表)
  Response: { "data": [ { "id": "...", "name": "...", ... } ] }

POST /api/v1/pets (新建宠物档案)
  Request:
    {
      "name": "小黑",
      "breed": "边牧",
      "ageMonths": 36,
      "weightKg": 28.5,
      "allergies": ["鸡肉"],
      ...
    }

PUT /api/v1/pets/{petId} (编辑宠物档案)
  Request: { ... }

GET /api/v1/pets/{petId} (获取单个宠物详情)
```

### Order API
```
POST /api/v1/orders (创建订单)
  Request:
    {
      "petId": "uuid",
      "serviceType": "标准",
      "checkInDate": "2026-04-15",
      "checkOutDate": "2026-04-20",
      "remark": "请多多活动"
    }
  Response:
    {
      "orderId": "uuid",
      "orderNo": "ORD-20260415-001",
      "totalAmount": 500.00,
      "prepayId": "wx_prepay_id"
    }

GET /api/v1/orders (获取订单列表)
  Query: { "status": "已支付", "page": 1, "limit": 20 }

GET /api/v1/orders/{orderId} (获取订单详情)

PUT /api/v1/orders/{orderId}/cancel (取消订单)
  Request: { "reason": "..." }

POST /api/v1/orders/{orderId}/rate (订单评价)
  Request: {
    "rating": 5,
    "comment": "服务很好，会继续使用！"
  }
```

### Payment API
```
POST /api/v1/payments/prepay (支付预下单)
  Request: { "orderId": "uuid", "amount": 500.00 }
  Response: { "prepayId": "wx_prepay_id" }

POST /api/v1/payments/callback (支付回调)
  从微信服务器回调，验证签名后更新订单状态

GET /api/v1/payments/{orderId}/status (查询支付结果)
```

### Feedback API
```
GET /api/v1/feedbacks/order/{orderId} (获取订单反馈列表)
  Response:
    {
      "data": [
        {
          "feedbackDate": "2026-04-15",
          "morningMeal": "150g 伊芙琳",
          "afternoonActivity": "2小时跑步",
          "images": ["url1", "url2"],
          ...
        }
      ]
    }

GET /api/v1/feedbacks/{feedbackId}/detail (获取单日反馈详情)

POST /api/v1/feedbacks/{orderId}/feedback-records (运营上传每日反馈)
  权限: 仅管理员可用
  Request:
    {
      "feedbackDate": "2026-04-15",
      "morningMeal": "150g",
      "afternoonActivity": "...",
      "images": ["url1", "url2"]
    }
```

### Points API
```
GET /api/v1/points/balance (获取积分余额)
  Response:
    {
      "currentBalance": 500,
      "totalEarned": 1200,
      "totalUsed": 700
    }

GET /api/v1/points/history (获取积分明细)
  Response:
    {
      "data": [
        {
          "type": "消费获得",
          "amount": 700,
          "date": "2026-04-20"
        }
      ]
    }

POST /api/v1/points/redeem (积分兑现)
  Request: { "points": 100 }
  Response: { "redeemAmount": 10.00 }
```

### Shop API
```
GET /api/v1/shop/home (商城首页数据)
GET /api/v1/shop/categories (商品分类)
GET /api/v1/shop/products (商品列表)
GET /api/v1/shop/products/{productId} (商品详情)

POST /api/v1/shop/cart/items (加入购物车)
GET /api/v1/shop/cart (购物车列表)
PUT /api/v1/shop/cart/items/{itemId} (修改购物车商品)
DELETE /api/v1/shop/cart/items/{itemId} (删除购物车商品)

POST /api/v1/shop/orders/preview (预结算)
POST /api/v1/shop/orders (创建商城订单)
POST /api/v1/shop/orders/{orderId}/pay (商城订单支付)
GET /api/v1/shop/orders (商城订单列表)
GET /api/v1/shop/orders/{orderId} (商城订单详情)
```

---

## 非功能性需求

### 性能指标
```
✅ 首屏加载时间: < 2秒
✅ 支付响应时间: < 3秒
✅ 列表加载时间: < 1秒
✅ API 平均响应: < 500ms
✅ 并发用户承载: ≥ 100 CCU
```

### 安全性要求
```
✅ HTTPS 全站加密
✅ JWT token 认证
✅ 微信支付签名验证
✅ SQL 注入防护 (参数化查询)
✅ XSS 防护 (输入过滤)
✅ Rate limiting (单用户10请求/秒)
✅ 日志审计 (支付、退款操作)
```

### 可用性要求
```
✅ 系统可用性: ≥ 99.5% (每月最多3.6小时闪断)
✅ 数据备份: 每日全量备份 + 每小时增量备份
✅ 灾难恢复: RPO (Recovery Point Objective) < 1小时
✅ 错误提示: 用户友好的错误信息
```

### 兼容性
```
✅ 微信小程序: 基础库 2.10.0+
✅ 支付宝小程序: 10.0.0+
✅ 网络: 2G/3G/4G/5G/WiFi
✅ 设备: iOS 9+ / Android 5+
```

---

## 实现计划

### 总体时间分配
```
周期: 1个月 (约20个工作日)

第1周 (5个工作日):
  ✅ 环境搭建 (后端框架初始化，uni-app项目搭建)
  ✅ 数据库设计与建表
  ✅ 用户认证模块 (后端 API + 前端页面)
  ✅ UI 设计稿完成 (Figma)

第2周 (5个工作日):
  ✅ 宠物档案模块 (前后端完整)
  ✅ 预订流程前端 (4步表单)
  ✅ 订单服务后端 (增删改查)
  ✅ 页面联调开始

第3周 (5个工作日):
  ✅ 微信支付集成 (预下单 + 回调)
  ✅ 每日反馈时间线 (前后端)
  ✅ 会员积分系统后端
  ✅ 个人中心页面完成

第4周 (5个工作日):
  ✅ 全流程集成测试
  ✅ 商城基础能力联调 (首页、详情、购物车、下单)
  ✅ 功能 BUG 修复
  ✅ 性能优化 (缓存、数据库索引)
  ✅ 上线前最终测试
  ✅ 小程序提交审核
```

### 开发任务拆分

#### 后端任务 (Java Spring Boot)
```
Task 1: 项目初始化 + 框架搭建 (1d)
  • Maven 配置依赖
  • 日志框架 (logback)
  • 配置管理 (application.yml)

Task 2: 数据库设计 (1d)
  • Flyway 数据库版本管理
  • 建表脚本
  • 索引优化

Task 3: User 微服务开发 (3d)
  • WeChat OAuth 授权接入
  • JWT token 生成/验证
  • 用户 CRUD
  • 会员等级计算逻辑

Task 4: Order 微服务开发 (3d)
  • 订单创建业务逻辑
  • 订单状态流转
  • 订单取消处理
  • 价格计算 (含折扣)

Task 5: Payment 微服务开发 (3d)
  • 微信支付 API 集成
  • 支付流水记录
  • 回调签名验证
  • 退款流程

Task 6: Feedback 微服务开发 (2d)
  • 反馈记录 CRUD
  • 图片 URL 管理
  • 时间线查询

Task 7: 测试 + 联调 (2d)
  • 单元测试
  • 集成测试
  • 前后端联调

Task 8: Shop 微服务开发 (2d)
  • 商品列表/详情 API
  • 购物车与商城订单
  • 商城库存扣减
  • 会员积分联动
```

#### 前端任务 (uni-app)
```
Task 1: 项目初始化 (1d)
  • uni-app 项目搭建
  • UI 框架集成 (uView2)
  • 路由配置

Task 2: 基础页面 (2d)
  • 登录页 (微信授权)
  • 首页结构
  • 底部 tabbar

Task 3: 预订流程页面 (3d)
  • Step 1: 日期选择器
  • Step 2: 服务等级卡片
  • Step 3: 宠物档案选择
  • Step 4: 订单确认页

Task 4: 支付页面 (1d)
  • 微信支付调起
  • 支付成功/失败提示

Task 5: 订单详情页 (2d)
  • 订单基本信息
  • 每日反馈时间线 (懒加载)
  • 取消/评价操作

Task 6: 个人中心 (2d)
  • 用户档案
  • 会员卡展示
  • 我的订单列表

Task 7: 测试 + 优化 (2d)
  • 功能测试
  • 响应式调试
  • 性能优化

Task 8: 商城页面开发 (2d)
  • 商城首页与分类页
  • 商品详情页
  • 购物车与下单页
```

### 关键里程碑
```
Day 5  : 第一周完成 - 用户认证可用
Day 10 : 第二周完成 - 预订流程可用
Day 15 : 第三周完成 - 支付集成完成
Day 20 : 第四周完成 - 全功能集成测试通过
Day 21 : 上线审核 - 提交小程序审核
Day 25 : 审核通过 - 发布上线
```

---

## 成功指标

### MVP 阶段成功标准 (上线首月)
```
功能完成度: ≥ 95%
  ✅ 所有 P0 功能已上线
  ✅ 所有 P1 功能 80% 完成

质量指标:
  ✅ 关键操作流程无崩溃
  ✅ 支付成功率 ≥ 99.5%
  ✅ 用户平均满分 ≥ 4.5/5.0

业务指标:
  ✅ 种子用户 50-100
  ✅ 成功订单 10-15
  ✅ 每日活跃用户 ≥ 10
  ✅ 复购意愿 ≥ 70%

技术指标:
  ✅ 首屏加载 < 2秒
  ✅ 支付流程 < 3秒
  ✅ 99分位延迟 < 1秒
  ✅ 错误日志 < 0.1%
```

### 用户反馈重点
```
重点收集:
  1. 预订流程是否简单直观? (目标: ≥80% 满意度)
  2. 每日反馈信息是否充分? (目标: ≥85% 满意度)
  3. 支付是否顺畅? (目标: 99% 成功率)
  4. 服务价格是否合理? (目标: 收集200+条评论)

后续优化方向:
  • 收集高频问题 → 优化 FAQ
  • 收集用户建议 → 规划 Phase 2 功能
  • 建立反馈闭环 → 每周回顾迭代
```

---

## 附录：技术栈详情

### 后端技术栈
```
Java 版本: OpenJDK 11 LTS
Spring Boot: 2.7.x
MySQL: 5.7.x
Redis: 6.x
依赖包:
  • spring-boot-starter-web
  • spring-boot-starter-data-jpa
  • spring-boot-starter-security
  • mysql-connector-java
  • jedis (Redis 客户端)
  • aliyun-java-sdk-core (阿里云 SDK)
  • weixin-java-pay (微信支付 SDK)
  • lombok (代码生成)
```

### 前端技术栈
```
uni-app 框架
编程语言: JavaScript (ES6+)
UI 框架: uView2
状态管理: Vuex
图片处理: uniapp 内置
HTTP 客户端: uni.request
打包: HBuilderX
目标平台:
  • 微信小程序
  • 支付宝小程序
```

### 部署架构
```
服务层: 阿里云 ECS (2核 2GB)
数据库: 阿里云 RDS MySQL 5.7
缓存: 阿里云 Redis (1GB)
存储: 阿里云 OSS
CDN: 阿里云 CDN (可选)
域名 + HTTPS: 阿里云
监控: 阿里云 CloudMonitor
日志: ELK Stack (可选)
```

---

## 审核检查表

- [ ] 产品定位清晰 (垂直专业)
- [ ] 商业模式可行 (服务费 + 狗粮 + 增值)
- [ ] 核心功能完整 (预订 + 反馈 + 会员)
- [ ] 技术方案可行 (Java + uni-app)
- [ ] 时间计划现实 (1个月 MVP)
- [ ] 成功指标可衡量 (数字化目标)
- [ ] 所有相关方确认 (产品、技术、运营)

---

**文档状态**: 待审核  
**下一步**: 收集反馈 → 修改调整 → 最终确认 → 开发启动
