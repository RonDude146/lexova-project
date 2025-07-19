"""
SEO Optimization Implementation for Lexova Platform - Backend Components

This module provides backend support for SEO optimization including:
- Sitemap generation
- Robots.txt generation
- SEO metadata API endpoints
- Structured data generation
- Canonical URL management
"""

import os
import json
from datetime import datetime
from flask import Blueprint, jsonify, request, Response, current_app
from bson import ObjectId

# Create blueprint for SEO routes
seo_blueprint = Blueprint('seo', __name__)

# Helper function to convert ObjectId to string for JSON serialization
def json_serialize_helper(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

# Generate sitemap.xml
@seo_blueprint.route('/sitemap.xml')
def sitemap():
    """Generate a dynamic sitemap based on current content in the database"""
    try:
        # Get database connection from app context
        db = current_app.mongo_client.lexova
        
        # Base URL for the site
        base_url = "https://lexova.com"
        
        # Current date for lastmod
        today = datetime.now().strftime('%Y-%m-%d')
        
        # Start XML content
        xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
        xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        
        # Add static pages
        static_pages = [
            {"url": "/", "priority": "1.0", "changefreq": "daily"},
            {"url": "/about", "priority": "0.8", "changefreq": "monthly"},
            {"url": "/faq", "priority": "0.8", "changefreq": "weekly"},
            {"url": "/contact", "priority": "0.8", "changefreq": "monthly"},
            {"url": "/privacy-policy", "priority": "0.5", "changefreq": "yearly"},
            {"url": "/terms-conditions", "priority": "0.5", "changefreq": "yearly"},
            {"url": "/sign-up", "priority": "0.9", "changefreq": "monthly"},
            {"url": "/sign-in", "priority": "0.9", "changefreq": "monthly"},
        ]
        
        for page in static_pages:
            xml_content += '  <url>\n'
            xml_content += f'    <loc>{base_url}{page["url"]}</loc>\n'
            xml_content += f'    <lastmod>{today}</lastmod>\n'
            xml_content += f'    <changefreq>{page["changefreq"]}</changefreq>\n'
            xml_content += f'    <priority>{page["priority"]}</priority>\n'
            xml_content += '  </url>\n'
        
        # Add lawyer profiles
        lawyers = db.lawyers.find({"is_verified": True, "is_active": True})
        for lawyer in lawyers:
            lawyer_url = f"/lawyers/{lawyer['_id']}/{generate_seo_url(lawyer['name'])}"
            xml_content += '  <url>\n'
            xml_content += f'    <loc>{base_url}{lawyer_url}</loc>\n'
            xml_content += f'    <lastmod>{today}</lastmod>\n'
            xml_content += f'    <changefreq>weekly</changefreq>\n'
            xml_content += f'    <priority>0.7</priority>\n'
            xml_content += '  </url>\n'
        
        # Add practice areas
        practice_areas = db.practice_areas.find()
        for area in practice_areas:
            area_url = f"/practice-areas/{area['_id']}/{generate_seo_url(area['name'])}"
            xml_content += '  <url>\n'
            xml_content += f'    <loc>{base_url}{area_url}</loc>\n'
            xml_content += f'    <lastmod>{today}</lastmod>\n'
            xml_content += f'    <changefreq>weekly</changefreq>\n'
            xml_content += f'    <priority>0.7</priority>\n'
            xml_content += '  </url>\n'
        
        # Add blog posts if they exist
        if db.blog_posts.count_documents({}) > 0:
            blog_posts = db.blog_posts.find({"status": "published"})
            for post in blog_posts:
                post_url = f"/blog/{post['_id']}/{generate_seo_url(post['title'])}"
                post_date = post.get('updated_at', post.get('created_at', today))
                if isinstance(post_date, datetime):
                    post_date = post_date.strftime('%Y-%m-%d')
                
                xml_content += '  <url>\n'
                xml_content += f'    <loc>{base_url}{post_url}</loc>\n'
                xml_content += f'    <lastmod>{post_date}</lastmod>\n'
                xml_content += f'    <changefreq>monthly</changefreq>\n'
                xml_content += f'    <priority>0.6</priority>\n'
                xml_content += '  </url>\n'
        
        # Close XML
        xml_content += '</urlset>'
        
        return Response(xml_content, mimetype='application/xml')
    
    except Exception as e:
        current_app.logger.error(f"Error generating sitemap: {str(e)}")
        return Response('Error generating sitemap', status=500)

# Generate robots.txt
@seo_blueprint.route('/robots.txt')
def robots_txt():
    """Generate robots.txt file"""
    robots_content = """User-agent: *
Allow: /
Disallow: /admin/
Disallow: /client-dashboard/
Disallow: /lawyer-dashboard/
Disallow: /api/

Sitemap: https://lexova.com/sitemap.xml
"""
    return Response(robots_content, mimetype='text/plain')

# Generate SEO-friendly URL
def generate_seo_url(text):
    """Convert text to SEO-friendly URL slug"""
    import re
    import unicodedata
    
    # Normalize unicode characters
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')
    # Convert to lowercase
    text = text.lower()
    # Replace spaces with hyphens
    text = re.sub(r'\s+', '-', text)
    # Remove non-word characters (except hyphens)
    text = re.sub(r'[^\w\-]', '', text)
    # Replace multiple hyphens with single hyphen
    text = re.sub(r'-+', '-', text)
    # Remove leading/trailing hyphens
    text = text.strip('-')
    
    return text

# API endpoint to get SEO metadata for a specific page
@seo_blueprint.route('/api/seo/metadata/<page_type>/<page_id>')
def get_seo_metadata(page_type, page_id=None):
    """Get SEO metadata for a specific page"""
    try:
        db = current_app.mongo_client.lexova
        
        # Default metadata
        metadata = {
            "title": "Lexova | AI-Powered Legal Services Platform",
            "description": "Connect with qualified lawyers matched to your specific legal needs through Lexova's AI-powered platform. Get personalized legal assistance today.",
            "keywords": "legal services, lawyer matching, AI legal platform, find a lawyer, legal consultation",
            "canonical": f"https://lexova.com/{page_type}" + (f"/{page_id}" if page_id else ""),
            "og_title": "Lexova | AI-Powered Legal Services Platform",
            "og_description": "Connect with qualified lawyers matched to your specific legal needs through Lexova's AI-powered platform. Get personalized legal assistance today.",
            "og_image": "https://lexova.com/images/lexova-social-share.jpg",
            "twitter_card": "summary_large_image",
            "twitter_title": "Lexova | AI-Powered Legal Services Platform",
            "twitter_description": "Connect with qualified lawyers matched to your specific legal needs through Lexova's AI-powered platform. Get personalized legal assistance today.",
            "twitter_image": "https://lexova.com/images/lexova-social-share.jpg"
        }
        
        # Page-specific metadata
        if page_type == "home":
            metadata["title"] = "Lexova | AI-Powered Legal Services Platform"
            metadata["description"] = "Find the perfect lawyer for your case with Lexova's AI matching technology. Connect with qualified legal professionals instantly."
            metadata["canonical"] = "https://lexova.com"
            
        elif page_type == "about":
            metadata["title"] = "About Lexova | Our Mission and Team"
            metadata["description"] = "Learn about Lexova's mission to make legal services accessible through AI technology and meet our team of legal and tech experts."
            metadata["keywords"] = "about Lexova, legal tech company, AI lawyer matching, legal services platform"
            metadata["canonical"] = "https://lexova.com/about"
            
        elif page_type == "faq":
            metadata["title"] = "Frequently Asked Questions | Lexova Legal Platform"
            metadata["description"] = "Find answers to common questions about Lexova's AI lawyer matching, case management, and legal services platform."
            metadata["keywords"] = "legal services FAQ, lawyer matching questions, legal platform help"
            metadata["canonical"] = "https://lexova.com/faq"
            
        elif page_type == "lawyer" and page_id:
            # Get lawyer data
            lawyer = db.lawyers.find_one({"_id": ObjectId(page_id)})
            if lawyer:
                name = lawyer.get("name", "")
                specializations = ", ".join(lawyer.get("specializations", []))
                location = f"{lawyer.get('city', '')}, {lawyer.get('state', '')}"
                
                metadata["title"] = f"{name} | {specializations} Lawyer in {location} | Lexova"
                metadata["description"] = f"Connect with {name}, a {specializations} lawyer in {location}. View profile, experience, and book a consultation through Lexova's AI-powered platform."
                metadata["keywords"] = f"{specializations.lower()}, lawyer, attorney, {location.lower()}, legal services, {name.lower()}"
                metadata["canonical"] = f"https://lexova.com/lawyers/{page_id}/{generate_seo_url(name)}"
                metadata["og_title"] = f"{name} | {specializations} Lawyer"
                metadata["og_description"] = f"Connect with {name}, a {specializations} lawyer in {location}. View profile, experience, and book a consultation through Lexova."
                if lawyer.get("profile_image"):
                    metadata["og_image"] = lawyer["profile_image"]
                    metadata["twitter_image"] = lawyer["profile_image"]
        
        elif page_type == "practice-area" and page_id:
            # Get practice area data
            area = db.practice_areas.find_one({"_id": ObjectId(page_id)})
            if area:
                name = area.get("name", "")
                description = area.get("short_description", "")
                
                metadata["title"] = f"{name} Legal Services | Find {name} Lawyers | Lexova"
                metadata["description"] = f"{description[:150]}... Find qualified {name.lower()} lawyers through Lexova's AI-powered matching platform."
                metadata["keywords"] = f"{name.lower()}, legal services, lawyer, attorney, legal consultation, {name.lower()} attorney"
                metadata["canonical"] = f"https://lexova.com/practice-areas/{page_id}/{generate_seo_url(name)}"
                metadata["og_title"] = f"{name} Legal Services | Lexova"
                metadata["og_description"] = f"{description[:150]}... Find qualified {name.lower()} lawyers through Lexova."
        
        # Update OG and Twitter metadata to match main metadata
        metadata["og_title"] = metadata["title"]
        metadata["og_description"] = metadata["description"]
        metadata["twitter_title"] = metadata["title"]
        metadata["twitter_description"] = metadata["description"]
        
        return jsonify(metadata)
    
    except Exception as e:
        current_app.logger.error(f"Error generating SEO metadata: {str(e)}")
        return jsonify({
            "error": "Error generating SEO metadata",
            "details": str(e)
        }), 500

# API endpoint to get structured data for a specific page
@seo_blueprint.route('/api/seo/structured-data/<page_type>/<page_id>')
def get_structured_data(page_type, page_id=None):
    """Get structured data (JSON-LD) for a specific page"""
    try:
        db = current_app.mongo_client.lexova
        
        structured_data = []
        
        # Organization schema for all pages
        organization = {
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
        }
        
        structured_data.append(organization)
        
        # Page-specific structured data
        if page_type == "home":
            legal_service = {
                "@context": "https://schema.org",
                "@type": "LegalService",
                "name": "Lexova Legal Platform",
                "description": "AI-powered legal services platform connecting clients with qualified lawyers",
                "url": "https://lexova.com",
                "logo": "https://lexova.com/images/lexova-logo.png",
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
            }
            structured_data.append(legal_service)
            
        elif page_type == "faq":
            # Get FAQ data
            faqs = db.faqs.find()
            faq_items = []
            
            for faq in faqs:
                faq_items.append({
                    "@type": "Question",
                    "name": faq.get("question", ""),
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.get("answer", "")
                    }
                })
            
            if faq_items:
                faq_schema = {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faq_items
                }
                structured_data.append(faq_schema)
            
        elif page_type == "lawyer" and page_id:
            # Get lawyer data
            lawyer = db.lawyers.find_one({"_id": ObjectId(page_id)})
            if lawyer:
                name = lawyer.get("name", "")
                description = lawyer.get("bio", "")
                image = lawyer.get("profile_image", "https://lexova.com/images/default-lawyer.png")
                specializations = lawyer.get("specializations", [])
                
                lawyer_schema = {
                    "@context": "https://schema.org",
                    "@type": "Attorney",
                    "name": name,
                    "description": description,
                    "image": image,
                    "url": f"https://lexova.com/lawyers/{page_id}/{generate_seo_url(name)}",
                    "telephone": lawyer.get("phone", ""),
                    "email": lawyer.get("email", ""),
                    "knowsAbout": specializations,
                    "worksFor": {
                        "@type": "Organization",
                        "name": lawyer.get("firm_name", name)
                    }
                }
                structured_data.append(lawyer_schema)
                
                # Add reviews if available
                reviews = db.reviews.find({"lawyer_id": ObjectId(page_id)})
                for review in reviews:
                    client = db.clients.find_one({"_id": review.get("client_id")})
                    if client:
                        review_schema = {
                            "@context": "https://schema.org",
                            "@type": "Review",
                            "itemReviewed": {
                                "@type": "Attorney",
                                "name": name
                            },
                            "reviewRating": {
                                "@type": "Rating",
                                "ratingValue": review.get("rating", 5),
                                "bestRating": 5
                            },
                            "author": {
                                "@type": "Person",
                                "name": client.get("name", "Anonymous Client")
                            },
                            "reviewBody": review.get("comment", "")
                        }
                        structured_data.append(review_schema)
        
        return jsonify(structured_data)
    
    except Exception as e:
        current_app.logger.error(f"Error generating structured data: {str(e)}")
        return jsonify({
            "error": "Error generating structured data",
            "details": str(e)
        }), 500

# Register the blueprint
def register_seo_blueprint(app):
    app.register_blueprint(seo_blueprint)

