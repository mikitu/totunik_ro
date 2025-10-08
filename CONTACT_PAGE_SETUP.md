# Contact Page Strapi Setup Guide

This guide will help you set up the Contact Page content type and components in Strapi.

## 🚀 Quick Setup

After adding all the component files, restart your Strapi server:

```bash
cd apps/cms
npm run develop
```

## 📋 Content Types Created

### 1. Contact Page (Single Type)
- **API ID**: `contact`
- **Collection Name**: `contact_pages`
- **Type**: Single Type (only one contact page)

## 🧩 Components Created

### Contact Components (`contact.*`)

1. **contact.hero** - Hero section with title, subtitle, and quick contact methods
2. **contact.quick-contact-method** - Individual quick contact items (phone, email)
3. **contact.contact-info** - Main contact information section
4. **contact.address** - Office address with coordinates
5. **contact.contact-method** - Individual contact methods (email, phone, etc.)
6. **contact.business-hours** - Operating hours information
7. **contact.company-details** - Legal company information
8. **contact.sales-team** - Sales team section with members
9. **contact.team-member** - Individual team member details
10. **contact.emergency-contact** - Emergency contact section
11. **contact.map-section** - Interactive map section
12. **contact.direction-item** - Transportation directions
13. **contact.quick-action** - Quick action buttons for map

## 📝 Setting Up Content in Strapi Admin

### 1. Access Contact Page
1. Go to Strapi Admin Panel
2. Navigate to **Content Manager**
3. Find **Contact** in the **Single Types** section
4. Click to create/edit the contact page

### 2. Configure Hero Section
```
Hero:
  - Title: "Get in Touch"
  - Subtitle: "Ready to transform your project with premium Jotun solutions? Our expert team is here to help you every step of the way."
  - Quick Contact Methods:
    * Type: phone, Label: "+40 744 482 099", Value: "+40744482099", URL: "tel:+40744482099"
    * Type: email, Label: "office@totunik.ro", Value: "office@totunik.ro", URL: "mailto:office@totunik.ro"
```

### 3. Configure Contact Info
```
Contact Info:
  - Title: "Contact Information"
  - Subtitle: "Reach out to us through any of these channels. We're here to help with all your coating needs."
  
  Office Address:
    - Street: "Street Barbu Vacarescu nr. 3, Parter"
    - City: "Bucharest"
    - District: "District 2"
    - Country: "ROMANIA"
    - Latitude: 44.4804
    - Longitude: 26.1089
  
  Contact Methods:
    * Type: email, Label: "Email", Value: "office@totunik.ro", URL: "mailto:office@totunik.ro"
    * Type: phone, Label: "Phone", Value: "+40 744 482 099", URL: "tel:+40744482099"
  
  Business Hours:
    - Title: "Business Hours"
    - Weekday Hours: "Monday - Friday: 8:00 AM - 6:00 PM"
    - Saturday Hours: "Saturday: 9:00 AM - 2:00 PM"
    - Sunday Hours: "Sunday: Closed"
  
  Company Details:
    - Company Name: "TOTUNIK S.R.L."
    - Tax Code: "RO25872617"
    - Registration Number: "J40/8734/2009"
```

### 4. Configure Sales Team
```
Sales Team:
  - Title: "Meet Our Sales Team"
  - Subtitle: "Our experienced sales professionals are ready to help you find the perfect Jotun solutions for your project."
  
  Team Members:
    1. Name: "Cristina OLTEANU", Role: "Sales Director", Phone: "+40 744 482 099", Email: "cristina@totunik.ro"
    2. Name: "Marian LEANCA", Role: "Area Sales Manager", Phone: "+40 728 124 611", Email: "marian.leanca@totunik.ro"
    3. Name: "Bogdan CRISTEA", Role: "Area Sales Manager", Phone: "+40 728 124 307", Email: "bogdan.cristea@totunik.ro"
    4. Name: "Alina Anghelus", Role: "Office Sales Support", Phone: "+40 728 033 105", Email: "comenzi@totunik.ro"
  
  Emergency Contact:
    - Title: "Need Immediate Assistance?"
    - Description: "For urgent inquiries or technical support, don't hesitate to call our main office line."
    - Primary Button: Label: "Call Now", URL: "tel:+40744482099"
    - Secondary Button: Label: "Send Email", URL: "mailto:office@totunik.ro"
```

### 5. Configure Map Section
```
Map:
  - Title: "Visit Our Office"
  - Subtitle: "Located in the heart of Bucharest, our office is easily accessible and equipped with everything needed to discuss your project requirements."
  - Show Map: true
  
  Location: (same as Contact Info address)
  
  Directions:
    * Type: metro, Title: "By Metro", Description: "Aurel Vlaicu Metro Station (5 min walk)", Color: blue
    * Type: car, Title: "By Car", Description: "Parking available on-site", Color: green
    * Type: walking, Title: "Business Hours", Description: "Mon-Fri: 8:00-18:00, Sat: 9:00-14:00", Color: yellow
  
  Quick Actions:
    * Type: directions, Label: "Get Directions", URL: "https://www.google.com/maps/dir/?api=1&destination=44.4804,26.1089", Color: blue
    * Type: call, Label: "Call Office", URL: "tel:+40744482099", Color: green
    * Type: copy, Label: "Copy Address", Value: "Street Barbu Vacarescu nr. 3, Parter, District 2, Bucharest, ROMANIA", Color: orange
```

## 🔧 API Endpoints

After setup, the following endpoints will be available:

- **GET** `/api/contact` - Get contact page data
- **PUT** `/api/contact` - Update contact page (admin only)

## 🎯 Frontend Integration

The contact page components are already created and will automatically use the Strapi data:

- `ContactHero` - Uses `Hero` data
- `ContactInfo` - Uses `ContactInfo` data  
- `ContactForm` - Static form (can be enhanced with Strapi form builder)
- `SalesTeam` - Uses `SalesTeam` data
- `ContactMap` - Uses `Map` data

## 📱 Usage in Next.js

The contact page at `/contact` will automatically fetch and display the Strapi content:

```typescript
// This is already implemented in apps/web/src/app/contact/page.tsx
const contactData = await strapiAPI.getContactPage();
```

## ✅ Checklist

- [ ] All component files created in `apps/cms/src/components/contact/`
- [ ] Contact API files created in `apps/cms/src/api/contact/`
- [ ] Strapi server restarted
- [ ] Contact page content created in Strapi admin
- [ ] All sections configured with sample data
- [ ] Contact page published in Strapi
- [ ] Frontend contact page accessible at `/contact`

## 🎨 Customization

You can customize the contact page by:

1. **Adding more team members** in the Sales Team section
2. **Adding more contact methods** (WhatsApp, Skype, etc.)
3. **Customizing business hours** for different locations
4. **Adding more quick actions** in the map section
5. **Adding custom fields** to team members (specialties, languages)

## 🚨 Troubleshooting

If components don't appear in Strapi admin:
1. Check that all JSON files are valid
2. Restart Strapi server completely
3. Check Strapi logs for any errors
4. Ensure component names match exactly in schema.json

**Common Error Fixed:**
- Removed `shared.seo` component reference (component didn't exist)
- Contact page now works without SEO component
- SEO can be added later if needed

The contact page is now fully integrated with Strapi and ready for content management! 🎉
