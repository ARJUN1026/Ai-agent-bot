FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/src ./src
COPY --from=base /app/next.config.ts ./next.config.ts
COPY --from=base /app/next-env.d.ts ./next-env.d.ts
COPY --from=base /app/postcss.config.mjs ./postcss.config.mjs
COPY --from=base /app/tsconfig.json ./tsconfig.json
COPY --from=base /app/eslint.config.mjs ./eslint.config.mjs
COPY --from=base /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=base /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
