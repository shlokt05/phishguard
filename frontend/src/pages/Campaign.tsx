import React from 'react';
import { Target, Users, BookOpen, TrendingUp, Shield } from 'lucide-react';

export const Campaign: React.FC = () => {
  const targetAudiences = [
    { title: "College Students", desc: "Navigating academic portals, student emails, financial aid alerts, and campus social groups." },
    { title: "Corporate Employees", desc: "Protecting organization networks against spear-phishing, business email compromise (BEC), and wire scams." },
    { title: "Social Media Users", desc: "Safeguarding DMs, preventing account hijacking, and recognizing fake giveaway contests." },
    { title: "General Internet Users", desc: "Recognizing e-commerce fraud, delivery smishing texts, and tech support pop-ups." }
  ];

  const campaignMethods = [
    { title: "Interactive Training", desc: "10 modular topics breaking down technical attack vectors into plain language." },
    { title: "Knowledge Quiz Engine", desc: "15 multiple-choice questions evaluating conceptual comprehension." },
    { title: "Detection Simulator", desc: "Scenario-based exercises analyzing realistic phishing messages and fake sites." },
    { title: "Visual Poster Campaign", desc: "Original downloadable poster artwork promoting constant vigilance." },
    { title: "Safety Checklist", desc: "Self-assessment tool reinforcing 10 golden cybersecurity rules." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-bold text-brand-400">
          <Target className="w-4 h-4" /> Academic Campaign Strategy
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          PHISHING AWARENESS CAMPAIGN
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Comprehensive project framework designed to educate digital citizens and systematically reduce successful social engineering attacks.
        </p>
      </div>

      {/* OBJECTIVE BOX */}
      <div className="bg-gradient-to-r from-brand-900/60 via-slate-900 to-shield-dark/40 border border-brand-500/30 rounded-3xl p-8 space-y-3 shadow-xl">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-300">Primary Objective</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          “To educate users about phishing threats and encourage safer digital behavior.”
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed pt-2">
          By combining theoretical modules, interactive simulation tools, and visual collateral, the PhishGuard campaign empowers users to transform from vulnerable targets into active cybersecurity defenders.
        </p>
      </div>

      {/* TARGET AUDIENCE */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <Users className="w-5 h-5 text-brand-400" /> Target Audience Demographics
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetAudiences.map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2 hover:border-brand-500/40 transition">
              <h3 className="font-extrabold text-white text-base">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CAMPAIGN METHODS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <BookOpen className="w-5 h-5 text-brand-400" /> Campaign Execution Methods
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {campaignMethods.map((method, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
              <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">Method 0{idx + 1}</div>
              <h3 className="font-bold text-white text-sm">{method.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{method.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* EXPECTED IMPACT */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> Expected Campaign Impact
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 text-sm">Reduced Click-Through Rates</h4>
            <p className="text-slate-400 leading-relaxed">
              Users trained on URL structure analysis and domain verification exhibit a 70%+ reduction in clicking untrusted links.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-brand-400 text-sm">Zero OTP Surrender</h4>
            <p className="text-slate-400 leading-relaxed">
              Reinforcing OTP secrecy eliminates credential bypass attacks conducted over phone calls or fake login pages.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-purple-400 text-sm">Active Threat Reporting</h4>
            <p className="text-slate-400 leading-relaxed">
              Encouraging reporting protocols turns everyday internet users into proactive sensors who report suspicious campaigns quickly.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
