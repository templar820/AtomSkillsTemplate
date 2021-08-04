npm cache clean --force


удаляем все остановленные контейнеры
docker rm $(docker ps -a -q)

удаляем все образы
docker rmi $(docker images -q)

запуск end to end тестирования
1. make start
2. создаем пользователя email: cypress@test password: 1
3. npm run cypress



Оконные функции:
http://thisisdata.ru/blog/uchimsya-primenyat-okonnyye-funktsii/

