'use client';

import type { FC } from 'react';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { motion, useReducedMotion } from 'framer-motion';
import { blurSlideUp, staggerContainer, ease } from '@/lib/motion';

type TeamProps = SliceComponentProps<Content.TeamSlice>;

const Team: FC<TeamProps> = ({ slice }) => {
  const reduced = useReducedMotion();

  const cardVariant = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }
    : { hidden: { opacity: 0, filter: 'blur(8px)', y: 28 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6, ease } } };

  return (
    <section
      className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3"
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
          {slice.primary.description && (
            <div className="font-body-md text-body-md text-on-surface-variant">
              <PrismicRichText field={slice.primary.description} />
            </div>
          )}
        </motion.div>

        {/* Team grid */}
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          role="list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {slice.items.map((member, i) => (
            <motion.li key={i} className="flex flex-col gap-5" variants={cardVariant}>
              {/* Portrait photo */}
              <div className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-full bg-surface-container-low" style={{ aspectRatio: '2/3' }}>
                {member.photo && 'url' in member.photo && member.photo.url ? (
                  <PrismicNextImage
                    field={member.photo}
                    fill
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 600px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container" />
                )}
              </div>
              {/* Info */}
              <div className="text-center flex flex-col gap-1">
                {member.name && (
                  <p className="font-headline-sm text-headline-sm text-on-surface">{member.name}</p>
                )}
                {member.role && (
                  <p className="font-label-md text-label-md uppercase tracking-[0.08em] text-primary">{member.role}</p>
                )}
                {member.bio && (
                  <div className="font-body-md text-body-md text-on-surface-variant mt-2">
                    <PrismicRichText field={member.bio} />
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Team;
