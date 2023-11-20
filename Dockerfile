FROM node:18

WORKDIR /frontend

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]