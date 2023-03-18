
FROM node:14.9
 
WORKDIR /frontApp
 
COPY package.json /frontApp/package.json
 
RUN yarn
 
COPY . .
 
EXPOSE 3000
 
CMD [ "yarn", "run", "dev" ]