FROM node:18.16.0 as build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN yarn install --immutable --immutable-cache --check-cache
RUN yarn build

FROM nginx:1.21.1-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
