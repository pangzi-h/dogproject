## ADDED Requirements

### Requirement: Web 管理端微信扫码登录
系统 SHALL 支持 Web 管理端通过微信扫码 OAuth2 完成登录。

#### Scenario: 获取微信扫码登录二维码
- **WHEN** 前端访问 `/api/auth/wechat/web/qrcode`
- **THEN** 后端生成 state 参数（随机字符串），将 state + ticket 存入 Redis，返回二维码 URL（前端使用此 URL 展示扫码页面）

#### Scenario: 扫码成功（前端回调）
- **WHEN** 微信扫码后回调 `/api/auth/wechat/web/callback?code=xxx&state=yyy`
- **THEN** 后端校验 state 有效，使用 code 换取 openid，创建/查找用户，签发 JWT Token，重定向到管理后台并携带 token

#### Scenario: state 过期或无效
- **WHEN** 回调时 state 不存在或已过期
- **THEN** 系统返回错误码 `INVALID_STATE`，提示 "登录状态已过期，请重新扫码"

#### Scenario: 扫码后取消
- **WHEN** 用户扫描二维码但取消授权
- **THEN** 微信不会回调 code，前端轮询发现超时，显示 "扫码超时，请重试"

### Requirement: Web 端与小程序账号互通
系统 SHALL 支持同一 openid 的小程序用户和管理端用户使用同一账号。

#### Scenario: 小程序账号登录 Web
- **WHEN** 已有小程序账号（通过手机号注册并绑定 openid）的用户扫码登录 Web
- **THEN** 后端通过 openid 找到用户，签发 JWT Token，用户无需重新注册
