FROM node:lts-alpine3.16

WORKDIR /var/www

ENTRYPOINT npm install && npm run dev




