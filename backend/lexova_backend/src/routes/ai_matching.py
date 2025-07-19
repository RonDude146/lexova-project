from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from bson import ObjectId
from datetime import datetime
import openai
import json

ai_matching_bp = Blueprint('ai_matching', __name__)

@ai_matching_bp.route('/analyze-case', methods=['POST'])
@jwt_required()
def analyze_case():
    """Analyze case and suggest lawyers using AI"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'client':
            return jsonify({'error': 'Only clients can use AI matching'}), 403
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['case_description', 'case_type', 'location', 'budget_range']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Perform AI analysis
        ai_analysis = perform_ai_case_analysis(data)
        
        # Find matching lawyers
        matching_lawyers = find_matching_lawyers(ai_analysis, data)
        
        # Rank lawyers using AI
        ranked_lawyers = rank_lawyers_with_ai(matching_lawyers, ai_analysis, data)
        
        return jsonify({
            'ai_analysis': ai_analysis,
            'suggested_lawyers': ranked_lawyers[:5],  # Top 5 lawyers
            'total_matches': len(matching_lawyers)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_matching_bp.route('/chat', methods=['POST'])
@jwt_required()
def ai_chat():
    """AI chat assistant for case consultation"""
    try:
        user_id = get_jwt_identity()
        claims = get_jwt()
        
        if claims.get('role') != 'client':
            return jsonify({'error': 'Only clients can use AI chat'}), 403
        
        data = request.get_json()
        
        if 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        # Get conversation history
        conversation_history = data.get('conversation_history', [])
        
        # Generate AI response
        ai_response = generate_ai_chat_response(data['message'], conversation_history)
        
        return jsonify({
            'response': ai_response,
            'timestamp': datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_matching_bp.route('/questions', methods=['GET'])
@jwt_required()
def get_case_questions():
    """Get AI-generated questions for case analysis"""
    try:
        claims = get_jwt()
        
        if claims.get('role') != 'client':
            return jsonify({'error': 'Only clients can access case questions'}), 403
        
        # Get case type from query parameters
        case_type = request.args.get('case_type', 'general')
        
        # Generate relevant questions based on case type
        questions = generate_case_questions(case_type)
        
        return jsonify({'questions': questions}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def perform_ai_case_analysis(case_data):
    """Perform AI analysis of the case"""
    try:
        client = openai.OpenAI()
        
        prompt = f"""
        Analyze this legal case and provide detailed insights:
        
        Case Description: {case_data['case_description']}
        Case Type: {case_data['case_type']}
        Location: {case_data['location']}
        Budget Range: ${case_data['budget_range']['min']} - ${case_data['budget_range']['max']}
        Urgency: {case_data.get('urgency', 'medium')}
        
        Please provide a comprehensive analysis including:
        1. Case complexity score (1-10)
        2. Required legal specializations
        3. Estimated case duration
        4. Key legal issues
        5. Recommended lawyer experience level
        6. Important case factors
        
        Respond in JSON format with keys: complexity_score, specializations, duration, legal_issues, experience_level, factors
        """
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert legal AI assistant that analyzes cases and provides structured insights for lawyer matching."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )
        
        analysis = json.loads(response.choices[0].message.content)
        
        return {
            'complexity_score': float(analysis.get('complexity_score', 5.0)),
            'specializations': analysis.get('specializations', [case_data['case_type']]),
            'duration': analysis.get('duration', '3-6 months'),
            'legal_issues': analysis.get('legal_issues', []),
            'experience_level': analysis.get('experience_level', 'intermediate'),
            'factors': analysis.get('factors', [])
        }
        
    except Exception as e:
        print(f"AI analysis error: {e}")
        return {
            'complexity_score': 5.0,
            'specializations': [case_data['case_type']],
            'duration': '3-6 months',
            'legal_issues': ['General legal matter'],
            'experience_level': 'intermediate',
            'factors': ['Standard case factors']
        }

def find_matching_lawyers(ai_analysis, case_data):
    """Find lawyers matching the case requirements"""
    try:
        # Build query for matching lawyers
        query = {
            'verification.verification_status': 'approved',
            'is_active': True
        }
        
        # Match specializations
        if ai_analysis['specializations']:
            query['profile.specializations'] = {
                '$in': ai_analysis['specializations']
            }
        
        # Location matching (same state)
        if case_data.get('location'):
            location_parts = case_data['location'].split(',')
            if len(location_parts) >= 2:
                state = location_parts[-1].strip()
                query['profile.address.state'] = state
        
        # Get matching lawyers
        lawyers = list(current_app.mongo.db.lawyers.find(
            query,
            {'password_hash': 0}
        ))
        
        # Filter by budget if specified
        budget_max = case_data.get('budget_range', {}).get('max', float('inf'))
        if budget_max < float('inf'):
            lawyers = [
                lawyer for lawyer in lawyers
                if lawyer.get('pricing', {}).get('hourly_rate', 0) <= budget_max / 10  # Rough estimate
            ]
        
        # Convert ObjectIds to strings
        for lawyer in lawyers:
            lawyer['_id'] = str(lawyer['_id'])
        
        return lawyers
        
    except Exception as e:
        print(f"Lawyer matching error: {e}")
        return []

def rank_lawyers_with_ai(lawyers, ai_analysis, case_data):
    """Rank lawyers using AI based on case requirements"""
    try:
        if not lawyers:
            return []
        
        client = openai.OpenAI()
        
        # Prepare lawyer data for AI ranking
        lawyer_summaries = []
        for lawyer in lawyers:
            summary = {
                'id': lawyer['_id'],
                'name': f"{lawyer['profile']['first_name']} {lawyer['profile']['last_name']}",
                'specializations': lawyer['profile']['specializations'],
                'experience_years': lawyer['profile']['experience_years'],
                'rating': lawyer['ratings']['average_rating'],
                'total_cases': lawyer['ratings']['total_cases'],
                'hourly_rate': lawyer['pricing']['hourly_rate'],
                'location': f"{lawyer['profile']['address']['city']}, {lawyer['profile']['address']['state']}"
            }
            lawyer_summaries.append(summary)
        
        prompt = f"""
        Rank these lawyers for the following case based on relevance and suitability:
        
        Case Analysis:
        - Complexity: {ai_analysis['complexity_score']}/10
        - Specializations needed: {', '.join(ai_analysis['specializations'])}
        - Experience level: {ai_analysis['experience_level']}
        - Duration: {ai_analysis['duration']}
        
        Case Requirements:
        - Type: {case_data['case_type']}
        - Location: {case_data['location']}
        - Budget: ${case_data['budget_range']['min']} - ${case_data['budget_range']['max']}
        
        Lawyers to rank:
        {json.dumps(lawyer_summaries, indent=2)}
        
        Please rank these lawyers from best to worst match and provide a match score (0-100) for each.
        Consider: specialization match, experience level, location proximity, rating, and budget fit.
        
        Respond in JSON format with an array of objects containing: id, match_score, reasoning
        """
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert legal matching AI that ranks lawyers based on case requirements."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )
        
        rankings = json.loads(response.choices[0].message.content)
        
        # Merge rankings with lawyer data
        ranked_lawyers = []
        for ranking in rankings:
            lawyer = next((l for l in lawyers if l['_id'] == ranking['id']), None)
            if lawyer:
                lawyer['match_score'] = ranking['match_score']
                lawyer['match_reasoning'] = ranking['reasoning']
                ranked_lawyers.append(lawyer)
        
        # Sort by match score
        ranked_lawyers.sort(key=lambda x: x.get('match_score', 0), reverse=True)
        
        return ranked_lawyers
        
    except Exception as e:
        print(f"AI ranking error: {e}")
        # Fallback to simple ranking by rating and experience
        return sorted(lawyers, key=lambda x: (
            x['ratings']['average_rating'],
            x['profile']['experience_years']
        ), reverse=True)

def generate_ai_chat_response(message, conversation_history):
    """Generate AI chat response for case consultation"""
    try:
        client = openai.OpenAI()
        
        # Build conversation context
        messages = [
            {
                "role": "system",
                "content": "You are Lexova's AI legal assistant. Help clients understand their legal needs and guide them through the case submission process. Be helpful, professional, and informative, but always remind users that you provide general information, not legal advice."
            }
        ]
        
        # Add conversation history
        for msg in conversation_history[-10:]:  # Last 10 messages
            messages.append({
                "role": msg.get('role', 'user'),
                "content": msg.get('content', '')
            })
        
        # Add current message
        messages.append({
            "role": "user",
            "content": message
        })
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        print(f"AI chat error: {e}")
        return "I apologize, but I'm having trouble processing your request right now. Please try again or contact our support team for assistance."

def generate_case_questions(case_type):
    """Generate relevant questions for case analysis"""
    question_templates = {
        'Criminal Law': [
            "What are the specific charges you're facing?",
            "Have you been arrested or just under investigation?",
            "Do you have any prior criminal history?",
            "What is the timeline of events?",
            "Have you spoken to law enforcement without an attorney present?"
        ],
        'Family Law': [
            "What type of family law matter is this (divorce, custody, support)?",
            "Are there children involved?",
            "What assets need to be divided?",
            "Is this a contested or uncontested matter?",
            "Have you attempted mediation?"
        ],
        'Personal Injury': [
            "How did the injury occur?",
            "What is the extent of your injuries?",
            "Have you received medical treatment?",
            "Was there property damage involved?",
            "Do you have insurance coverage?"
        ],
        'Corporate Law': [
            "What type of business entity do you have or want to form?",
            "What specific legal issue are you facing?",
            "Are there contracts involved?",
            "Is this a dispute with another party?",
            "What is the potential financial impact?"
        ],
        'Real Estate Law': [
            "What type of property is involved?",
            "Are you buying, selling, or having a dispute?",
            "What is the property value?",
            "Are there title issues?",
            "Is there a deadline you need to meet?"
        ]
    }
    
    return question_templates.get(case_type, [
        "Can you describe your legal situation in detail?",
        "What outcome are you hoping to achieve?",
        "What is your timeline for resolving this matter?",
        "Have you consulted with any other attorneys?",
        "What is your budget for legal services?"
    ])


# Export the blueprint
ai_matching_blueprint = ai_matching_bp

