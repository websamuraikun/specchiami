'use client';

import type { FC } from 'react';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { motion, useReducedMotion } from 'framer-motion';
import { blurSlideUp, imageEntrance, ease } from '@/lib/motion';

type StorySectionProps = SliceComponentProps<Content.StorySectionSlice>;

const StorySection: FC<StorySectionProps> = ({ slice }) => {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto"
      id={slice.primary.anchor_id ?? 'our-story'}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        {/* Sticky headline */}
        <motion.div
          className="md:col-span-4 md:sticky md:top-32 pb-12 md:pb-0"
          initial={reduced ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)', x: -20 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)', x: 0, transition: { duration: 0.7, ease } }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="font-headline-lg text-headline-lg text-on-surface mb-4">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({ children }) => (
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">{children}</h2>
                ),
              }}
            />
          </div>
          <div className="w-12 h-1 bg-primary-container" />
        </motion.div>

        {/* Narrative column */}
        <div className="md:col-span-7 md:col-start-6 flex flex-col gap-12">
          {slice.primary.paragraph_1 && (
            <motion.div
              className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed"
              initial={reduced ? { opacity: 0 } : blurSlideUp.hidden}
              whileInView={reduced ? { opacity: 1 } : blurSlideUp.visible}
              viewport={{ once: true, margin: '-60px' }}
            >
              <PrismicRichText field={slice.primary.paragraph_1} />
            </motion.div>
          )}

          {slice.primary.middle_image && 'url' in slice.primary.middle_image && slice.primary.middle_image.url && (
            <motion.div
              className="w-full overflow-hidden rounded-xl"
              style={{ height: '400px', position: 'relative' }}
              initial={reduced ? { opacity: 0 } : imageEntrance.hidden}
              whileInView={reduced ? { opacity: 1 } : imageEntrance.visible}
              viewport={{ once: true, margin: '-80px' }}
            >
              <PrismicNextImage
                field={slice.primary.middle_image}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </motion.div>
          )}

          {slice.primary.paragraph_2 && (
            <motion.div
              className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed"
              initial={reduced ? { opacity: 0 } : blurSlideUp.hidden}
              whileInView={reduced ? { opacity: 1 } : blurSlideUp.visible}
              viewport={{ once: true, margin: '-60px' }}
            >
              <PrismicRichText field={slice.primary.paragraph_2} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
