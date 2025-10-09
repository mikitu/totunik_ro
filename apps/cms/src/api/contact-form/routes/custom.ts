/**
 * Custom routes for contact-form
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/contact-form/submit',
      handler: 'contact-form.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/contact-form/stats',
      handler: 'contact-form.getStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
