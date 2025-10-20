const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function createServicesContent() {
  try {
    console.log('Creating services content...');

    // Create Services Page content
    const servicesPageData = {
      data: {
        hero: {
          title: "Our Professional Services",
          subtitle: "Complete coating solutions for every project",
          description: "From residential buildings to industrial facilities, we provide comprehensive coating services using premium Jotun products. Our expert team ensures quality, durability, and aesthetic excellence in every project."
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
          }
        },
        locale: 'en'
      }
    };

    // Create or update services page
    try {
      const servicesPageResponse = await axios.put(`${STRAPI_URL}/api/services-page`, servicesPageData);
      console.log('✅ Services page created/updated');
    } catch (error) {
      console.log('❌ Error creating services page:', error.response?.data || error.message);
    }

    // Create individual service
    const serviceData = {
      data: {
        title: "Residential Coating",
        subtitle: "Transform your home with premium Jotun paints",
        description: "Our residential coating services bring new life to your home with premium Jotun paints and professional application techniques. From color consultation to final touch-ups, we ensure your home looks beautiful and stays protected.",
        slug: "residential-coating",
        shortDescription: "Professional interior and exterior painting services for homes, apartments, and residential complexes using premium Jotun paints.",
        features: [
          {
            title: "Interior Painting",
            description: "Complete interior painting services for all rooms, including walls, ceilings, and trim work.",
            icon: "🏠"
          },
          {
            title: "Exterior Painting", 
            description: "Weather-resistant exterior coatings that protect and beautify your home's exterior surfaces.",
            icon: "🎨"
          },
          {
            title: "Color Consultation",
            description: "Professional color matching and consultation to help you choose the perfect palette.",
            icon: "🎯"
          },
          {
            title: "Surface Preparation",
            description: "Thorough surface preparation including cleaning, sanding, and priming for optimal results.",
            icon: "🔧"
          }
        ],
        process: [
          {
            step: 1,
            title: "Initial Consultation",
            description: "We visit your property to assess the scope of work and discuss your vision and requirements."
          },
          {
            step: 2,
            title: "Color Selection",
            description: "Our experts help you choose the perfect colors and finishes from Jotun's premium range."
          },
          {
            step: 3,
            title: "Surface Preparation",
            description: "We thoroughly prepare all surfaces, including cleaning, repairs, and priming as needed."
          },
          {
            step: 4,
            title: "Professional Application",
            description: "Our skilled painters apply the coatings using professional techniques for a flawless finish."
          },
          {
            step: 5,
            title: "Quality Inspection",
            description: "We conduct a thorough inspection and touch-up any areas to ensure perfect results."
          }
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
          primaryButton: {
            label: "Start Your Project",
            url: "/contact"
          },
          secondaryButton: {
            label: "Call Now",
            url: "tel:+1234567890"
          }
        },
        gallerySection: {
          title: "Our Residential Work",
          description: "See examples of our professional residential coating projects and the quality results we deliver.",
          images: []
        },
        isActive: true,
        isFeatured: true,
        sortOrder: 1,
        locale: 'en'
      }
    };

    // Create service
    try {
      const serviceResponse = await axios.post(`${STRAPI_URL}/api/services`, serviceData);
      console.log('✅ Residential service created');
      
      // Publish the service
      const serviceId = serviceResponse.data.data.documentId;
      await axios.post(`${STRAPI_URL}/api/services/${serviceId}/actions/publish`);
      console.log('✅ Residential service published');
    } catch (error) {
      console.log('❌ Error creating service:', error.response?.data || error.message);
    }

    console.log('🎉 Services content creation completed!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createServicesContent();
