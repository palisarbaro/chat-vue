# chat

Типа микросервисный чат с JWT авторизацией. (Vue.js) <br>
Сервис авторизации(Node.js) https://github.com/palisarbaro/auth <br>
API(Node.js) https://github.com/palisarbaro/chat-api 

## Запуск приложения
открывает на https://localhost следующие порты <br>
80,443 - само приложение <br>
4000 - API сервер <br>
5000 - Сервер авторизации 
```sh
cd docker
docker-compose up -d
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development
```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
