# CRUD EXAMPLE
## Laravel 8, Vue 3, Pinia, Docker, TailwindCSS


## Installation:

Run in terminal:
```powershell
git clone https://github.com/Grzyb9k/crud-laravel-vue-docker-example
```
```powershell
docker-compose up
```
To load the database structure along with demo data:
```powershell
docker-compose run --rm php /var/www/artisan migrate:fresh --seed
```

Default admin account:
`localhost/admin/login`

Login: `hello@world.com`
Password: `secret`

## Other info

npm run dev
```powershell
docker-compose run --rm npm npm run dev   
```
npm run prod
```powershell
docker-compose run --rm npm npm run prod   
```

- **nginx** - `:80`
- **mysql** - `:3306`
- **php** - `:9000`
- **redis** - `:6379`
- **mailhog** - `:8025` 