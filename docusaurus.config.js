const [owner, repository] = (process.env.GITHUB_REPOSITORY || 'ctzurcanu/childrens').split('/');
const discussionUrl = process.env.DISCUSSIONS_URL || '';
if (discussionUrl && !/^https:\/\//.test(discussionUrl)) {
  throw new Error('DISCUSSIONS_URL must be an HTTPS URL.');
}

/** @type {import('@docusaurus/types').Config} */
module.exports = function createConfig() {
const config = {
  title: process.env.DOCUSAURUS_CURRENT_LOCALE === 'fr' ? "L’Internationale des enfants" : "The Children’s International",
  tagline: process.env.DOCUSAURUS_CURRENT_LOCALE === 'fr' ? 'Nos vies. Nos voix. Notre monde.' : 'Our lives. Our voices. Our world.',
  favicon: 'img/logo.svg',
  url: process.env.SITE_URL || `https://${owner}.github.io`,
  baseUrl: process.env.BASE_URL || (repository !== `${owner}.github.io` ? `/${repository}/` : '/'),
  trailingSlash: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    localeConfigs: { en: { label: 'English', htmlLang: 'en' }, fr: { label: 'Français', htmlLang: 'fr' } },
  },
  organizationName: owner,
  projectName: repository,
  onBrokenLinks: 'throw',
  customFields: { discussionUrl },
  plugins: ['./plugins/seo'],
  presets: [['classic', {
    docs: { routeBasePath: 'about', sidebarPath: './sidebars.js' },
    blog: false,
    sitemap: { changefreq: null, priority: null },
    theme: { customCss: './src/css/custom.css' },
  }]],
  themeConfig: {
    image: 'img/logo.png',
    metadata: [{ name: 'robots', content: 'index, follow, max-image-preview:large' }],
    colorMode: { defaultMode: 'light', disableSwitch: true, respectPrefersColorScheme: true },
    navbar: {
      title: 'THE CHILDREN’S INTERNATIONAL',
      logo: { alt: '', src: 'img/logo.svg' },
      items: [
        { type: 'localeDropdown', position: 'right' },
        { to: '/about/', label: 'Our ideas', position: 'right' },
        { to: '/about/rights/', label: 'Children’s rights', position: 'right' },
        { to: '/community', label: 'Get involved ↗', position: 'right', className: 'nav-join' },
      ],
    },
    footer: {
      style: 'light',
      links: [
        { title: 'Explore', items: [{ label: 'Our ideas', to: '/about/' }, { label: 'Children’s rights', to: '/about/rights/' }, { label: 'Duties', to: '/about/duties/' }] },
        { title: 'Take part', items: [{ label: 'Community', to: '/community/' }, { label: 'Our institution', to: '/about/institution/about/' }] },
      ],
      copyright: 'The Children’s International · Our lives. Our voices. Our world.',
    },
  },
};
return config;
};
