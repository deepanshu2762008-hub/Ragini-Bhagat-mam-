import {
  contactInformation,
  designation,
  intro,
  seoMeta,
  socialLinks,
  teacherName,
  tagline,
} from '../data/portfolio';

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function absolute(url: string): string {
  try {
    return new URL(url, window.location.origin).href;
  } catch {
    return url;
  }
}

/**
 * Drives the document head from the data file: title, description,
 * Open Graph / Twitter tags and Person structured data.
 */
export function applySeo(): void {
  document.title = seoMeta.title;

  const image = absolute(seoMeta.ogImage);
  const url = window.location.origin + (import.meta.env.BASE_URL || '/');

  upsertMeta('name', 'description', seoMeta.description);
  upsertMeta('name', 'author', teacherName);

  upsertMeta('property', 'og:type', 'profile');
  upsertMeta('property', 'og:title', seoMeta.title);
  upsertMeta('property', 'og:description', seoMeta.description);
  upsertMeta('property', 'og:image', image);
  upsertMeta('property', 'og:url', url);

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', seoMeta.title);
  upsertMeta('name', 'twitter:description', seoMeta.description);
  upsertMeta('name', 'twitter:image', image);

  // Person structured data
  const existing = document.getElementById('person-schema');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'person-schema';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: teacherName,
    jobTitle: designation,
    description: `${intro} ${tagline}`,
    email: `mailto:${contactInformation.email}`,
    worksFor: {
      '@type': 'Organization',
      name: contactInformation.institution,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: contactInformation.location,
    },
    sameAs: socialLinks.map((link) => link.url),
  });
  document.head.appendChild(script);
}
