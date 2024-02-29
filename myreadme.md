version: "1.0"

name: deploy-server
services:
  postgres-server:
    container_name: postgres-server
    hostname: postgresql
    image: postgres:latest
    volumes:
      - postgres-server-master_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=${DATABASE_PASSWORD:-mypassword123}
      - POSTGRES_USER=${DATABASE_USER:-myuser123}
      - POSTGRES_DB=${DATABASE_DEFAULT:-postgres}
    networks:
      - services
    ports:
      - 5432:5432
    restart: always

  myapp-service:
    container_name: myapp-service
    hostname: myapp
    image: grentank/beaversproj:1.0
    volumes:
      - /home/elbrus/myapp:/app/assets
    environment:
      - DB_NAME_PROD=${DB_NAME_PROD:-mydatabase123}
      - DB_PASS_PROD=${DB_PASS_PROD:-mypassword123}
      - DB_USER_PROD=${DB_USER_PROD:-myuser123}
      - DB_HOST_PROD=${DB_HOST_PROD:-postgres-server}
      - NODE_ENV=production
    ports:
      - 3000:3000
    networks:
      - services
    depends_on:
      - postgres-server
    restart: always

  nginx:
    container_name: web_proxy
    hostname: nginx
    image: panferovdev/nginxcertbot:1.0
    volumes:
      - /home/elbrus/nginx:/etc/nginx/conf.d/
      - /home/elbrus/letsencrypt:/etc/letsencrypt
    ports:
      - 80:80
      - 443:443
    networks:
      - services

  pgadmin:
    container_name: postgres-pgadmin
    hostname: postgres-pgadmin
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=${PGADMIN_DEFAULT_EMAIL:-admin@admin.com}
      - PGADMIN_DEFAULT_PASSWORD=${PGADMIN_DEFAULT_PASSWORD:-mypassword123}
    networks:
      - services
    volumes:
      - /home/elbrus/pgadmin_data:/var/lib/pgadmin
    ports:
      - 5050:80
    restart: on-failure
    depends_on:
      - postgres-server

volumes:
  postgres-server-master_data:
    driver: local
    name: postgres-server-master_data
  pgadmin_data:
    driver: local
    name: pgadmin_data

networks:
  services:
    name: ${DATABASE_NETWORK:-postgres-server}