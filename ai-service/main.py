import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models.schemas import (
    VoiceExtractRequest, ExtractionResponse,
    SkillGapRequest, SkillGapResponse,
    RecommendationRequest
)
from nlp.profile_extractor import extract_profile
from services.skill_analyzer import identify_skill_gap, analyze_skills
from recommendation.engine import recommend_training
from services.livelihood_mapper import map_livelihood

load_dotenv()

app = FastAPI(
    title="UNNATI AI & NLP Service",
    description="Multilingual NLP, Skill Gap Analysis & Recommendation Engine for SIH 2026",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "UNNATI AI/NLP Service",
        "version": "1.0.0",
        "demo_mode": os.getenv("DEMO_MODE", "true") == "true"
    }

@app.post("/api/nlp/extract", response_model=ExtractionResponse)
def api_extract_profile(payload: VoiceExtractRequest):
    """Extracts structured beneficiary parameters from natural language voice transcripts."""
    if not payload.text or not payload.text.strip():
        raise HTTPException(status_code=400, detail="Text transcript cannot be empty")
        
    result = extract_profile(payload.text, payload.language)
    
    return ExtractionResponse(
        success=True,
        originalText=payload.text,
        language=payload.language,
        extracted=result["extracted"],
        assistantReply=result["assistantReply"],
        confidence=result["confidence"],
        needsConfirmation=True,
        isDemoNlp=True
    )

@app.post("/api/skills/gap", response_model=SkillGapResponse)
def api_skill_gap(payload: SkillGapRequest):
    """Evaluates candidate competencies against NSQF occupational standards."""
    result = identify_skill_gap(payload.target_role, payload.existing_skills)
    return SkillGapResponse(**result)

@app.post("/api/recommend")
def api_recommend(payload: RecommendationRequest):
    """Calculates multidimensional transparent recommendation match scores."""
    recs = recommend_training(payload.model_dump())
    return {
        "success": True,
        "recommendations": recs,
        "scoringModel": "Transparent Multi-Factor (Education 20%, Skills 30%, Interest 20%, Location 15%, Job Pref 15%)"
    }

@app.get("/api/livelihood/map")
def api_livelihood_map(interest: str = "it"):
    """Maps skill progression to viable local employment and self-employment."""
    mapped = map_livelihood([], interest)
    return {"success": True, "pathway": mapped}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("AI_SERVICE_PORT", 8000))
    print(f"🚀 Starting UNNATI AI Service on port {port}")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

