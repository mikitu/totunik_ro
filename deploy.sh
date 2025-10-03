#!/bin/bash
set -e

# Paths
CMS_SRC="apps/cms"
WEB_SRC="apps/web"
CMS_TARGET="/home/totk/admin.totunik.ro"
WEB_TARGET="/home/totk/new.totunik.ro"

echo "=== Building Strapi (CMS) ==="
cd $CMS_SRC
npm install --production=false
npm run build

echo "=== Deploying Strapi to $CMS_TARGET ==="
rm -rf $CMS_TARGET/*
cp -r . $CMS_TARGET/
cd -

echo "=== Building Next.js (Web) ==="
cd $WEB_SRC
npm install --production=false
npm run build
npm run export   # ensures static export into "out/"
echo "=== Deploying Next.js static site to $WEB_TARGET ==="
rm -rf $WEB_TARGET/*
cp -r out/* $WEB_TARGET/
cd -

echo "=== Deployment completed successfully! ==="