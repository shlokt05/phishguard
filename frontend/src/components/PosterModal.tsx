import React, { useRef } from 'react';
import { X, Download, Share2, Shield, Check } from 'lucide-react';
import { Poster } from '../types';
import html2canvas from 'html2canvas';

interface PosterModalProps {
  poster: Poster | null;
  onClose: () => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({ poster, onClose }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  if (!poster) return null;

  const handleDownload = async () => {
    if (!posterRef.current) return;
    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `PhishGuard_Poster_${poster.title.replace(/\s+/g, '_')}.png`;
      link.click();
    } catch (e) {
      console.error('Failed downloading poster canvas:', e);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Poster Canvas Element */}
        <div
          ref={posterRef}
          className={`relative p-8 rounded-2xl bg-gradient-to-br ${poster.bg_gradient} border border-white/10 shadow-2xl flex flex-col justify-between aspect-[3/4] text-white overflow-hidden`}
        >
          {/* Background Decorative Rings */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-black/30 blur-xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Shield className="w-4 h-4 text-brand-400" />
              <span className="font-extrabold text-xs tracking-wider">PHISHGUARD</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
              {poster.category}
            </span>
          </div>

          {/* Central Typography & Icon */}
          <div className="my-auto text-center space-y-4 z-10 px-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-tight drop-shadow-md">
              {poster.title}
            </h2>
            <p className="text-sm font-medium text-white/90 leading-relaxed max-w-sm mx-auto drop-shadow-sm">
              "{poster.tagline}"
            </p>
          </div>

          {/* Footer Banner */}
          <div className="pt-4 border-t border-white/20 flex items-center justify-between z-10 text-[11px] text-white/80">
            <span className="font-bold tracking-wider uppercase">THINK BEFORE YOU CLICK</span>
            <span>phishguard.campaign.edu</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handleShare}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Link Copied!' : 'Share Poster'}
          </button>
          
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-shield-dark text-white text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg shadow-brand-500/20"
          >
            <Download className="w-4 h-4" /> Download High-Res PNG
          </button>
        </div>

      </div>
    </div>
  );
};
