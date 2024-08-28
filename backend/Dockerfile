# Use a slim version of Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including devDependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Copy the .env file to the container
COPY .env .env

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["npm", "run", "start"]


