FROM node:17.0.1-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:17.0.1-alpine AS prod
ARG FOO=${TEST_SECRET} 
ENV FOO=${TEST_SECRET}
WORKDIR /app
COPY --from=build ./app/dist ./dist
COPY package*.json ./
RUN npm install --production 
USER node
CMD ["npm","start"]
EXPOSE 8000