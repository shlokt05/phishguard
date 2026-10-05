import os
import sys
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image as RLImage
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

def draw_slide_decorations(canvas_obj, doc):
    canvas_obj.saveState()
    w, h = doc.pagesize
    # Dark tactical background
    canvas_obj.setFillColor(colors.HexColor("#0A0E17"))
    canvas_obj.rect(0, 0, w, h, fill=1, stroke=0)
    
    # Hairline grid accents
    canvas_obj.setStrokeColor(colors.HexColor("#1A2234"))
    canvas_obj.setLineWidth(0.75)
    canvas_obj.line(40, h - 60, w - 40, h - 60)
    canvas_obj.line(40, 45, w - 40, 45)
    
    # Top header bar
    canvas_obj.setFillColor(colors.HexColor("#10B981"))
    canvas_obj.setFont("Helvetica-Bold", 10)
    canvas_obj.drawString(45, h - 45, "PHISHGUARD // CYBER DEFENSE OPERATIONS SUITE v1.4.2")
    
    canvas_obj.setFillColor(colors.HexColor("#64748B"))
    canvas_obj.setFont("Helvetica", 9)
    canvas_obj.drawRightString(w - 45, h - 45, "SECURITY INTELLIGENCE & THREAT LAB")
    
    # Bottom footer
    canvas_obj.setFillColor(colors.HexColor("#64748B"))
    canvas_obj.setFont("Helvetica", 8)
    canvas_obj.drawString(45, 30, "LIVE SYSTEM URL: https://shlokt05.github.io/phishguard/  |  CONFIDENTIAL & OPERATIONAL")
    
    page_num = canvas_obj.getPageNumber()
    canvas_obj.setFillColor(colors.HexColor("#10B981"))
    canvas_obj.setFont("Helvetica-Bold", 8)
    canvas_obj.drawRightString(w - 45, 30, f"SLIDE {page_num:02d} // 10")
    
    canvas_obj.restoreState()

def build_pdf():
    root_dir = r"c:\Users\Shlok Tripathi\.gemini\antigravity\scratch\phishguard"
    pdf_filename = os.path.join(root_dir, "PhishGuard_App_Presentation.pdf")
    icon_path = os.path.join(root_dir, "frontend", "public", "icon.png")

    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=landscape(letter), # 11 x 8.5 inches (792 x 612 pt)
        leftMargin=45,
        rightMargin=45,
        topMargin=75,
        bottomMargin=55
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'SlideTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#FFFFFF"),
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'SlideSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#94A3B8"),
        spaceAfter=14
    )

    h2_style = ParagraphStyle(
        'CardH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#10B981"),
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'CardBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#CBD5E1"),
        spaceAfter=4
    )

    bullet_style = ParagraphStyle(
        'CardBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor("#E2E8F0"),
        leftIndent=12,
        firstLineIndent=-12,
        spaceAfter=4
    )

    tag_style = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#10B981")
    )

    story = []

    # ==================== SLIDE 1: COVER ====================
    story.append(Spacer(1, 40))
    if os.path.exists(icon_path):
        img = RLImage(icon_path, width=80, height=80)
        img.hAlign = 'CENTER'
        story.append(img)
        story.append(Spacer(1, 15))

    cover_title = ParagraphStyle(
        'CoverTitle',
        parent=title_style,
        fontSize=38,
        leading=44,
        alignment=1, # Center
        textColor=colors.HexColor("#FFFFFF")
    )
    cover_sub = ParagraphStyle(
        'CoverSub',
        parent=subtitle_style,
        fontSize=14,
        leading=20,
        alignment=1,
        textColor=colors.HexColor("#34D399")
    )
    cover_desc = ParagraphStyle(
        'CoverDesc',
        parent=body_style,
        fontSize=10.5,
        leading=16,
        alignment=1,
        textColor=colors.HexColor("#94A3B8")
    )

    story.append(Paragraph("PHISHGUARD", cover_title))
    story.append(Paragraph("TACTICAL CYBERSECURITY & PHISHING DEFENSE PLATFORM", cover_sub))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Interactive Threat Lab  |  SOC Operations Dashboard  |  Heuristics Engine  |  Native Mobile APK & iOS PWA", cover_desc))
    story.append(Spacer(1, 25))

    cover_meta_data = [
        [
            Paragraph("<b>VERSION</b><br/><font color='#10B981'>v1.4.2 Production</font>", body_style),
            Paragraph("<b>PLATFORMS</b><br/><font color='#38BDF8'>Android APK / iOS PWA / Web</font>", body_style),
            Paragraph("<b>ARCHITECTURE</b><br/><font color='#F59E0B'>React 18 + Capacitor + Vite</font>", body_style),
            Paragraph("<b>HOSTING</b><br/><font color='#A78BFA'>GitHub Pages Global CDN</font>", body_style)
        ]
    ]
    t_cover = Table(cover_meta_data, colWidths=[175, 175, 175, 175])
    t_cover.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#111827")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#1E293B")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#1E293B")),
        ('PADDING', (0,0), (-1,-1), 10),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    story.append(t_cover)
    story.append(PageBreak())

    # ==================== SLIDE 2: PROBLEM & MISSION ====================
    story.append(Paragraph("The Phishing Epidemic & The PhishGuard Mission", title_style))
    story.append(Paragraph("Why traditional antivirus software fails against modern, weaponized social engineering attacks.", subtitle_style))

    c1 = [
        Paragraph("CRITICAL THREAT LANDSCAPE", h2_style),
        Paragraph("<b>• 3.4 Billion Malicious Emails Daily:</b> Phishing remains the #1 entry point for 91% of enterprise cyberattacks.", bullet_style),
        Paragraph("<b>• Weaponized AI Web Clones:</b> Threat actors deploy pixel-perfect replicas of banking & university portals within minutes.", bullet_style),
        Paragraph("<b>• The 'HTTPS Lock Icon' Myth:</b> Over 83% of active phishing sites now carry valid SSL certificates, rendering browser lock icons deceptive.", bullet_style),
        Paragraph("<b>• Smishing & Quishing Surge:</b> Malicious SMS text lures and poisoned QR codes completely bypass email spam filters.", bullet_style),
        Paragraph("<b>• Passive Training Failure:</b> Static PowerPoint slides fail to build muscular pattern recognition in real-world scenarios.", bullet_style)
    ]

    c2 = [
        Paragraph("THE PHISHGUARD STRATEGIC ANSWER", h2_style),
        Paragraph("<b>• Hands-On Threat Lab:</b> Real vs. Fake interactive comparison sandbox exposing subtle domain & UI deception cues.", bullet_style),
        Paragraph("<b>• Dual Heuristics Scanner:</b> Instant, client-side analysis of suspicious URLs and deceptive SMS messages.", bullet_style),
        Paragraph("<b>• SOC Telemetry & Readiness Score:</b> Real-time defense readiness benchmarking (88/100 readiness meter).", bullet_style),
        Paragraph("<b>• Forensic Autopsy Posters:</b> Deep-dive case studies covering Credential Harvesting, Smishing, and Quishing.", bullet_style),
        Paragraph("<b>• Zero-Friction Universal Access:</b> Native Android APK, iOS Safari PWA (Add to Home), and 24/7 web access.", bullet_style)
    ]

    t_s2 = Table([[c1, c2]], colWidths=[345, 345])
    t_s2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), colors.HexColor("#111827")),
        ('BACKGROUND', (1,0), (1,0), colors.HexColor("#0D1B2A")),
        ('BOX', (0,0), (0,0), 1, colors.HexColor("#EF4444")),
        ('BOX', (1,0), (1,0), 1, colors.HexColor("#10B981")),
        ('PADDING', (0,0), (-1,-1), 14),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_s2)
    story.append(PageBreak())

    # ==================== SLIDE 3: COMPLETE ARCHITECTURE ====================
    story.append(Paragraph("End-to-End System Architecture & Technology Stack", title_style))
    story.append(Paragraph("Engineered for extreme responsiveness, client-side privacy, offline capability, and universal cross-platform deployment.", subtitle_style))

    arch_data = [
        [
            Paragraph("<b>TIER 1: FRONTEND</b>", h2_style),
            Paragraph("<b>TIER 2: CROSS-PLATFORM</b>", h2_style),
            Paragraph("<b>TIER 3: HEURISTICS</b>", h2_style),
            Paragraph("<b>TIER 4: DEVOPS</b>", h2_style)
        ],
        [
            Paragraph("<b>React 18 + Vite 5</b><br/>Lightning-fast HMR and optimized production bundling.<br/><br/><b>TypeScript</b><br/>100% type-safe state models across all modules.<br/><br/><b>Tailwind CSS</b><br/>Dark tactical palette (#0A0E17, slate cards, hairline borders).<br/><br/><b>Lucide Icons</b><br/>Crisp SVG tactical symbols.", body_style),
            Paragraph("<b>Capacitor 6 Runtime</b><br/>Native Android wrapper with full native hardware bridges.<br/><br/><b>Adaptive Mipmaps</b><br/>Complete icon density matrix: mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi.<br/><br/><b>Apple iOS Safari PWA</b><br/>Web manifest, full-screen standalone mode, touch icons.<br/><br/><b>HashRouter</b><br/>Zero 404 routing errors on static edge hosts.", body_style),
            Paragraph("<b>Shannon Entropy Engine</b><br/>Detects randomly generated domain algorithms (DGA).<br/><br/><b>TLD Reputation Matrix</b><br/>Scans risky extensions (.top, .xyz, .buzz, .cc).<br/><br/><b>NLP Smishing Parser</b><br/>Scans for urgency triggers ('blocked', 'immediate action').<br/><br/><b>100% Client-Side</b><br/>Zero telemetry sent to 3rd-party servers; private by design.", body_style),
            Paragraph("<b>GitHub Pages Global CDN</b><br/>Fastly edge servers with auto-renewing TLS 1.3.<br/><br/><b>GitHub Actions CI/CD</b><br/>Automated build & push on every commit to main branch.<br/><br/><b>SPA Fallbacks</b><br/>Dual 200.html & 404.html handlers for zero-refresh errors.<br/><br/><b>24/7 Zero Maintenance</b><br/>100% serverless, resilient, and always accessible.", body_style)
        ]
    ]

    t_s3 = Table(arch_data, colWidths=[172, 172, 172, 172])
    t_s3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#111827")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#1E293B")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#1E293B")),
        ('PADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_s3)
    story.append(PageBreak())

    # ==================== SLIDE 4: MODULE 1 - SOC DASHBOARD ====================
    story.append(Paragraph("Module 01: Tactical SOC Operations Dashboard", title_style))
    story.append(Paragraph("High-contrast Security Operations Center interface replacing generic consumer UI with mission-critical telemetry.", subtitle_style))

    d1 = [
        Paragraph("TELEMETRY & READINESS METRICS", h2_style),
        Paragraph("<b>• Live Pulse Header:</b> Real-time operational status badge: <font color='#10B981'>● SYSTEM OPERATIONAL // ENGINE v1.4.2 // HEURISTICS ACTIVE</font>.", bullet_style),
        Paragraph("<b>• Security Readiness Meter:</b> Interactive gauge measuring overall resilience (e.g. <b>88/100 Readiness</b> across 12 completed audits).", bullet_style),
        Paragraph("<b>• Live Threat Advisory Stream:</b> Categorized, real-time alert ticker displaying active attacks, flagged domains, and verified security endpoints.", bullet_style),
        Paragraph("<b>• Tactical Quick Actions:</b> Direct triggers for incident reporting, threat escalation, and emergency guidance.", bullet_style)
    ]

    d2 = [
        Paragraph("2x2 PRIMARY OPERATIONS MATRIX", h2_style),
        Paragraph("<b>1. IOC Heuristics Engine:</b> Live interactive bar allowing instant URL & SMS paste for sub-second threat confidence scoring.", bullet_style),
        Paragraph("<b>2. Real vs. Fake Threat Lab:</b> Visual side-by-side cloned site sandbox with interactive deception radar pins.", bullet_style),
        Paragraph("<b>3. Tactical Threat Cards:</b> Forensic autopsy library detailing vectors like Quishing, Smishing, and Impersonation.", bullet_style),
        Paragraph("<b>4. Scenario Attack Drills:</b> Interactive practical challenges to test real-world user detection capabilities.", bullet_style)
    ]

    t_s4 = Table([[d1, d2]], colWidths=[345, 345])
    t_s4.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#111827")),
        ('BOX', (0,0), (0,0), 1, colors.HexColor("#38BDF8")),
        ('BOX', (1,0), (1,0), 1, colors.HexColor("#10B981")),
        ('PADDING', (0,0), (-1,-1), 14),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_s4)
    story.append(PageBreak())

    # ==================== SLIDE 5: MODULE 2 - THREAT LAB ====================
    story.append(Paragraph("Module 02: The Threat Lab - Real vs. Fake Clone Sandbox", title_style))
    story.append(Paragraph("Interactive forensic arena enabling visual comparison and autopsy of fraudulent web clones.", subtitle_style))

    tl1 = [
        Paragraph("SANDBOX CAPABILITIES & ARCHITECTURE", h2_style),
        Paragraph("<b>• Dual View Modes:</b> Seamlessly toggle between <em>Interactive Split View</em> (side-by-side comparison) and <em>Single View</em> with a live Safe/Clone flip switch.", bullet_style),
        Paragraph("<b>• Interactive Radar Pins:</b> Glowing forensic hotspot markers superimposed directly over deceptive UI components.", bullet_style),
        Paragraph("<b>• Live Forensic Tooltips:</b> Clicking any pin reveals the exact psychological lure and technical deception mechanism used by cybercriminals.", bullet_style),
        Paragraph("<b>• Forensic Autopsy Scorecard:</b> Real-time checklist evaluating user detection precision against malicious indicators.", bullet_style)
    ]

    tl2 = [
        Paragraph("BUILT-IN FORENSIC SCENARIOS", h2_style),
        Paragraph("<b>• NetBanking Portal Clone:</b> Fake root domain (<font color='#EF4444'>bank-secure-auth.top</font>), deceptive SSL badge, credential & OTP harvesting.", bullet_style),
        Paragraph("<b>• University Campus Portal:</b> Subdomain deception (<font color='#EF4444'>student-portal.campus.example</font>), unencrypted HTTP transport.", bullet_style),
        Paragraph("<b>• E-Commerce Storefront:</b> Fabricated 5-minute countdown timers, stolen credit card capture, fake Norton seals.", bullet_style),
        Paragraph("<b>• Enterprise Cloud (M365):</b> Reverse-proxy session cookie hijacking simulation and unsolicited 2FA verification prompts.", bullet_style)
    ]

    t_s5 = Table([[tl1, tl2]], colWidths=[345, 345])
    t_s5.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#111827")),
        ('BOX', (0,0), (0,0), 1, colors.HexColor("#10B981")),
        ('BOX', (1,0), (1,0), 1, colors.HexColor("#F59E0B")),
        ('PADDING', (0,0), (-1,-1), 14),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_s5)
    story.append(PageBreak())

    # ==================== SLIDE 6: MODULE 3 - HEURISTIC DETECTOR ====================
    story.append(Paragraph("Module 03: Dual-Mode Phishing Heuristic Engine", title_style))
    story.append(Paragraph("Sub-second risk scoring algorithm inspecting raw URLs and SMS messages entirely client-side.", subtitle_style))

    det_data = [
        [
            Paragraph("<b>URL HEURISTIC ENGINE</b>", h2_style),
            Paragraph("<b>SMS SMISHING ENGINE</b>", h2_style),
            Paragraph("<b>VERDICT ENGINE</b>", h2_style)
        ],
        [
            Paragraph("<b>Hostname Parsing</b><br/>Separates protocol, subdomain, root domain, path, and query params.<br/><br/><b>Typosquatting Check</b><br/>Detects homoglyphs and character substitutions (e.g. goog1e.com).<br/><br/><b>Shannon Entropy</b><br/>Detects algorithmic randomness in suspicious domain strings.<br/><br/><b>High-Risk TLD Audit</b><br/>Flags high-abuse extensions (.xyz, .top, .buzz, .cc, .loan).", body_style),
            Paragraph("<b>Urgency Trigger Detection</b><br/>Flags panic words ('account blocked', 'immediate KYC', 'within 24 hours').<br/><br/><b>Masked Shorteners</b><br/>Isolates bit.ly, tinyurl, and raw IP address links.<br/><br/><b>Authority Spoofing</b><br/>Recognizes fake bank headers (SBI, HDFC, ICICI, PayPal).<br/><br/><b>Financial Coercion</b><br/>Flags fake refunds, tax penalties, and lottery claims.", body_style),
            Paragraph("<b>3-Tier Classification Matrix:</b><br/><br/>🟢 <b>0% - 25% RISK (CLEAN)</b><br/>Verified legitimate domain.<br/><br/>🟡 <b>26% - 69% (SUSPICIOUS)</b><br/>Abnormal subdomains or urgency cues.<br/><br/>🔴 <b>70% - 100% (DANGEROUS)</b><br/>Confirmed phishing vectors.<br/><br/><b>Zero Data Leakage:</b><br/>Input is never transmitted externally.", body_style)
        ]
    ]

    t_s6 = Table(det_data, colWidths=[230, 230, 230])
    t_s6.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#111827")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#1E293B")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#1E293B")),
        ('PADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_s6)
    story.append(PageBreak())

    # ==================== SLIDE 7: MODULE 4 - AWARENESS POSTERS ====================
    story.append(Paragraph("Module 04: Tactical Awareness Posters & Forensic Autopsies", title_style))
    story.append(Paragraph("Six comprehensive threat cards featuring interactive forensic modals, IOC breakdowns, and defense checklists.", subtitle_style))

    posters_data = [
        [
            Paragraph("<b>01. CREDENTIAL HARVESTING</b><br/><font color='#94A3B8'>Fake corporate SSO & Microsoft 365 login portals designed to steal passwords and bypass 2FA cookies.</font><br/><font color='#EF4444'><b>[CRITICAL SEVERITY]</b></font>", body_style),
            Paragraph("<b>02. BANKING SMISHING</b><br/><font color='#94A3B8'>Deceptive SMS alerts threatening immediate debit card freeze or KYC deactivation with fake OTP forms.</font><br/><font color='#EF4444'><b>[FINANCIAL LOSS]</b></font>", body_style)
        ],
        [
            Paragraph("<b>03. QR CODE QUISHING</b><br/><font color='#94A3B8'>Counterfeit QR stickers pasted over parking meters, payment counters, or email attachments to bypass security gateways.</font><br/><font color='#F59E0B'><b>[STEALTH VECTOR]</b></font>", body_style),
            Paragraph("<b>04. PARCEL DELIVERY SCAM</b><br/><font color='#94A3B8'>Spoofed courier SMS (FedEx, DHL, India Post) demanding small redelivery fees to harvest credit card CVVs.</font><br/><font color='#38BDF8'><b>[MASS PHISHING]</b></font>", body_style)
        ],
        [
            Paragraph("<b>05. EXECUTIVE IMPERSONATION</b><br/><font color='#94A3B8'>Whaling lures imitating CEOs or HR directors requesting emergency confidential wire transfers or gift cards.</font><br/><font color='#10B981'><b>[ENTERPRISE RISK]</b></font>", body_style),
            Paragraph("<b>06. RANSOMWARE ATTACHMENT</b><br/><font color='#94A3B8'>Weaponized macro invoices (.docm, .vbs, .iso) masquerading as vendor statements to drop malware payloads.</font><br/><font color='#EF4444'><b>[SYSTEM COMPROMISE]</b></font>", body_style)
        ]
    ]

    t_s7 = Table(posters_data, colWidths=[345, 345])
    t_s7.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#111827")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#1E293B")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#1E293B")),
        ('PADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_s7)
    story.append(PageBreak())

    # ==================== SLIDE 8: MODULE 5 - ACADEMY & QUIZ ====================
    story.append(Paragraph("Module 05: Cybersecurity Academy & Dynamic Quiz Engine", title_style))
    story.append(Paragraph("Structured 8-stage progressive curriculum combined with interactive, scenario-based evaluation drills.", subtitle_style))

    ac1 = [
        Paragraph("8-STAGE CYBER DEFENSE CURRICULUM", h2_style),
        Paragraph("<b>• Stage 01 // Attack Evolution:</b> How phishing evolved from Nigerian 419 spam to targeted spear-phishing.", bullet_style),
        Paragraph("<b>• Stage 02 // Attack Taxonomy:</b> Deep-dive into Spear Phishing, Smishing, Vishing, and Quishing.", bullet_style),
        Paragraph("<b>• Stage 03 // Clone Mechanics:</b> How reverse-proxy phishing kits (Evilginx) steal live 2FA session tokens.", bullet_style),
        Paragraph("<b>• Stage 04 // URL Anatomy:</b> Inspecting protocols, subdomains, Second-Level Domains, and paths.", bullet_style),
        Paragraph("<b>• Stage 05 // Visual Red Flags:</b> Spotting low-res graphics, deceptive fonts, and fake trust badges.", bullet_style),
        Paragraph("<b>• Stage 06 // Response Protocols:</b> Actionable steps for emergency credential rotation and bank freezing.", bullet_style),
        Paragraph("<b>• Stage 07 // Practical Drills:</b> Hands-on identification challenge testing real vs spoofed URLs.", bullet_style),
        Paragraph("<b>• Stage 08 // Threat Lab Capstone:</b> Graduation into live interactive sandbox dissection.", bullet_style)
    ]

    ac2 = [
        Paragraph("DYNAMIC QUIZ & MASTERY CERTIFICATION", h2_style),
        Paragraph("<b>• Realistic Scenario Challenges:</b> Users inspect authentic-looking email excerpts and SMS notifications, classifying them as SAFE or SUSPICIOUS.", bullet_style),
        Paragraph("<b>• Instant Technical Feedback:</b> Immediate rationale explaining why an indicator is dangerous or clean.", bullet_style),
        Paragraph("<b>• Dynamic Score Integration:</b> Quiz scores directly calculate user's Global SOC Readiness Score.", bullet_style),
        Paragraph("<b>• Compliance Readiness:</b> Aligned with NIST CSF and ISO 27001 employee awareness requirements.", bullet_style)
    ]

    t_s8 = Table([[ac1, ac2]], colWidths=[345, 345])
    t_s8.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#111827")),
        ('BOX', (0,0), (0,0), 1, colors.HexColor("#10B981")),
        ('BOX', (1,0), (1,0), 1, colors.HexColor("#38BDF8")),
        ('PADDING', (0,0), (-1,-1), 14),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_s8)
    story.append(PageBreak())

    # ==================== SLIDE 9: MODULE 6 - POSTURE & CAMPAIGNS ====================
    story.append(Paragraph("Module 06: Defense Posture, Telemetry & Campaigns", title_style))
    story.append(Paragraph("Equipping individuals and security teams with personal defense postures, progress telemetry, and simulated drills.", subtitle_style))

    ent_data = [
        [
            Paragraph("<b>DIGITAL POSTURE (`Safety.tsx`)</b>", h2_style),
            Paragraph("<b>TELEMETRY (`Progress.tsx`)</b>", h2_style),
            Paragraph("<b>DRILL CAMPAIGNS (`Campaign.tsx`)</b>", h2_style)
        ],
        [
            Paragraph("<b>Hardware Keys (FIDO2)</b><br/>Guide to implementing phishing-resistant YubiKeys & WebAuthn.<br/><br/><b>Authenticator vs SMS</b><br/>Strategies to eliminate SIM-swapping and SMS OTP interception.<br/><br/><b>Password Managers</b><br/>Leveraging browser auto-fill as an automatic domain verification defense.<br/><br/><b>Breach Audits</b><br/>Checking email leaks against global credential dump databases.", body_style),
            Paragraph("<b>Cumulative Defense Score</b><br/>Tracks long-term defensive capability improvements.<br/><br/><b>Audit History Log</b><br/>Chronological record of all inspected URLs and SMS drills.<br/><br/><b>Unlockable Badges</b><br/>SOC Sentinel, Domain Auditor, Heuristics Master.<br/><br/><b>Daily Streak Tracking</b><br/>Maintains high alert readiness through habitual training.", body_style),
            Paragraph("<b>Simulated Phishing Drills</b><br/>Create controlled corporate mock phishing scenarios.<br/><br/><b>Template Library</b><br/>IT password alerts, urgent HR notifications, shipping updates.<br/><br/><b>Click-Through Metrics</b><br/>Measure human vulnerability rates across teams.<br/><br/><b>Remedial Retraining</b><br/>Automatically route compromised users to the Threat Lab.", body_style)
        ]
    ]

    t_s9 = Table(ent_data, colWidths=[230, 230, 230])
    t_s9.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#111827")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#1E293B")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#1E293B")),
        ('PADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_s9)
    story.append(PageBreak())

    # ==================== SLIDE 10: MULTI-PLATFORM ACCESS ====================
    story.append(Paragraph("Universal Multi-Platform Delivery & Live Access", title_style))
    story.append(Paragraph("Engineered for instant cross-device access across Android, Apple iOS, and Desktop browsers.", subtitle_style))

    mp1 = [
        Paragraph("3-IN-1 UNIVERSAL DISTRIBUTION", h2_style),
        Paragraph("<b>1. Native Android APK:</b> Built with Capacitor 6, high-resolution adaptive mipmap icons (mdpi to xxxhdpi), native splash screen, offline execution.", bullet_style),
        Paragraph("<b>2. Apple iOS Safari PWA:</b> Zero App Store restrictions; users open Safari and tap <font color='#38BDF8'>Share ➔ Add to Home Screen</font> for a full-screen native experience.", bullet_style),
        Paragraph("<b>3. Global Edge Web:</b> Live worldwide on GitHub Pages Fastly CDN with TLS 1.3 encryption and zero hosting costs.", bullet_style)
    ]

    qr_img_rel = "PhishGuard_Clean_QR.png"
    qr_widget = RLImage(qr_img_rel, width=115, height=115) if os.path.exists(qr_img_rel) else Paragraph("<b>[QR CODE]</b>", bullet_style)

    mp2 = [
        Paragraph("SCAN TO DOWNLOAD & LAUNCH", h2_style),
        Table([
            [
                qr_widget,
                [
                    Paragraph("<b>• Live Web & PWA URL:</b><br/><font color='#38BDF8'>https://shlokt05.github.io/phishguard/</font>", bullet_style),
                    Paragraph("<b>• Direct Android APK:</b><br/><font color='#10B981'>https://shlokt05.github.io/phishguard/PhishGuard.apk</font>", bullet_style),
                    Paragraph("<b>• Source Repository:</b><br/><font color='#A78BFA'>https://github.com/shlokt05/phishguard</font>", bullet_style),
                ]
            ]
        ], colWidths=[125, 205], style=[('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)])
    ]

    t_s10 = Table([[mp1, mp2]], colWidths=[345, 345])
    t_s10.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#111827")),
        ('BOX', (0,0), (0,0), 1, colors.HexColor("#10B981")),
        ('BOX', (1,0), (1,0), 1, colors.HexColor("#38BDF8")),
        ('PADDING', (0,0), (-1,-1), 14),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_s10)

    doc.build(story, onFirstPage=draw_slide_decorations, onLaterPages=draw_slide_decorations)
    print(f"Successfully generated {pdf_filename} ({os.path.getsize(pdf_filename)/1024:.2f} KB)")

if __name__ == "__main__":
    build_pdf()
