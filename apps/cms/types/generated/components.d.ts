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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.page-content': ContentPageContent;
      'elements.link': ElementsLink;
      'elements.link-dropdown': ElementsLinkDropdown;
      'elements.logo-link': ElementsLogoLink;
      'layout.top-nav': LayoutTopNav;
    }
  }
}
