import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, AlertTriangle, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-base text-white tracking-wider">PHISHGUARD</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Think Before You Click. An interactive phishing awareness and defense campaign platform.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-brand-400">
              <Lock className="w-3 h-3" /> Educational Cyber Defense
            </div>
          </div>

          {/* Col 2: Training & Modules */}
          <div>
            <h4 className="font-bold text-slate-200 text-sm mb-3">Training Modules</h4>
            <ul className="space-y-2">
              <li><Link to="/learn" className="hover:text-brand-400 transition">What is Phishing?</Link></li>
              <li><Link to="/learn" className="hover:text-brand-400 transition">Email & Smishing Safety</Link></li>
              <li><Link to="/fake-website-training" className="hover:text-brand-400 transition">Fake Website Detection</Link></li>
              <li><Link to="/detect" className="hover:text-brand-400 transition">Phishing Message Detector</Link></li>
              <li><Link to="/safety" className="hover:text-brand-400 transition">10 Golden Safety Rules</Link></li>
            </ul>
          </div>

          {/* Col 3: Awareness Campaign */}
          <div>
            <h4 className="font-bold text-slate-200 text-sm mb-3">Awareness & Testing</h4>
            <ul className="space-y-2">
              <li><Link to="/quiz" className="hover:text-brand-400 transition">15-Question Security Quiz</Link></li>
              <li><Link to="/posters" className="hover:text-brand-400 transition">Awareness Poster Gallery</Link></li>
              <li><Link to="/progress" className="hover:text-brand-400 transition">My Progress Dashboard</Link></li>
              <li><Link to="/campaign" className="hover:text-brand-400 transition">Campaign Strategy</Link></li>
              <li><Link to="/about" className="hover:text-brand-400 transition">About the Project</Link></li>
            </ul>
          </div>

          {/* Col 4: Project Info & Disclaimer */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 text-sm">Academic Project</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Developed for the college campaign project:
              <strong className="block text-slate-300 mt-1">“Phishing Awareness Campaign Development”</strong>
            </p>
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-amber-300/80 text-[10px] leading-snug flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Disclaimer:</strong> This application is strictly an educational awareness platform. All scenarios use fictional examples.
              </span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 PhishGuard. All rights reserved. Built with React, TypeScript & Express API.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-400">Project Overview</Link>
            <span>•</span>
            <Link to="/campaign" className="hover:text-slate-400">Campaign Objectives</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
