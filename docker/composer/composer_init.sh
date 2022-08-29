#!/bin/sh

composer install -q -n --no-ansi --no-dev --no-scripts --no-progress --prefer-dist \

composer dump-autoload
