# install node modules
FROM keymetrics/pm2:14-alpine
WORKDIR /mnt/app

COPY ./api/package*.json .


RUN yarn install

COPY ./api .

RUN yarn build

# COPY ./app /mnt/app




# CMD [ "yarn", "start"  ]