FROM node:14-buster-slim

ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD ["node", "server.js"]