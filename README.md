# NestJS practical example
## Runtime environment
### middleware : NodeJS, NestJS
* nvm ls-remote --lts v16.x // node LTS version 조회
* nvm install v16.13.1  // node v16.13.1 설치.
* nvm use v16.13.1  // node version 이 여러개 인 경우 선택
### middleware : docker
* brew cask install docker
### database : postgres
* docker run -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=nest1234 -v pgdata:/var/lib/postgresql/data -d postgres
### cache : redis 
* docker volume create --name redis_data
* docker run --name redis-svr -d -p 6379:6379 -v redis_data:/data redis redis-server --appendonly yes

## Runtime settings
### git clone
* git clone https://github.com/largezero/ShortURL.git
### nestjs cli install
* npm i -g @nestjs/cli
### yarn installation
```
npm i -g yarn
yarn add @nestjs/config @nestjs/typeorm pg object-hash @nestjs-modules/ioredis ioredis redis cache-manager cache-manager-ioredis moment moment-timezone
yarn install
yarn start // default port 3000
```

### short-url-nestjs app dockerizing
```
touch Dockerfile and make dockerizing code
docker build . -t short-url-nestjs
docker run -p 3000:3000 short-url-nestjs
```

### all docker run in same network
* install ping command in docker 
```
docker container exec -it redis-svr /bin/bash
apt-get update
apt-get install inetutils-ping
```
* check network by ping 
```
docker inspect -f "{{ .NetworkSettings.IPAddress }}" postgres
docker exec -t redis-svr ping 172.x.x.x
```
* make network and running docker in same network
```
docker network create short-url-network
docker run --name redis-svr -d --network short-url-network -p 6379:6379 -v redis_data:/data redis redis-server --appendonly yes
docker run -d --network short-url-network -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=nest1234 -v pgdata:/var/lib/postgresql/data postgres
docker run --network short-url-network -p 3000:3000 short-url-nestjs
```

## System overview
### Title : Shorten URL API Service Application (NestJS)
### Purpose
* 사용자계정(account)을 관리를 한다.
* 계정별 apikey 를 관리한다. 한개의 계정은 여러개의 apikey 를 가질수 있다.(1대다 관계)
* 1개의 apikey 는 여러개의 short url 을 가진다. (1대다 관계)
* 모든 정보는 DB 에서 관리한다.
* short url 에 대한 처리는 속도를 위해서 redis 를 cache 로 사용한다.
### ERD
![short-url_erd](https://user-images.githubusercontent.com/16658223/149438383-33023bb1-3095-4fef-9f99-b73092d111cb.png)

### To-Do
* (완료) 기초적인 CRUD 가 아닌 실제 현업에서 사용 가능한 수준의 Data Handling 예제
* (완료) 실질적인 Test Case 예제 구현
* (완료) DBMS 에 종속되지 않는 ORM 도구의 실질적 사용
* (완료) 라이브러리 최소화 및 검증된 라이브러리 사용을 통한 지속적 유지보수성
* (완료) 각각의 Layer 별 일관된 에러처리 및 보안을 위한 최소한의 메시지처리
* (완료) 타 시스템과의 연계를 고려한 인터페이스 표준화 및 Validation 처리
* (완료) OS, Docker 등 제반 인프라 환경에 종속적이지 않은 Application 환경 독립성 제공


### NestJS Module
* shared : common, util
* account : 사용자/계정 관리
* apikey : apikey 관리
* shorter : short url 관리, redis cache

## Testing
### swagger
* http://localhost:3000/swagger
### yarn run test
* yarn run test // all test run
* yarn run test -o --watch // use testing menu
* yarn run test -t \[testing name regexp] // ex) yarn run test -t AccoutService
### test - curl sample
```
// application health check
curl -X 'GET' 'http://localhost:3000/health' -H 'accept: */*'

// Get account info
curl -X 'GET' 'http://localhost:3000/account/shortUser01' -H 'accept: */*' -H 'short_auth_key: bigzero-auth-key-01'    
```

## vscode setting
### plugins
* installed extands : Vscode NestJs Snippets, Todo Tree, Jest Runner, Angular Language Service