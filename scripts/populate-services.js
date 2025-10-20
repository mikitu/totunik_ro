const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'totunik-ro'
});

async function populateServices() {
  try {
    await connection.connect();
    console.log('Connected to database');

    // First, let's create the services page content
    const servicesPageData = {
      hero: {
        title: "Our Professional Services",
        subtitle: "Complete coating solutions for every project",
        description: "From residential buildings to industrial facilities, we provide comprehensive coating services using premium Jotun products. Our expert team ensures quality, durability, and aesthetic excellence in every project.",
        backgroundImage: null
      },
      cta: {
        headline: "Ready to Start Your Project?",
        description: "Get a free consultation and quote for your coating project. Our experts will help you choose the right solution for your specific needs.",
        primaryButton: {
          label: "Get Free Quote",
          url: "/contact"
        },
        secondaryButton: {
          label: "View Portfolio", 
          url: "/projects-portfolio"
        },
        backgroundImage: null
      }
    };

    // Insert services page
    const [servicesPageResult] = await connection.execute(`
      INSERT INTO services_pages (
        hero, cta, published_at, created_at, updated_at, locale
      ) VALUES (?, ?, NOW(), NOW(), NOW(), 'en')
      ON DUPLICATE KEY UPDATE
        hero = VALUES(hero),
        cta = VALUES(cta),
        updated_at = NOW()
    `, [
      JSON.stringify(servicesPageData.hero),
      JSON.stringify(servicesPageData.cta)
    ]);

    console.log('Services page created/updated');

    // Create individual services
    const services = [
      {
        title: "Residential Coating",
        subtitle: "Transform your home with premium Jotun paints",
        description: "Our residential coating services bring new life to your home with premium Jotun paints and professional application techniques. From color consultation to final touch-ups, we ensure your home looks beautiful and stays protected.",
        slug: "residential-coating",
        shortDescription: "Professional interior and exterior painting services for homes, apartments, and residential complexes using premium Jotun paints.",
        features: [
          { title: "Interior Painting", description: "Complete interior painting services for all rooms, including walls, ceilings, and trim work.", icon: "🏠" },
          { title: "Exterior Painting", description: "Weather-resistant exterior coatings that protect and beautify your home's exterior surfaces.", icon: "🎨" },
          { title: "Color Consultation", description: "Professional color matching and consultation to help you choose the perfect palette.", icon: "🎯" },
          { title: "Surface Preparation", description: "Thorough surface preparation including cleaning, sanding, and priming for optimal results.", icon: "🔧" }
        ],
        process: [
          { step: 1, title: "Initial Consultation", description: "We visit your property to assess the scope of work and discuss your vision and requirements." },
          { step: 2, title: "Color Selection", description: "Our experts help you choose the perfect colors and finishes from Jotun's premium range." },
          { step: 3, title: "Surface Preparation", description: "We thoroughly prepare all surfaces, including cleaning, repairs, and priming as needed." },
          { step: 4, title: "Professional Application", description: "Our skilled painters apply the coatings using professional techniques for a flawless finish." },
          { step: 5, title: "Quality Inspection", description: "We conduct a thorough inspection and touch-up any areas to ensure perfect results." }
        ],
        benefitsSection: {
          title: "Why Choose Our Residential Services?",
          description: "We deliver exceptional results through our commitment to quality, professional expertise, and customer satisfaction.",
          benefits: [
            { text: "Premium Jotun paint products" },
            { text: "Professional application techniques" },
            { text: "Color consultation included" },
            { text: "Surface preparation and priming" },
            { text: "Clean-up and disposal included" },
            { text: "Quality guarantee" },
            { text: "Competitive pricing" },
            { text: "Experienced team" }
          ]
        },
        ctaSection: {
          title: "Get Started Today",
          description: "Ready to transform your home with our professional residential coating services? Contact us for a free consultation and detailed quote.",
          features: [
            { text: "Free Consultation", icon: "✓" },
            { text: "Quality Guarantee", icon: "✓" },
            { text: "Expert Team", icon: "✓" }
          ]
        },
        processCta: {
          title: "Ready to Get Started?",
          description: "Let's discuss your residential project and create a customized solution that meets your specific needs.",
          primaryButton: { label: "Start Your Project", url: "/contact" },
          secondaryButton: { label: "Call Now", url: "tel:+1234567890" }
        },
        gallerySection: {
          title: "Our Residential Work",
          description: "See examples of our professional residential coating projects and the quality results we deliver.",
          images: []
        },
        isActive: true,
        isFeatured: true,
        sortOrder: 1
      }
    ];

    for (const service of services) {
      const [result] = await connection.execute(`
        INSERT INTO services (
          title, subtitle, description, slug, short_description,
          features, process, benefits_section, cta_section, process_cta, gallery_section,
          is_active, is_featured, sort_order, published_at, created_at, updated_at, locale, document_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW(), 'en', UUID())
        ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          subtitle = VALUES(subtitle),
          description = VALUES(description),
          short_description = VALUES(short_description),
          features = VALUES(features),
          process = VALUES(process),
          benefits_section = VALUES(benefits_section),
          cta_section = VALUES(cta_section),
          process_cta = VALUES(process_cta),
          gallery_section = VALUES(gallery_section),
          updated_at = NOW()
      `, [
        service.title,
        service.subtitle,
        service.description,
        service.slug,
        service.shortDescription,
        JSON.stringify(service.features),
        JSON.stringify(service.process),
        JSON.stringify(service.benefitsSection),
        JSON.stringify(service.ctaSection),
        JSON.stringify(service.processCta),
        JSON.stringify(service.gallerySection),
        service.isActive,
        service.isFeatured,
        service.sortOrder
      ]);

      console.log(`Service "${service.title}" created/updated`);
    }

    console.log('All services populated successfully!');

  } catch (error) {
    console.error('Error populating services:', error);
  } finally {
    await connection.end();
  }
}

populateServices();
