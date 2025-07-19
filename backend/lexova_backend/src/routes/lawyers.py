from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from bson import ObjectId
from datetime import datetime

lawyers_bp = Blueprint('lawyers', __name__)

@lawyers_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get lawyer profile"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'lawyer':
            return jsonify({'error': 'Access denied'}), 403
        
        lawyer = current_app.mongo.db.lawyers.find_one({'_id': ObjectId(user_id)})
        
        if not lawyer:
            return jsonify({'error': 'Lawyer not found'}), 404
        
        # Remove sensitive information
        lawyer.pop('password_hash', None)
        lawyer['_id'] = str(lawyer['_id'])
        
        return jsonify({'lawyer': lawyer}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@lawyers_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update lawyer profile"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'lawyer':
            return jsonify({'error': 'Access denied'}), 403
        
        data = request.get_json()
        
        # Prepare update data
        update_data = {
            'updated_at': datetime.utcnow()
        }
        
        # Update profile fields
        if 'profile' in data:
            profile_updates = {}
            allowed_fields = ['first_name', 'last_name', 'phone', 'law_firm', 'bar_number', 
                            'specializations', 'experience_years', 'education', 'certifications', 
                            'bio', 'profile_photo', 'address']
            
            for field in allowed_fields:
                if field in data['profile']:
                    profile_updates[f'profile.{field}'] = data['profile'][field]
            
            update_data.update(profile_updates)
        
        # Update pricing
        if 'pricing' in data:
            pricing_updates = {}
            allowed_fields = ['hourly_rate', 'consultation_fee', 'payment_methods']
            
            for field in allowed_fields:
                if field in data['pricing']:
                    pricing_updates[f'pricing.{field}'] = data['pricing'][field]
            
            update_data.update(pricing_updates)
        
        # Update availability
        if 'availability' in data:
            availability_updates = {}
            allowed_fields = ['schedule', 'timezone', 'booking_advance_days']
            
            for field in allowed_fields:
                if field in data['availability']:
                    availability_updates[f'availability.{field}'] = data['availability'][field]
            
            update_data.update(availability_updates)
        
        # Update lawyer
        result = current_app.mongo.db.lawyers.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Lawyer not found'}), 404
        
        return jsonify({'message': 'Profile updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@lawyers_bp.route('/cases', methods=['GET'])
@jwt_required()
def get_lawyer_cases():
    """Get lawyer's cases"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'lawyer':
            return jsonify({'error': 'Access denied'}), 403
        
        # Get query parameters
        status = request.args.get('status')
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        skip = (page - 1) * limit
        
        # Build query
        query = {'lawyer_id': ObjectId(user_id)}
        if status:
            query['status'] = status
        
        # Get cases
        cases = list(current_app.mongo.db.cases.find(query)
                    .sort('created_at', -1)
                    .skip(skip)
                    .limit(limit))
        
        # Convert ObjectIds to strings and add client details
        for case in cases:
            case['_id'] = str(case['_id'])
            case['client_id'] = str(case['client_id'])
            case['lawyer_id'] = str(case['lawyer_id'])
            
            # Get client details
            client = current_app.mongo.db.users.find_one(
                {'_id': ObjectId(case['client_id'])},
                {'password_hash': 0, 'verification': 0}
            )
            if client:
                client['_id'] = str(client['_id'])
                case['client_details'] = client
        
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

@lawyers_bp.route('/cases/<case_id>/accept', methods=['PUT'])
@jwt_required()
def accept_case():
    """Accept a case"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        case_id = request.view_args['case_id']
        
        if claims.get('role') != 'lawyer':
            return jsonify({'error': 'Access denied'}), 403
        
        # Check if case exists and is available
        case = current_app.mongo.db.cases.find_one({
            '_id': ObjectId(case_id),
            'status': 'pending'
        })
        
        if not case:
            return jsonify({'error': 'Case not found or not available'}), 404
        
        # Update case
        result = current_app.mongo.db.cases.update_one(
            {'_id': ObjectId(case_id)},
            {
                '$set': {
                    'lawyer_id': ObjectId(user_id),
                    'status': 'active',
                    'updated_at': datetime.utcnow()
                },
                '$push': {
                    'timeline': {
                        'event': 'case_accepted',
                        'timestamp': datetime.utcnow(),
                        'description': 'Case accepted by lawyer'
                    }
                }
            }
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Failed to accept case'}), 500
        
        # Create notification for client
        notification = {
            'recipient_id': case['client_id'],
            'recipient_type': 'client',
            'type': 'case_update',
            'title': 'Case Accepted',
            'message': 'Your case has been accepted by a lawyer',
            'data': {'case_id': case_id},
            'is_read': False,
            'created_at': datetime.utcnow()
        }
        current_app.mongo.db.notifications.insert_one(notification)
        
        return jsonify({'message': 'Case accepted successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@lawyers_bp.route('/cases/<case_id>/decline', methods=['PUT'])
@jwt_required()
def decline_case():
    """Decline a case"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        case_id = request.view_args['case_id']
        
        if claims.get('role') != 'lawyer':
            return jsonify({'error': 'Access denied'}), 403
        
        data = request.get_json()
        reason = data.get('reason', 'No reason provided')
        
        # Check if case exists
        case = current_app.mongo.db.cases.find_one({'_id': ObjectId(case_id)})
        
        if not case:
            return jsonify({'error': 'Case not found'}), 404
        
        # Add timeline entry
        current_app.mongo.db.cases.update_one(
            {'_id': ObjectId(case_id)},
            {
                '$push': {
                    'timeline': {
                        'event': 'case_declined',
                        'timestamp': datetime.utcnow(),
                        'description': f'Case declined by lawyer: {reason}'
                    }
                }
            }
        )
        
        return jsonify({'message': 'Case declined'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@lawyers_bp.route('/availability', methods=['GET'])
@jwt_required()
def get_availability():
    """Get lawyer availability"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'lawyer':
            return jsonify({'error': 'Access denied'}), 403
        
        lawyer = current_app.mongo.db.lawyers.find_one(
            {'_id': ObjectId(user_id)},
            {'availability': 1}
        )
        
        if not lawyer:
            return jsonify({'error': 'Lawyer not found'}), 404
        
        return jsonify({'availability': lawyer.get('availability', {})}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@lawyers_bp.route('/availability', methods=['PUT'])
@jwt_required()
def update_availability():
    """Update lawyer availability"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'lawyer':
            return jsonify({'error': 'Access denied'}), 403
        
        data = request.get_json()
        
        # Update availability
        result = current_app.mongo.db.lawyers.update_one(
            {'_id': ObjectId(user_id)},
            {
                '$set': {
                    'availability': data,
                    'updated_at': datetime.utcnow()
                }
            }
        )
        
        if result.matched_count == 0:
            return jsonify({'error': 'Lawyer not found'}), 404
        
        return jsonify({'message': 'Availability updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@lawyers_bp.route('/reviews', methods=['GET'])
@jwt_required()
def get_reviews():
    """Get lawyer reviews"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'lawyer':
            return jsonify({'error': 'Access denied'}), 403
        
        # Get query parameters
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        skip = (page - 1) * limit
        
        # Get reviews
        reviews = list(current_app.mongo.db.reviews.find({
            'lawyer_id': ObjectId(user_id)
        }).sort('created_at', -1).skip(skip).limit(limit))
        
        # Convert ObjectIds to strings and add client details
        for review in reviews:
            review['_id'] = str(review['_id'])
            review['case_id'] = str(review['case_id'])
            review['client_id'] = str(review['client_id'])
            review['lawyer_id'] = str(review['lawyer_id'])
            
            # Get client details
            client = current_app.mongo.db.users.find_one(
                {'_id': ObjectId(review['client_id'])},
                {'profile.first_name': 1, 'profile.last_name': 1}
            )
            if client:
                review['client_name'] = f"{client['profile']['first_name']} {client['profile']['last_name']}"
        
        # Get total count
        total = current_app.mongo.db.reviews.count_documents({
            'lawyer_id': ObjectId(user_id)
        })
        
        return jsonify({
            'reviews': reviews,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total,
                'pages': (total + limit - 1) // limit
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Export the blueprint
lawyers_blueprint = lawyers_bp

