FROM node:18-alpine3.14
WORKDIR /app
COPY . ./
RUN npm i
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "dev"]
