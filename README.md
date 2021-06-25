npm cache clean --force


удаляем все остановленные контейнеры
docker rm $(docker ps -a -q)

удаляем все образы
docker rmi $(docker images -q)