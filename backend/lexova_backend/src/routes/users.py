from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from bson import ObjectId
from datetime import datetime

users_bp = Blueprint('users', __name__)

@users_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get user profile"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'client':
            return jsonify({'error': 'Access denied'}), 403
        
        user = current_app.mongo.db.users.find_one({'_id': ObjectId(user_id)})
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Remove sensitive information
        user.pop('password_hash', None)
        user['_id'] = str(user['_id'])
        
        return jsonify({'user': user}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'client':
            return jsonify({'error': 'Access denied'}), 403
        
        data = request.get_json()
        
        # Prepare update data
        update_data = {
            'updated_at': datetime.utcnow()
        }
        
        # Update profile fields
        if 'profile' in data:
            profile_updates = {}
            allowed_fields = ['first_name', 'last_name', 'phone', 'address', 'preferences']
            
            for field in allowed_fields:
                if field in data['profile']:
                    profile_updates[f'profile.{field}'] = data['profile'][field]
            
            update_data.update(profile_updates)
        
        # Update user
        result = current_app.mongo.db.users.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({'message': 'Profile updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/cases', methods=['GET'])
@jwt_required()
def get_user_cases():
    """Get user's cases"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'client':
            return jsonify({'error': 'Access denied'}), 403
        
        # Get query parameters
        status = request.args.get('status')
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        skip = (page - 1) * limit
        
        # Build query
        query = {'client_id': ObjectId(user_id)}
        if status:
            query['status'] = status
        
        # Get cases
        cases = list(current_app.mongo.db.cases.find(query)
                    .sort('created_at', -1)
                    .skip(skip)
                    .limit(limit))
        
        # Convert ObjectIds to strings
        for case in cases:
            case['_id'] = str(case['_id'])
            case['client_id'] = str(case['client_id'])
            if case.get('lawyer_id'):
                case['lawyer_id'] = str(case['lawyer_id'])
        
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

@users_bp.route('/cases/<case_id>', methods=['GET'])
@jwt_required()
def get_case_details():
    """Get case details"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        case_id = request.view_args['case_id']
        
        if claims.get('role') != 'client':
            return jsonify({'error': 'Access denied'}), 403
        
        # Get case
        case = current_app.mongo.db.cases.find_one({
            '_id': ObjectId(case_id),
            'client_id': ObjectId(user_id)
        })
        
        if not case:
            return jsonify({'error': 'Case not found'}), 404
        
        # Convert ObjectIds to strings
        case['_id'] = str(case['_id'])
        case['client_id'] = str(case['client_id'])
        if case.get('lawyer_id'):
            case['lawyer_id'] = str(case['lawyer_id'])
            
            # Get lawyer details
            lawyer = current_app.mongo.db.lawyers.find_one(
                {'_id': ObjectId(case['lawyer_id'])},
                {'password_hash': 0}
            )
            if lawyer:
                lawyer['_id'] = str(lawyer['_id'])
                case['lawyer_details'] = lawyer
        
        return jsonify({'case': case}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    """Get user notifications"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'client':
            return jsonify({'error': 'Access denied'}), 403
        
        # Get query parameters
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        skip = (page - 1) * limit
        
        # Get notifications
        notifications = list(current_app.mongo.db.notifications.find({
            'recipient_id': ObjectId(user_id),
            'recipient_type': 'client'
        }).sort('created_at', -1).skip(skip).limit(limit))
        
        # Convert ObjectIds to strings
        for notification in notifications:
            notification['_id'] = str(notification['_id'])
            notification['recipient_id'] = str(notification['recipient_id'])
        
        # Get total count
        total = current_app.mongo.db.notifications.count_documents({
            'recipient_id': ObjectId(user_id),
            'recipient_type': 'client'
        })
        
        return jsonify({
            'notifications': notifications,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total,
                'pages': (total + limit - 1) // limit
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@users_bp.route('/notifications/<notification_id>/read', methods=['PUT'])
@jwt_required()
def mark_notification_read():
    """Mark notification as read"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        notification_id = request.view_args['notification_id']
        
        if claims.get('role') != 'client':
            return jsonify({'error': 'Access denied'}), 403
        
        # Update notification
        result = current_app.mongo.db.notifications.update_one(
            {
                '_id': ObjectId(notification_id),
                'recipient_id': ObjectId(user_id)
            },
            {'$set': {'is_read': True}}
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Notification not found'}), 404
        
        return jsonify({'message': 'Notification marked as read'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500



# Export the blueprint
users_blueprint = users_bp

