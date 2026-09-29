from typing import List, Dict, Any

COURSES_CATALOG = [
    {
        "id": "course_01",
        "name": "Web & Digital Interface Design Assistant",
        "skillArea": "IT & Digital Services",
        "category": "it",
        "duration": "3 Months (360 Hours)",
        "deliveryMode": "hybrid",
        "eligibility": "12th Pass",
        "skillsGained": ["HTML5 & CSS3", "JavaScript Basics", "Responsive Web Design", "Digital Portals"],
        "nsqfLevel": "NSQF Level 4 (Demo Aligned)",
        "location": "Varanasi / Online",
        "tags": ["computers", "it", "web", "digital", "technology"]
    },
    {
        "id": "course_02",
        "name": "Solar-Powered Micro-Irrigation Technician",
        "skillArea": "Agriculture & Green Energy",
        "category": "agriculture",
        "duration": "2 Months (240 Hours)",
        "deliveryMode": "offline",
        "eligibility": "10th Pass",
        "skillsGained": ["Solar Pump Installation", "Drip & Sprinkler Maintenance", "IoT Water Sensors"],
        "nsqfLevel": "NSQF Level 4 (Demo Aligned)",
        "location": "Chandauli & Varanasi",
        "tags": ["agriculture", "solar", "irrigation", "farming"]
    },
    {
        "id": "course_03",
        "name": "Domestic Electrical & Smart Appliance Maintenance",
        "skillArea": "Electronics & Hardware",
        "category": "services",
        "duration": "3 Months (300 Hours)",
        "deliveryMode": "offline",
        "eligibility": "8th / 10th Pass",
        "skillsGained": ["Single-Phase Wiring", "Inverter Servicing", "Safety Grounding"],
        "nsqfLevel": "NSQF Level 3 (Demo Aligned)",
        "location": "Varanasi ITI",
        "tags": ["electrician", "hardware", "repair", "services"]
    }
]

def recommend_training(profile: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Transparent prototype recommendation scoring:
    Education = 20%, Skill Match = 30%, Interest Match = 20%, Location = 15%, Job Pref = 15%
    """
    edu_level = profile.get("education_level", "12th")
    skills = [s.lower() for s in profile.get("existing_skills", [])]
    interests = [i.lower() for i in profile.get("interests", [])]
    location = profile.get("location", "Varanasi").lower()
    job_pref = profile.get("job_preference", "both")

    recommendations = []

    for c in COURSES_CATALOG:
        breakdown = {
            "educationMatch": 20 if edu_level in ["12th", "graduate", "diploma"] else 14,
            "skillMatch": 0,
            "interestMatch": 0,
            "locationMatch": 15 if location in c["location"].lower() or c["deliveryMode"] == "hybrid" else 10,
            "jobPrefMatch": 15
        }
        reasons = []

        # Skills match calculation
        matched = [t for t in c["tags"] if any(t in s or s in t for s in skills)]
        if matched or "basic computer" in skills:
            breakdown["skillMatch"] = 28
            reasons.append(f"✓ Builds on your existing skills in {', '.join(matched) if matched else 'Computing'}")
        else:
            breakdown["skillMatch"] = 15

        # Interest match calculation
        if any(any(t in i for t in c["tags"]) for i in interests) or not interests:
            breakdown["interestMatch"] = 20
            reasons.append(f"✓ Aligns with your interest in {c['skillArea']}")
        else:
            breakdown["interestMatch"] = 10

        reasons.append(f"✓ Available locally in {c['location']}")
        reasons.append(f"✓ Minimum qualification matched ({c['eligibility']})")

        total = sum(breakdown.values())
        total = min(98, max(60, total))

        recommendations.append({
            "course": c,
            "matchScore": total,
            "breakdown": breakdown,
            "reasons": reasons,
            "isDemo": True
        })

    recommendations.sort(key=lambda x: x["matchScore"], reverse=True)
    return recommendations

