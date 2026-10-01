# PhishGuard | Phishing Awareness Campaign Platform

> **Main Tagline:** *Think Before You Click*  
> **Motto:** *Learn • Detect • Protect • Respond*

PhishGuard is a full-stack educational phishing awareness platform developed for the college project topic **“Phishing Awareness Campaign Development”**.

---

## 🌟 Key Features

1. **10 Interactive Training Modules**: Comprehensive curriculum covering Phishing basics, Email Phishing, Smishing, Vishing, Social Media Phishing, Malicious Links, Password Safety, OTP Safety, Online Scams, and Incident Reporting.
2. **Fake Website Detection Training**: 7 structured lessons including:
   - Interactive **Flow Diagram** ("How Fake Websites Work")
   - **Educational URL / Domain Analyzer Tool** (Evaluating HTTPS, root domains, subdomains, and typosquatting)
   - **Visual Red Flags** comparison (Legitimate vs Suspicious site mockups)
   - 5-Scenario Detection Challenge with score tracking
3. **Phishing Message Detector**: Practice analyzing realistic Email, SMS, Messaging DM, and Fake Login scenarios with instant red flag breakdowns.
4. **10 Golden Safety Rules & Interactive Checklist**: "Before You Click" persistent safety checklist.
5. **15-Question Security Quiz Engine**: Multiple-choice assessment with category tracking, progress bar, detailed explanations, and score saving.
6. **Awareness Poster Gallery**: 8 original educational posters with category filtering, search, modal preview, high-res PNG canvas download, and link sharing.
7. **Personal Progress Dashboard**: Analytics dashboard displaying completed modules, quiz best scores, detection accuracy, and safety checklist state.
8. **Campaign Strategy & Academic About Pages**: Project objectives, target audience demographics, campaign execution methods, and expected behavioral impact.

---

## 🛠️ Tech Stack

- **Frontend**: React (v18), TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti, HTML2Canvas.
- **Backend API**: Node.js, Express.js (v4), TypeScript, CORS, REST API endpoints.
- **Database**: Supabase PostgreSQL + Row Level Security (RLS) policies.
- **Authentication**: Supabase Auth + JWT Tokens & Local Fallback.
- **Deployment**: Vercel Serverless & Static Build hosting.

---

## 📁 Folder Structure

```
PHISHGUARD/
│
├── frontend/                  # React Vite TypeScript Web App
│   ├── src/
│   │   ├── components/        # Navbar, Footer, UrlAnalyzer, FlowDiagram, PosterModal
│   │   ├── context/           # AuthContext provider
│   │   ├── data/              # Static & fallback assets
│   │   ├── pages/             # 11 Main Pages (Home, Learn, FakeWebsiteTraining, Detect, Safety, Quiz, Posters, Progress, Campaign, About, Login, Register)
│   │   ├── services/          # API REST client & Supabase service
│   │   ├── types/             # TypeScript models
│   │   ├── App.tsx            # Routes configuration
│   │   ├── index.css          # Tailwind CSS styles
│   │   └── main.tsx           # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
│
├── backend/                   # Node Express TypeScript REST API Server
│   ├── src/
│   │   ├── config/            # Supabase server client
│   │   ├── data/              # Seed data for 10 modules, 15 quiz questions, 5 challenges, 8 posters
│   │   ├── middleware/        # JWT & Guest auth middleware
│   │   ├── routes/            # REST API endpoints (auth, modules, quiz, detection, posters, progress)
│   │   └── server.ts          # Express application & health check
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json
│   └── .env.example
│
├── database/
│   └── schema.sql             # Complete PostgreSQL DDL & RLS Policies for Supabase
│
├── vercel.json                # Root Vercel deployment configuration
├── .gitignore
└── README.md
```

---

## 🚀 Local Installation & Running

### 1. Clone & Navigate
```bash
cd phishguard
```

### 2. Setup & Run Backend API Server
```bash
cd backend
npm install
npm run dev
```
The Express REST API server will run at: `http://localhost:5000`  
Health check endpoint: `http://localhost:5000/api/health`

### 3. Setup & Run Frontend Web Application
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
The React development server will run at: `http://localhost:5173`

---

## 🗄️ Database Setup (Supabase PostgreSQL)

1. Create a project at [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase Dashboard.
3. Copy the contents of `database/schema.sql` and run the script.
4. This creates tables for `profiles`, `learning_modules`, `user_progress`, `quiz_questions`, `quiz_results`, `detection_challenges`, `detection_results`, `posters`, and `safety_progress` with Row Level Security (RLS) enabled.

---

## 🔑 Environment Variables Configuration

Copy `.env.example` to `.env` in both `frontend` and `backend` folders:

### Backend `.env`
```env
PORT=5000
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Frontend `.env`
```env
VITE_API_URL=https://your-deployed-backend.vercel.app/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> **IMPORTANT**: Never commit `.env` or expose the `SUPABASE_SERVICE_ROLE_KEY` in frontend source code.

---

## ☁️ Deployment Guide (Vercel)

### Option A: Automatic Vercel Monorepo Deployment
1. Push the repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel automatically detects `vercel.json` and builds both the React static frontend and Express serverless backend routes under `/api/*`.

### Option B: Separate Vercel Projects
1. Deploy `backend/` as an Express Serverless Project on Vercel. Obtain the production backend URL (e.g., `https://phishguard-api.vercel.app`).
2. Set `VITE_API_URL=https://phishguard-api.vercel.app/api` in Vercel Environment Variables for the `frontend/` project.
3. Deploy `frontend/` to Vercel.

---

## 🔍 Verification & Health Check

Verify production deployment by requesting the API health endpoint:
```http
GET /api/health
```

Expected Response:
```json
{
  "status": "ok",
  "timestamp": "2026-10-01T12:00:00.000Z",
  "service": "PhishGuard API Backend"
}
```

---

## ⚠️ Academic Disclaimer

*This application is an educational awareness platform. Detection activities use fictional examples for learning purposes.*
