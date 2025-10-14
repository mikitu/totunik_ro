# Use an official Node.js runtime as a parent image
FROM node:20-buster-slim

# Install Git (needed for dependencies pulled from GitHub)
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install dependencies first
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build Strapi
RUN npm run build

# Expose Strapi port
EXPOSE 1337

# Start Strapi
CMD ["npm", "start"]
