# Use the nginx base image for static website
FROM nginx

# Copy static website files to server
COPY ./src/static /usr/share/nginx/html

# Expose port 80
EXPOSE 80