/**
 * SEO Optimization Implementation for Lexova Platform
 * 
 * This file contains the implementation of SEO optimization techniques
 * for the Lexova platform based on best practices for legal websites.
 */

// Meta Tag Management for SEO
export const generateMetaTags = (page) => {
  const metaTags = {
    // Default meta tags for all pages
    default: {
      title: "Lexova | AI-Powered Legal Services Platform",
      description: "Connect with qualified lawyers matched to your specific legal needs through Lexova's AI-powered platform. Get personalized legal assistance today.",
      keywords: "legal services, lawyer matching, AI legal platform, find a lawyer, legal consultation",
      ogTitle: "Lexova | AI-Powered Legal Services Platform",
      ogDescription: "Connect with qualified lawyers matched to your specific legal needs through Lexova's AI-powered platform. Get personalized legal assistance today.",
      ogImage: "/images/lexova-social-share.jpg",
      twitterCard: "summary_large_image",
      twitterTitle: "Lexova | AI-Powered Legal Services Platform",
      twitterDescription: "Connect with qualified lawyers matched to your specific legal needs through Lexova's AI-powered platform. Get personalized legal assistance today.",
      twitterImage: "/images/lexova-social-share.jpg",
      canonicalUrl: "https://lexova.com"
    },
    
    // Page-specific meta tags
    home: {
      title: "Lexova | AI-Powered Legal Services Platform",
      description: "Find the perfect lawyer for your case with Lexova's AI matching technology. Connect with qualified legal professionals instantly.",
      keywords: "legal services, lawyer matching, AI legal platform, find a lawyer, legal consultation",
      canonicalUrl: "https://lexova.com"
    },
    about: {
      title: "About Lexova | Our Mission and Team",
      description: "Learn about Lexova's mission to make legal services accessible through AI technology and meet our team of legal and tech experts.",
      keywords: "about Lexova, legal tech company, AI lawyer matching, legal services platform",
      canonicalUrl: "https://lexova.com/about"
    },
    faq: {
      title: "Frequently Asked Questions | Lexova Legal Platform",
      description: "Find answers to common questions about Lexova's AI lawyer matching, case management, and legal services platform.",
      keywords: "legal services FAQ, lawyer matching questions, legal platform help",
      canonicalUrl: "https://lexova.com/faq"
    },
    contact: {
      title: "Contact Lexova | Get Support and Information",
      description: "Reach out to Lexova's support team for assistance with our AI-powered legal services platform. We're here to help.",
      keywords: "contact legal platform, Lexova support, legal services help",
      canonicalUrl: "https://lexova.com/contact"
    },
    privacy: {
      title: "Privacy Policy | Lexova Legal Platform",
      description: "Read Lexova's privacy policy to understand how we protect your data while providing AI-powered legal services.",
      keywords: "legal platform privacy, lawyer matching privacy, legal services data protection",
      canonicalUrl: "https://lexova.com/privacy-policy"
    },
    terms: {
      title: "Terms and Conditions | Lexova Legal Platform",
      description: "Review Lexova's terms and conditions for using our AI-powered legal services and lawyer matching platform.",
      keywords: "legal platform terms, lawyer matching conditions, legal services agreement",
      canonicalUrl: "https://lexova.com/terms-conditions"
    },
    clientDashboard: {
      title: "Client Dashboard | Lexova Legal Platform",
      description: "Access your personalized client dashboard to manage cases, connect with lawyers, and track legal proceedings.",
      keywords: "legal client dashboard, case management, lawyer communication",
      canonicalUrl: "https://lexova.com/client-dashboard"
    },
    lawyerDashboard: {
      title: "Lawyer Dashboard | Lexova Legal Platform",
      description: "Access your lawyer dashboard to manage cases, client communications, and your legal practice on Lexova.",
      keywords: "lawyer dashboard, legal case management, client communication",
      canonicalUrl: "https://lexova.com/lawyer-dashboard"
    }
  };

  return metaTags[page] || metaTags.default;
};

// Structured Data for Rich Snippets
export const generateStructuredData = (page, data = {}) => {
  const structuredData = {
    // Organization schema for all pages
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Lexova",
      "url": "https://lexova.com",
      "logo": "https://lexova.com/images/lexova-logo.png",
      "sameAs": [
        "https://www.facebook.com/lexovalegal",
        "https://twitter.com/lexovalegal",
        "https://www.linkedin.com/company/lexova-legal"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-LEXOVA",
        "contactType": "customer service",
        "availableLanguage": ["English"]
      }
    },
    
    // Legal service schema for home page
    legalService: {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Lexova Legal Platform",
      "description": "AI-powered legal services platform connecting clients with qualified lawyers",
      "url": "https://lexova.com",
      "logo": "https://lexova.com/images/lexova-logo.png",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "37.7749",
          "longitude": "-122.4194"
        },
        "geoRadius": "2000"
      },
      "areaServed": "United States",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Legal Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Lawyer Matching"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Case Management"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Legal Consultation"
            }
          }
        ]
      }
    },
    
    // FAQ schema for FAQ page
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Lexova match me with a lawyer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lexova uses advanced AI technology to analyze your case details and match you with lawyers who have the right expertise, experience, and track record for your specific legal needs."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to use Lexova?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Creating an account and getting matched with lawyers is free. You only pay when you hire a lawyer for your case, and all fees are transparent and agreed upon before any work begins."
          }
        },
        {
          "@type": "Question",
          "name": "Are the lawyers on Lexova verified?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all lawyers on the Lexova platform undergo a thorough verification process including license verification, background checks, and review of professional credentials."
          }
        }
      ]
    },
    
    // Breadcrumb schema for navigation
    breadcrumb: (items) => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `https://lexova.com${item.path}`
      }))
    }),
    
    // Review schema for lawyer profiles
    review: (reviewData) => ({
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "LegalService",
        "name": reviewData.lawyerName,
        "image": reviewData.lawyerImage
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": reviewData.rating,
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": reviewData.clientName
      },
      "reviewBody": reviewData.reviewText
    })
  };

  // Return appropriate structured data based on page
  switch (page) {
    case 'home':
      return [structuredData.organization, structuredData.legalService];
    case 'faq':
      return [structuredData.organization, structuredData.faq];
    case 'lawyer':
      if (data.reviews && data.reviews.length > 0) {
        return [
          structuredData.organization,
          ...data.reviews.map(review => structuredData.review(review))
        ];
      }
      return [structuredData.organization];
    default:
      return [structuredData.organization];
  }
};

// SEO-friendly URL generator
export const generateSeoUrl = (text) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

// Sitemap generator
export const generateSitemap = () => {
  const baseUrl = 'https://lexova.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const routes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/faq', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms-conditions', priority: '0.5', changefreq: 'yearly' },
    { url: '/sign-up', priority: '0.9', changefreq: 'monthly' },
    { url: '/sign-in', priority: '0.9', changefreq: 'monthly' },
    // Dynamic routes would be added programmatically
  ];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${route.url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${route.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  return sitemap;
};

// Robots.txt generator
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /client-dashboard/
Disallow: /lawyer-dashboard/
Disallow: /api/

Sitemap: https://lexova.com/sitemap.xml`;
};

// SEO performance monitoring
export const trackSeoPerformance = (page, metrics) => {
  // This would connect to an analytics service in production
  console.log(`SEO Performance for ${page}:`, metrics);
  
  // Example metrics to track
  const seoMetrics = {
    pageLoadTime: metrics.loadTime || 0,
    firstContentfulPaint: metrics.fcp || 0,
    largestContentfulPaint: metrics.lcp || 0,
    timeToInteractive: metrics.tti || 0,
    bounceRate: metrics.bounceRate || 0,
    organicTraffic: metrics.organicTraffic || 0,
    keywordRankings: metrics.keywordRankings || {}
  };
  
  return seoMetrics;
};

// Local SEO optimization
export const optimizeLocalSeo = (locationData) => {
  return {
    name: "Lexova Legal Platform",
    address: {
      streetAddress: locationData.street,
      addressLocality: locationData.city,
      addressRegion: locationData.state,
      postalCode: locationData.zip,
      addressCountry: "US"
    },
    geo: {
      latitude: locationData.latitude,
      longitude: locationData.longitude
    },
    telephone: locationData.phone,
    openingHours: locationData.hours
  };
};

// Mobile optimization checker
export const checkMobileOptimization = () => {
  const isMobile = window.innerWidth <= 768;
  
  return {
    isMobile,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    recommendations: [
      "Ensure all buttons are at least 44px × 44px for touch targets",
      "Use responsive images to reduce load time on mobile",
      "Implement lazy loading for images below the fold",
      "Ensure font size is at least 16px for readability",
      "Test navigation menu on small screens"
    ]
  };
};

// Page speed optimization
export const optimizePageSpeed = () => {
  return {
    imageOptimization: "Compress and properly size all images",
    codeMinification: "Minify CSS, JavaScript, and HTML",
    resourceCaching: "Implement browser caching for static resources",
    lazyLoading: "Implement lazy loading for below-fold content",
    serverResponse: "Optimize server response time",
    criticalCss: "Inline critical CSS and defer non-critical CSS",
    thirdPartyScripts: "Defer loading of non-essential third-party scripts"
  };
};

// Keyword optimization helper
export const optimizeForKeywords = (content, keywords) => {
  // This is a simplified example - in production, this would be more sophisticated
  let optimizedContent = content;
  
  // Ensure keywords appear in important places
  keywords.forEach(keyword => {
    // Check if keyword is already in the content
    if (!content.toLowerCase().includes(keyword.toLowerCase())) {
      // If not, suggest adding it naturally
      console.log(`Consider adding the keyword "${keyword}" naturally to your content`);
    }
  });
  
  return optimizedContent;
};

// Export all SEO functions
export default {
  generateMetaTags,
  generateStructuredData,
  generateSeoUrl,
  generateSitemap,
  generateRobotsTxt,
  trackSeoPerformance,
  optimizeLocalSeo,
  checkMobileOptimization,
  optimizePageSpeed,
  optimizeForKeywords
};

