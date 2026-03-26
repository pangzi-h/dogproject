# 后端应用框架设计方案

**项目名称**: 边牧寄养 - 后端单体应用系统  
**版本**: v1.0  
**创建日期**: 2026-03-27  
**架构**: 单体应用 + 分层拆解（前期快速上线，后期可演进微服务）  
**目标交付**: 框架搭建完成，功能模块结构就位

---

## 一、架构总体规划

### 应用架构对标

采用 **单一 Spring Boot 应用** + **业务分层** 的模式：

- **优点**: 快速开发、易于测试部署、减少分布式复杂性
- **缺点**: 单点故障风险，需要做好监控
- **演进路径**: MVP 版本选择单体，稳定后可按功能独立为微服务

### 应用职责划分（逻辑层次）

| 模块 | 职责 | 数据表 | 包名 |
|------|------|--------|------|
| **User** | 用户认证、档案、会员管理 | users, pet_profiles, membership_stats | com.petboarding.user.* |
| **Order** | 订单创建、管理、状态流转 | orders, order_capacity, order_payments | com.petboarding.order.* |
| **Payment** | 微信支付集成、回调处理 | payments, transaction_logs | com.petboarding.payment.* |
| **Feedback** | 每日反馈、图片管理 | daily_feedbacks, feedback_photos | com.petboarding.feedback.* |
| **Points** | 积分账户、积分交易 | membership_points, points_transaction | com.petboarding.points.* |
| **Service** | 帮助中心、工单系统 | help_articles, tickets, ticket_messages | com.petboarding.service.* |
| **Shop** | 商品、购物车、商城订单 | products, product_skus, cart_items, product_orders | com.petboarding.shop.* |
| **Common** | 共享库、工具、常量 | - | com.petboarding.common.* |

### 技术栈

```
编程语言: Java 11 (LTS)
框架: Spring Boot 2.7.x
ORM: Spring Data JPA
构建工具: Maven 3.8.x
数据库: MySQL 5.7 (单一数据库)
缓存/消息: Redis 6.x
文件存储: Aliyun OSS
支付: 微信支付 SDK
日志: Logback + SLF4J
部署: Docker + Docker Compose
```

### 项目结构

```
pet-boarding-backend/
├── pom.xml (单一 POM 文件，管理所有依赖)
├── src/main/java/com/petboarding/
│   ├── PetBoardingApplication.java      # Spring Boot 主类
│   ├── common/                          # 公共层
│   │   ├── config/                      # 配置类 (Redis, JPA, Security)
│   │   ├── entity/                      # 基础实体 BaseEntity
│   │   ├── exception/                   # 全局异常处理
│   │   ├── constants/                   # 常量定义
│   │   ├── util/                        # 工具类 (JWT, 加密, 日期等)
│   │   └── interceptor/                 # 请求拦截器
│   │
│   ├── user/                            # 用户模块
│   │   ├── entity/                      # User, PetProfile, MembershipStat
│   │   ├── repository/                  # UserRepository, PetProfileRepository
│   │   ├── service/                     # UserService 业务逻辑
│   │   ├── controller/                  # UserController REST API
│   │   ├── dto/                         # UserDTO, LoginReqDTO
│   │   └── listener/                    # 事件监听器
│   │
│   ├── order/                           # 订单模块
│   │   ├── entity/                      # Order, OrderCapacity, OrderPayment
│   │   ├── repository/
│   │   ├── service/
│   │   ├── controller/
│   │   └── dto/
│   │
│   ├── payment/                         # 支付模块
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/                     # WeChat payment integration
│   │   ├── controller/
│   │   └── dto/
│   │
│   ├── feedback/                        # 反馈模块
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/
│   │   ├── controller/
│   │   └── dto/
│   │
│   ├── points/                          # 积分模块
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/
│   │   ├── controller/
│   │   └── dto/
│   │
│   ├── service/                         # 服务中心模块
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── service/
│   │   ├── controller/
│   │   └── dto/
│   │
│   └── shop/                            # 商城模块
│       ├── entity/
│       ├── repository/
│       ├── service/
│       ├── controller/
│       └── dto/
│
├── src/main/resources/
│   ├── application.yml                  # Spring Boot 主配置
│   ├── application-dev.yml              # 开发环境配置
│   ├── application-prod.yml             # 生产环境配置
│   ├── logback-spring.xml               # 日志配置
│   └── db/migration/                    # Flyway 数据库版本控制脚本
│
├── docker-compose.yml                   # 本地开发环境 (MySQL + Redis)
├── Dockerfile                           # 应用容器配置
├── sql/                                 # 数据库脚本
│   ├── 000-init-database.sql            # 创建库、用户、字符集
│   ├── 001-init-tables.sql              # 所有表创建脚本
│   └── 002-init-data.sql                # 初始数据
└── docs/                                # 文档
    ├── API.md                           # API 文档
    ├── ARCHITECTURE.md                  # 架构说明
    ├── DB-SCHEMA.md                     # 数据库设计
    └── DEPLOYMENT.md                    # 部署指南
```

---

## 二、开发环境配置

### 本地开发需求

- JDK 11+
- Maven 3.8+
- MySQL 5.7+
- Redis 6.0+
- Docker & Docker Compose
- IDE: IntelliJ IDEA 或 VS Code

### 初始化命令

```bash
# 克隆项目
git clone <repo>
cd pet-boarding-backend

# 启动 MySQL + Redis (Docker Compose)
docker-compose up -d

# 初始化数据库
mysql -u root -p < sql/000-init-database.sql
mysql -u root -p < sql/001-init-tables.sql
mysql -u root -p < sql/002-init-data.sql

# 构建项目
mvn clean install

# 启动应用 (开发环境)
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

# 或者打包后启动
java -jar target/pet-boarding-backend-1.0.0.jar --spring.profiles.active=dev
```

---

## 三、关键设计决策

### 1. 业务逻辑处理

- **事务管理**: Spring @Transactional 本地事务
- **模块间调用**: 同包内直接调用 Service，无网络开销
- **异步处理**: 积分计算、会员升级等使用 Redis 消息队列 + 后台任务

### 2. 数据一致性

- **强一致性**: 订单支付流程使用 @Transactional 确保原子性
- **最终一致性**: 积分、会员等级升级通过事件驱动异步处理
- **单点故障处理**: 支付回调重试机制，确保不漏掉任何订单

### 3. 缓存策略

- **Session 缓存**: Redis (TTL: 7 天)
- **用户信息缓存**: Redis (TTL: 1 小时)
- **商品列表缓存**: Redis (TTL: 30 分钟)
- **会员等级缓存**: Redis (TTL: 24 小时)
- **缓存失效**: 数据更新时主动清除（不依赖 TTL）

### 4. 认证授权

- **微信授权**: 微信 OAuth 2.0 flow，获取 openid + unionid
- **Token 管理**: JWT with Redis blacklist（登出时加入黑名单）
- **权限控制**: Spring Security + 自定义角色 (USER, OPERATOR, ADMIN)
- **拦截器**: RequestInterceptor 拦截所有请求，验证 JWT token

---

## 四、库依赖计划

### 核心依赖

```
spring-boot-starter-web          # MVC 框架
spring-boot-starter-data-jpa     # ORM
spring-boot-starter-security     # 认证授权
spring-boot-starter-validation   # 数据验证
spring-boot-starter-redis        # Redis 支持
mysql-connector-java 5.1.49      # MySQL 驱动
jedis 3.x                        # Redis 客户端
weixin-java-pay 4.x              # 微信支付 SDK
aliyun-java-sdk-core 4.x         # 阿里云 SDK (OSS)
jjwt 0.11.x                      # JWT 库
lombok 1.18.x                    # 代码生成
mapstruct 1.4.x                  # DTO 映射
```

### 测试依赖

```
spring-boot-starter-test         # Spring 测试框架
junit-jupiter 5.x                # JUnit 5
mockito 4.x                      # Mock 库
h2database                       # 内存数据库
testcontainers                   # Docker 集成测试
```

---

## 五、框架搭建阶段

### 总体时间表

| 阶段 | 工作内容 | 工时 | 
|------|---------|------|
| Phase 1 | Maven 项目初始化 + 依赖配置 | 1 天 |
| Phase 2 | Spring Boot 应用框架 + 配置文件 | 1 天 |
| Phase 3 | 7 个模块的 entity/controller/service 框架 | 2 天 |
| Phase 4 | Redis + JWT + Security 等共享组件 | 1 天 |
| Phase 5 | 数据库脚本 + Docker Compose 配置 | 1 天 |
| Phase 6 | 测试框架 + 文档编写 | 1 天 |
| **总计** | **框架搭建完成** | **5-6 天** |

### Phase 1: Maven 项目初始化 (1 天)

- [ ] 创建 pet-boarding-backend 根目录
- [ ] 编写根 pom.xml (依赖版本管理)
- [ ] 创建 src/main/java 目录结构
- [ ] 创建 src/main/resources 目录
- [ ] 创建 sql/ 和 docs/ 目录

### Phase 2: Spring Boot 应用主框架 (1 天)

- [ ] 创建 PetBoardingApplication.java 主类
- [ ] 配置 application.yml (基础配置)
- [ ] 配置 application-dev.yml (开发环境)
- [ ] 配置 application-prod.yml (生产环境)
- [ ] 配置 logback-spring.xml (日志)
- [ ] 配置 docker-compose.yml (MySQL + Redis)

### Phase 3: 7 个业务模块框架 (2 天 - 可并行)

对每个模块 (user/order/payment/feedback/points/service/shop)：
- [ ] 创建 entity 基类和模型
- [ ] 创建 repository (extends JpaRepository)
- [ ] 创建 service 业务逻辑框架
- [ ] 创建 controller REST 接口框架
- [ ] 创建 dto DTO 对象

### Phase 4: 共享基础设施 (1 天)

- [ ] 创建 common/config/ RedisConfig, JpaConfig, SecurityConfig
- [ ] 创建 common/exception/ GlobalExceptionHandler
- [ ] 创建 common/util/ JwtTokenProvider, EncryptUtil, DateUtil
- [ ] 创建 common/interceptor/ RequestInterceptor (token 验证)
- [ ] 创建 common/constants/ AppConstants, ErrorCode
- [ ] 创建 common/entity/ BaseEntity (id, createdAt, updatedAt)

### Phase 5: 数据库脚本 + Docker (1 天)

- [ ] 编写 sql/000-init-database.sql (创建库)
- [ ] 编写 sql/001-init-tables.sql (所有表)
- [ ] 编写 sql/002-init-data.sql (测试数据)
- [ ] 编写 Dockerfile (应用容器)
- [ ] 优化 docker-compose.yml

### Phase 6: 测试框架 + 文档 (1 天)

- [ ] 创建 src/test 目录结构
- [ ] 配置 @SpringBootTest 集成测试
- [ ] 编写 README.md (快速开始)
- [ ] 编写 ARCHITECTURE.md (架构说明)
- [ ] 编写 DB-SCHEMA.md (数据库设计)
- [ ] 编写 DEPLOYMENT.md (部署指南)

---

## 六、关键代码框架

### BaseEntity.java

```java
@MappedSuperclass
@Data
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

### 单个模块框架

```
src/main/java/com/petboarding/user/
├── entity/
│   ├── User.java          (extends BaseEntity)
│   └── PetProfile.java    (extends BaseEntity)
├── repository/
│   ├── UserRepository.java   (extends JpaRepository<User, Long>)
│   └── PetProfileRepository.java
├── service/
│   └── UserService.java      (业务逻辑)
├── controller/
│   └── UserController.java   (@RestController)
└── dto/
    ├── UserDTO.java
    ├── LoginReqDTO.java
    └── PetProfileDTO.java
```

---

## 七、成功验收标准

### 构建验收

- ✅ `mvn clean install` 编译成功，无错误
- ✅ 所有测试通过 (或 skip)
- ✅ 生成 target/pet-boarding-backend-1.0.0.jar 文件

### 运行验收

- ✅ `docker-compose up -d` 成功启动 MySQL 和 Redis
- ✅ 数据库脚本成功执行，所有表创建
- ✅ 应用启动无冷启动错误
- ✅ 访问 http://localhost:8080/api/health 返回 200

### 功能验收

- ✅ GET /api/user/info 可调用 (需要合法 token)
- ✅ POST /api/auth/login 微信登录接口可调用
- ✅ Redis 可正常 SET/GET
- ✅ 数据库连接正常
- ✅ JWT Token 生成、验证、过期检查正常工作

### 代码质量

- ✅ 所有代码有适当的注释
- ✅ 没有编译警告
- ✅ 遵循 Java 代码规范



