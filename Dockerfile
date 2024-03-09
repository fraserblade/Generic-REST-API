# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY items.json .
COPY app.js .

# Expose the port that the app will listen on
EXPOSE 3000

# Command to run the application
CMD [ "node", "app.js" ]