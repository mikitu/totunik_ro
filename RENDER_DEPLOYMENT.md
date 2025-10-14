# Render.com Deployment Guide

This guide covers deploying the Totunik.ro CMS to Render.com with proper file upload handling.

## 🚨 Important: File Upload Considerations

**Render.com uses ephemeral storage** - any files uploaded to the container's filesystem will be **lost when the container restarts**. This includes:
- Container restarts (automatic or manual)
- New deployments
- Service scaling events

## 📁 Current Upload Status

**Local Development**: 198 files in `apps/cms/public/uploads/`
**Render Deployment**: Files will be lost unless external storage is configured

## 🔧 Solutions for Persistent File Storage

### Option 1: AWS S3 (Recommended for Production)

1. **Install the S3 provider**:
```bash
cd apps/cms
npm install @strapi/provider-upload-aws-s3
```

2. **Update `config/plugins.ts`**:
```typescript
upload: {
  config: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_ACCESS_SECRET'),
      region: env('AWS_REGION', 'us-east-1'),
      params: {
        Bucket: env('AWS_BUCKET_NAME'),
      },
    },
  },
},
```

3. **Set Render environment variables**:
- `AWS_ACCESS_KEY_ID`
- `AWS_ACCESS_SECRET`
- `AWS_REGION`
- `AWS_BUCKET_NAME`

### Option 2: Cloudinary (Easiest Setup)

1. **Install the Cloudinary provider**:
```bash
cd apps/cms
npm install @strapi/provider-upload-cloudinary
```

2. **Update `config/plugins.ts`**:
```typescript
upload: {
  config: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
  },
},
```

3. **Set Render environment variables**:
- `CLOUDINARY_NAME`
- `CLOUDINARY_KEY`
- `CLOUDINARY_SECRET`

### Option 3: Keep Local Storage (Temporary)

If you want to proceed with local storage temporarily (files will be lost):
- Current configuration is already set up
- Files will be available until next restart
- **Not recommended for production**

## 🚀 Render.com Deployment Steps

### 1. Prepare the Repository

Ensure your `apps/cms/Dockerfile` is optimized:
```dockerfile
# Use a modern Node version
FROM node:20-bookworm-slim

# Install Git
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Create uploads directory (for local storage)
RUN mkdir -p /app/public/uploads && chmod 755 /app/public/uploads

# Build Strapi
RUN npm run build

# Expose port
EXPOSE $PORT

# Start Strapi
CMD ["npm", "start"]
```

### 2. Create Render Service

1. **Connect Repository**: Link your GitHub repository to Render
2. **Service Type**: Choose "Web Service"
3. **Root Directory**: Set to `apps/cms`
4. **Build Command**: `npm install --legacy-peer-deps && npm run build`
5. **Start Command**: `npm start`

### 3. Environment Variables

Set these in Render dashboard:

**Required**:
- `NODE_ENV=production`
- `HOST=0.0.0.0`
- `PORT=10000` (or let Render set this)
- `APP_KEYS=your-app-keys-here`
- `API_TOKEN_SALT=your-api-token-salt`
- `ADMIN_JWT_SECRET=your-admin-jwt-secret`
- `TRANSFER_TOKEN_SALT=your-transfer-token-salt`
- `JWT_SECRET=your-jwt-secret`

**Database** (if using external DB):
- `DATABASE_CLIENT=mysql` (or postgres)
- `DATABASE_HOST=your-db-host`
- `DATABASE_PORT=3306`
- `DATABASE_NAME=your-db-name`
- `DATABASE_USERNAME=your-db-user`
- `DATABASE_PASSWORD=your-db-password`

**Upload Provider** (choose one):
- AWS S3: `AWS_ACCESS_KEY_ID`, `AWS_ACCESS_SECRET`, `AWS_REGION`, `AWS_BUCKET_NAME`
- Cloudinary: `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`

### 4. Database Setup

Render offers PostgreSQL databases. To use:

1. **Create PostgreSQL Database** in Render
2. **Update `config/database.ts`**:
```typescript
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```

3. **Install PostgreSQL client**:
```bash
cd apps/cms
npm install pg
```

## 📋 Migration Strategy

### Migrating Existing Uploads

If you have existing uploads in `apps/cms/public/uploads/`:

1. **Set up external storage** (S3 or Cloudinary)
2. **Upload existing files** to the external service
3. **Update database URLs** to point to external URLs
4. **Deploy with new configuration**

### Database Migration

1. **Export local database** (if using local MySQL)
2. **Import to Render PostgreSQL** or external database
3. **Update connection strings**

## 🔍 Testing the Deployment

1. **Deploy to Render**
2. **Test file upload** in Strapi admin
3. **Verify files persist** after restart
4. **Check external storage** (S3/Cloudinary dashboard)

## ⚠️ Important Notes

- **Backup Strategy**: Always backup your database and uploads before migration
- **Environment Secrets**: Use Render's environment variables for sensitive data
- **SSL**: Render provides automatic SSL certificates
- **Custom Domain**: Configure custom domain in Render dashboard
- **Monitoring**: Use Render's built-in monitoring and logs

## 🎯 Recommended Next Steps

1. **Choose storage provider** (Cloudinary for simplicity, S3 for scalability)
2. **Install provider package** and update configuration
3. **Set up external database** (Render PostgreSQL)
4. **Configure environment variables** in Render
5. **Deploy and test** file upload functionality
6. **Migrate existing uploads** to external storage

This setup ensures your uploads persist across deployments and container restarts on Render.com.
