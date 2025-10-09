/**
 * contact-form service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::contact-form.contact-form', ({ strapi }) => ({
  // Custom method to validate form data
  validateFormData(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Valid email address is required');
    }

    if (!data.subject || data.subject.trim().length < 5) {
      errors.push('Subject must be at least 5 characters long');
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    if (data.phone && !this.isValidPhone(data.phone)) {
      errors.push('Invalid phone number format');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Phone validation (basic)
  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  },

  // Spam detection (basic keyword filtering)
  detectSpam(data) {
    const spamKeywords = [
      'viagra', 'casino', 'lottery', 'winner', 'congratulations',
      'click here', 'free money', 'make money fast', 'work from home',
      'bitcoin', 'cryptocurrency', 'investment opportunity'
    ];

    const text = `${data.name} ${data.subject} ${data.message}`.toLowerCase();
    
    for (const keyword of spamKeywords) {
      if (text.includes(keyword)) {
        return true;
      }
    }

    return false;
  },

  // Get recent submissions for admin dashboard
  async getRecentSubmissions(limit = 10) {
    return await strapi.entityService.findMany('api::contact-form.contact-form', {
      sort: { createdAt: 'desc' },
      limit,
      populate: '*',
    });
  },

  // Mark submission as spam
  async markAsSpam(id) {
    return await strapi.entityService.update('api::contact-form.contact-form', id, {
      data: { isSpam: true, status: 'closed' },
    });
  },

  // Update submission status
  async updateStatus(id, status) {
    const validStatuses = ['new', 'read', 'replied', 'closed'];
    
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    return await strapi.entityService.update('api::contact-form.contact-form', id, {
      data: { status },
    });
  },
}));
