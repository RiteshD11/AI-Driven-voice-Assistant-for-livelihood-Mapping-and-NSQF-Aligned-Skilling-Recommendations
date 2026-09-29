from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class VoiceExtractRequest(BaseModel):
    text: str
    language: Optional[str] = "hi"

class ExtractedEducation(BaseModel):
    level: str
    field: Optional[str] = None
    details: Optional[str] = None

class ExtractedSkill(BaseModel):
    name: str
    proficiency: Optional[str] = "intermediate"
    category: Optional[str] = "general"

class ExtractedProfile(BaseModel):
    education: Optional[ExtractedEducation] = None
    skills: List[ExtractedSkill] = []
    interests: List[str] = []
    jobPreference: Optional[str] = None
    mobilityPreference: Optional[str] = None
    location: Optional[Dict[str, str]] = None

class ExtractionResponse(BaseModel):
    success: bool
    originalText: str
    language: str
    extracted: ExtractedProfile
    assistantReply: str
    confidence: float
    needsConfirmation: bool
    isDemoNlp: bool

class SkillGapRequest(BaseModel):
    target_role: str
    existing_skills: List[Any] = []

class SkillGapResponse(BaseModel):
    success: bool
    role: str
    nsqfLevel: str
    category: str
    completionPercent: int
    masteredSkills: List[Dict[str, Any]]
    missingSkills: List[Dict[str, Any]]
    recommendedNextSkill: str
    explanation: str

class RecommendationRequest(BaseModel):
    education_level: Optional[str] = "12th"
    existing_skills: List[str] = []
    interests: List[str] = []
    location: Optional[str] = "Varanasi"
    job_preference: Optional[str] = "both"

