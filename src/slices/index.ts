import dynamic from 'next/dynamic';

export const components = {
  hero: dynamic(() => import('./Hero')),
  features_bento: dynamic(() => import('./FeaturesBento')),
  service_entry: dynamic(() => import('./ServiceEntry')),
  about_hero: dynamic(() => import('./AboutHero')),
  story_section: dynamic(() => import('./StorySection')),
  gallery_grid: dynamic(() => import('./GalleryGrid')),
  contact_form: dynamic(() => import('./ContactForm')),
  call_to_action: dynamic(() => import('./CallToAction')),
  testimonials: dynamic(() => import('./Testimonials')),
  team: dynamic(() => import('./Team')),
  rich_text: dynamic(() => import('./RichText')),
  // Legacy — kept for backwards compatibility
  about: dynamic(() => import('./About')),
  services: dynamic(() => import('./Services')),
};
