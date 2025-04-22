FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
COPY tsconfig.json ./
RUN npx prisma generate
COPY src ./src/
RUN npm run build
RUN npm prune --production

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001
CMD npx prisma migrate deploy && npx prisma db seed && npm run start:prod