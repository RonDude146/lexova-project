# Lexova Platform - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Architecture](#backend-architecture)
4. [Database Schema](#database-schema)
5. [API Documentation](#api-documentation)
6. [Authentication System](#authentication-system)
7. [AI Implementation](#ai-implementation)
8. [Deployment Guide](#deployment-guide)
9. [Development Guide](#development-guide)
10. [Testing](#testing)

## Architecture Overview

The Lexova platform follows a modern client-server architecture with a React frontend, Flask backend, and MongoDB database. The system is designed to be scalable, maintainable, and secure.

### System Components

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │     │   Backend   │     │  Database   │
│   (React)   │◄───►│   (Flask)   │◄───►│  (MongoDB)  │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │ AI Services │
                    │  (OpenAI)   │
                    └─────────────┘
```

### Key Technologies

- **Frontend**: React 19, Tailwind CSS, React Router, Axios
- **Backend**: Flask, JWT, MongoDB (PyMongo)
- **Database**: MongoDB
- **AI Integration**: OpenAI GPT API
- **Deployment**: Docker, AWS/GCP/Azure

## Frontend Architecture

### Directory Structure

```
frontend/
└── lexova_frontend/
    ├── public/
    │   ├── index.html
    │   ├── favicon.ico
    │   └── assets/
    ├── src/
    │   ├── components/
    │   │   ├── Layout/
    │   │   ├── Dashboard/
    │   │   ├── Forms/
    │   │   ├── UI/
    │   │   └── SEO/
    │   ├── pages/
    │   │   ├── Landing.jsx
    │   │   ├── SignUp.jsx
    │   │   ├── SignIn.jsx
    │   │   ├── AboutUs.jsx
    │   │   ├── Dashboard/
    │   │   └── ...
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── auth.js
    │   │   └── ...
    │   ├── utils/
    │   │   ├── helpers.js
    │   │   ├── validation.js
    │   │   └── ...
    │   ├── App.jsx
    │   └── index.js
    ├── package.json
    └── README.md
```

### Component Architecture

The frontend follows a component-based architecture with reusable UI components and page-specific components. Key architectural patterns include:

1. **Layout Components**: Provide consistent structure across pages
2. **Page Components**: Represent full pages in the application
3. **Feature Components**: Implement specific features (e.g., AI matching)
4. **UI Components**: Reusable UI elements (buttons, cards, etc.)
5. **Form Components**: Handle user input and validation

### State Management

State management is handled using React's Context API and hooks:

```jsx
// Example of AuthContext
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUser, login, logout } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const userData = await login(credentials);
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### Routing

Routing is implemented using React Router v6:

```jsx
// Example of App.jsx with routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ClientDashboard from './pages/Dashboard/ClientDashboard';
// ... other imports

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute role="client" />}>
              <Route path="client/*" element={<ClientRoutes />} />
            </Route>
            <Route element={<ProtectedRoute role="lawyer" />}>
              <Route path="lawyer/*" element={<LawyerRoutes />} />
            </Route>
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="admin/*" element={<AdminRoutes />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

### API Integration

API calls are centralized in service modules using Axios:

```javascript
// Example of api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## Backend Architecture

### Directory Structure

```
backend/
└── lexova_backend/
    ├── src/
    │   ├── routes/
    │   │   ├── auth.py
    │   │   ├── users.py
    │   │   ├── lawyers.py
    │   │   ├── cases.py
    │   │   ├── admin.py
    │   │   ├── ai_matching.py
    │   │   └── seo.py
    │   ├── models/
    │   │   ├── database.py
    │   │   └── schemas.py
    │   ├── ai/
    │   │   ├── lawyer_matching.py
    │   │   └── case_assistant.py
    │   ├── utils/
    │   │   ├── auth.py
    │   │   ├── validators.py
    │   │   └── helpers.py
    │   └── main.py
    ├── tests/
    │   ├── test_api.py
    │   └── ...
    ├── requirements.txt
    └── README.md
```

### API Structure

The backend follows a blueprint-based structure with Flask:

```python
# Example of main.py
from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta

# Import blueprints
from src.routes.auth import auth_blueprint
from src.routes.users import users_blueprint
from src.routes.lawyers import lawyers_blueprint
from src.routes.cases import cases_blueprint
from src.routes.admin import admin_blueprint
from src.routes.ai_matching import ai_matching_blueprint
from src.routes.seo import register_seo_blueprint

# Initialize Flask app
app = Flask(__name__, static_folder='static')
CORS(app)

# Configure app
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/lexova_db'

# Initialize extensions
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
app.register_blueprint(users_blueprint, url_prefix='/api/users')
app.register_blueprint(lawyers_blueprint, url_prefix='/api/lawyers')
app.register_blueprint(cases_blueprint, url_prefix='/api/cases')
app.register_blueprint(admin_blueprint, url_prefix='/api/admin')
app.register_blueprint(ai_matching_blueprint, url_prefix='/api/ai')
register_seo_blueprint(app)

# Root route
@app.route('/')
def home():
    return jsonify({"message": "Lexova API is running"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
```

### Route Implementation

Routes are organized by feature area:

```python
# Example of auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from src.models.database import get_db
from src.utils.validators import validate_email, validate_password

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate input
    if not all(k in data for k in ('name', 'email', 'password', 'role')):
        return jsonify({"error": "Missing required fields"}), 400
    
    if not validate_email(data['email']):
        return jsonify({"error": "Invalid email format"}), 400
    
    if not validate_password(data['password']):
        return jsonify({"error": "Password does not meet requirements"}), 400
    
    if data['role'] not in ['client', 'lawyer']:
        return jsonify({"error": "Invalid role"}), 400
    
    # Check if user already exists
    db = get_db()
    if db.users.find_one({"email": data['email']}):
        return jsonify({"error": "Email already registered"}), 400
    
    # Create user
    user_id = db.users.insert_one({
        "name": data['name'],
        "email": data['email'],
        "password": generate_password_hash(data['password']),
        "role": data['role'],
        "created_at": datetime.utcnow(),
        "status": "active"
    }).inserted_id
    
    # Create role-specific profile
    if data['role'] == 'client':
        db.clients.insert_one({
            "user_id": str(user_id),
            "cases": []
        })
    elif data['role'] == 'lawyer':
        db.lawyers.insert_one({
            "user_id": str(user_id),
            "specializations": [],
            "education": [],
            "experience": [],
            "rating": 0,
            "verified": False
        })
    
    return jsonify({"message": "User registered successfully"}), 201

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not all(k in data for k in ('email', 'password')):
        return jsonify({"error": "Missing email or password"}), 400
    
    # Find user
    db = get_db()
    user = db.users.find_one({"email": data['email']})
    
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({"error": "Invalid email or password"}), 401
    
    if user['status'] != "active":
        return jsonify({"error": "Account is not active"}), 403
    
    # Create access token
    access_token = create_access_token(identity={"user_id": str(user['_id']), "role": user['role']})
    
    return jsonify({
        "token": access_token,
        "user": {
            "id": str(user['_id']),
            "name": user['name'],
            "email": user['email'],
            "role": user['role']
        }
    }), 200

# More routes...
```

## Database Schema

The Lexova platform uses MongoDB with the following collections:

### Users Collection

```javascript
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "password": String,  // Hashed
  "role": String,      // "client", "lawyer", or "admin"
  "status": String,    // "active", "pending", "suspended"
  "created_at": Date,
  "last_login": Date
}
```

### Clients Collection

```javascript
{
  "_id": ObjectId,
  "user_id": String,
  "phone": String,
  "address": {
    "street": String,
    "city": String,
    "state": String,
    "zip": String,
    "country": String
  },
  "cases": [String],  // Array of case IDs
  "payment_methods": [{
    "type": String,
    "last4": String,
    "expiry": String,
    "is_default": Boolean
  }]
}
```

### Lawyers Collection

```javascript
{
  "_id": ObjectId,
  "user_id": String,
  "phone": String,
  "address": {
    "street": String,
    "city": String,
    "state": String,
    "zip": String,
    "country": String
  },
  "specializations": [String],
  "education": [{
    "institution": String,
    "degree": String,
    "year": Number
  }],
  "experience": [{
    "title": String,
    "organization": String,
    "start_year": Number,
    "end_year": Number,
    "description": String
  }],
  "bar_number": String,
  "rating": Number,
  "verified": Boolean,
  "verification_documents": [{
    "type": String,
    "url": String,
    "status": String
  }],
  "cases": [String],  // Array of case IDs
  "availability": [{
    "day": Number,
    "start_time": String,
    "end_time": String
  }],
  "payment_info": {
    "bank_name": String,
    "account_number": String,  // Encrypted
    "routing_number": String   // Encrypted
  }
}
```

### Cases Collection

```javascript
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "type": String,
  "client_id": String,
  "lawyer_id": String,  // Null if not assigned
  "status": String,     // "pending", "active", "completed", "disputed"
  "created_at": Date,
  "updated_at": Date,
  "documents": [{
    "name": String,
    "url": String,
    "uploaded_by": String,
    "uploaded_at": Date
  }],
  "messages": [{
    "sender_id": String,
    "sender_role": String,
    "content": String,
    "sent_at": Date,
    "read": Boolean
  }],
  "payments": [String],  // Array of payment IDs
  "ai_analysis": {
    "complexity": Number,
    "estimated_duration": Number,
    "recommended_specializations": [String]
  }
}
```

### Payments Collection

```javascript
{
  "_id": ObjectId,
  "case_id": String,
  "client_id": String,
  "lawyer_id": String,
  "amount": Number,
  "platform_fee": Number,
  "lawyer_amount": Number,
  "description": String,
  "status": String,  // "pending", "completed", "failed", "refunded"
  "payment_method": String,
  "transaction_id": String,
  "created_at": Date,
  "completed_at": Date
}
```

### Reviews Collection

```javascript
{
  "_id": ObjectId,
  "case_id": String,
  "client_id": String,
  "lawyer_id": String,
  "rating": Number,
  "content": String,
  "created_at": Date,
  "updated_at": Date
}
```

### CMS Content Collection

```javascript
{
  "_id": ObjectId,
  "slug": String,
  "title": String,
  "content": String,
  "type": String,  // "page", "blog", "legal"
  "status": String,  // "published", "draft"
  "created_at": Date,
  "updated_at": Date,
  "author": String
}
```

### Settings Collection

```javascript
{
  "_id": ObjectId,
  "key": String,
  "value": Mixed,
  "description": String,
  "updated_at": Date
}
```

## API Documentation

### Authentication Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/auth/register` | POST | Register a new user | `{ name, email, password, role }` | `{ message, user_id }` |
| `/api/auth/login` | POST | Authenticate user | `{ email, password }` | `{ token, user }` |
| `/api/auth/refresh` | POST | Refresh access token | `{ refresh_token }` | `{ token }` |
| `/api/auth/logout` | POST | Logout user | - | `{ message }` |

### User Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/users/profile` | GET | Get user profile | - | `{ user }` |
| `/api/users/profile` | PUT | Update user profile | `{ name, phone, ... }` | `{ message, user }` |
| `/api/users/password` | PUT | Change password | `{ current_password, new_password }` | `{ message }` |

### Lawyer Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/lawyers` | GET | Get all lawyers | - | `{ lawyers }` |
| `/api/lawyers/:id` | GET | Get lawyer by ID | - | `{ lawyer }` |
| `/api/lawyers/profile` | GET | Get own lawyer profile | - | `{ profile }` |
| `/api/lawyers/profile` | PUT | Update lawyer profile | `{ specializations, education, ... }` | `{ message, profile }` |
| `/api/lawyers/availability` | GET | Get availability | - | `{ availability }` |
| `/api/lawyers/availability` | PUT | Update availability | `{ availability }` | `{ message }` |

### Case Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/cases` | GET | Get user cases | - | `{ cases }` |
| `/api/cases` | POST | Create new case | `{ title, description, type }` | `{ message, case_id }` |
| `/api/cases/:id` | GET | Get case by ID | - | `{ case }` |
| `/api/cases/:id` | PUT | Update case | `{ status, ... }` | `{ message, case }` |
| `/api/cases/:id/documents` | POST | Upload document | `multipart/form-data` | `{ message, document }` |
| `/api/cases/:id/messages` | GET | Get case messages | - | `{ messages }` |
| `/api/cases/:id/messages` | POST | Send message | `{ content }` | `{ message }` |

### AI Matching Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/ai/match` | POST | Find matching lawyers | `{ case_type, description, ... }` | `{ matches }` |
| `/api/ai/analyze` | POST | Analyze case | `{ description, documents }` | `{ analysis }` |
| `/api/ai/assistant` | POST | Get AI assistance | `{ question, case_id }` | `{ response }` |

### Admin Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/admin/dashboard` | GET | Get admin dashboard data | - | `{ stats }` |
| `/api/admin/users` | GET | Get all users | - | `{ users }` |
| `/api/admin/users/:id` | GET | Get user by ID | - | `{ user }` |
| `/api/admin/users/:id` | PUT | Update user | `{ status, ... }` | `{ message, user }` |
| `/api/admin/cases` | GET | Get all cases | - | `{ cases }` |
| `/api/admin/payments` | GET | Get all payments | - | `{ payments }` |
| `/api/admin/settings` | GET | Get settings | - | `{ settings }` |
| `/api/admin/settings` | PUT | Update settings | `{ key, value }` | `{ message }` |

## Authentication System

The Lexova platform uses JWT (JSON Web Tokens) for authentication:

### Token Generation

```python
# Example of token generation
from flask_jwt_extended import create_access_token

def generate_token(user_id, role):
    identity = {
        "user_id": str(user_id),
        "role": role
    }
    return create_access_token(identity=identity)
```

### Token Verification

```python
# Example of protected route
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
```

### Role-Based Access Control

```python
# Example of role-based decorator
from functools import wraps
from flask_jwt_extended import get_jwt_identity
from flask import jsonify

def role_required(roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            current_user = get_jwt_identity()
            if current_user['role'] not in roles:
                return jsonify({"error": "Insufficient permissions"}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator

# Usage
@app.route('/api/admin/dashboard', methods=['GET'])
@jwt_required()
@role_required(['admin'])
def admin_dashboard():
    # Only accessible to admins
    return jsonify({"data": "Admin dashboard data"})
```

## AI Implementation

### Lawyer Matching Algorithm

The AI lawyer matching system uses OpenAI's GPT model to analyze case details and find the most suitable lawyers:

```python
# Example of lawyer_matching.py
import openai
from src.models.database import get_db

class LawyerMatcher:
    def __init__(self, api_key):
        openai.api_key = api_key
        self.db = get_db()
    
    def analyze_case(self, case_description, case_type):
        """Analyze case details to determine complexity and required expertise"""
        prompt = f"""
        Analyze the following legal case:
        Type: {case_type}
        Description: {case_description}
        
        Provide a JSON response with the following:
        1. Complexity score (1-10)
        2. Required specializations (list)
        3. Estimated duration (in months)
        4. Key legal issues (list)
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a legal expert analyzing cases."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        return json.loads(response.choices[0].message.content)
    
    def find_matching_lawyers(self, case_analysis, location=None, budget=None):
        """Find lawyers matching the case requirements"""
        # Build query
        query = {
            "specializations": {"$in": case_analysis["required_specializations"]},
            "verified": True
        }
        
        if location:
            query["address.city"] = location
        
        # Find matching lawyers
        lawyers = list(self.db.lawyers.find(query))
        
        # Calculate match scores
        for lawyer in lawyers:
            # Base score from specialization match
            spec_match = len(set(lawyer["specializations"]) & set(case_analysis["required_specializations"]))
            spec_score = spec_match / len(case_analysis["required_specializations"])
            
            # Experience factor
            exp_years = sum(exp["end_year"] - exp["start_year"] for exp in lawyer["experience"])
            exp_factor = min(exp_years / 10, 1)  # Cap at 10 years
            
            # Rating factor
            rating_factor = lawyer["rating"] / 5
            
            # Calculate final score
            lawyer["match_score"] = (spec_score * 0.5) + (exp_factor * 0.3) + (rating_factor * 0.2)
            
            # Match reasons
            lawyer["match_reasons"] = []
            if spec_match > 0:
                lawyer["match_reasons"].append(f"Specializes in {spec_match} required areas")
            if exp_years > 5:
                lawyer["match_reasons"].append(f"{exp_years} years of relevant experience")
            if lawyer["rating"] >= 4:
                lawyer["match_reasons"].append(f"Highly rated ({lawyer['rating']}/5)")
        
        # Sort by match score
        lawyers.sort(key=lambda x: x["match_score"], reverse=True)
        
        return lawyers[:10]  # Return top 10 matches
```

### Case Assistant

The AI case assistant provides legal guidance based on case details:

```python
# Example of case_assistant.py
import openai
from src.models.database import get_db

class CaseAssistant:
    def __init__(self, api_key):
        openai.api_key = api_key
        self.db = get_db()
    
    def get_case_context(self, case_id):
        """Get case details for context"""
        case = self.db.cases.find_one({"_id": case_id})
        if not case:
            return None
        
        context = {
            "title": case["title"],
            "type": case["type"],
            "description": case["description"],
            "status": case["status"],
            "documents": [doc["name"] for doc in case.get("documents", [])]
        }
        
        return context
    
    def answer_question(self, question, case_context):
        """Answer legal questions based on case context"""
        prompt = f"""
        Case Information:
        Title: {case_context['title']}
        Type: {case_context['type']}
        Description: {case_context['description']}
        Status: {case_context['status']}
        Documents: {', '.join(case_context['documents'])}
        
        Question: {question}
        
        Provide a helpful response to this legal question based on the case information.
        Include any relevant legal concepts, potential next steps, or considerations.
        If you cannot provide specific legal advice, explain why and offer general information.
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a legal assistant providing information about cases. You cannot provide specific legal advice but can offer general legal information and guidance."},
                {"role": "user", "content": prompt}
            ]
        )
        
        return response.choices[0].message.content
    
    def generate_questions(self, case_context):
        """Generate relevant questions for the case type"""
        prompt = f"""
        Generate 5 important questions a client might ask about their {case_context['type']} case.
        The case involves: {case_context['description']}
        
        Provide a JSON array of questions.
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a legal assistant helping clients understand their cases."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        return json.loads(response.choices[0].message.content)
```

## Deployment Guide

For detailed deployment instructions, refer to the following documents:

1. [Migration Guide](/deployment/docs/migration_guide.md)
2. [AWS Deployment](/deployment/aws/README.md)
3. [GCP Deployment](/deployment/gcp/README.md)
4. [Azure Deployment](/deployment/azure/README.md)

## Development Guide

### Setting Up the Development Environment

#### Backend Setup

```bash
# Clone the repository
git clone https://github.com/lexova/lexova-platform.git
cd lexova-platform

# Set up backend
cd backend/lexova_backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Start MongoDB (if not using a remote instance)
mongod --dbpath=/path/to/data/db

# Run the backend
python src/main.py
```

#### Frontend Setup

```bash
# Set up frontend
cd frontend/lexova_frontend
npm install

# Run the frontend
npm start
```

### Development Workflow

1. **Feature Branches**: Create a new branch for each feature or bug fix
2. **Code Style**: Follow the established code style guidelines
3. **Testing**: Write tests for new features and ensure all tests pass
4. **Documentation**: Update documentation for API changes
5. **Pull Requests**: Submit pull requests for code review
6. **CI/CD**: Automated tests run on pull requests

## Testing

### Backend Testing

Backend tests use Python's unittest framework:

```python
# Example of test_api.py
import unittest
import json
from src.main import app

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
    
    def test_home_endpoint(self):
        response = self.app.get('/')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Lexova API is running')
    
    def test_register_endpoint(self):
        response = self.app.post('/api/auth/register',
                               data=json.dumps({
                                   'name': 'Test User',
                                   'email': 'test@example.com',
                                   'password': 'Password123!',
                                   'role': 'client'
                               }),
                               content_type='application/json')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 201)
        self.assertIn('message', data)
        self.assertIn('user_id', data)

# More tests...
```

### Frontend Testing

Frontend tests use React Testing Library:

```javascript
// Example of App.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders landing page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const headingElement = screen.getByText(/AI-Powered Legal Services/i);
  expect(headingElement).toBeInTheDocument();
});

// More tests...
```

### Running Tests

```bash
# Backend tests
cd backend/lexova_backend
python -m unittest discover

# Frontend tests
cd frontend/lexova_frontend
npm test
```

## Conclusion

This technical documentation provides a comprehensive overview of the Lexova platform architecture, implementation details, and development guidelines. For specific questions or issues, please refer to the relevant sections or contact the development team.

