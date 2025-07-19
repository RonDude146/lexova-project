from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from bson import ObjectId
from datetime import datetime
import openai
import os

cases_bp = Blueprint('cases', __name__)

@cases_bp.route('/', methods=['POST'])
@jwt_required()
def create_case():
    """Create a new case"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'client':
            return jsonify({'error': 'Only clients can create cases'}), 403
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'description', 'category']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create case document
        case_doc = {
            'client_id': ObjectId(user_id),
            'lawyer_id': None,
            'case_details': {
                'title': data['title'],
                'description': data['description'],
                'category': data['category'],
                'urgency': data.get('urgency', 'medium'),
                'budget_range': {
                    'min': data.get('budget_min', 0.0),
                    'max': data.get('budget_max', 0.0)
                },
                'location': {
                    'city': data.get('city', ''),
                    'state': data.get('state', ''),
                    'country': data.get('country', 'USA')
                },
                'preferred_language': data.get('preferred_language', 'English')
            },
            'ai_analysis': {
                'case_type': '',
                'complexity_score': 0.0,
                'recommended_specializations': [],
                'estimated_duration': '',
                'suggested_lawyers': []
            },
            'status': 'pending',
            'timeline': [
                {
                    'event': 'case_created',
                    'timestamp': datetime.utcnow(),
                    'description': 'Case submitted by client'
                }
            ],
            'documents': [],
            'communications': [],
            'payment': {
                'total_amount': 0.0,
                'paid_amount': 0.0,
                'payment_status': 'pending',
                'payment_method': '',
                'transactions': []
            },
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        # Insert case
        result = current_app.mongo.db.cases.insert_one(case_doc)
        
        # Perform AI analysis
        try:
            ai_analysis = analyze_case_with_ai(data)
            current_app.mongo.db.cases.update_one(
                {'_id': result.inserted_id},
                {'$set': {'ai_analysis': ai_analysis}}
            )
        except Exception as ai_error:
            print(f"AI analysis failed: {ai_error}")
        
        return jsonify({
            'message': 'Case created successfully',
            'case_id': str(result.inserted_id)
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@cases_bp.route('/<case_id>', methods=['GET'])
@jwt_required()
def get_case():
    """Get case details"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        case_id = request.view_args['case_id']
        
        # Build query based on user role
        if claims.get('role') == 'client':
            query = {'_id': ObjectId(case_id), 'client_id': ObjectId(user_id)}
        elif claims.get('role') == 'lawyer':
            query = {'_id': ObjectId(case_id), 'lawyer_id': ObjectId(user_id)}
        elif claims.get('role') == 'admin':
            query = {'_id': ObjectId(case_id)}
        else:
            return jsonify({'error': 'Access denied'}), 403
        
        case = current_app.mongo.db.cases.find_one(query)
        
        if not case:
            return jsonify({'error': 'Case not found'}), 404
        
        # Convert ObjectIds to strings
        case['_id'] = str(case['_id'])
        case['client_id'] = str(case['client_id'])
        if case.get('lawyer_id'):
            case['lawyer_id'] = str(case['lawyer_id'])
        
        return jsonify({'case': case}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@cases_bp.route('/<case_id>', methods=['PUT'])
@jwt_required()
def update_case():
    """Update case details"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        case_id = request.view_args['case_id']
        
        data = request.get_json()
        
        # Check permissions
        if claims.get('role') == 'client':
            query = {'_id': ObjectId(case_id), 'client_id': ObjectId(user_id)}
        elif claims.get('role') == 'lawyer':
            query = {'_id': ObjectId(case_id), 'lawyer_id': ObjectId(user_id)}
        elif claims.get('role') == 'admin':
            query = {'_id': ObjectId(case_id)}
        else:
            return jsonify({'error': 'Access denied'}), 403
        
        case = current_app.mongo.db.cases.find_one(query)
        
        if not case:
            return jsonify({'error': 'Case not found'}), 404
        
        # Prepare update data
        update_data = {
            'updated_at': datetime.utcnow()
        }
        
        # Update case details
        if 'case_details' in data:
            for field, value in data['case_details'].items():
                update_data[f'case_details.{field}'] = value
        
        # Update status (only lawyers and admins can change status)
        if 'status' in data and claims.get('role') in ['lawyer', 'admin']:
            update_data['status'] = data['status']
            
            # Add timeline entry
            timeline_entry = {
                'event': 'status_changed',
                'timestamp': datetime.utcnow(),
                'description': f'Status changed to {data["status"]}'
            }
            update_data['$push'] = {'timeline': timeline_entry}
        
        # Update case
        current_app.mongo.db.cases.update_one(
            {'_id': ObjectId(case_id)},
            {'$set': update_data} if '$push' not in update_data else {
                '$set': {k: v for k, v in update_data.items() if k != '$push'},
                '$push': update_data['$push']
            }
        )
        
        return jsonify({'message': 'Case updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@cases_bp.route('/search', methods=['GET'])
@jwt_required()
def search_cases():
    """Search cases (for lawyers and admins)"""
    try:
        claims = get_jwt()
        
        if claims.get('role') not in ['lawyer', 'admin']:
            return jsonify({'error': 'Access denied'}), 403
        
        # Get query parameters
        category = request.args.get('category')
        location = request.args.get('location')
        urgency = request.args.get('urgency')
        status = request.args.get('status', 'pending')
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        skip = (page - 1) * limit
        
        # Build query
        query = {'status': status}
        
        if category:
            query['case_details.category'] = category
        
        if location:
            query['$or'] = [
                {'case_details.location.city': {'$regex': location, '$options': 'i'}},
                {'case_details.location.state': {'$regex': location, '$options': 'i'}}
            ]
        
        if urgency:
            query['case_details.urgency'] = urgency
        
        # For lawyers, only show unassigned cases
        if claims.get('role') == 'lawyer':
            query['lawyer_id'] = None
        
        # Get cases
        cases = list(current_app.mongo.db.cases.find(query)
                    .sort('created_at', -1)
                    .skip(skip)
                    .limit(limit))
        
        # Convert ObjectIds to strings and add client details
        for case in cases:
            case['_id'] = str(case['_id'])
            case['client_id'] = str(case['client_id'])
            if case.get('lawyer_id'):
                case['lawyer_id'] = str(case['lawyer_id'])
            
            # Get client details (limited info for privacy)
            client = current_app.mongo.db.users.find_one(
                {'_id': ObjectId(case['client_id'])},
                {'profile.first_name': 1, 'profile.last_name': 1, 'profile.address.city': 1, 'profile.address.state': 1}
            )
            if client:
                case['client_info'] = {
                    'name': f"{client['profile']['first_name']} {client['profile']['last_name']}",
                    'location': f"{client['profile'].get('address', {}).get('city', '')}, {client['profile'].get('address', {}).get('state', '')}"
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

@cases_bp.route('/<case_id>/communications', methods=['POST'])
@jwt_required()
def add_communication():
    """Add communication to case"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        case_id = request.view_args['case_id']
        
        data = request.get_json()
        
        # Validate required fields
        if 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        # Check if user has access to this case
        if claims.get('role') == 'client':
            case = current_app.mongo.db.cases.find_one({
                '_id': ObjectId(case_id),
                'client_id': ObjectId(user_id)
            })
        elif claims.get('role') == 'lawyer':
            case = current_app.mongo.db.cases.find_one({
                '_id': ObjectId(case_id),
                'lawyer_id': ObjectId(user_id)
            })
        elif claims.get('role') == 'admin':
            case = current_app.mongo.db.cases.find_one({'_id': ObjectId(case_id)})
        else:
            return jsonify({'error': 'Access denied'}), 403
        
        if not case:
            return jsonify({'error': 'Case not found'}), 404
        
        # Create communication entry
        communication = {
            'sender_id': ObjectId(user_id),
            'sender_role': claims.get('role'),
            'message': data['message'],
            'timestamp': datetime.utcnow(),
            'type': data.get('type', 'message')  # message, document, update
        }
        
        # Add communication to case
        current_app.mongo.db.cases.update_one(
            {'_id': ObjectId(case_id)},
            {
                '$push': {'communications': communication},
                '$set': {'updated_at': datetime.utcnow()}
            }
        )
        
        return jsonify({'message': 'Communication added successfully'}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def analyze_case_with_ai(case_data):
    """Analyze case using OpenAI API"""
    try:
        client = openai.OpenAI()
        
        prompt = f"""
        Analyze the following legal case and provide insights:
        
        Title: {case_data['title']}
        Description: {case_data['description']}
        Category: {case_data['category']}
        Urgency: {case_data.get('urgency', 'medium')}
        
        Please provide:
        1. Case type classification
        2. Complexity score (0-10)
        3. Recommended legal specializations
        4. Estimated duration
        
        Respond in JSON format with keys: case_type, complexity_score, recommended_specializations, estimated_duration
        """
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a legal AI assistant that analyzes cases and provides structured insights."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )
        
        # Parse the response
        import json
        analysis = json.loads(response.choices[0].message.content)
        
        return {
            'case_type': analysis.get('case_type', ''),
            'complexity_score': float(analysis.get('complexity_score', 0)),
            'recommended_specializations': analysis.get('recommended_specializations', []),
            'estimated_duration': analysis.get('estimated_duration', ''),
            'suggested_lawyers': []  # Will be populated by matching algorithm
        }
        
    except Exception as e:
        print(f"AI analysis error: {e}")
        return {
            'case_type': case_data['category'],
            'complexity_score': 5.0,
            'recommended_specializations': [case_data['category']],
            'estimated_duration': 'To be determined',
            'suggested_lawyers': []
        }


# Export the blueprint
cases_blueprint = cases_bp

