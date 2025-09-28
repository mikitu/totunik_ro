/**
 * homepage controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::homepage.homepage', ({ strapi }) => ({
  async find(ctx) {
    const entity = await strapi.db.query('api::homepage.homepage').findOne({
      where: {},
      populate: {
        Hero: {
          populate: {
            slides: {
              populate: {
                cta: true,
                image: true,
              },
            },
          },
        },
        Highlight: true,
        Partners: true,
        certifications: true,
      },
    });

    return this.transformResponse(entity);
  },
}));