import type { FC } from "react";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import styles from "./index.module.css";

type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

const Services: FC<ServicesProps> = ({ slice }) => {
  return (
    <section
      className={styles.section}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={styles.container}>
        <div className={styles.header}>
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
          {slice.primary.description && (
            <div className={styles.description}>
              <PrismicRichText field={slice.primary.description} />
            </div>
          )}
        </div>

        <ul className={styles.grid} role="list">
          {slice.items.map((item, i) => (
            <li key={i} className={styles.card}>
              {item.icon && "url" in item.icon && item.icon.url && (
                <div className={styles.iconWrapper}>
                  <PrismicNextImage
                    field={item.icon}
                    width={48}
                    height={48}
                    className={styles.icon}
                  />
                </div>
              )}
              {item.service_name && (
                <h3 className={styles.cardTitle}>{item.service_name}</h3>
              )}
              <div className={styles.cardBody}>
                <PrismicRichText field={item.description} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
