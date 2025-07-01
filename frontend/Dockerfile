# Use the official Node.js image
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy only dependency files first (for better caching)
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy rest of the app
COPY . .


# Expose Next.js dev server port (default: 3000)
EXPOSE 3000

# Run dev server (hot reload)
CMD ["pnpm", "dev"]
