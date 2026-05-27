'use client';

import type { FC } from 'react';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';
import { motion, useReducedMotion } from 'framer-motion';
import { blurSlideUp } from '@/lib/motion';

type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  const reduced = useReducedMotion();

  return (
    <section
      className="bg-surface-container py-section-gap px-margin-mobile md:px-margin-desktop"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <motion.div
        className="max-w-container-max mx-auto text-center flex flex-col items-center gap-6"
        initial={reduced ? { opacity: 0 } : blurSlideUp.hidden}
        whileInView={reduced ? { opacity: 1 } : blurSlideUp.visible}
        viewport={{ once: true, margin: '-60px' }}
      >
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary">{children}</h2>
            ),
          }}
        />

        {slice.primary.body && (
          <div className="font-body-md text-body-md text-on-surface-variant max-w-lg">
            <PrismicRichText field={slice.primary.body} />
          </div>
        )}

        {slice.primary.button_label && (
          <motion.div
            whileHover={reduced ? {} : { scale: 1.05 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="mt-4"
          >
            <PrismicNextLink
              field={slice.primary.button_link}
              className="inline-block bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-[0.1em] px-10 py-4 hover:bg-primary hover:text-on-primary transition-colors duration-300"
            >
              {slice.primary.button_label}
            </PrismicNextLink>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default CallToAction;
