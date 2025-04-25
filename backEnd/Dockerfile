# 🏗 빌드 환경
FROM eclipse-temurin:21 AS build
WORKDIR /app

# Gradle Wrapper 및 설정 복사
COPY gradlew .
COPY gradle gradle
RUN chmod +x gradlew

# 나머지 파일 복사
COPY . .

RUN chmod +x gradlew

# 📦 패키지 빌드
RUN ./gradlew build -x test --no-daemon

# 🚀 실행 환경
FROM eclipse-temurin:21
WORKDIR /app

# build/libs 폴더에 jar이 생성됨
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
