FROM node:5-wheezy
MAINTAINER José Magalhães <magalhas@gmail.com>

ENV relax_db__uri="mongodb://mongo/relax"
EXPOSE 8080

WORKDIR /app

ADD . ./
VOLUME /app/public/media

RUN npm i && npm run build

CMD npm start
