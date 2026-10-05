import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  Globe, 
  ShieldCheck, 
  QrCode, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Share2, 
  Layers, 
  Cpu, 
  Check, 
  Copy,
  ArrowRight
} from 'lucide-react';

export const DownloadPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [qrType, setQrType] = useState<'apk' | 'portal'>('apk');

  const directApkUrl = './PhishGuard.apk';
  const liveWebUrl = window.location.origin + window.location.pathname;

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else {
      alert("To install this app on your device:\n\n• On Android (Chrome): Tap the 3 dots menu (⋮) -> 'Install App' or 'Add to Home screen'.\n• On iPhone (Safari): Tap the Share button (⎋) -> 'Add to Home Screen'.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveWebUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Subtle Cyber Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-80 bg-cyan-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-wider uppercase font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Official Deployment Portal • PhishGuard Suite
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Download <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">PhishGuard</span> App
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed">
            Install the tactical cybersecurity defense platform on your smartphone or desktop. 
            Choose between the standalone Android APK or the universal Instant Web App.
          </p>
        </div>

        {/* 2 Primary Download Cards (APK vs PWA) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Option 1: Android APK */}
          <div className="relative group bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 shadow-xl shadow-black/40">
            <div className="absolute -top-3.5 right-6 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold rounded-full uppercase tracking-wider">
              Native Android Package
            </div>

            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                <Smartphone className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Android APK Build</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Full standalone Android app powered by Capacitor Android Runtime. Runs completely offline with native system features.
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-800/80 text-xs font-mono">
                <div>
                  <span className="text-slate-500">File Name:</span>
                  <div className="text-slate-200 font-semibold truncate">PhishGuard.apk</div>
                </div>
                <div>
                  <span className="text-slate-500">File Size:</span>
                  <div className="text-slate-200 font-semibold">~41.2 MB</div>
                </div>
                <div>
                  <span className="text-slate-500">Target OS:</span>
                  <div className="text-slate-200 font-semibold">Android 8.0+ (Oreo+)</div>
                </div>
                <div>
                  <span className="text-slate-500">Architecture:</span>
                  <div className="text-emerald-400 font-semibold">Universal (ARM64 / x86)</div>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <a
                href={directApkUrl}
                download="PhishGuard.apk"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-5 h-5" />
                <span>Direct Download APK</span>
              </a>
              <p className="text-center text-[11px] text-slate-500 font-mono">
                SHA-256 Verified • 100% Virus & Malware Free
              </p>
            </div>
          </div>

          {/* Option 2: Instant PWA */}
          <div className="relative group bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 shadow-xl shadow-black/40">
            <div className="absolute -top-3.5 right-6 px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold rounded-full uppercase tracking-wider">
              Universal Cross-Platform
            </div>

            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
                <Globe className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Instant Web App (PWA)</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Progressive Web App that installs directly to your home screen or desktop without using phone storage or needing APK installation.
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-800/80 text-xs font-mono">
                <div>
                  <span className="text-slate-500">Compatibility:</span>
                  <div className="text-slate-200 font-semibold">iOS, Android, Mac, Win</div>
                </div>
                <div>
                  <span className="text-slate-500">Storage Used:</span>
                  <div className="text-cyan-400 font-semibold">&lt; 2 MB (Ultra Light)</div>
                </div>
                <div>
                  <span className="text-slate-500">Updates:</span>
                  <div className="text-slate-200 font-semibold">Auto-Syncing</div>
                </div>
                <div>
                  <span className="text-slate-500">Permissions:</span>
                  <div className="text-emerald-400 font-semibold">Zero Special Access</div>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button
                onClick={handleInstallPWA}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-cyan-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Layers className="w-5 h-5" />
                <span>{isInstallable ? 'Install App on Device' : 'Install / Add to Home Screen'}</span>
              </button>
              <p className="text-center text-[11px] text-slate-500 font-mono">
                Works instantly on iPhone Safari & Android Chrome
              </p>
            </div>
          </div>

        </div>

        {/* QR Code Presentation Showcase */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: QR Code Preview with Toggle */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* Selector Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-4 text-xs font-semibold">
                <button
                  onClick={() => setQrType('apk')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    qrType === 'apk'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Direct APK QR
                </button>
                <button
                  onClick={() => setQrType('portal')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    qrType === 'portal'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Web App / PWA QR
                </button>
              </div>

              <div className="p-4 rounded-3xl bg-white shadow-2xl shadow-cyan-500/20 border-4 border-cyan-400/40 max-w-[280px] sm:max-w-[320px]">
                <img 
                  src={qrType === 'apk' ? './PhishGuard_Direct_APK_QR.png' : './PhishGuard_QR.png'} 
                  alt={qrType === 'apk' ? 'PhishGuard Direct APK QR Code' : 'PhishGuard Web App QR Code'} 
                  className="w-full h-auto rounded-xl block" 
                />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <a
                  href={qrType === 'apk' ? './PhishGuard_Direct_APK_QR.png' : './PhishGuard_QR.png'}
                  download={qrType === 'apk' ? 'PhishGuard_Direct_APK_QR.png' : 'PhishGuard_QR.png'}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save QR (PNG)
                </a>
                <a
                  href="./PhishGuard_Download_Card.png"
                  download="PhishGuard_Download_Card.png"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Standee Poster (HD)
                </a>
              </div>

              <p className="text-[11px] font-mono text-slate-400 mt-2 text-center">
                {qrType === 'apk' 
                  ? '✨ Triggers direct PhishGuard.apk file download' 
                  : '✨ Opens full responsive Web Platform & PWA'}
              </p>
            </div>

            {/* Right Column: Instructions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  <QrCode className="w-4 h-4" /> Instant Mobile Scanning
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Scan With Any Mobile Camera
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Anyone can open their default Camera app or Google Lens, point it at this QR code, and instantly access PhishGuard to download the APK or install the Progressive Web App.
                </p>
              </div>

              {/* Step by step */}
              <div className="space-y-3 font-sans">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Point Camera or Scanner</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Open your phone camera (Android or iOS) and point at the QR code.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Tap the Screen Notification</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tap the yellow/blue pop-up bubble to launch PhishGuard on your device.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Download APK or Install PWA</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Choose "Download APK" for standalone installation or "Add to Home screen" for instant app launch!
                    </p>
                  </div>
                </div>
              </div>

              {/* Shareable Link Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="truncate w-full text-xs font-mono text-slate-300">
                  <span className="text-slate-500">Live URL: </span>
                  <span className="text-cyan-400 font-semibold">{liveWebUrl}</span>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Android APK Installation Help Note */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <h4 className="font-semibold text-amber-200">Android APK Installation Note (Side-loading)</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Since this is an academic research project build, your Android phone may show <em>"File might be harmful"</em> or <em>"Install unknown apps"</em> when downloading directly. Simply tap <strong>"Download anyway"</strong> and allow installation from your browser. PhishGuard contains zero malware or tracking.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
