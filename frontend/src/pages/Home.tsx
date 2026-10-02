import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Crosshair, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  ChevronRight, 
  Activity, 
  Terminal, 
  Lock, 
  Unlock, 
  Flame, 
  Cpu, 
  Radio, 
  Sliders, 
  ArrowUpRight,
  BookOpen,
  CheckSquare,
  Sparkles,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { THREAT_BREAKDOWN_DATA, ThreatBreakdownCard } from './Posters';
import { PosterModal } from '../components/PosterModal';

interface LiveBulletin {
  id: string;
  timestamp: string;
  sector: 'BANKING' | 'LOGISTICS' | 'E-COMMERCE' | 'UTILITY' | 'TELECOM' | 'EMPLOYMENT';
  severity: 'CRITICAL' | 'HIGH' | 'ELEVATED';
  title: string;
  summary: string;
  iocIndicator: string;
  takeaway: string;
  associatedThreatId: string;
}

const LIVE_BULLETINS: LiveBulletin[] = [
  {
    id: 'ADV-2026-081',
    timestamp: '14 MIN AGO',
    sector: 'BANKING',
    severity: 'CRITICAL',
    title: 'Pan-India SBI/HDFC KYC Expiration SMS Wave Active',
    summary: 'Automated smishing campaign targeting retail accountholders with bogus 24-hour PAN block notices.',
    iocIndicator: 'sbi-kyc-pan-update.top / VM-SBIINB header spoof',
    takeaway: 'Banks under RBI mandate NEVER solicit 4-digit ATM PINs or profile passwords on web links.',
    associatedThreatId: 'threat-bank-kyc'
  },
  {
    id: 'ADV-2026-080',
    timestamp: '42 MIN AGO',
    sector: 'LOGISTICS',
    severity: 'CRITICAL',
    title: 'Fake India Post "Consignment Address Update" SMS Sideloading Trojan',
    summary: 'SMS notices regarding undelivered parcels demanding ₹10 re-route fees and downloading malware APKs.',
    iocIndicator: 'indiapost-track.support / IndiaPost_Assistant_v3.apk',
    takeaway: 'Postal authorities never distribute Android .apk files via SMS or WhatsApp.',
    associatedThreatId: 'threat-delivery-apk'
  },
  {
    id: 'ADV-2026-079',
    timestamp: '2 HOURS AGO',
    sector: 'E-COMMERCE',
    severity: 'HIGH',
    title: 'Counterfeit Amazon/Flipkart ₹99 Flash Clearance Clones Circulating',
    summary: 'Counterfeit storefronts deployed with artificial 180-second countdown clocks and personal UPI payment handles.',
    iocIndicator: 'amazon-mega-loot-festival.xyz / pay-instant-claim@upi',
    takeaway: 'Zero consumer escrow: Sending money to personal VPAs offers zero refund recourse.',
    associatedThreatId: 'threat-mega-deal'
  },
  {
    id: 'ADV-2026-078',
    timestamp: '5 HOURS AGO',
    sector: 'UTILITY',
    severity: 'HIGH',
    title: 'Discom Power Disconnection Notice Scams Demanding Remote Screen-Share',
    summary: 'Fake state electricity board SMS alerts threatening power cutoff at 9:30 PM, coercing installation of AnyDesk.',
    iocIndicator: '+91-9876543210 (Unregistered Mobile) / AnyDesk Remote Port',
    takeaway: 'Discoms require statutory 15-day written notices before service suspension.',
    associatedThreatId: 'threat-utility-disconnection'
  },
  {
    id: 'ADV-2026-077',
    timestamp: 'YESTERDAY',
    sector: 'EMPLOYMENT',
    severity: 'ELEVATED',
    title: 'Telegram YouTube "Like & Earn" Advance Fee Recruitment Scheme',
    summary: 'Unsolicited WhatsApp recruiter DMs offering ₹500 initial payouts to trap victims into high-value crypto tasks.',
    iocIndicator: 't.me/vip-task-lounge-in / TRC-20 USDT Deposit Address',
    takeaway: 'Initial payout is psychological bait; withdrawals are permanently locked after capital deposit.',
    associatedThreatId: 'threat-task-job'
  }
];

export const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Selected threat modal state
  const [selectedThreat, setSelectedThreat] = useState<ThreatBreakdownCard | null>(null);

  // Inspector quick-tool state
  const [inspectorInput, setInspectorInput] = useState<string>('');
  const [inspectorResult, setInspectorResult] = useState<{
    testedInput: string;
    protocol: string;
    domain: string;
    tld: string;
    verdict: 'CRITICAL' | 'SUSPICIOUS' | 'NEUTRAL';
    findings: string[];
    recommendation: string;
  } | null>(null);

  // User readiness metric state
  const [readinessScore, setReadinessScore] = useState<number>(85);
  const [scenariosSolved, setScenariosSolved] = useState<number>(18);
  const [totalScenarios, setTotalScenarios] = useState<number>(20);
  const [redFlagsCaught, setRedFlagsCaught] = useState<number>(42);
  const [streakDays, setStreakDays] = useState<number>(5);

  useEffect(() => {
    apiService.getUserProgress().then(data => {
      if (data) {
        if (data.quiz_best_percentage) {
          setReadinessScore(Math.max(75, Math.min(96, Math.round(data.quiz_best_percentage))));
        }
        if (data.detection_correct_count) {
          setScenariosSolved(Math.max(14, data.detection_correct_count * 3));
        }
      }
    }).catch(() => {
      // Use defaults
    });
  }, []);

  const handleRunScan = (textToScan: string) => {
    const raw = textToScan.trim();
    if (!raw) return;

    let urlLike = raw;
    if (!urlLike.startsWith('http://') && !urlLike.startsWith('https://')) {
      if (urlLike.includes('.') && !urlLike.includes(' ')) {
        urlLike = 'https://' + urlLike;
      }
    }

    let protocol = 'N/A';
    let domain = 'RAW_MESSAGE_SNIPPET';
    let tld = 'N/A';
    const findings: string[] = [];
    let riskLevel: 'CRITICAL' | 'SUSPICIOUS' | 'NEUTRAL' = 'NEUTRAL';

    const isUrl = urlLike.startsWith('http://') || urlLike.startsWith('https://');

    if (isUrl) {
      try {
        const parsed = new URL(urlLike);
        protocol = parsed.protocol;
        domain = parsed.hostname;
        const parts = domain.split('.');
        if (parts.length >= 2) {
          tld = '.' + parts[parts.length - 1];
        }

        if (protocol === 'http:') {
          findings.push('Unencrypted transmission protocol (Plaintext HTTP).');
          riskLevel = 'SUSPICIOUS';
        }

        const highRiskTlds = ['.xyz', '.top', '.support', '.buzz', '.work', '.click', '.site', '.club'];
        if (highRiskTlds.includes(tld.toLowerCase())) {
          findings.push(`High-abuse Top-Level Domain detected: ${tld}`);
          riskLevel = 'CRITICAL';
        }

        if (parts.length > 3) {
          findings.push(`Excessive subdomains (${parts.length - 2} levels) indicative of brand cloaking.`);
          riskLevel = 'CRITICAL';
        }

        const brands = ['amazon', 'sbi', 'hdfc', 'flipkart', 'indiapost', 'google', 'microsoft'];
        const matchedBrand = brands.find(b => domain.toLowerCase().includes(b));
        if (matchedBrand) {
          const trusted = ['amazon.in', 'amazon.com', 'onlinesbi.sbi', 'hdfcbank.com', 'flipkart.com', 'indiapost.gov.in'];
          const isTrusted = trusted.some(t => domain.toLowerCase().endsWith(t));
          if (!isTrusted) {
            findings.push(`Typosquatting/Brand Spoofing: Contains "${matchedBrand}" but destination domain is unauthorized.`);
            riskLevel = 'CRITICAL';
          }
        }
      } catch (e) {
        domain = raw.split('/')[0] || raw;
      }
    }

    // Keyword heuristics across message text or URL
    const lower = raw.toLowerCase();
    const urgentKeywords = ['blocked', 'suspend', 'expire', 'kyc', 'pan', 'urgent', '₹99', 'lottery', 'winner', 'apk', 'pin'];
    const hitKeywords = urgentKeywords.filter(k => lower.includes(k));

    if (hitKeywords.length > 0) {
      findings.push(`Urgency / Extortion Lexicon Triggered: [${hitKeywords.join(', ')}]`);
      if (riskLevel === 'NEUTRAL') riskLevel = 'SUSPICIOUS';
    }

    if (lower.includes('.apk') || lower.includes('download')) {
      findings.push('Out-of-store application (.apk) installation prompt identified.');
      riskLevel = 'CRITICAL';
    }

    if (lower.includes('@upi') || lower.includes('@ybl') || lower.includes('@okhdfcbank')) {
      findings.push('Direct raw individual UPI Virtual Payment Address (VPA) detected.');
      riskLevel = 'CRITICAL';
    }

    if (findings.length === 0) {
      findings.push('No obvious high-confidence heuristic IOC signatures detected in sample string.');
      findings.push('Verification Note: Always cross-reference sender authenticity through out-of-band channels.');
    }

    setInspectorResult({
      testedInput: raw,
      protocol,
      domain,
      tld,
      verdict: riskLevel,
      findings,
      recommendation: riskLevel === 'CRITICAL'
        ? 'MALICIOUS ATTACK PATTERN: Do not open link, do not enter credentials, and do not authorize payment.'
        : riskLevel === 'SUSPICIOUS'
        ? 'ELEVATED SUSPICION: Verify through official customer service channels before interacting.'
        : 'LOW IMMEDIATE RISK: Maintain routine defensive posture and verify sender legitimacy.'
    });
  };

  const handleOpenBulletinModal = (bulletin: LiveBulletin) => {
    const foundCard = THREAT_BREAKDOWN_DATA.find(t => t.id === bulletin.associatedThreatId) || THREAT_BREAKDOWN_DATA[0];
    setSelectedThreat(foundCard);
  };

  return (
    <div className="bg-[#0A0E17] text-slate-100 min-h-screen space-y-8 pb-16 font-sans">
      
      {/* ============================================================== */}
      {/* 1. TOP SYSTEM TELEMETRY & SOC HEADER                           */}
      {/* ============================================================== */}
      <section className="border-b border-white/[0.08] bg-[#111827]/60 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          
          {/* Left: Brand Identity & Active Pulse */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono font-bold text-emerald-400 tracking-wider">
                ● SYSTEM OPERATIONAL
              </span>
            </div>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <div className="font-mono text-[11px] text-slate-400 tracking-wide hidden sm:block">
              SECURITY SUITE // ENGINE v1.4.2 // HEURISTICS ACTIVE
            </div>
          </div>

          {/* Right: Operator Profile & Node Parameters */}
          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
            <div className="hidden lg:flex items-center gap-3 text-slate-500">
              <span>LATENCY: <strong className="text-slate-300">14ms</strong></span>
              <span>•</span>
              <span>DEFCON: <strong className="text-emerald-400 font-bold">NORMAL</strong></span>
              <span>•</span>
              <span>LOCALE: <strong className="text-slate-300">IN_DLT</strong></span>
            </div>

            {/* Operator Identifier Badge */}
            <div className="flex items-center gap-2 bg-[#0A0E17] border border-white/[0.08] px-3 py-1 rounded-lg">
              <div className="w-5 h-5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                {user?.name?.charAt(0).toUpperCase() || 'O'}
              </div>
              <span className="text-slate-200 font-semibold truncate max-w-[130px]">
                {user?.name || 'Operator'}
              </span>
              <span className="text-[9px] bg-slate-800 text-slate-400 px-1 rounded font-mono">
                SEC-ID
              </span>
            </div>
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-2">

        {/* ============================================================== */}
        {/* 2. SECURITY READINESS CARD (SOC METRIC OVERVIEW)              */}
        {/* ============================================================== */}
        <section className="bg-[#111827] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle grid background trace */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left: Tactical Readiness Gauge & Narrative */}
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-400">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>OPERATIONAL CYBER READINESS AUDIT</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                  Defense Posture Telemetry
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Continuous heuristic evaluation of user phishing detection accuracy, credential hygiene, and brand spoofing resistance.
                </p>
              </div>

              {/* Engineered Progress Bar */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Phishing Defense Readiness</span>
                  <span className="text-emerald-400 font-black text-base">{readinessScore}%</span>
                </div>
                
                <div className="w-full h-3 bg-[#0A0E17] border border-white/[0.08] rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out shadow-sm shadow-emerald-500/50"
                    style={{ width: `${readinessScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>BASELINE (60%)</span>
                  <span>PROFICIENT (80%)</span>
                  <span className="text-emerald-400 font-bold">HARDENED (100%)</span>
                </div>
              </div>
            </div>

            {/* Right: SOC Stats Matrix & Direct Action CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 lg:min-w-[340px]">
              
              {/* Stats Row Cards */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-[#0A0E17] border border-white/[0.08] p-3 rounded-xl space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Solved</div>
                  <div className="text-lg font-black font-mono text-white">{scenariosSolved}/{totalScenarios}</div>
                  <div className="text-[9px] font-mono text-slate-500">Scenarios</div>
                </div>

                <div className="bg-[#0A0E17] border border-white/[0.08] p-3 rounded-xl space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Red Flags</div>
                  <div className="text-lg font-black font-mono text-rose-400">{redFlagsCaught}</div>
                  <div className="text-[9px] font-mono text-slate-500">Uncovered</div>
                </div>

                <div className="bg-[#0A0E17] border border-white/[0.08] p-3 rounded-xl space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Streak</div>
                  <div className="text-lg font-black font-mono text-emerald-400">{streakDays}d</div>
                  <div className="text-[9px] font-mono text-slate-500">Consistent</div>
                </div>
              </div>

              {/* Direct Action Drill Button */}
              <button
                onClick={() => navigate('/detect')}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2.5 transition duration-150 shadow-lg shadow-emerald-500/20 tracking-wider uppercase group"
              >
                <Crosshair className="w-4 h-4 text-slate-950 group-hover:rotate-45 transition-transform" />
                <span>Launch Daily Threat Drill</span>
                <ChevronRight className="w-4 h-4 text-slate-950" />
              </button>

            </div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. PRIMARY OPERATIONS GRID (2x2 SOC TERMINAL MODULES)         */}
        {/* ============================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                OPERATIONAL APPARATUS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Primary Security Modules
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              GRID // 4 ENGINES ONLINE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* MODULE 1: THREAT SIMULATION LAB */}
            <div className="bg-[#111827] border border-white/[0.08] hover:border-white/20 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5 transition group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0A0E17] border border-white/[0.08] flex items-center justify-center text-emerald-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">MOD_01</span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    INTERACTIVE LAB
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors font-sans">
                    Threat Simulation Lab
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Classify simulated real-world communication payloads across Email, SMS Smishing, and Spoofed Portals under live timed conditions.
                  </p>
                </div>

                {/* Active Attack Type Badges */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Active Attack Vectors:</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-mono bg-[#0A0E17] border border-rose-500/30 text-rose-300 px-2 py-0.5 rounded">
                      [SMS Smishing]
                    </span>
                    <span className="text-[10px] font-mono bg-[#0A0E17] border border-rose-500/30 text-rose-300 px-2 py-0.5 rounded">
                      [Banking KYC]
                    </span>
                    <span className="text-[10px] font-mono bg-[#0A0E17] border border-rose-500/30 text-rose-300 px-2 py-0.5 rounded">
                      [Fake Package APK]
                    </span>
                    <span className="text-[10px] font-mono bg-[#0A0E17] border border-white/[0.08] text-slate-400 px-2 py-0.5 rounded">
                      [Tax Refund Form]
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">5 Active Scenarios Queued</span>
                <Link
                  to="/detect"
                  className="px-4 py-2 rounded-lg bg-[#0A0E17] hover:bg-emerald-500/10 border border-white/[0.08] hover:border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 transition"
                >
                  <span>ENTER SIMULATOR</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* MODULE 2: REAL VS. FAKE COMPARISON LAB */}
            <div className="bg-[#111827] border border-white/[0.08] hover:border-emerald-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5 transition group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0A0E17] border border-white/[0.08] flex items-center justify-center text-emerald-400">
                      <Crosshair className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">MOD_02</span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                    FORENSIC LAB
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors font-sans">
                    Real vs. Fake Threat Lab
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Examine authentic brand portals side-by-side with weaponized phishing clones. Click on live target pins to expose domain cloaking and personal UPI traps.
                  </p>
                </div>

                {/* Target Clone Badges */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Simulated Counterfeits:</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-mono bg-[#0A0E17] border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded">
                      [E-Commerce Deals]
                    </span>
                    <span className="text-[10px] font-mono bg-[#0A0E17] border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded">
                      [State Bank KYC]
                    </span>
                    <span className="text-[10px] font-mono bg-[#0A0E17] border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded">
                      [India Post Sideload]
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">Side-by-Side Analysis Mode</span>
                <Link
                  to="/threat-lab"
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                >
                  <span>LAUNCH THREAT LAB</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* MODULE 3: MESSAGE & LINK INSPECTOR (INTERACTIVE QUICK TOOL) */}
            <div className="bg-[#111827] border border-white/[0.08] rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 md:col-span-2">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0A0E17] border border-white/[0.08] flex items-center justify-center text-emerald-400">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-slate-400 uppercase">MOD_03 // HEURISTIC TOOL</span>
                      <h3 className="text-base sm:text-lg font-black text-white font-sans">
                        Message & Link IOC Quick Inspector
                      </h3>
                    </div>
                  </div>

                  {/* Sample test presets */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-500">LOAD SAMPLE:</span>
                    <button
                      onClick={() => {
                        const sample = 'https://amazon-mega-loot-festival.xyz/claim-deal?ref=whatsapp';
                        setInspectorInput(sample);
                        handleRunScan(sample);
                      }}
                      className="px-2 py-0.5 rounded bg-[#0A0E17] hover:bg-white/5 border border-white/[0.08] text-[10px] font-mono text-slate-300"
                    >
                      Fake .xyz
                    </button>
                    <button
                      onClick={() => {
                        const sample = 'SBI Alert: Your A/C is blocked today due to pending KYC. Update ATM PIN here: sbi-kyc-pan-update.top';
                        setInspectorInput(sample);
                        handleRunScan(sample);
                      }}
                      className="px-2 py-0.5 rounded bg-[#0A0E17] hover:bg-white/5 border border-white/[0.08] text-[10px] font-mono text-slate-300"
                    >
                      KYC SMS
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-sans">
                  Paste any suspicious incoming URL, SMS body, or email excerpt to execute an immediate forensic indicator-of-compromise (IOC) scan.
                </p>

                {/* Input Bar */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inspectorInput}
                      onChange={(e) => setInspectorInput(e.target.value)}
                      placeholder="Paste suspicious URL (e.g. sbi-kyc.top) or message text..."
                      className="w-full bg-[#0A0E17] border border-white/[0.08] focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none transition"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRunScan(inspectorInput);
                      }}
                    />
                  </div>

                  <button
                    onClick={() => handleRunScan(inspectorInput)}
                    className="px-5 py-2.5 rounded-xl bg-[#0A0E17] hover:bg-white/10 border border-white/[0.08] text-xs font-mono font-bold text-emerald-400 flex items-center justify-center gap-2 transition shrink-0"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>INSPECT IOCs</span>
                  </button>
                </div>

                {/* Inspector Output Terminal */}
                {inspectorResult && (
                  <div className="bg-[#0A0E17] border border-white/[0.08] rounded-xl p-4 space-y-3 font-mono text-xs animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-[10px]">ANALYZED TARGET:</span>
                        <span className="text-slate-200 truncate max-w-xs sm:max-w-md font-bold">
                          {inspectorResult.testedInput}
                        </span>
                      </div>
                      
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inspectorResult.verdict === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : inspectorResult.verdict === 'SUSPICIOUS'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        VERDICT: {inspectorResult.verdict}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-400 bg-[#111827] p-2.5 rounded-lg border border-white/[0.08]">
                      <div>Protocol: <strong className="text-white">{inspectorResult.protocol}</strong></div>
                      <div>Hostname: <strong className="text-white">{inspectorResult.domain}</strong></div>
                      <div>TLD: <strong className="text-white">{inspectorResult.tld}</strong></div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Heuristic Findings:</div>
                      <ul className="space-y-1 text-[11px]">
                        {inspectorResult.findings.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-300">
                            <span className="text-rose-400 font-bold">•</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-[11px] text-emerald-400 border-t border-white/[0.08] pt-2 font-semibold">
                      Recommendation: {inspectorResult.recommendation}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Rule Engine: IOC Signature Registry 2026.10</span>
                <Link to="/fake-website-training" className="text-emerald-400 hover:underline flex items-center gap-1">
                  <span>Deep Domain Analysis Lesson</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. FIELD INTELLIGENCE / LIVE THREAT ADVISORY FEED            */}
        {/* ============================================================== */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
            <div>
              <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                TACTICAL INTELLIGENCE BULLETIN
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Live Threat Advisories & Field Reports
              </h2>
            </div>

            <Link
              to="/posters"
              className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>ACCESS FULL DOSSIER REPOSITORY</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {LIVE_BULLETINS.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenBulletinModal(item)}
                className="cursor-pointer bg-[#111827] border border-white/[0.08] hover:border-white/20 rounded-xl p-4 sm:p-5 transition flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* Meta Column */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                    <span className="text-slate-500">{item.id}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 font-bold">{item.timestamp}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                      [{item.sector}]
                    </span>
                    <span className={`px-1.5 py-0.5 rounded font-bold ${
                      item.severity === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {item.severity}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors font-sans">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-1">
                    {item.summary}
                  </p>

                  <div className="text-[11px] font-mono text-rose-300 bg-[#0A0E17] px-2.5 py-1 rounded border border-white/[0.08] inline-block">
                    IOC: <span className="underline">{item.iocIndicator}</span>
                  </div>
                </div>

                {/* Right Action & Vulnerability Takeaway */}
                <div className="md:w-72 shrink-0 space-y-2 border-t md:border-t-0 md:border-l border-white/[0.08] pt-3 md:pt-0 md:pl-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    Core Defense Protocol:
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans leading-snug">
                    {item.takeaway}
                  </p>
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform pt-1">
                    <span>Inspect Forensic Dossier</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Forensic Deep Dive Modal */}
      <PosterModal threatCard={selectedThreat} onClose={() => setSelectedThreat(null)} />

    </div>
  );
};

export default Home;
