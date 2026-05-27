import Link from 'next/link';
import { PrismicRichText } from '@prismicio/react';
import { createClient } from '@/prismicio';

export default async function Footer() {
  const client = createClient();
  let siteName = 'Specchiami';
  let contactEmail: string | null = null;
  let contactPhone: string | null = null;
  const year = new Date().getFullYear();

  try {
    const settings = await client.getSingle('settings');
    siteName = settings.data.site_name ?? siteName;
    contactEmail = settings.data.contact_email ?? null;
    contactPhone = settings.data.contact_phone ?? null;
  } catch {
    // Settings not configured in Prismic yet
  }

  return (
    <footer className="w-full bg-surface-container-low">
      <div className="w-full py-section-gap px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter items-start max-w-container-max mx-auto">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <span className="font-display-lg text-headline-md text-primary tracking-tight">
            {siteName.toUpperCase()}
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
            Redefining event photography with understated elegance and cutting-edge reflection.
          </p>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-4">
          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
            >
              {contactEmail}
            </a>
          )}
          {contactPhone && (
            <a
              href={`tel:${contactPhone}`}
              className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
            >
              {contactPhone}
            </a>
          )}
          <Link
            href="/contatti"
            className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 md:items-end">
          <Link
            href="/privacy"
            className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-outline-variant/30 px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-label-md text-label-md text-on-surface-variant/60 uppercase tracking-widest text-xs">
          © {year} {siteName.toUpperCase()}. All rights reserved.
        </p>
        <p className="font-label-md text-label-md text-on-surface-variant/40 uppercase tracking-widest text-xs">
          Designed in Italy
        </p>
      </div>
    </footer>
  );
}
