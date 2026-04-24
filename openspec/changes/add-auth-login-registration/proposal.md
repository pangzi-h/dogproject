## Why

当前后端仅有基础的用户信息查询接口（`/api/user/info`），缺少完整的认证系统。需要实现手机号/邮箱 + 验证码的注册登录方式，以及微信第三方登录，为前端 uni-app 小程序和 React Web 管理后台提供统一的认证能力。

## What Changes

**新增认证模块：**

- 手机号或邮箱 + 验证码注册（用户二选一，不强制同时提供）
- 验证码登录（通过 Redis 存储，5 分钟有效期）
- 微信小程序登录（`wx.login()` → code 换取 openid）
- Web 管理端微信扫码登录
- 可选密码绑定（登录后可设置密码，后续可选择密码登录）
- JWT Token 签发与刷新机制

**数据库变更：**

- 新增 `users` 表扩展字段（支持 phone/email/openid 等多方式识别）
- 新增 `verification_codes` 表（可选，若用 Redis 则无需此表）

**依赖变更：**

- 引入阿里云 SMS SDK（用于发送短信验证码）
- 引入阿里云邮件 SDK（用于发送邮件验证码）

## Capabilities

### New Capabilities

- `auth-sms-login`: 手机号 + 短信验证码登录注册
- `auth-email-login`: 邮箱 + 邮件验证码登录注册  
- `auth-wechat-miniprogram`: 微信小程序 code 换 openid 登录
- `auth-wechat-web`: Web 端微信扫码 OAuth2 登录
- `auth-password-bind`: 登录后可选择绑定密码
- `auth-jwt-token`: JWT Token 签发、验证与刷新

### Modified Capabilities

（无 - 新功能模块）

## Impact

- **后端**: 新增 `auth/` 包，包含 controller、service、provider、entity、dto
- **数据库**: users 表新增字段
- **配置**: 新增阿里云 SMS/Email 配置项
- **依赖**: pom.xml 新增 aliyun-java-sdk-core
