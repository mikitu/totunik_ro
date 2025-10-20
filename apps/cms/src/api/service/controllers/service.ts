/**
 * service controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::service.service', ({ strapi }) => ({
  async find(ctx) {
    const { locale } = ctx.query;

    const entities = await strapi.db.query('api::service.service').findMany({
      where: {
        locale,
        isActive: true,
      },
      populate: {
        featuredImage: true,
        heroImage: true,
        features: true,
        process: true,
        benefitsSection: {
          populate: {
            benefits: true,
          },
        },
        ctaSection: {
          populate: {
            features: true,
          },
        },
        gallerySection: {
          populate: {
            images: true,
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
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitizedEntities);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { locale } = ctx.query;

    // Try to find by slug first, then by ID
    let entity = await strapi.db.query('api::service.service').findOne({
      where: {
        slug: id,
        locale,
        isActive: true,
      },
      populate: {
        featuredImage: true,
        heroImage: true,
        features: true,
        process: true,
        processCta: {
          populate: {
            primaryButton: true,
            secondaryButton: true,
          },
        },
        benefitsSection: {
          populate: {
            benefits: true,
          },
        },
        ctaSection: {
          populate: {
            features: true,
          },
        },
        gallerySection: {
          populate: {
            images: true,
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

    // If not found by slug, try by ID
    if (!entity) {
      entity = await strapi.db.query('api::service.service').findOne({
        where: {
          id: parseInt(id),
          locale,
          isActive: true,
        },
        populate: {
          featuredImage: true,
          heroImage: true,
          features: true,
          process: true,
          processCta: {
            populate: {
              primaryButton: true,
              secondaryButton: true,
            },
          },
          benefitsSection: {
            populate: {
              benefits: true,
            },
          },
          ctaSection: {
            populate: {
              features: true,
            },
          },
          gallerySection: {
            populate: {
              images: true,
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
    }

    if (!entity) {
      return ctx.notFound('Service not found');
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));
