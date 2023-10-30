FROM node:alpine


#Install some dependencies

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install


CMD [ "npm", "start" ]