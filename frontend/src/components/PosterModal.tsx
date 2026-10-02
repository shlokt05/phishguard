import React, { useRef, useState } from 'react';
import { X, Download, Share2, Shield, Check, AlertTriangle, ShieldCheck, ShieldAlert, Crosshair, Terminal } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ThreatBreakdownCard } from '../pages/Posters';

interface PosterModalProps {
  threatCard?: ThreatBreakdownCard | null;
  poster?: any;
  onClose: () => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({ threatCard, poster, onClose }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Normalize data whether passed threatCard or legacy poster
  const card: ThreatBreakdownCard | null = threatCard || (poster ? {
    id: poster.id,
    category: poster.category,
    title: poster.title,
    subtitle: poster.tagline,
    threatLevel: 'HIGH',
    riskScore: '8.8 / 10',
    redFlags: ['Deceptive Visual Clone', 'Unverified Source Origin'],
    visualMock: {
      type: 'url',
      headline: 'AWARENESS ADVISORY',
      sampleText: poster.tagline,
      targetWarning: 'Think Before You Click • PhishGuard Awareness'
    },
    keyTakeaways: [
      'Always inspect the sender address and root domain before clicking links.',
      'Never input sensitive passwords or OTPs on unsolicited login prompts.',
      'Verify unexpected urgent communications directly through official channels.'
    ],
    forensicBreakdown: {
      attackVector: 'Social engineering leveraging urgency and authority bias.',
      psychologicalHook: 'Manufactured emergency to bypass critical thinking.',
      defenseProtocol: 'Pause, evaluate the communication, and verify independently.'
    }
  } : null);

  if (!card) return null;

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 2.5,
        backgroundColor: '#0A0E17',
        useCORS: true,
        logging: false
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `PhishGuard_Tactical_Advisory_${card.title.replace(/\s+/g, '_')}.png`;
      link.click();
    } catch (e) {
      console.error('Failed generating poster canvas image:', e);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#131B2A] border border-white/20 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#0A0E17] border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title Bar */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              TACTICAL THREAT DOSSIER
            </span>
            <span className="text-[10px] font-mono text-slate-400">ID: {card.id}</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            {card.title}
          </h2>
        </div>

        {/* Printable Poster Canvas */}
        <div
          ref={posterRef}
          className="bg-[#0A0E17] border-2 border-white/20 rounded-2xl p-6 sm:p-8 space-y-6 text-white relative overflow-hidden shadow-2xl"
          style={{ backgroundColor: '#0A0E17' }}
        >
          {/* Subtle Grid Watermark Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

          {/* Top Brand Banner */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="font-black text-sm tracking-tight font-sans">
                  PHISH<span className="text-emerald-400">GUARD</span>
                </span>
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest -mt-0.5">
                  CYBER DEFENSE INTELLIGENCE
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/30">
                THREAT LEVEL: {card.threatLevel}
              </span>
              <p className="text-[9px] font-mono text-slate-500 mt-1">CVSS BASE: {card.riskScore}</p>
            </div>
          </div>

          {/* Hero Section */}
          <div className="space-y-2 relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              CATEGORY // {card.category}
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
              {card.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {card.subtitle}
            </p>
          </div>

          {/* Visual Attack Mock Container */}
          <div className="bg-[#131B2A] border border-white/15 rounded-xl p-4 space-y-2 relative z-10">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-rose-400 font-bold flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-rose-400" />
                SIMULATED ATTACK VECTOR
              </span>
              <span className="text-slate-500">FORENSIC SAMPLE</span>
            </div>
            
            <div className="bg-[#0A0E17] border border-rose-500/40 rounded-lg p-3 text-xs font-mono text-rose-300 break-all leading-relaxed">
              {card.visualMock.sampleText}
            </div>

            <div className="text-[11px] font-sans text-rose-400 font-semibold flex items-start gap-1.5 pt-1">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{card.visualMock.targetWarning}</span>
            </div>
          </div>

          {/* Red Flag Badges */}
          <div className="space-y-2 relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Identified Threat Signals:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {card.redFlags.map((flag, idx) => (
                <span 
                  key={idx}
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/35 text-rose-300"
                >
                  {flag}
                </span>
              ))}
            </div>
          </div>

          {/* Forensic Deep Dive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs relative z-10">
            <div className="bg-[#131B2A]/70 p-3.5 rounded-xl border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Attack Mechanics:</span>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{card.forensicBreakdown.attackVector}</p>
            </div>
            <div className="bg-[#131B2A]/70 p-3.5 rounded-xl border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Psychological Bait:</span>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{card.forensicBreakdown.psychologicalHook}</p>
            </div>
          </div>

          {/* Key Defense Protocol */}
          <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-xl p-4 space-y-2 relative z-10">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Mandatory Defense Takeaways:
            </span>
            <ul className="space-y-1 text-xs text-slate-200">
              {card.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Poster Bottom Sign-off */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500 relative z-10">
            <span>STAY SECURE // THINK BEFORE YOU CLICK</span>
            <span>PHISHGUARD DEFENSE PLATFORM</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handleShare}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#0A0E17] hover:bg-white/5 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Link Copied!' : 'Share Threat Advisory'}
          </button>
          
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/25 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Rendering Image...' : 'Export High-Res PNG Poster'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PosterModal;
