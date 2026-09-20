import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

export default function HomeStructuredData({description}) {
  const {siteConfig, i18n} = useDocusaurusContext();
  const {withBaseUrl} = useBaseUrlUtils();
  const url = withBaseUrl('/', {absolute: true});
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name: siteConfig.title,
    alternateName: i18n.currentLocale === 'fr'
      ? 'The Children’s International' : 'L’Internationale des enfants',
    description,
    inLanguage: i18n.currentLocale,
  };
  return <Head><script type="application/ld+json">{JSON.stringify(data).replace(/</g, '\\u003c')}</script></Head>;
}
