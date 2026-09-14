const [owner, repository] = (process.env.GITHUB_REPOSITORY || 'local/childrens').split('/');
const isPages = Boolean(process.env.GITHUB_ACTIONS);
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
  url: process.env.SITE_URL || (isPages ? `https://${owner}.github.io` : 'http://localhost:3000'),
  baseUrl: process.env.BASE_URL || (isPages && repository !== `${owner}.github.io` ? `/${repository}/` : '/'),
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
  presets: [['classic', {
    docs: { routeBasePath: 'about', sidebarPath: './sidebars.js' },
    blog: false,
    theme: { customCss: './src/css/custom.css' },
  }]],
  themeConfig: {
    colorMode: { defaultMode: 'light', disableSwitch: true, respectPrefersColorScheme: true },
    navbar: {
      title: 'THE CHILDREN’S INTERNATIONAL',
      logo: { alt: '', src: 'img/logo.svg' },
      items: [
        { type: 'localeDropdown', position: 'right' },
        { to: '/about/our-purpose', label: 'Our purpose', position: 'right' },
        { to: '/about/our-priorities', label: 'Our priorities', position: 'right' },
        { to: '/community', label: 'Get involved ↗', position: 'right', className: 'nav-join' },
      ],
    },
    footer: {
      style: 'light',
      links: [
        { title: 'Explore', items: [{ label: 'Our purpose', to: '/about/our-purpose' }, { label: 'Our priorities', to: '/about/our-priorities' }] },
        { title: 'Take part', items: [{ label: 'Community', to: '/community' }, { label: 'Community principles', to: '/about/community-principles' }] },
      ],
      copyright: 'The Children’s International · Our lives. Our voices. Our world.',
    },
  },
};
return config;
};
