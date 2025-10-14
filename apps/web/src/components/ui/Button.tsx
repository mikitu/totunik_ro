import React from 'react';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/icons/Icon';

interface ButtonProps {
  label: string;
  url?: string;
  variant?: 'primary' | 'secondary' | 'translucent';
  iconLeft?: IconName;
  iconRight?: IconName;
  target?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  label,
  url,
  variant = 'primary',
  iconLeft = 'none',
  iconRight = 'none',
  target = '_self',
  className = '',
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'group inline-flex items-center justify-center font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105';
  
  const variantClasses = {
    primary: 'px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900',
    translucent: 'px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  const content = (
    <>
      {iconLeft && iconLeft !== 'none' && (
        <Icon 
          name={iconLeft} 
          className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" 
        />
      )}
      <span>{label}</span>
      {iconRight && iconRight !== 'none' && (
        <Icon 
          name={iconRight} 
          className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
        />
      )}
    </>
  );

  if (url) {
    const isExternal = url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:');
    
    if (isExternal) {
      return (
        <a
          href={url}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className={buttonClasses}
          onClick={disabled ? (e) => e.preventDefault() : onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={url}
        className={buttonClasses}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

// Helper component for Strapi button data
interface StrapiButtonProps {
  button: {
    label: string;
    url: string;
    variant?: 'primary' | 'secondary' | 'translucent';
    iconLeft?: IconName;
    iconRight?: IconName;
    target?: string;
  };
  className?: string;
  onClick?: () => void;
}

export function StrapiButton({ button, className, onClick }: StrapiButtonProps) {
  return (
    <Button
      label={button.label}
      url={button.url}
      variant={button.variant}
      iconLeft={button.iconLeft}
      iconRight={button.iconRight}
      target={button.target}
      className={className}
      onClick={onClick}
    />
  );
}
