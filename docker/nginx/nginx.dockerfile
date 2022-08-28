FROM nginx:1.22.0-alpine

ADD ./conf/default.conf /etc/nginx/conf.d/