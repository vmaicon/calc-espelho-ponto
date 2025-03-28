# Em container

Para subir o javascript em container use:

`docker run --rm -dit -p 8080:80 --hostname calc --name calc -w /var/www/html -v .:/usr/share/nginx/html nginx:latest`