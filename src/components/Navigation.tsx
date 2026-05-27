import { createClient } from '@/prismicio';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { NavigationClient } from './NavigationClient';

type NavItem = {
  label: string | null;
  link: Parameters<typeof PrismicNextLink>[0]['field'];
};

export default async function Navigation() {
  const client = createClient();
  let siteName = 'Specchiami';
  let navItems: NavItem[] = [];
  let logo: Parameters<typeof PrismicNextImage>[0]['field'] | null = null;

  try {
    const settings = await client.getSingle('settings');
    siteName = settings.data.site_name ?? siteName;
    logo = settings.data.logo ?? null;
    navItems = (settings.data.nav_item ?? []).map((item: NavItem) => ({
      label: item.label,
      link: item.link,
    }));
  } catch {
    // Settings not configured in Prismic yet
  }

  return <NavigationClient siteName={siteName} logo={logo} navItems={navItems} />;
}
