import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  ExternalLink, 
  Lock, 
  Unlock, 
  Clock, 
  Info, 
  ShoppingBag, 
  Building2, 
  Package, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Eye,
  Crosshair,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import comparisonData from '../threat-lab/comparison.json';

interface Hotspot {
  id: string;
  element: string;
  title: string;
  riskLevel: string;
  visualSelector: string;
  highlight: string;
  whatYouSee: string;
  whyItsMalicious: string;
  defenseTip: string;
}

export const ThreatLab: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('ecommerce');
  const [viewMode, setViewMode] = useState<'split' | 'toggle'>('split');
  const [activeToggleTab, setActiveToggleTab] = useState<'authentic' | 'fake'>('fake');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [discoveredHotspots, setDiscoveredHotspots] = useState<Set<string>>(new Set());

  const category = comparisonData.categories.find(c => c.id === selectedCategoryId) || comparisonData.categories[0];
  const { authentic, fake } = category;

  const handleHotspotClick = (hs: Hotspot) => {
    setActiveHotspot(hs);
    setDiscoveredHotspots(prev => new Set(prev).add(hs.id));
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4" />;
      case 'Building2': return <Building2 className="w-4 h-4" />;
      case 'Package': return <Package className="w-4 h-4" />;
      default: return <ShoppingBag className="w-4 h-4" />;
    }
  };

  const totalHotspots = fake.hotspots.length;
  const discoveredCount = fake.hotspots.filter(h => discoveredHotspots.has(h.id)).length;
  const progressPercent = Math.round((discoveredCount / totalHotspots) * 100);

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="bg-[#131B2A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-400">
              <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
              INTERACTIVE THREAT LAB • REAL VS. FAKE INSPECTOR
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Anatomy of Fraudulent Web Clones
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Explore authentic services side-by-side with weaponized phishing clones. Click on the 
              pulsing <span className="text-rose-400 font-bold">Inspection Hotspots [🎯]</span> on the fake site to expose hidden deception tactics.
            </p>
          </div>

          {/* Inspection Discovery Tracker */}
          <div className="bg-[#0A0E17] border border-white/10 p-4 rounded-xl shrink-0 min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">RED FLAGS UNCOVERED</span>
              <span className="text-emerald-400 font-bold">{discoveredCount}/{totalHotspots}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] font-mono text-slate-400 text-right mt-1.5">
              {progressPercent === 100 ? '✅ All Threat Vectors Analyzed!' : 'Click red target pins to inspect'}
            </div>
          </div>
        </div>

        {/* CATEGORY SWITCHER */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          {comparisonData.categories.map(cat => {
            const isSelected = cat.id === selectedCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setActiveHotspot(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-sm shadow-emerald-500/10'
                    : 'bg-[#0A0E17] border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW CONTROLS & URL STATUS BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#131B2A]/60 border border-white/10 p-3 sm:p-4 rounded-xl">
        <div className="text-xs text-slate-300 font-medium">
          Category Focus: <span className="text-white font-bold">{category.name}</span>
        </div>

        {/* Desktop vs Mobile display toggle */}
        <div className="flex items-center gap-1 bg-[#0A0E17] p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              viewMode === 'split'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Side-by-Side View
          </button>
          <button
            onClick={() => setViewMode('toggle')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              viewMode === 'toggle'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tabbed Switcher
          </button>
        </div>
      </div>

      {/* MOBILE TOGGLE TABS (when viewMode is toggle) */}
      {viewMode === 'toggle' && (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveToggleTab('authentic')}
            className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
              activeToggleTab === 'authentic'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                : 'bg-[#131B2A] border-white/10 text-slate-400'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            1. AUTHENTIC ORIGINAL ({authentic.brand})
          </button>
          <button
            onClick={() => setActiveToggleTab('fake')}
            className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
              activeToggleTab === 'fake'
                ? 'bg-rose-500/10 border-rose-500 text-rose-400'
                : 'bg-[#131B2A] border-white/10 text-slate-400'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            2. MALICIOUS CLONE ({fake.brand})
          </button>
        </div>
      )}

      {/* COMPARISON PANELS GRID */}
      <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* ============================================================== */}
        {/* 1. AUTHENTIC SITE CONTAINER                                   */}
        {/* ============================================================== */}
        {(viewMode === 'split' || activeToggleTab === 'authentic') && (
          <div className="bg-[#131B2A] border-2 border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Top Security Banner */}
            <div className="bg-emerald-950/60 border-b border-emerald-500/30 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  AUTHENTIC VERIFIED PLATFORM
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Legitimate Origin</span>
              </div>
            </div>

            {/* Simulated Browser Address Bar */}
            <div className="bg-[#0A0E17] border-b border-white/10 p-3 flex items-center gap-2 text-xs">
              <div className="flex gap-1.5 shrink-0 px-1">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
              </div>

              {/* URL Pill */}
              <div className="flex-1 flex items-center gap-2 bg-[#131B2A] border border-emerald-500/40 rounded-lg px-3 py-1.5 overflow-hidden font-mono text-[11px]">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-400 shrink-0">https://</span>
                <span className="text-emerald-300 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded">
                  {authentic.domain}
                </span>
                <span className="text-slate-400 truncate">
                  {authentic.url.replace(`https://${authentic.domain}`, '')}
                </span>
              </div>
            </div>

            {/* Authentic Page Content Simulation */}
            <div className="p-5 flex-1 space-y-5 text-xs text-slate-200 bg-[#0A0E17]/40">
              {/* Header */}
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">{authentic.siteHeader.logo}</h4>
                  <p className="text-[11px] text-slate-400">{authentic.siteHeader.tagline || authentic.brand}</p>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded">
                  Official Entity
                </span>
              </div>

              {/* Content Specific to Category */}
              {selectedCategoryId === 'ecommerce' && (
                <div className="space-y-4">
                  <div className="bg-[#131B2A] p-4 rounded-xl border border-white/10 space-y-2">
                    <div className="text-sm font-bold text-white">{authentic.content.title}</div>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                      <span>{authentic.content.rating}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300">{authentic.content.seller}</span>
                    </div>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-xl font-mono font-bold text-white">{authentic.content.currentPrice}</span>
                      <span className="text-xs text-slate-500 line-through">{authentic.content.originalPrice}</span>
                      <span className="text-xs font-bold text-emerald-400">{authentic.content.discount}</span>
                    </div>
                  </div>

                  {/* Payment safeguards */}
                  <div className="bg-[#131B2A]/70 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      Verified Payment Gateways
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {authentic.content.paymentMethods?.map((pm: string) => (
                        <span key={pm} className="px-2 py-1 rounded bg-[#0A0E17] border border-white/10 text-[10px] text-slate-300">
                          {pm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedCategoryId === 'banking' && (
                <div className="space-y-4">
                  <div className="bg-[#131B2A] p-4 rounded-xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-bold text-white">{authentic.content.portalName}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        2FA Enforced
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {authentic.content.kycProcedure}
                    </p>
                    <div className="space-y-1.5 pt-1">
                      {authentic.content.securityFeatures?.map((feat: string) => (
                        <div key={feat} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedCategoryId === 'delivery' && (
                <div className="space-y-4">
                  <div className="bg-[#131B2A] p-4 rounded-xl border border-white/10 space-y-2">
                    <div className="font-mono text-sm font-bold text-emerald-400">{authentic.content.trackingNumber}</div>
                    <div className="text-xs text-slate-300">Status: <span className="font-bold text-white">{authentic.content.status}</span></div>
                    <div className="text-[11px] text-slate-400">{authentic.content.redeliveryRules}</div>
                    <div className="pt-2 text-[10px] font-mono text-slate-400 border-t border-white/10">
                      Official App: <span className="text-white font-bold">{authentic.content.officialApp}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Working Footer */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-[10px] text-slate-400">
                <div className="flex flex-wrap gap-2 text-slate-400">
                  {authentic.footer.links.map((link: string) => (
                    <span key={link} className="hover:text-emerald-400 transition cursor-pointer">
                      {link}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] font-mono text-slate-500">{authentic.footer.copyright}</p>
              </div>

            </div>

            {/* Bottom Key takeaway */}
            <div className="bg-[#0A0E17] border-t border-white/10 p-3 text-[11px] text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Legitimacy Hallmarks:</strong> Clean registered domain (<code className="text-emerald-400 font-mono font-bold">{authentic.domain}</code>), full legal terms, and secure escrowed payments.
              </span>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* 2. MALICIOUS CLONE CONTAINER (WITH CLICKABLE HOTSPOTS)        */}
        {/* ============================================================== */}
        {(viewMode === 'split' || activeToggleTab === 'fake') && (
          <div className="bg-[#131B2A] border-2 border-rose-500/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col relative">
            
            {/* Top Threat Banner */}
            <div className="bg-rose-950/70 border-b border-rose-500/30 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                  MALICIOUS DECEPTION REPLICA
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{fake.threatLevel} THREAT</span>
              </div>
            </div>

            {/* Simulated Browser Address Bar with Hotspot */}
            <div className="bg-[#0A0E17] border-b border-white/10 p-3 flex items-center gap-2 text-xs relative group">
              <div className="flex gap-1.5 shrink-0 px-1">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
              </div>

              {/* Fake URL Pill with Domain Hotspot Pin */}
              <div className="flex-1 flex items-center gap-2 bg-[#131B2A] border border-rose-500/50 rounded-lg px-3 py-1.5 overflow-hidden font-mono text-[11px] relative">
                <Unlock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="text-slate-500 shrink-0">{fake.protocol}</span>
                
                {/* Highlighted Deceptive Root Domain */}
                <span className="text-rose-400 font-bold bg-rose-500/20 px-1.5 py-0.5 rounded underline decoration-rose-400">
                  {fake.domain}
                </span>

                <span className="text-slate-500 truncate">
                  {fake.url.replace(`${fake.protocol}${fake.domain}`, '')}
                </span>

                {/* Hotspot Button for Domain */}
                {fake.hotspots.find(h => h.element === 'domain') && (
                  <button
                    onClick={() => handleHotspotClick(fake.hotspots.find(h => h.element === 'domain')!)}
                    className="ml-auto shrink-0 flex items-center gap-1 bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition"
                    title="Inspect Domain Red Flag"
                  >
                    <Crosshair className="w-3 h-3 animate-spin" />
                    <span>INSPECT #1</span>
                  </button>
                )}
              </div>
            </div>

            {/* Deceptive Clone Page Simulation */}
            <div className="p-5 flex-1 space-y-5 text-xs text-slate-200 bg-[#0A0E17]/40 relative">
              
              {/* Header with Urgency or Fake Notice */}
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-rose-300 tracking-tight flex items-center gap-2">
                    {fake.siteHeader.logo}
                    <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-1.5 py-0.5 rounded font-mono">
                      FAKE
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400">{fake.siteHeader.tagline}</p>
                </div>
                {fake.siteHeader.contact && (
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/30">
                    {fake.siteHeader.contact}
                  </span>
                )}
              </div>

              {/* CATEGORY 1: E-Commerce Fake */}
              {selectedCategoryId === 'ecommerce' && (
                <div className="space-y-4">
                  {/* Fake Urgency Timer Banner with Hotspot */}
                  <div className="bg-rose-950/40 border border-rose-500/40 p-3 rounded-xl flex items-center justify-between relative">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
                      <span className="font-bold text-rose-300">
                        FLASH OFFER: Deal expires in <span className="font-mono text-rose-200 underline">{fake.content.urgencyTimer}</span>
                      </span>
                    </div>

                    {fake.hotspots.find(h => h.element === 'urgency') && (
                      <button
                        onClick={() => handleHotspotClick(fake.hotspots.find(h => h.element === 'urgency')!)}
                        className="flex items-center gap-1 bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full hover:scale-105 transition"
                      >
                        <Crosshair className="w-3 h-3" />
                        <span>HOTSPOT</span>
                      </button>
                    )}
                  </div>

                  {/* Absurd Deal Card with Hotspot */}
                  <div className="bg-[#131B2A] p-4 rounded-xl border border-rose-500/30 space-y-2 relative">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-bold text-white">{fake.content.title}</div>
                      {fake.hotspots.find(h => h.element === 'unrealistic_deal') && (
                        <button
                          onClick={() => handleHotspotClick(fake.hotspots.find(h => h.element === 'unrealistic_deal')!)}
                          className="shrink-0 flex items-center gap-1 bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full hover:scale-105 transition"
                        >
                          <Crosshair className="w-3 h-3" />
                          <span>HOTSPOT</span>
                        </button>
                      )}
                    </div>

                    <div className="text-[11px] text-amber-400">{fake.content.rating}</div>
                    
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-2xl font-mono font-black text-rose-400 animate-pulse">{fake.content.currentPrice}</span>
                      <span className="text-xs text-slate-500 line-through">{fake.content.originalPrice}</span>
                      <span className="text-xs font-mono font-bold bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">
                        {fake.content.discount}
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-300 font-semibold">{fake.content.stockAlert}</div>
                  </div>

                  {/* Unverified Personal UPI Payment Trap with Hotspot */}
                  <div className="bg-rose-950/30 p-3.5 rounded-xl border border-rose-500/40 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-rose-300 uppercase">
                        🚨 Direct Personal Payment Trap
                      </span>
                      {fake.hotspots.find(h => h.element === 'payment') && (
                        <button
                          onClick={() => handleHotspotClick(fake.hotspots.find(h => h.element === 'payment')!)}
                          className="flex items-center gap-1 bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full hover:scale-105 transition"
                        >
                          <Crosshair className="w-3 h-3" />
                          <span>HOTSPOT</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{fake.content.paymentNote}</p>
                    <div className="font-mono text-xs font-bold text-amber-300 bg-[#0A0E17] p-2 rounded border border-white/10 flex items-center justify-between">
                      <span>UPI VPA: {fake.content.upiId}</span>
                      <span className="text-[10px] text-rose-400 font-semibold">Unverified Personal Account</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CATEGORY 2: Banking Fake */}
              {selectedCategoryId === 'banking' && (
                <div className="space-y-4">
                  {/* Coercive Suspension Banner */}
                  <div className="bg-rose-950/50 border border-rose-500/40 p-3.5 rounded-xl space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        IMMEDIATE ACTION REQUIRED
                      </span>
                      {fake.hotspots.find(h => h.element === 'urgency') && (
                        <button
                          onClick={() => handleHotspotClick(fake.hotspots.find(h => h.element === 'urgency')!)}
                          className="flex items-center gap-1 bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full hover:scale-105 transition"
                        >
                          <Crosshair className="w-3 h-3" />
                          <span>HOTSPOT</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-200 leading-relaxed font-semibold">
                      {fake.content.urgencyAlert}
                    </p>
                  </div>

                  {/* Harvest Form with Hotspot */}
                  <div className="bg-[#131B2A] p-4 rounded-xl border border-rose-500/30 space-y-3 relative">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-bold text-white text-xs">{fake.content.portalName}</span>
                      {fake.hotspots.find(h => h.element === 'credentials') && (
                        <button
                          onClick={() => handleHotspotClick(fake.hotspots.find(h => h.element === 'credentials')!)}
                          className="flex items-center gap-1 bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full hover:scale-105 transition"
                        >
                          <Crosshair className="w-3 h-3" />
                          <span>HOTSPOT</span>
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {fake.content.loginFields?.map((fld: string) => (
                        <div key={fld} className="flex items-center justify-between bg-[#0A0E17] border border-rose-500/30 px-3 py-1.5 rounded text-[11px]">
                          <span className="text-slate-300">{fld}</span>
                          <span className="text-[10px] font-mono text-rose-400">[Credential Harvesting Field]</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Unregistered SMS Sender Alert */}
                  {fake.hotspots.find(h => h.element === 'origin') && (
                    <div className="bg-[#0A0E17] p-3 rounded-xl border border-white/10 flex items-center justify-between">
                      <div className="text-[11px] text-slate-300">
                        <span className="text-slate-500 font-mono">Incoming SMS: </span>
                        {fake.content.smsHook}
                      </div>
                      <button
                        onClick={() => handleHotspotClick(fake.hotspots.find(h => h.element === 'origin')!)}
                        className="shrink-0 ml-2 flex items-center gap-1 bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full hover:scale-105 transition"
                      >
                        <Crosshair className="w-3 h-3" />
                        <span>HOTSPOT</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* CATEGORY 3: Delivery APK Fake */}
              {selectedCategoryId === 'delivery' && (
                <div className="space-y-4">
                  {/* Fake Surcharge Alert */}
                  <div className="bg-rose-950/40 border border-rose-500/40 p-3.5 rounded-xl space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-rose-300">{fake.content.trackingNumber}</span>
                      {fake.hotspots.find(h => h.element === 'micro_payment') && (
                        <button
                          onClick={() => handleHotspotClick(fake.hotspots.find(h => h.element === 'micro_payment')!)}
                          className="flex items-center gap-1 bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full hover:scale-105 transition"
                        >
                          <Crosshair className="w-3 h-3" />
                          <span>HOTSPOT</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-200">{fake.content.urgencyAlert}</p>
                  </div>

                  {/* Dangerous APK Download Trap */}
                  <div className="bg-[#131B2A] p-4 rounded-xl border border-rose-500/40 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        Sideload Android Application
                      </span>
                      {fake.hotspots.find(h => h.element === 'malware') && (
                        <button
                          onClick={() => handleHotspotClick(fake.hotspots.find(h => h.element === 'malware')!)}
                          className="flex items-center gap-1 bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full hover:scale-105 transition"
                        >
                          <Crosshair className="w-3 h-3" />
                          <span>HOTSPOT</span>
                        </button>
                      )}
                    </div>
                    
                    <div className="bg-[#0A0E17] p-3 rounded-lg border border-rose-500/50 space-y-1.5">
                      <div className="font-mono text-xs text-rose-400 font-bold flex items-center gap-2">
                        <span>📦 {fake.content.apkFile}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Target Permissions Hijacked:</div>
                      {fake.content.hiddenPermissions?.map((perm: string) => (
                        <div key={perm} className="text-[10px] font-mono text-rose-300 flex items-center gap-1">
                          <XCircle className="w-3 h-3 text-rose-400 shrink-0" />
                          <span>{perm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dead Footer Links with Hotspot */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex flex-wrap gap-2 text-rose-400/80 font-mono">
                  {fake.footer.links.map((link: string) => (
                    <span key={link} className="underline cursor-not-allowed">
                      {link}
                    </span>
                  ))}
                </div>

                {fake.hotspots.find(h => h.element === 'footer') && (
                  <button
                    onClick={() => handleHotspotClick(fake.hotspots.find(h => h.element === 'footer')!)}
                    className="shrink-0 flex items-center gap-1 bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full hover:scale-105 transition"
                  >
                    <Crosshair className="w-3 h-3" />
                    <span>HOTSPOT</span>
                  </button>
                )}
              </div>

            </div>

            {/* Bottom Key takeaway */}
            <div className="bg-[#0A0E17] border-t border-white/10 p-3 text-[11px] text-slate-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>Tactical Objective:</strong> Click any of the <span className="text-rose-400 font-mono font-bold">[HOTSPOT]</span> targets above to view technical forensic analysis.
              </span>
            </div>

          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* 3. TACTICAL FORENSIC INSPECTION MODAL / DRAWER                  */}
      {/* ============================================================== */}
      {activeHotspot && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#131B2A] border border-white/20 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                    activeHotspot.riskLevel === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    {activeHotspot.riskLevel} THREAT VECTOR
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">TARGET: {activeHotspot.element}</span>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {activeHotspot.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveHotspot(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Highlight Badge */}
            <div className="bg-[#0A0E17] border border-white/10 rounded-xl p-3 font-mono text-xs text-rose-300 flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="text-slate-400">Target Sample: </span>
              <span className="font-bold underline text-white">{activeHotspot.highlight}</span>
            </div>

            {/* Analysis Grid */}
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="bg-[#0A0E17]/60 p-3.5 rounded-xl border border-white/5 space-y-1">
                <div className="font-bold text-slate-200 uppercase text-[10px] tracking-wider text-slate-400 font-mono">
                  Visual Appearance On Screen
                </div>
                <p className="text-slate-300">{activeHotspot.whatYouSee}</p>
              </div>

              <div className="bg-rose-950/20 p-3.5 rounded-xl border border-rose-500/30 space-y-1">
                <div className="font-bold text-rose-400 uppercase text-[10px] tracking-wider font-mono flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  Forensic Scam Mechanism
                </div>
                <p className="text-slate-300">{activeHotspot.whyItsMalicious}</p>
              </div>

              <div className="bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/30 space-y-1">
                <div className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Actionable Defense Protocol
                </div>
                <p className="text-slate-200 font-medium">{activeHotspot.defenseTip}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                Hotspot logged in session assessment
              </span>
              <button
                onClick={() => setActiveHotspot(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
              >
                Acknowledge & Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
