# Etapa 1: Build do frontend
FROM node:20-alpine AS node-build

WORKDIR /app

COPY package*.json pnpm*.yaml ./
COPY vite.config.* postcss.config.js tsconfig.json ./
COPY resources ./resources
COPY public ./public
COPY .env .env

ENV NODE_ENV=production

RUN npm install -g pnpm && pnpm install && pnpm build


# Etapa 2: PHP com Laravel
FROM php:8.3-fpm

# Instala dependências PHP
RUN apt-get update && apt-get install -y \
  git curl zip unzip libpng-dev libonig-dev libxml2-dev \
  libzip-dev libpq-dev libjpeg-dev libfreetype6-dev \
  && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath gd

# Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copia apenas o necessário
COPY . ./
COPY --from=node-build /app/public ./public
COPY --from=node-build /app/resources ./resources

# Instala dependências do PHP
RUN composer install --no-dev --optimize-autoloader

# Gera caches
RUN php artisan key:generate \
  && php artisan config:cache \
  && php artisan route:cache \
  && php artisan view:cache \
  && php artisan storage:link

# Permissões
RUN chown -R www-data:www-data /var/www \
  && chmod -R 755 /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
