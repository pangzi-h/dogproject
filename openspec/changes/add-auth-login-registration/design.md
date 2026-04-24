## Context

当前后端仅有基础的用户信息查询接口（`/api/user/info`），缺少完整的认证系统。现有技术栈：

- Spring Boot 2.7.14 (Java 11)
- Spring Security（已引入但未配置）
- MySQL + JPA
- Redis (Jedis 4.3.2)
- JWT (auth0 java-jwt 3.19.4)
- 阿里云 SDK（待引入）

需要为 uni-app 小程序和 React Web 管理后台提供统一认证能力。

## Goals / Non-Goals

**Goals:**
- 实现手机号或邮箱 + 验证码的注册/登录
- 实现微信小程序登录（code 换 openid）
- 实现 Web 端微信扫码登录
- 支持可选密码绑定
- JWT Token 签发与验证
- 验证码存储在 Redis，5 分钟有效期

**Non-Goals:**
- 不实现微信支付（属于支付模块）
- 不实现多端同时登录管理
- 不实现复杂的权限 RBAC（后续 auth 模块扩展）

## Decisions

### 1. 分层架构：Controller → Service → Provider

```
Controller    →  AuthController (HTTP 请求/响应)
                  ↓
Service      →  AuthService (业务编排)
                  ↓
         ┌──────┴──────┐
         ↓             ↓
VerificationService  WeChatService
(验证码发送/校验)    (微信 API 调用)
         ↓
  ┌──────┴──────┐
  ↓             ↓
SmsProvider  EmailProvider
(阿里云 SMS)  (阿里云 Email)
         ↓
  Redis (验证码存储) / MySQL (用户数据)
```

**为什么：**
- Controller 只负责 HTTP 层，职责单一
- Service 处理业务编排，事务管理
- Provider 封装外部调用（如阿里云），便于替换实现

**替代方案：**
- All-in-Controller：简单但难以测试，职责混淆
- 策略模式：过度设计，只有 3 种登录方式不需要

### 2. 验证码存储：Redis 而非数据库

**决定：**
验证码存储在 Redis，Key = `verify:{phone|email}:{type}`，TTL = 300 秒（5分钟）。

**为什么：**
- Redis 已在技术栈中
- 自动过期，无需清理任务
- 读取速度快

**替代方案：**
- MySQL `verification_codes` 表：多一张表，但便于审计查询
- 当前阶段不需要审计，先用 Redis

### 3. 微信登录：UnionID vs OpenID

**决定：**
微信小程序使用 OpenID，Web 管理端使用 OAuth2 + OpenID。

**为什么：**
- 同一主体下小程序和公众号的 OpenID 不同，需要 UnionID 才能跨平台识别用户
- 但目前只有小程序，UnionID 暂不需处理
- Web 端使用微信开放平台 OAuth2，需要已备案域名和认证服务号

### 4. JWT Token 结构

**决定：**
Token Payload: `{ sub: userId, type: "access"|"refresh", exp, iat }`

- Access Token：有效期 1 小时
- Refresh Token：有效期 7 天，存储在 Redis

**为什么：**
- 短期 Access Token 降低泄露风险
- Refresh Token 存 Redis 可实现主动失效（登出时删除）

### 5. 阿里云 SMS/Email SDK

**决定：**
使用阿里云 Java SDK 发送短信和邮件。

**为什么：**
- pom.xml 已声明 aliyun-java-sdk-core（quickstart 参考）
- 国内服务首选阿里云
- 实际发送逻辑先打印日志（开发模式），正式环境配置密钥

## Risks / Trade-offs

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 阿里云 SDK 短信/邮件发送失败 | 用户收不到验证码 | 开发环境打印验证码到日志；生产环境重试 + 告警 |
| Redis 不可用 | 验证码无法存储/校验 | 降级：临时存储在 JVM 内存（仅开发模式） |
| 微信 code 只能使用一次 | 重复使用会失败 | 前端每次登录调用 wx.login 获取新 code |
| 邮件验证码易被拦截 | 安全性低于短信 | 生产环境使用 SPF/DKIM 提升邮件可信度 |

## Migration Plan

**Phase 1: 基础框架**
1. 新增 `auth/` 包结构
2. 配置 Spring Security 放行登录相关接口
3. 实现 User Entity 扩展字段

**Phase 2: 手机号/邮箱登录**
1. 实现 VerificationService + Redis
2. 实现 SmsProvider / EmailProvider（先打日志）
3. 实现 AuthService 手机号/邮箱登录

**Phase 3: 微信登录**
1. 实现 WeChatService 小程序登录
2. 实现 Web 端微信 OAuth2 登录

**Phase 4: 密码绑定 + Token 刷新**
1. 实现密码绑定功能
2. 实现 Refresh Token 机制

**回滚：**
- 使用 Git 回滚代码
- 数据库字段可保留（加 `_deprecated` 标记）

## Open Questions

1. **Web 管理端是否需要单独的登录入口？** 还是与小程序共用一套用户体系？
2. **验证码频率限制？** 同一手机号/邮箱 60 秒内只能发一次（建议）
3. **是否需要图形验证码防刷？** 当前阶段先不加，后续可扩展
