#!/usr/bin/env python3
"""
Database seeder script for Lexova platform
Populates the database with initial data including admins, clients, and lawyers
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from pymongo import MongoClient
from src.models.database import DatabaseSeeder, DatabaseModels
from datetime import datetime
import random

def seed_database():
    """Seed the database with initial data"""
    try:
        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017/')
        db = client.lexova_db
        
        print("Starting database seeding...")
        
        # Clear existing data
        print("Clearing existing collections...")
        db.users.delete_many({})
        db.lawyers.delete_many({})
        db.admins.delete_many({})
        db.cases.delete_many({})
        db.reviews.delete_many({})
        db.notifications.delete_many({})
        db.content.delete_many({})
        
        # Create admin users
        print("Creating admin users...")
        admins = DatabaseSeeder.create_admin_users()
        db.admins.insert_many(admins)
        print(f"Created {len(admins)} admin users")
        
        # Create sample lawyers
        print("Creating sample lawyers...")
        lawyers = DatabaseSeeder.create_sample_lawyers()
        db.lawyers.insert_many(lawyers)
        print(f"Created {len(lawyers)} lawyers")
        
        # Create sample clients
        print("Creating sample clients...")
        clients = DatabaseSeeder.create_sample_clients()
        db.users.insert_many(clients)
        print(f"Created {len(clients)} clients")
        
        # Create sample cases with 10 matched cases
        print("Creating sample cases...")
        cases = create_sample_cases(db, clients, lawyers)
        db.cases.insert_many(cases)
        print(f"Created {len(cases)} cases")
        
        # Create sample reviews
        print("Creating sample reviews...")
        reviews = create_sample_reviews(db, cases)
        if reviews:
            db.reviews.insert_many(reviews)
            print(f"Created {len(reviews)} reviews")
        
        # Create sample content
        print("Creating sample content...")
        content = create_sample_content(db, admins)
        db.content.insert_many(content)
        print(f"Created {len(content)} content items")
        
        print("Database seeding completed successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        raise

def create_sample_cases(db, clients, lawyers):
    """Create sample cases with some matched to lawyers"""
    cases = []
    case_categories = [
        "Criminal Law", "Family Law", "Personal Injury", "Corporate Law",
        "Real Estate Law", "Immigration Law", "Employment Law", 
        "Intellectual Property", "Tax Law", "Bankruptcy Law"
    ]
    
    urgency_levels = ["low", "medium", "high", "urgent"]
    
    for i in range(20):  # Create 20 sample cases
        client = random.choice(clients)
        category = random.choice(case_categories)
        urgency = random.choice(urgency_levels)
        
        case = DatabaseModels.create_case_schema()
        case.update({
            'client_id': client['_id'],
            'case_details': {
                'title': f"Case {i+1}: {category} Matter",
                'description': f"This is a sample {category.lower()} case requiring legal assistance. The client needs help with various legal matters related to {category.lower()}.",
                'category': category,
                'urgency': urgency,
                'budget_range': {
                    'min': random.randint(500, 2000),
                    'max': random.randint(3000, 10000)
                },
                'location': {
                    'city': client['profile']['address']['city'],
                    'state': client['profile']['address']['state'],
                    'country': client['profile']['address']['country']
                },
                'preferred_language': 'English'
            },
            'ai_analysis': {
                'case_type': category,
                'complexity_score': random.uniform(3.0, 8.0),
                'recommended_specializations': [category],
                'estimated_duration': f"{random.randint(1, 12)} months",
                'suggested_lawyers': []
            }
        })
        
        # For first 10 cases, assign lawyers (matched cases)
        if i < 10:
            # Find lawyers with matching specialization
            matching_lawyers = [l for l in lawyers if category in l['profile']['specializations']]
            if matching_lawyers:
                lawyer = random.choice(matching_lawyers)
                case['lawyer_id'] = lawyer['_id']
                case['status'] = 'active'
                case['timeline'].append({
                    'event': 'case_matched',
                    'timestamp': datetime.utcnow(),
                    'description': 'Case matched with lawyer through AI system'
                })
                case['timeline'].append({
                    'event': 'case_accepted',
                    'timestamp': datetime.utcnow(),
                    'description': 'Case accepted by lawyer'
                })
        
        cases.append(case)
    
    return cases

def create_sample_reviews(db, cases):
    """Create sample reviews for completed cases"""
    reviews = []
    
    # Get cases that have lawyers assigned
    matched_cases = [case for case in cases if case.get('lawyer_id')]
    
    for case in matched_cases[:5]:  # Create reviews for first 5 matched cases
        review = DatabaseModels.create_review_schema()
        review.update({
            'case_id': case['_id'],
            'client_id': case['client_id'],
            'lawyer_id': case['lawyer_id'],
            'rating': random.randint(3, 5),
            'review_text': f"Great experience working with the lawyer on my {case['case_details']['category'].lower()} case. Professional and knowledgeable.",
            'categories': {
                'communication': random.randint(3, 5),
                'expertise': random.randint(3, 5),
                'responsiveness': random.randint(3, 5),
                'value': random.randint(3, 5)
            },
            'is_verified': True
        })
        reviews.append(review)
    
    return reviews

def create_sample_content(db, admins):
    """Create sample CMS content"""
    content = []
    admin = admins[0]  # Use first admin as content creator
    
    # Sample FAQ content
    faqs = [
        {
            'type': 'faq',
            'title': 'How does Lexova work?',
            'content': 'Lexova uses AI to match clients with the best lawyers based on their case details, location, and preferences. Simply submit your case and our AI will suggest the top 5 lawyers for your needs.',
            'category': 'general',
            'status': 'published'
        },
        {
            'type': 'faq',
            'title': 'How much does it cost?',
            'content': 'Lexova charges a small platform fee for successful matches. Lawyer fees are set by individual lawyers and vary based on case complexity and lawyer experience.',
            'category': 'pricing',
            'status': 'published'
        },
        {
            'type': 'faq',
            'title': 'Is my information secure?',
            'content': 'Yes, we use industry-standard encryption and security measures to protect your personal and case information. We are GDPR and CCPA compliant.',
            'category': 'security',
            'status': 'published'
        }
    ]
    
    # Sample blog posts
    blogs = [
        {
            'type': 'blog',
            'title': 'Understanding Your Legal Rights',
            'content': 'This comprehensive guide explains the fundamental legal rights every citizen should know...',
            'category': 'legal-education',
            'status': 'published'
        },
        {
            'type': 'blog',
            'title': 'How to Choose the Right Lawyer',
            'content': 'Selecting the right lawyer for your case is crucial for success. Here are key factors to consider...',
            'category': 'legal-tips',
            'status': 'published'
        }
    ]
    
    # Sample legal knowledge articles
    legal_articles = [
        {
            'type': 'legal_knowledge',
            'title': 'Criminal Law Basics',
            'content': 'An overview of criminal law principles, procedures, and common charges...',
            'category': 'criminal-law',
            'status': 'published'
        },
        {
            'type': 'legal_knowledge',
            'title': 'Family Law Guide',
            'content': 'Understanding divorce, child custody, and other family law matters...',
            'category': 'family-law',
            'status': 'published'
        }
    ]
    
    all_content = faqs + blogs + legal_articles
    
    for item in all_content:
        content_doc = DatabaseModels.create_content_schema()
        content_doc.update({
            'type': item['type'],
            'title': item['title'],
            'content': item['content'],
            'slug': item['title'].lower().replace(' ', '-').replace('?', ''),
            'meta': {
                'description': item['content'][:150] + '...',
                'keywords': [item['category'], 'legal', 'law'],
                'author': f"{admin['profile']['first_name']} {admin['profile']['last_name']}"
            },
            'status': item['status'],
            'category': item['category'],
            'tags': ['legal', item['category']],
            'created_by': admin['_id'],
            'published_at': datetime.utcnow() if item['status'] == 'published' else None
        })
        content.append(content_doc)
    
    return content

if __name__ == '__main__':
    seed_database()

