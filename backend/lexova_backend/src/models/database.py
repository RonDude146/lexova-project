from datetime import datetime
from bson import ObjectId
import bcrypt

class DatabaseModels:
    """Database models and schema definitions for Lexova platform"""
    
    @staticmethod
    def create_user_schema():
        """Schema for user collection (clients)"""
        return {
            "_id": ObjectId(),
            "email": "",
            "password_hash": "",
            "role": "client",  # client, lawyer, admin
            "profile": {
                "first_name": "",
                "last_name": "",
                "phone": "",
                "address": {
                    "street": "",
                    "city": "",
                    "state": "",
                    "zip_code": "",
                    "country": ""
                },
                "preferences": {
                    "communication_method": "email",  # email, sms, both
                    "notifications": True
                }
            },
            "verification": {
                "email_verified": False,
                "phone_verified": False,
                "verification_token": ""
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "last_login": None,
            "is_active": True
        }
    
    @staticmethod
    def create_lawyer_schema():
        """Schema for lawyer collection"""
        return {
            "_id": ObjectId(),
            "email": "",
            "password_hash": "",
            "role": "lawyer",
            "profile": {
                "first_name": "",
                "last_name": "",
                "phone": "",
                "law_firm": "",
                "bar_number": "",
                "specializations": [],  # List of legal specializations
                "experience_years": 0,
                "education": [],
                "certifications": [],
                "bio": "",
                "profile_photo": "",
                "address": {
                    "street": "",
                    "city": "",
                    "state": "",
                    "zip_code": "",
                    "country": ""
                }
            },
            "pricing": {
                "hourly_rate": 0.0,
                "consultation_fee": 0.0,
                "payment_methods": []
            },
            "availability": {
                "schedule": {},  # Weekly schedule
                "timezone": "",
                "booking_advance_days": 7
            },
            "verification": {
                "email_verified": False,
                "phone_verified": False,
                "bar_verified": False,
                "documents_verified": False,
                "verification_status": "pending",  # pending, approved, rejected
                "verification_token": ""
            },
            "ratings": {
                "average_rating": 0.0,
                "total_reviews": 0,
                "total_cases": 0
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "last_login": None,
            "is_active": True
        }
    
    @staticmethod
    def create_case_schema():
        """Schema for case collection"""
        return {
            "_id": ObjectId(),
            "client_id": ObjectId(),
            "lawyer_id": None,  # Assigned lawyer
            "case_details": {
                "title": "",
                "description": "",
                "category": "",  # criminal, civil, family, corporate, etc.
                "urgency": "medium",  # low, medium, high, urgent
                "budget_range": {
                    "min": 0.0,
                    "max": 0.0
                },
                "location": {
                    "city": "",
                    "state": "",
                    "country": ""
                },
                "preferred_language": "English"
            },
            "ai_analysis": {
                "case_type": "",
                "complexity_score": 0.0,
                "recommended_specializations": [],
                "estimated_duration": "",
                "suggested_lawyers": []
            },
            "status": "pending",  # pending, matched, active, completed, cancelled
            "timeline": [
                {
                    "event": "case_created",
                    "timestamp": datetime.utcnow(),
                    "description": "Case submitted by client"
                }
            ],
            "documents": [],
            "communications": [],
            "payment": {
                "total_amount": 0.0,
                "paid_amount": 0.0,
                "payment_status": "pending",
                "payment_method": "",
                "transactions": []
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    
    @staticmethod
    def create_review_schema():
        """Schema for review collection"""
        return {
            "_id": ObjectId(),
            "case_id": ObjectId(),
            "client_id": ObjectId(),
            "lawyer_id": ObjectId(),
            "rating": 0,  # 1-5 stars
            "review_text": "",
            "categories": {
                "communication": 0,
                "expertise": 0,
                "responsiveness": 0,
                "value": 0
            },
            "is_verified": False,
            "created_at": datetime.utcnow()
        }
    
    @staticmethod
    def create_admin_schema():
        """Schema for admin collection"""
        return {
            "_id": ObjectId(),
            "email": "",
            "password_hash": "",
            "role": "admin",
            "profile": {
                "first_name": "",
                "last_name": "",
                "position": "",  # CEO, CTO, CFO
                "permissions": []
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "last_login": None,
            "is_active": True
        }
    
    @staticmethod
    def create_content_schema():
        """Schema for CMS content collection"""
        return {
            "_id": ObjectId(),
            "type": "",  # blog, faq, legal_knowledge, page_content
            "title": "",
            "content": "",
            "slug": "",
            "meta": {
                "description": "",
                "keywords": [],
                "author": ""
            },
            "status": "draft",  # draft, published, archived
            "category": "",
            "tags": [],
            "created_by": ObjectId(),  # Admin ID
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "published_at": None
        }
    
    @staticmethod
    def create_notification_schema():
        """Schema for notification collection"""
        return {
            "_id": ObjectId(),
            "recipient_id": ObjectId(),
            "recipient_type": "",  # client, lawyer, admin
            "type": "",  # case_update, payment, system, marketing
            "title": "",
            "message": "",
            "data": {},  # Additional data for the notification
            "is_read": False,
            "created_at": datetime.utcnow()
        }

class DatabaseSeeder:
    """Database seeder for initial data"""
    
    @staticmethod
    def hash_password(password):
        """Hash password using bcrypt"""
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    @staticmethod
    def create_admin_users():
        """Create initial admin users"""
        admins = [
            {
                "email": "ethan@lexova.com",
                "password_hash": DatabaseSeeder.hash_password("LexovaAdmin2024!"),
                "role": "admin",
                "profile": {
                    "first_name": "Ethan",
                    "last_name": "Mathew Kiran",
                    "position": "CEO",
                    "permissions": ["all"]
                },
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "last_login": None,
                "is_active": True
            },
            {
                "email": "aron@lexova.com",
                "password_hash": DatabaseSeeder.hash_password("LexovaAdmin2024!"),
                "role": "admin",
                "profile": {
                    "first_name": "Aron",
                    "last_name": "Eby",
                    "position": "CTO",
                    "permissions": ["all"]
                },
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "last_login": None,
                "is_active": True
            },
            {
                "email": "aiden@lexova.com",
                "password_hash": DatabaseSeeder.hash_password("LexovaAdmin2024!"),
                "role": "admin",
                "profile": {
                    "first_name": "Aiden",
                    "last_name": "Mathew Arun",
                    "position": "CFO",
                    "permissions": ["all"]
                },
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "last_login": None,
                "is_active": True
            }
        ]
        return admins
    
    @staticmethod
    def create_sample_lawyers():
        """Create sample lawyer data"""
        specializations_list = [
            ["Criminal Law", "DUI Defense"],
            ["Family Law", "Divorce", "Child Custody"],
            ["Personal Injury", "Medical Malpractice"],
            ["Corporate Law", "Business Formation"],
            ["Real Estate Law", "Property Disputes"],
            ["Immigration Law", "Visa Applications"],
            ["Employment Law", "Workplace Discrimination"],
            ["Intellectual Property", "Patent Law"],
            ["Tax Law", "IRS Disputes"],
            ["Bankruptcy Law", "Debt Relief"]
        ]
        
        cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", 
                 "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"]
        
        lawyers = []
        for i in range(100):
            lawyer = DatabaseModels.create_lawyer_schema()
            lawyer.update({
                "email": f"lawyer{i+1}@example.com",
                "password_hash": DatabaseSeeder.hash_password("LawyerPass123!"),
                "profile": {
                    "first_name": f"Lawyer{i+1}",
                    "last_name": f"Smith{i+1}",
                    "phone": f"+1-555-{1000+i:04d}",
                    "law_firm": f"Law Firm {i+1}",
                    "bar_number": f"BAR{10000+i}",
                    "specializations": specializations_list[i % len(specializations_list)],
                    "experience_years": (i % 20) + 1,
                    "education": [f"Law School {i+1}"],
                    "certifications": ["Bar Certification"],
                    "bio": f"Experienced lawyer specializing in {', '.join(specializations_list[i % len(specializations_list)])}",
                    "profile_photo": "",
                    "address": {
                        "street": f"{100+i} Main St",
                        "city": cities[i % len(cities)],
                        "state": "NY",
                        "zip_code": f"{10000+i}",
                        "country": "USA"
                    }
                },
                "pricing": {
                    "hourly_rate": 150.0 + (i * 10),
                    "consultation_fee": 50.0 + (i * 5),
                    "payment_methods": ["credit_card", "bank_transfer"]
                },
                "verification": {
                    "email_verified": True,
                    "phone_verified": True,
                    "bar_verified": True,
                    "documents_verified": True,
                    "verification_status": "approved"
                },
                "ratings": {
                    "average_rating": 4.0 + (i % 10) * 0.1,
                    "total_reviews": i % 50,
                    "total_cases": i % 100
                }
            })
            lawyers.append(lawyer)
        
        return lawyers
    
    @staticmethod
    def create_sample_clients():
        """Create sample client data"""
        clients = []
        for i in range(100):
            client = DatabaseModels.create_user_schema()
            client.update({
                "email": f"client{i+1}@example.com",
                "password_hash": DatabaseSeeder.hash_password("ClientPass123!"),
                "profile": {
                    "first_name": f"Client{i+1}",
                    "last_name": f"Johnson{i+1}",
                    "phone": f"+1-555-{2000+i:04d}",
                    "address": {
                        "street": f"{200+i} Oak St",
                        "city": "New York",
                        "state": "NY",
                        "zip_code": f"{20000+i}",
                        "country": "USA"
                    },
                    "preferences": {
                        "communication_method": "email",
                        "notifications": True
                    }
                },
                "verification": {
                    "email_verified": True,
                    "phone_verified": True
                }
            })
            clients.append(client)
        
        return clients

