# PRD: 用户认证与档案管理模块

**模块编号**: MOD-001  
**优先级**: P0 (核心)  
**所属版本**: MVP v1.0  
**最后更新**: 2026-03-26

---

## 一、模块概述

### 业务背景
- 用户需要便捷地注册登录，减少身份信息填写
- 宠物档案是寄养预订的基础，包含健康信息、行为信息等敏感数据

### 竞品对标分析

| 竞品 | 登录方式 | 档案管理 | 差异与机会 |
|------|---------|---------|----------|
| **58宠物** | 手机号码登录 | 基础档案(品种/体重) | 没有健康详情，用户信任度低 |
| **宠那么萌** | 微信/微博登录 | 档案+医疗记录 | 医疗记录大而全，UX复杂 |
| **宠幸** | 微信一键登录 | 简化档案 | 功能完整但缺乏运营价值 |
| **我们的优势** | 微信授权+手机绑定 | 精简+医疗档案 | **垂直专业**：针对中大型犬的专业字段 |

### 核心差异化
1. **微信 + 手机双认证** - 兼顾便捷性和信任
2. **宠物档案包含专业字段** - 疫苗、过敏、行为特征、训练记录
3. **档案多版本支持** - 用户可维护多个宠物档案，每次预订灵活选择

---

## 二、用户故事与场景

### 用户故事 1: 新用户快速注册
```
作为一个首次使用小程序的宠物主人
我想通过微信授权快速注册账户
这样可以快速进入预订流程，不用填写太多信息

验收标准:
✓ 一键微信登录成功进入首页
✓ 首次注册自动生成昵称和头像
✓ 可选：手机号绑定用于通知接收
✓ 注册耗时 < 3 秒
```

### 用户故事 2: 管理多个宠物档案
```
作为一个拥有多只宠物的用户
我想可以在小程序内为不同宠物创建档案
这样预订时可以快速选择对应的宠物，不用重复填写

验收标准:
✓ 可创建多个宠物档案
✓ 每个档案独立保存编辑
✓ 档案支持图片上传（宠物照片）
✓ 列表展示时展示宠物头像方便识别
```

### 用户故事 3: 记录宠物健康信息
```
作为一个关心宠物健康的家长
我想在微信小程序上记录我的宠物疫苗、过敏等信息
这样每次寄养时，我可以放心地告诉寄养人员相关禁忌

验收标准:
✓ 记录疫苗接种时间和有效期
✓ 记录过敏物质列表
✓ 记录常用药物和用法
✓ 记录健康检查查询医院建议
✓ 这些信息自动出现在预订界面供寄养人确认
```

### 用户故事 4: 快速修改个人信息
```
作为一个已注册用户
我想快速编辑个人资料（昵称、头像、手机号等）
以及宠物档案（健康信息更新）

验收标准:
✓ 个人档案编辑页简洁直观
✓ 宠物档案编辑页字段清晰
✓ 保存成功有提示
✓ 修改实时生效，不用刷新
```

---

## 三、功能需求

### 3.1 微信授权登录 (Authentication)

#### 流程图
```
启动小程序
  ↓
检查本地是否有 token
  ├─ 有 token
  │   ├─ 验证 token 有效性
  │   ├─ 有效 → 进入首页
  │   └─ 过期 → 刷新 token
  │
  └─ 无 token
      ↓
    展示登录按钮
      ↓
    用户点击"微信授权登录"
      ↓
    调用 wx.login 获取 code
      ↓
    后端验证 code → 换取 openid
      ↓
    后端检查用户是否存在
      ├─ 存在 → 生成 JWT token 返回
      └─ 不存在 → 创建新用户 → 生成 JWT token 返回
      ↓
    前端存储 token (localStorage)
      ↓
    进入首页 / 欢迎页
```

#### 技术细节
- **微信授权 scope**: `snsapi_userinfo` (获取用户昵称、头像)
- **Token 类型**: JWT (有效期 7 天)
- **刷新机制**: 前端在 token 过期前自动调用刷新接口
- **注销处理**: 清除本地 token 和用户信息缓存

### 3.2 手机号绑定 (Phone Binding)

#### 需求说明
- 用户可选择绑定手机号，用于接收订单通知和反馈提醒
- 首次预订时会引导绑定手机号

#### 流程
```
1. 用户进入"我的-账户设置"
2. 点击"绑定手机号"
3. 小程序调用 `<button open-type="getPhoneNumber">` 获取用户授权
4. 用户确认授权
5. 小程序获得加密的手机号
6. 前端将加密手机号发送给后端
7. 后端解密 + 验证 + 存储
8. 绑定成功通知用户
```

#### 数据安全
- 微信 getPhoneNumber 获得的是加密数据，只有后端能解密
- 后端使用微信提供的密钥解密
- 手机号单独加密存储在数据库中

### 3.3 个人档案管理 (User Profile)

#### 页面结构
```
我的账户
  ├─ 头像 (来自微信授权)
  ├─ 昵称 (可编辑)
  ├─ 手机号 (绑定状态)
  ├─ 加入时间 (展示)
  └─ 编辑档案 (按钮)
```

#### 编辑功能
```
编辑个人档案页面:
  - 昵称输入框 (max 20字符)
  - 头像选择器 (可重新上传)
  - 手机号显示 + 修改按钮
  - 保存按钮

验证规则:
  ✓ 昵称不能为空
  ✓ 昵称不能包含特殊符号
  ✓ 手机号格式 11 位数字
```

### 3.4 宠物档案管理 (Pet Profile)

#### 数据结构

**基础信息**
```
宠物名称 (Required, max 20字符)
品种 (Required, Enum: 边牧/泰迪/金毛/拉布拉多/柯基/其他)
性别 (Required, Enum: 公/母)
出生日期 (Required, 用于自动计算年龄)
体重 (Optional, 单位 kg, 精确到0.1)
毛色 (Optional, 自由文本)
宠物照片 (Optional, 单张上传到 OSS)
```

**健康信息**
```
疫苗记录 (多条, 包含: 疫苗类型/接种时间/有效期)
  - 格式: 疫苗类型 (狂犬/五联/六联等) | 接种日期 | 有效期
  - 支持多条记录

过敏物质 (多选, 常见项: 鸡肉/羊肉/谷物/乳制品等)
  - 允许自定义添加

常用药物 (多条, 包含: 药物名称/用途/用法/备注)
  - 例: 益生菌 | 肠胃健康 | 每餐1勺 | 拌在早餐里

健康状况 (自由文本, max 200字符)
  - 例: 肠胃敏感, 遛狗后容易疲劳
```

**行为信息**
```
性格特征 (多选 Checkbox)
  ☐ 活泼好动
  ☐ 温和友善
  ☐ 胆小内向
  ☐ 容易紧张
  ☐ 好奇心强
  ☐ 独立

与陌生人相处 (Single select)
  ○ 非常友好
  ○ 一般友好
  ○ 需要时间适应
  ○ 不喜欢陌生人

关键行为笔记 (自由文本, max 500字符)
  例: "容易分离焦虑，需要逐步引导"

训练情况 (自由文本, max 300字符)
  例: "会坐、趴、来、握手，会简单的指令"

禁忌与特殊需求 (自由文本, max 300字符)
  例: "不能单独留在陌生环境，怕洗澡，喜欢在箱子里睡觉"
```

#### 页面流程

**宠物档案列表页**
```
我的宠物
  ┌─────────────────┐
  │ [宠物照片]      │
  │ 小黑 | 边牧     │
  │ 3岁 | 28.5kg    │
  │ [编辑] [删除]    │
  └─────────────────┘
  
  ┌─────────────────┐
  │ [宠物照片]      │
  │ 糖糖 | 泰迪     │
  │ 1岁 | 5kg       │
  │ [编辑] [删除]    │
  └─────────────────┘
  
  [+ 新增宠物档案]
```

**宠物档案编辑页 (4 个 Tab)**

Tab 1: 基础信息
```
宠物名称 [输入框] *必填
品种 [下拉选择] *必填
性别 [单选] 公/母 *必填
出生日期 [日期选择器] *必填
体重(kg) [输入框]
毛色 [输入框]
[上传宠物照片] [当前照片预览]
```

Tab 2: 健康信息
```
疫苗接种记录
  [+ 新增疫苗记录]
  - 疫苗类型: [文本]
    接种日期: [日期选择器]
    有效期: [日期选择器]
    [删除]

过敏物质
  ☐ 鸡肉 ☐ 羊肉 ☐ 谷物 ☐ 乳制品
  ☐ 鸡蛋 ☐ 大豆 ... [其他]

常用药物
  [+ 新增药物]
  - 药物名称: [文本]
    用途: [文本]
    用法: [文本]
    备注: [文本]
    [删除]

健康状况备注
  [大文本框] max 200 字
```

Tab 3: 行为信息
```
性格特征 (多选)
  ☐ 活泼好动 ☐ 温和友善 ☐ 胆小内向
  ☐ 容易紧张 ☐ 好奇心强 ☐ 独立

与陌生人相处
  ○ 非常友好 ○ 一般 ○ 需要适应 ○ 不喜欢

关键行为笔记
  [大文本框] max 500 字

训练情况
  [大文本框] max 300 字

禁忌与特殊需求
  [大文本框] max 300 字
```

Tab 4: 完成
```
档案总结预览
  - 基础信息完整性: ✓ 100%
  - 健康信息完整性: 60%
  - 行为信息完整性: 80%

[保存档案] [取消]
```

#### 删除流程
```
点击删除
  ↓
确认弹窗: "确定删除此宠物档案？已有的相关订单记录将保留。"
  ↓
用户确认
  ↓
后端标记为已删除 (逻辑删除，保留历史订单数据)
  ↓
列表删除该宠物卡片
```

---

## 四、交互设计细节

### 4.1 登录页面
```
┌──────────────────────────┐
│      微信小程序           │
│    (顶部状态栏)          │
├──────────────────────────┤
│                          │
│    🐕 边牧寄养           │
│    专业宠物寄养平台      │
│                          │
│  ┌────────────────────┐ │
│  │ 微信授权快速登录    │ │
│  │ (按钮)             │ │
│  └────────────────────┘ │
│                          │
│  用户名/密码登录(可选)   │
│                          │
├──────────────────────────┤
│ 阅读《服务条款》         │ ← 可点击
│ 同意《隐私政策》         │ ← 可点击
└──────────────────────────┘
```

### 4.2 个人中心布局
```
┌──────────────────────────┐
│   个人中心                │
├──────────────────────────┤
│  ┌─── 用户卡片 ────────┐ │
│  │ [头像] 昵称         │ │
│  │ 手机号已绑定 ✓      │ │
│  │ [编辑资料]          │ │
│  └─────────────────────┘ │
├──────────────────────────┤
│  📋 我的订单             │
│  💳 会员卡               │
│  ⭐ 积分账户             │
│  📝 宠物档案             │
│  🔔 通知设置             │
│  ❓ 帮助中心             │
│  ⚙️ 关于我们             │
├──────────────────────────┤
│  [退出登录]              │
└──────────────────────────┘
```

---

## 五、数据模型

### users 表
```sql
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  openid VARCHAR(100) UNIQUE NOT NULL COMMENT '微信唯一ID',
  phone VARCHAR(20) UNIQUE COMMENT '绑定手机号',
  nickname VARCHAR(50) COMMENT '用户昵称',
  avatar_url VARCHAR(500) COMMENT '头像 URL',
  membership_level ENUM('普通','银卡','金卡','钻石') DEFAULT '普通',
  total_points INT DEFAULT 0,
  status ENUM('active','inactive','banned') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL COMMENT '软删除',
  INDEX idx_openid (openid),
  INDEX idx_phone (phone),
  INDEX idx_status (status)
);
```

### pet_profiles 表
```sql
CREATE TABLE pet_profiles (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  
  -- 基础信息
  name VARCHAR(50) NOT NULL,
  breed VARCHAR(50),
  gender ENUM('公','母'),
  birth_date DATE,
  weight_kg DECIMAL(5,2),
  fur_color VARCHAR(50),
  avatar_url VARCHAR(500),
  
  -- 健康信息
  allergies JSON COMMENT '过敏物质列表 ["鸡肉", "谷物"]',
  health_notes TEXT COMMENT '健康状况备注',
  
  -- 行为信息
  personality JSON COMMENT '性格特征 ["活泼好动", "温和友善"]',
  stranger_attitude ENUM('非常友好','一般','需要时间适应','不喜欢'),
  behavior_notes TEXT COMMENT '行为笔记',
  training_status TEXT COMMENT '训练情况',
  special_needs TEXT COMMENT '禁忌与特殊需求',
  
  -- 元数据
  is_primary BOOLEAN DEFAULT FALSE COMMENT '是否主档案',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP NULL COMMENT '软删除',
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_is_primary (is_primary)
);
```

### vaccine_records 表
```sql
CREATE TABLE vaccine_records (
  id CHAR(36) PRIMARY KEY,
  pet_id CHAR(36) NOT NULL,
  vaccine_type VARCHAR(50) COMMENT '疫苗类型 如:狂犬/五联',
  vaccination_date DATE NOT NULL,
  expiry_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pet_profiles(id) ON DELETE CASCADE,
  INDEX idx_pet_id (pet_id)
);
```

### medicine_records 表
```sql
CREATE TABLE medicine_records (
  id CHAR(36) PRIMARY KEY,
  pet_id CHAR(36) NOT NULL,
  medicine_name VARCHAR(100) NOT NULL,
  purpose VARCHAR(100),
  usage TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pet_profiles(id) ON DELETE CASCADE,
  INDEX idx_pet_id (pet_id)
);
```

---

## 六、API 接口清单

### 6.1 认证相关

#### POST /api/v1/auth/login
微信授权登录

```json
请求:
{
  "code": "string",        // wx.login 返回的 code
  "rawData": "string",     // 用户信息返回的 rawData
  "signature": "string"    // 数据签名
}

响应 (成功):
{
  "code": 0,
  "message": "success",
  "data": {
    "token": "eyJhbGc...",     // JWT token
    "userId": "uuid",
    "userInfo": {
      "nickname": "小王",
      "avatar": "https://...",
      "membershipLevel": "普通"
    }
  }
}

响应 (失败):
{
  "code": 401,
  "message": "微信授权失败",
  "error": "invalid_code"
}
```

#### POST /api/v1/auth/refresh-token
刷新 token

```json
请求:
{
  "token": "string"  // 过期或即将过期的 token
}

响应:
{
  "code": 0,
  "data": {
    "token": "new_jwt_token"
  }
}
```

#### POST /api/v1/auth/logout
注销登录

```json
响应:
{
  "code": 0,
  "message": "logout success"
}
```

### 6.2 用户档案 API

#### GET /api/v1/users/profile
获取用户档案

```json
响应:
{
  "code": 0,
  "data": {
    "userId": "uuid",
    "nickname": "小王",
    "avatar": "https://...",
    "phone": "13800138000",
    "phoneVerified": true,
    "membershipLevel": "金卡",
    "createdAt": "2026-03-20T10:00:00Z"
  }
}
```

#### PUT /api/v1/users/profile
编辑用户档案

```json
请求:
{
  "nickname": "新昵称",
  "avatar": "base64_image_data | url"
}

响应:
{
  "code": 0,
  "message": "更新成功"
}
```

#### POST /api/v1/users/bind-phone
绑定手机号

```json
请求:
{
  "encryptedData": "string",    // 微信加密数据
  "iv": "string"                // 初始化向量
}

响应:
{
  "code": 0,
  "message": "绑定成功",
  "data": {
    "phone": "138****8000"  // 脱敏显示
  }
}
```

### 6.3 宠物档案 API

#### GET /api/v1/pets
获取宠物档案列表

```json
请求:
Query 参数:
  - includeDeleted: boolean (default: false)

响应:
{
  "code": 0,
  "data": [
    {
      "id": "uuid",
      "name": "小黑",
      "breed": "边牧",
      "gender": "公",
      "age": 3,
      "weight": 28.5,
      "avatar": "https://...",
      "allergies": ["鸡肉"],
      "isPrimary": true
    }
  ]
}
```

#### POST /api/v1/pets
创建宠物档案

```json
请求:
{
  "name": "小黑",
  "breed": "边牧",
  "gender": "公",
  "birthDate": "2023-03-20",
  "weight": 28.5,
  "furColor": "黑白",
  "avatar": "base64_or_url",
  "allergies": ["鸡肉"],
  "healthNotes": "肠胃敏感",
  "personality": ["活泼好动"],
  "strangerAttitude": "非常友好",
  "behaviorNotes": "...",
  "trainingStatus": "...",
  "specialNeeds": "..."
}

响应:
{
  "code": 0,
  "data": {
    "petId": "new_uuid",
    "message": "创建成功"
  }
}
```

#### GET /api/v1/pets/{petId}
获取宠物档案详情

```json
响应:
{
  "code": 0,
  "data": {
    "id": "uuid",
    "name": "小黑",
    "breed": "边牧",
    ... (所有字段),
    "vaccines": [
      {
        "id": "uuid",
        "type": "狂犬",
        "vaccinationDate": "2025-03-20",
        "expiryDate": "2026-03-20"
      }
    ],
    "medicines": [
      {
        "id": "uuid",
        "name": "益生菌",
        "purpose": "肠胃健康",
        "usage": "每餐1勺"
      }
    ]
  }
}
```

#### PUT /api/v1/pets/{petId}
编辑宠物档案

```json
请求: 同 POST (可选字段)

响应:
{
  "code": 0,
  "message": "更新成功"
}
```

#### DELETE /api/v1/pets/{petId}
删除宠物档案

```json
响应:
{
  "code": 0,
  "message": "删除成功"
}
```

### 6.4 疫苗记录 API

#### POST /api/v1/pets/{petId}/vaccines
添加疫苗记录

```json
请求:
{
  "vaccineType": "狂犬",
  "vaccinationDate": "2025-03-20",
  "expiryDate": "2026-03-20"
}

响应:
{
  "code": 0,
  "data": { "vaccineId": "uuid" }
}
```

#### DELETE /api/v1/pets/{petId}/vaccines/{vaccineId}
删除疫苗记录

```json
响应:
{
  "code": 0,
  "message": "删除成功"
}
```

### 6.5 药物记录 API

#### POST /api/v1/pets/{petId}/medicines
添加药物记录

```json
请求:
{
  "medicineName": "益生菌",
  "purpose": "肠胃健康",
  "usage": "每餐1勺",
  "notes": "拌在早餐里"
}

响应:
{
  "code": 0,
  "data": { "medicineId": "uuid" }
}
```

#### DELETE /api/v1/pets/{petId}/medicines/{medicineId}
删除药物记录

```json
响应:
{
  "code": 0,
  "message": "删除成功"
}
```

---

## 七、错误处理与校验

### 前端校验规则
```
昵称:
  - 长度: 1-20 字符
  - 不允许: 特殊符号, 仅数字
  - 提示: "昵称只支持中文、字母、数字"

手机号:
  - 格式: 11 位数字, 首位 1
  - 校验: 使用正则 /^1[3-9]\d{9}$/
  - 提示: "请输入有效的手机号"

宠物名称:
  - 长度: 1-20 字符
  - 允许: 中文, 英文, 数字, 部分符号(如 - _)
  
出生日期:
  - 不能早于 1900 年
  - 不能晚于今天
  - 提示: "请选择有效的出生日期"

体重:
  - 范围: 1-100 kg
  - 精度: 0.1 kg
  - 提示: "请输入 1-100 kg 之间的体重"
```

### 后端响应错误码
```
401: 未授权 (token 过期、无效)
403: 禁止访问 (用户被封禁)
404: 宠物档案不存在
409: 昵称重复 (可选)
422: 数据验证失败
500: 服务器错误
```

---

## 八、性能与安全指标

### 性能要求
```
登录页面加载: < 1 秒
档案页面加载: < 1.5 秒
档案编辑保存: < 2 秒
图片上传: < 3 秒 (≤ 5MB)
```

### 安全要求
```
✓ 所有密码操作使用 HTTPS
✓ 手机号加密存储
✓ 微信授权 code 一次性使用
✓ JWT token 签名验证
✓ 输入数据 XSS 防护
✓ SQL 注入防护 (参数化查询)
✓ 宠物照片 virus scan (OSS 服务端)
```

---

## 九、数据隐私

### 用户数据
- 微信 openid: 永久保存，用于账户识别
- 手机号: 加密存储，仅用于通知发送
- 头像/昵称: 明文存储，用于展示
- 档案数据: 明文存储，用户专属

### 数据删除政策
```
用户主动删除宠物档案:
  → 标记为 deleted_at (逻辑删除)
  → 历史订单仍可查看但不可修改
  → 用户恢复档案: 联系客服处理

用户注销账户:
  → 所有数据标记为已删除
  → 保留 3 年后物理删除
```

---

## 十、MVP 实现优先级

### Phase 1 (Week 1)
- ✅ 微信授权登录
- ✅ 用户档案 CRUD
- ✅ 第一个宠物档案创建

### Phase 1.5 (Week 2)
- ✅ 多宠物档案支持
- ✅ 疫苗/药物记录
- ✅ 手机号绑定

### Phase 2 (Week 3+)
- □ 宠物照片上传到 OSS
- □ 档案分享功能
- □ 档案模板库 (快速创建)
