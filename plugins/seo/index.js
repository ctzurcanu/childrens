const fs = require('node:fs/promises');
const path = require('node:path');

module.exports = function seoPlugin(context) {
  return {
    name: 'childrens-seo',
    async allContentLoaded({allContent, actions}) {
      // Only advertise translations that exist; Docusaurus otherwise serves
      // English Markdown at French URLs with French language metadata.
      const docLocales = {};
      const docs = allContent['docusaurus-plugin-content-docs']?.default;
      for (const version of docs?.loadedVersions ?? []) {
        for (const doc of version.docs) {
          const locales = [context.i18n.defaultLocale];
          const relativeSource = doc.source.includes('/current/')
            ? doc.source.split('/current/')[1]
            : doc.source.replace('@site/docs/', '');
          for (const locale of context.i18n.locales) {
            if (locale === context.i18n.defaultLocale) continue;
            const translated = path.join(context.siteDir, 'i18n', locale,
              'docusaurus-plugin-content-docs', 'current', relativeSource);
            if (await fs.access(translated).then(() => true, () => false)) locales.push(locale);
          }
          docLocales[doc.permalink.replace(/\/$/, '')] = locales;
        }
      }
      actions.setGlobalData({docLocales});
    },
    async postBuild({outDir, siteConfig}) {
      // The default locale owns the root robots.txt and lists every locale sitemap.
      if (context.i18n.currentLocale !== context.i18n.defaultLocale) return;
      const root = new URL(siteConfig.baseUrl, siteConfig.url);
      const sitemaps = context.i18n.locales.map(locale => {
        const prefix = locale === context.i18n.defaultLocale ? '' : `${locale}/`;
        return `Sitemap: ${new URL(`${prefix}sitemap.xml`, root).href}`;
      });
      await fs.writeFile(path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\n${sitemaps.join('\n')}\n`);
    },
  };
};
