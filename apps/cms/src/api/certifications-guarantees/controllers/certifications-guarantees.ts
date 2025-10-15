/**
 * certifications-guarantees controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::certifications-guarantees.certifications-guarantees',
  ({ strapi }) => ({
    async find(ctx) {
      const { locale = 'en' } = ctx.query;

      // First try to find with locale, then without locale as fallback
      let entity = await strapi.db
        .query('api::certifications-guarantees.certifications-guarantees')
        .findOne({
          where: { locale },
          populate: {
            hero: {
              populate: {
                backgroundImage: true,
              },
            },
            certificationsSection: {
              populate: {
                certifications: true,
              },
            },
            guaranteesSection: {
              populate: {
                guaranteeFeatures: true,
              },
            },
            certificateImages: {
              populate: {
                certificates: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
            seo: {
              populate: {
                metaImage: true,
              },
            },
          },
        });

      // If no entity found with locale, try without locale filter
      if (!entity) {
        entity = await strapi.db
          .query('api::certifications-guarantees.certifications-guarantees')
          .findOne({
            populate: {
              hero: {
                populate: {
                  backgroundImage: true,
                },
              },
              certificationsSection: {
                populate: {
                  certifications: true,
                },
              },
              guaranteesSection: {
                populate: {
                  guaranteeFeatures: true,
                },
              },
              certificateImages: {
                populate: {
                  certificates: {
                    populate: {
                      image: true,
                    },
                  },
                },
              },
              seo: {
                populate: {
                  metaImage: true,
                },
              },
            },
          });
      }

      return this.transformResponse(entity);
    },
  })
);
