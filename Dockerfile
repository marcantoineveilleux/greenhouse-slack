FROM node:8-slim

WORKDIR /server

COPY . /server
RUN npm install

# TypeScript
RUN npm run build

EXPOSE 5000
CMD [ "npm", "run", "serve" ]