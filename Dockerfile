FROM node:16-alpine

WORKDIR /home/server

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start"]

