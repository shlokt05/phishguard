-- ===================================================
-- PHISHGUARD POSTGRESQL DATABASE SCHEMA
-- Target Database: Supabase PostgreSQL
-- ===================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. LEARNING MODULES TABLE
CREATE TABLE IF NOT EXISTS public.learning_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_number INT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    explanation TEXT NOT NULL,
    warning_signs JSONB NOT NULL DEFAULT '[]'::jsonb,
    fictional_example JSONB NOT NULL DEFAULT '{}'::jsonb,
    safety_tips JSONB NOT NULL DEFAULT '[]'::jsonb,
    interactive_content JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. USER PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES public.learning_modules(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, module_id)
);

-- 5. QUIZ QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_number INT NOT NULL,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of strings
    correct_option INT NOT NULL, -- 0-based index
    explanation TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. QUIZ RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. DETECTION CHALLENGES TABLE
CREATE TABLE IF NOT EXISTS public.detection_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL, -- 'email', 'sms', 'messaging', 'social', 'fake_website'
    scenario_title TEXT NOT NULL,
    sender TEXT,
    subject TEXT,
    content TEXT NOT NULL,
    url_mockup TEXT,
    is_phishing BOOLEAN NOT NULL,
    explanation TEXT NOT NULL,
    red_flags JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. DETECTION RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.detection_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES public.detection_challenges(id) ON DELETE CASCADE,
    user_choice TEXT NOT NULL, -- 'SAFE' or 'PHISHING' or 'SUSPICIOUS'
    is_correct BOOLEAN NOT NULL,
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. POSTERS TABLE
CREATE TABLE IF NOT EXISTS public.posters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    category TEXT NOT NULL,
    bg_gradient TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. SAFETY PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.safety_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    completed_rule_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ===================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detection_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detection_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_progress ENABLE ROW LEVEL SECURITY;

-- Public content read access
CREATE POLICY "Public modules readable by everyone" ON public.learning_modules FOR SELECT USING (true);
CREATE POLICY "Public quiz questions readable by everyone" ON public.quiz_questions FOR SELECT USING (true);
CREATE POLICY "Public detection challenges readable by everyone" ON public.detection_challenges FOR SELECT USING (true);
CREATE POLICY "Public posters readable by everyone" ON public.posters FOR SELECT USING (true);

-- User specific access
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own quiz results" ON public.quiz_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz results" ON public.quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own detection results" ON public.detection_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own detection results" ON public.detection_results FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own safety progress" ON public.safety_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own safety progress" ON public.safety_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own safety progress" ON public.safety_progress FOR UPDATE USING (auth.uid() = user_id);
