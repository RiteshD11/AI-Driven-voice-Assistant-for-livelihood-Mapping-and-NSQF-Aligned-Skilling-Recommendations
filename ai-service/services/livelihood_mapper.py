from typing import Dict, Any

def map_livelihood(skills: list, target_interest: str = "it") -> Dict[str, Any]:
    """Maps beneficiary skills and training completion to employment and self-employment outcomes."""
    if "agri" in target_interest.lower() or "solar" in target_interest.lower():
        return {
            "category": "agriculture",
            "journey": [
                {"stage": "Profile", "title": "Agrarian Background", "status": "done"},
                {"stage": "Skill Assessment", "title": "Field Farming Experience", "status": "done"},
                {"stage": "Target Training", "title": "Solar Micro-Irrigation Technician (NSQF L4)", "status": "active"},
                {"stage": "Certification", "title": "Government Recognized Skill Certificate", "status": "next"},
                {"stage": "Livelihood Mapping", "title": "Employment or Custom Agri Center", "status": "next"}
            ],
            "employmentPath": {
                "title": "Agri-Tech Solar Pump Technician",
                "estimatedWage": "₹15,000 - ₹20,000 / month",
                "type": "Organized Rural Enterprise"
            },
            "selfEmploymentPath": {
                "title": "Solar Agri Tool Maintenance & Spares Centre",
                "estimatedEarning": "₹20,000 - ₹35,000 / month",
                "schemeSupport": "PM-AJAY Capital Subsidy & MUDRA Shishu Loan Eligible"
            }
        }
    else:
        return {
            "category": "it",
            "journey": [
                {"stage": "Profile", "title": "12th Standard Passed", "status": "done"},
                {"stage": "Skill Assessment", "title": "Basic Computer & MS Office", "status": "done"},
                {"stage": "Target Training", "title": "Web & Digital Interface Design Assistant (NSQF L4)", "status": "active"},
                {"stage": "Certification", "title": "Government Recognized Skill Certificate", "status": "next"},
                {"stage": "Livelihood Mapping", "title": "Digital Agency Employment or CSC Entrepreneur", "status": "next"}
            ],
            "employmentPath": {
                "title": "Junior Web & Digital Portal Associate",
                "estimatedWage": "₹14,000 - ₹18,000 / month",
                "type": "IT & Business Services"
            },
            "selfEmploymentPath": {
                "title": "Village CSC / Digital Kiosk Operator",
                "estimatedEarning": "₹18,000 - ₹30,000 / month",
                "schemeSupport": "PM-AJAY Grants & Stand-Up India Assistance"
            }
        }
