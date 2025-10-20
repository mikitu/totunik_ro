/**
 * services-page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::services-page.services-page', ({ strapi }) => ({
  async find(ctx) {
    const { locale } = ctx.query;

    const entity = await strapi.db.query('api::services-page.services-page').findOne({
      where: { locale }, // ensures the right localized entry
      populate: {
        hero: {
          populate: {
            backgroundImage: true,
          },
        },
        cta: {
          populate: {
            primaryButton: true,
            secondaryButton: true,
            backgroundImage: true,
          },
        },
        seo: {
          populate: {
            metaImage: true,
            metaSocial: {
              populate: {
                image: true,
              },
            },
          },
        },
      },
    });

    if (!entity) {
      return ctx.notFound('Services page not found');
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));
