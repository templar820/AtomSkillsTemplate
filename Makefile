start:
	docker-compose up -d
stop:
	docker-compose down

build:
	docker-compose build
	docker image prune -f
delete-images:
	docker rmi $(docker images -a -q)
delete-containers:
	docker rm $(docker ps -a -q)
delete-volumes:
	docker volume prune
delete-all:
	docker-compose down
	docker rm $(docker ps -a -q)
	docker rmi $(docker images -a -q)
	docker volume prune