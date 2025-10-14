import FooterClient from './FooterClient';
import { strapiAPI } from '@/lib/strapi';

export default async function Footer() {
  const footer = await strapiAPI.getFooter();
  if (!footer) return null;
  return <FooterClient footer={footer} />;
}
