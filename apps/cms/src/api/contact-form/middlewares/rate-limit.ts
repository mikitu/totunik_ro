/**
 * Rate limiting middleware for contact form submissions
 */

const submissionTracker = new Map();

export default (config, { strapi }) => {
  return async (ctx, next) => {
    const clientIP = ctx.request.ip;
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxSubmissions = 3; // Max 3 submissions per 15 minutes per IP

    // Clean up old entries
    for (const [ip, data] of submissionTracker.entries()) {
      if (now - data.firstSubmission > windowMs) {
        submissionTracker.delete(ip);
      }
    }

    // Check current IP
    const ipData = submissionTracker.get(clientIP);
    
    if (ipData) {
      if (now - ipData.firstSubmission < windowMs) {
        if (ipData.count >= maxSubmissions) {
          return ctx.tooManyRequests('Too many form submissions. Please try again later.');
        }
        ipData.count++;
        ipData.lastSubmission = now;
      } else {
        // Reset window
        submissionTracker.set(clientIP, {
          count: 1,
          firstSubmission: now,
          lastSubmission: now,
        });
      }
    } else {
      // First submission from this IP
      submissionTracker.set(clientIP, {
        count: 1,
        firstSubmission: now,
        lastSubmission: now,
      });
    }

    await next();
  };
};
