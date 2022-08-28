FROM composer/composer

ENTRYPOINT composer install -q -n --no-ansi --no-dev --no-scripts --no-progress --prefer-dist \