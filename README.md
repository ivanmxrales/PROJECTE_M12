# Desplegament del projecte Laravel 12 + Vite-React

Aquest document descriu els passos per preparar i desplegar el projecte en un servidor Ubuntu nou.

---

## Requisits previs

- Ubuntu  
- Accés a terminal amb permisos sudo  
- El projecte conté:  
  - Backend amb Laravel 12 (PHP)  
  - Frontend amb Vite + React (Node.js v22)  

---

## 1. Instal·lació de dependències bàsiques

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git unzip zip
```

## 2. Instal·lació de PHP i extensions per Laravel 12

```bash
sudo apt install -y php8.2 php8.2-cli php8.2-common php8.2-mbstring php8.2-xml php8.2-bcmath php8.2-curl php8.2-mysql php8.2-sqlite3 php8.2-zip php8.2-tokenizer php8.2-intl php8.2-pdo php8.2-fileinfo php8.2-opcache php8.2-dom php8.2-json
```
## 3. Instal·lació de Composer

```bash 
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
composer --version
```

## 4. Instal·lació de Node.js (v 22)

```bash 
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

## 5. Clonar el projecte i instal·lar dependències backend

```bash
git clone <URL_DEL_REPOSITORI>
cd <NOM_DEL_PROJECTE_BACKEND>
composer install
```

## 6. Configurar l'entorn de Laravel

```bash
cp .env.example .env
nano .env
```
Generem la clau de l'aplicació

```bash
php artisan key:generate
```

## 7. Migrar la base de dades
Assegura't que la base de dades està configurada i accessible, després executa:

```bash
php artisan migrate --force
```

## 8. Instal·lació i compilació del frontend (Vite + React)
Entra a la carpeta del frontend

```bash
cd <NOM_DEL_PROJECTE_FRONTEND>
npm install
npm run build
```

## 9.Execució en desenvolupament
Per desenvolupament local pots fer servir aquestes comandes en terminals diferents:

```bash
php artisan serve
php artisan reverb:start
npm run dev
```