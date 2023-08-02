FROM node:16-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]