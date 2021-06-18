FROM node:14.16-buster-slim

ADD /backend /backend

WORKDIR /backend

#RUN npm set registry http://host.docker.internal:4873
RUN npm set registry http://0.0.0.0:4873/
RUN npm install
RUN npm install nodemon -g


EXPOSE 8080
