FROM node:14.16-buster-slim

ADD /frontend /frontend

WORKDIR /frontend

RUN npm cache clean --force
#RUN npm set registry http://host.docker.internal:4873
#RUN npm set registry http://172.17.0.1:4873
RUN npm install

EXPOSE 3000
