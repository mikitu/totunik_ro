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
  collectionName: 'components_homepage_highlights';
  info: {
    description: '';
    displayName: 'Highlight';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
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
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
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
      'homepage.hero': HomepageHero;
      'homepage.highlight': HomepageHighlight;
      'homepage.slide': HomepageSlide;
      'layout.top-nav': LayoutTopNav;
      'shared.button': SharedButton;
    }
  }
}
