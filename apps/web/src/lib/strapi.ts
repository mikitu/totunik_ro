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

interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string;
  size: number;
  width: number;
  height: number;
}

interface StrapiMediaFormats {
  large?: StrapiMediaFormat;
  medium?: StrapiMediaFormat;
  small?: StrapiMediaFormat;
  thumbnail?: StrapiMediaFormat;
}

interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: StrapiMediaFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: Record<string, unknown>;
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
  socials?: { icon: string; url: string }[];
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

export interface StrapiHighlights {
  id: number;
  items: StrapiHighlight[];
}
export interface StrapiHighlight {
  id: number;
  icon: StrapiMedia;
  title: string;
  description: string;
}

export interface StrapiAbout {
  id: number;
  title: string;
  description: string;
  image: StrapiMedia;
}

export interface StrapiService {
  id: number;
  title: string;
  description: string;
  image: StrapiMedia;
  button?: StrapiButton;
}

export interface StrapiServices {
  id: number;
  title: string;
  subtitle: string;
  services: StrapiService[];
  CtaButton?: StrapiButton;
}

interface StrapiFooterLink { label: string; url: string }
interface StrapiFooterLinkGroup { title: string; links: StrapiFooterLink[] }
type SocialIcon = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'phone' | 'email';
interface StrapiFooterSocial { icon: SocialIcon; url?: string }
interface StrapiFooterNewsletter {
  title: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
}
export interface StrapiFooter {
  id: number;
  documentId: string;
  logo?: StrapiMedia;
  description?: string;
  navigation?: StrapiFooterLinkGroup[];
  socials?: StrapiFooterSocial[];
  newsletter?: StrapiFooterNewsletter;
  copyright?: string;
}

interface StrapiHomepage {
  id: number;
  documentId: string;
  Hero: StrapiHero;
  Highlights: StrapiHighlights;
  About: StrapiAbout;
  Services: StrapiServices;
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

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
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

  async getPageBySlug(slug: string, opts?: { locale?: string }): Promise<StrapiPage | null> {
    try {
      const localeParam = opts?.locale ? `&locale=${encodeURIComponent(opts.locale)}` : "";
      const response: StrapiResponse<StrapiPage[]> = await this.fetchAPI(
        `/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&publicationState=live${localeParam}`
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
      const response = await this.fetchAPI('/header');
      return response.data || null;
    } catch (error) {
      console.error('Error fetching header:', error);
      return null;
    }
  }

  // Footer API
  async getFooter(): Promise<StrapiFooter | null> {
    try {
      // populate nested data (components + media) handled by controller
      const response = await this.fetchAPI('/footer');
      const raw = response?.data;
      if (!raw) return null;
      const attrs = raw.attributes ?? raw;

      // Normalize Strapi media (relation shape -> flat with url)
      const normalizeMedia = (m: unknown): StrapiMedia | undefined => {
        if (!m) return undefined;
        const mediaData = (m as { data?: unknown }).data ?? m;
        const attributes = (mediaData as { attributes?: unknown })?.attributes ?? mediaData;
        if (!attributes) return undefined;
        return { ...(attributes as Record<string, unknown>), url: (attributes as { url: string }).url } as StrapiMedia;
      };

      const footer: StrapiFooter = {
        id: raw.id ?? attrs.id,
        documentId: raw.documentId ?? attrs.documentId,
        logo: normalizeMedia(attrs.logo),
        description: attrs.description ?? "",
        navigation: Array.isArray(attrs.navigation)
          ? attrs.navigation.map((g: Record<string, unknown>) => ({
              title: (g?.title as string) ?? "",
              links: Array.isArray(g?.links)
                ? (g.links as Record<string, unknown>[]).map((l) => ({
                    label: (l?.label as string) ?? "",
                    url: (l?.url as string) ?? "#"
                  }))
                : [],
            }))
          : [],
        socials: Array.isArray(attrs.socials)
          ? (attrs.socials as Record<string, unknown>[]).map((s) => ({
              icon: s?.icon as SocialIcon,
              url: s?.url as string
            }))
          : [],
        newsletter: attrs.newsletter
          ? {
              title: attrs.newsletter.title ?? "",
              subtitle: attrs.newsletter.subtitle ?? undefined,
              placeholder: attrs.newsletter.placeholder ?? "Enter your email",
              buttonLabel: attrs.newsletter.buttonLabel ?? "Subscribe",
              successMessage: attrs.newsletter.successMessage ?? "Thank you for subscribing!",
            }
          : undefined,
        copyright: attrs.copyright ?? "",
      };

      return footer;
    } catch (error) {
      console.error('Error fetching footer:', error);
      return null;
    }
  }


  async getNavigation(): Promise<StrapiNavigationItem[]> {
    try {
      // Use TREE type so nested items are included for desktop hover submenus
      const response = await this.fetchAPI('/navigation/render/top-nav?type=TREE');

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
      // populate nested data handled by controller
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

