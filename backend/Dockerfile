# FROM node:20-alpine

# WORKDIR /app

# COPY package.json ./
# RUN npm install

# # 複製 Prisma schema 與 .env
# COPY prisma ./prisma
# COPY .env ./

# # ✅ 安裝完 @prisma/client 後，才跑 generate
# RUN npx prisma generate
# # ✅ 最後才複製其他程式碼，避免覆蓋
# COPY . .

# EXPOSE 4000
# CMD ["npm", "start"]
FROM node:20-alpine

# 安裝 pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install

EXPOSE 4000

# CMD 不再用，會被 entrypoint.sh 接管
# CMD ["pnpm", "start"]
