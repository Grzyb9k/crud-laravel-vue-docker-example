FROM composer/composer

WORKDIR /var/www

ADD composer_init.sh /composer_init.sh
RUN chmod +x /composer_init.sh
ENTRYPOINT /composer_init.sh