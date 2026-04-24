## ADDED Requirements

### Requirement: JWT Token 签发
系统 SHALL 支持签发 JWT Token，包含 access_token 和 refresh_token。

#### Scenario: Access Token 结构
- **WHEN** 系统签发 Access Token 时
- **THEN** Token Payload 包含 `{ sub: userId, type: "access", exp: (now+1hour), iat: now }`，使用 HMAC256 签名

#### Scenario: Refresh Token 结构
- **WHEN** 系统签发 Refresh Token 时
- **THEN** Token Payload 包含 `{ sub: userId, type: "refresh", exp: (now+7days), iat: now }`，存入 Redis（Key = `refresh_token:{userId}`）

### Requirement: JWT Token 验证
系统 SHALL 支持验证请求中的 JWT Token。

#### Scenario: 有效 Token 请求
- **WHEN** 请求头携带 `Authorization: Bearer <access_token>` 时
- **THEN** 系统验证 Token 签名和过期时间，通过后提取 userId 设置到 SecurityContext，允许请求继续

#### Scenario: Token 过期
- **WHEN** 请求携带过期 Token
- **THEN** 系统返回错误码 `TOKEN_EXPIRED`，提示 "登录已过期，请刷新 Token"

#### Scenario: 无效 Token
- **WHEN** 请求携带伪造或格式错误的 Token
- **THEN** 系统返回错误码 `INVALID_TOKEN`，提示 "无效的登录凭证"

#### Scenario: 无 Token 请求受保护接口
- **WHEN** 请求未携带 Token 访问受保护接口
- **THEN** 系统返回错误码 `UNAUTHORIZED`，提示 "请先登录"

### Requirement: Refresh Token 刷新
系统 SHALL 支持使用 Refresh Token 获取新的 Access Token。

#### Scenario: 成功刷新 Token
- **WHEN** 用户调用 `/api/auth/refresh` 提交有效 Refresh Token
- **THEN** 系统验证 Refresh Token 有效且在 Redis 中存在，签发新的 Access Token 和新的 Refresh Token（Token Rotation），删除旧 Refresh Token

#### Scenario: Refresh Token 已使用
- **WHEN** 用户使用已过期的 Refresh Token（不在 Redis 中）
- **THEN** 系统返回错误码 `INVALID_REFRESH_TOKEN`，提示 "登录已过期，请重新登录"

#### Scenario: Refresh Token 被盗用（Replay）
- **WHEN** 攻击者尝试重放已使用的 Refresh Token
- **THEN** Token 已失效（Redis 中已删除），返回 INVALID_REFRESH_TOKEN；原持有者的 Token 也会失效，需要重新登录

### Requirement: 登出
系统 SHALL 支持用户主动登出，失效当前 Refresh Token。

#### Scenario: 成功登出
- **WHEN** 已登录用户调用 `/api/auth/logout`
- **THEN** 系统从 Redis 中删除用户的 Refresh Token，用户需要重新登录获取新 Token

### Requirement: Spring Security 配置
系统 SHALL 配置 Spring Security 放行登录相关接口，保护其他 API。

#### Scenario: 放行接口
- **WHEN** 请求以下接口时
  - `/api/auth/**`（所有认证接口）
  - `/health`
- **THEN** Spring Security 跳过认证检查

#### Scenario: 保护接口
- **WHEN** 请求其他 API（如 `/api/user/**`）时
- **THEN** 必须携带有效 JWT Token
