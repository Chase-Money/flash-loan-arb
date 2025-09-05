# Use a Node 18 Alpine image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package manager files first (for efficient caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the source code
COPY . .

# Expose any needed ports (if applicable)
EXPOSE 3000

# Run the bot on container start
CMD ["pnpm", "tsx", "src/index.ts"]