# PRD: 会员与积分系统

**模块编号**: MOD-005  
**优先级**: P1  
**所属版本**: MVP v1.0

---

## 一、模块概述

### 业务背景
- 会员系统是用户留存的关键驱动力
- 积分激励用户复购和留评
- 通过分级制造用户等级感和成就感

### 竞品对标

| 竞品 | 会员等级 | 积分规则 | 转化效果 |
|------|---------|---------|---------|
| **58 宠物** | 无 | 无 | 0% 复购驱动 |
| **宠那么萌** | 1 级 (VIP) | 支付金额的 1% | 低吸引力 |
| **宠幸** | 4 级 (铜银金钻) | 复杂的等级规则 | 用户理解成本高 |
| **我们的优势** | **4 级 (简化版)** | **1 元=1 分，100 分=¥10** | **清晰透明** |

---

## 二、用户故事

### 用户故事 1: 快速了解会员权益
```
作为一个新用户
我想快速了解会员等级能带来什么好处
这样我知道是否值得升级

验收标准:
✓ 页面清晰展示 4 个等级的权益对比
✓ 能看到每个等级的升级条件
✓ 可计算距离下一等级还需多少消费
```

### 用户故事 2: 申请升级会员
```
作为一个消费满 ¥500 的用户
我想升级到银卡会员
获得更多折扣和权益

验收标准:
✓ 升级自动生效，不需要申请
✓ 升级后立即看到折扣变化
✓ 升级通知推送给用户
```

### 用户故事 3: 查看和使用积分
```
作为一个有积分的用户
我想看到自己有多少积分
下次预订时可以用积分抵现

验收标准:
✓ 个人中心显示当前积分数量
✓ 积分明细表显示获得和使用记录
✓ 预订时能灵活选择使用多少积分
✓ 积分不足时有清晰提示
```

---

## 三、功能需求

### 3.1 会员等级系统

#### 等级定义

| 等级 | 升级条件 | 折扣 | 权益 | 续期 |
|------|---------|------|------|------|
| **普通** | 初始等级 | 无 | 基础权益 | 永久 |
| **银卡** | 消费 ≥ ¥500 | 9.5 折 | 生日优惠 + 优先预订 | 每年自动续期 |
| **金卡** | 消费 ≥ ¥1500 | 9 折 | 银卡权益 + 专属客服 | 每年自动续期 |
| **钻石** | 消费 ≥ ¥3000 | 8.5 折 | 金卡权益 + 免费送狗粮 1 个月 | 每年自动续期 |

**备注**
- 消费统计: 计算已完成订单的实际支付金额 (包括退款/取消则不计)
- 等级只升不降，一旦升级成功永久保持该等级
- 续期: 每个自然年 1 月 1 日检查消费金额，自动续期

#### 会员等级展示页

```
┌──────────────────────────────────┐
│       我的会员等级               │
├──────────────────────────────────┤
│                                  │
│ 进度条展示                       │
│ ┌──────────────────────────────┐│
│ │   🏅 您已升级到: 银卡会员    ││
│ │   升级于: 2026-03-15         ││
│ │   续期于: 2027-01-01         ││
│ └──────────────────────────────┘│
│                                  │
│ 消费进度 (距离下一等级)         │
│ ┌──────────────────────────────┐│
│ │ 银卡  → 金卡                  ││
│ │ 累计消费: ¥980 / ¥1500       ││
│ │ ■■■■□□□□□□ (980/1500)        ││
│ │ 还需消费: ¥520                ││
│ │ 预计升级: 下次 2-3 单        ││
│ └──────────────────────────────┘│
│                                  │
│ 当前权益                         │
│ ✓ 预订 9.5 折                   │
│ ✓ 生日当月额外 9 折              │
│ ✓ 优先预订 (库存不足时优先)     │
│ ✓ 专属客服支持 (仅金卡+)        │
│ ... (展开更多)                  │
│                                  │
├──────────────────────────────────┤
│ [权益对比表] [规则说明]         │
└──────────────────────────────────┘
```

#### 会员等级对比表 (可展开)

```
┌──────────┬──────────┬──────────┬──────────┐
│ 权益     │ 普通     │ 银卡     │ 金卡     │
├──────────┼──────────┼──────────┼──────────┤
│ 预订折扣 │ 无       │ 9.5 折   │ 9 折     │
│ 生日优惠 │ 无       │ 9 折     │ 8.5 折   │
│ 优先预订 │ 无       │ ✓        │ ✓        │
│ 专属客服 │ 无       │ 无       │ ✓        │
│ 免费狗粮 │ 无       │ 无       │ 1 个月/年│
│ 推荐佣金 │ 无       │ 2%       │ 3%       │
│ 积分倍数 │ 1 倍     │ 1.2 倍   │ 1.5 倍   │
└──────────┴──────────┴──────────┴──────────┘
```

### 3.2 积分系统

#### 积分获得规则

```
1️⃣ 订单完成时获得
   积分数量 = 实际支付金额 × 积分倍数
   
   示例:
   • 普通用户预订 ¥440 → 获得 440 分
   • 银卡用户预订 ¥440 → 获得 440 × 1.2 = 528 分
   • 金卡用户预订 ¥440 → 获得 440 × 1.5 = 660 分

2️⃣ 邀请新用户奖励 (可选)
   邀请并完成首单: +100 分
   被邀请新用户也获得: +100 分

3️⃣ 评价奖励 (可选)
   完成寄养后留评: +50 分
   评价 ≥ 4 星: +25 额外分

4️⃣ 签到奖励 (可选，后期功能)
   每日签到: +5 分
   连续签到 7 天: +50 额外分
```

#### 积分使用规则

```
积分兑换:
  • 100 分 = ¥10 (固定比例)
  • 预订时可选择使用多少积分
  • 可用积分上限: 订单金额的 50%
  
  示例:
  • 订单 ¥400 → 最多可用 ¥200 = 2000 分
  • 使用 500 分 = ¥5 优惠
  • 最终支付: ¥400 - ¥5 = ¥395

有效期:
  • 积分有效期: 2 年
  • 2 年未使用则自动过期清零
  • 每次使用时优先扣减最快过期的积分
```

#### 积分详情页

```
┌──────────────────────────────────┐
│       我的积分                    │
├──────────────────────────────────┤
│                                  │
│ 📊 积分总览                      │
│ ┌──────────────────────────────┐│
│ │ 当前积分: 2,480 |分            ││
│ │ 可用积分: 2,480 分             ││
│ │ 冻结积分: 0 分 (预订中)        ││
│ │ 即将过期: 100 分 (2026-10-31) ││
│ │                               ││
│ │ 兑换价值: ¥248 (可直接抵现)   ││
│ │ [下次预订使用]                ││
│ └──────────────────────────────┘│
│                                  │
│ 📋 积分明细 (最近 30 天)         │
│ ┌──────────────────────────────┐│
│ │ 2026-04-16  +528 分          ││
│ │ 订单完成: ORD-20260415-001   ││
│ │ (标准寄养 ×5 天)             ││
│ │ 银卡倍数 ××1.2               ││
│ │                               ││
│ │ 2026-04-10  -100 分          ││
│ │ 积分兑现在预订: ORD-20260410-003  ││
│ │ 扣¥10 优惠                    ││
│ │                               ││
│ │ 2026-04-08  +480 分          ││
│ │ 订单完成: ORD-20260406-002   ││
│ │ (基础寄养 ×4 天)             ││
│ │ 新用户无倍数                  ││
│ │                               ││
│ │ 2026-04-01  +50 分           ││
│ │ 评价奖励 (ORD-20260406-002)  ││
│ │ 4.5 星 + 25 分奖励            ││
│ │                               ││
│ │ [加载更多]                   ││
│ └──────────────────────────────┘│
│                                  │
│ ⚠️ 即将过期的积分                │
│ ┌──────────────────────────────┐│
│ │ 100 分 将在 2026-10-31 过期  ││
│ │ 建议下个月预订时使用           ││
│ └──────────────────────────────┘│
│                                  │
└──────────────────────────────────┘
```

### 3.3 会员权益领取

#### 生日月折扣

```
触发条件: 当月是会员生日月 + 银卡+

页面提示:
┌──────────────────────────────┐
│ 🎂 生日月特惠!               │
│ 本月所有预订额外享受深度折扣 │
│ 银卡: 9.5 折 → 9 折          │
│ 金卡: 9 折 → 8.5 折          │
│ 有效期: 2026-04-30          │
│ [立即预订]                  │
└──────────────────────────────┘

实现:
- 系统每个月检查当月生日用户
- 自动将折扣提升一档 (24 小时内)
- 推送通知提醒用户
```

#### 免费狗粮权益 (钻石卡)

```
触发: 升级到钻石卡 or 每年续期时

权益内容:
- 价值 ¥300 的平台推荐狗粮 (1 个月)
- 自动发放 1 张 ¥300 代金券

使用:
- 用户在商城选择符合条件的狗粮
- 结账时自动扣减代金券
- 有效期 90 天，过期作废
```

### 3.4 会员升级工作流

#### 自动升级流程

```
订单支付成功
  ↓
检查用户会员等级
  ↓
计算消费总额 (已完成订单)
  ↓
消费 ≥ ¥1500 且当前是普通/银卡
  ├─ 是 → 自动升级到金卡
  │   ↓
  │   更新 users.membership_level
  │   ↓
  │   保存升级时间到 membership_level_history
  │   ↓
  │   推送通知: "恭喜升级到金卡!"
  │   ↓
  │   赠送升级奖励 (可选): +200 分
  │
  └─ 否 → 无操作
```

---

## 四、数据模型

### membership_stats 表
```sql
CREATE TABLE membership_stats (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) UNIQUE NOT NULL,
  
  current_level ENUM('普通','银卡','金卡','钻石') DEFAULT '普通',
  total_spent DECIMAL(12,2) DEFAULT 0 COMMENT '总消费金额 (计算已完成订单)',
  total_orders INT DEFAULT 0 COMMENT '总订单数',
  
  current_points INT DEFAULT 0 COMMENT '当前可用积分',
  total_earned_points INT DEFAULT 0 COMMENT '累计获得积分',
  total_used_points INT DEFAULT 0 COMMENT '累计使用积分',
  
  points_expiry_date DATE COMMENT '最早过期的积分到期日',
  
  level_upgrade_time TIMESTAMP NULL COMMENT '升级到当前等级的时间',
  level_expiry_date DATE COMMENT '当前等级有效期截止 (每年1月1日)',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_current_level (current_level)
);
```

### membership_level_history 表
```sql
CREATE TABLE membership_level_history (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  
  previous_level ENUM('普通','银卡','金卡','钻石'),
  new_level ENUM('普通','银卡','金卡','钻石') NOT NULL,
  
  upgrade_reason ENUM('首次','消费升级','活动升级','人工升级'),
  trigger_order_id CHAR(36) COMMENT '触发升级的订单',
  bonus_points INT COMMENT '升级奖励积分',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (trigger_order_id) REFERENCES orders(id),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);
```

### points_transaction 表
```sql
CREATE TABLE points_transaction (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  transaction_type ENUM('获得','使用','过期','调整') NOT NULL,
  
  amounts INT NOT NULL COMMENT '积分数量 (正数=获得, 负数=使用)',
  reason ENUM('订单完成','邀请奖励','评价奖励','签到','商城消费','积分过期','人工调整'),
  
  related_order_id CHAR(36) COMMENT '关联订单',
  related_review_id CHAR(36) COMMENT '关联评价',
  
  balance_before INT COMMENT '交易前余额',
  balance_after INT COMMENT '交易后余额',
  
  expiry_date DATE COMMENT '该笔积分的过期日期 (获得时+2年)',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (related_order_id) REFERENCES orders(id),
  
  INDEX idx_user_id (user_id),
  INDEX idx_transaction_type (transaction_type),
  INDEX idx_created_at (created_at)
);
```

---

## 五、API 接口

### GET /api/v1/membership/status
获取会员状态

```json
响应:
{
  "code": 0,
  "data": {
    "currentLevel": "银卡",
    "totalSpent": 980,
    "nextLevel": "金卡",
    "spentToNextLevel": 1500,
    "remainingToNextLevel": 520,
    "discount": "9.5折",
    "privileges": [
      "生日优惠",
      "优先预订",
      "专属客服"
    ],
    "levelUpgradeTime": "2026-03-15",
    "levelExpiryDate": "2027-01-01"
  }
}
```

### GET /api/v1/points/balance
获取积分余额

```json
响应:
{
  "code": 0,
  "data": {
    "currentPoints": 2480,
    "expiringPoints": 100,
    "expiryDate": "2026-10-31",
    "conversionValue": 248.00,
    "pointsMultiplier": 1.2,
    "lastUpdated": "2026-04-16T10:30:00Z"
  }
}
```

### GET /api/v1/points/history
获取积分明细

```json
请求:
Query:
  - page: 1
  - pageSize: 20
  - type: 'all|earned|used|expired'

响应:
{
  "code": 0,
  "data": {
    "total": 50,
    "page": 1,
    "items": [
      {
        "id": "uuid",
        "date": "2026-04-16",
        "type": "earned",
        "amount": 528,
        "reason": "订单完成",
        "orderId": "ORD-20260415-001",
        "orderAmount": 440,
        "multiplier": 1.2,
        "balanceAfter": 2480,
        "expiryDate": "2028-04-16"
      }
    ]
  }
}
```

### POST /api/v1/orders/apply-points
在预订时应用积分

```json
请求:
{
  "orderId": "uuid",
  "pointsToUse": 500
}

响应:
{
  "code": 0,
  "data": {
    "pointsApplied": 500,
    "pointsValue": 50.00,
    "newTotal": 390.00
  }
}
```

---

## 六、MVP 实现计划

### Week 1
- ✅ 会员等级表设计
- ✅ 积分计算规则
- ✅ membership_stats UI

### Week 2
- ✅ 自动升级流程
- ✅ 积分明细页
- ✅ 预订时使用积分

### Week 3
- ✅ 生日月优惠
- ✅ 积分过期处理
- ✅ 管理后台积分调整
