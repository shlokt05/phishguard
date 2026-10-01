export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LearningModule {
  id: string;
  module_number: number;
  title: string;
  description: string;
  explanation: string;
  warning_signs: string[];
  fictional_example: {
    type?: string;
    sender?: string;
    subject?: string;
    body?: string;
  };
  safety_tips: string[];
  interactive_content?: any;
}

export interface QuizQuestion {
  id: string;
  question_number: number;
  question_text: string;
  options: string[];
  correct_option: number;
  explanation: string;
  category: string;
}

export interface QuizResult {
  id?: string;
  user_id?: string;
  score: number;
  total_questions: number;
  percentage: number;
  completed_at?: string;
}

export interface DetectionChallenge {
  id: string;
  type: 'email' | 'sms' | 'messaging' | 'social' | 'fake_website';
  scenario_title: string;
  sender?: string;
  subject?: string;
  content: string;
  url_mockup?: string;
  is_phishing: boolean;
  explanation: string;
  red_flags: string[];
}

export interface Poster {
  id: string;
  title: string;
  tagline: string;
  category: string;
  bg_gradient: string;
  icon_name: string;
  download_count?: number;
}

export interface UserProgressData {
  user_id: string;
  learning_progress_percent: number;
  completed_modules_count: number;
  completed_module_ids: string[];
  quiz_best_score: number;
  quiz_total_questions: number;
  quiz_best_percentage: number;
  detection_correct_count: number;
  detection_total_attempts: number;
  safety_rules_completed_count: number;
  safety_rule_ids: number[];
  posters_viewed_count: number;
}
