/**
 * homepage controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::homepage.homepage', ({ strapi }) => ({
  async find(ctx) {
    const { locale = 'en' } = ctx.query;

    const entity = await strapi.db.query('api::homepage.homepage').findOne({
      where: { locale }, // ensures the right localized entry
      populate: {
        Hero: {
          populate: {
            slides: {
              populate: {
                image: true,
                cta: true,
              },
            },
          },
        },
        Highlights: {
          populate: {
            items: { populate: { icon: true, title: true, description: true } },
          },
        },
        About: {
          populate: {
            image: true,
            ctaButton: true,
          },
        },
        Services: {
          populate: {
            title: true,
            subtitle: true,
            services: {
              populate: { 
                image: true,
                button: true,
                title: true,
                description: true,
            } },
            CtaButton: true,
          },
        },
        ProjectsTeaser: {
          populate: {
            projects: { populate: { image: true } },
            ctaButton: true,
          },
        },
        Partners: {
          populate: {
            logos: { populate: { logo: true } },
          },
        },
        Testimonials: {
          populate: {
            testimonials: { populate: { avatar: true } },
          },
        },
        ContactCta: {
          populate: {
            ctaButton: true,
          },
        },
        seo: true,
      },
    });

    return this.transformResponse(entity);
  },
}));