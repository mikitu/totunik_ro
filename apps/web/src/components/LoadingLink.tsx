'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLoading } from './LoadingProvider';

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  onClick?: () => void;
  [key: string]: any; // Allow other props to pass through
}

export function LoadingLink({
  href,
  children,
  className,
  target,
  onClick,
  ...props
}: LoadingLinkProps) {
  const { setLoading } = useLoading();
  const pathname = usePathname();

  const handleClick = (_e: React.MouseEvent) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }

    // Don't show loading for external links or same page links
    if (
      target === '_blank' ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return;
    }

    // Don't show loading if we're already on this page
    if (href === pathname) {
      return;
    }

    // Don't show loading for anchor links on same page
    if (href.startsWith('#')) {
      return;
    }

    // Show loading for internal navigation
    setLoading(true);
  };

  return (
    <Link href={href} className={className} target={target} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
