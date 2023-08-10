FROM node:12.18.2-alpine3.9
COPY update-actions.js /bin/update-actions.js
COPY root /var/spool/cron/crontabs/root
RUN chmod +x /bin/update-actions.js
CMD crond -f