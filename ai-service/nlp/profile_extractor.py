import re
import os
from typing import Dict, Any, List

def extract_profile(text: str, language: str = "hi") -> Dict[str, Any]:
    """
    Extract structured beneficiary attributes from natural language transcript
    Supports Hindi, Hinglish, and English vernacular expressions.
    """
    lower = text.lower()
    
    extracted: Dict[str, Any] = {
        "education": None,
        "skills": [],
        "interests": [],
        "jobPreference": None,
        "mobilityPreference": None,
        "location": None
    }
    
    # 1. Education parsing
    if any(k in lower for k in ['12th', '12वीं', 'बारहवीं', '12 pass', '12th pass', 'inter', 'intermediate', '10+2']):
        extracted["education"] = {
            "level": "12th",
            "field": "General / Intermediate",
            "details": "Higher Secondary (12th Standard)"
        }
    elif any(k in lower for k in ['10th', '10वीं', 'दसवीं', '10 pass', 'matric', 'high school', 'highschool']):
        extracted["education"] = {
            "level": "10th",
            "field": "General",
            "details": "Secondary School (10th Standard)"
        }
    elif any(k in lower for k in ['graduate', 'स्नातक', 'degree', 'ba', 'b.a', 'bsc', 'b.sc', 'bcom', 'b.com']):
        extracted["education"] = {
            "level": "graduate",
            "field": "Bachelor Degree",
            "details": "College Graduate"
        }
    elif any(k in lower for k in ['8th', '8वीं', 'आठवीं', 'middle school']):
        extracted["education"] = {
            "level": "8th",
            "field": "Elementary",
            "details": "8th Class Passed"
        }
    elif any(k in lower for k in ['diploma', 'iti', 'आईटीआई', 'डिप्लोमा']):
        extracted["education"] = {
            "level": "diploma",
            "field": "Vocational / Technical",
            "details": "ITI or Polytechnic Diploma"
        }

    # 2. Skill parsing
    if any(k in lower for k in ['computer', 'कंप्यूटर', 'laptop', 'pc', 'computar']):
        extracted["skills"].append({
            "name": "Basic Computer",
            "proficiency": "intermediate",
            "category": "it"
        })
    if any(k in lower for k in ['ms office', 'excel', 'word', 'typing', 'टाइपिंग', 'office']):
        extracted["skills"].append({
            "name": "MS Office & Data Entry",
            "proficiency": "intermediate",
            "category": "it"
        })
    if any(k in lower for k in ['farming', 'kheti', 'खेती', 'kisan', 'कृषि', 'fasal']):
        extracted["skills"].append({
            "name": "Traditional Agriculture",
            "proficiency": "intermediate",
            "category": "agriculture"
        })
    if any(k in lower for k in ['bijli', 'electric', 'wiring', 'तार', 'बिजली', 'repair']):
        extracted["skills"].append({
            "name": "Domestic Electricals",
            "proficiency": "beginner",
            "category": "services"
        })
    if any(k in lower for k in ['driving', 'गाड़ी', 'चालक', 'driver']):
        extracted["skills"].append({
            "name": "Vehicle Driving",
            "proficiency": "intermediate",
            "category": "services"
        })

    # 3. Interests parsing
    if any(k in lower for k in ['computer', 'technology', 'it', 'web', 'internet', 'digital', 'इंटरनेट']):
        extracted["interests"].append("Technology & Computers")
    if any(k in lower for k in ['kheti', 'agriculture', 'solar', 'farm', 'खेती', 'जैविक']):
        extracted["interests"].append("Modern Agri-Tech & Solar")
    if any(k in lower for k in ['business', 'dukan', 'vyapar', 'self', 'दुकान', 'व्यापार', 'रोजगार']):
        extracted["interests"].append("Micro-Enterprise & Business")

    # 4. Job Preference parsing
    if any(k in lower for k in ['local', 'ghar ke paas', 'gaon', 'पास में', 'घर', 'district']):
        extracted["jobPreference"] = "employment"
        extracted["mobilityPreference"] = "local"
    elif any(k in lower for k in ['apna kaam', 'khud ka', 'business', 'खुद का', 'अपना काम', 'self']):
        extracted["jobPreference"] = "self_employment"
        extracted["mobilityPreference"] = "local"
    else:
        extracted["jobPreference"] = "both"
        extracted["mobilityPreference"] = "local"

    # 5. Location parsing
    if any(k in lower for k in ['varanasi', 'banaras', 'वाराणसी', 'बनारस', 'kashi']):
        extracted["location"] = {"district": "Varanasi", "state": "Uttar Pradesh", "pincode": "221001"}
    elif any(k in lower for k in ['chandauli', 'चंदौली']):
        extracted["location"] = {"district": "Chandauli", "state": "Uttar Pradesh", "pincode": "232104"}
    elif any(k in lower for k in ['mirzapur', 'मिर्जापुर']):
        extracted["location"] = {"district": "Mirzapur", "state": "Uttar Pradesh", "pincode": "231001"}
    else:
        extracted["location"] = {"district": "Varanasi", "state": "Uttar Pradesh", "pincode": "221001"}

    # Voice assistant acknowledgment response
    if language == 'hi':
        reply = "नमस्ते! मैंने आपकी शिक्षा, कौशल और प्राथमिकताओं को समझ लिया है। कृपया पुष्टि करें कि क्या यह जानकारी सही है।"
    else:
        reply = "Hello! I have extracted your education, skills, and preferences. Please confirm if the summary below is accurate."

    return {
        "extracted": extracted,
        "assistantReply": reply,
        "confidence": 0.95
    }

