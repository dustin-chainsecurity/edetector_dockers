FROM node:16-alpine AS builder
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "prod"]