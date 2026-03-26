# 快速开始指南 - 框架搭建

**目标**: 从零快速启动后端和前端框架  
**时长**: ~15 分钟 (框架初始化) + 2-3 天 (完整搭建)

---

## 第一步：获取项目结构

### 后端 (Spring Boot 单体应用)

```bash
# 1. 创建项目根目录
mkdir -p ~/projects/pet-boarding-backend
cd ~/projects/pet-boarding-backend

# 2. 创建标准 Maven 项目结构
mkdir -p src/main/java src/main/resources src/test/java src/test/resources
mkdir -p src/main/java/com/petboarding/{common,user,order,payment,feedback,points,service,shop}/{entity,repository,service,controller,dto}
mkdir -p sql docs docker

# 3. 编写根 pom.xml (参考 QUICKSTART 末尾的模板)
# 将 pom.xml 内容复制到 ./pom.xml

# 4. 编写 Spring Boot 主配置文件
# 参考 application.yml 和 application-dev.yml 模板

# 5. 启动本地开发环境
docker-compose up -d

# 6. 初始化数据库
mysql -u root -p < sql/000-init-database.sql
mysql -u root -p < sql/001-init-tables.sql

# 7. 构建项目
mvn clean install

# 8. 启动应用
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

### 前端 (uni-app)

```bash
# 1. 创建项目
cd ~/projects
npx @dcloudio/uniapp-cli create pet-boarding-frontend

# 2. 进入项目目录
cd pet-boarding-frontend

# 3. 安装依赖
npm install

# 4. 启动开发服务器 (微信小程序预览)
npm run dev:mp-weixin

# 5. 导入微信开发者工具
# - 打开微信开发者工具
# - 选择"导入项目"
# - 选择刚刚创建的项目根目录
# - 预览应该显示 uni-app 默认页面
```

---

## 第二步：后端框架基础搭建次序

### Day 1: 项目结构和 Spring Boot 配置

| 任务 ID | 任务 | 预计时间 | 并行 |
|--------|------|---------|------|
| T001-T005 | 创建 Maven 项目和目录结构 | 30 分钟 | - |
| T006-T010 | 编写 Spring Boot 主框架 (pom.xml + 配置文件) | 1 小时 | - |
| T023-T025 | 编写数据库初始化脚本 | 1 小时 | - |

**Day 1 总计**: 2.5 小时

### Day 2: 7 个模块框架（并行开发）

| 任务 ID | 任务 | 预计时间 | 并行 |
|--------|------|---------|------|
| T011-T017 | 创建 7 个模块的 entity/controller/service 框架 | 2-3 小时 | ✅ (可并行 3-4 个开发) |
| T018-T022 | 创建公共库 (config/exception/util) | 1 小时 | - |

**Day 2 总计**: 3-4 小时  
**验证方式**: `mvn clean install` 编译成功

### Day 3: Docker 和验收

| 任务 ID | 任务 | 预计时间 | 并行 |
|--------|------|---------|------|
| T026-T027 | Docker Compose 和 Dockerfile 配置 | 1 小时 | - |
| 验收 | docker-compose up -d + 应用启动测试 | 1 小时| - |

**Day 3 总计**: 2 小时  
**预期成果**: 完整可运行的后端框架

---

## 第三步：前端框架基础搭建次序

### Day 1: Pages 和 App 配置

| 任务 ID | 任务 | 预计时间 | 并行 |
|--------|------|---------|------|
| T026 | 创建 uni-app 项目 | 10 分钟 | - |
| T027-T029 | 安装依赖和配置 | 20 分钟 | - |
| T031 | 创建页面目录结构 (18 个页面) | 30 分钟 | - |
| T032 | 配置 app.json (TabBar, 页面) | 30 分钟 | - |

**Day 1 总计**: 1.5 小时

### Day 2: Vuex 和 API 层

| 任务 ID | 任务 | 预计时间 | 并行 |
|--------|------|---------|------|
| T036-T040 | 创建 7 个 Vuex 模块 | 1.5 小时 | ✅ (可并行) |
| T041-T045 | 创建 5 个 API 模块 | 1 小时 | ✅ (可并行) |

**Day 2 总计**: 2.5 小时

### Day 3: 组件和集成测试

| 任务 ID | 任务 | 预计时间 | 并行 |
|--------|------|---------|------|
| T046-T050 | 集成 uView + 自定义组件 | 1.5 小时 | - |
| T051-T055 | 启动开发服务和验证 | 1 小时 | - |

**Day 3 总计**: 2.5 小时



---

## 第四步：核心文件模板

### 后端 pom.xml（单体应用）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.petboarding</groupId>
    <artifactId>pet-boarding-backend</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>Pet Boarding Backend</name>
    <description>宠物寄养后端单体应用</description>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.14</version>
        <relativePath/>
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- Database -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.49</version>
        </dependency>

        <!-- Redis -->
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
        </dependency>

        <!-- JWT -->
        <dependency>
            <groupId>com.auth0</groupId>
            <artifactId>java-jwt</artifactId>
            <version>3.19.4</version>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- WeChat Payment -->
        <dependency>
            <groupId>com.github.wechatpay-apiv3</groupId>
            <artifactId>wechatpay-java</artifactId>
            <version>0.2.3</version>
        </dependency>

        <!-- Aliyun SDK -->
        <dependency>
            <groupId>com.aliyun</groupId>
            <artifactId>aliyun-java-sdk-core</artifactId>
            <version>4.6.1</version>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```



### 前端 app.json（页面配置）

```json
{
    "pages": [
        "pages/index/index",
        "pages/login/login",
        "pages/booking/step1/index",
        "pages/booking/step2/index",
        "pages/booking/step3/index",
        "pages/booking/confirm/index",
        "pages/orders/list/index",
        "pages/orders/detail/index",
        "pages/feedback/index",
        "pages/profile/index",
        "pages/pet-list/index",
        "pages/pet-edit/index",
        "pages/membership/index",
        "pages/points/index",
        "pages/help/index",
        "pages/ticket-list/index",
        "pages/shop/list/index",
        "pages/shop/detail/index"
    ],
    "window": {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#FF7A45",
        "navigationBarTitleText": "边牧寄养",
        "navigationBarTextStyle": "white",
        "navigationStyle": "custom"
    },
    "tabBar": {
        "color": "#999",
        "selectedColor": "#FF7A45",
        "backgroundColor": "#fafafa",
        "borderStyle": "black",
        "list": [
            {
                "pagePath": "pages/index/index",
                "text": "首页",
                "iconPath": "static/tabbar/home.png",
                "selectedIconPath": "static/tabbar/home-active.png"
            },
            {
                "pagePath": "pages/orders/list/index",
                "text": "订单",
                "iconPath": "static/tabbar/order.png",
                "selectedIconPath": "static/tabbar/order-active.png"
            },
            {
                "pagePath": "pages/shop/list/index",
                "text": "商城",
                "iconPath": "static/tabbar/shop.png",
                "selectedIconPath": "static/tabbar/shop-active.png"
            },
            {
                "pagePath": "pages/profile/index",
                "text": "我的",
                "iconPath": "static/tabbar/profile.png",
                "selectedIconPath": "static/tabbar/profile-active.png"
            }
        ]
    },
    "permission": {
        "scope.userPhoneNumber": {
            "desc": "获取您的手机号"
        },
        "scope.userLocation": {
            "desc": "获取您的位置信息"
        }
    },
    "networkTimeout": {
        "uploadFile": 60000,
        "downloadFile": 60000,
        "request": 10000
    }
}
```

### 前端 package.json（依赖配置）

```json
{
  "name": "pet-boarding-frontend",
  "version": "1.0.0",
  "description": "宠物寄养微信小程序前端",
  "main": "main.js",
  "scripts": {
    "dev:mp-weixin": "cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni serve",
    "build:mp-weixin": "cross-env NODE_ENV=production UNI_PLATFORM=mp-weixin vue-cli-service uni build",
    "lint": "eslint --ext .js,.vue src",
    "lint:fix": "eslint --ext .js,.vue src --fix"
  },
  "dependencies": {
    "vue": "^2.6.14",
    "vuex": "^3.6.2",
    "axios": "^0.27.2",
    "uview-ui": "^2.0.36"
  },
  "devDependencies": {
    "@dcloudio/uni-app": "^3.0.0",
    "@dcloudio/uni-cli": "^3.0.0",
    "cross-env": "^7.0.3",
    "eslint": "^8.25.0",
    "prettier": "^2.8.0",
    "webpack": "^5.75.0"
  }
}
```

---

## 第五步：项目目录树形结构

### 后端目录树

```
pet-boarding-backend/
├── pom.xml                              # 根 pom.xml
├── README.md                            # 项目说明
├── docker-compose.yml                   # Docker 容器编排
├── sql/                                 # 数据库脚本
│   ├── 000-init-database.sql           # 初始化库和用户
│   ├── 001-init-user-service.sql       # 用户服务表
│   ├── 002-init-order-service.sql      # 订单服务表
│   └── ...
│
├── pet-boarding-common/                 # 公共库模块
│   ├── pom.xml
│   ├── src/main/java/com/petboarding/common/
│   │   ├── entity/BaseEntity.java       # 基类
│   │   ├── exception/GlobalException.java
│   │   ├── constants/Constants.java     # 常量
│   │   ├── util/JwtUtil.java           # JWT 工具
│   │   └── util/RedisUtil.java         # Redis 工具
│   └── src/main/resources/
│
├── pet-boarding-api-gateway/            # API Gateway 模块
│   ├── pom.xml
│   ├── src/main/java/com/petboarding/gateway/
│   │   ├── ApiGatewayApplication.java   # 主类
│   │   ├── config/GatewayConfig.java    # 网关配置
│   │   ├── filter/AuthFilter.java       # 认证过滤器
│   │   └── controller/HealthCheck.java  # 健康检查
│   └── src/main/resources/
│       └── application.yml              # 配置文件
│
├── pet-boarding-user-service/           # 用户服务模块
│   ├── pom.xml
│   ├── src/main/java/com/petboarding/userservice/
│   │   ├── UserServiceApplication.java
│   │   ├── entity/User.java
│   │   ├── entity/PetProfile.java
│   │   ├── repository/UserRepository.java
│   │   ├── service/UserService.java
│   │   ├── controller/UserController.java
│   │   └── dto/UserDTO.java
│   └── src/main/resources/
│       └── application.yml
│
├── pet-boarding-order-service/          # 订单服务模块
│   └── (同 user-service 结构)
│
├── ... (其他 5 个 service 目录)
│
└── .gitignore
```

### 前端目录树

```
pet-boarding-frontend/
├── package.json                         # npm 依赖
├── .env.development                     # 开发环境变量
├── .env.production                      # 生产环境变量
├── README.md                            # 项目说明
├── .eslintrc.js                         # ESLint 配置
├── .prettierrc                          # Prettier 配置
│
├── src/
│   ├── main.js                          # 入口文件
│   ├── App.vue                          # 根组件
│   ├── app.json                         # 微信小程序配置
│   ├── app.scss                         # 全局样式
│   │
│   ├── pages/                           # 页面
│   │   ├── index/
│   │   │   └── index.vue                # 首页
│   │   ├── login/
│   │   │   └── login.vue                # 登录
│   │   ├── booking/                     # 预订流程
│   │   │   ├── step1/
│   │   │   ├── step2/
│   │   │   ├── step3/
│   │   │   └── confirm/
│   │   ├── orders/                      # 订单
│   │   │   ├── list/
│   │   │   └── detail/
│   │   ├── feedback/
│   │   │   └── index.vue                # 反馈
│   │   ├── profile/
│   │   │   └── index.vue                # 个人中心
│   │   ├── pet-list/
│   │   ├── shop/                        # 商城
│   │   │   ├── list/
│   │   │   ├── detail/
│   │   │   └── cart/
│   │   └── ... (其他页面)
│   │
│   ├── components/                      # 自定义组件
│   │   ├── NavBar.vue                   # 导航栏
│   │   ├── OrderCard.vue                # 订单卡片
│   │   ├── PetCard.vue                  # 宠物卡片
│   │   ├── ProductCard.vue              # 商品卡片
│   │   ├── FeedbackCard.vue             # 反馈卡片
│   │   └── MembershipCard.vue           # 会员卡片
│   │
│   ├── store/                           # Vuex 状态管理
│   │   ├── index.js                     # 根 store
│   │   ├── modules/
│   │   │   ├── user.js                  # 用户模块
│   │   │   ├── booking.js               # 预订模块
│   │   │   ├── orders.js                # 订单模块
│   │   │   ├── cart.js                  # 购物车模块
│   │   │   ├── feedback.js              # 反馈模块
│   │   │   ├── shop.js                  # 商城模块
│   │   │   └── app.js                   # 应用模块
│   │   └── getters.js
│   │
│   ├── api/                             # API 请求封装
│   │   ├── base.js                      # 基础请求配置
│   │   ├── user.js                      # 用户 API
│   │   ├── booking.js                   # 预订 API
│   │   ├── order.js                     # 订单 API
│   │   ├── feedback.js                  # 反馈 API
│   │   └── shop.js                      # 商城 API
│   │
│   ├── utils/                           # 工具类
│   │   ├── storage.js                   # 本地存储
│   │   ├── validator.js                 # 验证器
│   │   └── format.js                    # 格式化
│   │
│   ├── styles/                          # 全局样式
│   │   ├── variables.scss               # 颜色、字体变量
│   │   └── common.scss                  # 通用样式
│   │
│   ├── config/                          # 配置文件
│   │   └── constants.js                 # 常量定义
│   │
│   └── static/                          # 静态资源
│       ├── images/
│       ├── icons/
│       └── tabbar/                      # TAB 栏图标
│
└── node_modules/                        # 依赖包
```

---

## 第六步：验证清单

### 后端框架验收
- ✅ 根 `pom.xml` 编译成功
- ✅ `mvn clean install` 一次成功
- ✅ `docker-compose up -d` 启动 MySQL 和 Redis
- ✅ 应用能正常启动 (at least 无编译错误)
- ✅ 数据库脚本能全部执行 (无 SQL 错误)
- ✅ Redis 连接正常 (`redis-cli ping`)
- ✅ 项目目录结构符合 Maven 规范
- [ ] 根 pom.xml 编译成功，无错误
- [ ] `mvn clean install` 成功完成
- [ ] 8 个 service 的 pom.xml 都能独立编译
- [ ] API Gateway 主类能启动 (报错可以接受，配置缺失)
- [ ] docker-compose.yml 能成功启动 MySQL 和 Redis
- [ ] 数据库脚本能在 MySQL 中执行，不报错
- [ ] Redis 连接正常 (`redis-cli ping`)

### 前端框架验收

- [ ] npm install 成功，无相关 error
- [ ] npm run dev:mp-weixin 启动成功
- [ ] 微信开发者工具能导入项目
- [ ] app.json 的页面列表有 18 个页面
- [ ] TabBar 能正常显示和切换
- [ ] Vuex store 初始化正常 (检查浏览器 console)
- [ ] 没有 console error

---

## 第七步：接下来的工作

### 后端

1. **第 1-2 周**: 完成框架搭建 (按 framework-implementation-tasks.md 的 T001-T025)
2. **第 3 周开始**: 根据各模块的 PRD 生成 spec.md，然后生成 tasks.md
3. **功能开发**: 按 spec-kit workflow 开发各业务模块

### 前端

1. **第 1-2 周**: 完成框架搭建 (按 framework-implementation-tasks.md 的 T026-T055)
2. **第 3 周开始**: 生成各模块 spec.md，然后生成 tasks.md
3. **功能开发**: 按 spec-kit workflow 开发各页面和组件

### 同步推进

**推荐方式**: 后端和前端框架搭建可以 **并行进行**，预计 **第 2 周末** 两边都完成框架。

---

## 第八步：问题排查

### 后端常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| Maven 编译失败，缺少依赖 | 网络或镜像问题 | 检查 pom.xml 版本，使用国内镜像 (阿里云) |
| MySQL 连接失败 | Docker 或配置 | 确保 docker-compose up -d, 检查数据库密码 |
| Redis 连接失败 | Docker 或配置 | 确保 redis 容器运行，检查端口 6379 |
| Java 版本不匹配 | IDE 或系统 | 使用 Java 11, `java -version` 检查 |

### 前端常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| npm install 失败 | 网络或版本冲突 | 清除 node_modules，使用 npm ci 或国内镜像 |
| 微信开发者工具黑屏 | 编译或路径 | 确保 app.json 中的页面存在，npm run dev:mp-weixin |
| TabBar 不显示 | app.json 配置 | 检查 tabBar.list 是否正确配置 |
| 页面导航失败 | 路径错误 | 检查 pages 数组中的路径是否正确 (无 .vue 后缀) |

