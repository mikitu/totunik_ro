# Strapi Setup for Dynamic Pages

This document explains how to set up Strapi to work with the dynamic page
routing in the Next.js application.

## 1. Create the Pages Content Type

1. Open Strapi admin panel at http://localhost:1337/admin
2. Go to Content-Types Builder
3. Create a new Collection Type called "Page"
4. Add the following fields:
   - **title** (Text - Short text, required)
   - **content** (Rich text - Rich text editor, required)
   - **slug** (Text - Short text, required, unique)

## 2. Configure API Permissions

1. Go to Settings > Users & Permissions plugin > Roles
2. Click on "Public" role
3. Under "Page" permissions, enable:
   - `find` (to get all pages)
   - `findOne` (to get a single page)
4. Save the changes

## 3. Create Sample Content

1. Go to Content Manager > Page
2. Create a new page with:
   - Title: "About Us"
   - Slug: "about-us"
   - Content: "This is the about us page content..."
3. Publish the page

## 4. Test the API

You can test the API endpoints:

```bash
# Get all pages
curl http://localhost:1337/api/pages

# Get a specific page by slug
curl "http://localhost:1337/api/pages?filters[slug][\$eq]=about-us"
```

## 5. Access the Dynamic Route

Once set up, you can access your dynamic pages at:

- http://localhost:3001/about-us
- http://localhost:3001/[any-other-slug]

## Environment Variables

Make sure your `.env.local` file in the web app contains:

```
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=
```

If you need to use a private API token, create one in Strapi admin under
Settings > API Tokens and add it to the `STRAPI_API_TOKEN` variable.
