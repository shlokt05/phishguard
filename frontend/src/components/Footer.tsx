import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, AlertTriangle, ExternalLink, Crosshair } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0E17] border-t border-white/10 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-black text-base text-white tracking-wider font-sans">
                PHISH<span className="text-emerald-400">GUARD</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-sans">
              Tactical Cybersecurity & Phishing Defense Platform. Think Before You Click.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#131B2A] border border-white/10 text-[10px] font-mono text-emerald-400">
              <Lock className="w-3 h-3 text-emerald-400" /> DEFENSE INTELLIGENCE
            </div>
          </div>

          {/* Col 2: Training & Modules */}
          <div>
            <h4 className="font-bold text-slate-200 text-sm mb-3 font-sans">Training & Threat Lab</h4>
            <ul className="space-y-2">
              <li><Link to="/threat-lab" className="hover:text-emerald-400 transition flex items-center gap-1"><Crosshair className="w-3 h-3 text-emerald-400" /> Real vs. Fake Threat Lab</Link></li>
              <li><Link to="/learn" className="hover:text-emerald-400 transition">Interactive Curriculum</Link></li>
              <li><Link to="/fake-website-training" className="hover:text-emerald-400 transition">Fake Website Training</Link></li>
              <li><Link to="/detect" className="hover:text-emerald-400 transition">Message Detection Simulator</Link></li>
              <li><Link to="/safety" className="hover:text-emerald-400 transition">10 Golden Defense Rules</Link></li>
            </ul>
          </div>

          {/* Col 3: Awareness Campaign */}
          <div>
            <h4 className="font-bold text-slate-200 text-sm mb-3 font-sans">Awareness & Testing</h4>
            <ul className="space-y-2">
              <li><Link to="/quiz" className="hover:text-emerald-400 transition">Security Assessment Quiz</Link></li>
              <li><Link to="/posters" className="hover:text-emerald-400 transition">Visual Threat Breakdowns</Link></li>
              <li><Link to="/progress" className="hover:text-emerald-400 transition">Progress Dashboard</Link></li>
              <li><Link to="/campaign" className="hover:text-emerald-400 transition">Campaign Strategy</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition">About the Project</Link></li>
            </ul>
          </div>

          {/* Col 4: Project Info & Disclaimer */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 text-sm font-sans">Academic Defense Project</h4>
            <p className="text-slate-400 leading-relaxed text-[11px] font-sans">
              Developed for the cybersecurity campaign:
              <strong className="block text-slate-300 mt-1 font-mono">“Phishing Awareness Campaign Development”</strong>
            </p>
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-amber-300/80 text-[10px] leading-snug flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Educational Notice:</strong> All threat scenarios and web clone replicas are simulated safe forensic environments.
              </span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>© 2026 PhishGuard. Tactical Cybersecurity Platform.</p>
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

export default Footer;
