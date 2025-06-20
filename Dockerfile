# ==============================================================================
# Stage 1: dev deps installation
# ==============================================================================
FROM node:24-alpine3.21 AS dev-dependencies
RUN apk add --no-cache dumb-init
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --include=dev --frozen-lockfile

# ==============================================================================
# Stage 2: Only prod deps installation
# ==============================================================================
FROM node:24-alpine3.21 AS prod-dependencies
RUN apk add --no-cache dumb-init
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --frozen-lockfile && \
    npm cache clean --force

# ==============================================================================
# Stage 3: Build
# ==============================================================================
FROM node:24-alpine3.21 AS build
WORKDIR /app

COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY package.json package-lock.json* ./
COPY . .

ARG VITE_APP_API_URL
ARG API_URL

ENV VITE_APP_API_URL=${VITE_APP_API_URL}
ENV API_URL=${API_URL}

RUN npm run build && \
    npm prune --omit=dev

# ==============================================================================
# Stage 4: prod image
# ==============================================================================
FROM node:24-alpine3.21 AS production

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactapp -u 1001

WORKDIR /app
COPY --from=prod-dependencies --chown=reactapp:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=reactapp:nodejs /app/build ./build
COPY --from=build --chown=reactapp:nodejs /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3008
ENV HOST=0.0.0.0

EXPOSE $PORT

USER reactapp

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start"]