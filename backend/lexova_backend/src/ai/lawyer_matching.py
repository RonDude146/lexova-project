"""
AI Lawyer Matching System for Lexova Platform

This module implements the AI-powered lawyer matching system that connects clients with the most
suitable lawyers based on case requirements, lawyer expertise, and other relevant factors.

The matching algorithm uses a combination of:
1. Expertise matching - Finding lawyers with relevant specialization for the case type
2. Experience weighting - Prioritizing lawyers with more experience in similar cases
3. Availability filtering - Ensuring lawyers have capacity to take on new cases
4. Location proximity - Considering geographical proximity when relevant
5. Language matching - Matching client language preferences with lawyer capabilities
6. Rating consideration - Factoring in lawyer ratings and client feedback
7. Case complexity assessment - Matching case complexity with lawyer expertise level
8. Budget alignment - Ensuring lawyer rates align with client budget expectations

The system uses OpenAI's GPT model for natural language understanding of case descriptions
and to extract key case attributes for better matching.
"""

import os
import json
import random
from datetime import datetime
import openai
from typing import List, Dict, Any, Tuple, Optional
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from ..models.database import get_db

# Configure OpenAI API
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Case type categories and their related legal specializations
CASE_TYPES = {
    "family_law": ["Divorce", "Child Custody", "Adoption", "Domestic Violence", "Prenuptial Agreement"],
    "criminal_law": ["DUI Defense", "Drug Offenses", "Assault", "White Collar Crime", "Theft"],
    "personal_injury": ["Car Accident", "Medical Malpractice", "Workplace Injury", "Product Liability", "Slip and Fall"],
    "real_estate": ["Property Purchase", "Landlord-Tenant Disputes", "Foreclosure", "Zoning Issues", "Construction Disputes"],
    "business_law": ["Contract Disputes", "Business Formation", "Intellectual Property", "Employment Issues", "Mergers & Acquisitions"],
    "immigration": ["Visa Application", "Green Card", "Deportation Defense", "Citizenship", "Asylum"],
    "intellectual_property": ["Patent", "Trademark", "Copyright", "Trade Secret", "IP Litigation"],
    "tax_law": ["Tax Disputes", "IRS Audits", "Tax Planning", "International Tax", "State Tax Issues"],
    "employment_law": ["Wrongful Termination", "Discrimination", "Harassment", "Wage Disputes", "Workers' Compensation"],
    "estate_planning": ["Wills", "Trusts", "Probate", "Estate Administration", "Elder Law"]
}

# Urgency levels and their weights in matching
URGENCY_LEVELS = {
    "emergency": 5,  # Needs immediate attention (within 24 hours)
    "urgent": 4,     # Needs attention within 2-3 days
    "standard": 3,   # Standard timeline (within a week)
    "flexible": 2,   # Flexible timeline (within 2 weeks)
    "planning": 1    # Future planning (beyond 2 weeks)
}

# Complexity levels and their descriptions
COMPLEXITY_LEVELS = {
    "simple": "Straightforward case with minimal legal complications",
    "moderate": "Average complexity with some legal nuances",
    "complex": "Complex case with multiple legal issues or parties",
    "highly_complex": "Very complex case with significant legal challenges",
    "specialized": "Requires highly specialized expertise in a niche area"
}

class CaseAnalyzer:
    """
    Analyzes case descriptions using AI to extract key attributes for matching.
    """
    
    def __init__(self):
        self.model = "gpt-4"  # Using GPT-4 for better understanding of legal context
    
    async def analyze_case(self, case_description: str, case_type: str) -> Dict[str, Any]:
        """
        Analyze a case description to extract key attributes for matching.
        
        Args:
            case_description: Client's description of their legal issue
            case_type: The general category of the legal issue
            
        Returns:
            Dictionary containing extracted case attributes
        """
        prompt = f"""
        As a legal AI assistant, analyze the following case description for a {case_type} case.
        Extract key information that would be relevant for matching with an appropriate lawyer.
        
        Case Description:
        {case_description}
        
        Please provide a structured analysis with the following:
        1. Key legal issues identified
        2. Estimated complexity level (simple, moderate, complex, highly_complex, specialized)
        3. Potential specializations needed
        4. Urgency assessment based on the description
        5. Any jurisdictional or location-specific requirements
        6. Any language or cultural considerations
        7. Estimated budget range appropriateness (low, medium, high)
        8. Any specific expertise that would be beneficial
        
        Format your response as a JSON object with these keys.
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a legal analysis AI that extracts structured information from case descriptions."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.2,  # Lower temperature for more consistent, analytical responses
                max_tokens=1000
            )
            
            # Extract and parse the JSON response
            analysis_text = response.choices[0].message.content
            # Find JSON content between triple backticks if present
            if "```json" in analysis_text and "```" in analysis_text.split("```json")[1]:
                json_str = analysis_text.split("```json")[1].split("```")[0].strip()
            elif "{" in analysis_text and "}" in analysis_text:
                # Extract between first { and last }
                start = analysis_text.find("{")
                end = analysis_text.rfind("}") + 1
                json_str = analysis_text[start:end]
            else:
                json_str = analysis_text
                
            analysis = json.loads(json_str)
            
            # Ensure all expected keys are present
            expected_keys = [
                "key_legal_issues", "complexity_level", "potential_specializations", 
                "urgency_assessment", "jurisdictional_requirements", "language_cultural_considerations",
                "budget_range", "specific_expertise"
            ]
            
            for key in expected_keys:
                if key not in analysis:
                    analysis[key] = None
            
            return analysis
            
        except Exception as e:
            print(f"Error analyzing case: {e}")
            # Return a default analysis if AI analysis fails
            return {
                "key_legal_issues": ["Unable to automatically identify issues"],
                "complexity_level": "moderate",  # Default to moderate complexity
                "potential_specializations": [case_type],
                "urgency_assessment": "standard",
                "jurisdictional_requirements": None,
                "language_cultural_considerations": None,
                "budget_range": "medium",
                "specific_expertise": None,
                "error": str(e)
            }
    
    async def generate_questions(self, case_type: str) -> List[Dict[str, Any]]:
        """
        Generate relevant questions to ask the client based on the case type.
        
        Args:
            case_type: The general category of the legal issue
            
        Returns:
            List of question objects with question text and possible answers
        """
        prompt = f"""
        As a legal AI assistant, generate 5 important questions that should be asked to a client 
        seeking legal help for a {case_type} case. These questions will help lawyers better understand 
        the case before taking it on.
        
        For each question, provide:
        1. The question text
        2. The type of question (multiple_choice, text, yes_no, date)
        3. If multiple_choice, provide the possible answers
        4. A brief explanation of why this question is important
        
        Format your response as a JSON array of question objects.
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a legal assistant that creates relevant case intake questions."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=1500
            )
            
            # Extract and parse the JSON response
            questions_text = response.choices[0].message.content
            # Find JSON content between triple backticks if present
            if "```json" in questions_text and "```" in questions_text.split("```json")[1]:
                json_str = questions_text.split("```json")[1].split("```")[0].strip()
            elif "[" in questions_text and "]" in questions_text:
                # Extract between first [ and last ]
                start = questions_text.find("[")
                end = questions_text.rfind("]") + 1
                json_str = questions_text[start:end]
            else:
                json_str = questions_text
                
            questions = json.loads(json_str)
            
            # Validate and format questions
            formatted_questions = []
            for q in questions:
                if "question" in q and "type" in q:
                    formatted_q = {
                        "question": q["question"],
                        "type": q["type"],
                        "explanation": q.get("explanation", "")
                    }
                    
                    if q["type"] == "multiple_choice" and "options" in q:
                        formatted_q["options"] = q["options"]
                    
                    formatted_questions.append(formatted_q)
            
            return formatted_questions
            
        except Exception as e:
            print(f"Error generating questions: {e}")
            # Return default questions if AI generation fails
            default_questions = [
                {
                    "question": f"When did the {case_type} issue first arise?",
                    "type": "date",
                    "explanation": "Helps establish timeline and potential statute of limitations"
                },
                {
                    "question": "Have you consulted with any other lawyers about this matter?",
                    "type": "yes_no",
                    "explanation": "Identifies if other legal opinions have been given"
                },
                {
                    "question": "Please describe your ideal outcome for this case.",
                    "type": "text",
                    "explanation": "Helps understand client expectations and goals"
                },
                {
                    "question": "How urgent is this matter for you?",
                    "type": "multiple_choice",
                    "options": ["Emergency - need immediate help", "Urgent - within days", "Standard - within a week", "Flexible - within weeks", "Planning ahead - not time-sensitive"],
                    "explanation": "Establishes timeline expectations"
                },
                {
                    "question": "What is your budget range for legal services?",
                    "type": "multiple_choice",
                    "options": ["Under $1,000", "$1,000-$5,000", "$5,000-$15,000", "$15,000-$50,000", "Over $50,000", "Prefer not to say"],
                    "explanation": "Helps match with lawyers in appropriate fee range"
                }
            ]
            return default_questions


class LawyerMatcher:
    """
    Matches clients with lawyers based on case requirements and lawyer attributes.
    """
    
    def __init__(self, db_connection=None):
        self.db = db_connection or get_db()
        self.case_analyzer = CaseAnalyzer()
        
    async def find_matching_lawyers(self, case_data: Dict[str, Any], client_id: str) -> List[Dict[str, Any]]:
        """
        Find lawyers that match the given case requirements.
        
        Args:
            case_data: Dictionary containing case details and requirements
            client_id: ID of the client seeking legal help
            
        Returns:
            List of matching lawyers with match scores and reasons
        """
        # Extract key matching criteria from case data
        case_type = case_data.get("case_type")
        case_description = case_data.get("description", "")
        location = case_data.get("location")
        budget = case_data.get("budget")
        urgency = case_data.get("urgency", "standard")
        language_preferences = case_data.get("language_preferences", ["English"])
        
        # Analyze case using AI
        case_analysis = await self.case_analyzer.analyze_case(case_description, case_type)
        
        # Get all active lawyers from database
        lawyers = self._get_available_lawyers()
        
        # Calculate match scores for each lawyer
        matches = []
        for lawyer in lawyers:
            match_score, match_reasons = self._calculate_match_score(
                lawyer, 
                case_type, 
                case_analysis, 
                location, 
                budget, 
                urgency,
                language_preferences
            )
            
            # Only include lawyers with a minimum match score
            if match_score >= 40:  # 40% minimum match threshold
                matches.append({
                    "lawyer": lawyer,
                    "match_score": match_score,
                    "match_reasons": match_reasons,
                    "case_analysis": case_analysis
                })
        
        # Sort by match score (descending)
        matches.sort(key=lambda x: x["match_score"], reverse=True)
        
        # Return top matches (limited to 10)
        return matches[:10]
    
    def _get_available_lawyers(self) -> List[Dict[str, Any]]:
        """
        Get all available lawyers from the database.
        In a real implementation, this would query the database.
        
        Returns:
            List of lawyer objects
        """
        # This is a mock implementation - in production this would query the database
        # Sample data for demonstration
        lawyers = [
            {
                "id": "LW-2024-101",
                "name": "David Wilson",
                "specializations": ["Criminal Defense", "DUI Defense", "Drug Offenses"],
                "experience_years": 12,
                "cases_handled": 450,
                "languages": ["English", "Spanish"],
                "location": "New York, NY",
                "average_rating": 4.8,
                "review_count": 120,
                "hourly_rate": 300,
                "availability": "high",
                "success_rate": 0.85,
                "education": [
                    {"institution": "Harvard Law School", "degree": "Juris Doctor", "year": 2012},
                    {"institution": "University of Pennsylvania", "degree": "Bachelor of Arts, Political Science", "year": 2009}
                ],
                "bar_admissions": ["New York State Bar", "Federal Bar, Southern District of NY"],
                "profile_strength": 95
            },
            {
                "id": "LW-2024-102",
                "name": "Jennifer Davis",
                "specializations": ["Family Law", "Divorce", "Child Custody", "Domestic Violence"],
                "experience_years": 15,
                "cases_handled": 620,
                "languages": ["English"],
                "location": "Chicago, IL",
                "average_rating": 4.9,
                "review_count": 180,
                "hourly_rate": 275,
                "availability": "medium",
                "success_rate": 0.92,
                "education": [
                    {"institution": "University of Chicago Law School", "degree": "Juris Doctor", "year": 2009},
                    {"institution": "Northwestern University", "degree": "Bachelor of Science, Psychology", "year": 2006}
                ],
                "bar_admissions": ["Illinois State Bar"],
                "profile_strength": 98
            },
            {
                "id": "LW-2024-103",
                "name": "Michael Chen",
                "specializations": ["Intellectual Property", "Patent", "Trademark", "Copyright", "Technology Law"],
                "experience_years": 8,
                "cases_handled": 210,
                "languages": ["English", "Mandarin", "Cantonese"],
                "location": "San Francisco, CA",
                "average_rating": 4.7,
                "review_count": 85,
                "hourly_rate": 350,
                "availability": "high",
                "success_rate": 0.88,
                "education": [
                    {"institution": "Stanford Law School", "degree": "Juris Doctor", "year": 2016},
                    {"institution": "MIT", "degree": "Bachelor of Science, Computer Science", "year": 2013}
                ],
                "bar_admissions": ["California State Bar", "U.S. Patent and Trademark Office"],
                "profile_strength": 90
            },
            {
                "id": "LW-2024-104",
                "name": "Sarah Johnson",
                "specializations": ["Corporate Law", "Business Formation", "Mergers & Acquisitions", "Contract Law"],
                "experience_years": 20,
                "cases_handled": 780,
                "languages": ["English", "French"],
                "location": "Boston, MA",
                "average_rating": 4.6,
                "review_count": 210,
                "hourly_rate": 400,
                "availability": "low",
                "success_rate": 0.94,
                "education": [
                    {"institution": "Harvard Law School", "degree": "Juris Doctor", "year": 2004},
                    {"institution": "Boston University", "degree": "Bachelor of Arts, Economics", "year": 2001}
                ],
                "bar_admissions": ["Massachusetts State Bar", "New York State Bar"],
                "profile_strength": 99
            },
            {
                "id": "LW-2024-105",
                "name": "James Rodriguez",
                "specializations": ["Immigration Law", "Visa Applications", "Deportation Defense", "Citizenship"],
                "experience_years": 10,
                "cases_handled": 340,
                "languages": ["English", "Spanish", "Portuguese"],
                "location": "Miami, FL",
                "average_rating": 4.9,
                "review_count": 150,
                "hourly_rate": 250,
                "availability": "high",
                "success_rate": 0.89,
                "education": [
                    {"institution": "University of Miami School of Law", "degree": "Juris Doctor", "year": 2014},
                    {"institution": "Florida International University", "degree": "Bachelor of Arts, Political Science", "year": 2011}
                ],
                "bar_admissions": ["Florida State Bar"],
                "profile_strength": 92
            },
            {
                "id": "LW-2024-106",
                "name": "Emily Wong",
                "specializations": ["Personal Injury", "Car Accidents", "Medical Malpractice", "Workplace Injuries"],
                "experience_years": 12,
                "cases_handled": 390,
                "languages": ["English", "Mandarin"],
                "location": "Los Angeles, CA",
                "average_rating": 4.8,
                "review_count": 170,
                "hourly_rate": 325,
                "availability": "medium",
                "success_rate": 0.91,
                "education": [
                    {"institution": "UCLA School of Law", "degree": "Juris Doctor", "year": 2012},
                    {"institution": "UC Berkeley", "degree": "Bachelor of Arts, Sociology", "year": 2009}
                ],
                "bar_admissions": ["California State Bar"],
                "profile_strength": 94
            },
            {
                "id": "LW-2024-107",
                "name": "Robert Taylor",
                "specializations": ["Real Estate Law", "Property Purchases", "Landlord-Tenant Disputes", "Foreclosure"],
                "experience_years": 18,
                "cases_handled": 520,
                "languages": ["English"],
                "location": "Dallas, TX",
                "average_rating": 4.5,
                "review_count": 130,
                "hourly_rate": 290,
                "availability": "medium",
                "success_rate": 0.87,
                "education": [
                    {"institution": "University of Texas School of Law", "degree": "Juris Doctor", "year": 2006},
                    {"institution": "Texas A&M University", "degree": "Bachelor of Business Administration", "year": 2003}
                ],
                "bar_admissions": ["Texas State Bar"],
                "profile_strength": 88
            },
            {
                "id": "LW-2024-108",
                "name": "Lisa Martinez",
                "specializations": ["Employment Law", "Discrimination", "Wrongful Termination", "Harassment", "Wage Disputes"],
                "experience_years": 14,
                "cases_handled": 410,
                "languages": ["English", "Spanish"],
                "location": "Phoenix, AZ",
                "average_rating": 4.7,
                "review_count": 140,
                "hourly_rate": 280,
                "availability": "high",
                "success_rate": 0.86,
                "education": [
                    {"institution": "Arizona State University College of Law", "degree": "Juris Doctor", "year": 2010},
                    {"institution": "University of Arizona", "degree": "Bachelor of Arts, Psychology", "year": 2007}
                ],
                "bar_admissions": ["Arizona State Bar", "California State Bar"],
                "profile_strength": 91
            },
            {
                "id": "LW-2024-109",
                "name": "Daniel Brown",
                "specializations": ["Estate Planning", "Wills", "Trusts", "Probate", "Elder Law"],
                "experience_years": 22,
                "cases_handled": 680,
                "languages": ["English"],
                "location": "Seattle, WA",
                "average_rating": 4.9,
                "review_count": 190,
                "hourly_rate": 310,
                "availability": "medium",
                "success_rate": 0.95,
                "education": [
                    {"institution": "University of Washington School of Law", "degree": "Juris Doctor", "year": 2002},
                    {"institution": "Washington State University", "degree": "Bachelor of Arts, Finance", "year": 1999}
                ],
                "bar_admissions": ["Washington State Bar"],
                "profile_strength": 97
            },
            {
                "id": "LW-2024-110",
                "name": "Rachel Green",
                "specializations": ["Tax Law", "IRS Disputes", "Tax Planning", "International Tax"],
                "experience_years": 16,
                "cases_handled": 380,
                "languages": ["English", "French"],
                "location": "Washington, DC",
                "average_rating": 4.6,
                "review_count": 110,
                "hourly_rate": 370,
                "availability": "low",
                "success_rate": 0.90,
                "education": [
                    {"institution": "Georgetown University Law Center", "degree": "Juris Doctor", "year": 2008},
                    {"institution": "George Washington University", "degree": "Bachelor of Business Administration", "year": 2005},
                    {"institution": "New York University", "degree": "Master of Laws (LL.M.) in Taxation", "year": 2009}
                ],
                "bar_admissions": ["District of Columbia Bar", "Virginia State Bar"],
                "profile_strength": 96
            }
        ]
        
        return lawyers
    
    def _calculate_match_score(
        self, 
        lawyer: Dict[str, Any], 
        case_type: str, 
        case_analysis: Dict[str, Any], 
        location: str, 
        budget: str, 
        urgency: str,
        language_preferences: List[str]
    ) -> Tuple[float, List[str]]:
        """
        Calculate a match score between a lawyer and case requirements.
        
        Args:
            lawyer: Lawyer object with attributes
            case_type: Type of legal case
            case_analysis: AI analysis of the case
            location: Client's location
            budget: Client's budget range
            urgency: Urgency level of the case
            language_preferences: Client's preferred languages
            
        Returns:
            Tuple of (match_score, list_of_match_reasons)
        """
        score = 0
        reasons = []
        
        # 1. Specialization match (highest weight - 30%)
        specialization_score = self._calculate_specialization_match(lawyer["specializations"], case_type, case_analysis)
        score += specialization_score * 0.30
        
        if specialization_score > 80:
            reasons.append(f"Strong specialization match: {lawyer['name']} specializes in {', '.join(lawyer['specializations'][:2])}")
        elif specialization_score > 50:
            reasons.append(f"Good specialization match: {lawyer['name']} has relevant expertise in {case_type}")
        
        # 2. Experience level (20%)
        experience_score = min(100, (lawyer["experience_years"] / 20) * 100)  # Cap at 100%
        score += experience_score * 0.20
        
        if lawyer["experience_years"] > 15:
            reasons.append(f"Highly experienced: {lawyer['experience_years']} years of practice with {lawyer['cases_handled']} cases")
        elif lawyer["experience_years"] > 8:
            reasons.append(f"Experienced: {lawyer['experience_years']} years of legal practice")
        
        # 3. Success rate (15%)
        success_score = lawyer["success_rate"] * 100
        score += success_score * 0.15
        
        if lawyer["success_rate"] > 0.9:
            reasons.append(f"Excellent track record: {int(lawyer['success_rate']*100)}% success rate")
        elif lawyer["success_rate"] > 0.8:
            reasons.append(f"Strong track record: {int(lawyer['success_rate']*100)}% success rate")
        
        # 4. Availability match with urgency (10%)
        availability_score = self._calculate_availability_match(lawyer["availability"], urgency)
        score += availability_score * 0.10
        
        if availability_score > 80 and urgency in ["emergency", "urgent"]:
            reasons.append("High availability for your urgent case")
        elif availability_score > 80:
            reasons.append("Currently has good availability to take on new cases")
        
        # 5. Budget alignment (10%)
        budget_score = self._calculate_budget_match(lawyer["hourly_rate"], budget)
        score += budget_score * 0.10
        
        if budget_score > 80:
            reasons.append("Rate aligns well with your budget")
        
        # 6. Rating and reviews (5%)
        rating_score = (lawyer["average_rating"] / 5) * 100
        review_weight = min(1, lawyer["review_count"] / 100)  # More reviews = more reliable rating
        score += (rating_score * review_weight) * 0.05
        
        if lawyer["average_rating"] > 4.7 and lawyer["review_count"] > 100:
            reasons.append(f"Highly rated: {lawyer['average_rating']}/5 from {lawyer['review_count']} clients")
        
        # 7. Language match (5%)
        language_score = self._calculate_language_match(lawyer["languages"], language_preferences)
        score += language_score * 0.05
        
        if language_score > 90 and len(language_preferences) > 1:
            reasons.append(f"Speaks all your preferred languages: {', '.join(set(lawyer['languages']).intersection(language_preferences))}")
        elif language_score > 0:
            common_languages = set(lawyer["languages"]).intersection(language_preferences)
            if common_languages:
                reasons.append(f"Speaks {', '.join(common_languages)}")
        
        # 8. Location proximity (5%)
        location_score = self._calculate_location_match(lawyer["location"], location)
        score += location_score * 0.05
        
        if location_score > 80:
            reasons.append(f"Located in your area: {lawyer['location']}")
        
        # Round score to nearest integer
        final_score = round(score)
        
        # Limit to top 3 most compelling reasons
        reasons = reasons[:3]
        
        return final_score, reasons
    
    def _calculate_specialization_match(
        self, 
        lawyer_specializations: List[str], 
        case_type: str, 
        case_analysis: Dict[str, Any]
    ) -> float:
        """
        Calculate how well a lawyer's specializations match the case requirements.
        
        Args:
            lawyer_specializations: List of lawyer's specialization areas
            case_type: General type of the case
            case_analysis: AI analysis of the case with additional details
            
        Returns:
            Match score from 0-100
        """
        # Get the category for the case type
        case_category = None
        case_subtypes = []
        
        for category, subtypes in CASE_TYPES.items():
            if case_type.lower() in [s.lower() for s in subtypes]:
                case_category = category
                case_subtypes = subtypes
                break
        
        if not case_category:
            # If case type doesn't match any category, find the closest match
            for category, subtypes in CASE_TYPES.items():
                if case_type.lower() in category.lower().replace('_', ' '):
                    case_category = category
                    case_subtypes = subtypes
                    break
        
        # If still no match, default to a generic match
        if not case_category:
            # Default to 50% match if we can't categorize the case
            return 50
        
        # Check direct matches in specializations
        direct_matches = 0
        related_matches = 0
        
        # Normalize specializations for comparison
        normalized_lawyer_specs = [s.lower() for s in lawyer_specializations]
        normalized_case_subtypes = [s.lower() for s in case_subtypes]
        
        # Check for direct matches
        for spec in normalized_lawyer_specs:
            if spec.lower() == case_type.lower():
                direct_matches += 2  # Exact match with case type
            elif spec.lower() in normalized_case_subtypes:
                direct_matches += 1  # Match with a subtype
        
        # Check for related matches
        if case_analysis and "potential_specializations" in case_analysis:
            potential_specs = case_analysis["potential_specializations"]
            if isinstance(potential_specs, list):
                for spec in normalized_lawyer_specs:
                    for potential in potential_specs:
                        if isinstance(potential, str) and spec.lower() in potential.lower() or potential.lower() in spec.lower():
                            related_matches += 0.5
        
        # Calculate final score
        if direct_matches > 0:
            # Strong direct matches
            score = min(100, direct_matches * 40 + related_matches * 10)
        else:
            # Only related matches or category matches
            category_match = any(cat.lower().replace('_', ' ') in ' '.join(normalized_lawyer_specs) for cat in [case_category])
            base_score = 60 if category_match else 30
            score = min(90, base_score + related_matches * 10)  # Cap at 90% without direct matches
        
        return score
    
    def _calculate_availability_match(self, lawyer_availability: str, case_urgency: str) -> float:
        """
        Calculate how well a lawyer's availability matches the case urgency.
        
        Args:
            lawyer_availability: Lawyer's current availability level
            case_urgency: Urgency level of the case
            
        Returns:
            Match score from 0-100
        """
        # Convert availability to numeric value
        availability_values = {
            "high": 3,
            "medium": 2,
            "low": 1
        }
        
        # Get numeric values
        avail_value = availability_values.get(lawyer_availability.lower(), 2)
        urgency_value = URGENCY_LEVELS.get(case_urgency.lower(), 3)
        
        # Calculate match
        if urgency_value >= 4:  # Emergency or Urgent
            if avail_value == 3:  # High availability
                return 100
            elif avail_value == 2:  # Medium availability
                return 60
            else:  # Low availability
                return 30
        elif urgency_value == 3:  # Standard
            if avail_value >= 2:  # High or Medium availability
                return 100
            else:  # Low availability
                return 70
        else:  # Flexible or Planning
            # Any availability works for non-urgent cases
            return 100
    
    def _calculate_budget_match(self, lawyer_rate: float, client_budget: str) -> float:
        """
        Calculate how well a lawyer's rate matches the client's budget.
        
        Args:
            lawyer_rate: Lawyer's hourly rate
            client_budget: Client's budget range
            
        Returns:
            Match score from 0-100
        """
        # Convert budget string to numeric ranges
        budget_ranges = {
            "low": (0, 200),
            "medium": (200, 350),
            "high": (350, 500),
            "premium": (500, float('inf'))
        }
        
        # Default to medium if not specified
        budget_range = budget_ranges.get(client_budget.lower(), budget_ranges["medium"])
        
        # Calculate match
        if lawyer_rate <= budget_range[0]:
            # Below budget minimum - perfect match
            return 100
        elif lawyer_rate <= budget_range[1]:
            # Within budget range - good match
            position_in_range = (lawyer_rate - budget_range[0]) / (budget_range[1] - budget_range[0])
            return 100 - (position_in_range * 20)  # 100% at min, 80% at max
        elif lawyer_rate <= budget_range[1] * 1.2:
            # Slightly above budget - acceptable match
            overage = (lawyer_rate - budget_range[1]) / budget_range[1]
            return max(40, 80 - (overage * 100))
        else:
            # Significantly above budget - poor match
            return 30
    
    def _calculate_language_match(self, lawyer_languages: List[str], client_languages: List[str]) -> float:
        """
        Calculate language compatibility between lawyer and client.
        
        Args:
            lawyer_languages: Languages spoken by the lawyer
            client_languages: Languages preferred by the client
            
        Returns:
            Match score from 0-100
        """
        if not client_languages:
            # Default to English if not specified
            client_languages = ["English"]
        
        # Normalize language names
        norm_lawyer_langs = [lang.lower() for lang in lawyer_languages]
        norm_client_langs = [lang.lower() for lang in client_languages]
        
        # Find common languages
        common_langs = set(norm_lawyer_langs).intersection(set(norm_client_langs))
        
        if not common_langs:
            # No common languages
            return 0
        
        # Calculate match percentage
        if "english" in common_langs:
            # If English is common, it's at least a functional match
            return max(80, (len(common_langs) / len(client_languages)) * 100)
        else:
            # Non-English matches
            return (len(common_langs) / len(client_languages)) * 100
    
    def _calculate_location_match(self, lawyer_location: str, client_location: str) -> float:
        """
        Calculate location proximity between lawyer and client.
        
        Args:
            lawyer_location: Lawyer's location
            client_location: Client's location
            
        Returns:
            Match score from 0-100
        """
        if not client_location:
            # If client location not specified, location doesn't matter
            return 80
        
        # Extract state/region for comparison
        lawyer_state = lawyer_location.split(',')[-1].strip() if ',' in lawyer_location else lawyer_location
        client_state = client_location.split(',')[-1].strip() if ',' in client_location else client_location
        
        # Extract city for comparison
        lawyer_city = lawyer_location.split(',')[0].strip() if ',' in lawyer_location else ""
        client_city = client_location.split(',')[0].strip() if ',' in client_location else ""
        
        # Calculate match
        if lawyer_city.lower() == client_city.lower():
            # Same city - perfect match
            return 100
        elif lawyer_state.lower() == client_state.lower():
            # Same state - good match
            return 80
        else:
            # Different state - depends on case type
            # For some case types, location matters less
            return 50


class CaseAssistant:
    """
    AI-powered case assistant that provides legal guidance and information.
    """
    
    def __init__(self):
        self.model = "gpt-4"
    
    async def get_case_insights(self, case_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate insights and guidance for a legal case.
        
        Args:
            case_data: Dictionary containing case details
            
        Returns:
            Dictionary with insights, next steps, and resources
        """
        case_type = case_data.get("case_type", "")
        case_description = case_data.get("description", "")
        
        prompt = f"""
        As a legal AI assistant, provide insights and guidance for the following case:
        
        Case Type: {case_type}
        Description: {case_description}
        
        Please provide:
        1. A brief analysis of the key legal issues
        2. Potential approaches to the case
        3. Common challenges in similar cases
        4. Recommended next steps
        5. Relevant legal concepts the client should understand
        6. Potential timeline expectations
        7. Documents the client should prepare
        
        Format your response as a JSON object with these sections.
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a legal assistant AI that provides case insights and guidance."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=1500
            )
            
            # Extract and parse the JSON response
            insights_text = response.choices[0].message.content
            # Find JSON content between triple backticks if present
            if "```json" in insights_text and "```" in insights_text.split("```json")[1]:
                json_str = insights_text.split("```json")[1].split("```")[0].strip()
            elif "{" in insights_text and "}" in insights_text:
                # Extract between first { and last }
                start = insights_text.find("{")
                end = insights_text.rfind("}") + 1
                json_str = insights_text[start:end]
            else:
                json_str = insights_text
                
            insights = json.loads(json_str)
            
            # Add disclaimer
            insights["disclaimer"] = (
                "This AI-generated guidance is for informational purposes only and does not constitute legal advice. "
                "The information provided is based on general legal principles and may not apply to your specific situation. "
                "Always consult with a qualified attorney for advice tailored to your circumstances."
            )
            
            return insights
            
        except Exception as e:
            print(f"Error generating case insights: {e}")
            # Return a default response if AI generation fails
            return {
                "key_legal_issues": ["Unable to automatically analyze issues"],
                "potential_approaches": ["Consult with a qualified attorney for personalized guidance"],
                "common_challenges": ["Case complexity may vary based on specific details"],
                "next_steps": ["Schedule a consultation with a matched lawyer"],
                "relevant_legal_concepts": ["Specific legal principles will be explained by your attorney"],
                "timeline_expectations": ["Timeline varies based on case complexity and jurisdiction"],
                "documents_to_prepare": ["Identification documents", "Any contracts or agreements related to the case", "Timeline of events", "Any correspondence related to the issue"],
                "disclaimer": "This AI-generated guidance is for informational purposes only and does not constitute legal advice. Always consult with a qualified attorney for advice tailored to your circumstances.",
                "error": str(e)
            }
    
    async def answer_legal_question(self, question: str, case_type: str = None) -> str:
        """
        Answer a legal question from a client.
        
        Args:
            question: The legal question asked by the client
            case_type: Optional case type for context
            
        Returns:
            Answer to the legal question with appropriate disclaimers
        """
        context = f" related to {case_type}" if case_type else ""
        
        prompt = f"""
        As a legal AI assistant, answer the following question{context}:
        
        {question}
        
        Provide a helpful, informative response that:
        1. Addresses the question directly
        2. Explains relevant legal concepts in plain language
        3. Mentions if the answer may vary by jurisdiction
        4. Includes appropriate disclaimers about not being legal advice
        5. Suggests when consulting with an attorney would be beneficial
        
        Keep your answer concise but comprehensive.
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a legal assistant AI that provides general legal information with appropriate disclaimers."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=1000
            )
            
            answer = response.choices[0].message.content
            
            # Ensure answer has a disclaimer if not already present
            if "not legal advice" not in answer.lower() and "not constitute legal advice" not in answer.lower():
                disclaimer = (
                    "\n\nPlease note: This information is for educational purposes only and does not constitute legal advice. "
                    "Laws vary by jurisdiction and individual circumstances. Consult with a qualified attorney for advice specific to your situation."
                )
                answer += disclaimer
            
            return answer
            
        except Exception as e:
            print(f"Error answering legal question: {e}")
            # Return a default response if AI generation fails
            return (
                "I apologize, but I'm unable to provide a specific answer to your question at this time. "
                "Legal questions often require consideration of specific jurisdictional laws and individual circumstances. "
                "I recommend discussing this matter with one of our matched attorneys who can provide personalized guidance. "
                "\n\nPlease note: AI responses are for informational purposes only and do not constitute legal advice."
            )


# API endpoints for the AI Lawyer Matching System

def get_case_types():
    """Return all available case types organized by category."""
    return CASE_TYPES

def get_urgency_levels():
    """Return all available urgency levels with descriptions."""
    return URGENCY_LEVELS

def get_complexity_levels():
    """Return all available complexity levels with descriptions."""
    return COMPLEXITY_LEVELS

async def analyze_case(case_data):
    """Analyze a case description to extract key attributes."""
    analyzer = CaseAnalyzer()
    return await analyzer.analyze_case(case_data["description"], case_data["case_type"])

async def generate_case_questions(case_type):
    """Generate relevant questions for a specific case type."""
    analyzer = CaseAnalyzer()
    return await analyzer.generate_questions(case_type)

async def find_matching_lawyers(case_data, client_id):
    """Find lawyers that match the given case requirements."""
    matcher = LawyerMatcher()
    return await matcher.find_matching_lawyers(case_data, client_id)

async def get_case_insights(case_data):
    """Get AI-generated insights for a case."""
    assistant = CaseAssistant()
    return await assistant.get_case_insights(case_data)

async def answer_legal_question(question, case_type=None):
    """Answer a legal question from a client."""
    assistant = CaseAssistant()
    return await assistant.answer_legal_question(question, case_type)

