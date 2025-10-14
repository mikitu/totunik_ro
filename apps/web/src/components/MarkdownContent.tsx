'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
  className?: string;
  variant?: 'default' | 'white' | 'large' | 'small';
}

export default function MarkdownContent({ 
  content, 
  className = '', 
  variant = 'default' 
}: MarkdownContentProps) {
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'white':
        return 'prose-invert text-white/90';
      case 'large':
        return 'prose-xl';
      case 'small':
        return 'prose-sm';
      default:
        return 'prose-gray text-gray-700';
    }
  };

  const getComponents = () => {
    const baseComponents = {
      // Headings
      h1: ({ children }: any) => (
        <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${
          variant === 'white' ? 'text-white' : 'text-gray-900'
        }`}>
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className={`text-2xl md:text-3xl font-semibold mb-4 ${
          variant === 'white' ? 'text-white' : 'text-gray-900'
        }`}>
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className={`text-xl md:text-2xl font-semibold mb-3 ${
          variant === 'white' ? 'text-white' : 'text-gray-900'
        }`}>
          {children}
        </h3>
      ),
      
      // Paragraphs
      p: ({ children }: any) => (
        <p className={`mb-4 leading-relaxed ${
          variant === 'white' 
            ? 'text-white/90' 
            : variant === 'large'
            ? 'text-xl text-gray-700'
            : 'text-gray-700'
        }`}>
          {children}
        </p>
      ),
      
      // Text formatting
      strong: ({ children }: any) => (
        <strong className={`font-bold ${
          variant === 'white' ? 'text-white' : 'text-gray-900'
        }`}>
          {children}
        </strong>
      ),
      em: ({ children }: any) => (
        <em className={`italic ${
          variant === 'white' ? 'text-white/95' : 'text-gray-700'
        }`}>
          {children}
        </em>
      ),
      
      // Links
      a: ({ children, href }: any) => (
        <a 
          href={href} 
          className={`underline transition-colors ${
            variant === 'white' 
              ? 'text-white hover:text-white/80' 
              : 'text-orange-600 hover:text-orange-700'
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      
      // Lists
      ul: ({ children }: any) => (
        <ul className={`list-disc list-inside mb-4 space-y-2 ${
          variant === 'white' ? 'text-white/90' : 'text-gray-700'
        }`}>
          {children}
        </ul>
      ),
      ol: ({ children }: any) => (
        <ol className={`list-decimal list-inside mb-4 space-y-2 ${
          variant === 'white' ? 'text-white/90' : 'text-gray-700'
        }`}>
          {children}
        </ol>
      ),
      li: ({ children }: any) => (
        <li className="leading-relaxed">{children}</li>
      ),
      
      // Blockquotes
      blockquote: ({ children }: any) => (
        <blockquote className={`border-l-4 pl-4 italic mb-4 ${
          variant === 'white' 
            ? 'border-white/30 text-white/80' 
            : 'border-orange-500 text-gray-600'
        }`}>
          {children}
        </blockquote>
      ),
      
      // Code
      code: ({ children }: any) => (
        <code className={`px-2 py-1 rounded text-sm font-mono ${
          variant === 'white' 
            ? 'bg-white/20 text-white' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {children}
        </code>
      ),
    };

    return baseComponents;
  };

  return (
    <div className={`prose max-w-none ${getVariantClasses()} ${className}`}>
      <ReactMarkdown components={getComponents()}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
