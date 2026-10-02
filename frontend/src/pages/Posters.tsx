import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Share2, 
  Shield, 
  Eye, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight,
  ShieldAlert,
  Flame,
  Zap,
  Globe,
  Smartphone,
  CreditCard,
  Building,
  Briefcase,
  Crosshair
} from 'lucide-react';
import { PosterModal } from '../components/PosterModal';

export interface ThreatBreakdownCard {
  id: string;
  category: 'Phishing URLs' | 'E-Commerce' | 'Malware / APK' | 'Banking / KYC' | 'Utility Scams' | 'Job Fraud';
  title: string;
  subtitle: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED';
  riskScore: string;
  redFlags: string[];
  visualMock: {
    type: 'url' | 'deal' | 'sms_apk' | 'bank_sms' | 'utility_sms' | 'job_chat';
    headline: string;
    sampleText: string;
    targetWarning: string;
  };
  keyTakeaways: string[];
  forensicBreakdown: {
    attackVector: string;
    psychologicalHook: string;
    defenseProtocol: string;
  };
}

export const THREAT_BREAKDOWN_DATA: ThreatBreakdownCard[] = [
  {
    id: 'threat-url-anatomy',
    category: 'Phishing URLs',
    title: 'Anatomy of a Phishing URL',
    subtitle: 'Dissecting Subdomain Cloaking, Typosquatting & Malicious TLDs',
    threatLevel: 'CRITICAL',
    riskScore: '9.8 / 10',
    redFlags: [
      'CRITICAL: Subdomain Masquerading',
      'HIGH: Deceptive .xyz / .top TLD',
      'HIGH: Unchecked Character Substitution'
    ],
    visualMock: {
      type: 'url',
      headline: 'MALICIOUS URL DISSECTION',
      sampleText: 'https://security-login.amazon.in.verify-account-gate.xyz/auth?client_id=89234',
      targetWarning: 'True root domain is "verify-account-gate.xyz" — NOT amazon.in'
    },
    keyTakeaways: [
      'Focus on the root domain immediately preceding the Top-Level Domain (TLD) and first single slash (/).',
      'Brand names embedded in subdomains (e.g. "amazon.in.attacker.xyz") are deliberate decoys.',
      'A padlock (HTTPS) only verifies encryption, NOT the legitimacy or honesty of the operator.'
    ],
    forensicBreakdown: {
      attackVector: 'Subdomain cloaking leverages user habit of reading left-to-right to obscure the genuine destination server.',
      psychologicalHook: 'False comfort from familiar brand names placed at the beginning of lengthy URL paths.',
      defenseProtocol: 'Type official URLs manually or rely on verified bookmarks. Check the primary domain letter-by-letter.'
    }
  },
  {
    id: 'threat-mega-deal',
    category: 'E-Commerce',
    title: 'The ₹99 Mega Deal Trap',
    subtitle: 'Flash Clearance Clones, Fake Spin-to-Win & Direct UPI Drain',
    threatLevel: 'HIGH',
    riskScore: '9.2 / 10',
    redFlags: [
      'CRITICAL: Direct Personal UPI VPA',
      'HIGH: Artificial 180s Countdown Timer',
      'CRITICAL: Economically Impossible 99% Off'
    ],
    visualMock: {
      type: 'deal',
      headline: 'FLASH CLEARANCE SALE • ENDS IN 02:45',
      sampleText: 'Apple iPhone 15 Pro Max: ₹1,59,900 → ₹99 ONLY! Transfer immediately to instantloot@upi or scan QR.',
      targetWarning: 'Bypasses authorized escrow gateways (Razorpay/PayU) using unverified mule VPAs.'
    },
    keyTakeaways: [
      'Flagship electronics priced under ₹100 are mathematical and commercial impossibilities.',
      'Never send funds directly to an individual @upi / @ybl handle for online merchandise.',
      'Legitimate marketplaces process payments strictly through verified, escrowed business payment gateways.'
    ],
    forensicBreakdown: {
      attackVector: 'Scammers clone e-commerce storefronts and direct traffic via sponsored Facebook, Instagram, or WhatsApp ads.',
      psychologicalHook: 'Aggressive Fear Of Missing Out (FOMO) engineered through flashing countdown timers and stock scarcity claims.',
      defenseProtocol: 'Verify promotional sales directly inside the official app. If an offer sounds too good to be true, it is guaranteed fraud.'
    }
  },
  {
    id: 'threat-delivery-apk',
    category: 'Malware / APK',
    title: 'Fake Delivery APKs & SMS Smishing',
    subtitle: 'Parcel Held Warnings Sideloading Banking Trojans & OTP Interceptors',
    threatLevel: 'CRITICAL',
    riskScore: '9.9 / 10',
    redFlags: [
      'CRITICAL: Out-of-Store .apk Sideloading',
      'CRITICAL: BIND_ACCESSIBILITY_SERVICE Request',
      'HIGH: Micro ₹5 Address Correction Charge'
    ],
    visualMock: {
      type: 'sms_apk',
      headline: 'PARCEL #IN-9082 ON HOLD',
      sampleText: 'IndiaPost: Your shipment is on hold due to wrong address. Update address & download IndiaPost_Track.apk here: indiapost-track.support',
      targetWarning: 'Malicious Android package intercepts SMS OTPs and silently executes bank wire transfers.'
    },
    keyTakeaways: [
      'India Post, BlueDart, and DTDC NEVER distribute APK files via SMS or WhatsApp links.',
      'Installing an unknown .apk from a mobile browser bypasses Google Play Protect screening.',
      'The requested ₹5-₹10 fee is a skimmer trap to capture full 16-digit debit card numbers, CVVs, and expiry dates.'
    ],
    forensicBreakdown: {
      attackVector: 'Delivery-themed SMS lures victims into downloading a Remote Access Trojan (RAT) or SMS stealer.',
      psychologicalHook: 'Anxiety over an undelivered parcel or missing official consignment.',
      defenseProtocol: 'Immediately delete SMS messages containing .apk download links. Postal tracking is performed strictly on indiapost.gov.in.'
    }
  },
  {
    id: 'threat-bank-kyc',
    category: 'Banking / KYC',
    title: 'Bank KYC Expiry Pan-India Scam',
    subtitle: 'Account Suspension Coercion Harvesting ATM PINs & Internet Banking Credentials',
    threatLevel: 'CRITICAL',
    riskScore: '9.7 / 10',
    redFlags: [
      'CRITICAL: Direct ATM PIN / Password Demands',
      'HIGH: Personal 10-Digit Mobile Sender',
      'HIGH: Immediate 24-Hour Account Freeze Threat'
    ],
    visualMock: {
      type: 'bank_sms',
      headline: 'URGENT: BANK ACCOUNT SUSPENSION NOTICE',
      sampleText: 'Dear Customer, your SBI account is blocked today due to pending PAN/KYC. Verify debit card & ATM PIN immediately at: sbi-kyc-pan-update.top',
      targetWarning: 'Official banks under RBI regulations never request card PINs, CVVs, or OTPs on web links.'
    },
    keyTakeaways: [
      'Banks never ask you to input your 4-digit ATM PIN on any website or over telephone calls.',
      'Official banking SMS alerts originate strictly from registered 6-character TRAI DLT headers (e.g. AD-SBIINB).',
      'Statutory KYC updates are performed inside branch premises or through biometric/video KYC in the official app.'
    ],
    forensicBreakdown: {
      attackVector: 'Clone of bank login portals configured with real-time automated API hooks to execute rapid unauthorized transfers.',
      psychologicalHook: 'Immediate financial panic and fear of losing access to personal savings.',
      defenseProtocol: 'Contact your bank branch directly using the phone number printed on the back of your debit card.'
    }
  },
  {
    id: 'threat-utility-disconnection',
    category: 'Utility Scams',
    title: 'Electricity Bill Disconnection Alert',
    subtitle: 'Late-Night Power Cut Threats Inducing Remote Screen-Sharing Installations',
    threatLevel: 'HIGH',
    riskScore: '9.0 / 10',
    redFlags: [
      'CRITICAL: Remote Screen-Share Tool (AnyDesk / RustDesk)',
      'HIGH: Tonight 9:30 PM Disconnection Threat',
      'HIGH: Personal Mobile Number Given as Officer'
    ],
    visualMock: {
      type: 'utility_sms',
      headline: 'URGENT ELECTRICITY BOARD NOTICE',
      sampleText: 'Dear Consumer, your electricity power supply will be disconnected tonight at 9:30 PM because previous bill was not updated. Call Officer immediately: +91-9876543210.',
      targetWarning: 'Fraudster poses as electricity officer, instructs you to install AnyDesk, and captures NetBanking credentials.'
    },
    keyTakeaways: [
      'Power distribution companies (discoms) are legally bound to serve 15-day statutory physical notices before disconnection.',
      'Discoms never assign personal mobile numbers to resolve billing disputes over WhatsApp or SMS.',
      'Never install screen-sharing software (AnyDesk, TeamViewer, QuickSupport) on instructions from an unknown caller.'
    ],
    forensicBreakdown: {
      attackVector: 'Social engineering combined with remote management tool installation to take over smartphone screens.',
      psychologicalHook: 'Acute domestic disruption—fear of families losing power and cooling during evening hours.',
      defenseProtocol: 'Verify bill status only on the official state electricity board portal or through Bharat BillPay (BBPS).'
    }
  },
  {
    id: 'threat-task-job',
    category: 'Job Fraud',
    title: 'Telegram Task & Like-and-Earn Fraud',
    subtitle: 'Part-Time Work-From-Home Baiting Victims into High-Yield Crypto Deposit Traps',
    threatLevel: 'HIGH',
    riskScore: '8.9 / 10',
    redFlags: [
      'CRITICAL: Upfront Deposit "Prepaid Tasks"',
      'HIGH: Initial ₹500 Instant Bait Payout',
      'HIGH: Unsolicited WhatsApp Recruitment DM'
    ],
    visualMock: {
      type: 'job_chat',
      headline: 'PART-TIME YOUTUBE REVIEW ASSISTANT',
      sampleText: 'Earn ₹3,000 to ₹8,000 daily from home! Just like 3 YouTube videos. ₹500 credited to your UPI right now. Join Telegram VIP task room to deposit ₹10,000 for ₹15,000 return.',
      targetWarning: 'Once large funds are deposited into "VIP tasks", withdrawals are permanently locked.'
    },
    keyTakeaways: [
      'The initial ₹150-₹500 payout is a calculated psychological investment by organized crime syndicates to gain trust.',
      'Legitimate corporations never require employees or contractors to pay security deposits to work.',
      'Anonymous Telegram groups featuring "happy members" sharing fake withdrawal screenshots are 100% orchestrated bot shills.'
    ],
    forensicBreakdown: {
      attackVector: 'Ponzi-style task manipulation hosted on unregulated offshore cryptocurrency or mule bank accounts.',
      psychologicalHook: 'Desire for flexible passive income combined with the dopamine hit of the initial token reward.',
      defenseProtocol: 'Block unsolicited international recruitment messages immediately. Report the contact to the National Cyber Crime Reporting Portal (1930).'
    }
  }
];

export const Posters: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeThreatCard, setActiveThreatCard] = useState<ThreatBreakdownCard | null>(null);

  const categories = [
    'All',
    'Phishing URLs',
    'E-Commerce',
    'Malware / APK',
    'Banking / KYC',
    'Utility Scams',
    'Job Fraud'
  ];

  const filteredCards = THREAT_BREAKDOWN_DATA.filter(card => {
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
    const matchesSearch = 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.keyTakeaways.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER */}
      <div className="bg-[#131B2A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>CYBER THREAT INTELLIGENCE & AWARENESS DOSSIERS</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          VISUAL THREAT BREAKDOWN CARDS
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Tactical forensic breakdowns of the most prevalent real-world cyber fraud schemes targeting Indian consumers. 
          Analyze the deceptive mechanics, identify visual red flags, and master concrete defense protocols.
        </p>
      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#131B2A]/60 border border-white/10 p-3 sm:p-4 rounded-xl">
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 custom-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400 shadow-sm shadow-emerald-500/10'
                  : 'bg-[#0A0E17] border-white/5 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search threats, red flags, scams..."
            className="w-full bg-[#0A0E17] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition font-sans placeholder:text-slate-500"
          />
        </div>

      </div>

      {/* THREAT CARDS GRID */}
      {filteredCards.length === 0 ? (
        <div className="bg-[#131B2A] border border-white/10 rounded-2xl p-12 text-center text-slate-400 text-xs">
          No threat breakdown cards match your search criteria. Try clearing search filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-[#131B2A] border border-white/10 hover:border-white/25 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5 transition-all duration-200 hover:-translate-y-1 group relative overflow-hidden"
            >
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0A0E17] text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  {card.category}
                </span>
                
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  card.threatLevel === 'CRITICAL'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                }`}>
                  {card.threatLevel} RISK • {card.riskScore}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white tracking-tight group-hover:text-emerald-300 transition font-sans">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {card.subtitle}
                </p>
              </div>

              {/* Visual Attack Anatomy Snippet */}
              <div className="bg-[#0A0E17] border border-white/10 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <Crosshair className="w-3 h-3 text-rose-400" />
                    {card.visualMock.headline}
                  </span>
                  <span>SIMULATION</span>
                </div>
                
                <div className="text-[11px] font-mono text-slate-200 bg-[#131B2A]/80 p-2.5 rounded border border-rose-500/30 break-all leading-relaxed">
                  {card.visualMock.sampleText}
                </div>

                <div className="text-[10px] font-sans text-rose-400 font-semibold flex items-start gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{card.visualMock.targetWarning}</span>
                </div>
              </div>

              {/* Red Flag Badges */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Identified Red Flags:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {card.redFlags.map((flag, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bulleted Key Takeaways */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Actionable Defense Takeaways:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {card.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={() => setActiveThreatCard(card)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0A0E17] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 text-xs font-bold text-slate-200 hover:text-emerald-300 flex items-center justify-center gap-2 transition duration-150"
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>Deep Forensic Analysis & Poster Export</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Forensic Deep-Dive & Poster Export Modal */}
      <PosterModal threatCard={activeThreatCard} onClose={() => setActiveThreatCard(null)} />

    </div>
  );
};

export default Posters;
