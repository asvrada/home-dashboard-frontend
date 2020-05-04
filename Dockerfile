# First
FROM node as builder

COPY package.json yarn.lock /app/

WORKDIR /app/

RUN yarn install --frozen-lockfile

COPY . /app/

RUN yarn run build

# Second
FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html
COPY ci/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Deamon off to tell nginx to run at foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
