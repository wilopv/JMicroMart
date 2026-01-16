FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml .
RUN mkdir -p services/discovery services/gateway services/user-service services/product-service services/order-service
COPY services/discovery/pom.xml services/discovery/pom.xml
COPY services/gateway/pom.xml services/gateway/pom.xml
COPY services/user-service/pom.xml services/user-service/pom.xml
COPY services/product-service/pom.xml services/product-service/pom.xml
COPY services/order-service/pom.xml services/order-service/pom.xml
COPY services/gateway/src services/gateway/src
RUN mvn -pl services/gateway -am -DskipTests package spring-boot:repackage

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/services/gateway/target/*-SNAPSHOT.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
