FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
  git curl zip unzip libpng-dev libonig-dev libxml2-dev \
  libzip-dev libpq-dev libjpeg-dev libfreetype6-dev \
  && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath gd

COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN php artisan key:generate \
  && php artisan config:cache \
  && php artisan route:cache \
  && php artisan view:cache \
  && php artisan storage:link

RUN chown -R www-data:www-data /var/www \
  && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
