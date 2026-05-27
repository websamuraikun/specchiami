import type { FC } from "react";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./index.module.css";

type AboutProps = SliceComponentProps<Content.AboutSlice>;

const About: FC<AboutProps> = ({ slice }) => {
  const imageLeft = slice.variation === "imageLeft";
  const hasImage =
    slice.primary.image && "url" in slice.primary.image && slice.primary.image.url;

  return (
    <section
      className={`${styles.section} ${imageLeft ? styles.imageLeft : ""}`}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={styles.container}>
        <div className={styles.text}>
          {slice.primary.eyebrow && (
            <span className={styles.eyebrow}>{slice.primary.eyebrow}</span>
          )}
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <h2 className={styles.heading}>{children}</h2>
              ),
            }}
          />
          <div className={styles.body}>
            <PrismicRichText field={slice.primary.body} />
          </div>
          {slice.primary.button_label && (
            <PrismicNextLink
              field={slice.primary.button_link}
              className={styles.button}
            >
              {slice.primary.button_label}
            </PrismicNextLink>
          )}
        </div>

        {hasImage && (
          <div className={styles.imageWrapper}>
            <PrismicNextImage
              field={slice.primary.image}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
