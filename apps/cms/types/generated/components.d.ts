import type { Schema, Struct } from '@strapi/strapi';

export interface BusinessPartnersCaseStudiesSection
  extends Struct.ComponentSchema {
  collectionName: 'components_business_partners_case_studies_sections';
  info: {
    description: 'Case studies and partner examples section';
    displayName: 'Case Studies Section';
  };
  attributes: {
    caseStudies: Schema.Attribute.Component<
      'business-partners.case-study-item',
      true
    >;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Partner Examples & Case Studies'>;
  };
}

export interface BusinessPartnersCaseStudyItem extends Struct.ComponentSchema {
  collectionName: 'components_business_partners_case_study_items';
  info: {
    description: 'Individual case study or partner example';
    displayName: 'Case Study Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'elements.link', false>;
    partnerName: Schema.Attribute.String;
    stats: Schema.Attribute.Component<
      'business-partners.case-study-stat',
      true
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BusinessPartnersCaseStudyStat extends Struct.ComponentSchema {
  collectionName: 'components_business_partners_case_study_stats';
  info: {
    description: 'Statistics for case studies (e.g., 300 apartments, 150 homes)';
    displayName: 'Case Study Stat';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String;
  };
}

export interface BusinessPartnersCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_business_partners_cta_sections';
  info: {
    description: 'Call to action section for business partner pages';
    displayName: 'CTA Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    primaryButton: Schema.Attribute.Component<'elements.link', false>;
    secondaryButton: Schema.Attribute.Component<'elements.link', false>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BusinessPartnersHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_business_partners_hero_sections';
  info: {
    description: 'Hero section for business partner pages';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    icon: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BusinessPartnersIntroductionSection
  extends Struct.ComponentSchema {
  collectionName: 'components_business_partners_introduction_sections';
  info: {
    description: 'Introduction paragraph for business partner pages';
    displayName: 'Introduction Section';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface BusinessPartnersTestimonialItem
  extends Struct.ComponentSchema {
  collectionName: 'components_business_partners_testimonial_items';
  info: {
    description: 'Individual testimonial quote';
    displayName: 'Testimonial Item';
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.Required;
    avatar: Schema.Attribute.Media<'images'>;
    company: Schema.Attribute.String;
    position: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
  };
}

export interface BusinessPartnersTestimonialsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_business_partners_testimonials_sections';
  info: {
    description: 'Testimonials section for business partner pages';
    displayName: 'Testimonials Section';
  };
  attributes: {
    subtitle: Schema.Attribute.Text;
    testimonials: Schema.Attribute.Component<
      'business-partners.testimonial-item',
      true
    >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'What Our Partners Say'>;
  };
}

export interface BusinessCategoryCard extends Struct.ComponentSchema {
  collectionName: 'components_business_category_cards';
  info: {
    description: 'Card for partnership categories (Residential/Commercial)';
    displayName: 'Category Card';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'elements.link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BusinessPartnerHero extends Struct.ComponentSchema {
  collectionName: 'components_business_partner_heroes';
  info: {
    description: 'Hero section for business partners page';
    displayName: 'Partner Hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    splitImages: Schema.Attribute.Component<'business.split-images', false>;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Building Strong Partnerships'>;
  };
}

export interface BusinessPartnerLogo extends Struct.ComponentSchema {
  collectionName: 'components_business_partner_logos';
  info: {
    description: 'Individual partner logo with details';
    displayName: 'Partner Logo';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['residential', 'industrial', 'medical', 'retail', 'multiple']
    > &
      Schema.Attribute.DefaultTo<'multiple'>;
    description: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    website: Schema.Attribute.String;
  };
}

export interface BusinessPartnerShowcase extends Struct.ComponentSchema {
  collectionName: 'components_business_partner_showcases';
  info: {
    description: 'Showcase of partner logos';
    displayName: 'Partner Showcase';
  };
  attributes: {
    allPartners: Schema.Attribute.Component<'business.partner-logo', true>;
    displayType: Schema.Attribute.Enumeration<['carousel', 'grid', 'grouped']> &
      Schema.Attribute.DefaultTo<'carousel'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Trusted Partners'>;
  };
}

export interface BusinessPartnershipCategories extends Struct.ComponentSchema {
  collectionName: 'components_business_partnership_categories';
  info: {
    description: 'Residential vs Commercial partnership categories';
    displayName: 'Partnership Categories';
  };
  attributes: {
    industrialCard: Schema.Attribute.Component<'business.category-card', false>;
    medicalCard: Schema.Attribute.Component<'business.category-card', false>;
    residentialCard: Schema.Attribute.Component<
      'business.category-card',
      false
    >;
    retailCard: Schema.Attribute.Component<'business.category-card', false>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Partnership Categories'>;
  };
}

export interface BusinessPartnershipCta extends Struct.ComponentSchema {
  collectionName: 'components_business_partnership_ctas';
  info: {
    description: 'Call to action section for partnerships';
    displayName: 'Partnership CTA';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    contactButton: Schema.Attribute.Component<'elements.button', false>;
    exploreButton: Schema.Attribute.Component<'elements.button', false>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Join Our Network of Trusted Partners'>;
  };
}

export interface BusinessPartnershipPhilosophy extends Struct.ComponentSchema {
  collectionName: 'components_business_partnership_philosophies';
  info: {
    description: 'Introduction and philosophy about partnerships';
    displayName: 'Partnership Philosophy';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Partnership Philosophy'>;
  };
}

export interface BusinessPartnershipPillars extends Struct.ComponentSchema {
  collectionName: 'components_business_partnership_pillars';
  info: {
    description: 'Why Partner With Us section with pillars';
    displayName: 'Partnership Pillars';
  };
  attributes: {
    pillars: Schema.Attribute.Component<'business.pillar-item', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Why Partner With Us?'>;
  };
}

export interface BusinessPillarItem extends Struct.ComponentSchema {
  collectionName: 'components_business_pillar_items';
  info: {
    description: 'Individual pillar for partnership benefits';
    displayName: 'Pillar Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BusinessSplitImages extends Struct.ComponentSchema {
  collectionName: 'components_business_split_images';
  info: {
    description: 'Split background images for hero section';
    displayName: 'Split Images';
  };
  attributes: {
    leftImage: Schema.Attribute.Media<'images'>;
    leftImageAlt: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Residential homes'>;
    rightImage: Schema.Attribute.Media<'images'>;
    rightImageAlt: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Commercial building'>;
  };
}

export interface BusinessStoryCard extends Struct.ComponentSchema {
  collectionName: 'components_business_story_cards';
  info: {
    description: 'Individual success story card';
    displayName: 'Story Card';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['residential', 'industrial', 'medical', 'retail']
    > &
      Schema.Attribute.Required;
    excerpt: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'elements.link', false>;
    partnerName: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BusinessSuccessStories extends Struct.ComponentSchema {
  collectionName: 'components_business_success_stories';
  info: {
    description: 'Success stories and highlights section';
    displayName: 'Success Stories';
  };
  attributes: {
    stories: Schema.Attribute.Component<'business.story-card', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Success Stories'>;
  };
}

export interface ContactAddress extends Struct.ComponentSchema {
  collectionName: 'components_contact_addresses';
  info: {
    description: 'Office address information';
    displayName: 'Address';
  };
  attributes: {
    city: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Bucharest'>;
    country: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'ROMANIA'>;
    district: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'District 2'>;
    latitude: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<44.4804>;
    longitude: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<26.1089>;
    postalCode: Schema.Attribute.String;
    street: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Street Barbu Vacarescu nr. 3, Parter'>;
  };
}

export interface ContactBusinessHours extends Struct.ComponentSchema {
  collectionName: 'components_contact_business_hours';
  info: {
    description: 'Business operating hours';
    displayName: 'Business Hours';
  };
  attributes: {
    holidayNote: Schema.Attribute.Text;
    saturdayHours: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Saturday: 9:00 AM - 2:00 PM'>;
    sundayHours: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Sunday: Closed'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Business Hours'>;
    weekdayHours: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Monday - Friday: 8:00 AM - 6:00 PM'>;
  };
}

export interface ContactCompanyDetails extends Struct.ComponentSchema {
  collectionName: 'components_contact_company_details';
  info: {
    description: 'Legal company information and registration details';
    displayName: 'Company Details';
  };
  attributes: {
    additionalInfo: Schema.Attribute.Text;
    companyName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'TOTUNIK S.R.L.'>;
    registrationNumber: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'J40/8734/2009'>;
    taxCode: Schema.Attribute.String & Schema.Attribute.DefaultTo<'RO25872617'>;
    vatNumber: Schema.Attribute.String;
  };
}

export interface ContactContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_infos';
  info: {
    description: 'Contact information section with office details, contact methods, and business hours';
    displayName: 'Contact Information';
  };
  attributes: {
    businessHours: Schema.Attribute.Component<'contact.business-hours', false>;
    companyDetails: Schema.Attribute.Component<
      'contact.company-details',
      false
    >;
    contactMethods: Schema.Attribute.Component<'contact.contact-method', true>;
    officeAddress: Schema.Attribute.Component<'contact.address', false>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"Reach out to us through any of these channels. We're here to help with all your coating needs.">;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Contact Information'>;
  };
}

export interface ContactContactMethod extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_methods';
  info: {
    description: 'Individual contact method (email, phone, etc.)';
    displayName: 'Contact Method';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['email', 'phone', 'fax', 'website']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'email'>;
    url: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContactDirectionItem extends Struct.ComponentSchema {
  collectionName: 'components_contact_direction_items';
  info: {
    description: 'Individual direction or transportation method';
    displayName: 'Direction Item';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      ['blue', 'green', 'yellow', 'red', 'purple', 'orange']
    > &
      Schema.Attribute.DefaultTo<'blue'>;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['metro', 'car', 'bus', 'walking', 'taxi']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'metro'>;
  };
}

export interface ContactEmergencyContact extends Struct.ComponentSchema {
  collectionName: 'components_contact_emergency_contacts';
  info: {
    description: 'Emergency contact information section';
    displayName: 'Emergency Contact';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"For urgent inquiries or technical support, don't hesitate to call our main office line.">;
    primaryButton: Schema.Attribute.Component<'shared.button', false>;
    secondaryButton: Schema.Attribute.Component<'shared.button', false>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Need Immediate Assistance?'>;
  };
}

export interface ContactHero extends Struct.ComponentSchema {
  collectionName: 'components_contact_heroes';
  info: {
    description: 'Hero section for contact page with title, subtitle and quick contact methods';
    displayName: 'Contact Hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    quickContactMethods: Schema.Attribute.Component<
      'contact.quick-contact-method',
      true
    > &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
        },
        number
      >;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Ready to transform your project with premium Jotun solutions? Our expert team is here to help you every step of the way.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Get in Touch'>;
  };
}

export interface ContactMapSection extends Struct.ComponentSchema {
  collectionName: 'components_contact_map_sections';
  info: {
    description: 'Interactive map section with location details and directions';
    displayName: 'Map Section';
  };
  attributes: {
    directions: Schema.Attribute.Component<'contact.direction-item', true>;
    location: Schema.Attribute.Component<'contact.address', false>;
    mapEmbedUrl: Schema.Attribute.String;
    quickActions: Schema.Attribute.Component<'contact.quick-action', true>;
    showMap: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Located in the heart of Bucharest, our office is easily accessible and equipped with everything needed to discuss your project requirements.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Visit Our Office'>;
  };
}

export interface ContactQuickAction extends Struct.ComponentSchema {
  collectionName: 'components_contact_quick_actions';
  info: {
    description: 'Quick action button for map section (get directions, call, copy address)';
    displayName: 'Quick Action';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      ['blue', 'green', 'orange', 'red', 'purple', 'gray']
    > &
      Schema.Attribute.DefaultTo<'blue'>;
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['directions', 'call', 'copy', 'email', 'website']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'directions'>;
    url: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ContactQuickContactMethod extends Struct.ComponentSchema {
  collectionName: 'components_contact_quick_contact_methods';
  info: {
    description: 'Quick contact method for hero section (phone, email, etc.)';
    displayName: 'Quick Contact Method';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['phone', 'email', 'address']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'phone'>;
    url: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContactSalesTeam extends Struct.ComponentSchema {
  collectionName: 'components_contact_sales_teams';
  info: {
    description: 'Sales team section with team members and emergency contact';
    displayName: 'Sales Team';
  };
  attributes: {
    emergencyContact: Schema.Attribute.Component<
      'contact.emergency-contact',
      false
    >;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Our experienced sales professionals are ready to help you find the perfect Jotun solutions for your project.'>;
    teamMembers: Schema.Attribute.Component<'contact.team-member', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Meet Our Sales Team'>;
  };
}

export interface ContactTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_contact_team_members';
  info: {
    description: 'Individual sales team member information';
    displayName: 'Team Member';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images'>;
    bio: Schema.Attribute.Text;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    languages: Schema.Attribute.JSON;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    specialties: Schema.Attribute.JSON;
  };
}

export interface ContentPageContent extends Struct.ComponentSchema {
  collectionName: 'components_content_page_contents';
  info: {
    displayName: 'PageContent';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ElementsButton extends Struct.ComponentSchema {
  collectionName: 'components_elements_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface ElementsLinkDropdown extends Struct.ComponentSchema {
  collectionName: 'components_elements_link_dropdowns';
  info: {
    displayName: 'Link Dropdown';
  };
  attributes: {
    href: Schema.Attribute.String;
    submenu: Schema.Attribute.Component<'elements.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsLogoLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_logo_links';
  info: {
    displayName: 'Logo link';
  };
  attributes: {
    href: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.String;
  };
}

export interface FooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterLinkGroup extends Struct.ComponentSchema {
  collectionName: 'components_footer_link_groups';
  info: {
    description: 'A column of footer links';
    displayName: 'Link Group';
  };
  attributes: {
    links: Schema.Attribute.Component<'footer.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_footer_newsletters';
  info: {
    description: 'Newsletter signup section';
    displayName: 'Newsletter';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Subscribe'>;
    placeholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enter your email'>;
    subtitle: Schema.Attribute.Text;
    successMessage: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Thank you for subscribing!'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['facebook', 'instagram', 'linkedin', 'twitter', 'phone', 'email']
    >;
    url: Schema.Attribute.String;
  };
}

export interface FormsContactFormBuilder extends Struct.ComponentSchema {
  collectionName: 'components_forms_contact_form_builders';
  info: {
    description: 'Internationalized contact form configuration';
    displayName: 'Contact Form Builder';
  };
  attributes: {
    companyLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Company'>;
    companyPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enter your company name'>;
    emailLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Email Address'>;
    emailPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enter your email address'>;
    errorMessage: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Sorry, there was an error sending your message. Please try again.'>;
    messageLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Message'>;
    messagePlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enter your message'>;
    nameLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Full Name'>;
    namePlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enter your full name'>;
    phoneLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Phone Number'>;
    phonePlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enter your phone number'>;
    privacyText: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'By submitting this form, you agree to our privacy policy.'>;
    subjectLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Subject'>;
    subjectPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enter the subject'>;
    submitButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Send Message'>;
    subtitle: Schema.Attribute.Text;
    successMessage: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Thank you! Your message has been sent successfully.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Contact Us'>;
  };
}

export interface FormsFieldValidation extends Struct.ComponentSchema {
  collectionName: 'components_forms_field_validations';
  info: {
    description: 'Validation rules for form fields';
    displayName: 'Field Validation';
  };
  attributes: {
    errorMessage: Schema.Attribute.String;
    maxLength: Schema.Attribute.Integer;
    minLength: Schema.Attribute.Integer;
    pattern: Schema.Attribute.String;
  };
}

export interface FormsFormField extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_fields';
  info: {
    description: 'Configurable form field for contact forms';
    displayName: 'Form Field';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Component<'forms.select-option', true>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<
      ['text', 'email', 'tel', 'textarea', 'select']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'text'>;
    validation: Schema.Attribute.Component<'forms.field-validation', false>;
    width: Schema.Attribute.Enumeration<['full', 'half', 'third']> &
      Schema.Attribute.DefaultTo<'full'>;
  };
}

export interface FormsSelectOption extends Struct.ComponentSchema {
  collectionName: 'components_forms_select_options';
  info: {
    description: 'Option for select fields';
    displayName: 'Select Option';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageAbout extends Struct.ComponentSchema {
  collectionName: 'components_homepage_about';
  info: {
    description: 'About teaser';
    displayName: 'About';
    icon: 'user';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media;
    title: Schema.Attribute.String;
  };
}

export interface HomepageContactCta extends Struct.ComponentSchema {
  collectionName: 'components_homepage_contact_ctas';
  info: {
    description: 'Call to action before footer';
    displayName: 'Contact CTA';
    icon: 'envelope';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    headline: Schema.Attribute.String;
    subheadline: Schema.Attribute.String;
  };
}

export interface HomepageHero extends Struct.ComponentSchema {
  collectionName: 'components_homepage_hero';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    slides: Schema.Attribute.Component<'homepage.slide', true>;
    title: Schema.Attribute.String;
  };
}

export interface HomepageHighlight extends Struct.ComponentSchema {
  collectionName: 'components_homepage_highlight_items';
  info: {
    description: 'Single highlight card';
    displayName: 'Highlight';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media;
    title: Schema.Attribute.String;
  };
}

export interface HomepageHighlights extends Struct.ComponentSchema {
  collectionName: 'components_homepage_highlights';
  info: {
    description: 'Core values or highlight cards';
    displayName: 'Highlights';
    icon: 'star';
  };
  attributes: {
    items: Schema.Attribute.Component<'homepage.highlight', true>;
  };
}

export interface HomepagePartners extends Struct.ComponentSchema {
  collectionName: 'components_homepage_partners';
  info: {
    description: 'Logos of partners & certifications';
    displayName: 'Partners';
    icon: 'handshake';
  };
  attributes: {
    logos: Schema.Attribute.Media<undefined, true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomepageProjectItem extends Struct.ComponentSchema {
  collectionName: 'components_homepage_project_items';
  info: {
    description: 'Single project card';
    displayName: 'Project Item';
    icon: 'building';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media;
    title: Schema.Attribute.String;
  };
}

export interface HomepageProjectsTeasers extends Struct.ComponentSchema {
  collectionName: 'components_homepage_projects_teasers';
  info: {
    description: 'Featured projects teaser';
    displayName: 'Projects Teaser';
    icon: 'folder';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    projects: Schema.Attribute.Component<'homepage.project-item', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomepageServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_homepage_service_items';
  info: {
    displayName: 'Service Item';
    icon: 'briefcase';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media;
    title: Schema.Attribute.String;
  };
}

export interface HomepageServicesTeaser extends Struct.ComponentSchema {
  collectionName: 'components_homepage_services_teasers';
  info: {
    description: 'Featured services teaser';
    displayName: 'Services Teaser';
    icon: 'briefcase';
  };
  attributes: {
    CtaButton: Schema.Attribute.Component<'shared.button', false>;
    services: Schema.Attribute.Component<'homepage.service-item', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomepageSlide extends Struct.ComponentSchema {
  collectionName: 'components_homepage_slide';
  info: {
    displayName: 'Slide';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.button', false>;
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    subheadline: Schema.Attribute.String;
  };
}

export interface HomepageTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_homepage_testimonial_items';
  info: {
    description: 'Single testimonial';
    displayName: 'Testimonial';
    icon: 'comment';
  };
  attributes: {
    image: Schema.Attribute.Media;
    name: Schema.Attribute.String;
    quote: Schema.Attribute.Text;
    role: Schema.Attribute.String;
  };
}

export interface HomepageTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_homepage_testimonials';
  info: {
    description: 'Client testimonials';
    displayName: 'Testimonials';
    icon: 'quote';
  };
  attributes: {
    items: Schema.Attribute.Component<'homepage.testimonial', true>;
  };
}

export interface LayoutTopNav extends Struct.ComponentSchema {
  collectionName: 'components_layout_top_navs';
  info: {
    displayName: 'Top Nav';
  };
  attributes: {
    logoLink: Schema.Attribute.Component<'elements.logo-link', false>;
    menulink: Schema.Attribute.Component<'elements.link-dropdown', true>;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'business-partners.case-studies-section': BusinessPartnersCaseStudiesSection;
      'business-partners.case-study-item': BusinessPartnersCaseStudyItem;
      'business-partners.case-study-stat': BusinessPartnersCaseStudyStat;
      'business-partners.cta-section': BusinessPartnersCtaSection;
      'business-partners.hero-section': BusinessPartnersHeroSection;
      'business-partners.introduction-section': BusinessPartnersIntroductionSection;
      'business-partners.testimonial-item': BusinessPartnersTestimonialItem;
      'business-partners.testimonials-section': BusinessPartnersTestimonialsSection;
      'business.category-card': BusinessCategoryCard;
      'business.partner-hero': BusinessPartnerHero;
      'business.partner-logo': BusinessPartnerLogo;
      'business.partner-showcase': BusinessPartnerShowcase;
      'business.partnership-categories': BusinessPartnershipCategories;
      'business.partnership-cta': BusinessPartnershipCta;
      'business.partnership-philosophy': BusinessPartnershipPhilosophy;
      'business.partnership-pillars': BusinessPartnershipPillars;
      'business.pillar-item': BusinessPillarItem;
      'business.split-images': BusinessSplitImages;
      'business.story-card': BusinessStoryCard;
      'business.success-stories': BusinessSuccessStories;
      'contact.address': ContactAddress;
      'contact.business-hours': ContactBusinessHours;
      'contact.company-details': ContactCompanyDetails;
      'contact.contact-info': ContactContactInfo;
      'contact.contact-method': ContactContactMethod;
      'contact.direction-item': ContactDirectionItem;
      'contact.emergency-contact': ContactEmergencyContact;
      'contact.hero': ContactHero;
      'contact.map-section': ContactMapSection;
      'contact.quick-action': ContactQuickAction;
      'contact.quick-contact-method': ContactQuickContactMethod;
      'contact.sales-team': ContactSalesTeam;
      'contact.team-member': ContactTeamMember;
      'content.page-content': ContentPageContent;
      'elements.button': ElementsButton;
      'elements.link': ElementsLink;
      'elements.link-dropdown': ElementsLinkDropdown;
      'elements.logo-link': ElementsLogoLink;
      'footer.link': FooterLink;
      'footer.link-group': FooterLinkGroup;
      'footer.newsletter': FooterNewsletter;
      'footer.social-link': FooterSocialLink;
      'forms.contact-form-builder': FormsContactFormBuilder;
      'forms.field-validation': FormsFieldValidation;
      'forms.form-field': FormsFormField;
      'forms.select-option': FormsSelectOption;
      'homepage.about': HomepageAbout;
      'homepage.contact-cta': HomepageContactCta;
      'homepage.hero': HomepageHero;
      'homepage.highlight': HomepageHighlight;
      'homepage.highlights': HomepageHighlights;
      'homepage.partners': HomepagePartners;
      'homepage.project-item': HomepageProjectItem;
      'homepage.projects-teasers': HomepageProjectsTeasers;
      'homepage.service-item': HomepageServiceItem;
      'homepage.services-teaser': HomepageServicesTeaser;
      'homepage.slide': HomepageSlide;
      'homepage.testimonial': HomepageTestimonial;
      'homepage.testimonials': HomepageTestimonials;
      'layout.top-nav': LayoutTopNav;
      'shared.button': SharedButton;
    }
  }
}
