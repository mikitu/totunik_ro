import type { Schema, Struct } from '@strapi/strapi';

export interface ContentPageContent extends Struct.ComponentSchema {
  collectionName: 'components_content_page_contents';
  info: {
    displayName: 'PageContent';
  };
  attributes: {
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
      'content.page-content': ContentPageContent;
      'elements.button': ElementsButton;
      'elements.link': ElementsLink;
      'elements.link-dropdown': ElementsLinkDropdown;
      'elements.logo-link': ElementsLogoLink;
      'footer.link': FooterLink;
      'footer.link-group': FooterLinkGroup;
      'footer.newsletter': FooterNewsletter;
      'footer.social-link': FooterSocialLink;
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
