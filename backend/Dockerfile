FROM node:alpine3.19
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache g++ gcc openjdk11-jdk python3
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run start