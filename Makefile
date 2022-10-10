up:
	docker-compose up -d

build:
	docker-compose build

stop:
	docker-compose stop

bash-api:
	docker exec -it node_api_container sh


