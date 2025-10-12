# Jotun Products Page - Strapi CMS Setup

## Overview

This document outlines the complete Strapi CMS structure created for the Jotun Products page, enabling content managers to edit all page content through the admin interface.

## Content Types Created

### 1. Main Content Type: `jotun-page` (Single Type)
**File**: `apps/cms/src/api/jotun-page/content-types/jotun-page/schema.json`

**Purpose**: Main container for the entire Jotun Products page
**Type**: Single Type (only one instance)
**Fields**:
- `Hero` - Jotun Hero component
- `Introduction` - Jotun Introduction component  
- `ProductCategories` - Product Categories section
- `FeaturedProducts` - Featured Products section
- `CTA` - Call-to-action section
- `seo` - SEO metadata

## Components Created

### 2. Jotun Hero Component
**File**: `apps/cms/src/components/jotun/hero.json`

**Fields**:
- `headline` (string) - Main headline
- `tagline` (text) - Supporting tagline
- `ctaButton` (shared.button) - Call-to-action button
- `backgroundImage` (media) - Optional background image
- `brandIcon` (media) - Optional brand icon

### 3. Jotun Introduction Component
**File**: `apps/cms/src/components/jotun/introduction.json`

**Fields**:
- `content` (richtext) - Main introduction content (supports markdown)
- `highlights` (partnership-highlight[]) - Array of 3 partnership highlights

### 4. Partnership Highlight Component
**File**: `apps/cms/src/components/jotun/partnership-highlight.json`

**Fields**:
- `title` (string) - Highlight title
- `description` (text) - Highlight description
- `icon` (enum) - Icon type: certified, performance, eco-friendly, support, quality, delivery
- `color` (enum) - Color scheme: blue, orange, green, purple, red, gray

### 5. Product Categories Component
**File**: `apps/cms/src/components/jotun/product-categories.json`

**Fields**:
- `title` (string) - Section title
- `subtitle` (text) - Section subtitle
- `categories` (product-category[]) - Array of product categories

### 6. Product Category Component
**File**: `apps/cms/src/components/jotun/product-category.json`

**Fields**:
- `title` (string) - Category title
- `description` (text) - Category description
- `icon` (enum) - Icon type: interior, exterior, protective, wood-metal, industrial, marine, automotive, decorative
- `color` (enum) - Color scheme: blue, green, orange, purple, red, gray, teal, indigo
- `features` (shared.feature[]) - Array of features (1-6 items)
- `ctaButton` (shared.button) - Optional CTA button
- `image` (media) - Optional category image

### 7. Featured Products Component
**File**: `apps/cms/src/components/jotun/featured-products.json`

**Fields**:
- `title` (string) - Section title
- `subtitle` (text) - Section subtitle
- `products` (featured-product[]) - Array of featured products
- `viewAllButton` (shared.button) - Optional "View All" button

### 8. Featured Product Component
**File**: `apps/cms/src/components/jotun/featured-product.json`

**Fields**:
- `name` (string) - Product name
- `category` (string) - Product category
- `description` (text) - Product description
- `image` (media) - Product image
- `badge` (enum) - Badge type: Best Seller, Premium, Industrial, Eco-Friendly, New, Popular, Professional, Marine Grade
- `badgeColor` (enum) - Badge color
- `features` (shared.feature[]) - Product features (1-6 items)
- `learnMoreButton` (shared.button) - Learn more button
- `datasheetButton` (shared.button) - Datasheet button
- `productCode` (string) - Optional product code
- `technicalSpecs` (json) - Optional technical specifications

### 9. Jotun CTA Component
**File**: `apps/cms/src/components/jotun/cta.json`

**Fields**:
- `headline` (string) - Main CTA headline
- `subtitle` (text) - Supporting subtitle
- `primaryButton` (shared.button) - Primary CTA button
- `secondaryButton` (shared.button) - Secondary CTA button
- `benefits` (partnership-highlight[]) - Array of 3 benefits
- `downloadSection` (download-section) - Technical documentation section
- `backgroundImage` (media) - Optional background image

### 10. Download Section Component
**File**: `apps/cms/src/components/jotun/download-section.json`

**Fields**:
- `title` (string) - Download section title
- `description` (text) - Download section description
- `downloads` (shared.download-item[]) - Array of downloadable items

## Shared Components Created

### 11. Feature Component
**File**: `apps/cms/src/components/shared/feature.json`

**Fields**:
- `text` (string) - Feature text
- `icon` (enum) - Icon type: check, star, shield, lightning, heart, award, thumbs-up, eco, quality, time

### 12. Download Item Component
**File**: `apps/cms/src/components/shared/download-item.json`

**Fields**:
- `label` (string) - Download label
- `file` (media) - Downloadable file
- `url` (string) - Alternative URL
- `icon` (enum) - Icon type: download, document, pdf, image, chart, catalog, datasheet, guide
- `fileSize` (string) - File size display
- `description` (text) - Optional description

### 13. SEO Component
**File**: `apps/cms/src/components/shared/seo.json`

**Fields**:
- `metaTitle` (string) - Page title (max 60 chars)
- `metaDescription` (text) - Meta description (max 160 chars)
- `keywords` (text) - SEO keywords
- `metaImage` (media) - Social media image
- `canonicalURL` (string) - Canonical URL
- `structuredData` (json) - Structured data markup

## Frontend Integration

### Updated TypeScript Interfaces
**File**: `apps/web/src/lib/strapi.ts`

Added comprehensive TypeScript interfaces for all Jotun page components:
- `StrapiJotunHero`
- `StrapiJotunIntroduction`
- `StrapiPartnershipHighlight`
- `StrapiJotunProductCategories`
- `StrapiProductCategory`
- `StrapiFeaturedProduct`
- `StrapiJotunFeaturedProducts`
- `StrapiJotunCTA`
- `StrapiDownloadSection`
- `StrapiDownloadItem`
- `StrapiFeature`
- `StrapiSEO`
- `StrapiJotunPage`

### API Method
Added `getJotunPage()` method to fetch complete page data with all nested relationships.

### Updated Components
Modified frontend components to accept and render Strapi data:
- `JotunHero` - Now accepts `hero` prop
- `JotunIntroduction` - Now accepts `introduction` prop with dynamic highlights
- `JotunProductCategories` - Now accepts `productCategories` prop with dynamic categories
- `JotunFeaturedProducts` - Ready for Strapi integration
- `JotunCTA` - Ready for Strapi integration

### Page Implementation
**File**: `apps/web/src/app/[locale]/jotun-products/page.tsx`

- Fetches data from Strapi using `strapiAPI.getJotunPage()`
- Generates dynamic metadata from SEO component
- Conditionally renders sections based on available data
- Handles 404 cases when page data is not found

## Content Management Features

### Flexible Content Structure
- **Modular Design**: Each section is a separate component for maximum flexibility
- **Reusable Components**: Shared components can be used across different pages
- **Rich Text Support**: Introduction content supports markdown formatting
- **Media Management**: Support for images, files, and downloads
- **SEO Optimization**: Built-in SEO fields for search engine optimization

### Content Editor Benefits
- **Visual Organization**: Clear section-based structure
- **Easy Updates**: Edit content without touching code
- **Media Library**: Upload and manage images and files
- **Preview Support**: Draft and publish workflow
- **Validation**: Required fields ensure content completeness

## Setup Instructions

### 1. Strapi Setup
1. Ensure all component files are in place
2. Restart Strapi server to register new content types
3. Access admin panel and create the Jotun Page content
4. Populate all sections with content

### 2. Frontend Setup
1. TypeScript interfaces are already added
2. API method is implemented
3. Components are updated to use Strapi data
4. Page is configured for dynamic content

### 3. Content Population
1. Create Hero section with headline, tagline, and CTA
2. Add Introduction content with 3 partnership highlights
3. Create 4 product categories with features
4. Add featured products with badges and specifications
5. Configure CTA section with buttons and benefits
6. Set up SEO metadata

## Benefits

### For Content Managers
- **No Code Changes**: Update content through admin interface
- **Rich Editing**: Markdown support for formatted content
- **Media Management**: Easy image and file uploads
- **SEO Control**: Direct control over meta tags and descriptions
- **Preview Mode**: Test changes before publishing

### For Developers
- **Type Safety**: Full TypeScript support
- **Maintainable**: Clean separation of content and code
- **Scalable**: Easy to add new sections or modify existing ones
- **Consistent**: Standardized component structure
- **Flexible**: Support for multiple content variations

The Jotun Products page is now fully integrated with Strapi CMS, providing a powerful and flexible content management solution that maintains the professional design while enabling easy content updates.
