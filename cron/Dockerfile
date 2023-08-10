FROM node:12.18.2-alpine3.9
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
COPY root /var/spool/cron/crontabs/root
# RUN chmod +x /bin/update-actions.js
CMD crond -f