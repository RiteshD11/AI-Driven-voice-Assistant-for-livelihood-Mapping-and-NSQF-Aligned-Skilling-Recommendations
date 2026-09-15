# AAROHAN (आरोहण)
### AI-Powered Voice Assistant for Livelihood Mapping & NSQF-Aligned Skilling
**Smart India Hackathon (SIH 2026)**  
**Problem Statement ID:** SIH26097  
**Theme:** Agriculture, FoodTech & Rural Development  
**Category:** Software  
**Target Beneficiaries:** Scheduled Caste (SC) Beneficiaries under the PM-AJAY Context  

---

## 📌 1. Project Overview & Problem Statement

Many rural and semi-urban beneficiaries face substantial socio-economic hurdles in accessing skilling and sustainable livelihood pathways:
- **Lack of awareness** regarding suitable government skill-training schemes and NSQF courses.
- **Skill mismatch** between traditional informal expertise and formal industry requirements.
- **Language and digital literacy barriers** preventing beneficiaries from navigating complex online forms and portal interfaces.
- **Difficulty connecting training with tangible outcomes** (employment or self-employment).

**AAROHAN** solves this via a **voice-first, multilingual, empathetic AI platform** that guides beneficiaries through natural spoken conversation, extracts competencies, calculates skill gaps against NSQF occupational standards, offers transparent 5-factor training recommendations, and maps them to verified local jobs or micro-enterprise avenues.

---

## 🚀 2. Core User Journey Flow

```
   [ Beneficiary (Voice / Spoken Input) ]
                     ↓
          [ Speech-to-Text ] (Web Speech API / Regional Voice)
                     ↓
       [ Multilingual AI + NLP Parser ]
                     ↓
      [ Structured Profile Extraction & Confirmation ]
                     ↓
     [ Skill Assessment & NSQF Competency Gap Detection ]
                     ↓
     [ Transparent 5-Factor Training Recommendations ]
                     ↓
       [ Livelihood Mapping (Dual Pathway) ]
          ↙                         ↘
  [ Local Employment ]         [ Self-Employment / CSC ]
```

---

## 🏛️ 3. Government Ecosystem Alignment

> **Design Notice:** AAROHAN is designed to integrate and align with the following government frameworks. *This is an SIH 2026 innovation prototype; all course and job data are simulated prototype demo data.*

1. **PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana):** Targeted livelihood mapping, capital subsidy eligibility, and skilling outreach for SC beneficiaries.
2. **NSQF / NCVET (National Skills Qualifications Framework):** Competency levels (Levels 3 to 5) mapped to course modules and occupational standards.
3. **Skill India Digital Hub (SIDH):** Standardized curriculum taxonomy and course credit alignment.
4. **BHASHINI (National Language Translation Mission):** Architecture ready for voice-to-voice integration across Indian vernaculars.

---

## 🏗️ 4. Monorepo Architecture & Folder Structure

```
aarohan/
├── .env.example                       # Unified environment variable template
├── .gitignore                         # Project-wide ignore rules
├── package.json                       # Monorepo root orchestration scripts
├── README.md                          # Comprehensive project documentation
│
├── frontend/                          # React 18 + TypeScript + Tailwind CSS (Vite)
│   ├── index.html                     # HTML5 with Devanagari fonts & meta tags
│   ├── package.json                   # Frontend dependencies
│   ├── tailwind.config.js             # Government portal design tokens
│   ├── vite.config.ts                 # Dev server with proxy to backend
│   └── src/
│       ├── App.tsx                    # React Router v6 with all 14 routes
│       ├── main.tsx                   # DOM mounting
│       ├── index.css                  # Custom styling & pulse animations
│       ├── types/index.ts             # Complete TypeScript interfaces
│       ├── services/api.ts            # Client API client with seamless offline fallback
│       ├── context/
│       │   ├── LanguageContext.tsx    # Hindi / English translation provider
│       │   ├── AccessibilityContext.tsx # Font scaling, contrast, screen reader
│       │   ├── AuthContext.tsx        # Beneficiary authentication state & consent
│       │   └── DemoContext.tsx        # 5-step guided SIH judge demo state
│       ├── components/
│       │   ├── Navbar.tsx             # Accessible header with language/font switcher
│       │   ├── Footer.tsx             # Government-standard footer & disclaimers
│       │   ├── DemoBanner.tsx         # Persistent SIH 2026 demo indicator
│       │   ├── VoiceButton.tsx        # Large animated mic with Web Speech API
│       │   ├── ConsentModal.tsx       # Section 24 privacy consent modal
│       │   ├── RecommendationCard.tsx # 5-factor transparent scoring card
│       │   └── OpportunityCard.tsx    # Employment / Self-employment card
│       └── pages/
│           ├── LandingPage.tsx        # Section 4: Premium SIH landing page
│           ├── AuthPage.tsx           # Section 2: Beneficiary Login / Register
│           ├── VoiceAssistantPage.tsx # Section 5 & 7: Voice assistant & NLP extraction
│           ├── ProfilePage.tsx        # Section 6: Beneficiary Profile dashboard
│           ├── SkillAssessmentPage.tsx # Section 8: Competency assessment
│           ├── SkillGapPage.tsx       # Section 8: Visual skill gap analyzer
│           ├── TrainingPage.tsx       # Section 9 & 10: NSQF training recommendations
│           ├── LivelihoodMapPage.tsx  # Section 11: Livelihood pathway mapper
│           ├── JobsPage.tsx           # Section 12: Jobs & Self-employment
│           ├── SavedRecommendationsPage.tsx # Bookmarked programs
│           ├── ProgressDashboardPage.tsx # Section 13: Beneficiary progress & roadmap
│           ├── AdminDashboardPage.tsx # Section 14: Anonymized admin analytics
│           ├── AboutPage.tsx          # Section 26: Problem statement & ecosystem
│           └── HelpPage.tsx           # Section 22 & 28: Accessibility & help
│
├── backend/                           # Node.js + Express + MongoDB
│   ├── server.js                      # Express server entry point
│   ├── package.json                   # Backend dependencies
│   └── src/
│       ├── config/database.js         # Mongoose connection
│       ├── middleware/auth.js         # JWT auth & demo bypass middleware
│       ├── models/
│       │   ├── User.js                # User auth credentials & consent
│       │   ├── BeneficiaryProfile.js  # Profile with completion percentage
│       │   ├── TrainingProgram.js     # NSQF courses catalog
│       │   ├── Recommendation.js      # Scored recommendation records
│       │   ├── LivelihoodOpportunity.js # Jobs & Self-employment opportunities
│       │   └── Feedback.js            # User feedback
│       ├── controllers/
│       │   ├── authController.js      # Register, login, demo login
│       │   ├── profileController.js   # Get/update profile & AI confirmation
│       │   ├── skillsController.js    # NSQF gap analysis engine
│       │   ├── recommendationController.js # Transparent 5-factor scoring
│       │   ├── jobsController.js      # Opportunity filtering & pathways
│       │   ├── voiceController.js     # Multilingual NLP intent extraction
│       │   ├── adminController.js     # Aggregated k-anonymized metrics
│       │   └── feedbackController.js  # Beneficiary feedback
│       ├── routes/                    # Express REST routes
│       └── seed/seed.js               # MongoDB seeder script
│
└── ai-service/                        # Python + FastAPI + NLP
    ├── main.py                        # FastAPI application entry point
    ├── requirements.txt               # Python dependencies (fastapi, uvicorn, pydantic)
    ├── models/schemas.py              # Pydantic data schemas
    ├── nlp/profile_extractor.py       # Rule-based + semantic extractor (Hindi & English)
    ├── services/skill_analyzer.py     # Competency standard analyzer & gap detector
    ├── recommendation/engine.py       # Weighted recommendation scoring engine
    └── services/livelihood_mapper.py  # Skills to employment/enterprise pathway
```

---

## ⚙️ 5. Transparent Recommendation Algorithm

AAROHAN uses a transparent mathematical scoring model so beneficiaries and evaluators know exactly **why** a course is recommended:

$$\text{Total Match Score} = E + S + I + L + J$$

| Factor | Weight | Evaluation Criteria |
|---|---|---|
| **Education Match ($E$)** | 20% | Minimum qualification requirement match (12th / 10th / 8th) |
| **Skill Match ($S$)** | 30% | Existing competencies overlap with course foundational prerequisites |
| **Interest Match ($I$)** | 20% | Stated vocational interests aligned with industry sector |
| **Location Match ($L$)** | 15% | Training center proximity in district or availability of hybrid mode |
| **Job Preference Match ($J$)** | 15% | Fit for employment vs self-employment / micro-enterprise |

---

## 🛠️ 6. Installation & Setup Guide

### Prerequisites
- **Python:** 3.10+ (Installed on system: Python 3.14.4)
- **Node.js:** v18.0.0+ LTS & npm (Download from [nodejs.org](https://nodejs.org))
- **MongoDB:** Optional local MongoDB instance or MongoDB Atlas URI (Backend works in resilient demo mode even without MongoDB running)

---

### Step 1: Clone or Navigate to Project
```bash
cd "c:\Users\kalas\OneDrive\Desktop\projects\SIH AAROHAN"
```

### Step 2: Set Up Environment Variables
Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

---

### Step 3: Run AI Service (Python FastAPI)
In a dedicated terminal:
```bash
cd ai-service
pip install -r requirements.txt
python main.py
```
> **AI Service running at:** `http://localhost:8000`  
> **Interactive Docs (Swagger UI):** `http://localhost:8000/docs`

---

### Step 4: Run Backend (Node.js Express)
In a separate terminal:
```bash
cd backend
npm install
npm run dev
```
> **Backend running at:** `http://localhost:5000`  
> **Health Check:** `http://localhost:5000/api/health`

*(Optional) To seed demo data into MongoDB:*
```bash
npm run seed
```

---

### Step 5: Run Frontend (React + Vite)
In a third terminal:
```bash
cd frontend
npm install
npm run dev
```
> **Frontend web app running at:** `http://localhost:5173`

---

## 🎯 7. How to Experience the 2-Minute SIH Demo Mode

To evaluate the complete end-to-end journey during hackathon judging:

1. Open `http://localhost:5173` in your browser.
2. Click **"🎯 एसआईएच डेमो वॉकथ्रू" (SIH Demo Walkthrough)** or **"वॉयस असिस्टेंट"** in the top navigation.
3. On the Voice Assistant screen:
   - Click **"डेमो वॉयस नमूना चलाएं"** (or click the large mic button to speak into your microphone).
   - Sample voice input: *"मैंने 12वीं की है, मुझे बेसिक कंप्यूटर का ज्ञान है और मैं वाराणसी में स्थानीय रोजगार चाहता हूँ।"*
4. View the **"AI Extracted Information"** card:
   - Education: **12th**
   - Skills: **Basic Computer**
   - Interest: **Technology**
   - Preference: **Local Employment**
5. Click **"पुष्टि करें" (Confirm)**.
6. Review the **Beneficiary Profile** (Completion: 85%).
7. Follow the **"स्किल गैप एनालिसिस" (Skill Gap Analysis)** to see mastered vs missing competencies for Web & Digital Front-End Developer.
8. View **"प्रशिक्षण अनुशंसाएं" (Training Recommendations)** with transparent score breakdowns (94% match).
9. Explore the **"आजीविका मैप" (Livelihood Map)** and dual employment/self-employment opportunities.
10. Check the **"प्रशासन डैशबोर्ड" (Admin Dashboard)** for aggregated, k-anonymized policy statistics.

---

## 📊 8. Implemented Features vs Planned Future Scope

| Feature Area | Status in Prototype | Implementation Details |
|---|---|---|
| **Voice Interface** | ✅ Fully Functional | Web Speech API native browser voice recognition + realistic simulation demo mode fallback |
| **Multilingual NLP Extraction** | ✅ Fully Functional | Python FastAPI regex & semantic intent extractor for Hindi, Hinglish & English |
| **Profile Confirmation Step** | ✅ Fully Functional | Explicit user confirmation dialog before persisting extracted data |
| **Skill Gap Visualizer** | ✅ Fully Functional | NSQF standards comparison showing mastered competencies, gaps, and next recommended skill |
| **5-Factor Recommendation Engine** | ✅ Fully Functional | Transparent weighted scoring with breakdown sliders and explanations |
| **Livelihood Mapping** | ✅ Fully Functional | Dual pathways for organized employment vs village-level self-employment |
| **Admin Analytics** | ✅ Fully Functional | Aggregated, anonymized demand metrics, skill distributions, and district tables |
| **Accessibility Controls** | ✅ Fully Functional | 3-stage font scaler (A/A+/A++), high-contrast toggle, screen reader text-to-speech |
| **Government Portal UI** | ✅ Fully Functional | Professional, mobile-first design system with government typography and color palette |
| **WhatsApp / IVR Integration** | 🟡 Planned / Future Scope | Architecture designed; marked as "Planned Integration" in UI |
| **Live Bhashini API** | 🟡 Planned / Future Scope | Configured via environment variables; uses Web Speech API and demo simulation |

---

## 🔒 9. Security & Privacy Safeguards
- **Mandatory Consent Flow:** Users must approve the Section 24 consent dialog before personal profile aggregation.
- **k-Anonymity Admin Reporting:** Admin views only display aggregated, anonymized metrics; no personally identifiable beneficiary records (PII) are exposed.
- **JWT & Input Sanitization:** Protected API endpoints with token verification, helmet headers, and express rate limiting.
- **Zero API Key Leakage:** No keys are committed; all external service calls are gated behind environment variables and local offline fallbacks.

---

*Developed for Smart India Hackathon 2026 | Team AAROHAN*
