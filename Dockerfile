FROM node:18 as base
WORKDIR /app
COPY . ./
RUN npm install --force

CMD ["npm", "run", "dev"]
EXPOSE 3000