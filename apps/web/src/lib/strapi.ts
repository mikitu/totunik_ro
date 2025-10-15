const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

// Helper function to get full URL for Strapi media
export function getStrapiURL(path: string = ''): string {
  return `${STRAPI_API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// Helper function to get full URL for Strapi media objects
export function getStrapiMediaURL(media: StrapiMedia | null | undefined): string | null {
  if (!media?.url) {
    console.log('getStrapiMediaURL: No media or URL provided');
    return null;
  }

  // If URL is already absolute, return as is
  if (media.url.startsWith('http')) {
    console.log('getStrapiMediaURL: URL is already absolute:', media.url);
    return media.url;
  }

  // Convert relative URL to absolute
  const absoluteURL = getStrapiURL(media.url);

  return absoluteURL;
}

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
  variant?: 'primary' | 'secondary' | 'translucent';
  iconLeft?:
    | 'none'
    | 'arrow-right'
    | 'arrow-left'
    | 'arrow-up'
    | 'arrow-down'
    | 'check'
    | 'close'
    | 'plus'
    | 'minus'
    | 'search'
    | 'filter'
    | 'edit'
    | 'delete'
    | 'save'
    | 'download'
    | 'upload'
    | 'share'
    | 'heart'
    | 'star'
    | 'bookmark'
    | 'home'
    | 'user'
    | 'users'
    | 'settings'
    | 'bell'
    | 'mail'
    | 'phone'
    | 'calendar'
    | 'clock'
    | 'map'
    | 'location'
    | 'camera'
    | 'image'
    | 'video'
    | 'music'
    | 'file'
    | 'folder'
    | 'link'
    | 'external-link'
    | 'eye'
    | 'eye-off'
    | 'lock'
    | 'unlock'
    | 'shield'
    | 'info'
    | 'warning'
    | 'error'
    | 'success';
  iconRight?:
    | 'none'
    | 'arrow-right'
    | 'arrow-left'
    | 'arrow-up'
    | 'arrow-down'
    | 'check'
    | 'close'
    | 'plus'
    | 'minus'
    | 'search'
    | 'filter'
    | 'edit'
    | 'delete'
    | 'save'
    | 'download'
    | 'upload'
    | 'share'
    | 'heart'
    | 'star'
    | 'bookmark'
    | 'home'
    | 'user'
    | 'users'
    | 'settings'
    | 'bell'
    | 'mail'
    | 'phone'
    | 'calendar'
    | 'clock'
    | 'map'
    | 'location'
    | 'camera'
    | 'image'
    | 'video'
    | 'music'
    | 'file'
    | 'folder'
    | 'link'
    | 'external-link'
    | 'eye'
    | 'eye-off'
    | 'lock'
    | 'unlock'
    | 'shield'
    | 'info'
    | 'warning'
    | 'error'
    | 'success';
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

export interface StrapiProject {
  id: number;
  title: string;
  description: string;
  image: StrapiMedia;
  button?: StrapiButton;
}

export interface StrapiProjects {
  id: number;
  title?: string;
  subtitle: string;
  projects: StrapiProject[];
  button?: StrapiButton;
}
export interface StrapiPartners {
  id: number;
  title?: string;
  subtitle: string;
  logos: StrapiMedia[];
  button?: StrapiButton;
}

export interface StrapiTestimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image?: StrapiMedia;
}

export interface StrapiTestimonials {
  id: number;
  title?: string;
  subtitle?: string;
  items: StrapiTestimonial[];
}

export interface StrapiContact {
  id: number;
  headline: string;
  subheadline?: string;
  button: StrapiButton;
}

// Jotun Page Interfaces
export interface StrapiJotunHero {
  id: number;
  headline: string;
  tagline: string;
  ctaButton: StrapiButton;
  backgroundImage?: StrapiMedia;
  brandIcon?: StrapiMedia;
}

export interface StrapiPartnershipHighlight {
  id: number;
  title: string;
  description: string;
  icon: 'certified' | 'performance' | 'eco-friendly' | 'support' | 'quality' | 'delivery';
  color: 'blue' | 'orange' | 'green' | 'purple' | 'red' | 'gray';
}

export interface StrapiJotunIntroduction {
  id: number;
  content: string;
  highlights: StrapiPartnershipHighlight[];
}

export interface StrapiFeature {
  id: number;
  text: string;
  icon?:
    | 'check'
    | 'star'
    | 'shield'
    | 'lightning'
    | 'heart'
    | 'award'
    | 'thumbs-up'
    | 'eco'
    | 'quality'
    | 'time';
}

export interface StrapiProductCategory {
  id: number;
  title: string;
  description: string;
  icon:
    | 'interior'
    | 'exterior'
    | 'protective'
    | 'wood-metal'
    | 'industrial'
    | 'marine'
    | 'automotive'
    | 'decorative';
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'gray' | 'teal' | 'indigo';
  features: StrapiFeature[];
  ctaButton?: StrapiButton;
  image?: StrapiMedia;
}

export interface StrapiJotunProductCategories {
  id: number;
  title: string;
  subtitle: string;
  categories: StrapiProductCategory[];
}

export interface StrapiFeaturedProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  image?: StrapiMedia;
  badge?:
    | 'Best Seller'
    | 'Premium'
    | 'Industrial'
    | 'Eco-Friendly'
    | 'New'
    | 'Popular'
    | 'Professional'
    | 'Marine Grade';
  badgeColor?: 'orange' | 'blue' | 'gray' | 'green' | 'red' | 'purple' | 'teal' | 'indigo';
  features: StrapiFeature[];
  learnMoreButton?: StrapiButton;
  datasheetButton?: StrapiButton;
  productCode?: string;
  technicalSpecs?: Record<string, unknown>;
}

export interface StrapiJotunFeaturedProducts {
  id: number;
  title: string;
  subtitle: string;
  products: StrapiFeaturedProduct[];
  viewAllButton?: StrapiButton;
}

export interface StrapiDownloadItem {
  id: number;
  label: string;
  file?: StrapiMedia;
  url?: string;
  icon?: 'download' | 'document' | 'pdf' | 'image' | 'chart' | 'catalog' | 'datasheet' | 'guide';
  fileSize?: string;
  description?: string;
}

export interface StrapiDownloadSection {
  id: number;
  title: string;
  description: string;
  downloads: StrapiDownloadItem[];
}

export interface StrapiBenefitsSection {
  id: number;
  title?: string;
  description?: string;
  benefits: StrapiPartnershipHighlight[];
}

export interface StrapiJotunCTA {
  id: number;
  headline: string;
  subtitle: string;
  primaryButton: StrapiButton;
  secondaryButton?: StrapiButton;
  benefitsSection?: StrapiBenefitsSection;
  downloadSection?: StrapiDownloadSection;
  backgroundImage?: StrapiMedia;
}

export interface StrapiSEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  metaImage?: StrapiMedia;
  canonicalURL?: string;
  structuredData?: Record<string, unknown>;
}

export interface StrapiJotunPage {
  id: number;
  documentId: string;
  Hero: StrapiJotunHero;
  Introduction: StrapiJotunIntroduction;
  ProductCategories: StrapiJotunProductCategories;
  FeaturedProducts: StrapiJotunFeaturedProducts;
  CTA: StrapiJotunCTA;
  seo?: StrapiSEO;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Certifications & Guarantees Page Interfaces
export interface StrapiCertificationsHero {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: StrapiMedia;
}

export interface StrapiCertificationItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon:
    | 'check-circle'
    | 'shield-check'
    | 'leaf'
    | 'hard-hat'
    | 'award'
    | 'certificate'
    | 'star'
    | 'badge';
  iconColor: 'green' | 'blue' | 'orange' | 'purple' | 'red' | 'yellow';
}

export interface StrapiCertificationsSection {
  id: number;
  title: string;
  certifications: StrapiCertificationItem[];
}

export interface StrapiFeatureItem {
  id: number;
  text: string;
}

export interface StrapiGuaranteesSection {
  id: number;
  title: string;
  guaranteeTitle: string;
  guaranteeDescription: string;
  guaranteeFeatures: StrapiFeatureItem[];
  additionalInfo?: string;
}

export interface StrapiCertificateItem {
  id: number;
  title: string;
  subtitle: string;
  image?: StrapiMedia;
}

export interface StrapiCertificateImages {
  id: number;
  title: string;
  subtitle?: string;
  certificates: StrapiCertificateItem[];
}

export interface StrapiCertificationsGuaranteesPage {
  id: number;
  documentId: string;
  hero: StrapiCertificationsHero;
  certificationsSection: StrapiCertificationsSection;
  guaranteesSection: StrapiGuaranteesSection;
  certificateImages: StrapiCertificateImages;
  seo?: StrapiSEO;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Contact Page Interfaces
export interface StrapiContactHero {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage?: StrapiMedia;
  quickContactMethods: StrapiQuickContactMethod[];
}

export interface StrapiQuickContactMethod {
  id: number;
  type: 'phone' | 'email' | 'address';
  label: string;
  value: string;
  url?: string;
}

export interface StrapiContactInfo {
  id: number;
  title: string;
  subtitle?: string;
  officeAddress: StrapiAddress;
  contactMethods: StrapiContactMethod[];
  businessHours: StrapiBusinessHours;
  companyDetails: StrapiCompanyDetails;
}

export interface StrapiAddress {
  id: number;
  street: string;
  city: string;
  district?: string;
  country: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface StrapiContactMethod {
  id: number;
  type: 'email' | 'phone' | 'fax' | 'website';
  label: string;
  value: string;
  url?: string;
  icon?: StrapiMedia;
}

export interface StrapiBusinessHours {
  id: number;
  title: string;
  weekdayHours: string;
  saturdayHours?: string;
  sundayHours?: string;
  holidayNote?: string;
}

export interface StrapiCompanyDetails {
  id: number;
  companyName: string;
  taxCode?: string;
  registrationNumber?: string;
  vatNumber?: string;
  additionalInfo?: string;
}

export interface StrapiSalesTeam {
  id: number;
  title: string;
  subtitle?: string;
  teamMembers: StrapiTeamMember[];
  emergencyContact: StrapiEmergencyContact;
}

export interface StrapiTeamMember {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar?: StrapiMedia;
  bio?: string;
  specialties?: string[];
  languages?: string[];
}

export interface StrapiEmergencyContact {
  id: number;
  title: string;
  description?: string;
  primaryButton: StrapiButton;
  secondaryButton: StrapiButton;
}

export interface StrapiMapSection {
  id: number;
  title: string;
  subtitle?: string;
  location: StrapiAddress;
  directions: StrapiDirectionItem[];
  quickActions: StrapiQuickAction[];
  mapEmbedUrl?: string;
  showMap: boolean;
}

export interface StrapiDirectionItem {
  id: number;
  type: 'metro' | 'car' | 'bus' | 'walking' | 'taxi';
  title: string;
  description: string;
  icon?: StrapiMedia;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'orange';
}

export interface StrapiQuickAction {
  id: number;
  type: 'directions' | 'call' | 'copy' | 'email' | 'website';
  label: string;
  url?: string;
  value?: string;
  icon?: StrapiMedia;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray';
}

export interface StrapiContactPage {
  id: number;
  documentId: string;
  Hero: StrapiContactHero;
  ContactInfo: StrapiContactInfo;
  SalesTeam: StrapiSalesTeam;
  Map: StrapiMapSection;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiFooterLink {
  label: string;
  url: string;
}
interface StrapiFooterLinkGroup {
  title: string;
  links: StrapiFooterLink[];
}
type SocialIcon = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'phone' | 'email';
interface StrapiFooterSocial {
  icon: SocialIcon;
  url?: string;
}
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
  Projects: StrapiProjects;
  Partners: StrapiPartners;
  Testimonials: StrapiTestimonials;
  Contact: StrapiContact;
  certifications: StrapiMedia[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

class StrapiAPI {
  private baseURL: string;
  private token?: string;
  private locale?: string;

  constructor(locale?: string) {
    this.baseURL = STRAPI_API_URL;
    this.token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    this.locale = locale;
  }

  private async fetchAPI(endpoint: string, options: RequestInit & { skipLocale?: boolean } = {}) {
    // Auto-detect locale and append to endpoint if not already present
    let finalEndpoint = endpoint;

    // Check if locale is already in the endpoint or if we should skip locale detection
    if (!options.skipLocale && !endpoint.includes('locale=') && !endpoint.includes('?locale=')) {
      // Use constructor locale if provided, otherwise auto-detect
      let locale = this.locale || 'en'; // default

      if (!this.locale) {
        if (typeof window !== 'undefined') {
          // Client-side: use our locale helper
          try {
            const { getLocale } = await import('./locale');
            locale = getLocale();
          } catch {
            // Fallback if locale helper fails
            locale = 'en';
          }
        } else {
          // Server-side: try to get from cookies
          try {
            const { cookies } = await import('next/headers');
            const { getLocaleFromServerCookies } = await import('./locale');
            const cookieStore = await cookies();
            locale = getLocaleFromServerCookies(cookieStore);
          } catch {
            // Fallback if server cookies fail
            locale = 'en';
          }
        }
      }

      // Append locale to endpoint
      const separator = endpoint.includes('?') ? '&' : '?';
      finalEndpoint = `${endpoint}${separator}locale=${encodeURIComponent(locale)}`;
    }

    const url = `${this.baseURL}/api${finalEndpoint}`;

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
        return {
          ...(attributes as Record<string, unknown>),
          url: (attributes as { url: string }).url,
        } as StrapiMedia;
      };

      const footer: StrapiFooter = {
        id: raw.id ?? attrs.id,
        documentId: raw.documentId ?? attrs.documentId,
        logo: normalizeMedia(attrs.logo),
        description: attrs.description ?? '',
        navigation: Array.isArray(attrs.navigation)
          ? attrs.navigation.map((g: Record<string, unknown>) => ({
              title: (g?.title as string) ?? '',
              links: Array.isArray(g?.links)
                ? (g.links as Record<string, unknown>[]).map(l => ({
                    label: (l?.label as string) ?? '',
                    url: (l?.url as string) ?? '#',
                  }))
                : [],
            }))
          : [],
        socials: Array.isArray(attrs.socials)
          ? (attrs.socials as Record<string, unknown>[]).map(s => ({
              icon: s?.icon as SocialIcon,
              url: s?.url as string,
            }))
          : [],
        newsletter: attrs.newsletter
          ? {
              title: attrs.newsletter.title ?? '',
              subtitle: attrs.newsletter.subtitle ?? undefined,
              placeholder: attrs.newsletter.placeholder ?? 'Enter your email',
              buttonLabel: attrs.newsletter.buttonLabel ?? 'Subscribe',
              successMessage: attrs.newsletter.successMessage ?? 'Thank you for subscribing!',
            }
          : undefined,
        copyright: attrs.copyright ?? '',
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
        const filteredItems = navigationItems.filter(
          (item: StrapiNavigationItem) =>
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
      console.warn(
        'Some navigation items may reference deleted pages. Please check your Strapi navigation configuration.'
      );

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

  // Certifications & Guarantees Page API
  async getCertificationsGuaranteesPage(): Promise<StrapiCertificationsGuaranteesPage | null> {
    try {
      // Include draft content in development
      const isDevelopment = process.env.NODE_ENV === 'development';
      const publicationState = isDevelopment ? 'preview' : 'live';

      const response = await fetch(
        `${this.baseURL}/api/certifications-guarantees?publicationState=${publicationState}`,
        {
          headers: this.token
            ? {
                Authorization: `Bearer ${this.token}`,
              }
            : {},
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || null;
    } catch (error) {
      console.error('Error fetching Certifications & Guarantees page:', error);
      return null;
    }
  }

  // Jotun Page API
  async getJotunPage(): Promise<StrapiJotunPage | null> {
    try {
      // Include draft content in development
      const isDevelopment = process.env.NODE_ENV === 'development';
      const publicationState = isDevelopment ? 'preview' : 'live';

      const response = await fetch(
        `${this.baseURL}/api/jotun-page?publicationState=${publicationState}`,
        {
          headers: this.token
            ? {
                Authorization: `Bearer ${this.token}`,
              }
            : {},
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || null;
    } catch (error) {
      console.error('Error fetching Jotun page:', error);
      return null;
    }
  }

  // Contact Page API
  async getContactPage(): Promise<StrapiContactPage | null> {
    try {
      // Include draft content in development
      const isDevelopment = process.env.NODE_ENV === 'development';
      const publicationState = isDevelopment ? 'preview' : 'live';
      // Force English locale for testing (until Romanian version is created)
      const endpoint = `/contact?populate[ContactHero][populate]=*&populate[ContactInfo][populate]=*&populate[SalesTeam][populate]=*&populate[Map][populate]=*&publicationState=${publicationState}&locale=en`;
      const response = await this.fetchAPI(endpoint, { skipLocale: true });
      return response.data || null;
    } catch (error) {
      console.error('Error fetching contact page:', error);
      return null;
    }
  }

  // Contact Form Configuration API
  async getContactFormConfig(): Promise<{ contactForm: Record<string, unknown> } | null> {
    try {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const publicationState = isDevelopment ? 'preview' : 'live';
      const response = await this.fetchAPI(
        `/contact-form-config?populate=*&publicationState=${publicationState}`
      );
      return response.data || null;
    } catch (error) {
      console.error('Error fetching contact form config:', error);
      return null;
    }
  }

  // Business Partners API
  async getBusinessPartners(): Promise<Record<string, unknown> | null> {
    try {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const publicationState = isDevelopment ? 'preview' : 'live';

      // Deep population for Business Partners with all nested components
      const populateParams = [
        'populate[hero][populate]=*',
        'populate[philosophy][populate]=*',
        'populate[categories][populate][residentialCard][populate]=*',
        'populate[categories][populate][industrialCard][populate]=*',
        'populate[categories][populate][medicalCard][populate]=*',
        'populate[categories][populate][retailCard][populate]=*',
        'populate[pillars][populate][pillars][populate]=*',
        'populate[showcase][populate][allPartners][populate]=*',
        'populate[successStories][populate][stories][populate]=*',
        'populate[cta][populate]=*',
      ].join('&');

      const response = await this.fetchAPI(
        `/business-partners?${populateParams}&publicationState=${publicationState}`
      );
      return response.data || null;
    } catch (error) {
      console.error('Error fetching business partners:', error);
      return null;
    }
  }

  // Business Partner Pages API (Collection)
  async getBusinessPartnerPages(): Promise<Record<string, unknown>[] | null> {
    try {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const publicationState = isDevelopment ? 'preview' : 'live';

      // Deep population for Business Partner Pages
      const populateParams = [
        'populate[hero][populate]=*',
        'populate[introduction][populate]=*',
        'populate[caseStudies][populate][caseStudies][populate]=*',
        'populate[testimonials][populate][testimonials][populate]=*',
        'populate[cta][populate]=*',
      ].join('&');

      const response = await this.fetchAPI(
        `/business-partner-pages?${populateParams}&publicationState=${publicationState}`
      );
      return response.data || null;
    } catch (error) {
      console.error('Error fetching business partner pages:', error);
      return null;
    }
  }

  // Get specific Business Partner Page by slug
  async getBusinessPartnerPageBySlug(slug: string): Promise<Record<string, unknown> | null> {
    try {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const publicationState = isDevelopment ? 'preview' : 'live';

      // Populate nested components properly
      const populateParams = [
        'populate[hero][populate]=*',
        'populate[introduction]=*',
        'populate[caseStudies][populate][caseStudies][populate]=*',
        'populate[testimonials][populate][testimonials][populate]=*',
        'populate[cta][populate]=*',
      ].join('&');

      const response = await this.fetchAPI(
        `/business-partner-pages?filters[slug][$eq]=${slug}&${populateParams}&publicationState=${publicationState}`
      );
      return response.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching business partner page by slug:', error);
      return null;
    }
  }
}

export const strapiAPI = new StrapiAPI();
export { StrapiAPI };
export type { StrapiButton, StrapiHeader, StrapiMedia, StrapiNavigationItem, StrapiPage };
