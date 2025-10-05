# Use Debian-based image
FROM node:20-buster-slim

# Set working directory
WORKDIR /app

# Install dependencies first (for caching)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the source
COPY . .

# Build Strapi
RUN npm run build

# Expose Strapi’s default port
EXPOSE 1337

# Start Strapi
CMD ["npm", "start"]