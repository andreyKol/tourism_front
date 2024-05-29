FROM node:lts-alpine
WORKDIR /usr/src/medical_chat_frontend
COPY ["./package.json","./package-lock.json*","./"]
RUN npm install
COPY . .
RUN chown -R node /usr/src/medical_chat_frontend
USER node
RUN npm run build
CMD ["npm","run", "preview"]
