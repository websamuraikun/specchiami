import { type FC } from 'react';
import { type Content } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, type SliceComponentProps, type JSXMapSerializer } from '@prismicio/react';

const richTextComponents: JSXMapSerializer = {
  hyperlink: ({ node, children }) => (
    <PrismicNextLink field={node.data} className="text-primary border-b border-primary pb-0.5 hover:text-primary-container transition-colors">
      {children}
    </PrismicNextLink>
  ),
  heading1: ({ children }) => <h1 className="font-headline-lg text-headline-md text-primary mb-6">{children}</h1>,
  heading2: ({ children }) => <h2 className="font-headline-md text-headline-sm text-primary mb-4">{children}</h2>,
  heading3: ({ children }) => <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">{children}</h3>,
  paragraph: ({ children }) => <p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">{children}</p>,
  label: ({ node, children }) => {
    if (node.data.label === 'codespan') return <code className="bg-surface-container px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
  },
};

type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

const RichText: FC<RichTextProps> = ({ slice }) => {
  return (
    <section
      className="py-section-gap px-margin-mobile md:px-margin-desktop"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-2xl mx-auto">
        <PrismicRichText field={slice.primary.content} components={richTextComponents} />
      </div>
    </section>
  );
};

export default RichText;
