import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::footer.footer', ({ strapi }) => ({
  async find(ctx) {
    // Use explicit populate for nested components and media
    const entity = await strapi.db.query('api::footer.footer').findOne({
      populate: {
        logo: true,
        navigation: {
          populate: {
            links: true,
          },
        },
        socials: true,
        newsletter: true,
      },
    });

    return this.transformResponse(entity);
  },
}));