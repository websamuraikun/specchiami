'use client';

import type { FC } from 'react';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { motion, useReducedMotion } from 'framer-motion';
import { blurSlideUp, staggerContainer, ease } from '@/lib/motion';

type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
  const reduced = useReducedMotion();

  const cardVariant = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }
    : { hidden: { opacity: 0, filter: 'blur(8px)', y: 24 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6, ease } } };

  return (
    <section
      className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-lg mx-auto mb-16 flex flex-col gap-3"
          initial={reduced ? { opacity: 0 } : blurSlideUp.hidden}
          whileInView={reduced ? { opacity: 1 } : blurSlideUp.visible}
          viewport={{ once: true, margin: '-60px' }}
        >
          {slice.primary.eyebrow && (
            <span className="font-label-md text-label-md uppercase tracking-[0.1em] text-primary">
              {slice.primary.eyebrow}
            </span>
          )}
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary">{children}</h2>
              ),
            }}
          />
        </motion.div>

        {/* Grid */}
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-3 gap-gutter"
          role="list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {slice.items.map((item, i) => (
            <motion.li
              key={i}
              className="bg-[#F5F0E5] rounded-sm p-8 flex flex-col gap-5 relative"
              variants={cardVariant}
            >
              <span className="font-display-lg text-6xl leading-none text-primary opacity-30 absolute top-5 right-6" aria-hidden>
                &#8220;
              </span>
              <div className="font-body-md text-body-md text-on-surface leading-relaxed italic flex-1">
                <PrismicRichText field={item.quote} />
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/40">
                {item.author_photo && 'url' in item.author_photo && item.author_photo.url && (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-surface-container">
                    <PrismicNextImage field={item.author_photo} fill className="object-cover object-top" sizes="44px" />
                  </div>
                )}
                <div className="flex flex-col gap-0.5">
                  {item.author_name && (
                    <p className="font-body-md text-body-md font-medium text-on-surface text-sm">{item.author_name}</p>
                  )}
                  {item.author_role && (
                    <p className="font-label-md text-label-md text-on-surface-variant text-xs uppercase tracking-widest">{item.author_role}</p>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Testimonials;
