# The Children's International
*Our lives. Our voices. Our world.*

The Github Pages site for Children's International Party. A political party that defends the rights of children everywhere.

## Stack

- Docusaurus
- Google Discussions

## Local development

Use Node.js 22 (see `.nvmrc`).

```sh
npm ci
npm start
```

The development site opens at http://localhost:3000/childrens/. Set `BASE_URL=/` to serve at the root during development. Create and preview a production build with:

```sh
npm run build
npm run serve
```

## GitHub Pages

Push this project to a GitHub repository with a `main` branch. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**. The included workflow checks pull requests and deploys pushes to `main`.

The workflow derives the site URL and base path from `GITHUB_REPOSITORY`, including account sites named `<owner>.github.io`. For a custom domain, set repository Actions variables `SITE_URL` (for example `https://example.org`) and `BASE_URL` (`/`), and configure the domain in GitHub Pages.

The default public URL is https://ctzurcanu.github.io/childrens/, matching this repository. Local production builds use the same URL so canonical URLs never accidentally point to localhost. Override `SITE_URL` and `BASE_URL` together for another deployment.

## Discussions

The original brief specifies “Google Discussions” without a service or group URL. The community page shows a launch-pending message until configured. Set `DISCUSSIONS_URL` to the HTTPS URL of the chosen discussion space (for example, a Google Group) as an environment variable locally or a repository Actions variable for deployment. Rebuild after changing it.

Before launching discussions, finalize and publish moderation, reporting, and participation requirements.

## Editing content

- `src/pages/index.js`: homepage and original SVG illustration.
- `src/pages/community.js`: participation and discussion link.
- `docs/`: ideas, rights, duties, ideals, institutions, and reference documents.
- `src/css/custom.css`: responsive theme.
- `docusaurus.config.js`: navigation, metadata, and deployment configuration.

The starting content is draft editorial copy, not an adopted policy platform. No membership or personal data collection is enabled.

## Languages and appearance

English is served at `/` and French at `/fr/` (under the repository base path on GitHub Pages). Use the language menu to switch languages while keeping the equivalent page. `npm run build` builds both locales; `npm run serve` previews both. Development serves one locale at a time: `npm start` for English or `npm run start:fr` for French.

React page strings use Docusaurus `translate()` calls. French strings live in `i18n/fr/code.json`, navigation and footer labels in `i18n/fr/docusaurus-theme-classic/`, and translated documents in `i18n/fr/docusaurus-plugin-content-docs/current/`.

To add a language, add its locale and label to `i18n` in `docusaurus.config.js`, run `npm run write-translations -- --locale <locale>`, translate the generated JSON messages, and add translated Markdown documents under that locale’s docs directory. Keep document filenames unchanged so language switching preserves the page.

The light and dark themes automatically follow the operating system’s appearance preference, including changes while the site is open. Theme colors are defined in `src/css/custom.css`. The supplied `static/img/logo.svg` is used for the header and favicon; `logo.png` remains available as a raster version.

## Search visibility

Production builds include page-specific titles and descriptions, canonical URLs, Open Graph and Twitter image metadata, homepage `WebSite` structured data, and Docusaurus article breadcrumbs. Navigation and the ideas overview link to the main content sections.

Run the build and validate the generated HTML before deployment:

```sh
npm run build
npm run check:seo
```

Use the same `SITE_URL` and `BASE_URL` environment values for both commands. CI runs both before publishing. The checks cover production canonical URLs, unique descriptions, image URLs, valid structured data, reciprocal language links, noindex pages, and sitemap coverage.

The SEO plugin generates `robots.txt` with links to the English and French sitemaps. On the default GitHub project deployment, the sitemap URLs are:

- https://ctzurcanu.github.io/childrens/sitemap.xml
- https://ctzurcanu.github.io/childrens/fr/sitemap.xml

Search engines read `robots.txt` at the **domain root**. GitHub project hosting serves this project's file at `/childrens/robots.txt`, so it cannot control the account's root robots file. Submit both sitemaps directly in Google Search Console after verifying ownership. With a custom domain and `BASE_URL=/`, the generated file is served at the domain root.

French home, community, and ideas overview pages are translated and indexable. Other French article URLs currently fall back to English. `plugins/seo/index.js` detects actual translated Markdown files; `src/theme/SiteMetadata/index.tsx` excludes fallback pages from indexing and language alternate links while keeping them accessible. Docusaurus also excludes these noindex pages from sitemaps. Add matching translated files under `i18n/fr/docusaurus-plugin-content-docs/current/` and rebuild to make them indexable automatically. Keep document IDs and slugs aligned across languages.

The SiteMetadata customization is based on Docusaurus 3.10.2; review it when upgrading Docusaurus. The plugin currently supports this site's unversioned docs and default locale URL layout.

Metadata describes the existing proposals without presenting them as current law or adopted policy. Search engines choose their own snippets and rankings. See [Google's developer SEO guidance](https://developers.google.com/search/docs/fundamentals/get-started-developers) and [Docusaurus SEO documentation](https://docusaurus.io/docs/seo).
