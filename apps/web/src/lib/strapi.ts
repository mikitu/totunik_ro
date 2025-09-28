const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiPage {
  id: number;
  documentId: string;
  title: string;
  content?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

interface StrapiButton {
  id: number;
  label: string;
  url: string;
  variant?: string;
  target?: string;
}

interface StrapiHeader {
  id: number;
  documentId: string;
  logo?: StrapiMedia;
  CtaButton?: StrapiButton;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiRelatedPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  __type: string;
}

interface StrapiNavigationItem {
  id: number;
  documentId: string;
  title: string;
  type: string;
  path: string;
  externalPath?: string;
  uiRouterKey: string;
  menuAttached: boolean;
  order: number;
  collapsed: boolean;
  related?: StrapiRelatedPage;
  parent?: StrapiNavigationItem;
  items?: StrapiNavigationItem[];
}

interface StrapiNavigation {
  data: StrapiNavigationItem[];
}

interface StrapiSlide {
  id: number;
  documentId: string;
  headline: string;
  subheadline: string;
  image: StrapiMedia;
  cta: StrapiButton;
}

interface StrapiHero {
  id: number;
  title: string;
  slides: StrapiSlide[];
}

interface StrapiHighlight {
  id: number;
  icon: StrapiMedia;
  title: string;
  description: string;
}

interface StrapiHomepage {
  id: number;
  documentId: string;
  Hero: StrapiHero;
  Highlight: StrapiHighlight[];
  Partners: StrapiMedia[];
  certifications: StrapiMedia[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

class StrapiAPI {
  private baseURL: string;
  private token?: string;

  constructor() {
    this.baseURL = STRAPI_API_URL;
    this.token = STRAPI_API_TOKEN;
  }

  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getPageBySlug(slug: string): Promise<StrapiPage | null> {
    try {
      const response: StrapiResponse<StrapiPage[]> = await this.fetchAPI(
        `/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&publicationState=live`
      );

      if (response.data && response.data.length > 0) {
        return response.data[0];
      }

      return null;
    } catch (error) {
      console.error('Error fetching page by slug:', error);
      return null;
    }
  }

  async getAllPages(): Promise<StrapiPage[]> {
    try {
      const response: StrapiResponse<StrapiPage[]> = await this.fetchAPI(
        '/pages?publicationState=live'
      );

      return response.data || [];
    } catch (error) {
      console.error('Error fetching all pages:', error);
      return [];
    }
  }

  async getHeader(): Promise<StrapiHeader | null> {
    try {
      const response = await this.fetchAPI('/header?populate=*');
      return response.data || null;
    } catch (error) {
      console.error('Error fetching header:', error);
      return null;
    }
  }

  async getNavigation(): Promise<StrapiNavigationItem[]> {
    try {
      // Try the navigation render endpoint with the correct slug
      // Use FLAT type to avoid tree structure issues with missing entities
      const response = await this.fetchAPI('/navigation/render/top-nav?type=FLAT');

      if (response) {
        // The response is directly an array, not wrapped in a data property
        const navigationItems = Array.isArray(response) ? response : [];

        // Filter only top-level items that should be shown in menu and have valid data
        const filteredItems = navigationItems.filter((item: StrapiNavigationItem) =>
          item.menuAttached &&
          !item.parent &&
          item.title && // Ensure title exists
          (item.path || item.related?.slug || item.title.toLowerCase() === 'home') // Ensure we can create a valid path
        );

        // Remove duplicates based on title and sort by order
        const uniqueItems = filteredItems.reduce((acc: StrapiNavigationItem[], current) => {
          const existingItem = acc.find(item => item.title === current.title);
          if (!existingItem) {
            acc.push(current);
          }
          return acc;
        }, []);

        // Sort by order
        return uniqueItems.sort((a, b) => a.order - b.order);
      }

      return [];
    } catch (error) {
      console.error('Error fetching navigation (possibly due to missing entities):', error);
      console.warn('Some navigation items may reference deleted pages. Please check your Strapi navigation configuration.');

      // Return empty array to use fallback navigation in component
      return [];
    }
  }

  async getHomepage(): Promise<StrapiHomepage | null> {
    try {
      console.log('Fetching homepage from:', `${this.baseURL}/api/homepage`);
      // Use a simpler populate query that works with Strapi v5
      const response = await this.fetchAPI('/homepage');

      console.log('Homepage response:', response);

      if (response?.data) {
        return response.data;
      }

      return null;
    } catch (error) {
      console.error('Error fetching homepage:', error);
      return null;
    }
  }


}

export const strapiAPI = new StrapiAPI();
export { StrapiAPI };
export type { StrapiPage, StrapiHeader, StrapiNavigationItem, StrapiMedia, StrapiButton };
