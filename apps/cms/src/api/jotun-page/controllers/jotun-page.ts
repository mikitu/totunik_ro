/**
 * jotun-page controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::jotun-page.jotun-page', ({ strapi }) => ({
  async find(ctx) {
    const { locale = 'en' } = ctx.query;

    // First try to find with locale, then without locale as fallback
    let entity = await strapi.db.query('api::jotun-page.jotun-page').findOne({
      where: { locale },
      populate: {
        Hero: {
          populate: {
            ctaButton: true,
            backgroundImage: true,
            brandIcon: true,
          },
        },
        Introduction: {
          populate: {
            highlights: true,
          },
        },
        ProductCategories: {
          populate: {
            categories: {
              populate: {
                features: true,
                ctaButton: true,
                image: true,
              },
            },
          },
        },
        FeaturedProducts: {
          populate: {
            products: {
              populate: {
                features: true,
                learnMoreButton: true,
                datasheetButton: true,
                image: true,
              },
            },
            viewAllButton: true,
          },
        },
        CTA: {
          populate: {
            primaryButton: true,
            secondaryButton: true,
            benefitsSection: {
              populate: {
                benefits: true,
              },
            },
            downloadSection: {
              populate: {
                downloads: {
                  populate: {
                    file: true,
                  },
                },
              },
            },
            backgroundImage: true,
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
      entity = await strapi.db.query('api::jotun-page.jotun-page').findOne({
        populate: {
          Hero: {
            populate: {
              ctaButton: true,
              backgroundImage: true,
              brandIcon: true,
            },
          },
          Introduction: {
            populate: {
              highlights: true,
            },
          },
          ProductCategories: {
            populate: {
              categories: {
                populate: {
                  features: true,
                  ctaButton: true,
                  image: true,
                },
              },
            },
          },
          FeaturedProducts: {
            populate: {
              products: {
                populate: {
                  features: true,
                  learnMoreButton: true,
                  datasheetButton: true,
                  image: true,
                },
              },
              viewAllButton: true,
            },
          },
          CTA: {
            populate: {
              primaryButton: true,
              secondaryButton: true,
              benefitsSection: {
                populate: {
                  benefits: true,
                },
              },
              downloadSection: {
                populate: {
                  downloads: {
                    populate: {
                      file: true,
                    },
                  },
                },
              },
              backgroundImage: true,
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
}));
