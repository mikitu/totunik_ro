export default () => ({
  navigation: {
    enabled: true,
    config: {
      // Related content types that can be attached to navigation items
      contentTypes: ['api::page.page'],
      defaultContentType: 'api::page.page',

      // Which fields are used as display names in the admin UI
      contentTypesNameFields: {
        'api::page.page': ['title'],
      },

      // Which fields are used to derive the internal path (when Path is not set explicitly)
      pathDefaultFields: {
        'api::page.page': ['slug'],
      },

      // Ensure the plugin populates these fields on related entries
      contentTypesPopulate: {
        'api::page.page': ['title', 'slug'],
      },

      // General settings
      allowedLevels: 3,
      preferCustomContentTypes: true,
      cascadeMenuAttached: true,
    },
  },
});
