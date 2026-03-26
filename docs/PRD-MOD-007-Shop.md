# PRD: 狗粮商城与用品售卖系统

**模块编号**: MOD-007  
**优先级**: P1  
**所属版本**: v1.1 增强模块（可在 MVP 后半段并行建设）

---

## 一、模块概述

### 业务背景
- 当前 PRD 已覆盖寄养服务链路，但缺少交易延伸场景
- 用户在寄养前后，对狗粮、零食、营养品、洗护用品有高频购买需求
- 商城模块可以承担 3 个角色：提升客单价、增强会员权益感知、形成寄养之外的日常复购入口

### 模块定位
- **定位**: 自营精选商城，不做平台撮合，不引入第三方商家
- **核心品类**: 狗粮、冻干零食、营养补充剂、洗护用品、牵引绳/玩具、寄养加购包
- **核心场景**:
  - 日常复购买粮
  - 预订寄养时顺手加购
  - 会员兑换/积分抵现
  - 寄养结束后推荐同款粮和护理用品

### 竞品对标

| 竞品 | 商城能力 | 问题 | 我们的策略 |
|------|---------|------|-----------|
| **58宠物** | 商品分散在商家页 | 品控弱、无统一服务标准 | **仅做自营精选，强调信任和复购** |
| **宠那么萌** | 偏内容带货 | 转化链路长 | **商品页直接下单，减少跳转** |
| **宠幸** | 品类全但路径复杂 | 首页信息密度高 | **只做高频刚需 SKU，分类清晰** |
| **我们的优势** | **寄养 + 商城一体化** | - | **服务场景驱动商品消费** |

### 范围边界
- **本期做**:
  - 商品浏览、搜索、分类筛选
  - 商品详情、规格选择、购物车、下单支付
  - 会员价、积分抵现、优惠标签展示
  - 与订单中心打通，支持查看商城订单
  - 寄养订单页的加购推荐
- **本期不做**:
  - 多商户入驻
  - 满减券/复杂营销裂变
  - 直播电商
  - 分销体系
  - 同城即时配送调度

---

## 二、用户故事与场景

### 用户故事 1: 购买常用狗粮
```
作为一个复购型用户
我想快速找到适合自己宠物的狗粮并下单
这样可以减少反复咨询和选品时间

验收标准:
✓ 首页可直接看到主推狗粮和热销商品
✓ 支持按品牌、年龄段、功能标签筛选
✓ 商品详情清楚展示成分、适用犬型、喂养建议
✓ 从浏览到支付不超过 3 分钟
```

### 用户故事 2: 寄养时顺手加购用品
```
作为一个已经下寄养单的用户
我想在入住前顺手给宠物加购狗粮或洗护用品
这样可以一次性解决服务和用品需求

验收标准:
✓ 在寄养订单详情页可看到推荐商品入口
✓ 支持直接把商品加入购物车或立即购买
✓ 加购商品可显示为“随寄养订单一并准备”
```

### 用户故事 3: 使用会员与积分优惠
```
作为一个会员用户
我想在商城下单时自动享受会员价和积分抵现
这样能感受到会员权益的真实价值

验收标准:
✓ 商品列表和详情页展示会员价
✓ 结算页自动带出可用积分
✓ 下单后积分明细与会员消费统计同步更新
```

---

## 三、功能需求

### 3.1 商城首页

**页面目标**
- 让用户在 5 秒内理解“这里可以买什么”
- 用尽量少的 SKU 入口提升转化，不堆砌电商首页信息

**页面结构**
```
┌──────────────────────────────────┐
│ 搜索框: 搜索狗粮/零食/牵引绳      │
├──────────────────────────────────┤
│ Banner: 本周主推 / 新客推荐       │
├──────────────────────────────────┤
│ 分类宫格                          │
│ [狗粮] [零食] [营养] [洗护]       │
│ [玩具] [寄养加购] [会员专享] [清仓]│
├──────────────────────────────────┤
│ 热销榜单                          │
│ 商品卡 1 / 商品卡 2 / 商品卡 3     │
├──────────────────────────────────┤
│ 场景推荐                          │
│ 1. 入住前准备                     │
│ 2. 肠胃敏感专用                   │
│ 3. 换粮期过渡组合                 │
├──────────────────────────────────┤
│ 底部导航: 首页 / 分类 / 购物车 / 我的│
└──────────────────────────────────┘
```

**首页商品卡字段**
- 商品主图
- 商品名称
- 核心卖点标签（如“幼犬适用”“无谷”“爆款复购”）
- 销售价
- 会员价（如有）
- 月销量/已售数量
- 按钮: 加入购物车 / 立即购买

**推荐策略**
- 新用户优先展示“入门粮”“高复购基础用品”
- 已有寄养订单用户优先展示“入住前准备包”“同款狗粮补货”
- 会员用户优先展示“会员专享价”和积分可兑换商品

### 3.2 分类与搜索

**分类结构**
```
一级分类:
  - 狗粮
  - 零食
  - 营养保健
  - 洗护清洁
  - 出行牵引
  - 玩具用品
  - 寄养加购

二级筛选:
  - 品牌
  - 适用阶段 (幼犬/成犬/老年犬)
  - 功能诉求 (美毛/肠胃/增重/低敏)
  - 价格区间
  - 是否会员价
```

**搜索要求**
- 支持商品名称、品牌、功效标签搜索
- 提供热门搜索词和历史搜索词
- 无结果时给出推荐分类和热门商品

### 3.3 商品详情页

**页面结构**
```
┌──────────────────────────────────┐
│ 商品轮播图                        │
├──────────────────────────────────┤
│ 名称: 渴望六种鱼全犬粮 2kg         │
│ 价格: ¥168   会员价: ¥158         │
│ 标签: 无谷 / 低敏 / 高蛋白         │
│ 已售: 236 件                      │
├──────────────────────────────────┤
│ 规格选择: 2kg / 6kg / 11.4kg      │
│ 数量选择: [-] 1 [+]               │
├──────────────────────────────────┤
│ 核心卖点                          │
│ - 适合中大型犬                    │
│ - 鱼肉蛋白为主                    │
│ - 肠胃敏感犬友好                  │
├──────────────────────────────────┤
│ 详细说明                          │
│ - 原料成分                        │
│ - 营养分析                        │
│ - 喂养建议                        │
│ - 储存方式                        │
├──────────────────────────────────┤
│ 服务说明                          │
│ - 48 小时内发货                   │
│ - 拆封食品不支持无理由退货         │
│ - 质量问题包退换                  │
├──────────────────────────────────┤
│ [加入购物车] [立即购买]           │
└──────────────────────────────────┘
```

**详情页增强信息**
- 显示适用品种/体型建议
- 显示“店内寄养犬常用款”标签，增强信任
- 对寄养加购商品展示“入住时可直接使用”说明

### 3.4 购物车

**核心能力**
- 多商品批量勾选
- 支持修改规格、数量、删除、移入收藏（收藏可后续版本上线）
- 自动显示总价、会员优惠、积分可抵金额

**交互规则**
- 失效商品（下架/无库存）单独置底并提示
- 限购商品超出数量时禁止继续增加
- 不同履约类型分组展示:
  - 快递发货
  - 到店自提
  - 寄养订单加购

### 3.5 结算与支付

**结算页信息块**
```
收货方式:
  - 快递到家
  - 到店自提
  - 随寄养订单准备

收货信息:
  - 地址 / 联系人 / 手机号

商品清单:
  - 商品名 + 规格 + 数量 + 单价

优惠信息:
  - 会员立减
  - 积分抵现

费用汇总:
  - 商品总额
  - 运费
  - 优惠金额
  - 实付金额
```

**支付规则**
- 仅接入微信支付
- 积分抵现复用现有积分规则：100 分 = ¥10
- 商城订单支付成功后:
  - 扣减库存
  - 增加用户积分
  - 累加会员消费额
  - 写入订单中心统一视图

### 3.6 商城订单管理

**订单状态**
```
待支付 → 已支付 → 待发货 → 已发货 → 已完成
                └→ 已取消
已支付 → 退款中 → 已退款
```

**订单列表页**
- Tab: 全部 / 待支付 / 待发货 / 待收货 / 已完成 / 售后
- 每个订单卡片显示:
  - 订单号
  - 商品缩略图
  - 数量与总价
  - 当前状态
  - 操作按钮（继续支付、查看物流、申请售后、再次购买）

### 3.7 与现有模块联动

**与 MOD-002 预订模块联动**
- 预订确认页可推荐“入住前准备商品”
- 支持在寄养订单详情页跳转商城商品详情

**与 MOD-004 订单模块联动**
- 我的订单中增加“商城订单”维度或统一聚合展示
- 订单消息中心复用已存在通知体系

**与 MOD-005 会员积分联动**
- 商城下单计算会员折扣
- 商城订单完成后累计会员消费
- 支持积分抵现和积分获取

**与 MOD-006 服务模块联动**
- 商品问题、退换货、物流问题进入客服/工单系统

---

## 四、运营与商品管理后台需求

### 商品管理
- 商品新增/编辑/上下架
- 规格 SKU 配置
- 库存修改
- 商品图与详情图上传
- 商品标签配置（热销、新品、会员专享、寄养推荐）

### 订单履约
- 查看待发货订单
- 批量发货与填写快递单号
- 自提核销标记
- 寄养加购标记为“已备货”

### 数据看板
- GMV
- 支付转化率
- 客单价
- 高复购商品 TOP10
- 寄养场景带货转化率

---

## 五、数据模型

### products 表
```sql
CREATE TABLE products (
  id CHAR(36) PRIMARY KEY,
  product_no VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  category_code VARCHAR(50) NOT NULL,
  subcategory_code VARCHAR(50),
  brand VARCHAR(100),
  product_type ENUM('狗粮','零食','营养','洗护','牵引','玩具','寄养加购') NOT NULL,
  description TEXT,
  selling_points JSON COMMENT '卖点标签',
  detail_content LONGTEXT COMMENT '图文详情',
  cover_image VARCHAR(500),
  detail_images JSON,
  status ENUM('草稿','上架','下架') DEFAULT '草稿',
  fulfillment_type ENUM('快递','自提','寄养加购') DEFAULT '快递',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category_code (category_code),
  INDEX idx_status (status)
);
```

### product_skus 表
```sql
CREATE TABLE product_skus (
  id CHAR(36) PRIMARY KEY,
  product_id CHAR(36) NOT NULL,
  sku_code VARCHAR(50) UNIQUE NOT NULL,
  spec_name VARCHAR(100) COMMENT '如 2kg / 6kg',
  market_price DECIMAL(10,2),
  sale_price DECIMAL(10,2) NOT NULL,
  member_price DECIMAL(10,2),
  stock_qty INT DEFAULT 0,
  locked_stock_qty INT DEFAULT 0,
  weight DECIMAL(10,2),
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_product_id (product_id),
  INDEX idx_stock_qty (stock_qty)
);
```

### cart_items 表
```sql
CREATE TABLE cart_items (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  product_id CHAR(36) NOT NULL,
  sku_id CHAR(36) NOT NULL,
  quantity INT NOT NULL,
  selected BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_sku_id (sku_id)
);
```

### product_orders 表
```sql
CREATE TABLE product_orders (
  id CHAR(36) PRIMARY KEY,
  order_no VARCHAR(50) UNIQUE NOT NULL,
  user_id CHAR(36) NOT NULL,
  related_boarding_order_id CHAR(36) NULL COMMENT '关联寄养订单，可为空',
  delivery_type ENUM('快递','自提','寄养加购') NOT NULL,
  consignee_name VARCHAR(100),
  consignee_phone VARCHAR(30),
  consignee_address VARCHAR(500),
  goods_amount DECIMAL(10,2) NOT NULL,
  freight_amount DECIMAL(10,2) DEFAULT 0,
  member_discount_amount DECIMAL(10,2) DEFAULT 0,
  points_deduction_amount DECIMAL(10,2) DEFAULT 0,
  pay_amount DECIMAL(10,2) NOT NULL,
  order_status ENUM('待支付','已支付','待发货','已发货','已完成','已取消','退款中','已退款') DEFAULT '待支付',
  remark VARCHAR(300),
  paid_at TIMESTAMP NULL,
  shipped_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_order_status (order_status)
);
```

### product_order_items 表
```sql
CREATE TABLE product_order_items (
  id CHAR(36) PRIMARY KEY,
  order_id CHAR(36) NOT NULL,
  product_id CHAR(36) NOT NULL,
  sku_id CHAR(36) NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  sku_spec VARCHAR(100),
  sale_price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  subtotal_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES product_orders(id),
  INDEX idx_order_id (order_id)
);
```

---

## 六、API 接口清单

### 用户端 API
- GET /api/v1/shop/home
- GET /api/v1/shop/categories
- GET /api/v1/shop/products
- GET /api/v1/shop/products/{productId}
- POST /api/v1/shop/cart/items
- GET /api/v1/shop/cart
- PUT /api/v1/shop/cart/items/{itemId}
- DELETE /api/v1/shop/cart/items/{itemId}
- POST /api/v1/shop/orders/preview
- POST /api/v1/shop/orders
- POST /api/v1/shop/orders/{orderId}/pay
- GET /api/v1/shop/orders
- GET /api/v1/shop/orders/{orderId}
- POST /api/v1/shop/orders/{orderId}/cancel
- POST /api/v1/shop/orders/{orderId}/after-sale

### 管理端 API
- POST /api/v1/admin/shop/products
- PUT /api/v1/admin/shop/products/{productId}
- POST /api/v1/admin/shop/products/{productId}/publish
- POST /api/v1/admin/shop/orders/{orderId}/ship
- GET /api/v1/admin/shop/dashboard

---

## 七、异常处理

### 库存不足
```
用户点击结算
  ↓
系统二次校验 SKU 库存
  ↓
库存不足
  ↓
提示: "部分商品库存变化，请重新确认"
  ↓
自动刷新购物车价格与库存状态
```

### 商品下架
```
购物车中存在已下架商品
  ↓
结算时拦截
  ↓
提示: "商品已下架，已为您移出可结算列表"
```

### 积分不足或变动
```
用户使用积分支付
  ↓
后台校验当前可用积分
  ↓
不足
  ↓
提示: "积分已变更，请重新确认"
```

---

## 八、MVP 实现计划

### Phase A: 商品基础能力
- 商品分类、商品列表、详情页
- 商品后台录入、上下架、库存配置

### Phase B: 交易闭环
- 购物车、结算页、商城订单创建
- 微信支付与支付回调
- 商城订单列表/详情

### Phase C: 业务联动
- 会员价和积分抵现接入
- 寄养订单页加购推荐
- 工单与售后入口打通

### 阶段目标
- 首期 SKU 控制在 30-50 个，优先高频刚需
- 商城首页首屏 8 个核心商品位即可，不做复杂装修
- 首版以“精选少量高转化商品”验证复购，不追求平台化