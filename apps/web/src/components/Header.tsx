import type { StrapiHeader, StrapiNavigationItem } from '@/lib/strapi';
import HeaderWrapper from './HeaderWrapper';

interface HeaderProps {
  headerData?: StrapiHeader | null;
  navigationData?: StrapiNavigationItem[];
}

export default function Header({ headerData, navigationData }: HeaderProps = {}) {
  return <HeaderWrapper headerData={headerData} navigationData={navigationData} />;
}
