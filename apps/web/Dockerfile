FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Next.js expects PORT from env
ENV HOST=0.0.0.0
ENV PORT=20002

RUN npm run build

EXPOSE 20002

CMD ["npm", "run", "start"]