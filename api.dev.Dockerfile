# install node modules
FROM node:14.17.0-alpine
WORKDIR /mnt/app

# COPY ./api/package.json .
COPY ./api/package*.json .

# COPY ./api/yarn.lock .

RUN yarn install

# COPY ./app /mnt/app




CMD [ "yarn", "start:dev"  ]