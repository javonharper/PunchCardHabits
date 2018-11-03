FROM node:8

WORKDIR /usr/app

RUN npm install -g nodemon

COPY package.json .
COPY yarn.lock .
RUN npm install --quiet

COPY . .
