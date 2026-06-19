/**
 * Search index: built at build time from site data, wp-content, members.
 * Served as static JSON at /search-index.json.
 */
import { navigation } from '../data/site';
import wpData from './wp-content.json';

interface IndexItem {
  title: string;
  url: string;
  type: 'halaman' | 'artikel' | 'regulasi' | 'program';
  excerpt?: string;
}

function flattenNav(items: typeof navigation, out: IndexItem[]) {
  for (const item of items) {
    if (item.href) {
      out.push({ title: item.label, url: item.href, type: 'halaman' });
    }
    if (item.children) flattenNav(item.children, out);
  }
}

const index: IndexItem[] = [];
flattenNav(navigation, index);
for (const a of wpData.artikel) {
  index.push({
    title: a.title,
    url: `/artikel/${a.slug}/`,
    type: 'artikel',
    excerpt: a.excerpt,
  });
}
for (const r of wpData.regulasi) {
  index.push({
    title: r.title,
    url: `/regulasi/${r.slug}/`,
    type: 'regulasi',
    excerpt: r.excerpt,
  });
}

export const searchIndex = index;
export type { IndexItem };
