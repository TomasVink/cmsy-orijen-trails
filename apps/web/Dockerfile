# Build context must be the monorepo root:
#   docker build -f apps/web/Dockerfile .

# Builder uses Debian-based bun (glibc) so native binaries (esbuild, lightningcss,
# @tailwindcss/oxide, etc.) resolve correctly. The slim runtime uses Alpine.
FROM oven/bun:1.3.11 AS builder
WORKDIR /app

# ── Install dependencies ───────────────────────────────────────────────────────
# Copy manifests first so this layer is cached independently of source changes.
COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/
COPY apps/cms/package.json ./apps/cms/
COPY packages/payload-types/package.json ./packages/payload-types/

RUN bun install

# ── Build ──────────────────────────────────────────────────────────────────────
COPY . .

WORKDIR /app/apps/web
RUN ./node_modules/.bin/vite build

# ── Runtime ───────────────────────────────────────────────────────────────────
FROM oven/bun:1.3.11-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Use port 3001 to avoid collision with the CMS on 3000
ENV PORT=3001
ENV HOST=0.0.0.0

# svelte-adapter-bun doesn't bundle all deps — install them so bun's module
# resolution can find them at runtime. Package manifests only; no source code.
COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/
COPY packages/payload-types/package.json ./packages/payload-types/
RUN bun install

# Place the build at apps/web/build so module resolution traverses up to
# apps/web/node_modules (where the adapter's runtime deps live).
COPY --from=builder /app/apps/web/build ./apps/web/build

EXPOSE 3001

CMD ["bun", "./apps/web/build/index.js"]
