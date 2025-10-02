// ./config/plugins.ts
export default () => ({
  navigation: {
    enabled: true,
    config: {
      contentTypes: ['api::page.page'],
      defaultContentType: 'api::page.page',
      contentTypesNameFields: {
        'api::page.page': ['title'],
      },
      pathDefaultFields: {
        'api::page.page': ['slug'],
      },
      contentTypesPopulate: {
        'api::page.page': ['title', 'slug'],
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