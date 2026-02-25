# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files first for better layer caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Use production env for the build so Nuxt bakes correct defaults
# (Nuxt/Vite loads .env then .env.production when NODE_ENV=production)
RUN cp .env.production .env

# Build for production (SSR mode)
RUN pnpm run build

# ---- Production Stage ----
FROM node:20-alpine

ENV TZ=Asia/Shanghai
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV NITRO_HOST=0.0.0.0

# Nuxt 3 runtime config overrides (NUXT_PUBLIC_<KEY> pattern)
# These can be overridden by Railway env vars at deploy time
ENV NUXT_PUBLIC_API_URL=https://api.exeed-bh.com/
ENV NUXT_PUBLIC_STATIC_URL=https://exeed-bh.com
ENV NUXT_PUBLIC_OOS_URL=https://cms-uat.omodaglobal.com/

WORKDIR /app

# Copy the built output from builder stage
COPY --from=builder /app/.output ./.output

EXPOSE 3000

# Nitro respects PORT env var which Railway injects automatically
CMD ["node", ".output/server/index.mjs"]
