FROM node:24.22.1-alpine3.24

WORKDIR /usr/local/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev \
    && npm cache clean --force

COPY --chown=node:node server.js ./server.js
COPY --chown=node:node data ./data
COPY --chown=node:node templates ./templates

USER node

EXPOSE 5001

CMD ["node", "server.js"]
