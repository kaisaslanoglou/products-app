# version of node to use
FROM node:20

# Directory to save image
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure that both package and package-log arecopied
COPY package*.json ./
RUN npm install
# Copy all files to /app
COPY . .
EXPOSE 3003
CMD ["npm", "run", "start"]
