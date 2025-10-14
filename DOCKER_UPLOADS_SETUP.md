# Docker Uploads Configuration

This document explains the setup for persistent file uploads in the Strapi CMS Docker container.

## 🐛 Problem

The `public/uploads/` directory was empty in the Docker container because uploaded files were stored inside the container's filesystem, which gets reset when the container restarts.

## ✅ Solution

### 1. Volume Mount Configuration

Added a volume mount in `docker-compose.yml` to persist uploads:

```yaml
services:
  cms:
    # ... other configuration
    volumes:
      - ./apps/cms/public/uploads:/app/public/uploads
```

This mounts the host directory `./apps/cms/public/uploads` to the container's `/app/public/uploads` directory.

### 2. Dockerfile Improvements

Updated `apps/cms/Dockerfile` to ensure proper permissions:

```dockerfile
# Ensure uploads folder exists with proper permissions
RUN mkdir -p /app/public/uploads && chmod 755 /app/public/uploads
```

### 3. Deployment Script

Created `docker-deploy.sh` script for easy container management:

```bash
# Deploy with uploads check
./docker-deploy.sh deploy

# Check status and uploads
./docker-deploy.sh status

# View logs
./docker-deploy.sh logs
```

## 📁 Directory Structure

```
apps/cms/public/uploads/
├── original_files.jpg
├── large_resized_files.jpg
├── medium_resized_files.jpg
├── small_resized_files.jpg
└── thumbnail_files.jpg
```

## 🔧 How It Works

1. **Host Storage**: Files are stored on the host machine in `./apps/cms/public/uploads/`
2. **Container Access**: Container accesses files via volume mount at `/app/public/uploads`
3. **Persistence**: Files survive container restarts and rebuilds
4. **Permissions**: Directory has proper read/write permissions (755)

## 🚀 Deployment Process

### Initial Deployment

```bash
# Stop existing containers
docker-compose down

# Pull latest images
docker-compose pull

# Start with volume mounts
docker-compose up -d

# Verify uploads are mounted
docker-compose exec cms ls -la /app/public/uploads
```

### Using the Deployment Script

```bash
# Full deployment
./docker-deploy.sh deploy

# Check if uploads are properly mounted
./docker-deploy.sh status
```

## 📊 Verification

### Check Host Directory
```bash
ls -la ./apps/cms/public/uploads/
# Should show all uploaded files
```

### Check Container Directory
```bash
docker-compose exec cms ls -la /app/public/uploads/
# Should show the same files as host
```

### Check File Count Match
```bash
# Host files
echo "Host files: $(ls -1 ./apps/cms/public/uploads/ | wc -l)"

# Container files
echo "Container files: $(docker-compose exec cms ls -1 /app/public/uploads/ | wc -l)"
```

## 🔍 Troubleshooting

### Issue: Container uploads directory is empty

**Solution:**
1. Stop containers: `docker-compose down`
2. Ensure host directory exists: `mkdir -p ./apps/cms/public/uploads`
3. Set permissions: `chmod 755 ./apps/cms/public/uploads`
4. Restart containers: `docker-compose up -d`

### Issue: Permission denied errors

**Solution:**
1. Check directory permissions: `ls -la ./apps/cms/public/`
2. Fix permissions: `chmod 755 ./apps/cms/public/uploads`
3. Restart containers: `docker-compose restart cms`

### Issue: Files not syncing between host and container

**Solution:**
1. Verify volume mount in docker-compose.yml
2. Check if path is correct: `./apps/cms/public/uploads:/app/public/uploads`
3. Restart containers: `docker-compose down && docker-compose up -d`

## 📝 Important Notes

1. **Backup**: Always backup the `./apps/cms/public/uploads/` directory before major changes
2. **Permissions**: The uploads directory needs 755 permissions for Strapi to write files
3. **Path Consistency**: Ensure the volume mount path matches Strapi's upload configuration
4. **Container Rebuilds**: Files persist even when rebuilding containers thanks to volume mounts

## 🎯 Benefits

- ✅ **Persistent Storage**: Files survive container restarts
- ✅ **Easy Backup**: Files are stored on host filesystem
- ✅ **Development Friendly**: Local files are immediately available in container
- ✅ **Production Ready**: Same setup works in production environments
- ✅ **Performance**: No file copying needed, direct mount access

## 🔗 Related Files

- `docker-compose.yml` - Volume mount configuration
- `apps/cms/Dockerfile` - Container setup with permissions
- `docker-deploy.sh` - Deployment and management script
- `apps/cms/config/plugins.js` - Strapi upload plugin configuration (if customized)

This setup ensures that all uploaded media files are properly persisted and accessible both from the host machine and within the Docker container.
