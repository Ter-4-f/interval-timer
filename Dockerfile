FROM node:alpine
WORKDIR /app

ENV HTTPS=true
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
