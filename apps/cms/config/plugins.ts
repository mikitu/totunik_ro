// ./config/plugins.ts
export default () => ({
  navigation: {
    enabled: true,
    config: {
      contentTypes: [
        'api::page.page',
        'api::projects-portfolio.projects-portfolio',
        'api::business-partners-page.business-partners-page',
        'api::jotun-page.jotun-page',
        'api::certifications-guarantees.certifications-guarantees',
        'api::business-partners.business-partners',
        'api::contact.contact',
        'api::homepage.homepage',
      ],
      defaultContentType: 'api::page.page',
      contentTypesNameFields: {
        'api::page.page': ['title'],
        'api::projects-portfolio.projects-portfolio': ['hero.headline'],
        'api::business-partners-page.business-partners-page': ['hero.title'],
        'api::jotun-page.jotun-page': ['hero.title'],
        'api::certifications-guarantees.certifications-guarantees': ['hero.title'],
        'api::business-partners.business-partners': ['name'],
        'api::contact.contact': ['title'],
        'api::homepage.homepage': ['hero.title'],
      },
      pathDefaultFields: {
        'api::page.page': ['slug'],
        'api::projects-portfolio.projects-portfolio': [],
        'api::business-partners-page.business-partners-page': [],
        'api::jotun-page.jotun-page': [],
        'api::certifications-guarantees.certifications-guarantees': [],
        'api::business-partners.business-partners': [],
        'api::contact.contact': [],
        'api::homepage.homepage': [],
      },
      contentTypesPopulate: {
        'api::page.page': ['title', 'slug'],
        'api::projects-portfolio.projects-portfolio': ['hero.headline'],
        'api::business-partners-page.business-partners-page': ['hero.title'],
        'api::jotun-page.jotun-page': ['hero.title'],
        'api::certifications-guarantees.certifications-guarantees': ['hero.title'],
        'api::business-partners.business-partners': ['name'],
        'api::contact.contact': ['title'],
        'api::homepage.homepage': ['hero.title'],
      },
      allowedLevels: 3,
      preferCustomContentTypes: true,
      cascadeMenuAttached: true,
    },
  },

  'populate-deep': {
    config: {
      defaultDepth: 5,
    },
  },
});
