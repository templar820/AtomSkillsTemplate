start:
	docker-compose up -d
stop:
	docker-compose down

build:
	docker-compose up -d verdaccio
	docker-compose build
	docker image prune -f
	docker-compose down
db:
	export $(grep -v '^#' .env | xargs) && \
		export $PGPASSWORD=$PG_PASS && \
		docker exec -it hacktemplate_postgres_1 \
			bash -c 'psql -U hacktemplate -d hacktemplate -h localhost'

delete-all:
	docker-compose down
	docker system prune
