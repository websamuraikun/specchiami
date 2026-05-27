'use client';

import type { FC } from 'react';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { motion, useReducedMotion } from 'framer-motion';
import { blurSlideUp, imageEntrance, ease } from '@/lib/motion';

type AboutHeroProps = SliceComponentProps<Content.AboutHeroSlice>;

const AboutHero: FC<AboutHeroProps> = ({ slice }) => {
  const reduced = useReducedMotion();

  return (
    <section
      className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center pt-32 md:pt-40"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Text column */}
      <motion.div
        className="md:col-span-5 md:col-start-1 z-10 flex flex-col gap-6 md:-mr-12"
        initial={reduced ? { opacity: 0 } : { ...blurSlideUp.hidden, x: -20 }}
        animate={reduced ? { opacity: 1 } : { ...blurSlideUp.visible, x: 0, transition: { duration: 0.8, ease } }}
      >
        <div className="font-display-lg text-display-lg text-primary leading-tight">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary leading-tight">
                  {children}
                </h1>
              ),
              em: ({ children }) => (
                <em className="not-italic text-primary-container">{children}</em>
              ),
            }}
          />
        </div>

        <div className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
          <PrismicRichText field={slice.primary.body} />
        </div>

        {slice.primary.link_label && (
          <div className="pt-4">
            <a
              href={`#${slice.primary.link_anchor ?? 'our-story'}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-container transition-colors text-label-md font-label-md uppercase tracking-widest border-b border-primary pb-1"
            >
              {slice.primary.link_label}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        )}
      </motion.div>

      {/* Image column */}
      <motion.div
        className="md:col-span-7 md:col-start-6 relative mt-12 md:mt-0"
        style={{ height: '80vh', minHeight: '500px' }}
        initial={reduced ? { opacity: 0 } : imageEntrance.hidden}
        animate={reduced ? { opacity: 1 } : imageEntrance.visible}
        transition={{ delay: 0.2 }}
      >
        {slice.primary.main_image && 'url' in slice.primary.main_image && slice.primary.main_image.url && (
          <div className="absolute inset-0 bg-surface-container-low rounded-xl overflow-hidden shadow-[0px_10px_40px_rgba(197,160,89,0.08)]">
            <PrismicNextImage
              field={slice.primary.main_image}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
        )}

        {slice.primary.accent_image && 'url' in slice.primary.accent_image && slice.primary.accent_image.url && (
          <motion.div
            className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-48 h-48 md:w-64 md:h-64 bg-surface rounded-xl p-3 shadow-[0px_10px_40px_rgba(197,160,89,0.08)] z-20 overflow-hidden"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <PrismicNextImage
              field={slice.primary.accent_image}
              fill
              className="object-cover rounded-lg"
              sizes="256px"
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default AboutHero;
