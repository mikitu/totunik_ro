#!/bin/bash
set -e

# === Paths ===
ROOT_DIR=$(pwd)
CMS_SRC="$ROOT_DIR/apps/cms"
WEB_SRC="$ROOT_DIR/apps/web"
CMS_TARGET="/home/totk/admin.totunik.ro"
WEB_TARGET="/home/totk/new.totunik.ro"

echo "=== Building Strapi (CMS) ==="
cd $CMS_SRC
pnpm install --prod=false
pnpm build

echo "=== Deploying Strapi to $CMS_TARGET ==="
rm -rf $CMS_TARGET/*
mkdir -p $CMS_TARGET
cp -r build config src package.json pnpm-lock.yaml $CMS_TARGET/

# Create Passenger startup file for Strapi
cat > $CMS_TARGET/app.js <<'EOF'
const strapi = require('@strapi/strapi');
strapi().start();
EOF

# Install production dependencies inside target
cd $CMS_TARGET
pnpm install --prod

echo "=== Building Next.js (Web) ==="
cd $WEB_SRC
pnpm install --prod=false
pnpm build
pnpm export   # generates "out/" for static export

echo "=== Deploying Next.js static site to $WEB_TARGET ==="
rm -rf $WEB_TARGET/*
mkdir -p $WEB_TARGET
cp -r out/* $WEB_TARGET/

echo "=== Setting ownership ==="
chown -R totk:totk $CMS_TARGET
chown -R totk:totk $WEB_TARGET

# Restart Passenger app (Strapi) via cPanel magic
# Touching tmp/restart.txt tells Passenger to reload
mkdir -p $CMS_TARGET/tmp
touch $CMS_TARGET/tmp/restart.txt

echo "=== Deployment completed successfully! ==="