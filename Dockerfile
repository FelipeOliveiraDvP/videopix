FROM node:20-alpine as node-build
WORKDIR /var/www

COPY package*.json ./
COPY pnpm*.yaml ./
COPY vite.config.* ./
COPY postcss.config.js ./
COPY tsconfig.json ./
COPY vite.config.js ./
COPY resources ./resources

ENV NODE_ENV=production

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
  git curl libpng-dev libonig-dev libxml2-dev zip unzip \
  libzip-dev libpq-dev libjpeg-dev libfreetype6-dev \
  && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath gd

COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copia primeiro os arquivos necessários para o composer
COPY composer.json composer.lock ./

# Instala as dependências antes de copiar o restante do projeto
RUN composer install --no-dev --optimize-autoloader

# Agora copia o restante do projeto (mantendo a ordem correta)
COPY . .

COPY ${ENV_FILE} .env

COPY --from=node-build /var/www/public ./public
COPY --from=node-build /var/www/resources ./resources

# Comando Artisan e permissões
RUN php artisan key:generate \
  && php artisan config:cache \
  && php artisan route:cache \
  && php artisan view:cache \
  && php artisan storage:link

RUN chown -R www-data:www-data /var/www \
  && chmod -R 755 /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
