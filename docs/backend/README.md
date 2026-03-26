# Backend 模块文档

## 架构
- 单体应用: Spring Boot 2.7 + Maven
- 入口: backend/src/main/java/com/petboarding/PetBoardingApplication.java

## 目录
- common: 公共能力
- user/order/payment/feedback/points/servicecenter/shop: 业务模块

## 启动
1. cd backend
2. docker-compose up -d
3. mvn clean install
4. mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

## 健康检查
- GET /api/health
