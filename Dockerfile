FROM node:18.16.1

EXPOSE 3083

WORKDIR /usr/src/app

COPY  package*.json ./

RUN npm i

COPY . .
COPY .env ./

CMD [ "npm", 'run', 'dev' ]



