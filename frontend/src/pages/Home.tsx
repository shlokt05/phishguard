import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, Search, Lock, Award, ArrowRight, CheckCircle, AlertOctagon, Eye, MousePointerClick, ChevronRight } from 'lucide-react';
import { apiService } from '../services/api';
import { Poster } from '../types';
import { PosterModal } from '../components/PosterModal';

export const Home: React.FC = () => {
  const [featuredPosters, setFeaturedPosters] = useState<Poster[]>([]);
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);

  useEffect(() => {
    apiService.getPosters().then(posters => {
      setFeaturedPosters(posters.slice(0, 3));
    });
  }, []);

  const whyMatters = [
    {
      title: "Protect Personal Information",
      desc: "Safeguard your identity, credentials, social security, and financial records from unauthorized access.",
      icon: Shield,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Identify Fake Messages",
      desc: "Learn to spot deceptive emails, spoofed sender headers, and urgent phishing tactics before interacting.",
      icon: Eye,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Avoid Online Scams",
      desc: "Recognize tech support impersonation, gift card demands, fake job offers, and marketplace fraud.",
      icon: AlertOctagon,
      color: "from-amber-500 to-red-500"
    },
    {
      title: "Secure Your Accounts",
      desc: "Master multi-factor authentication, strong passphrases, and routine credential hygiene.",
      icon: Lock,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const stats = [
    { label: "Learning Topics", value: "10+", icon: BookOpen },
    { label: "Quiz Questions", value: "15+", icon: Award },
    { label: "Detection Challenges", value: "5+", icon: Search },
    { label: "Safety Rules", value: "10", icon: CheckCircle }
  ];

  const howPhishGuardHelps = [
    {
      title: "LEARN",
      desc: "Interactive training modules covering Phishing, Smishing, Vishing, Passwords, and OTP Safety.",
      link: "/learn",
      badge: "10 Modules"
    },
    {
      title: "DETECT",
      desc: "Analyze realistic fictional phishing emails, SMS texts, and fake website mockups safely.",
      link: "/detect",
      badge: "Real Scenarios"
    },
    {
      title: "PROTECT",
      desc: "Adopt 10 golden safety rules and test yourself with our 'Before You Click' interactive checklist.",
      link: "/safety",
      badge: "Checklist"
    },
    {
      title: "TEST",
      desc: "Evaluate your readiness with our 15-question comprehensive quiz and track your score progress.",
      link: "/quiz",
      badge: "15 Questions"
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-brand-500/30 text-xs font-semibold text-brand-300 shadow-inner">
            <Shield className="w-4 h-4 text-brand-400" />
            <span>Phishing Awareness Campaign Development</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-none">
              PHISH<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-shield-light to-brand-500">GUARD</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-brand-300 tracking-wider uppercase">
              THINK BEFORE YOU CLICK
            </p>
            <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-400 uppercase">
              “Learn • Detect • Protect • Respond”
            </p>
          </div>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Build your phishing awareness skills and learn how to recognize suspicious emails, messages, websites and online scams. Protect your digital identity with confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/learn"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-shield-dark font-bold text-sm text-white hover:opacity-90 transition shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 group"
            >
              START LEARNING
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/quiz"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-800 font-bold text-sm text-slate-200 hover:bg-slate-800 hover:text-white transition flex items-center justify-center gap-2"
            >
              TEST YOUR KNOWLEDGE
            </Link>
          </div>

        </div>
      </section>

      {/* WHY PHISHING AWARENESS MATTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            WHY PHISHING AWARENESS MATTERS
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Human vigilance is the most crucial defense layer against cyber deception tactics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyMatters.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-brand-500/40 transition duration-200 group space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-white">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* STATISTICS */}
      <section className="bg-slate-900/50 border-y border-slate-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className="space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-2">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW PHISHGUARD HELPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            HOW PHISHGUARD HELPS
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Our structured 4-stage learning methodology transforms internet users into defensive security experts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howPhishGuardHelps.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-brand-500/50 transition duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">0{idx + 1}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-400 px-2 py-0.5 rounded-full border border-brand-500/20">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-black text-xl text-white tracking-wide group-hover:text-brand-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-2 flex items-center text-xs font-bold text-brand-400 group-hover:translate-x-1 transition-transform">
                <span>Explore {item.title}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SPREAD AWARENESS FEATURED POSTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              SPREAD AWARENESS
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Download and share original educational awareness posters in your college or workplace.
            </p>
          </div>
          <Link
            to="/posters"
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-brand-400 flex items-center gap-1.5 transition"
          >
            VIEW ALL POSTERS <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosters.map((poster) => (
            <div
              key={poster.id}
              onClick={() => setSelectedPoster(poster)}
              className={`cursor-pointer rounded-2xl p-6 bg-gradient-to-br ${poster.bg_gradient} border border-white/10 shadow-xl flex flex-col justify-between aspect-[4/3] text-white hover:scale-[1.02] transition-transform duration-200 group relative overflow-hidden`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">
                  {poster.category}
                </span>
                <Shield className="w-5 h-5 text-white/80" />
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-lg uppercase tracking-tight">{poster.title}</h3>
                <p className="text-xs text-white/80 line-clamp-2">"{poster.tagline}"</p>
              </div>

              <div className="pt-2 text-[11px] font-bold text-brand-300 flex items-center gap-1">
                <span>Click to Preview & Download</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Poster Modal Viewer */}
      <PosterModal poster={selectedPoster} onClose={() => setSelectedPoster(null)} />

    </div>
  );
};
