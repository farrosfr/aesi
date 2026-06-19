/**
 * Site configuration: branding, contact, social, navigation.
 */

export const site = {
  name: 'AESI',
  fullName: 'Asosiasi Energi Surya Indonesia',
  tagline: 'Bersama Memajukan Energi Surya di Indonesia',
  description:
    'Asosiasi Energi Surya Indonesia (AESI) - forum komunikasi dan kerjasama antar pemegang kepentingan untuk percepatan pemanfaatan energi surya di Indonesia.',
  founded: '15 Desember 2016',
  url: 'https://new.aesi.or.id',
  // Default social-share image. Per-page og:image comes from
  // each page's featured_image via the Base layout prop.
  ogImage: '/uploads/static/Logo-AESI-1-1.png',
} as const;

export const contact = {
  address:
    'Sekretariat AESI, Jatinegara Barat 4 No.6 RT6/RW3, Bali Mester, Kecamatan Jatinegara, Jakarta Timur 13310, Indonesia',
  email: 'membership@aesi.or.id',
  phone: '+62 8****8188',
  mapsUrl: 'https://maps.google.com/?q=Jatinegara+Barat+4+No.6+Jakarta+Timur',
  social: {
    instagram: 'https://instagram.com/aesi_id',
    linkedin: 'https://www.linkedin.com/company/aesi-indonesia/',
    twitter: 'https://x.com/aesi_id',
    facebook: 'https://facebook.com/aesi.id',
    youtube: 'https://youtube.com/@aesi_id',
  },
} as const;

export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

export const navigation: NavItem[] = [
  {
    label: 'Tentang Kami',
    href: '/tentang-kami/',
    children: [
      { label: 'Sejarah', href: '/sejarah/' },
      { label: 'Visi & Misi', href: '/visi-misi/' },
      { label: 'Struktur Organisasi', href: '/struktur-organisasi/' },
    ],
  },
  {
    label: 'Program',
    href: '/program/',
    children: [
      { label: 'WKU 1 - Kebijakan dan Regulasi', href: '/program/wku-1/' },
      { label: 'WKU 2 - Riset dan Teknologi', href: '/program/wku-2/' },
      { label: 'WKU 3 - Kerja Sama Antar Lembaga', href: '/program/wku-3/' },
    ],
  },
  { label: 'Anggota', href: '/anggota/' },
  {
    label: 'Knowledge Hub',
    href: '/artikel/',
    children: [
      { label: 'Artikel', href: '/artikel/' },
      { label: 'Newsletter', href: '/newsletter/' },
      { label: 'Regulasi', href: '/regulasi/' },
    ],
  },
  { label: 'Kontak Kami', href: '/kontak/' },
];
