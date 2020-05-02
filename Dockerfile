# First
FROM node as builder

COPY . /app/

WORKDIR /app/

RUN yarn
RUN yarn run build

# Second
FROM nginx

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /app/

EXPOSE 80

# Deamon off to tell nginx to run at foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
