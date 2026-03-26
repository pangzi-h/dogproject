# PRD: 寄养预订系统

**模块编号**: MOD-002  
**优先级**: P0 (核心)  
**所属版本**: MVP v1.0

---

## 一、模块概述

### 业务背景
- 预订是用户与平台最主要的交互点
- 复杂的流程需要引导，避免用户放弃
- 实时价格计算和库存展示是关键

### 竞品对标

| 竞品 | 预订流程 | 价格体系 | 差异 |
|------|---------|---------|------|
| **58宠物** | 撮合模式，预订后需等待商家确认 | 商家自定价 | 流程长，不透明 |
| **宠那么萌** | 3步就可完成 | 标准价格表 | 过于简化，无个性化 |
| **宠幸** | 上门预约+寄养混合 | 按服务类型分级 | 功能完整但UX复杂 |
| **我们的优势** | **4步精准预订** | **分级定价+会员折扣** | **简洁清晰+实时计算** |

---

## 二、用户故事与场景

### 用户故事 1: 快速预订
```
作为一个需要紧急寄养宠物的用户
我想在 2 分钟内完成预订流程
这样不用花太多时间就能放心出差

验收标准:
✓ 从首页点击到支付不超过 2 分钟
✓ 预订流程 4 步以内
✓ 实时展示总价格
✓ 支付成功立即确认
```

### 用户故事 2: 了解服务详情
```
作为一个第一次使用的用户
我想清楚地看到不同服务等级的差异
这样可以根据需求选择合适的套餐

验收标准:
✓ 每个套餐的功能对比清晰明了
✓ 可以看到其他用户对同等级的评价
✓ 可以看到成功案例/用户评论
```

### 用户故事 3: 应用会员折扣
```
作为一个会员用户
我想在预订时自动应用我的会员折扣
这样能节省成本

验收标准:
✓ 页面显示当前会员等级
✓ 实时计算折扣后价格
✓ 展示积分可用情况
✓ 支持积分抵现
```

---

## 三、功能需求

### 3.1 预订流程 (4 步)

#### Step 1: 选择日期与时长

**页面元素**
```
标题: "选择寄养时间"

日期选择器
  - 日历展示，可前后翻页
  - 禁用日期: 今天之前，365天之后
  - 禁用日期: 已满额的日期 (库存为0)
  - 禁用日期: 标红显示，鼠标提示"该日期已满，请选择其他时间"

入院日期: [选中日期] ← 可点击改变
出院日期: [默认为入院+1天] ← 可点击改变

时长自动计算: N 天

实时价格预览 (卡片形式):
  ┌─────────────────────┐
  │ 基础寄养: ¥60 x N天 │
  │ = ¥600              │
  │ (套餐会随着选择变化) │
  └─────────────────────┘

[下一步] 按钮
```

**交互逻辑**
```
用户选择入院日期
  ↓
系统检查库存
  ├─ 库存充足 → 可选
  └─ 库存不足 → 禁用，提示"该日期已满"

用户选择出院日期
  ↓
系统计算时长
  ↓
系统查询该时长段所有日期的库存
  ├─ 都充足 → 显示价格
  └─ 有一天不充足 → 提示"该时段有不可用日期，请重新选择"
```

**库存管理**
```
每个寄养等级的日库存限制:
  - 基础寄养: 5 只/天
  - 标准寄养: 8 只/天
  - VIP 寄养: 3 只/天

库存扣减:
  - 订单支付成功时 -1
  - 订单取消时 +1
```

#### Step 2: 选择服务等级

**页面元素**
```
标题: "选择服务套餐"

套餐卡片展示 (横向滚动或竖向列表):

┌─────────────────────────────────┐
│ 基础寄养                    ¥60/天│
│ ──────────────────────────────── │
│ ✓ 自带狗粮                      │
│ ✓ 遛狗 2 次                     │
│ ✓ 基础护理                      │
│ × 不含反馈                      │
│                                  │
│ [选择] 按钮                      │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 标准寄养 ⭐ 推荐         ¥100/天 │
│ ──────────────────────────────── │
│ ✓ 自带狗粮                      │
│ ✓ 遛狗 3 次                     │
│ ✓ 每日图文反馈                   │
│ ✓ 梳毛护理                      │
│ ✓ 视频汇报                      │
│                                  │
│ [选择] 按钮                      │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ VIP 寄养                   ¥150/天│
│ ──────────────────────────────── │
│ ✓ 自带狗粮                      │
│ ✓ 单间住宿                      │
│ ✓ 遛狗 4 次                     │
│ ✓ 每日视频直播                   │
│ ✓ 专业训练互动                   │
│ ✓ 美容护理                      │
│                                  │
│ [选择] 按钮                      │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 💡 套餐对比说明                  │
│ [查看详细对比表格]               │
└─────────────────────────────────┘
```

**套餐对比弹窗** (可选)
```
┌────────────────────────────────────┐
│        三大套餐对比表              │
├─────┬──────────┬──────────┬────────┤
│功能 │基础¥60   │标准¥100  │VIP¥150 │
├─────┼──────────┼──────────┼────────┤
│狗粮 │自带   ✓  │自带   ✓  │自带   ✓│
│遛狗 │1次       │2次       │3次     │
│反馈 │无        │图文   ✓  │视频   ✓│
│房间 │集中管理  │集中管理  │单间   ✓│
│训练 │无        │无        │有   ✓  │
│美容 │无        │梳毛   ✓  │专业   ✓│
│价格 │¥60/天    │¥100/天   │¥150/天 │
└─────┴──────────┴──────────┴────────┘
```

**价格计算逻辑**
```
基础价格 = 选定套餐单价 × 天数

会员折扣应用:
  - 普通用户: 无折扣
  - 银卡会员: 9.5 折
  - 金卡会员: 9 折
  - 钻石卡会员: 8.5 折

应用折扣后价格 = 基础价格 × 会员折扣

该价格显示在 Step 1 的预览卡片中，用户在 Step 2 后确认
```

#### Step 3: 选择宠物档案

**页面元素**
```
标题: "选择您的宠物"

已有档案列表:
┌─────────────────────┐
│ [宠物照片]          │
│ 小黑 | 边牧 | 3岁   │
│ 体重: 28.5kg        │
│ 过敏: 鸡肉          │
│ [✓ 选择] 或 [选择]  │
└─────────────────────┘

┌─────────────────────┐
│ [宠物照片]          │
│ 糖糖 | 泰迪 | 1岁   │
│ 体重: 5kg           │
│ 过敏: 无            │
│ [选择]              │
└─────────────────────┘

[+ 新建宠物档案] (跳转到 MOD-001)
```

**选择后展示**
```
已选宠物信息卡片:
┌─────────────────────────┐
│ [宠物照片]              │
│ 小黑 (边牧, 3 岁)      │
│ 体重: 28.5kg            │
│ 健康信息:               │
│  • 疫苗: 已接种 ✓       │
│  • 过敏: 鸡肉           │
│  • 特殊需求: 怕洗澡      │
│                         │
│ [修改选择]              │
└─────────────────────────┘
```

#### Step 4: 确认订单

**页面元素**
```
标题: "确认订单信息"

订单信息汇总:
┌────────────────────────────────┐
│ 寄养日期                        │
│ 2026-04-15 ~ 2026-04-20        │
│ 共 5 天                         │
├────────────────────────────────┤
│ 宠物信息                        │
│ 小黑 (边牧)                    │
│ 疫苗已接种 ✓                   │
│ 特殊需求: 怕洗澡, 需定期喂水   │
├────────────────────────────────┤
│ 服务套餐                        │
│ 标准寄养                        │
│ ¥100/天 × 5 天                 │
│ 基础价格: ¥500                 │
│ 会员折扣 (-10%): -¥50           │
│ 应用积分 (-100 分): -¥10        │
│                                │
│ 应付金额: ¥440                 │
└────────────────────────────────┘

备注信息:
┌────────────────────────────────┐
│ 给寄养人员的额外备注 (可选)    │
│ [输入框]                        │
│ "请多陪他玩，容易分离焦虑"    │
│ 字符数: 10/200                  │
└────────────────────────────────┘

确认条款:
☐ 我同意《宠物寄养服务条款》
☐ 我已阅读《风险提示与责任范围》
☐ 确认宠物档案信息准确无误

[返回修改] [立即支付] 按钮
```

---

## 四、支付与订单确认

### 支付流程

```
点击 [立即支付]
  ↓
后端生成订单 (唯一订单号)
  ↓
后端调用微信支付 API 获取 prepayId
  ↓
前端调用 wx.requestPayment() 显示支付弹窗
  ↓
用户输入微信支付密码
  ↓
微信支付成功 → 微信异步回调后端
  ↓
后端验证签名，更新订单状态为 "已支付"
  ↓
后端发送推送通知给用户
  ↓
前端显示 "支付成功" 页面
  ↓
进入订单详情页
```

### 订单编号规则

```
格式: ORD-YYYYMMDD-NNNNN

ORD: 订单前缀
YYYYMMDD: 订单日期 (20260415)
NNNNN: 该日期内的 5 位序列号 (00001-99999)

示例: ORD-20260415-00023
```

### 支付成功页面

```
┌──────────────────────────┐
│      支付成功 ✓            │
├──────────────────────────┤
│                          │
│  🎉 订单已确认           │
│                          │
│  订单号: ORD-20260415-001│
│  金额: ¥440              │
│  寄养时间: 2026-04-15   │
│  宠物: 小黑 (边牧)      │
│                          │
│  系统已向您的手机       │
│  (138****8000)         │
│  发送确认信息           │
│                          │
├──────────────────────────┤
│  [查看订单详情]          │
│  [返回首页]              │
└──────────────────────────┘
```

---

## 五、预订异常处理

### 库存不足处理
```
用户选择时间后，点击下一步
  ↓
系统检查库存
  ↓
库存不足
  ↓
提示: "该日期已满，请选择其他时间。
       也可加入等待列表，库存释放时我们会通知您。"
  ↓
提供日历建议: "最近可用时间: 2026-04-22"
  ↓
提供 [申请等待列表] 按钮
```

### 支付失败处理
```
支付超时或失败
  ↓
提示: "支付失败，请重试。"
  ↓
订单状态: "待支付" (仍保留)
  ↓
5 分钟内用户可重新支付
  ↓
5 分钟后自动释放库存，删除订单
```

### 宠物档案缺失处理
```
用户选择 "新建宠物档案"
  ↓
跳转到 MOD-001 (宠物档案编辑)
  ↓
用户完成基础信息 (必填)
  ↓
保存档案
  ↓
返回预订 Step 3
  ↓
新建档案自动选中
```

---

## 六、数据模型

### orders 表
```sql
CREATE TABLE orders (
  id CHAR(36) PRIMARY KEY,
  order_no VARCHAR(50) UNIQUE NOT NULL,
  user_id CHAR(36) NOT NULL,
  pet_id CHAR(36) NOT NULL,
  
  service_type ENUM('基础','标准','VIP'),
  price_per_day DECIMAL(10,2) NOT NULL,
  
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  total_days INT GENERATED ALWAYS AS (DATEDIFF(check_out_date, check_in_date)),
  
  base_amount DECIMAL(10,2) NOT NULL COMMENT '基础价格',
  membership_discount DECIMAL(10,2) DEFAULT 0,
  points_deduction DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL COMMENT '最终应付',
  actual_payment DECIMAL(10,2) COMMENT '实际支付',
  
  order_status ENUM('待支付','已支付','寄养中','已完成','已取消','退款中','已退款'),
  remark TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  cancelled_at TIMESTAMP NULL,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pet_id) REFERENCES pet_profiles(id),
  INDEX idx_user_id (user_id),
  INDEX idx_order_status (order_status),
  INDEX idx_check_in_date (check_in_date)
);
```

### order_capacity 表 (库存管理)
```sql
CREATE TABLE order_capacity (
  id CHAR(36) PRIMARY KEY,
  service_date DATE NOT NULL,
  service_type ENUM('基础','标准','VIP'),
  
  total_capacity INT COMMENT '该类型该日的总容量',
  booked_count INT DEFAULT 0 COMMENT '已预订数',
  available_count INT GENERATED ALWAYS AS (total_capacity - booked_count),
  
  is_open BOOLEAN DEFAULT TRUE COMMENT '该日期是否开放预订',
  notes TEXT COMMENT '特殊说明 如手术日关闭',
  
  UNIQUE KEY unique_date_type (service_date, service_type),
  INDEX idx_service_date (service_date)
);
```

### order_payments 表
```sql
CREATE TABLE order_payments (
  id CHAR(36) PRIMARY KEY,
  order_id CHAR(36) NOT NULL,
  
  amount DECIMAL(10,2),
  payment_method ENUM('微信','支付宝') DEFAULT '微信',
  transaction_id VARCHAR(100) UNIQUE COMMENT '微信交易号',
  
  payment_status ENUM('待支付','已支付','已关闭','已超时') DEFAULT '待支付',
  refund_status ENUM('无','退款中','部分退款','全额退款') DEFAULT '无',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP NULL,
  refunded_at TIMESTAMP NULL,
  
  FOREIGN KEY (order_id) REFERENCES orders(id),
  INDEX idx_order_id (order_id)
);
```

---

## 七、API 接口清单

### POST /api/v1/orders/check-availability
检查时间段可用性

```json
请求:
{
  "checkInDate": "2026-04-15",
  "checkOutDate": "2026-04-20",
  "serviceType": "标准"
}

响应:
{
  "code": 0,
  "data": {
    "available": true,
    "availableDates": [
      { "date": "2026-04-15", "available": true },
      { "date": "2026-04-16", "available": true },
      { "date": "2026-04-17", "available": false, "reason": "已满" },
      { "date": "2026-04-18", "available": true },
      { "date": "2026-04-19", "available": true }
    ],
    "suggestedDates": ["2026-04-22" ]
  }
}
```

### POST /api/v1/orders
创建订单

```json
请求:
{
  "petId": "uuid",
  "serviceType": "标准",
  "checkInDate": "2026-04-15",
  "checkOutDate": "2026-04-20",
  "pointsToUse": 100 (可选),
  "remark": "请多陪他玩"
}

响应:
{
  "code": 0,
  "data": {
    "orderId": "uuid",
    "orderNo": "ORD-20260415-001",
    "prepayId": "wx_prepay_id_xxx",
    "totalAmount": 440.00,
    "breakdown": {
      "baseAmount": 500.00,
      "membershipDiscount": -50.00,
      "pointsDeduction": -10.00
    }
  }
}
```

### GET /api/v1/orders/{orderId}
获取订单详情

```json
响应:
{
  "code": 0,
  "data": {
    "orderId": "uuid",
    "orderNo": "ORD-20260415-001",
    "petInfo": { ... },
    "serviceType": "标准",
    "checkInDate": "2026-04-15",
    "checkOutDate": "2026-04-20",
    "totalDays": 5,
    "totalAmount": 440.00,
    "orderStatus": "寄养中",
    "remark": "...",
    "createdAt": "2026-04-10T10:00:00Z"
  }
}
```

### PUT /api/v1/orders/{orderId}/cancel
取消订单

```json
请求:
{
  "reason": "时间不对"
}

响应 (成功):
{
  "code": 0,
  "message": "您的订单已取消，¥440 已退款到原支付账户"
}

响应 (失败):
{
  "code": 422,
  "message": "寄养已开始，无法自助取消，请联系客服"
}
```

### POST /api/v1/orders/{orderId}/prepay
获取支付参数

```json
请求: (POST 时传入)

响应:
{
  "code": 0,
  "data": {
    "appId": "微信应用ID",
    "prepayId": "wx_prepay_id",
    "nonceStr": "random_string",
    "timeStamp": "1234567890",
    "package": "prepay_id=xxx",
    "signType": "RSA",
    "paySign": "signature_xxx"
  }
}
```

---

## 八、价格计算引擎

### 计算公式

```python
def calculate_order_price(serviceType, days, membershipLevel, pointsToUse):
    # Step 1: 查询服务基础价格
    price_per_day = {
        '基础': 60,
        '标准': 100,
        'VIP': 150
    }[serviceType]
    
    # Step 2: 计算基础金额
    base_amount = price_per_day * days
    
    # Step 3: 计算会员折扣
    discount_rate = {
        '普通': 1.0,
        '银卡': 0.95,
        '金卡': 0.90,
        '钻石': 0.85
    }[membershipLevel]
    
    amount_after_discount = base_amount * discount_rate
    membership_discount = base_amount * (1 - discount_rate)
    
    # Step 4: 处理积分抵现
    points_deduction = min(pointsToUse, 用户当前积分) / 100 * 10  # 100分 = ¥10
    
    # Step 5: 最终金额
    total_amount = amount_after_discount - points_deduction
    
    return {
        'baseAmount': base_amount,
        'membershipDiscount': -membership_discount,
        'pointsDeduction': -points_deduction,
        'totalAmount': total_amount
    }
```

---

## 九、MVP 实现计划

### Week 1: 基础预订流程
- ✅ Step 1-4 页面静态设计
- ✅ orders 表设计
- ✅ 价格计算逻辑

### Week 2: 支付集成
- ✅ 微信支付 prepay
- ✅ 支付回调处理
- ✅ 订单状态更新

### Week 3: 库存管理
- ✅ order_capacity 表维护
- ✅ 库存检查逻辑
- ✅ 库存动态展示

### Week 4: 取消与退款
- ✅ 订单取消流程
- ✅ 库存释放
- ✅ 退款处理
