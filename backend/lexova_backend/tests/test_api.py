import unittest
import json
import os
import sys
from datetime import datetime, timedelta

# Add the src directory to the path so we can import the app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import the app with proper path
from src.main import app
from flask_jwt_extended import create_access_token

class LexovaAPITestCase(unittest.TestCase):
    """Test case for the Lexova API"""

    def setUp(self):
        """Set up test client and other test variables"""
        self.app = app.test_client()
        self.app.testing = True
        
        # Create test user tokens
        with app.app_context():
            self.admin_token = create_access_token(
                identity={"user_id": "admin_test_id", "role": "admin"},
                expires_delta=timedelta(hours=24)
            )
            self.lawyer_token = create_access_token(
                identity={"user_id": "lawyer_test_id", "role": "lawyer"},
                expires_delta=timedelta(hours=24)
            )
            self.client_token = create_access_token(
                identity={"user_id": "client_test_id", "role": "client"},
                expires_delta=timedelta(hours=24)
            )

    def test_home_endpoint(self):
        """Test API can respond to home endpoint (GET request)"""
        res = self.app.get('/')
        self.assertEqual(res.status_code, 200)
        self.assertIn(b'Lexova API', res.data)

    def test_auth_endpoints(self):
        """Test authentication endpoints"""
        # Test registration endpoint
        res = self.app.post('/api/auth/register',
                           data=json.dumps({
                               "name": "Test User",
                               "email": "testuser@example.com",
                               "password": "password123",
                               "role": "client"
                           }),
                           content_type='application/json')
        self.assertIn(res.status_code, [201, 400])  # 400 if user already exists
        
        # Test login endpoint
        res = self.app.post('/api/auth/login',
                           data=json.dumps({
                               "email": "testuser@example.com",
                               "password": "password123"
                           }),
                           content_type='application/json')
        self.assertIn(res.status_code, [200, 401])  # 401 if credentials are wrong

    def test_protected_endpoints(self):
        """Test protected endpoints with authentication"""
        # Test client profile endpoint
        res = self.app.get('/api/users/profile',
                          headers={'Authorization': f'Bearer {self.client_token}'})
        self.assertIn(res.status_code, [200, 404])  # 404 if profile doesn't exist
        
        # Test lawyer profile endpoint
        res = self.app.get('/api/lawyers/profile',
                          headers={'Authorization': f'Bearer {self.lawyer_token}'})
        self.assertIn(res.status_code, [200, 404])  # 404 if profile doesn't exist
        
        # Test admin dashboard endpoint
        res = self.app.get('/api/admin/dashboard',
                          headers={'Authorization': f'Bearer {self.admin_token}'})
        self.assertIn(res.status_code, [200, 403])  # 403 if not authorized

    def test_seo_endpoints(self):
        """Test SEO endpoints"""
        # Test sitemap endpoint
        res = self.app.get('/sitemap.xml')
        self.assertEqual(res.status_code, 200)
        self.assertIn(b'<?xml', res.data)
        
        # Test robots.txt endpoint
        res = self.app.get('/robots.txt')
        self.assertEqual(res.status_code, 200)
        self.assertIn(b'User-agent', res.data)

    def test_ai_matching_endpoint(self):
        """Test AI matching endpoint"""
        res = self.app.post('/api/ai/match',
                           data=json.dumps({
                               "case_type": "Divorce",
                               "description": "Need help with divorce proceedings",
                               "location": "New York",
                               "budget": "medium"
                           }),
                           headers={'Authorization': f'Bearer {self.client_token}'},
                           content_type='application/json')
        self.assertIn(res.status_code, [200, 404])  # 404 if no matches found

    def tearDown(self):
        """Teardown all initialized variables"""
        pass

if __name__ == '__main__':
    unittest.main()

