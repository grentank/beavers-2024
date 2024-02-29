FROM node:20-alpine3.17
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]