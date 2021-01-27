FROM nginx:alpine
COPY ./dist/endpoints/ /usr/share/nginx/html