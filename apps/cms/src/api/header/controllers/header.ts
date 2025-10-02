/**
 * header controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::header.header', ({ strapi }) => ({
  async find(ctx) {
    // Use explicit populate for nested components and media
    const entity = await strapi.db.query('api::header.header').findOne({
      populate: {
        logo: true,
        CtaButton: true,
        socials: true,
      },
    });

    return this.transformResponse(entity);
  },
}));
