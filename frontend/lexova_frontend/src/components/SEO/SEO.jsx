import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component for Lexova Platform
 * 
 * This component handles all SEO-related elements including:
 * - Meta tags
 * - Title
 * - Canonical URLs
 * - Open Graph tags
 * - Twitter Card tags
 * - Structured data (JSON-LD)
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords (comma separated)
 * @param {string} props.canonicalUrl - Canonical URL (optional)
 * @param {string} props.ogImage - Open Graph image URL (optional)
 * @param {Array} props.structuredData - Structured data objects (optional)
 */
const SEO = ({
  title = 'Lexova | AI-Powered Legal Services Platform',
  description = 'Connect with qualified lawyers matched to your specific legal needs through Lexova\'s AI-powered platform. Get personalized legal assistance today.',
  keywords = 'legal services, lawyer matching, AI legal platform, find a lawyer, legal consultation',
  canonicalUrl,
  ogImage = '/images/lexova-social-share.jpg',
  structuredData = []
}) => {
  const location = useLocation();
  const currentUrl = canonicalUrl || `https://lexova.com${location.pathname}`;
  
  // Track page view for analytics
  useEffect(() => {
    // This would connect to analytics service in production
    console.log('Page view:', {
      path: location.pathname,
      title,
      url: currentUrl
    });
  }, [location.pathname, title, currentUrl]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `https://lexova.com${ogImage}`} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `https://lexova.com${ogImage}`} />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Structured Data (JSON-LD) */}
      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

