## ADDED Requirements

### Requirement: 微信小程序登录
系统 SHALL 支持微信小程序通过 wx.login() 获取的 code 换取用户标识完成登录。

#### Scenario: 成功登录（新用户首次访问）
- **WHEN** 前端调用 `/api/auth/wechat/miniprogram/login` 并提交 code `xxxxx`
- **THEN** 后端使用 code 调用微信 API `https://api.weixin.qq.com/sns/jscode2session` 获取 openid，创建新用户记录（openid = 获取的 openid），签发 JWT Token 返回

#### Scenario: 成功登录（老用户返回）
- **WHEN** 前端提交已注册用户的 code
- **THEN** 后端获取 openid，查找到已有用户，签发 JWT Token 返回

#### Scenario: 无效 code
- **WHEN** 前端提交无效或过期的 code
- **THEN** 系统返回错误码 `INVALID_WECHAT_CODE`，提示 "微信登录失败，请重试"

#### Scenario: 微信服务不可用
- **WHEN** 调用微信 API 超时或返回错误
- **THEN** 系统返回错误码 `WECHAT_API_ERROR`，提示 "微信服务暂时不可用"

### Requirement: 微信登录与手机号/邮箱账号关联
系统 SHALL 支持已通过手机号/邮箱注册的用户绑定微信 openid。

#### Scenario: 绑定微信 openid
- **WHEN** 已登录用户（手机号账号）调用 `/api/auth/wechat/bind` 并提交 code
- **THEN** 后端获取 openid，将用户的 openid 字段更新为此 openid，返回成功

#### Scenario: openid 已被其他账号绑定
- **WHEN** 用户尝试绑定一个已被其他账号使用的 openid
- **THEN** 系统返回错误码 `OPENID_ALREADY_BOUND`，提示 "该微信已被其他账号绑定"
