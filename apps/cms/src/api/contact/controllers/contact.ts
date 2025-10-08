/**
 * contact controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact.contact', ({ strapi }) => ({
  async find(ctx) {
    const entity = await strapi.db.query('api::contact.contact').findOne({
      populate: {
        Hero: {
          populate: {
            backgroundImage: true,
            quickContactMethods: {
              populate: {
                type: true,
                label: true,
                value: true,
                url: true,
              },
            },
          },
        },
        ContactInfo: {
          populate: {
            title: true,
            subtitle: true,
            officeAddress: {
              populate: {
                street: true,
                city: true,
                district: true,
                country: true,
                postalCode: true,
                latitude: true,
                longitude: true,
              },
            },
            contactMethods: {
              populate: {
                type: true,
                label: true,
                value: true,
                url: true,
                icon: true,
              },
            },
            businessHours: {
              populate: {
                title: true,
                weekdayHours: true,
                saturdayHours: true,
                sundayHours: true,
                holidayNote: true,
              },
            },
            companyDetails: {
              populate: {
                companyName: true,
                taxCode: true,
                registrationNumber: true,
                vatNumber: true,
                additionalInfo: true,
              },
            },
          },
        },
        SalesTeam: {
          populate: {
            title: true,
            subtitle: true,
            teamMembers: {
              populate: {
                name: true,
                role: true,
                phone: true,
                email: true,
                avatar: true,
                bio: true,
                specialties: true,
                languages: true,
              },
            },
            emergencyContact: {
              populate: {
                title: true,
                description: true,
                primaryButton: true,
                secondaryButton: true,
              },
            },
          },
        },
        Map: {
          populate: {
            title: true,
            subtitle: true,
            location: {
              populate: {
                street: true,
                city: true,
                district: true,
                country: true,
                postalCode: true,
                latitude: true,
                longitude: true,
              },
            },
            directions: {
              populate: {
                type: true,
                title: true,
                description: true,
                icon: true,
                color: true,
              },
            },
            quickActions: {
              populate: {
                type: true,
                label: true,
                url: true,
                value: true,
                icon: true,
                color: true,
              },
            },
            mapEmbedUrl: true,
            showMap: true,
          },
        },
      },
    });

    return this.transformResponse(entity);
  },
}));
