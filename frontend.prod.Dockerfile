FROM node:latest as build-stage
WORKDIR /app
COPY ./frontend/package*.json ./
COPY ./frontend/yarn.lock .

RUN yarn install
COPY ./frontend .
ENV NODE_ENV=production
RUN yarn build

FROM nginx:stable as production-stage

COPY --from=build-stage  /app/build /usr/share/nginx/html

COPY frontend-nginx/default.conf /etc/nginx/conf.d/default.conf