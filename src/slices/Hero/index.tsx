'use client';

import type { FC } from 'react';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { motion, useReducedMotion } from 'framer-motion';
import { blurSlideUp, imageEntrance, ease } from '@/lib/motion';

type HeroProps = SliceComponentProps<Content.HeroSlice>;

function AnimatedHeading({ text, reduced }: { text: string; reduced: boolean | null }) {
  const words = text.split(' ');
  if (reduced) {
    return (
      <motion.h1
        className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {text}
      </motion.h1>
    );
  }
  return (
    <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary flex flex-wrap" style={{ rowGap: '0.1em' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: '0.28em' }}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 40 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: (i * 100) / 1000 }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

const Hero: FC<HeroProps> = ({ slice }) => {
  const reduced = useReducedMotion();

  // Extract plain text from heading rich text for word animation
  const headingText =
    slice.primary.heading
      ?.map((block: { text?: string }) => block.text ?? '')
      .join(' ') ?? '';

  return (
    <section
      className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap min-h-[80vh] flex flex-col md:flex-row items-center gap-gutter pt-32 md:pt-40"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Text column */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center pr-0 md:pr-12">
        {headingText ? (
          <div className="mb-6">
            <AnimatedHeading text={headingText} reduced={reduced} />
          </div>
        ) : (
          <div className="mb-6">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading1: ({ children }) => (
                  <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary">{children}</h1>
                ),
              }}
            />
          </div>
        )}

        {slice.primary.body && (
          <motion.p
            className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg"
            initial={reduced ? { opacity: 0 } : blurSlideUp.hidden}
            animate={reduced ? { opacity: 1 } : blurSlideUp.visible}
            transition={{ delay: 0.4 }}
          >
            {slice.primary.body}
          </motion.p>
        )}

        <motion.div
          className="flex flex-wrap gap-4"
          initial={reduced ? { opacity: 0 } : blurSlideUp.hidden}
          animate={reduced ? { opacity: 1 } : blurSlideUp.visible}
          transition={{ delay: 0.55 }}
        >
          {slice.primary.cta_label && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <PrismicNextLink
                field={slice.primary.cta_link}
                className="inline-block bg-primary-container text-on-primary-container px-8 py-4 uppercase tracking-[0.1em] text-label-md font-label-md hover:bg-primary hover:text-on-primary transition-colors duration-300"
              >
                {slice.primary.cta_label}
              </PrismicNextLink>
            </motion.div>
          )}
          {slice.primary.secondary_cta_label && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <PrismicNextLink
                field={slice.primary.secondary_cta_link}
                className="inline-block bg-transparent text-primary border border-primary px-8 py-4 uppercase tracking-[0.1em] text-label-md font-label-md hover:bg-primary-container hover:border-primary-container transition-colors duration-300"
              >
                {slice.primary.secondary_cta_label}
              </PrismicNextLink>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Image column */}
      {slice.primary.image && 'url' in slice.primary.image && slice.primary.image.url && (
        <motion.div
          className="w-full md:w-1/2 mt-12 md:mt-0 relative overflow-hidden rounded-sm"
          style={{ aspectRatio: '4/5' }}
          initial={reduced ? { opacity: 0 } : imageEntrance.hidden}
          animate={reduced ? { opacity: 1 } : imageEntrance.visible}
          transition={{ delay: 0.2 }}
        >
          <PrismicNextImage
            field={slice.primary.image}
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
