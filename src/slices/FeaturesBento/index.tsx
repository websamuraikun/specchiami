'use client';

import type { FC } from 'react';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { motion, useReducedMotion } from 'framer-motion';
import { blurSlideUp, staggerContainer, cardHover, ease } from '@/lib/motion';

type FeaturesBentoProps = SliceComponentProps<Content.FeaturesBentoSlice>;

const FeaturesBento: FC<FeaturesBentoProps> = ({ slice }) => {
  const reduced = useReducedMotion();
  const items = slice.items ?? [];

  const cardStyles: Array<'warm' | 'cool' | 'image-overlay' | 'accent'> = [
    'warm', 'cool', 'image-overlay', 'accent',
  ];

  const itemVariant = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }
    : { hidden: { opacity: 0, filter: 'blur(8px)', y: 24 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6, ease } } };

  return (
    <section
      className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={reduced ? { opacity: 0 } : blurSlideUp.hidden}
        whileInView={reduced ? { opacity: 1 } : blurSlideUp.visible}
        viewport={{ once: true, margin: '-60px' }}
      >
        {slice.primary.section_heading && (
          <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary mb-4">
            {slice.primary.section_heading}
          </h2>
        )}
        {slice.primary.section_body && (
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            {slice.primary.section_body}
          </p>
        )}
      </motion.div>

      {/* Bento grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-gutter"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {items.map((item, i) => {
          const style = item.card_style ?? cardStyles[i % 4];
          const isLarge = i % 4 === 0 || i % 4 === 3;
          const hasImage = item.image && 'url' in item.image && item.image.url;

          if (style === 'image-overlay' && hasImage) {
            return (
              <motion.div
                key={i}
                className={`${isLarge ? 'md:col-span-8' : 'md:col-span-4'} relative overflow-hidden group`}
                style={{ minHeight: '400px' }}
                variants={itemVariant}
                whileHover={reduced ? {} : { scale: 1.018 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <PrismicNextImage
                  field={item.image}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent flex flex-col justify-end p-8">
                  {item.title && (
                    <h3 className="font-headline-sm text-headline-sm text-surface-bright mb-2">{item.title}</h3>
                  )}
                  {item.body && (
                    <p className="font-body-md text-body-md text-surface-variant">{item.body}</p>
                  )}
                </div>
              </motion.div>
            );
          }

          if (isLarge && hasImage) {
            return (
              <motion.div
                key={i}
                className={`${isLarge ? 'md:col-span-8' : 'md:col-span-4'} bg-[#F5F0E5] rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group`}
                variants={itemVariant}
                whileHover={reduced ? {} : { y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <div className="w-full md:w-1/2 z-10">
                  {item.icon && (
                    <span className="text-primary text-4xl mb-4 block">{item.icon}</span>
                  )}
                  {item.title && (
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-3">{item.title}</h3>
                  )}
                  {item.body && (
                    <p className="font-body-md text-body-md text-on-surface-variant">{item.body}</p>
                  )}
                </div>
                <div className="w-full md:w-1/2 relative overflow-hidden rounded-sm" style={{ minHeight: '300px' }}>
                  <PrismicNextImage
                    field={item.image}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
              </motion.div>
            );
          }

          const bgClass = style === 'warm' ? 'bg-[#F5F0E5]' :
            style === 'accent' ? 'bg-surface border border-outline-variant/30' :
            'bg-surface-container-low';

          return (
            <motion.div
              key={i}
              className={`${isLarge ? 'md:col-span-8' : 'md:col-span-4'} ${bgClass} rounded-sm p-8 md:p-12 flex flex-col justify-center ${isLarge ? 'items-center text-center' : ''}`}
              variants={itemVariant}
              whileHover={reduced ? {} : { y: -7, scale: 1.018 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              {item.icon && (
                <span className="text-primary text-4xl mb-4 block">{item.icon}</span>
              )}
              {item.title && (
                <h3 className="font-headline-sm text-headline-sm text-primary mb-3">{item.title}</h3>
              )}
              {item.body && (
                <p className="font-body-md text-body-md text-on-surface-variant">{item.body}</p>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default FeaturesBento;
