## 1. 基础框架搭建

- [x] 1.1 新增 `auth/` 包目录结构（controller, service, provider, entity, dto, config）
- [x] 1.2 pom.xml 新增 aliyun-java-sdk-core 依赖
- [x] 1.3 application.yml 新增阿里云 SMS/Email 配置项（accessKey, secret, signName）
- [x] 1.4 Spring Security 配置放行 `/api/auth/**` 接口
- [x] 1.5 User Entity 新增字段（phone, email, password, openid）

## 2. 验证码服务（VerificationService）

- [x] 2.1 RedisConfig 配置（RedisTemplate）
- [x] 2.2 VerificationService 实现：生成6位验证码，存入Redis，TTL=300秒
- [x] 2.3 验证码发送频率限制：同一手机号/邮箱60秒内只能发一次
- [x] 2.4 SmsProvider 接口定义及阿里云实现（开发模式打印日志）
- [x] 2.5 EmailProvider 接口定义及阿里云实现（开发模式打印日志）

## 3. 手机号登录（auth-sms-login）

- [ ] 3.1 SendSmsCodeController：`POST /api/auth/sms/send`
- [ ] 3.2 SmsLoginController：`POST /api/auth/sms/login`（注册或登录）
- [ ] 3.3 验证码校验通过后创建用户或返回已存在用户
- [ ] 3.4 签发 JWT Token

## 4. 邮箱登录（auth-email-login）

- [ ] 4.1 SendEmailCodeController：`POST /api/auth/email/send`
- [ ] 4.2 EmailLoginController：`POST /api/auth/email/login`
- [ ] 4.3 验证码校验通过后创建用户或返回已存在用户
- [ ] 4.4 签发 JWT Token

## 5. JWT Token 服务（auth-jwt-token）

- [ ] 5.1 JwtTokenProvider 扩展：支持 access_token 和 refresh_token
- [ ] 5.2 Redis 存储 Refresh Token（Key = `refresh_token:{userId}`）
- [ ] 5.3 Token 验证过滤器（JwtAuthenticationFilter）
- [ ] 5.4 刷新 Token 接口：`POST /api/auth/refresh`
- [ ] 5.5 登出接口：`POST /api/auth/logout`（删除 Redis Refresh Token）
- [ ] 5.6 Token 过期/无效/缺失的错误处理

## 6. 密码绑定（auth-password-bind）

- [ ] 6.1 密码绑定接口：`POST /api/auth/password/bind`
- [ ] 6.2 密码 BCrypt 加密存储
- [ ] 6.3 密码强度校验（至少8位，包含字母和数字）
- [ ] 6.4 密码登录接口：`POST /api/auth/password/login`
- [ ] 6.5 修改密码接口：`POST /api/auth/password/change`

## 7. 微信小程序登录（auth-wechat-miniprogram）

- [ ] 7.1 WeChatConfig 配置（appId, appSecret）
- [ ] 7.2 WeChatService 实现：code 换取 openid
- [ ] 7.3 微信登录接口：`POST /api/auth/wechat/miniprogram/login`
- [ ] 7.4 绑定微信 openid 接口：`POST /api/auth/wechat/bind`

## 8. Web 端微信扫码登录（auth-wechat-web）

- [ ] 8.1 获取二维码接口：`GET /api/auth/wechat/web/qrcode`
- [ ] 8.2 微信回调接口：`GET /api/auth/wechat/web/callback`
- [ ] 8.3 state 参数生成与校验（防 CSRF）
- [ ] 8.4 回调后重定向到管理后台并携带 token

## 9. 集成测试

- [ ] 9.1 手机号验证码发送/登录流程测试
- [ ] 9.2 邮箱验证码发送/登录流程测试
- [ ] 9.3 微信小程序登录测试
- [ ] 9.4 密码绑定/登录/修改测试
- [ ] 9.5 JWT Token 刷新/失效测试
- [ ] 9.6 Spring Security 保护接口测试
