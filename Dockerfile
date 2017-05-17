FROM node:6-wheezy
MAINTAINER José Magalhães <magalhas@gmail.com>

ENV relax_db__uri="mongodb://mongo/relax"
EXPOSE 8080

WORKDIR /app

# Copy source
ADD . ./

# Expose media folder
VOLUME /app/public/media

# Build
RUN yarn && yarn build

CMD yarn start
