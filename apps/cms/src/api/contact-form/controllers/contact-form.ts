/**
 * contact-form controller
 */

import { factories } from '@strapi/strapi';
import axios from 'axios';

export default factories.createCoreController('api::contact-form.contact-form', ({ strapi }) => ({
  // Override the default create method to add reCAPTCHA verification
  async create(ctx) {
    const { data } = ctx.request.body;
    const { recaptchaToken, ...formData } = data;

    try {
      // Verify reCAPTCHA token
      if (recaptchaToken) {
        const recaptchaResponse = await axios.post(
          'https://www.google.com/recaptcha/api/siteverify',
          null,
          {
            params: {
              secret: process.env.RECAPTCHA_SECRET_KEY,
              response: recaptchaToken,
              remoteip: ctx.request.ip,
            },
          }
        );

        const { success, score } = recaptchaResponse.data;

        if (!success || (score && score < 0.5)) {
          return ctx.badRequest('reCAPTCHA verification failed');
        }

        // Store the reCAPTCHA score
        formData.recaptchaScore = score;
      }

      // Add metadata
      const enrichedData = {
        ...formData,
        ipAddress: ctx.request.ip,
        userAgent: ctx.request.headers['user-agent'],
        source: 'website',
        status: 'new',
        isSpam: false,
      };

      // Create the contact form entry
      const entity = await strapi.entityService.create('api::contact-form.contact-form', {
        data: enrichedData,
      });

      // Send notification email (optional) - run in background
      if (process.env.CONTACT_EMAIL && process.env.SMTP_HOST) {
        // Run email sending in background to avoid blocking the response
        setImmediate(async () => {
          try {
            await strapi.plugins['email'].services.email.send({
              to: process.env.CONTACT_EMAIL,
              from: process.env.FROM_EMAIL || 'noreply@totunik.ro',
              subject: `New Contact Form Submission: ${formData.subject}`,
              html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
                <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${formData.subject}</p>
                <p><strong>Message:</strong></p>
                <p>${formData.message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><small>IP: ${enrichedData.ipAddress} | reCAPTCHA Score: ${enrichedData.recaptchaScore || 'N/A'}</small></p>
              `,
            });
          } catch (emailError) {
            console.error('Failed to send notification email:', emailError);
          }
        });
      }

      return { data: entity };
    } catch (error) {
      console.error('Contact form submission error:', error);
      return ctx.internalServerError('Failed to submit contact form');
    }
  },

  // Custom method to get form statistics
  async getStats(ctx) {
    try {
      const total = await strapi.entityService.count('api::contact-form.contact-form');
      const newCount = await strapi.entityService.count('api::contact-form.contact-form', {
        filters: { status: 'new' },
      });
      const spamCount = await strapi.entityService.count('api::contact-form.contact-form', {
        filters: { isSpam: true },
      });

      return {
        total,
        new: newCount,
        spam: spamCount,
        legitimate: total - spamCount,
      };
    } catch (error) {
      return ctx.internalServerError('Failed to get stats');
    }
  },
}));
