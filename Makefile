start:
	docker-compose up -d  --scale db_init=0 --scale db_clean=0
stop:
	docker-compose down
production:
	type .\_docker\nginx-conf\nginx.conf > .\nginx\nginx.conf
	docker-compose up -d --sc ale db_init=0 --scale db_clean=0
build:
	docker-compose build

db:
	docker-compose up db_init
db-clean:
	docker-compose up db_clean

delete-all:
	docker-compose down
	docker system prune
