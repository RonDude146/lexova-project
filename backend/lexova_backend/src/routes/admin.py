from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from bson import ObjectId
from datetime import datetime, timedelta
import bcrypt

admin_bp = Blueprint('admin', __name__)

def admin_required(f):
    """Decorator to require admin role"""
    def admin_decorated_function(*args, **kwargs):
        claims = get_jwt()
        if claims.get('role') != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    admin_decorated_function.__name__ = f.__name__
    return admin_decorated_function

@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
@admin_required
def get_dashboard_stats():
    """Get admin dashboard statistics"""
    try:
        # Get date range for statistics
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=30)
        
        # User statistics
        total_users = current_app.mongo.db.users.count_documents({})
        new_users = current_app.mongo.db.users.count_documents({
            'created_at': {'$gte': start_date}
        })
        
        # Lawyer statistics
        total_lawyers = current_app.mongo.db.lawyers.count_documents({})
        pending_lawyers = current_app.mongo.db.lawyers.count_documents({
            'verification.verification_status': 'pending'
        })
        approved_lawyers = current_app.mongo.db.lawyers.count_documents({
            'verification.verification_status': 'approved'
        })
        
        # Case statistics
        total_cases = current_app.mongo.db.cases.count_documents({})
        active_cases = current_app.mongo.db.cases.count_documents({
            'status': 'active'
        })
        pending_cases = current_app.mongo.db.cases.count_documents({
            'status': 'pending'
        })
        completed_cases = current_app.mongo.db.cases.count_documents({
            'status': 'completed'
        })
        
        # Revenue statistics (placeholder)
        total_revenue = 0.0  # Calculate from payment transactions
        monthly_revenue = 0.0  # Calculate from recent transactions
        
        # Recent activity
        recent_cases = list(current_app.mongo.db.cases.find({})
                           .sort('created_at', -1)
                           .limit(5))
        
        recent_registrations = list(current_app.mongo.db.users.find({})
                                   .sort('created_at', -1)
                                   .limit(5))
        
        # Convert ObjectIds to strings
        for case in recent_cases:
            case['_id'] = str(case['_id'])
            case['client_id'] = str(case['client_id'])
            if case.get('lawyer_id'):
                case['lawyer_id'] = str(case['lawyer_id'])
        
        for user in recent_registrations:
            user['_id'] = str(user['_id'])
            user.pop('password_hash', None)
        
        stats = {
            'users': {
                'total': total_users,
                'new_this_month': new_users
            },
            'lawyers': {
                'total': total_lawyers,
                'pending': pending_lawyers,
                'approved': approved_lawyers
            },
            'cases': {
                'total': total_cases,
                'active': active_cases,
                'pending': pending_cases,
                'completed': completed_cases
            },
            'revenue': {
                'total': total_revenue,
                'monthly': monthly_revenue
            },
            'recent_activity': {
                'cases': recent_cases,
                'registrations': recent_registrations
            }
        }
        
        return jsonify({'stats': stats}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
@admin_required
def get_users():
    """Get all users with pagination"""
    try:
        # Get query parameters
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        search = request.args.get('search', '')
        skip = (page - 1) * limit
        
        # Build query
        query = {}
        if search:
            query['$or'] = [
                {'email': {'$regex': search, '$options': 'i'}},
                {'profile.first_name': {'$regex': search, '$options': 'i'}},
                {'profile.last_name': {'$regex': search, '$options': 'i'}}
            ]
        
        # Get users
        users = list(current_app.mongo.db.users.find(query, {'password_hash': 0})
                    .sort('created_at', -1)
                    .skip(skip)
                    .limit(limit))
        
        # Convert ObjectIds to strings
        for user in users:
            user['_id'] = str(user['_id'])
        
        # Get total count
        total = current_app.mongo.db.users.count_documents(query)
        
        return jsonify({
            'users': users,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total,
                'pages': (total + limit - 1) // limit
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/lawyers', methods=['GET'])
@jwt_required()
@admin_required
def get_lawyers():
    """Get all lawyers with pagination"""
    try:
        # Get query parameters
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        search = request.args.get('search', '')
        status = request.args.get('status', '')
        skip = (page - 1) * limit
        
        # Build query
        query = {}
        if search:
            query['$or'] = [
                {'email': {'$regex': search, '$options': 'i'}},
                {'profile.first_name': {'$regex': search, '$options': 'i'}},
                {'profile.last_name': {'$regex': search, '$options': 'i'}},
                {'profile.law_firm': {'$regex': search, '$options': 'i'}}
            ]
        
        if status:
            query['verification.verification_status'] = status
        
        # Get lawyers
        lawyers = list(current_app.mongo.db.lawyers.find(query, {'password_hash': 0})
                      .sort('created_at', -1)
                      .skip(skip)
                      .limit(limit))
        
        # Convert ObjectIds to strings
        for lawyer in lawyers:
            lawyer['_id'] = str(lawyer['_id'])
        
        # Get total count
        total = current_app.mongo.db.lawyers.count_documents(query)
        
        return jsonify({
            'lawyers': lawyers,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total,
                'pages': (total + limit - 1) // limit
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/lawyers/<lawyer_id>/verify', methods=['PUT'])
@jwt_required()
@admin_required
def verify_lawyer():
    """Verify or reject lawyer application"""
    try:
        lawyer_id = request.view_args['lawyer_id']
        data = request.get_json()
        
        # Validate required fields
        if 'status' not in data:
            return jsonify({'error': 'Status is required'}), 400
        
        status = data['status']
        if status not in ['approved', 'rejected']:
            return jsonify({'error': 'Invalid status'}), 400
        
        # Update lawyer verification status
        update_data = {
            'verification.verification_status': status,
            'updated_at': datetime.utcnow()
        }
        
        if status == 'approved':
            update_data.update({
                'verification.bar_verified': True,
                'verification.documents_verified': True
            })
        
        result = current_app.mongo.db.lawyers.update_one(
            {'_id': ObjectId(lawyer_id)},
            {'$set': update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Lawyer not found'}), 404
        
        # Create notification for lawyer
        notification = {
            'recipient_id': ObjectId(lawyer_id),
            'recipient_type': 'lawyer',
            'type': 'verification',
            'title': f'Application {status.title()}',
            'message': f'Your lawyer application has been {status}',
            'data': {'status': status, 'reason': data.get('reason', '')},
            'is_read': False,
            'created_at': datetime.utcnow()
        }
        current_app.mongo.db.notifications.insert_one(notification)
        
        return jsonify({'message': f'Lawyer {status} successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/cases', methods=['GET'])
@jwt_required()
@admin_required
def get_all_cases():
    """Get all cases with pagination"""
    try:
        # Get query parameters
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        status = request.args.get('status', '')
        skip = (page - 1) * limit
        
        # Build query
        query = {}
        if status:
            query['status'] = status
        
        # Get cases
        cases = list(current_app.mongo.db.cases.find(query)
                    .sort('created_at', -1)
                    .skip(skip)
                    .limit(limit))
        
        # Convert ObjectIds to strings and add user details
        for case in cases:
            case['_id'] = str(case['_id'])
            case['client_id'] = str(case['client_id'])
            if case.get('lawyer_id'):
                case['lawyer_id'] = str(case['lawyer_id'])
            
            # Get client details
            client = current_app.mongo.db.users.find_one(
                {'_id': ObjectId(case['client_id'])},
                {'profile.first_name': 1, 'profile.last_name': 1, 'email': 1}
            )
            if client:
                case['client_info'] = {
                    'name': f"{client['profile']['first_name']} {client['profile']['last_name']}",
                    'email': client['email']
                }
            
            # Get lawyer details if assigned
            if case.get('lawyer_id'):
                lawyer = current_app.mongo.db.lawyers.find_one(
                    {'_id': ObjectId(case['lawyer_id'])},
                    {'profile.first_name': 1, 'profile.last_name': 1, 'email': 1}
                )
                if lawyer:
                    case['lawyer_info'] = {
                        'name': f"{lawyer['profile']['first_name']} {lawyer['profile']['last_name']}",
                        'email': lawyer['email']
                    }
        
        # Get total count
        total = current_app.mongo.db.cases.count_documents(query)
        
        return jsonify({
            'cases': cases,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total,
                'pages': (total + limit - 1) // limit
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/content', methods=['GET'])
@jwt_required()
@admin_required
def get_content():
    """Get CMS content"""
    try:
        # Get query parameters
        content_type = request.args.get('type', '')
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        skip = (page - 1) * limit
        
        # Build query
        query = {}
        if content_type:
            query['type'] = content_type
        
        # Get content
        content = list(current_app.mongo.db.content.find(query)
                      .sort('created_at', -1)
                      .skip(skip)
                      .limit(limit))
        
        # Convert ObjectIds to strings
        for item in content:
            item['_id'] = str(item['_id'])
            item['created_by'] = str(item['created_by'])
        
        # Get total count
        total = current_app.mongo.db.content.count_documents(query)
        
        return jsonify({
            'content': content,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total,
                'pages': (total + limit - 1) // limit
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/content', methods=['POST'])
@jwt_required()
@admin_required
def create_content():
    """Create new content"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['type', 'title', 'content']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create content document
        content_doc = {
            'type': data['type'],
            'title': data['title'],
            'content': data['content'],
            'slug': data.get('slug', data['title'].lower().replace(' ', '-')),
            'meta': {
                'description': data.get('description', ''),
                'keywords': data.get('keywords', []),
                'author': data.get('author', '')
            },
            'status': data.get('status', 'draft'),
            'category': data.get('category', ''),
            'tags': data.get('tags', []),
            'created_by': ObjectId(user_id),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow(),
            'published_at': datetime.utcnow() if data.get('status') == 'published' else None
        }
        
        # Insert content
        result = current_app.mongo.db.content.insert_one(content_doc)
        
        return jsonify({
            'message': 'Content created successfully',
            'content_id': str(result.inserted_id)
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/content/<content_id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_content():
    """Update content"""
    try:
        content_id = request.view_args['content_id']
        data = request.get_json()
        
        # Prepare update data
        update_data = {
            'updated_at': datetime.utcnow()
        }
        
        # Update allowed fields
        allowed_fields = ['title', 'content', 'slug', 'status', 'category', 'tags']
        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]
        
        # Update meta fields
        if 'meta' in data:
            for field in ['description', 'keywords', 'author']:
                if field in data['meta']:
                    update_data[f'meta.{field}'] = data['meta'][field]
        
        # Set published_at if status is published
        if data.get('status') == 'published':
            update_data['published_at'] = datetime.utcnow()
        
        # Update content
        result = current_app.mongo.db.content.update_one(
            {'_id': ObjectId(content_id)},
            {'$set': update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Content not found'}), 404
        
        return jsonify({'message': 'Content updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/content/<content_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_content():
    """Delete content"""
    try:
        content_id = request.view_args['content_id']
        
        # Delete content
        result = current_app.mongo.db.content.delete_one({'_id': ObjectId(content_id)})
        
        if result.deleted_count == 0:
            return jsonify({'error': 'Content not found'}), 404
        
        return jsonify({'message': 'Content deleted successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Export the blueprint
admin_blueprint = admin_bp

