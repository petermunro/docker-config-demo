FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY app.js .
COPY public/ ./public/
RUN mkdir -p /app/config
EXPOSE 3000
CMD ["node", "app.js"]
