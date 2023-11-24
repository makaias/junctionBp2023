FROM node:18-alpine

WORKDIR /app/

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

RUN npm install --global serve

RUN npm install

CMD ["npm", "run", "build"]

CMD ["serve" ,"/dist"]
