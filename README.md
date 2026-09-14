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

The development site opens at http://localhost:3000. Create and preview a production build with:

```sh
npm run build
npm run serve
```

## GitHub Pages

Push this project to a GitHub repository with a `main` branch. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**. The included workflow checks pull requests and deploys pushes to `main`.

The workflow derives the site URL and base path from `GITHUB_REPOSITORY`, including account sites named `<owner>.github.io`. For a custom domain, set repository Actions variables `SITE_URL` (for example `https://example.org`) and `BASE_URL` (`/`), and configure the domain in GitHub Pages.

This folder does not yet specify a GitHub repository or public domain; deployment requires that repository setup.

## Discussions

The original brief specifies “Google Discussions” without a service or group URL. The community page shows a launch-pending message until configured. Set `DISCUSSIONS_URL` to the HTTPS URL of the chosen discussion space (for example, a Google Group) as an environment variable locally or a repository Actions variable for deployment. Rebuild after changing it.

Before launching discussions, finalize moderation, reporting, and participation requirements and update `docs/community-principles.md` accordingly.

## Editing content

- `src/pages/index.js`: homepage and original SVG illustration.
- `src/pages/community.js`: participation and discussion link.
- `docs/`: purpose, starting priorities, and community principles.
- `src/css/custom.css`: responsive theme.
- `docusaurus.config.js`: navigation, metadata, and deployment configuration.

The starting content is draft editorial copy, not an adopted policy platform. No membership or personal data collection is enabled.

## Languages and appearance

English is served at `/` and French at `/fr/` (under the repository base path on GitHub Pages). Use the language menu to switch languages while keeping the equivalent page. `npm run build` builds both locales; `npm run serve` previews both. Development serves one locale at a time: `npm start` for English or `npm run start:fr` for French.

React page strings use Docusaurus `translate()` calls. French strings live in `i18n/fr/code.json`, navigation and footer labels in `i18n/fr/docusaurus-theme-classic/`, and translated documents in `i18n/fr/docusaurus-plugin-content-docs/current/`.

To add a language, add its locale and label to `i18n` in `docusaurus.config.js`, run `npm run write-translations -- --locale <locale>`, translate the generated JSON messages, and add translated Markdown documents under that locale’s docs directory. Keep document filenames unchanged so language switching preserves the page.

The light and dark themes automatically follow the operating system’s appearance preference, including changes while the site is open. Theme colors are defined in `src/css/custom.css`. The supplied `static/img/logo.svg` is used for the header and favicon; `logo.png` remains available as a raster version.
