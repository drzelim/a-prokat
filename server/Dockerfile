FROM node:19.5.0-alpine3.17
#FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5555

CMD ["npm", "run", "start:prod"]
