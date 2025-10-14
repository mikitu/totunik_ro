# Use a modern Node version on Debian 12 (Bookworm)
FROM node:20-bookworm-slim

# Install Git (needed for dependencies pulled from GitHub)
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Ensure uploads folder exists with proper permissions
# Note: For Render.com, consider using external storage (S3, Cloudinary, etc.)
# as the filesystem is ephemeral and files will be lost on restart
RUN mkdir -p /app/public/uploads && chmod 755 /app/public/uploads

# Build Strapi
RUN npm run build

# Expose port
EXPOSE 1337

# Start Strapi
CMD ["npm", "start"]
