FROM node:14.16-buster-slim

ADD /db_transactions /db_transactions

WORKDIR /db_transactions

#RUN npm set registry http://host.docker.internal:4873
#RUN npm set registry http://0.0.0.0:4873/
RUN npm install
