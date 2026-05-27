'use client';

import type { FC } from 'react';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { motion, useReducedMotion } from 'framer-motion';
import { blurSlideUp, imageEntrance, ease } from '@/lib/motion';

type ServiceEntryProps = SliceComponentProps<Content.ServiceEntrySlice>;

const ServiceEntry: FC<ServiceEntryProps> = ({ slice }) => {
  const reduced = useReducedMotion();
  const items = slice.items ?? [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Page header */}
      <motion.header
        className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap text-center md:text-left pt-32 md:pt-40"
        initial={reduced ? { opacity: 0 } : blurSlideUp.hidden}
        animate={reduced ? { opacity: 1 } : blurSlideUp.visible}
      >
        {slice.primary.page_heading && (
          <div className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6">
            <PrismicRichText
              field={slice.primary.page_heading}
              components={{
                heading1: ({ children }) => <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary">{children}</h1>,
              }}
            />
          </div>
        )}
        {slice.primary.page_intro && (
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            {slice.primary.page_intro}
          </p>
        )}
      </motion.header>

      {/* Service items */}
      <div className="space-y-section-gap pb-section-gap">
        {items.map((item, i) => {
          const imageLeft = item.image_position === 'left' || (item.image_position == null && i % 2 === 0);
          const hasImage = item.image && 'url' in item.image && item.image.url;

          const textHidden = reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)', x: imageLeft ? 24 : -24 };
          const textVisible = reduced ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)', x: 0, transition: { duration: 0.7, ease, delay: 0.15 } };
          const imgHidden = reduced ? { opacity: 0 } : { ...imageEntrance.hidden, x: imageLeft ? -24 : 24 };
          const imgVisible = reduced ? { opacity: 1 } : { ...imageEntrance.visible, x: 0 };

          return (
            <div
              key={i}
              className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
                {/* Image */}
                {hasImage && (
                  <motion.div
                    className={`md:col-span-7 ${imageLeft ? 'order-2 md:order-1' : 'order-2'}`}
                    initial={imgHidden}
                    whileInView={imgVisible}
                    viewport={{ once: true, margin: '-80px' }}
                  >
                    <div className="relative w-full aspect-[4/3] bg-surface-variant overflow-hidden group rounded-sm">
                      <PrismicNextImage
                        field={item.image}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Text */}
                <motion.div
                  className={`${hasImage ? 'md:col-span-5' : 'md:col-span-12'} ${imageLeft ? 'md:pl-12 order-1 md:order-2' : 'md:pr-12 order-1'}`}
                  initial={textHidden}
                  whileInView={textVisible}
                  viewport={{ once: true, margin: '-80px' }}
                >
                  {item.number_label && (
                    <span className="font-label-md text-label-md uppercase text-primary tracking-[0.1em] mb-4 block">
                      {item.number_label}
                    </span>
                  )}
                  {item.heading && (
                    <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">
                      {item.heading}
                    </h2>
                  )}
                  {item.body && (
                    <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                      {item.body}
                    </p>
                  )}

                  {item.bullet_items && (
                    <ul className="space-y-3 mb-10 border-t border-outline-variant/30 pt-6">
                      <PrismicRichText
                        field={item.bullet_items}
                        components={{
                          listItem: ({ children }) => (
                            <li className="flex items-center text-body-md text-on-surface">
                              <span className="text-primary mr-3 text-sm flex-shrink-0">✓</span>
                              {children}
                            </li>
                          ),
                        }}
                      />
                    </ul>
                  )}

                  {item.cta_label && (
                    <motion.div
                      whileHover={reduced ? {} : { scale: 1.05 }}
                      whileTap={reduced ? {} : { scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="inline-block"
                    >
                      <PrismicNextLink
                        field={item.cta_link}
                        className="inline-block bg-primary text-on-primary font-label-md text-label-md uppercase tracking-[0.1em] px-8 py-4 hover:bg-primary-container hover:text-on-primary-container transition-colors"
                      >
                        {item.cta_label}
                      </PrismicNextLink>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceEntry;
