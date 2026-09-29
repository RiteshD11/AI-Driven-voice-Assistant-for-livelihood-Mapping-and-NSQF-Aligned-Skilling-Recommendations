from typing import List, Dict, Any

ROLE_STANDARDS = {
    "web_developer": {
        "title": "Web & Digital Front-End Developer",
        "nsqfLevel": "Level 5",
        "category": "it",
        "requiredSkills": [
            {"name": "Basic Computer", "level": "Foundation"},
            {"name": "HTML & CSS", "level": "Core"},
            {"name": "JavaScript Essentials", "level": "Core"},
            {"name": "React UI Fundamentals", "level": "Advanced"},
            {"name": "Git & Collaboration", "level": "Tools"}
        ]
    },
    "digital_agri_operator": {
        "title": "Solar & Micro-Irrigation Technician",
        "nsqfLevel": "Level 4",
        "category": "agriculture",
        "requiredSkills": [
            {"name": "Soil & Water Testing", "level": "Foundation"},
            {"name": "Drip System Maintenance", "level": "Core"},
            {"name": "Solar Pump Handling", "level": "Core"},
            {"name": "Basic Digital App Tracking", "level": "Tools"}
        ]
    },
    "data_entry_specialist": {
        "title": "Office & Banking Operations Assistant",
        "nsqfLevel": "Level 4",
        "category": "it",
        "requiredSkills": [
            {"name": "Basic Computer", "level": "Foundation"},
            {"name": "MS Office & Excel", "level": "Core"},
            {"name": "Typing Speed (Hindi/English)", "level": "Core"},
            {"name": "Internet & Online Banking Portals", "level": "Core"}
        ]
    }
}

def analyze_skills(existing_skills: List[Any]) -> Dict[str, Any]:
    """Classifies existing beneficiary skills into proficiency and domains."""
    names = [s if isinstance(s, str) else s.get("name", "") for s in existing_skills]
    return {
        "count": len(names),
        "domains": list(set([s.get("category", "general") if isinstance(s, dict) else "general" for s in existing_skills])),
        "skillList": names
    }

def identify_skill_gap(target_role: str, existing_skills: List[Any]) -> Dict[str, Any]:
    """Compares current skills with NSQF national occupational standards."""
    role = ROLE_STANDARDS.get(target_role, ROLE_STANDARDS["web_developer"])
    
    current_names = [s.lower() if isinstance(s, str) else s.get("name", "").lower() for s in existing_skills]
    
    mastered = []
    missing = []
    
    for req in role["requiredSkills"]:
        req_name = req["name"].lower()
        if any(c in req_name or req_name in c for c in current_names):
            mastered.append(req)
        else:
            missing.append(req)
            
    pct = int((len(mastered) / len(role["requiredSkills"])) * 100) if role["requiredSkills"] else 0
    next_skill = missing[0]["name"] if missing else "NSQF Certification Assessment"
    
    return {
        "success": True,
        "role": role["title"],
        "nsqfLevel": role["nsqfLevel"],
        "category": role["category"],
        "completionPercent": pct,
        "masteredSkills": mastered,
        "missingSkills": missing,
        "recommendedNextSkill": next_skill,
        "explanation": f"You have mastered {len(mastered)} of {len(role['requiredSkills'])} competencies for {role['title']}. We recommend focusing on '{next_skill}' next."
    }

