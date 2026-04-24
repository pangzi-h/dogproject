## ADDED Requirements

### Requirement: 绑定密码
系统 SHALL 支持已登录用户绑定或修改密码，密码使用 BCrypt 加密存储。

#### Scenario: 成功绑定密码
- **WHEN** 已登录用户调用 `/api/auth/password/bind` 提交新密码 `Password123`
- **THEN** 系统将密码使用 BCrypt 加密后存入用户的 password 字段，返回成功

#### Scenario: 密码强度不足
- **WHEN** 用户提交弱密码（如 `123456`）
- **THEN** 系统返回错误码 `WEAK_PASSWORD`，提示 "密码长度至少 8 位，需包含字母和数字"

#### Scenario: 未登录用户绑定密码
- **WHEN** 未登录用户调用 `/api/auth/password/bind`
- **THEN** 系统返回错误码 `UNAUTHORIZED`，提示 "请先登录"

### Requirement: 密码登录
系统 SHALL 支持已绑定密码的用户使用手机号/邮箱 + 密码登录。

#### Scenario: 手机号 + 密码登录
- **WHEN** 用户提交手机号 `13800138000` 和密码 `Password123`
- **THEN** 系统验证通过，签发 JWT Token 返回

#### Scenario: 邮箱 + 密码登录
- **WHEN** 用户提交邮箱 `user@example.com` 和密码 `Password123`
- **THEN** 系统验证通过，签发 JWT Token 返回

#### Scenario: 密码错误
- **WHEN** 用户提交正确账号但错误密码
- **THEN** 系统返回错误码 `INVALID_PASSWORD`，提示 "密码错误"

#### Scenario: 账号未绑定密码
- **WHEN** 用户尝试使用未绑定密码的账号进行密码登录
- **THEN** 系统返回错误码 `PASSWORD_NOT_SET`，提示 "该账号尚未设置密码，请使用验证码登录"

### Requirement: 修改密码
系统 SHALL 支持已登录用户修改密码。

#### Scenario: 成功修改密码
- **WHEN** 已登录用户调用 `/api/auth/password/change` 提交当前密码和新密码
- **THEN** 系统验证当前密码正确后，将新密码 BCrypt 加密存储，返回成功

#### Scenario: 当前密码错误
- **WHEN** 用户提交错误的当前密码
- **THEN** 系统返回错误码 `INVALID_CURRENT_PASSWORD`，提示 "当前密码错误"
