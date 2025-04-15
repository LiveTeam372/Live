# 빌드 스테이지
FROM node:18 AS build
WORKDIR /app

# 1. package 파일만 먼저 복사
COPY package*.json ./

# 2. 의존성 설치 (캐시 가능)
RUN npm ci

# 3. 소스 복사
COPY . .

# 4. 빌드
RUN npm run build

# 실행 스테이지
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
