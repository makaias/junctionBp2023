FROM node:18-alpine as build

WORKDIR /app/

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npm run build

from nginx:1.21-alpine

COPY --from=build /app/dist /var/www/html
RUN echo -e '\
server { \n\
  listen 80; \n\
  listen [::]:80; \n\
  root /var/www/html; \n\
  index index.html \n\
  server_name _; \n\
  location / { \n\
    try_files $uri $uri/ =404; \n\
  } \n\

  location /socket.io { \n\
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \n\
    proxy_set_header Host $host; \n\
    proxy_pass $BACKEND_URL/socket.io; \n\
    proxy_http_version 1.1; \n\
    proxy_set_header Upgrade $http_upgrade; \n\
    proxy_set_header Connection "upgrade"; \n\
  } \n\
} \n\
' > /etc/nginx/conf.d/default.conf.template && echo "config file template created"

# ENTRYPOINT ["/bin/sh", "-c"]
CMD /bin/sh -c "envsubst '$'BACKEND_URL < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && \
  cat /etc/nginx/conf.d/default.conf && \
  nginx -g 'daemon off;'"
