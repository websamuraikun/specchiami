'use client';

import { useState } from 'react';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

type GalleryGridProps = SliceComponentProps<Content.GalleryGridSlice>;

const FILTERS = ['All', 'Weddings', 'Corporate', 'Parties'] as const;
type Filter = (typeof FILTERS)[number];

export default function GalleryGrid({ slice }: GalleryGridProps) {
  const [active, setActive] = useState<Filter>('All');
  const items = slice.items ?? [];

  const visible = items.filter((item) => {
    if (active === 'All') return true;
    return item.category?.toLowerCase() === active.toLowerCase();
  });

  return (
    <section
      className="pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pt-32 md:pt-40"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Header */}
      <header className="text-center mb-16 md:mb-24">
        {slice.primary.heading && (
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6">
            {slice.primary.heading}
          </h1>
        )}
        {slice.primary.intro && (
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            {slice.primary.intro}
          </p>
        )}

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-8 border-b border-surface-dim pb-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`text-label-md font-label-md uppercase tracking-wider pb-2 transition-colors border-b-2 ${
                active === f
                  ? 'text-primary border-primary'
                  : 'text-on-surface-variant border-transparent hover:text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* Masonry grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-gutter space-y-gutter">
        {visible.map((item, i) => {
          const hasImage = item.image && 'url' in item.image && item.image.url;
          if (!hasImage) return null;

          return (
            <div
              key={i}
              className="break-inside-avoid relative group overflow-hidden bg-surface-container-low"
            >
              <PrismicNextImage
                field={item.image}
                width={600}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {item.venue_name && (
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-headline-sm text-headline-sm tracking-wide drop-shadow-md">
                    {item.venue_name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
