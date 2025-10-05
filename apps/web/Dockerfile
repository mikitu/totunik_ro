# Use Debian-based Node 20 image
FROM node:20-buster-slim

# Set working directory
WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port (default Next.js start = 3000)
EXPOSE 3000

# Run Next.js in production mode
CMD ["npm", "run", "start"]