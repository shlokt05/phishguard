import React from 'react';
import { Shield, Info, CheckCircle, Code, Server, Database, AlertTriangle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-bold text-brand-400">
          <Shield className="w-4 h-4" /> Academic Project Overview
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          ABOUT PHISHGUARD
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          PhishGuard was developed as a full-stack production-grade web application for the college project:
          <strong className="block text-brand-400 font-extrabold mt-1 text-base">
            “Phishing Awareness Campaign Development”
          </strong>
        </p>
      </div>

      {/* KEY METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Project Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="font-extrabold text-lg text-white">Project Identity & Objectives</h3>
          
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-brand-400">Project Name:</span> PhishGuard
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-brand-400">Main Tagline:</span> “Think Before You Click”
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-brand-400">Core Motto:</span> “Learn • Detect • Protect • Respond”
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-brand-400">Primary Objective:</span> Educate internet users to recognize suspicious emails, text messages, URLs, and fake login forms before surrendering credentials.
            </li>
          </ul>
        </div>

        {/* Tech Stack Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="font-extrabold text-lg text-white">Production Technology Stack</h3>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-brand-400 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" /> Frontend
              </span>
              <p className="text-slate-400">React, TypeScript, Vite, Tailwind CSS, Lucide Icons</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5" /> Backend
              </span>
              <p className="text-slate-400">Node.js, Express.js, TypeScript, REST API</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> Database
              </span>
              <p className="text-slate-400">Supabase PostgreSQL + RLS Security Policies</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Auth & Deploy
              </span>
              <p className="text-slate-400">Supabase Auth, Vercel Serverless Deployment</p>
            </div>
          </div>
        </div>

      </div>

      {/* MANDATORY SPECIFICATION DISCLAIMER */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 font-extrabold text-amber-400 text-sm uppercase tracking-wider">
          <AlertTriangle className="w-5 h-5" /> Mandatory Educational Disclaimer
        </div>
        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
          “This application is an educational awareness platform. Detection activities use fictional examples for learning purposes.”
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          All domain names, sender addresses, emails, and SMS messages presented in the modules, URL analyzer, detection scenarios, and quiz questions are entirely fictional and created exclusively for training demonstrations.
        </p>
      </div>

    </div>
  );
};
