FROM php:8.1-fpm

RUN apt-get update
RUN apt-get install -y openssl zip unzip git curl
RUN apt-get install -y libzip-dev libonig-dev libicu-dev
RUN apt-get install -y autoconf pkg-config libssl-dev

RUN docker-php-ext-install bcmath mbstring intl opcache

RUN docker-php-ext-install pdo pdo_mysql mysqli

#RUN curl -sL https://deb.nodesource.com/setup_16.x| bash -
#RUN apt-get install -y nodejs
