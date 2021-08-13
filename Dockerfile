FROM node:14

WORKDIR /app/

COPY package.json .
COPY yarn.lock .

RUN yarn install --pure-lockfile

COPY . /app/

RUN yarn run build

