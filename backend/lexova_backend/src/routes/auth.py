from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt
from datetime import datetime
from bson import ObjectId

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user (client or lawyer)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'role', 'first_name', 'last_name']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        email = data['email'].lower()
        password = data['password']
        role = data['role']
        
        # Validate role
        if role not in ['client', 'lawyer']:
            return jsonify({'error': 'Invalid role'}), 400
        
        # Check if user already exists
        collection_name = 'users' if role == 'client' else 'lawyers'
        existing_user = current_app.mongo.db[collection_name].find_one({'email': email})
        
        if existing_user:
            return jsonify({'error': 'User already exists'}), 409
        
        # Hash password
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        # Create user document
        user_doc = {
            'email': email,
            'password_hash': password_hash,
            'role': role,
            'profile': {
                'first_name': data['first_name'],
                'last_name': data['last_name'],
                'phone': data.get('phone', ''),
            },
            'verification': {
                'email_verified': False,
                'phone_verified': False,
                'verification_token': ''
            },
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow(),
            'last_login': None,
            'is_active': True
        }
        
        # Add role-specific fields
        if role == 'lawyer':
            user_doc['profile'].update({
                'law_firm': data.get('law_firm', ''),
                'bar_number': data.get('bar_number', ''),
                'specializations': data.get('specializations', []),
                'experience_years': data.get('experience_years', 0),
                'education': data.get('education', []),
                'certifications': data.get('certifications', []),
                'bio': data.get('bio', ''),
                'profile_photo': data.get('profile_photo', ''),
                'address': data.get('address', {})
            })
            user_doc['pricing'] = {
                'hourly_rate': data.get('hourly_rate', 0.0),
                'consultation_fee': data.get('consultation_fee', 0.0),
                'payment_methods': data.get('payment_methods', [])
            }
            user_doc['availability'] = {
                'schedule': data.get('schedule', {}),
                'timezone': data.get('timezone', ''),
                'booking_advance_days': data.get('booking_advance_days', 7)
            }
            user_doc['verification'].update({
                'bar_verified': False,
                'documents_verified': False,
                'verification_status': 'pending'
            })
            user_doc['ratings'] = {
                'average_rating': 0.0,
                'total_reviews': 0,
                'total_cases': 0
            }
        else:
            user_doc['profile']['address'] = data.get('address', {})
            user_doc['profile']['preferences'] = {
                'communication_method': data.get('communication_method', 'email'),
                'notifications': data.get('notifications', True)
            }
        
        # Insert user
        result = current_app.mongo.db[collection_name].insert_one(user_doc)
        
        # Create access token
        access_token = create_access_token(
            identity=str(result.inserted_id),
            additional_claims={'role': role}
        )
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': {
                'id': str(result.inserted_id),
                'email': email,
                'role': role,
                'first_name': data['first_name'],
                'last_name': data['last_name']
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if 'email' not in data or 'password' not in data:
            return jsonify({'error': 'Email and password are required'}), 400
        
        email = data['email'].lower()
        password = data['password']
        
        # Check in all collections (users, lawyers, admins)
        user = None
        collection_name = None
        
        for coll in ['users', 'lawyers', 'admins']:
            user = current_app.mongo.db[coll].find_one({'email': email})
            if user:
                collection_name = coll
                break
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Verify password
        if not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Check if user is active
        if not user.get('is_active', True):
            return jsonify({'error': 'Account is deactivated'}), 401
        
        # Update last login
        current_app.mongo.db[collection_name].update_one(
            {'_id': user['_id']},
            {'$set': {'last_login': datetime.utcnow()}}
        )
        
        # Create access token
        access_token = create_access_token(
            identity=str(user['_id']),
            additional_claims={'role': user['role']}
        )
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': str(user['_id']),
                'email': user['email'],
                'role': user['role'],
                'first_name': user['profile']['first_name'],
                'last_name': user['profile']['last_name']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user information"""
    try:
        user_id = get_jwt_identity()
        
        # Find user in appropriate collection
        user = None
        for coll in ['users', 'lawyers', 'admins']:
            user = current_app.mongo.db[coll].find_one({'_id': ObjectId(user_id)})
            if user:
                break
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Remove sensitive information
        user.pop('password_hash', None)
        user['_id'] = str(user['_id'])
        
        return jsonify({'user': user}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required()
def refresh_token():
    """Refresh access token"""
    try:
        current_user_id = get_jwt_identity()
        
        # Find user to get role
        user = None
        for coll in ['users', 'lawyers', 'admins']:
            user = current_app.mongo.db[coll].find_one({'_id': ObjectId(current_user_id)})
            if user:
                break
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Create new access token
        access_token = create_access_token(
            identity=current_user_id,
            additional_claims={'role': user['role']}
        )
        
        return jsonify({'access_token': access_token}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Export the blueprint
auth_blueprint = auth_bp

