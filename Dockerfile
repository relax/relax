FROM node:5-wheezy
MAINTAINER José Magalhães <magalhas@gmail.com>

ENV relax_db__uri="mongodb://mongo/relax"
EXPOSE 8181

ADD . ./
RUN npm i && npm run build

CMD npm start
