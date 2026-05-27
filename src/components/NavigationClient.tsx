'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

type NavItem = {
  label: string | null;
  link: Parameters<typeof PrismicNextLink>[0]['field'];
};

type NavigationClientProps = {
  siteName: string;
  logo: Parameters<typeof PrismicNextImage>[0]['field'] | null;
  navItems: NavItem[];
};

export function NavigationClient({ siteName, logo, navItems }: NavigationClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto bg-surface/80 backdrop-blur-xl transition-all duration-300">
      <Link href="/" className="flex items-center flex-shrink-0" aria-label="Go to homepage">
        {logo && 'url' in logo && logo.url ? (
          <PrismicNextImage field={logo} height={40} width={160} className="h-10 w-auto object-contain" />
        ) : (
          <span className="font-display-lg text-headline-sm text-primary tracking-tight">
            {siteName}
          </span>
        )}
      </Link>

      <div className="hidden md:flex gap-gutter items-center">
        {navItems.map((item, i) => (
          <PrismicNextLink
            key={i}
            field={item.link}
            className="text-on-surface-variant text-label-md font-label-md uppercase tracking-[0.1em] hover:text-primary transition-colors duration-300"
          >
            {item.label}
          </PrismicNextLink>
        ))}
      </div>

      <Link
        href="/contatti"
        className="hidden md:block bg-primary-container text-on-primary-container px-6 py-3 uppercase tracking-[0.1em] text-label-md font-label-md hover:bg-primary hover:text-on-primary transition-colors duration-300"
      >
        Enquiries
      </Link>

      <button
        className="md:hidden text-primary p-2"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {menuOpen ? (
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface border-t border-outline-variant/30 flex flex-col px-margin-mobile py-8 gap-6 md:hidden">
          {navItems.map((item, i) => (
            <PrismicNextLink
              key={i}
              field={item.link}
              className="text-on-surface-variant text-label-md font-label-md uppercase tracking-[0.1em] hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </PrismicNextLink>
          ))}
          <Link
            href="/contatti"
            className="bg-primary-container text-on-primary-container px-6 py-3 uppercase tracking-[0.1em] text-label-md font-label-md text-center hover:bg-primary hover:text-on-primary transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Enquiries
          </Link>
        </div>
      )}
    </nav>
  );
}
