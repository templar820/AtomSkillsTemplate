FROM node:14.16-buster-slim

ADD /backend /backend

WORKDIR /backend

RUN npm install
RUN npm install nodemon -g


EXPOSE 8080