FROM cusspvz/node:5.1.1
MAINTAINER José Moreira <jose.moreira@findhit.com>

# Allow environment exchange with build-args
ARG NODE_ENV=production

# App default configuration overlap
ENV RELAX_DB__URI="mongodb://database/relax"

# Add entire context
ADD . /app

RUN \
    apk --update upgrade && \
    APK_NEEDS="make gcc g++ python linux-headers"; \
    apk add $APK_NEEDS && \
    npm install && \
    apk del $APK_NEEDS && \
    rm -fR /var/cache/apk/*

# Build app and remove duplicated files on image
RUN npm run build-browser && \
    rm assets/images/*

RUN npm run build-server

# Whenever the image is started without a command, use start into entrypoint
# We are not calling here `npm run start` because entrypoint already handles it.
CMD [ "start" ]
