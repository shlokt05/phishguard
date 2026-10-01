import React, { useState } from 'react';
import { Shield, Search, AlertCircle, CheckCircle, ExternalLink, HelpCircle, Lock, Monitor, ArrowRight, AlertOctagon } from 'lucide-react';
import { UrlAnalyzer } from '../components/UrlAnalyzer';
import { FlowDiagram } from '../components/FlowDiagram';
import { apiService } from '../services/api';

export const FakeWebsiteTraining: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<number, string>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState<Record<number, boolean>>({});
  const [challengeScore, setChallengeScore] = useState<number>(0);

  const lessons = [
    { num: 1, title: "1. What is a Fake Website?" },
    { num: 2, title: "2. How Fake Websites Work" },
    { num: 3, title: "3. How to Detect Fake Sites" },
    { num: 4, title: "4. URL & Domain Analyzer" },
    { num: 5, title: "5. Visual Red Flags" },
    { num: 6, title: "6. What To Do Next" },
    { num: 7, title: "7. Detection Challenge" },
  ];

  const detectionScenarios = [
    {
      id: 1,
      title: "Scenario 1: Fictional University Portal",
      url: "https://student-portal.campus-login-auth.example",
      description: "You receive an email asking you to re-verify your student ID for fall semester enrollment.",
      isPhishing: true,
      correctChoice: "SUSPICIOUS",
      warningIndicators: [
        "Domain ends in 'campus-login-auth.example' instead of official '.edu' domain",
        "Subdomain prepends 'student-portal' to mislead users",
        "Unsolicited credential verification requirement"
      ],
      explanation: "SUSPICIOUS: Official university portals use verified '.edu' domains. The root domain here is 'campus-login-auth.example'."
    },
    {
      id: 2,
      title: "Scenario 2: E-Commerce Storefront",
      url: "https://www.example-store.com/checkout",
      description: "You navigate directly to an online shop to buy textbooks. The connection shows HTTPS with a valid certificate.",
      isPhishing: false,
      correctChoice: "SAFE",
      warningIndicators: [],
      explanation: "SAFE: Domain matches official registered domain name without unexpected subdomains or hyphenation tricks."
    },
    {
      id: 3,
      title: "Scenario 3: Bank Support Warning",
      url: "http://example-bank.security-check.example/auth",
      description: "SMS alert states your debit card is blocked. Link opens an unencrypted HTTP login page asking for PIN & Password.",
      isPhishing: true,
      correctChoice: "SUSPICIOUS",
      warningIndicators: [
        "Unencrypted HTTP connection (No SSL/TLS)",
        "Deceptive root domain 'security-check.example'",
        "Requests card PIN number over web form"
      ],
      explanation: "SUSPICIOUS: Banks never request card PINs via web forms, nor do they use unencrypted HTTP links."
    },
    {
      id: 4,
      title: "Scenario 4: Streaming Service Renewal",
      url: "https://pay-stream.account-billing-update.example",
      description: "Email claims monthly billing failed. Prompt asks for credit card number to avoid subscription cancellation.",
      isPhishing: true,
      correctChoice: "SUSPICIOUS",
      warningIndicators: [
        "Artificial deadline pressure ('avoid cancellation')",
        "Fake domain structure",
        "Requests credit card re-entry via third-party URL"
      ],
      explanation: "SUSPICIOUS: The domain is 'account-billing-update.example'. Always check billing status directly inside the official app."
    },
    {
      id: 5,
      title: "Scenario 5: Government Tax Refund",
      url: "https://tax-refund-claim.example/gov",
      description: "Message states you are eligible for an immediate $350 tax refund upon entering bank account details.",
      isPhishing: true,
      correctChoice: "SUSPICIOUS",
      warningIndicators: [
        "Government refunds are never issued via unexpected web link forms",
        "Generic top-level domain '.example' instead of official government domain",
        "Promises immediate money in exchange for banking credentials"
      ],
      explanation: "SUSPICIOUS: Government agencies communicate official tax refunds through official postal mail or secure portals, never direct web link forms."
    }
  ];

  const handleSelectAnswer = (scenarioId: number, choice: string) => {
    setChallengeAnswers(prev => ({ ...prev, [scenarioId]: choice }));
  };

  const handleCheckScenario = (scenario: typeof detectionScenarios[0]) => {
    const userChoice = challengeAnswers[scenario.id];
    if (!userChoice) return;

    setChallengeSubmitted(prev => ({ ...prev, [scenario.id]: true }));
    const isCorrect = userChoice === scenario.correctChoice;

    if (isCorrect) {
      setChallengeScore(prev => prev + 1);
    }

    apiService.saveDetectionResult(scenario.id.toString(), userChoice, isCorrect);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-bold text-brand-400">
          <Monitor className="w-4 h-4" /> Comprehensive Cyber Defense Lesson
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          FAKE WEBSITE DETECTION TRAINING
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Fraudulent websites imitate legitimate organizations to steal sensitive credentials and payment data. Learn how to inspect domains, recognize visual red flags, and test your detection skills.
        </p>
      </div>

      {/* LESSON NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 custom-scrollbar">
        {lessons.map(tab => (
          <button
            key={tab.num}
            onClick={() => setActiveTab(tab.num)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.num
                ? 'bg-gradient-to-r from-brand-600 to-shield-dark text-white shadow-md shadow-brand-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* LESSON CONTENT CONTAINERS */}

      {/* LESSON 1 */}
      {activeTab === 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-brand-400">LESSON 1:</span> What is a Fake Website?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-5 rounded-2xl border border-slate-800">
            A fake website (or phishing site) is a deceptive web portal created by cybercriminals to closely mirror an official website (such as your bank, college portal, email provider, or social network). The primary objective is to trick visitors into entering confidential information like usernames, passwords, credit card details, or One-Time Passwords (OTPs).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-brand-400">Visual Similarity</h4>
              <p className="text-slate-400 leading-relaxed">Attackers copy CSS styles, high-resolution logos, and form layouts directly from genuine sites to build trust.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-brand-400">Domain Deception</h4>
              <p className="text-slate-400 leading-relaxed">While the page looks identical, the underlying web address (URL) in the address bar belongs to the attacker.</p>
            </div>
          </div>
        </div>
      )}

      {/* LESSON 2 */}
      {activeTab === 2 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-400">LESSON 2:</span> How Fake Websites Work
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Understanding the step-by-step lifecycle of a fake website trap allows users to spot warning signs early.
            </p>
          </div>
          <FlowDiagram />
        </div>
      )}

      {/* LESSON 3 */}
      {activeTab === 3 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-brand-400">LESSON 3:</span> How to Detect a Fake Website
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              { title: "Check Domain Name", desc: "Look closely at the root domain right before .com/.org/.edu. Ensure it matches the legitimate brand name exactly." },
              { title: "Check Spelling & Typos", desc: "Watch out for character swaps (e.g. paypa1.com, g00gle.com, bankk.com)." },
              { title: "Check Subdomains", desc: "Scammers place brand names inside subdomains (e.g. company.com.attacker-site.com). The last part is the true domain." },
              { title: "Check Full URL Structure", desc: "Inspect the entire URL path for strange parameters or long string obfuscation." },
              { title: "Verify Organization", desc: "Cross-reference the site address using an independent search engine." },
              { title: "Suspicious Login Demands", desc: "Be suspicious when asked to re-login unexpectedly while browsing." },
              { title: "Suspicious Payment Demands", desc: "Be extremely wary if a site asks for unusual payment forms like gift cards." },
              { title: "Watch for Urgent Language", desc: "Phrases like 'Account Closed in 1 Hour' force emotional panic." }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  {item.title}
                </h4>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CRITICAL SPECIFICATION NOTE ON HTTPS */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed space-y-1">
            <h4 className="font-extrabold text-amber-400 flex items-center gap-2 uppercase tracking-wider text-[11px]">
              <Lock className="w-4 h-4" /> Crucial Security Warning: HTTPS & SSL
            </h4>
            <p className="font-medium">
              “HTTPS indicates an encrypted connection between your browser and the website server, but HTTPS alone does NOT prove that a website is legitimate.”
            </p>
            <p className="text-[11px] text-slate-400">
              Cybercriminals easily obtain free HTTPS certificates for malicious domains. Always check the domain name!
            </p>
          </div>
        </div>
      )}

      {/* LESSON 4 */}
      {activeTab === 4 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-400">LESSON 4:</span> URL / DOMAIN ANALYSIS
            </h2>
            <p className="text-xs text-slate-300">
              Test domain structures interactively to identify subdomains, typosquatting, and suspicious word patterns.
            </p>
          </div>
          <UrlAnalyzer />
        </div>
      )}

      {/* LESSON 5 */}
      {activeTab === 5 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-brand-400">LESSON 5:</span> VISUAL RED FLAGS (Legitimate vs Suspicious)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            {/* Legitimate Mockup */}
            <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> LEGITIMATE WEBSITE
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">Official</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-[11px] text-slate-300 border border-slate-800">
                https://www.official-bank.com/login
              </div>
              <div className="space-y-2 text-slate-300">
                <p>✓ Clean registered domain matching company brand</p>
                <p>✓ Standard 2FA prompt during login process</p>
                <p>✓ Clear contact information and privacy policy links</p>
                <p>✓ No urgent threats of immediate account deletion</p>
              </div>
            </div>

            {/* Suspicious Mockup */}
            <div className="bg-slate-950 border border-rose-500/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4" /> SUSPICIOUS WEBSITE
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px]">Phishing Risk</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-[11px] text-rose-400 border border-rose-500/30">
                http://official-bank.verify-secure-auth.example/login
              </div>
              <div className="space-y-2 text-slate-300">
                <p>⚠️ Unencrypted HTTP connection or fake subdomain prefix</p>
                <p>⚠️ Prompts to enter SMS OTP code directly on screen</p>
                <p>⚠️ Asks for full credit card PIN or CVV number</p>
                <p>⚠️ Flashing banner: 'Account locked within 15 mins!'</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* LESSON 6 */}
      {activeTab === 6 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-brand-400">LESSON 6:</span> WHAT TO DO IF YOU FIND A SUSPICIOUS WEBSITE
          </h2>
          <p className="text-xs text-slate-300">Follow these 9 immediate protective steps whenever you encounter a deceptive page:</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {[
              "1. Do not enter credentials.",
              "2. Do not enter OTP codes.",
              "3. Do not enter payment information.",
              "4. Do not download unknown files.",
              "5. Close the browser page immediately.",
              "6. Access organization via known official web app.",
              "7. Change credentials immediately if typed.",
              "8. Enable 2-Factor Authentication (2FA).",
              "9. Report suspicious link to IT / Security."
            ].map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-bold text-slate-200">
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LESSON 7 - DETECTION CHALLENGE */}
      {activeTab === 7 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-brand-400">LESSON 7:</span> FAKE WEBSITE DETECTION CHALLENGE
              </h2>
              <p className="text-xs text-slate-400 mt-1">Evaluate 5 fictional scenarios and decide if you would trust the website.</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-brand-400">
              Challenge Score: {challengeScore} / 5
            </div>
          </div>

          <div className="space-y-8">
            {detectionScenarios.map((scenario) => {
              const userChoice = challengeAnswers[scenario.id];
              const isSubmitted = challengeSubmitted[scenario.id];
              const isCorrect = userChoice === scenario.correctChoice;

              return (
                <div key={scenario.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <h3 className="font-bold text-sm text-white">{scenario.title}</h3>
                    <span className="font-mono text-[11px] text-brand-400">{scenario.url}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{scenario.description}</p>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400">Would you trust this website?</label>
                    <div className="flex flex-wrap gap-3">
                      {['SAFE', 'SUSPICIOUS', 'NEED MORE VERIFICATION'].map((option) => (
                        <button
                          key={option}
                          disabled={isSubmitted}
                          onClick={() => handleSelectAnswer(scenario.id, option)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                            userChoice === option
                              ? 'bg-brand-500 text-white border-brand-400'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {!isSubmitted && (
                    <button
                      onClick={() => handleCheckScenario(scenario)}
                      disabled={!userChoice}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-shield-dark text-white text-xs font-bold disabled:opacity-50"
                    >
                      Submit Answer
                    </button>
                  )}

                  {isSubmitted && (
                    <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}>
                      <div className="font-bold text-sm">
                        {isCorrect ? '✓ Correct Assessment!' : '✗ Incorrect Assessment'}
                      </div>
                      <p>{scenario.explanation}</p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
