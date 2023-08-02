FROM node:16-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# FROM node:16-alpine as builder
# WORKDIR /app
# COPY package.json .
# RUN yarn install
# COPY . .
# RUN yarn build

# FROM nginx:1.19.0
# WORKDIR /usr/share/nginx/html
# COPY --from=builder /app/build .
# CMD ["nginx", "-g", "daemon off;"]
