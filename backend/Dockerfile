FROM node:20-alpine

# 安裝 pnpm
RUN npm install -g pnpm

WORKDIR /app

# 複製 package.json
COPY package.json ./

# 安裝依賴
RUN pnpm install || true

EXPOSE 4000

