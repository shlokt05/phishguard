import React, { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, AlertCircle, Info, ExternalLink } from 'lucide-react';

interface AnalysisResult {
  url: string;
  hasHttps: boolean;
  registeredDomain: string;
  subdomain: string;
  suspiciousKeywords: string[];
  riskScore: 'Low' | 'Medium' | 'High';
  findings: string[];
}

export const UrlAnalyzer: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('https://example-bank.security-check.example');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const sampleUrls = [
    'https://www.example-bank.com',
    'https://secure.example-bank.com',
    'https://example-bank.security-check.example',
    'https://examplebank-login.example'
  ];

  const analyzeUrl = (urlToTest: string) => {
    let cleanUrl = urlToTest.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    const hasHttps = cleanUrl.startsWith('https://');
    
    let hostname = '';
    try {
      const parsed = new URL(cleanUrl);
      hostname = parsed.hostname;
    } catch (e) {
      hostname = cleanUrl.replace(/^https?:\/\//, '').split('/')[0];
    }

    const parts = hostname.split('.');
    let registeredDomain = hostname;
    let subdomain = '';

    if (parts.length >= 2) {
      registeredDomain = parts.slice(-2).join('.');
      subdomain = parts.slice(0, -2).join('.');
    }

    const suspiciousTerms = ['security-check', 'login', 'verify', 'update', 'account', 'secure-portal', 'auth'];
    const foundTerms = suspiciousTerms.filter(term => hostname.toLowerCase().includes(term));

    const findings: string[] = [];
    let riskPoints = 0;

    if (!hasHttps) {
      findings.push('Unencrypted Connection: URL uses HTTP instead of HTTPS.');
      riskPoints += 2;
    } else {
      findings.push('Encrypted Connection: HTTPS is present (Note: HTTPS alone does NOT prove legitimacy!).');
    }

    if (subdomain.includes('example-bank') || hostname.includes('example-bank.')) {
      if (registeredDomain !== 'example-bank.com') {
        findings.push(`Domain Discrepancy: Main registered domain is '${registeredDomain}', NOT 'example-bank.com'. 'example-bank' is placed in a deceptive subdomain or prefix.`);
        riskPoints += 3;
      }
    }

    if (foundTerms.length > 0) {
      findings.push(`Suspicious Keywords Detected: URL contains keywords often used in spoofing (${foundTerms.join(', ')}).`);
      riskPoints += 1;
    }

    if (hostname.includes('-') && !hostname.endsWith('.com')) {
      findings.push(`Hyphenated Domain Structure: Scammers frequently use hyphens (e.g. 'example-bank') to mimic famous trademarks.`);
      riskPoints += 1;
    }

    let riskScore: 'Low' | 'Medium' | 'High' = 'Low';
    if (riskPoints >= 3) riskScore = 'High';
    else if (riskPoints >= 1) riskScore = 'Medium';

    setResult({
      url: cleanUrl,
      hasHttps,
      registeredDomain,
      subdomain: subdomain || '(None)',
      suspiciousKeywords: foundTerms,
      riskScore,
      findings
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Search className="w-5 h-5 text-brand-400" />
          <h3 className="font-bold text-lg text-white">Educational URL Analyzer</h3>
        </div>
        <p className="text-xs text-slate-400">
          Enter or select a fictional URL to analyze its HTTPS status, domain structure, subdomains, and visual indicators.
        </p>
      </div>

      {/* Quick Select Preset Buttons */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-2">Test Fictional Examples:</label>
        <div className="flex flex-wrap gap-2">
          {sampleUrls.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputUrl(sample);
                analyzeUrl(sample);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="https://example-bank.security-check.example"
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-200 focus:outline-none focus:border-brand-500 transition"
        />
        <button
          onClick={() => analyzeUrl(inputUrl)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-shield-dark font-semibold text-sm text-white hover:opacity-90 transition shadow-md shadow-brand-500/20 flex items-center gap-2"
        >
          Analyze URL
        </button>
      </div>

      {/* Analysis Output */}
      {result && (
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4 animate-in fade-in">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-semibold text-slate-400">Analysis Breakdown</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                result.riskScore === 'High'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : result.riskScore === 'Medium'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}
            >
              Educational Risk: {result.riskScore}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-500 block mb-1">HTTPS Encryption:</span>
              <span className={result.hasHttps ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {result.hasHttps ? 'HTTPS Present' : 'No HTTPS'}
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-500 block mb-1">Root Registered Domain:</span>
              <span className="text-brand-300 font-bold">{result.registeredDomain}</span>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-500 block mb-1">Subdomain Prefix:</span>
              <span className="text-slate-300 font-bold">{result.subdomain}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-300 mb-2">Detailed Educational Observations:</h4>
            <ul className="space-y-1.5">
              {result.findings.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-brand-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

      {/* Mandatory Specification Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
        <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong>Important Disclaimer:</strong> This tool provides educational indicators only and does not guarantee that a website is safe or malicious.
        </p>
      </div>

    </div>
  );
};
