# Use the official Node.js image from Docker Hub
FROM node:latest

# Set the working directory to /workspace
WORKDIR /workspace

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --verbose

# Copy all the source code to the container
COPY . .

# Expose port 3000 for the application (if your app uses this port)
EXPOSE 3000

# Define the command to run when the container starts
CMD ["npm", "start"]
