#!/bin/bash
set -e

# Define paths
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
cp -r . $CMS_TARGET/
cd $ROOT_DIR

echo "=== Building Next.js (Web) ==="
cd $WEB_SRC
pnpm install --prod=false
pnpm build
pnpm export   # produces static "out/" folder
echo "=== Deploying Next.js static site to $WEB_TARGET ==="
rm -rf $WEB_TARGET/*
cp -r out/* $WEB_TARGET/
cd $ROOT_DIR

echo "=== Setting ownership ==="
chown -R totk:totk /home/totk/admin.totunik.ro
chown -R totk:totk /home/totk/new.totunik.ro

echo "=== Deployment completed successfully! ==="