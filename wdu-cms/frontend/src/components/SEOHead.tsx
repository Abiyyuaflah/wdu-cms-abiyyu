import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { usePages } from '../context/PageContext';
import { useState, useEffect } from 'react';

interface SEOSettings {
  siteUrl: string;
  defaultTitle: string;
  defaultDesc: string;
  defaultKeywords: string;
  ogImageUrl: string;
  fbAppId: string;
  twitterSite: string;
  twitterCreator: string;
  orgName: string;
  orgLogoUrl: string;
  socialYoutube: string;
  socialInstagram: string;
  faviconUrl: string;
  appleTouchIcon: string;
}

const defaultSettings: SEOSettings = {
  siteUrl: 'https://wahanadatautama.com',
  defaultTitle: 'WDU - Wahana Data Utama',
  defaultDesc: 'Wahana Data Utama - Solusi Riset Pasar dan Transformasi Digital Terpercaya untuk Bisnis Anda. Riset pasar, analisis data, konsultasi IT, event organizer.',
  defaultKeywords: 'riset pasar, transformasi digital, konsultasi IT, survei, analisis data, event organizer, wahana data utama',
  ogImageUrl: '/og-image.jpg',
  fbAppId: '',
  twitterSite: '@wahanadatautama',
  twitterCreator: '@wahanadatautama',
  orgName: 'Wahana Data Utama',
  orgLogoUrl: '/apple-touch-icon.png',
  socialYoutube: 'https://www.youtube.com/@wahanadatautama9110',
  socialInstagram: 'https://www.instagram.com/wahanadatautama',
  faviconUrl: '/favicon-96x96.png',
  appleTouchIcon: '/apple-touch-icon.png',
};

function getSEOSettings(): SEOSettings {
  try {
    const stored = localStorage.getItem('wdu_seo_settings');
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch {
    // ignore
  }
  return defaultSettings;
}

const routeToSlug: Record<string, string> = {
  '/': 'home',
  '/tentang-kami': 'tentang-kami',
  '/layanan': 'layanan',
  '/portfolio': 'portfolio',
  '/kontak': 'kontak',
  '/riset-pasar': 'riset-pasar',
  '/analisis-data': 'analisis-data',
  '/konsultasi-it': 'konsultasi-it',
  '/riset-data': 'riset-data',
  '/event-organizer': 'event-organizer',
  '/survei': 'survei',
  '/sis-wdu': 'sis-wdu',
  '/privacy-policy': 'privacy-policy',
  '/terms-of-service': 'terms-of-service',
};

export default function SEOHead() {
  const { pathname } = useLocation();
  const { pages } = usePages();
  const [seo, setSeo] = useState<SEOSettings>(getSEOSettings);

  useEffect(() => {
    setSeo(getSEOSettings());

    const handleStorage = () => setSeo(getSEOSettings());
    const handleCustom = () => setSeo(getSEOSettings());

    window.addEventListener('storage', handleStorage);
    window.addEventListener('wdu_seo_settings_update', handleCustom);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('wdu_seo_settings_update', handleCustom);
    };
  }, [pathname]);

  const slug = routeToSlug[pathname];
  const page = pages.find((p) => p.slug === slug);

  const title = page?.metaTitle || seo.defaultTitle;
  const description = page?.metaDesc || seo.defaultDesc;
  const canonical = `${seo.siteUrl.replace(/\/$/, '')}${pathname}`;
  const ogImageUrl = seo.ogImageUrl.startsWith('http') ? seo.ogImageUrl : `${seo.siteUrl.replace(/\/$/, '')}${seo.ogImageUrl}`;
  const orgLogoUrl = seo.orgLogoUrl.startsWith('http') ? seo.orgLogoUrl : `${seo.siteUrl.replace(/\/$/, '')}${seo.orgLogoUrl}`;

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seo.orgName,
    url: seo.siteUrl,
    logo: orgLogoUrl,
    sameAs: [
      seo.socialYoutube,
      seo.socialInstagram,
    ].filter(Boolean),
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonical,
    publisher: { '@type': 'Organization', name: seo.orgName },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {seo.defaultKeywords && <meta name="keywords" content={seo.defaultKeywords} />}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#6ab149" />
      <meta name="msapplication-TileColor" content="#6ab149" />

      <link rel="icon" type="image/png" sizes="16x16" href={`${seo.siteUrl.replace(/\/$/, '')}/favicon-16x16.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${seo.siteUrl.replace(/\/$/, '')}/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="96x96" href={seo.faviconUrl.startsWith('http') ? seo.faviconUrl : `${seo.siteUrl.replace(/\/$/, '')}${seo.faviconUrl}`} />
      <link rel="apple-touch-icon" href={seo.appleTouchIcon.startsWith('http') ? seo.appleTouchIcon : `${seo.siteUrl.replace(/\/$/, '')}${seo.appleTouchIcon}`} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
      {seo.fbAppId && <meta property="fb:app_id" content={seo.fbAppId} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      {seo.twitterSite && <meta name="twitter:site" content={seo.twitterSite} />}
      {seo.twitterCreator && <meta name="twitter:creator" content={seo.twitterCreator} />}

      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
    </Helmet>
  );
}
