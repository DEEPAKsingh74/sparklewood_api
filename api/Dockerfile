# Stage 1: Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies including devDependencies (for build tools like rimraf, tsc-alias)
COPY package*.json tsconfig.json ./
RUN npm install --legacy-peer-deps

# Copy source code AFTER installing deps (Docker caching optimization)
COPY . .

# Build project (tsc + tsc-alias etc.)
RUN npm run build

# Stage 2: Production Stage
FROM node:22-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production --legacy-peer-deps

# Copy only the necessary built output
COPY --from=builder /app/dist ./dist

# Expose the production port
EXPOSE 8000

# Command to run app
CMD ["npm", "start"]