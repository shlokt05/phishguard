import base64
import os
import subprocess
import sys

def main():
    root_dir = r"c:\Users\Shlok Tripathi\.gemini\antigravity\scratch\phishguard"
    icon_path = os.path.join(root_dir, "frontend", "public", "icon.png")
    
    icon_b64 = ""
    if os.path.exists(icon_path):
        with open(icon_path, "rb") as f:
            icon_b64 = base64.b64encode(f.read()).decode("utf-8")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>PhishGuard - App Presentation & Architectural Overview</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

  @page {{
    size: 16in 9in;
    margin: 0;
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}

  body {{
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #06090F;
    color: #E2E8F0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}

  .mono {{
    font-family: 'JetBrains Mono', monospace;
  }}

  .slide {{
    width: 16in;
    height: 9in;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    padding: 2.8rem 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: radial-gradient(circle at 85% 15%, rgba(16, 185, 129, 0.05) 0%, transparent 45%),
                radial-gradient(circle at 15% 85%, rgba(59, 130, 246, 0.05) 0%, transparent 45%),
                #0A0E17;
    overflow: hidden;
    border-bottom: 2px solid #1E293B;
  }}

  .slide-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
  }}

  .brand {{
    display: flex;
    align-items: center;
    gap: 1rem;
  }}

  .brand-logo {{
    width: 44px;
    height: 44px;
    border-radius: 10px;
    border: 1px solid rgba(16, 185, 129, 0.4);
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
  }}

  .brand-title {{
    font-size: 1.35rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: #F8FAFC;
  }}

  .brand-subtitle {{
    font-size: 0.72rem;
    color: #10B981;
    letter-spacing: 0.18em;
  }}

  .slide-meta {{
    text-align: right;
    font-size: 0.75rem;
    color: #64748B;
  }}

  .slide-meta-badge {{
    display: inline-block;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #10B981;
    padding: 0.25rem 0.65rem;
    border-radius: 4px;
    font-size: 0.72rem;
    font-weight: 600;
  }}

  .slide-content {{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }}

  .slide-footer {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 0.9rem;
    font-size: 0.75rem;
    color: #475569;
  }}

  .grid-2 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }}

  .grid-3 {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
  }}

  .grid-4 {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1.2rem;
  }}

  .card {{
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 1.4rem;
    position: relative;
  }}

  .card-highlight {{
    border-color: rgba(16, 185, 129, 0.35);
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, #111827 100%);
  }}

  .card-danger {{
    border-color: rgba(239, 68, 68, 0.35);
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, #111827 100%);
  }}

  .card-title {{
    font-size: 1.15rem;
    font-weight: 700;
    color: #F1F5F9;
    margin-bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }}

  .card-body {{
    font-size: 0.88rem;
    line-height: 1.55;
    color: #94A3B8;
  }}

  .tag {{
    display: inline-block;
    font-size: 0.68rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 0.05em;
  }}

  .tag-emerald {{
    background: rgba(16, 185, 129, 0.15);
    color: #34D399;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }}

  .tag-blue {{
    background: rgba(59, 130, 246, 0.15);
    color: #60A5FA;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }}

  .tag-crimson {{
    background: rgba(239, 68, 68, 0.15);
    color: #F87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }}

  .tag-amber {{
    background: rgba(245, 158, 11, 0.15);
    color: #FBBF24;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }}

  .slide-h1 {{
    font-size: 2.3rem;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    margin-bottom: 0.5rem;
  }}

  .slide-subtitle {{
    font-size: 1.05rem;
    color: #94A3B8;
    margin-bottom: 1.8rem;
  }}

  ul.tactical-list {{
    list-style: none;
    margin-top: 0.6rem;
  }}

  ul.tactical-list li {{
    position: relative;
    padding-left: 1.4rem;
    margin-bottom: 0.6rem;
    font-size: 0.86rem;
    color: #CBD5E1;
    line-height: 1.45;
  }}

  ul.tactical-list li::before {{
    content: "▹";
    position: absolute;
    left: 0;
    color: #10B981;
    font-weight: bold;
  }}

  .stat-box {{
    background: #0D131F;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
  }}

  .stat-val {{
    font-size: 2.2rem;
    font-weight: 800;
    color: #10B981;
    line-height: 1;
    margin-bottom: 0.35rem;
  }}

  .stat-lbl {{
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #64748B;
  }}

  /* Table styling */
  table.tactical-table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }}

  table.tactical-table th {{
    background: #0D1424;
    color: #94A3B8;
    font-weight: 600;
    text-align: left;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }}

  table.tactical-table td {{
    padding: 0.8rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: #CBD5E1;
    vertical-align: middle;
  }}

  table.tactical-table tr:hover td {{
    background: rgba(255, 255, 255, 0.02);
  }}
</style>
</head>
<body>

<!-- SLIDE 1: COVER -->
<section class="slide" style="justify-content: center; text-align: center; background: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, #0A0E17 75%);">
  <div style="margin-bottom: 2rem;">
    <img src="data:image/png;base64,{icon_b64}" style="width: 130px; height: 130px; border-radius: 26px; border: 2px solid rgba(16, 185, 129, 0.5); box-shadow: 0 0 50px rgba(16, 185, 129, 0.35);" />
  </div>
  <div class="mono" style="font-size: 1rem; color: #10B981; letter-spacing: 0.3em; margin-bottom: 0.8rem; font-weight: 700;">
    CYBERSECURITY DEFENSE OPERATIONS // SUITE v1.4.2
  </div>
  <h1 style="font-size: 4rem; font-weight: 900; letter-spacing: -0.03em; color: #FFFFFF; line-height: 1.1; margin-bottom: 1rem;">
    PHISHGUARD
  </h1>
  <p style="font-size: 1.4rem; color: #94A3B8; max-width: 900px; margin: 0 auto 2.5rem; line-height: 1.5; font-weight: 400;">
    Next-Generation Tactical Phishing Defense, Interactive Threat Lab & Security Operations Center (SOC) Platform
  </p>

  <div style="display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 3rem;">
    <span class="tag tag-emerald mono" style="font-size: 0.85rem; padding: 0.4rem 1rem;">● 10 CORE OPERATIONAL MODULES</span>
    <span class="tag tag-blue mono" style="font-size: 0.85rem; padding: 0.4rem 1rem;">ANDROID APK + iOS PWA + WEB</span>
    <span class="tag tag-amber mono" style="font-size: 0.85rem; padding: 0.4rem 1rem;">ZERO TELEMETRY // PRIVACY FIRST</span>
  </div>

  <div class="mono" style="font-size: 0.9rem; color: #64748B;">
    Live Public URL: <span style="color: #38BDF8; font-weight: 600;">https://shlokt05.github.io/phishguard/</span> | Production Build: Oct 2026
  </div>
</section>

<!-- SLIDE 2: EXECUTIVE SUMMARY & THREAT LANDSCAPE -->
<section class="slide">
  <div class="slide-header">
    <div class="brand">
      <img src="data:image/png;base64,{icon_b64}" class="brand-logo" />
      <div>
        <div class="brand-title">PHISHGUARD</div>
        <div class="brand-subtitle mono">THREAT INTELLIGENCE</div>
      </div>
    </div>
    <div class="slide-meta">
      <span class="slide-meta-badge mono">SLIDE 02 // EXECUTIVE SUMMARY</span>
    </div>
  </div>

  <div class="slide-content">
    <h2 class="slide-h1">The Modern Threat Landscape & Mission</h2>
    <p class="slide-subtitle">Why traditional antivirus and passive training fail against weaponized social engineering.</p>

    <div class="grid-3" style="margin-bottom: 2rem;">
      <div class="stat-box">
        <div class="stat-val mono" style="color: #EF4444;">3.4B+</div>
        <div class="stat-lbl">Phishing Emails Sent Daily</div>
      </div>
      <div class="stat-box">
        <div class="stat-val mono" style="color: #F59E0B;">91%</div>
        <div class="stat-lbl">Cyberattacks Begin With Phishing</div>
      </div>
      <div class="stat-box">
        <div class="stat-val mono" style="color: #10B981;">100%</div>
        <div class="stat-lbl">Hands-On Interactive Defense in PhishGuard</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card card-danger">
        <div class="card-title" style="color: #F87171;">
          ⚠️ Critical Cybersecurity Vulnerabilities
        </div>
        <ul class="tactical-list">
          <li><strong>Weaponized AI Clones:</strong> Attackers create pixel-perfect clones of banking and corporate login portals in minutes.</li>
          <li><strong>Smishing & Quishing Surges:</strong> Malicious SMS messages and QR codes bypass standard email spam filters.</li>
          <li><strong>Psychological Manipulation:</strong> Fabricated urgency ("Account Blocked", "Immediate KYC") triggers impulsive human errors.</li>
          <li><strong>Passive Training Failure:</strong> Reading static articles does not train human muscle memory for real attacks.</li>
        </ul>
      </div>

      <div class="card card-highlight">
        <div class="card-title" style="color: #34D399;">
          🛡️ The PhishGuard Strategic Solution
        </div>
        <ul class="tactical-list">
          <li><strong>Interactive Threat Lab:</strong> Side-by-side inspection of live clones with radar-guided forensic hotspots.</li>
          <li><strong>Dual Heuristics Engine:</strong> Real-time risk analysis for suspicious URLs and deceptive SMS text.</li>
          <li><strong>SOC Readiness Posture:</strong> Real-time readiness meter tracking threat identification competency.</li>
          <li><strong>Universal Accessibility:</strong> Native Android APK, zero-friction iOS Safari PWA, and public web access.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="slide-footer mono">
    <div>PHISHGUARD SUITE // ARCHITECTURAL BLUEPRINT</div>
    <div>CONFIDENTIAL & OPERATIONAL</div>
  </div>
</section>

<!-- SLIDE 3: SYSTEM ARCHITECTURE & TECH STACK -->
<section class="slide">
  <div class="slide-header">
    <div class="brand">
      <img src="data:image/png;base64,{icon_b64}" class="brand-logo" />
      <div>
        <div class="brand-title">PHISHGUARD</div>
        <div class="brand-subtitle mono">SYSTEM TOPOLOGY</div>
      </div>
    </div>
    <div class="slide-meta">
      <span class="slide-meta-badge mono">SLIDE 03 // ARCHITECTURE</span>
    </div>
  </div>

  <div class="slide-content">
    <h2 class="slide-h1">End-to-End Engineering Architecture</h2>
    <p class="slide-subtitle">A high-performance, modular stack engineered for zero latency, offline readiness, and universal deployment.</p>

    <div class="grid-4" style="margin-bottom: 1.5rem;">
      <div class="card">
        <div class="tag tag-emerald mono" style="margin-bottom: 0.8rem;">TIER 1: PRESENTATION</div>
        <div class="card-title">Frontend Engine</div>
        <div class="card-body">
          <ul class="tactical-list">
            <li><strong>React 18 + TypeScript:</strong> Type-safe state and reactive component trees.</li>
            <li><strong>Vite 5 Build Tool:</strong> Sub-second HMR and optimized production bundling.</li>
            <li><strong>Tailwind CSS:</strong> Anti-AI Dark Tactical palette (#0A0E17 slate).</li>
            <li><strong>Lucide Icons:</strong> Precision vector iconography.</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="tag tag-blue mono" style="margin-bottom: 0.8rem;">TIER 2: CROSS-PLATFORM</div>
        <div class="card-title">Mobile & PWA Layer</div>
        <div class="card-body">
          <ul class="tactical-list">
            <li><strong>Capacitor 6 Runtime:</strong> Native Android bridge and asset syncing.</li>
            <li><strong>Full Mipmap Matrix:</strong> mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi app icons.</li>
            <li><strong>iOS Safari PWA:</strong> Web App Manifest, offline caching, and Add-to-Home.</li>
            <li><strong>HashRouter:</strong> 100% route immunity against 404s on static CDNs.</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="tag tag-amber mono" style="margin-bottom: 0.8rem;">TIER 3: HEURISTICS</div>
        <div class="card-title">Threat Detection</div>
        <div class="card-body">
          <ul class="tactical-list">
            <li><strong>Entropy Analysis:</strong> Shannon entropy checks for obfuscated domains.</li>
            <li><strong>TLD Reputation:</strong> Heuristic filters for high-risk TLDs (.top, .buzz).</li>
            <li><strong>Smishing NLP Engine:</strong> Panic keyword & fraud trigger detection.</li>
            <li><strong>Client-Side Execution:</strong> Zero network roundtrip; privacy guaranteed.</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="tag tag-crimson mono" style="margin-bottom: 0.8rem;">TIER 4: DEVOPS & CI/CD</div>
        <div class="card-title">Global Edge Delivery</div>
        <div class="card-body">
          <ul class="tactical-list">
            <li><strong>GitHub Actions CI/CD:</strong> Automatic build and deploy on git push.</li>
            <li><strong>GitHub Pages CDN:</strong> Global Fastly edge servers with TLS 1.3.</li>
            <li><strong>Static Fallback:</strong> Dual 200.html & 404.html single-page handlers.</li>
            <li><strong>24/7 Availability:</strong> Zero server maintenance overhead.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card" style="background: #0B111E; border-color: rgba(59, 130, 246, 0.2);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span class="mono" style="font-size: 0.85rem; color: #60A5FA; font-weight: 600;">PLATFORM DATA PIPELINE FLOW:</span>
        <span class="mono" style="font-size: 0.8rem; color: #94A3B8;">User Input ➔ Heuristic Vectorizer ➔ Risk Score Calculation ➔ Threat Lab Forensic Overlay ➔ Visual Remediation</span>
      </div>
    </div>
  </div>

  <div class="slide-footer mono">
    <div>PHISHGUARD SUITE // ARCHITECTURAL BLUEPRINT</div>
    <div>CONFIDENTIAL & OPERATIONAL</div>
  </div>
</section>

<!-- SLIDE 4: MODULE 1 - SOC DASHBOARD -->
<section class="slide">
  <div class="slide-header">
    <div class="brand">
      <img src="data:image/png;base64,{icon_b64}" class="brand-logo" />
      <div>
        <div class="brand-title">PHISHGUARD</div>
        <div class="brand-subtitle mono">MODULE 01 // DASHBOARD</div>
      </div>
    </div>
    <div class="slide-meta">
      <span class="slide-meta-badge mono">SLIDE 04 // SOC OPERATIONS</span>
    </div>
  </div>

  <div class="slide-content">
    <h2 class="slide-h1">Tactical SOC Dashboard (`Home.tsx`)</h2>
    <p class="slide-subtitle">Centralized Security Operations Center interface delivering live system telemetry, threat feed, and readiness scoring.</p>

    <div class="grid-2">
      <div class="card card-highlight">
        <div class="card-title">
          <span style="color: #10B981;">●</span> Telemetry Header & Readiness Meter
        </div>
        <div class="card-body">
          <ul class="tactical-list">
            <li><strong>Live System Pulse:</strong> Real-time operational indicator: <span class="mono" style="color: #10B981;">● SYSTEM OPERATIONAL // ENGINE v1.4.2</span>.</li>
            <li><strong>Dynamic Readiness Meter:</strong> Displays the user's defense score (e.g., <strong>88/100</strong> across 12 completed audits), benchmarking resilience against standard social engineering baselines.</li>
            <li><strong>Tactical Quick Actions:</strong> One-tap buttons for rapid incident triage, panic reporting, and forensic lab jump.</li>
            <li><strong>Zero Generic Aesthetic:</strong> Crafted with high-contrast slate surfaces, hairline borders, and JetBrains Mono technical badges.</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <span style="color: #38BDF8;">⚡</span> 2x2 Primary Operations Matrix
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-top: 0.5rem;">
            <div style="background: #0B111E; padding: 0.8rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
              <div class="mono" style="font-size: 0.78rem; color: #10B981; font-weight: 700;">1. IOC DETECTOR</div>
              <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 0.2rem;">Live URL & SMS heuristic scanner with instant result overlay.</div>
            </div>
            <div style="background: #0B111E; padding: 0.8rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
              <div class="mono" style="font-size: 0.78rem; color: #60A5FA; font-weight: 700;">2. THREAT LAB</div>
              <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 0.2rem;">Side-by-side cloned site autopsy and interactive radar pins.</div>
            </div>
            <div style="background: #0B111E; padding: 0.8rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
              <div class="mono" style="font-size: 0.78rem; color: #F59E0B; font-weight: 700;">3. THREAT CARDS</div>
              <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 0.2rem;">6 tactical awareness posters with technical forensic breakdown.</div>
            </div>
            <div style="background: #0B111E; padding: 0.8rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
              <div class="mono" style="font-size: 0.78rem; color: #EC4899; font-weight: 700;">4. ATTACK DRILLS</div>
              <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 0.2rem;">Real-world scenario simulation and timed challenge evaluations.</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top: 1.5rem;">
      <div class="card-title" style="font-size: 1rem; color: #CBD5E1;">
        <span class="mono" style="color: #F59E0B;">[LIVE THREAT ADVISORY STREAM]</span>
      </div>
      <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
        <div style="flex: 1; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); padding: 0.8rem; border-radius: 6px;">
          <div class="mono" style="font-size: 0.75rem; color: #EF4444; font-weight: 700;">URGENT ALERT // ACTIVE WAVE</div>
          <div style="font-size: 0.82rem; color: #E2E8F0; margin-top: 0.2rem;">Slick Banking SMS campaign targeting Indian UPI users with fake reward claims.</div>
        </div>
        <div style="flex: 1; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.2); padding: 0.8rem; border-radius: 6px;">
          <div class="mono" style="font-size: 0.75rem; color: #F59E0B; font-weight: 700;">HEURISTIC FLAGGED // DOMAIN DRIFT</div>
          <div style="font-size: 0.82rem; color: #E2E8F0; margin-top: 0.2rem;">Typosquatted domain `netbanking-hdfc-otp.top` identified and blacklisted.</div>
        </div>
        <div style="flex: 1; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); padding: 0.8rem; border-radius: 6px;">
          <div class="mono" style="font-size: 0.75rem; color: #10B981; font-weight: 700;">STATUS // ALL CLEAR</div>
          <div style="font-size: 0.82rem; color: #E2E8F0; margin-top: 0.2rem;">Official OAuth2 identity endpoints verified against global CA roots.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="slide-footer mono">
    <div>PHISHGUARD SUITE // ARCHITECTURAL BLUEPRINT</div>
    <div>CONFIDENTIAL & OPERATIONAL</div>
  </div>
</section>

<!-- SLIDE 5: MODULE 2 - THE THREAT LAB -->
<section class="slide">
  <div class="slide-header">
    <div class="brand">
      <img src="data:image/png;base64,{icon_b64}" class="brand-logo" />
      <div>
        <div class="brand-title">PHISHGUARD</div>
        <div class="brand-subtitle mono">MODULE 02 // THREAT LAB</div>
      </div>
    </div>
    <div class="slide-meta">
      <span class="slide-meta-badge mono">SLIDE 05 // REAL VS FAKE</span>
    </div>
  </div>

  <div class="slide-content">
    <h2 class="slide-h1">The Threat Lab: Real vs. Fake Analysis (`ThreatLab.tsx`)</h2>
    <p class="slide-subtitle">A state-of-the-art interactive forensic sandbox allowing users to visually dissect web clones.</p>

    <div class="grid-2">
      <div class="card card-highlight">
        <div class="card-title" style="color: #34D399;">
          🔬 Core Capabilities & Workflow
        </div>
        <ul class="tactical-list">
          <li><strong>Dual View Modes:</strong> Toggle effortlessly between <em>Interactive Split View</em> (side-by-side comparison) and <em>Single View</em> with a live Safe/Clone flip switch.</li>
          <li><strong>Radar Forensic Hotspots:</strong> Interactive glowing indicator pins superimposed over fraudulent elements (e.g., lookalike domains, fake lock icons, spoofed countdown timers).</li>
          <li><strong>Instant Evidence Reveal:</strong> Clicking any hotspot displays an in-depth forensic tooltip explaining the attacker's psychological lure and technical deception mechanism.</li>
          <li><strong>Gamified Verification:</strong> Users test their detection intuition and immediately see the autopsy checklist score.</li>
        </ul>
      </div>

      <div class="card">
        <div class="card-title" style="color: #38BDF8;">
          🎯 Built-in Real-World Scenarios
        </div>
        <table class="tactical-table">
          <thead>
            <tr>
              <th>Target Sector</th>
              <th>Deceptive Element</th>
              <th>Attacker Vector</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>NetBanking Portal</strong></td>
              <td>`bank-secure-auth.top`</td>
              <td>OTP & Credential Interception</td>
            </tr>
            <tr>
              <td><strong>University Portal</strong></td>
              <td>`student-portal.campus.example`</td>
              <td>Identity & Enrollment Hijack</td>
            </tr>
            <tr>
              <td><strong>E-Commerce Mega-Store</strong></td>
              <td>Artificial 5-min timer</td>
              <td>Credit Card / UPI Theft</td>
            </tr>
            <tr>
              <td><strong>Enterprise Cloud (M365)</strong></td>
              <td>Unsolicited 2FA prompt</td>
              <td>Session Cookie Hijacking</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card" style="margin-top: 1.5rem; background: #0B111E;">
      <div class="card-body mono" style="font-size: 0.85rem; color: #CBD5E1;">
        <span style="color: #10B981; font-weight: 700;">WHY THIS MATTERS:</span> Traditional cybersecurity education tells users "check the lock icon". Attackers now use HTTPS certificates on 83% of phishing sites. PhishGuard's Threat Lab trains users to inspect the <strong>Root Domain, Shannon Entropy, and Hostname Hierarchy</strong> instead of relying on flawed heuristics.
      </div>
    </div>
  </div>

  <div class="slide-footer mono">
    <div>PHISHGUARD SUITE // ARCHITECTURAL BLUEPRINT</div>
    <div>CONFIDENTIAL & OPERATIONAL</div>
  </div>
</section>

<!-- SLIDE 6: MODULE 3 - HEURISTIC DETECTOR -->
<section class="slide">
  <div class="slide-header">
    <div class="brand">
      <img src="data:image/png;base64,{icon_b64}" class="brand-logo" />
      <div>
        <div class="brand-title">PHISHGUARD</div>
        <div class="brand-subtitle mono">MODULE 03 // DETECTOR</div>
      </div>
    </div>
    <div class="slide-meta">
      <span class="slide-meta-badge mono">SLIDE 06 // HEURISTICS ENGINE</span>
    </div>
  </div>

  <div class="slide-content">
    <h2 class="slide-h1">Dual-Mode Phishing Detector (`Detect.tsx`)</h2>
    <p class="slide-subtitle">Instant, client-side heuristic inspection engine analyzing suspicious URLs and SMS smishing lures.</p>

    <div class="grid-3" style="margin-bottom: 1.5rem;">
      <div class="card">
        <div class="card-title" style="color: #34D399;">
          🌐 URL Inspection Engine
        </div>
        <div class="card-body">
          <ul class="tactical-list">
            <li><strong>Hostname Parsing:</strong> Dissects Subdomain, Second-Level Domain, and TLD.</li>
            <li><strong>Typosquatting Check:</strong> Detects character swaps and homoglyphs (e.g. `goog1e.com`, `rnicrosoft.com`).</li>
            <li><strong>Entropy Analysis:</strong> Identifies algorithmic, randomly generated domain strings (DGA).</li>
            <li><strong>Port & Protocol Audit:</strong> Flags non-standard web ports and unencrypted HTTP links.</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-title" style="color: #60A5FA;">
          💬 SMS Smishing Engine
        </div>
        <div class="card-body">
          <ul class="tactical-list">
            <li><strong>Panic Trigger Words:</strong> Scans for "blocked", "immediate action", "KYC update", "suspended".</li>
            <li><strong>Masked Redirects:</strong> Automatically isolates shorteners (bit.ly, tinyurl) and raw IPs.</li>
            <li><strong>Authority Spoofing:</strong> Identifies fake bank headers (SBI, HDFC, ICICI, PayPal).</li>
            <li><strong>Financial Coercion:</strong> Detects fake tax refunds, lottery wins, and lottery claims.</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-title" style="color: #F59E0B;">
          📊 Verdict Classification
        </div>
        <div class="card-body">
          <div style="margin-bottom: 0.8rem;">
            <span class="tag tag-emerald mono">0% - 25% RISK: CLEAN</span>
            <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 0.2rem;">Official domains, trusted TLDs, no suspicious urgency.</div>
          </div>
          <div style="margin-bottom: 0.8rem;">
            <span class="tag tag-amber mono">26% - 69% RISK: SUSPICIOUS</span>
            <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 0.2rem;">Subdomain tricks, uncommon TLD, mild urgency cues.</div>
          </div>
          <div>
            <span class="tag tag-crimson mono">70% - 100% RISK: DANGEROUS</span>
            <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 0.2rem;">Known phishing indicators, credentials requested, blacklisted strings.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card card-highlight">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span class="mono" style="color: #10B981; font-weight: 700; font-size: 0.95rem;">PRIVACY ADVANTAGE:</span>
          <span style="color: #CBD5E1; font-size: 0.88rem; margin-left: 0.5rem;">Evaluations execute entirely client-side. The user's confidential SMS text and inspected URLs are never sent to external third-party logging servers.</span>
        </div>
        <span class="tag tag-emerald mono">ZERO DATA LEAKAGE</span>
      </div>
    </div>
  </div>

  <div class="slide-footer mono">
    <div>PHISHGUARD SUITE // ARCHITECTURAL BLUEPRINT</div>
    <div>CONFIDENTIAL & OPERATIONAL</div>
  </div>
</section>

<!-- SLIDE 7: MODULE 4 - AWARENESS POSTERS -->
<section class="slide">
  <div class="slide-header">
    <div class="brand">
      <img src="data:image/png;base64,{icon_b64}" class="brand-logo" />
      <div>
        <div class="brand-title">PHISHGUARD</div>
        <div class="brand-subtitle mono">MODULE 04 // POSTERS</div>
      </div>
    </div>
    <div class="slide-meta">
      <span class="slide-meta-badge mono">SLIDE 07 // AWARENESS SUITE</span>
    </div>
  </div>

  <div class="slide-content">
    <h2 class="slide-h1">Tactical Posters & Autopsy Modals (`Posters.tsx`)</h2>
    <p class="slide-subtitle">Six comprehensive, visual forensic cards delivering technical breakdowns and counter-measures for major attack vectors.</p>

    <div class="grid-3" style="margin-bottom: 1.5rem;">
      <div class="card">
        <div class="mono" style="font-size: 0.75rem; color: #EF4444; font-weight: 700;">VECTOR 01</div>
        <div class="card-title" style="font-size: 1.05rem;">Credential Harvesting</div>
        <div class="card-body">
          Weaponized Microsoft 365 / Google Workspace login clones designed to capture corporate SSO credentials and session cookies.
        </div>
        <div style="margin-top: 0.8rem;"><span class="tag tag-crimson mono">HIGH SEVERITY</span></div>
      </div>

      <div class="card">
        <div class="mono" style="font-size: 0.75rem; color: #EF4444; font-weight: 700;">VECTOR 02</div>
        <div class="card-title" style="font-size: 1.05rem;">Banking Smishing</div>
        <div class="card-body">
          Fraudulent SMS alerting of sudden account freeze or PAN/KYC invalidation, redirecting victims to cloned OTP verification forms.
        </div>
        <div style="margin-top: 0.8rem;"><span class="tag tag-crimson mono">FINANCIAL LOSS</span></div>
      </div>

      <div class="card">
        <div class="mono" style="font-size: 0.75rem; color: #F59E0B; font-weight: 700;">VECTOR 03</div>
        <div class="card-title" style="font-size: 1.05rem;">QR Code Phishing (Quishing)</div>
        <div class="card-body">
          Counterfeit QR stickers pasted over parking meters, restaurant menus, or phishing emails to bypass secure email gateways.
        </div>
        <div style="margin-top: 0.8rem;"><span class="tag tag-amber mono">STEALTH VECTOR</span></div>
      </div>

      <div class="card">
        <div class="mono" style="font-size: 0.75rem; color: #3B82F6; font-weight: 700;">VECTOR 04</div>
        <div class="card-title" style="font-size: 1.05rem;">Parcel Delivery Scam</div>
        <div class="card-body">
          Fake courier alerts (FedEx, DHL, India Post) demanding a nominal fee ($1.50) to release a delivery, harvesting full debit card details.
        </div>
        <div style="margin-top: 0.8rem;"><span class="tag tag-blue mono">MASS FRAUD</span></div>
      </div>

      <div class="card">
        <div class="mono" style="font-size: 0.75rem; color: #8B5CF6; font-weight: 700;">VECTOR 05</div>
        <div class="card-title" style="font-size: 1.05rem;">Executive Impersonation</div>
        <div class="card-body">
          Whaling and CEO fraud messages sent to finance personnel requesting urgent, confidential wire transfers or gift cards.
        </div>
        <div style="margin-top: 0.8rem;"><span class="tag tag-emerald mono">ENTERPRISE RISK</span></div>
      </div>

      <div class="card">
        <div class="mono" style="font-size: 0.75rem; color: #EF4444; font-weight: 700;">VECTOR 06</div>
        <div class="card-title" style="font-size: 1.05rem;">Ransomware Attachment</div>
        <div class="card-body">
          Weaponized macro-enabled invoices (.docm, .vbs, .iso) masquerading as vendor receipts to deliver Cobalt Strike or LockBit payloads.
        </div>
        <div style="margin-top: 0.8rem;"><span class="tag tag-crimson mono">CRITICAL IMPACT</span></div>
      </div>
    </div>

    <div class="card card-highlight">
      <div class="card-body mono" style="font-size: 0.85rem; color: #CBD5E1;">
        <strong style="color: #10B981;">TECHNICAL AUTOPSY MODAL:</strong> Clicking any card opens a full forensic breakdown modal featuring <strong>Indicators of Compromise (IOCs), Attack Lifecycle Diagram,</strong> and an actionable <strong>Mitigation Checklist</strong> for immediate defensive action.
      </div>
    </div>
  </div>

  <div class="slide-footer mono">
    <div>PHISHGUARD SUITE // ARCHITECTURAL BLUEPRINT</div>
    <div>CONFIDENTIAL & OPERATIONAL</div>
  </div>
</section>

<!-- SLIDE 8: MODULE 5 - ACADEMY & DRILLS -->
<section class="slide">
  <div class="slide-header">
    <div class="brand">
      <img src="data:image/png;base64,{icon_b64}" class="brand-logo" />
      <div>
        <div class="brand-title">PHISHGUARD</div>
        <div class="brand-subtitle mono">MODULE 05 // ACADEMY</div>
      </div>
    </div>
    <div class="slide-meta">
      <span class="slide-meta-badge mono">SLIDE 08 // DRILLS & EVALUATION</span>
    </div>
  </div>

  <div class="slide-content">
    <h2 class="slide-h1">Cybersecurity Academy & Drill Engine (`Learn.tsx`, `Quiz.tsx`)</h2>
    <p class="slide-subtitle">Structured multi-tier educational path backed by interactive scenario drills and dynamic quiz evaluations.</p>

    <div class="grid-2">
      <div class="card">
        <div class="card-title" style="color: #10B981;">
          📚 8-Stage Progressive Curriculum
        </div>
        <div class="card-body">
          <ul class="tactical-list">
            <li><strong>Stage 01 // Fundamentals:</strong> What defines modern phishing and why traditional spam filters miss 9% of attacks.</li>
            <li><strong>Stage 02 // Attack Vectors:</strong> In-depth taxonomy of Spear Phishing, Smishing, Vishing, and Quishing.</li>
            <li><strong>Stage 03 // Clone Mechanics:</strong> Reverse-proxy kits (Modlishka, Evilginx) and how they bypass standard 2FA.</li>
            <li><strong>Stage 04 // URL Forensic Dissection:</strong> Deep breakdown of Protocols, Subdomains, Root Domains, Paths, and Query Strings.</li>
            <li><strong>Stage 05 // Visual Red Flags:</strong> Identifying mismatched logos, broken CSS, and fake SSL security badges.</li>
            <li><strong>Stage 06 // Response Protocols:</strong> Clear playbooks for immediate password revocation and bank notifications.</li>
            <li><strong>Stage 07 // Practical Drills:</strong> Hands-on challenge evaluating real vs simulated attack strings.</li>
            <li><strong>Stage 08 // Threat Lab Capstone:</strong> Graduation into live sandbox clone analysis.</li>
          </ul>
        </div>
      </div>

      <div class="card card-highlight">
        <div class="card-title" style="color: #60A5FA;">
          🎯 Dynamic Quiz & Readiness Evaluation
        </div>
        <div class="card-body">
          <div style="background: #0B111E; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.06);">
            <div class="mono" style="font-size: 0.85rem; color: #F59E0B; font-weight: 700;">REALISTIC SCENARIO EVALUATIONS</div>
            <div style="font-size: 0.82rem; color: #CBD5E1; margin-top: 0.3rem;">
              Users are presented with realistic scenarios (e.g., student enrollment portal, corporate password reset) and must classify them as <em>SAFE</em> or <em>SUSPICIOUS</em>.
            </div>
          </div>
          <ul class="tactical-list">
            <li><strong>Instant Technical Rationale:</strong> Detailed forensic explanations provided for both correct and incorrect choices.</li>
            <li><strong>Dynamic Score Calculation:</strong> Real-time accuracy tracking directly updates the global SOC Readiness Meter.</li>
            <li><strong>Adaptive Difficulty:</strong> From obvious spelling errors to sophisticated homoglyph attacks.</li>
            <li><strong>Certification Readiness:</strong> Equips trainees for corporate security audits and phishing readiness compliance.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="slide-footer mono">
    <div>PHISHGUARD SUITE // ARCHITECTURAL BLUEPRINT</div>
    <div>CONFIDENTIAL & OPERATIONAL</div>
  </div>
</section>

<!-- SLIDE 9: MODULE 6 - ENTERPRISE DRILLS & CAMPAIGNS -->
<section class="slide">
  <div class="slide-header">
    <div class="brand">
      <img src="data:image/png;base64,{icon_b64}" class="brand-logo" />
      <div>
        <div class="brand-title">PHISHGUARD</div>
        <div class="brand-subtitle mono">MODULE 06 // ENTERPRISE</div>
      </div>
    </div>
    <div class="slide-meta">
      <span class="slide-meta-badge mono">SLIDE 09 // POSTURE & CAMPAIGNS</span>
    </div>
  </div>

  <div class="slide-content">
    <h2 class="slide-h1">Enterprise Posture, Telemetry & Campaigns</h2>
    <p class="slide-subtitle">Equipping teams and organizations with progress telemetry, simulation drills, and security hygiene guidelines.</p>

    <div class="grid-3">
      <div class="card">
        <div class="card-title" style="color: #10B981;">
          🛡️ Digital Posture (`Safety.tsx`)
        </div>
        <div class="card-body">
          <ul class="tactical-list">
            <li><strong>Hardware Keys (FIDO2):</strong> Guide to implementing phishing-resistant YubiKeys.</li>
            <li><strong>Authenticator vs SMS:</strong> Phasing out vulnerable SMS OTPs in favor of TOTP apps.</li>
            <li><strong>Password Managers:</strong> Enforcing auto-fill verification to thwart fake domains.</li>
            <li><strong>Breach Auditing:</strong> Integration guidelines for checking compromised credentials.</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-title" style="color: #38BDF8;">
          📈 Progress Telemetry (`Progress.tsx`)
        </div>
        <div class="card-body">
          <ul class="tactical-list">
            <li><strong>Audit History:</strong> Chronological log of all simulated threat evaluations.</li>
            <li><strong>Skill Badges:</strong> Unlockable credentials (e.g. <em>SOC Sentinel, Domain Auditor, Heuristics Master</em>).</li>
            <li><strong>Streak Counter:</strong> Daily engagement tracking to maintain high security alertness.</li>
            <li><strong>Readiness History:</strong> Visual graph of resilience improvements over time.</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-title" style="color: #EC4899;">
          🏢 Attack Simulator (`Campaign.tsx`)
        </div>
        <div class="card-body">
          <ul class="tactical-list">
            <li><strong>Simulated Campaigns:</strong> Configure mock phishing scenarios for organizations.</li>
            <li><strong>Template Library:</strong> IT alerts, urgent HR notifications, delivery updates.</li>
            <li><strong>Click-Through Analytics:</strong> Track vulnerability rates across departments.</li>
            <li><strong>Automated Retraining:</strong> Route compromised employees directly to remedial modules.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card card-highlight" style="margin-top: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span class="mono" style="font-size: 0.85rem; color: #10B981; font-weight: 700;">ORGANIZATIONAL COMPLIANCE:</span>
        <span style="font-size: 0.85rem; color: #94A3B8;">Aligned with <strong>ISO 27001 (A.7.2.2 Information Security Awareness)</strong> and <strong>NIST CSF (PR.AT Awareness and Training)</strong> standards.</span>
      </div>
    </div>
  </div>

  <div class="slide-footer mono">
    <div>PHISHGUARD SUITE // ARCHITECTURAL BLUEPRINT</div>
    <div>CONFIDENTIAL & OPERATIONAL</div>
  </div>
</section>

<!-- SLIDE 10: DEPLOYMENT MATRIX & LIVE ACCESS -->
<section class="slide">
  <div class="slide-header">
    <div class="brand">
      <img src="data:image/png;base64,{icon_b64}" class="brand-logo" />
      <div>
        <div class="brand-title">PHISHGUARD</div>
        <div class="brand-subtitle mono">DEPLOYMENT MATRIX</div>
      </div>
    </div>
    <div class="slide-meta">
      <span class="slide-meta-badge mono">SLIDE 10 // MULTI-PLATFORM</span>
    </div>
  </div>

  <div class="slide-content">
    <h2 class="slide-h1">Universal Multi-Platform Deployment</h2>
    <p class="slide-subtitle">Delivering native mobile performance and instant public accessibility across Android, iOS, and Web.</p>

    <div class="grid-3" style="margin-bottom: 1.8rem;">
      <div class="card card-highlight">
        <div class="tag tag-emerald mono" style="margin-bottom: 0.8rem;">NATIVE ANDROID</div>
        <div class="card-title">Android APK Package</div>
        <div class="card-body">
          <ul class="tactical-list">
            <li>Built using <strong>Capacitor 6</strong> native wrapper.</li>
            <li>Full 5-tier adaptive mipmap icons (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi).</li>
            <li>Custom Android splash screen & dark system theme integration.</li>
            <li>Completely functional offline without external server dependencies.</li>
          </ul>
        </div>
      </div>

      <div class="card card-highlight">
        <div class="tag tag-blue mono" style="margin-bottom: 0.8rem;">APPLE iOS</div>
        <div class="card-title">iOS Safari PWA</div>
        <div class="card-body">
          <ul class="tactical-list">
            <li>Zero App Store installation barrier or signing certificates.</li>
            <li>One-tap installation: <strong>Safari ➔ Share ➔ Add to Home Screen</strong>.</li>
            <li>Launches full-screen in standalone mode without browser chrome.</li>
            <li>High-resolution iOS touch icons and custom theme color (`#0A0E17`).</li>
          </ul>
        </div>
      </div>

      <div class="card card-highlight">
        <div class="tag tag-amber mono" style="margin-bottom: 0.8rem;">GLOBAL WEB</div>
        <div class="card-title">Public Web SOC</div>
        <div class="card-body">
          <ul class="tactical-list">
            <li>Live at: <strong>https://shlokt05.github.io/phishguard/</strong></li>
            <li>Hosted on GitHub Pages with global Fastly edge acceleration.</li>
            <li>Auto-renewing TLS 1.3 HTTPS certificate.</li>
            <li>Automatic deployment pipeline via GitHub Actions on every push.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card" style="background: #0B111E; border-color: rgba(16, 185, 129, 0.3);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div class="mono" style="color: #10B981; font-weight: 700; font-size: 0.95rem;">PROJECT REPOSITORY & LIVE LINKS</div>
          <div class="mono" style="color: #94A3B8; font-size: 0.82rem; margin-top: 0.2rem;">
            GitHub: <span style="color: #38BDF8;">https://github.com/shlokt05/phishguard</span> | Live Web: <span style="color: #38BDF8;">https://shlokt05.github.io/phishguard/</span>
          </div>
        </div>
        <span class="tag tag-emerald mono" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;">STATUS: PRODUCTION READY</span>
      </div>
    </div>
  </div>

  <div class="slide-footer mono">
    <div>PHISHGUARD SUITE // ARCHITECTURAL BLUEPRINT</div>
    <div>CONFIDENTIAL & OPERATIONAL</div>
  </div>
</section>

</body>
</html>
"""

    html_file = os.path.join(root_dir, "PhishGuard_App_Presentation.html")
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Generated HTML presentation: {html_file}")

    # Generate PDF using Microsoft Edge headless
    pdf_file = os.path.join(root_dir, "PhishGuard_App_Presentation.pdf")
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    
    cmd = [
        edge_path,
        "--headless=new",
        "--disable-gpu",
        "--run-all-compositor-stages-before-draw",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_file}",
        html_file
    ]
    
    print("Exporting PDF using Microsoft Edge headless...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(pdf_file):
        size_kb = os.path.getsize(pdf_file) / 1024
        print(f"SUCCESS: Created PDF at {pdf_file} ({size_kb:.2f} KB)")
    else:
        print(f"Failed to create PDF. Stderr: {result.stderr}")

if __name__ == "__main__":
    main()
