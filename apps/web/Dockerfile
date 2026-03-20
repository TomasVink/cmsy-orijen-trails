# Build context must be the monorepo root:
#   docker build -f apps/web/Dockerfile .

# Builder uses Debian-based bun (glibc) so native binaries (esbuild, lightningcss,
# @tailwindcss/oxide, etc.) resolve correctly. The slim runtime uses Alpine.
FROM oven/bun:1.3.11 AS base

# ── Install dependencies ───────────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app

# Copy workspace manifests so Bun can resolve the full dependency graph
COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/
COPY apps/cms/package.json ./apps/cms/
COPY packages/payload-types/package.json ./packages/payload-types/

RUN bun install

# ── Build ──────────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

WORKDIR /app/apps/web
# bunx traverses up to the workspace root to find vite, unlike `bun run build`
# which only looks in the immediate package's node_modules/.bin
RUN bunx vite build

# ── Runtime ───────────────────────────────────────────────────────────────────
FROM oven/bun:1.3.11-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Use port 3001 to avoid collision with the CMS on 3000
ENV PORT=3001
ENV HOST=0.0.0.0

COPY --from=builder /app/apps/web/build ./build

EXPOSE 3001

CMD ["bun", "./build/index.js"]
