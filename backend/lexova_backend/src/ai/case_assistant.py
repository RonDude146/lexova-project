"""
AI Case Assistant for Lexova Platform

This module implements the AI-powered case assistant that provides legal guidance,
document analysis, and question answering capabilities for legal cases.

The case assistant provides the following features:
1. Case analysis - Analyzing case details to identify key legal issues
2. Document analysis - Extracting and summarizing information from legal documents
3. Question answering - Responding to legal questions with appropriate disclaimers
4. Next steps guidance - Suggesting appropriate actions based on case status
5. Legal research - Finding relevant legal precedents and statutes
6. Document generation - Creating draft legal documents based on case information

The system uses OpenAI's GPT model for natural language understanding and generation,
with appropriate guardrails to ensure ethical and responsible AI use in legal contexts.
"""

import os
import json
import re
from datetime import datetime
import openai
from typing import List, Dict, Any, Optional, Tuple
import numpy as np

# Configure OpenAI API
openai.api_key = os.environ.get("OPENAI_API_KEY")

class CaseAssistant:
    """
    AI-powered case assistant that provides legal guidance and document analysis.
    """
    
    def __init__(self):
        self.model = "gpt-4"  # Using GPT-4 for better legal reasoning capabilities
    
    async def analyze_case(self, case_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze a legal case to identify key issues, strengths, weaknesses, and strategy.
        
        Args:
            case_data: Dictionary containing case details including type, description, and documents
            
        Returns:
            Dictionary with comprehensive case analysis
        """
        case_type = case_data.get("case_type", "")
        case_description = case_data.get("description", "")
        documents = case_data.get("documents", [])
        
        # Combine document text if available
        document_text = ""
        if documents:
            document_text = "\n\nCase Documents:\n"
            for doc in documents:
                doc_title = doc.get("title", "Untitled Document")
                doc_content = doc.get("content", "")
                document_text += f"--- {doc_title} ---\n{doc_content}\n\n"
        
        prompt = f"""
        As a legal AI assistant, provide a comprehensive analysis of the following case:
        
        Case Type: {case_type}
        Description: {case_description}
        {document_text}
        
        Please provide a detailed analysis including:
        1. Summary of key facts
        2. Primary legal issues identified
        3. Potential legal theories and claims
        4. Case strengths
        5. Case weaknesses and challenges
        6. Recommended legal strategy
        7. Potential outcomes and their likelihood
        8. Evidence needed to strengthen the case
        9. Estimated timeline for resolution
        10. Recommended next steps
        
        Format your response as a JSON object with these sections.
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a legal analysis AI that provides comprehensive case assessments."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.2,  # Lower temperature for more analytical, consistent responses
                max_tokens=2000
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
            
            # Add disclaimer
            analysis["disclaimer"] = (
                "This AI-generated analysis is for informational purposes only and does not constitute legal advice. "
                "The analysis is based on the information provided and general legal principles. "
                "It may not account for all relevant facts, jurisdictional differences, or recent legal developments. "
                "Always consult with a qualified attorney for advice tailored to your specific situation."
            )
            
            # Add timestamp
            analysis["timestamp"] = datetime.now().isoformat()
            
            return analysis
            
        except Exception as e:
            print(f"Error analyzing case: {e}")
            # Return a default analysis if AI analysis fails
            return {
                "summary_of_key_facts": ["Unable to automatically extract key facts"],
                "primary_legal_issues": ["Case analysis requires attorney review"],
                "potential_legal_theories": ["Consult with an attorney for legal theories applicable to your case"],
                "case_strengths": ["Case strengths will be determined after attorney consultation"],
                "case_weaknesses": ["Case challenges will be identified after attorney review"],
                "recommended_strategy": ["Strategy will be developed by your attorney after consultation"],
                "potential_outcomes": ["Outcomes vary based on specific case details and jurisdiction"],
                "evidence_needed": ["Your attorney will advise on necessary evidence after reviewing your case"],
                "estimated_timeline": ["Timeline varies based on case complexity and jurisdiction"],
                "recommended_next_steps": ["Schedule a detailed consultation with your matched attorney"],
                "disclaimer": "This is a placeholder analysis due to processing limitations. Please consult with an attorney for a proper case evaluation.",
                "timestamp": datetime.now().isoformat(),
                "error": str(e)
            }
    
    async def analyze_document(self, document: Dict[str, Any], case_type: Optional[str] = None) -> Dict[str, Any]:
        """
        Analyze a legal document to extract key information and insights.
        
        Args:
            document: Dictionary containing document title and content
            case_type: Optional case type for context
            
        Returns:
            Dictionary with document analysis
        """
        doc_title = document.get("title", "Untitled Document")
        doc_content = document.get("content", "")
        
        context = f" in the context of a {case_type} case" if case_type else ""
        
        prompt = f"""
        As a legal AI assistant, analyze the following document{context}:
        
        Document Title: {doc_title}
        
        Document Content:
        {doc_content}
        
        Please provide a detailed analysis including:
        1. Document type and purpose
        2. Key parties identified
        3. Important dates and deadlines
        4. Critical terms and conditions
        5. Legal obligations established
        6. Potential issues or ambiguities
        7. Missing information or gaps
        8. Implications for the case
        9. Recommended actions related to this document
        
        Format your response as a JSON object with these sections.
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a legal document analysis AI that extracts key information from legal documents."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.2,
                max_tokens=1500
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
            
            # Add disclaimer
            analysis["disclaimer"] = (
                "This AI-generated document analysis is for informational purposes only and does not constitute legal advice. "
                "The analysis may not identify all relevant aspects of the document. "
                "Always consult with a qualified attorney for a comprehensive document review."
            )
            
            # Add timestamp
            analysis["timestamp"] = datetime.now().isoformat()
            
            return analysis
            
        except Exception as e:
            print(f"Error analyzing document: {e}")
            # Return a default analysis if AI analysis fails
            return {
                "document_type": "Unable to automatically determine document type",
                "key_parties": ["Document analysis requires attorney review"],
                "important_dates": ["Dates and deadlines should be verified by an attorney"],
                "critical_terms": ["Terms and conditions require professional review"],
                "legal_obligations": ["Legal obligations should be identified by your attorney"],
                "potential_issues": ["Document should be reviewed by an attorney for potential issues"],
                "missing_information": ["A complete review is needed to identify any gaps"],
                "implications": ["Implications for your case will be determined by your attorney"],
                "recommended_actions": ["Have this document reviewed by your attorney"],
                "disclaimer": "This is a placeholder analysis due to processing limitations. Please consult with an attorney for a proper document evaluation.",
                "timestamp": datetime.now().isoformat(),
                "error": str(e)
            }
    
    async def answer_legal_question(self, question: str, case_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Answer a legal question with appropriate context and disclaimers.
        
        Args:
            question: The legal question asked by the client
            case_data: Optional case data for context
            
        Returns:
            Dictionary with answer and metadata
        """
        # Build context from case data if available
        context = ""
        if case_data:
            case_type = case_data.get("case_type", "")
            case_description = case_data.get("description", "")
            context = f"""
            Question Context:
            - Case Type: {case_type}
            - Case Description: {case_description}
            """
        
        prompt = f"""
        As a legal AI assistant, answer the following question:
        
        {question}
        
        {context}
        
        Provide a helpful, informative response that:
        1. Addresses the question directly
        2. Explains relevant legal concepts in plain language
        3. Mentions if the answer may vary by jurisdiction
        4. Includes appropriate disclaimers about not being legal advice
        5. Suggests when consulting with an attorney would be beneficial
        
        Your answer should be comprehensive but concise.
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
            
            # Extract a concise title from the question
            title_prompt = f"Generate a concise title (5-7 words) for this legal question: {question}"
            title_response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",  # Using a smaller model for this simple task
                messages=[
                    {"role": "system", "content": "You generate concise titles for legal questions."},
                    {"role": "user", "content": title_prompt}
                ],
                temperature=0.3,
                max_tokens=20
            )
            
            title = title_response.choices[0].message.content.strip().strip('"')
            
            # Ensure answer has a disclaimer if not already present
            if "not legal advice" not in answer.lower() and "not constitute legal advice" not in answer.lower():
                disclaimer = (
                    "\n\nPlease note: This information is for educational purposes only and does not constitute legal advice. "
                    "Laws vary by jurisdiction and individual circumstances. Consult with a qualified attorney for advice specific to your situation."
                )
                answer += disclaimer
            
            # Categorize the question
            categories = self._categorize_legal_question(question, case_data.get("case_type", "") if case_data else "")
            
            return {
                "title": title,
                "question": question,
                "answer": answer,
                "categories": categories,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Error answering legal question: {e}")
            # Return a default response if AI generation fails
            return {
                "title": "Response to Legal Question",
                "question": question,
                "answer": (
                    "I apologize, but I'm unable to provide a specific answer to your question at this time. "
                    "Legal questions often require consideration of specific jurisdictional laws and individual circumstances. "
                    "I recommend discussing this matter with your attorney who can provide personalized guidance. "
                    "\n\nPlease note: AI responses are for informational purposes only and do not constitute legal advice."
                ),
                "categories": ["general"],
                "timestamp": datetime.now().isoformat(),
                "error": str(e)
            }
    
    def _categorize_legal_question(self, question: str, case_type: str = "") -> List[str]:
        """
        Categorize a legal question into relevant legal areas.
        
        Args:
            question: The legal question to categorize
            case_type: Optional case type for context
            
        Returns:
            List of category tags
        """
        # Define common legal categories
        categories = {
            "family_law": ["divorce", "custody", "child support", "alimony", "adoption", "marriage"],
            "criminal_law": ["arrest", "charges", "crime", "criminal", "defense", "guilty", "jail", "police", "prosecution"],
            "personal_injury": ["accident", "injury", "damages", "compensation", "negligence", "medical malpractice"],
            "real_estate": ["property", "lease", "tenant", "landlord", "eviction", "foreclosure", "mortgage", "deed"],
            "business_law": ["contract", "business", "corporation", "llc", "partnership", "breach", "agreement"],
            "employment_law": ["employer", "employee", "fired", "termination", "discrimination", "harassment", "wages", "workplace"],
            "intellectual_property": ["copyright", "trademark", "patent", "ip", "infringement", "invention"],
            "immigration": ["visa", "citizenship", "green card", "deportation", "immigration", "asylum"],
            "tax_law": ["tax", "irs", "audit", "deduction", "filing"],
            "estate_planning": ["will", "trust", "estate", "inheritance", "probate", "executor"],
            "general": []  # Default category
        }
        
        # Normalize question and case type
        question_lower = question.lower()
        case_type_lower = case_type.lower() if case_type else ""
        
        # Check for category matches
        matched_categories = []
        
        for category, keywords in categories.items():
            # Add category if case type matches
            if category.replace("_", " ") in case_type_lower:
                matched_categories.append(category)
                continue
                
            # Add category if any keyword matches
            if any(keyword in question_lower for keyword in keywords):
                matched_categories.append(category)
        
        # If no categories matched, use general
        if not matched_categories:
            matched_categories.append("general")
        
        return matched_categories
    
    async def generate_document(self, document_type: str, case_data: Dict[str, Any], parameters: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate a draft legal document based on case information.
        
        Args:
            document_type: Type of document to generate (e.g., "demand_letter", "response_letter")
            case_data: Dictionary containing case details
            parameters: Additional parameters for document generation
            
        Returns:
            Dictionary with generated document and metadata
        """
        case_type = case_data.get("case_type", "")
        case_description = case_data.get("description", "")
        
        # Get template and instructions based on document type
        template, instructions = self._get_document_template(document_type)
        
        # Build prompt with case data and parameters
        prompt = f"""
        As a legal document drafting assistant, create a {document_type.replace('_', ' ')} based on the following information:
        
        Case Type: {case_type}
        Case Description: {case_description}
        
        Document Parameters:
        {json.dumps(parameters, indent=2)}
        
        Instructions:
        {instructions}
        
        Template Structure:
        {template}
        
        Generate a professional, well-structured document following the template and incorporating the case details.
        The document should be in proper legal format but written in plain language where possible.
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a legal document drafting assistant that creates professional legal documents."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.4,
                max_tokens=2000
            )
            
            document_content = response.choices[0].message.content
            
            # Clean up formatting if needed
            document_content = self._clean_document_formatting(document_content)
            
            # Generate a title for the document
            title = f"{document_type.replace('_', ' ').title()}: {case_type}"
            if "recipient_name" in parameters:
                title += f" - {parameters['recipient_name']}"
            
            return {
                "title": title,
                "content": document_content,
                "document_type": document_type,
                "timestamp": datetime.now().isoformat(),
                "draft_status": "AI-generated draft - requires attorney review",
                "disclaimer": (
                    "This is an AI-generated document draft for review purposes only. "
                    "It should not be used or filed without review and approval by a qualified attorney. "
                    "The content may not be legally sound or appropriate for your specific situation."
                )
            }
            
        except Exception as e:
            print(f"Error generating document: {e}")
            # Return an error response
            return {
                "title": f"Error Generating {document_type.replace('_', ' ').title()}",
                "content": "Document generation failed. Please try again or consult with your attorney.",
                "document_type": document_type,
                "timestamp": datetime.now().isoformat(),
                "error": str(e),
                "disclaimer": "Document generation failed. Please consult with your attorney."
            }
    
    def _get_document_template(self, document_type: str) -> Tuple[str, str]:
        """
        Get template and instructions for a specific document type.
        
        Args:
            document_type: Type of document to generate
            
        Returns:
            Tuple of (template, instructions)
        """
        templates = {
            "demand_letter": (
                """
                [SENDER INFORMATION]
                [DATE]
                
                [RECIPIENT INFORMATION]
                
                Re: [SUBJECT]
                
                Dear [RECIPIENT NAME],
                
                [INTRODUCTION]
                
                [FACTS]
                
                [LEGAL BASIS]
                
                [DEMAND]
                
                [CLOSING]
                
                Sincerely,
                
                [SENDER NAME]
                """,
                """
                Create a formal demand letter that:
                1. Clearly states the facts of the situation
                2. Explains the legal basis for the demand
                3. Makes a specific, actionable demand
                4. Sets a reasonable deadline for response
                5. Maintains a professional, non-threatening tone
                6. Indicates potential next steps if demand is not met
                
                Use the parameters provided to fill in the template sections.
                """
            ),
            "response_letter": (
                """
                [SENDER INFORMATION]
                [DATE]
                
                [RECIPIENT INFORMATION]
                
                Re: [SUBJECT]
                
                Dear [RECIPIENT NAME],
                
                [INTRODUCTION]
                
                [RESPONSE TO ALLEGATIONS/CLAIMS]
                
                [LEGAL POSITION]
                
                [PROPOSED RESOLUTION]
                
                [CLOSING]
                
                Sincerely,
                
                [SENDER NAME]
                """,
                """
                Create a formal response letter that:
                1. Acknowledges receipt of the original communication
                2. Addresses the key allegations or claims
                3. States your client's legal position clearly
                4. Proposes a resolution if appropriate
                5. Maintains a professional tone
                6. Protects your client's legal interests
                
                Use the parameters provided to fill in the template sections.
                """
            ),
            "settlement_agreement": (
                """
                SETTLEMENT AGREEMENT AND RELEASE
                
                This Settlement Agreement and Release ("Agreement") is entered into by and between [PARTY A] ("Party A") and [PARTY B] ("Party B"), collectively referred to as "the Parties."
                
                RECITALS
                
                [BACKGROUND FACTS]
                
                AGREEMENT
                
                1. SETTLEMENT PAYMENT
                [PAYMENT TERMS]
                
                2. RELEASE OF CLAIMS
                [RELEASE LANGUAGE]
                
                3. NO ADMISSION OF LIABILITY
                [NO ADMISSION LANGUAGE]
                
                4. CONFIDENTIALITY
                [CONFIDENTIALITY TERMS]
                
                5. NON-DISPARAGEMENT
                [NON-DISPARAGEMENT TERMS]
                
                6. GOVERNING LAW
                [GOVERNING LAW]
                
                7. ENTIRE AGREEMENT
                [ENTIRE AGREEMENT LANGUAGE]
                
                8. EXECUTION
                [EXECUTION LANGUAGE]
                
                AGREED TO BY:
                
                ______________________________    Date: ____________
                [PARTY A NAME]
                
                ______________________________    Date: ____________
                [PARTY B NAME]
                """,
                """
                Create a settlement agreement that:
                1. Clearly identifies the parties and their dispute
                2. Specifies the settlement terms including any payments
                3. Includes appropriate release language
                4. Addresses confidentiality and non-disparagement
                5. Contains standard legal provisions (governing law, entire agreement, etc.)
                6. Is structured in a legally sound format
                7. Uses clear, unambiguous language
                
                Use the parameters provided to fill in the template sections.
                """
            ),
            "cease_and_desist": (
                """
                [SENDER INFORMATION]
                [DATE]
                
                [RECIPIENT INFORMATION]
                
                Re: CEASE AND DESIST - [SUBJECT]
                
                Dear [RECIPIENT NAME],
                
                [INTRODUCTION]
                
                [DESCRIPTION OF VIOLATIONS]
                
                [LEGAL BASIS]
                
                [DEMAND TO CEASE]
                
                [CONSEQUENCES]
                
                [CLOSING]
                
                Sincerely,
                
                [SENDER NAME]
                """,
                """
                Create a cease and desist letter that:
                1. Clearly identifies the violating actions
                2. Cites the legal basis for demanding cessation
                3. Makes a clear demand to stop the specified activities
                4. Sets a deadline for compliance
                5. Outlines potential legal consequences for non-compliance
                6. Maintains a professional, authoritative tone
                
                Use the parameters provided to fill in the template sections.
                """
            ),
            "general_legal_letter": (
                """
                [SENDER INFORMATION]
                [DATE]
                
                [RECIPIENT INFORMATION]
                
                Re: [SUBJECT]
                
                Dear [RECIPIENT NAME],
                
                [INTRODUCTION]
                
                [MAIN CONTENT]
                
                [LEGAL POSITION]
                
                [REQUEST/STATEMENT OF INTENT]
                
                [CLOSING]
                
                Sincerely,
                
                [SENDER NAME]
                """,
                """
                Create a general legal letter that:
                1. Clearly states the purpose of the communication
                2. Presents relevant facts and information
                3. Explains the legal position or reasoning
                4. Makes any necessary requests or statements of intent
                5. Maintains a professional tone appropriate to the context
                6. Follows standard legal letter formatting
                
                Use the parameters provided to fill in the template sections.
                """
            )
        }
        
        # Return template and instructions for requested document type, or default to general letter
        return templates.get(document_type, templates["general_legal_letter"])
    
    def _clean_document_formatting(self, document_content: str) -> str:
        """
        Clean up formatting issues in generated documents.
        
        Args:
            document_content: Raw document content from AI
            
        Returns:
            Cleaned document content
        """
        # Remove markdown code block formatting if present
        if document_content.startswith("```") and "```" in document_content[3:]:
            document_content = document_content.split("```", 2)[1]
            if document_content.startswith("markdown\n") or document_content.startswith("md\n"):
                document_content = document_content[document_content.find("\n")+1:]
            document_content = document_content.strip()
        
        # Ensure consistent line breaks
        document_content = document_content.replace("\r\n", "\n")
        
        # Remove any trailing whitespace on lines
        document_content = "\n".join(line.rstrip() for line in document_content.split("\n"))
        
        return document_content
    
    async def suggest_legal_research(self, case_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Suggest legal research topics and resources based on case details.
        
        Args:
            case_data: Dictionary containing case details
            
        Returns:
            Dictionary with research suggestions
        """
        case_type = case_data.get("case_type", "")
        case_description = case_data.get("description", "")
        
        prompt = f"""
        As a legal research assistant, suggest research topics and resources for the following case:
        
        Case Type: {case_type}
        Description: {case_description}
        
        Please provide:
        1. Key legal questions that need research
        2. Relevant legal doctrines and principles
        3. Types of precedents to look for
        4. Suggested research sources (e.g., specific databases, treatises)
        5. Potential search terms for legal research
        
        Format your response as a JSON object with these sections.
        """
        
        try:
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a legal research assistant that suggests research strategies."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=1000
            )
            
            # Extract and parse the JSON response
            suggestions_text = response.choices[0].message.content
            # Find JSON content between triple backticks if present
            if "```json" in suggestions_text and "```" in suggestions_text.split("```json")[1]:
                json_str = suggestions_text.split("```json")[1].split("```")[0].strip()
            elif "{" in suggestions_text and "}" in suggestions_text:
                # Extract between first { and last }
                start = suggestions_text.find("{")
                end = suggestions_text.rfind("}") + 1
                json_str = suggestions_text[start:end]
            else:
                json_str = suggestions_text
                
            suggestions = json.loads(json_str)
            
            # Add disclaimer
            suggestions["disclaimer"] = (
                "These research suggestions are generated by AI to assist with legal research. "
                "They are not exhaustive and may not cover all relevant legal issues. "
                "Consult with your attorney to develop a comprehensive research strategy."
            )
            
            return suggestions
            
        except Exception as e:
            print(f"Error generating research suggestions: {e}")
            # Return default suggestions if AI generation fails
            return {
                "key_legal_questions": ["Consult with your attorney to identify key legal questions for your case"],
                "relevant_legal_doctrines": ["Specific legal doctrines will depend on your case details"],
                "types_of_precedents": ["Your attorney will identify relevant precedents for your situation"],
                "suggested_research_sources": ["Legal databases such as Westlaw or LexisNexis", "State and federal court websites", "Legal treatises specific to your case type"],
                "potential_search_terms": [case_type, "legal precedent", "case law"],
                "disclaimer": "These are general research suggestions. Consult with your attorney for guidance specific to your case.",
                "error": str(e)
            }


# API endpoints for the AI Case Assistant

async def analyze_case(case_data):
    """Analyze a legal case to identify key issues and strategy."""
    assistant = CaseAssistant()
    return await assistant.analyze_case(case_data)

async def analyze_document(document, case_type=None):
    """Analyze a legal document to extract key information."""
    assistant = CaseAssistant()
    return await assistant.analyze_document(document, case_type)

async def answer_legal_question(question, case_data=None):
    """Answer a legal question with appropriate context and disclaimers."""
    assistant = CaseAssistant()
    return await assistant.answer_legal_question(question, case_data)

async def generate_document(document_type, case_data, parameters):
    """Generate a draft legal document based on case information."""
    assistant = CaseAssistant()
    return await assistant.generate_document(document_type, case_data, parameters)

async def suggest_legal_research(case_data):
    """Suggest legal research topics and resources based on case details."""
    assistant = CaseAssistant()
    return await assistant.suggest_legal_research(case_data)

