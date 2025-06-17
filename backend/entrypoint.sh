#!/bin/sh

# 等待 PostgreSQL 服務開好
echo "⏳ Waiting for PostgreSQL..."
until nc -z postgres 5432; do
  sleep 1
done
echo "✅ PostgreSQL is up!"

# 執行 Prisma migrate
echo "🛠 Running Prisma migrate..."
npx prisma migrate dev --name init

# 啟動應用程式
echo "🚀 Starting server..."
exec pnpm start
