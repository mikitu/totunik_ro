FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Strapi expects HOST/PORT from env
ENV HOST=0.0.0.0
ENV PORT=20001

RUN npm run build

EXPOSE 20001

CMD ["npm", "run", "start"]