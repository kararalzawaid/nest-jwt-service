FROM node:16-alpine3.14

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

RUN apk add -U tzdata
RUN cp /usr/share/zoneinfo/Europe/Bucharest /etc/localtime