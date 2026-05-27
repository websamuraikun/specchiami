'use client';

import { useState } from 'react';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';

type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

export default function ContactForm({ slice }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const email = slice.primary.contact_email ?? 'hello@specchiami.it';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    // Build mailto fallback — no backend required
    const subject = encodeURIComponent(`Enquiry from ${data.get('name') ?? 'Website'}`);
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nDate: ${data.get('date')}\nType: ${data.get('type')}\n\n${data.get('message')}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setStatus('sent');
  }

  return (
    <section
      className="flex-grow pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col md:flex-row gap-16 md:gap-24 relative z-10"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Form */}
      <div className="w-full md:w-3/5 lg:w-2/3 space-y-12">
        <div className="space-y-4">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface">
            {slice.primary.heading ?? 'Get in Touch'}
          </h1>
          {slice.primary.intro && (
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              {slice.primary.intro}
            </p>
          )}
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col relative">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="input-line font-body-lg text-body-lg text-on-surface placeholder:text-outline-variant"
                id="name"
                name="name"
                placeholder="Jane Doe"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col relative">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="input-line font-body-lg text-body-lg text-on-surface placeholder:text-outline-variant"
                id="email"
                name="email"
                placeholder="jane@example.com"
                type="email"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col relative">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="date">
                Event Date
              </label>
              <input
                className="input-line font-body-lg text-body-lg text-on-surface"
                id="date"
                name="date"
                type="date"
              />
            </div>
            <div className="flex flex-col relative">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="type">
                Event Type
              </label>
              <div className="relative">
                <select
                  className="select-line w-full font-body-lg text-body-lg text-on-surface pr-8"
                  id="type"
                  name="type"
                >
                  <option value="" disabled>Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="party">Private Party</option>
                  <option value="other">Other</option>
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-outline-variant text-sm">▾</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col relative">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="input-line font-body-lg text-body-lg text-on-surface placeholder:text-outline-variant resize-none"
              id="message"
              name="message"
              placeholder="Tell us more about your vision..."
              rows={4}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-widest px-10 py-4 hover:bg-primary hover:text-on-primary transition-colors duration-300 disabled:opacity-60"
            >
              {status === 'sending' ? 'Opening Mail…' : status === 'sent' ? 'Done!' : 'Send Enquiry'}
            </button>
          </div>
        </form>
      </div>

      {/* Contact details */}
      <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col gap-12 md:text-right mt-16 md:mt-0 items-start md:items-end">
        <div className="space-y-8">
          {slice.primary.contact_email && (
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Email</h3>
              <a
                className="font-body-lg text-body-lg text-on-surface-variant hover:text-primary transition-colors"
                href={`mailto:${slice.primary.contact_email}`}
              >
                {slice.primary.contact_email}
              </a>
            </div>
          )}
          {slice.primary.contact_phone && (
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Phone</h3>
              <a
                className="font-body-lg text-body-lg text-on-surface-variant hover:text-primary transition-colors"
                href={`tel:${slice.primary.contact_phone}`}
              >
                {slice.primary.contact_phone}
              </a>
            </div>
          )}
        </div>

        {slice.primary.footer_note && (
          <div className="mt-auto pt-12 border-t border-outline-variant w-full md:w-2/3 hidden md:block">
            <p className="font-body-md text-body-md text-outline italic">
              {slice.primary.footer_note}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
