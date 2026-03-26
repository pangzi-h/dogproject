FROM eclipse-temurin:11-jre

WORKDIR /app
COPY target/pet-boarding-backend-1.0.0.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
