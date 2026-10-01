export const INITIAL_MODULES = [
  {
    id: "mod-1",
    module_number: 1,
    title: "What is Phishing?",
    description: "Understand the core concepts of phishing attacks and social engineering techniques used by cybercriminals.",
    explanation: "Phishing is a social engineering attack where bad actors impersonate trustworthy entities (like banks, colleges, or service providers) via email, messages, or websites to trick individuals into disclosing sensitive data like passwords, credit card details, or personal identification.",
    warning_signs: [
      "Unexpected urgent requests asking for immediate action",
      "Generic greetings like 'Dear Customer' instead of your name",
      "Slightly misspelled domain names in sender address or URLs",
      "Unsolicited attachments or links asking you to re-verify credentials"
    ],
    fictional_example: {
      type: "Email",
      sender: "security-alert@bankk-verify.example",
      subject: "URGENT: Suspicious activity detected on your bank account!",
      body: "Dear Valued Customer, We noticed unauthorized attempts to log into your account. Click the secure link below within 24 hours to prevent account deletion: http://bankk-verify.example/login"
    },
    safety_tips: [
      "Always independently verify claims by going directly to the official website.",
      "Hover over links to inspect the destination URL before clicking.",
      "Never trust urgent demands for sensitive credentials."
    ]
  },
  {
    id: "mod-2",
    module_number: 2,
    title: "Email Phishing",
    description: "Learn how to spot deceptive emails, spoofed sender domains, and malicious attachments.",
    explanation: "Email phishing is the most prevalent form of cyber deception. Attackers craft realistic emails replicating familiar brands, educational institutions, or employers. They use spoofed headers and fake urgency to force emotional reactions.",
    warning_signs: [
      "Sender email address doesn't match the claimed organization domain",
      "Poor grammar, awkward sentence phrasing, or spelling errors",
      "Prompts to download suspicious attachments (.exe, .zip, macros in .doc)",
      "Threats of account termination or legal action if you don't respond immediately"
    ],
    fictional_example: {
      type: "Email",
      sender: "hr-portal@company-benefits-update.example",
      subject: "Mandatory Payroll Update - Action Required",
      body: "Please download the attached file 'Salary_Bonus_Form.exe' to claim your updated benefits package for this quarter."
    },
    safety_tips: [
      "Check the exact domain name after the @ symbol in the email address.",
      "Be extremely wary of executive impersonation asking for urgent wire transfers or gift cards.",
      "Do not enable macros in unexpected downloaded office documents."
    ]
  },
  {
    id: "mod-3",
    module_number: 3,
    title: "Smishing (SMS Phishing)",
    description: "Identify fraudulent text messages impersonating delivery services, banks, or emergency contacts.",
    explanation: "Smishing combines SMS with phishing. Because people read SMS messages almost immediately and trust text messages more than emails, attackers send brief texts with shortened URLs or urgent calls to action.",
    warning_signs: [
      "Shortened links (bit.ly, tinyurl, custom redirects) with no context",
      "Claims that a package delivery failed and requires a fee or address update",
      "Messages claiming your bank account or debit card is frozen",
      "Requests to click a link to verify your identity or claim a prize"
    ],
    fictional_example: {
      type: "SMS",
      sender: "+1 (555) 019-2834",
      subject: "Package Delivery Alert",
      body: "[PostExpress] Your package delivery #92831 is on hold due to missing street address. Update now to avoid return: https://postexpress-update.example/track"
    },
    safety_tips: [
      "Never click links in unexpected SMS messages.",
      "Use official apps or go directly to tracking portals via web browser.",
      "Report spam text messages to your phone carrier."
    ]
  },
  {
    id: "mod-4",
    module_number: 4,
    title: "Vishing (Voice Phishing)",
    description: "Recognize phone call scams, voice spoofing, and automated robocall extortion.",
    explanation: "Vishing uses phone calls or voice messages to manipulate victims. Scammers often spoof caller IDs to make calls appear as though they are coming from legitimate tech support, tax authorities, or your bank's fraud department.",
    warning_signs: [
      "Caller demands immediate payment via gift cards, wire transfer, or cryptocurrency",
      "Caller asks you to read aloud an OTP (One-Time Password) sent to your phone",
      "Automated robotic voice threatening arrest or legal consequences",
      "Refusal to let you hang up and call back on official helpline numbers"
    ],
    fictional_example: {
      type: "Phone Call",
      sender: "Caller ID: Bank Support (Spoofed)",
      subject: "Fraudulent Transaction Warning",
      body: "'Hello, this is Bank Fraud Prevention. We detected a $450 charge on your card. Read us the 6-digit OTP code just sent to your phone to cancel it!'"
    },
    safety_tips: [
      "Hang up immediately if caller demands an OTP or credentials.",
      "Call the organization back using the phone number printed on the back of your card or official website.",
      "Never read out authentication codes to anyone over the phone."
    ]
  },
  {
    id: "mod-5",
    module_number: 5,
    title: "Social Media Phishing",
    description: "Detect cloned profiles, fake giveaways, and phishing messages sent via direct messages.",
    explanation: "Social media phishing leverages compromised accounts or cloned profiles of your friends to send deceptive messages. Because the message comes from a 'friend', victims let their guard down.",
    warning_signs: [
      "A friend's profile sends unusual messages like 'Is this you in this video?'",
      "Offers of quick cryptocurrency returns or free luxury giveaways",
      "DMs asking you to vote for someone in a contest by logging in via a third-party link",
      "Messages asking you to receive a verification code for them"
    ],
    fictional_example: {
      type: "Direct Message",
      sender: "@friend_account (Compromised)",
      subject: "Help Me Win Contest!",
      body: "Hey! Can you please vote for me in this photography contest? Just log in with your account to cast a vote: https://contest-vote.example/auth"
    },
    safety_tips: [
      "Reach out to your friend via another communication channel to confirm if their account was hacked.",
      "Never log into third-party sites using social media DMs.",
      "Enable 2-Factor Authentication on all social media profiles."
    ]
  },
  {
    id: "mod-6",
    module_number: 6,
    title: "Malicious Links",
    description: "Master URL structure analysis, typosquatting, subdomains, and deceptive hyperlinking.",
    explanation: "Cybercriminals use typosquatting (e.g. paypa1.com instead of paypal.com) and complex subdomains (e.g. login.paypal.com.attacker.com) to deceive users. Knowing how to read a domain name is your strongest defense.",
    warning_signs: [
      "Character substitution like 'rn' instead of 'm' or '1' instead of 'l'",
      "Multiple subdomains hiding the actual root domain at the end",
      "Display text in email says one URL, but hover link targets a completely different website",
      "Use of IP addresses instead of domain names (e.g., http://192.168.1.50/login)"
    ],
    fictional_example: {
      type: "Deceptive Link",
      sender: "Deceptive Hyperlink",
      subject: "Check your account status",
      body: "Link displayed: https://www.yourbank.com | Actual Destination when clicked: http://yourbank.security-login.example/auth"
    },
    safety_tips: [
      "Look at the main domain right before the .com, .org, or .net (the top-level domain).",
      "Always hover over links on desktop or long-press on mobile to inspect full target destination.",
      "Bookmark official login portals."
    ]
  },
  {
    id: "mod-7",
    module_number: 7,
    title: "Password Safety",
    description: "Create strong passwords, avoid credential reuse, and utilize password managers.",
    explanation: "Weak or reused passwords make you vulnerable to credential stuffing attacks. If an attacker acquires your password from one compromised website, they will test it on your email, bank, and social media accounts.",
    warning_signs: [
      "Using common words, sequential numbers (123456), or personal details like birthdays",
      "Reusing the exact same password across multiple websites",
      "Writing passwords on sticky notes attached to your monitor",
      "Sharing passwords with colleagues or friends over unencrypted chat"
    ],
    fictional_example: {
      type: "Credential Risk",
      sender: "Security Audit",
      subject: "Password Weakness Example",
      body: "Password: 'Password2024!' -> Reused on Email, Banking, and Online Shopping. Compromise of one site exposes all accounts."
    },
    safety_tips: [
      "Use long passphrases (14+ characters) with uppercase, lowercase, numbers, and symbols.",
      "Use a dedicated password manager to generate and store unique credentials.",
      "Never share passwords with anyone."
    ]
  },
  {
    id: "mod-8",
    module_number: 8,
    title: "OTP (One-Time Password) Safety",
    description: "Understand why OTPs are secret keys and how attackers attempt to bypass 2FA.",
    explanation: "One-Time Passwords (OTPs) are single-use codes sent to your phone or app to prove your identity. Attackers use real-time phishing proxies to trick you into typing your OTP into fake websites so they can immediately steal your session.",
    warning_signs: [
      "Receiving an unsolicited OTP text message when you didn't request a login",
      "Phone call claiming to be bank staff asking for the code sent to your SMS",
      "Website asking for OTP without showing what action the OTP is authorizing",
      "SMS message text stating: 'Do NOT share this code with anyone', yet caller insists you read it to them"
    ],
    fictional_example: {
      type: "SMS Notification",
      sender: "AUTH-SMS",
      subject: "Security Code",
      body: "Your OTP is 849201. NEVER share this code with anyone, including bank staff. If you did not request this, contact security."
    },
    safety_tips: [
      "Treat OTPs as secret PIN numbers. No legitimate company employee will ever ask for your OTP.",
      "Always read the full text of the OTP SMS to see what transaction or device authorization it is performing.",
      "Prefer App-based Authenticator codes (like Google Authenticator or YubiKeys) over SMS."
    ]
  },
  {
    id: "mod-9",
    module_number: 9,
    title: "Online Scams",
    description: "Recognize fake job offers, lottery wins, tech support scams, and marketplace fraud.",
    explanation: "Online scams rely on emotional triggers like excitement (winning a prize), fear (legal action), or financial gain (too-good-to-be-true job offer). Scammers ask for upfront registration fees or wire transfers.",
    warning_signs: [
      "High paying work-from-home job offers requiring no interview or experience",
      "Pop-ups claiming your computer is infected with 50 viruses and giving a fake 1-800 support phone number",
      "Notification that you won a lottery or sweepstakes you never entered",
      "Requests to pay initial processing or customs fees via gift cards or crypto"
    ],
    fictional_example: {
      type: "Web Pop-up",
      sender: "Fake System Alert",
      subject: "CRITICAL SYSTEM WARNING",
      body: "YOUR COMPUTER IS INFECTED! Call Microsoft Tech Support immediately at 1-800-555-0199 to unlock your system."
    },
    safety_tips: [
      "If something sounds too good to be true, it almost certainly is a scam.",
      "Never pay money up front to receive a job offer or lottery prize.",
      "Close pop-up windows using Task Manager if they lock your browser."
    ]
  },
  {
    id: "mod-10",
    module_number: 10,
    title: "How to Report Phishing",
    description: "Learn the proper incident response steps to report phishing and protect your organization.",
    explanation: "Prompt reporting neutralizes phishing campaigns before other users fall victim. Knowing who to inform in your college, company, or national reporting portal helps take down malicious infrastructure fast.",
    warning_signs: [
      "Noticing suspicious logins on your account history",
      "Email headers showing unknown relay servers",
      "Unauthorized changes to account email address or recovery phone number"
    ],
    fictional_example: {
      type: "Incident Response Protocol",
      sender: "Security Response Team",
      subject: "Action Plan",
      body: "1. Forward suspicious email to phish-report@organization.example | 2. Change compromised credentials immediately | 3. Notify IT Helpdesk."
    },
    safety_tips: [
      "Forward suspicious phishing emails as an attachment to your security department or anti-phishing organizations (like reportphishing@apwg.org).",
      "If you entered credentials on a suspicious site, change your password immediately on the legitimate platform.",
      "Revoke session tokens and active devices from your security dashboard."
    ]
  }
];

export const INITIAL_QUIZ_QUESTIONS = [
  {
    id: "q-1",
    question_number: 1,
    question_text: "What is the primary goal of a phishing attack?",
    options: [
      "To test your internet connection speed",
      "To trick individuals into revealing sensitive personal or financial information",
      "To upgrade your operating system software",
      "To boost website traffic legitimately"
    ],
    correct_option: 1,
    explanation: "Phishing attacks use social engineering tactics to manipulate users into surrendering sensitive information like passwords, credit cards, or identity credentials.",
    category: "Phishing Basics"
  },
  {
    id: "q-2",
    question_number: 2,
    question_text: "You receive an SMS claiming your bank account is locked and prompting you to click a short link immediately. What type of attack is this?",
    options: [
      "Vishing",
      "Smishing (SMS Phishing)",
      "Spear Phishing",
      "Whaling"
    ],
    correct_option: 1,
    explanation: "Smishing refers specifically to phishing attacks carried out via SMS text messages.",
    category: "Smishing"
  },
  {
    id: "q-3",
    question_number: 3,
    question_text: "Does an 'HTTPS' prefix and padlock icon guarantee that a website is legitimate and safe?",
    options: [
      "Yes, HTTPS means a website can never be malicious",
      "Yes, padlock icons are only given to verified trustworthy corporations",
      "No, HTTPS only means connection is encrypted; cybercriminals can also get free SSL certificates for fake sites",
      "Yes, HTTPS means your browser has scanned the site for viruses"
    ],
    correct_option: 2,
    explanation: "HTTPS indicates an encrypted connection between browser and server, but HTTPS alone does NOT prove that a website is legitimate. Scammers frequently use HTTPS on fake sites.",
    category: "Fake Websites"
  },
  {
    id: "q-4",
    question_number: 4,
    question_text: "Which of the following URLs is most suspicious if you are trying to access 'Example Bank'?",
    options: [
      "https://www.example-bank.com",
      "https://secure.example-bank.com/login",
      "https://example-bank.security-check.example/login",
      "https://help.example-bank.com"
    ],
    correct_option: 2,
    explanation: "In 'example-bank.security-check.example', the actual main registered domain is 'security-check.example', NOT 'example-bank.com'. 'example-bank' is just a deceptive subdomain.",
    category: "URLs & Domains"
  },
  {
    id: "q-5",
    question_number: 5,
    question_text: "A caller claiming to be from your phone company's support team asks for the 6-digit OTP code sent to your phone to 'verify your identity'. What should you do?",
    options: [
      "Read out the code quickly so your call isn't disconnected",
      "Never share the OTP code and hang up immediately",
      "Ask them to text you their employee ID first, then give the code",
      "Give them only the first 3 digits of the OTP"
    ],
    correct_option: 1,
    explanation: "OTPs are single-use secret keys. Legitimate customer service agents will NEVER ask you to read back an authentication OTP over the phone.",
    category: "OTP Safety"
  },
  {
    id: "q-6",
    question_number: 6,
    question_text: "What is 'Vishing'?",
    options: [
      "Phishing using viral videos",
      "Phishing conducted over phone calls or voice messages",
      "Phishing via virtual reality headsets",
      "Phishing conducted inside vector drawing software"
    ],
    correct_option: 1,
    explanation: "Vishing stands for Voice Phishing, where scammers use voice calls to impersonate authority figures or institutions.",
    category: "Vishing"
  },
  {
    id: "q-7",
    question_number: 7,
    question_text: "Which password practice provides the HIGHEST security against account compromise?",
    options: [
      "Using the same 8-character password across all websites so you don't forget",
      "Using unique, complex passphrases for each account stored in a password manager",
      "Changing one letter in your password every 2 years",
      "Writing passwords down on a note under your keyboard"
    ],
    correct_option: 1,
    explanation: "Unique, long passphrases managed via a password manager prevent credential stuffing attacks if one site suffers a breach.",
    category: "Password Safety"
  },
  {
    id: "q-8",
    question_number: 8,
    question_text: "What is Two-Factor Authentication (2FA)?",
    options: [
      "Entering your password twice on the login screen",
      "A security mechanism requiring two distinct evidence forms to authenticate (e.g. password + phone code)",
      "Using two different web browsers to log in",
      "Changing your password every two months"
    ],
    correct_option: 1,
    explanation: "2FA adds an extra layer of defense by combining something you know (password) with something you have (authenticator app / phone).",
    category: "Social Engineering"
  },
  {
    id: "q-9",
    question_number: 9,
    question_text: "An email from 'service@paypa1.com' asks you to update your billing info. What red flag is present here?",
    options: [
      "The domain uses typosquatting ('paypa1.com' with a number 1 instead of letter l)",
      "The email address ends in .com",
      "The word 'service' is included",
      "The message contains text"
    ],
    correct_option: 0,
    explanation: "'paypa1.com' is a typosquatting domain where the attacker replaces 'l' with '1' to trick visually unsuspecting victims.",
    category: "Suspicious Links"
  },
  {
    id: "q-10",
    question_number: 10,
    question_text: "What should you do before clicking on any hyperlinked text in an email?",
    options: [
      "Click it immediately to see where it goes",
      "Hover over the link (or long-press on mobile) to inspect the actual destination URL",
      "Forward the email to all your contacts first",
      "Turn off your Wi-Fi before clicking"
    ],
    correct_option: 1,
    explanation: "Inspecting the destination URL by hovering reveals the real web address before your browser makes a network request.",
    category: "Suspicious Links"
  },
  {
    id: "q-11",
    question_number: 11,
    question_text: "You receive an unexpected job offer email promising $100/hour work-from-home, but requires you to pay a $50 'background check processing fee' via gift cards. What is this?",
    options: [
      "A legitimate high-paying opportunity",
      "An online employment scam designed to steal your money",
      "A standard corporate hiring process",
      "A tax refund program"
    ],
    correct_option: 1,
    explanation: "Legitimate employers never demand job applicants pay upfront fees or buy gift cards for processing.",
    category: "Online Scams"
  },
  {
    id: "q-12",
    question_number: 12,
    question_text: "What does the term 'Social Engineering' mean in cybersecurity?",
    options: [
      "Building social network websites using React",
      "Manipulating people into performing actions or divulging confidential information",
      "Designing search engine optimization algorithms",
      "Engineering cellular phone towers for social media"
    ],
    correct_option: 1,
    explanation: "Social engineering relies on human psychology (urgency, fear, curiosity, trust) rather than technical exploits alone.",
    category: "Social Engineering"
  },
  {
    id: "q-13",
    question_number: 13,
    question_text: "A browser pop-up window freezes your screen claiming your PC has 27 viruses and urges you to call a 1-800 support line. How should you respond?",
    options: [
      "Call the number immediately and give them remote desktop access",
      "Do not call the number; close the browser pop-up via Task Manager or browser tab manager",
      "Enter your credit card to buy whatever software they recommend",
      "Throw away your computer hardware"
    ],
    correct_option: 1,
    explanation: "Fake tech support pop-ups use fear tactics. Closing the browser process eliminates the pop-up without calling scammers.",
    category: "Online Scams"
  },
  {
    id: "q-14",
    question_number: 14,
    question_text: "If you realize you inadvertently entered your password on a suspicious phishing page, what is your immediate FIRST step?",
    options: [
      "Wait 48 hours to see if anything happens",
      "Immediately change your password on the official legitimate website and enable 2FA",
      "Delete your internet history",
      "Send an email to the phishing page owner asking them to delete it"
    ],
    correct_option: 1,
    explanation: "Immediately changing your credentials on the official site invalidates the stolen password before attackers use it.",
    category: "Incident Response"
  },
  {
    id: "q-15",
    question_number: 15,
    question_text: "Why is public awareness training vital for organizational cybersecurity?",
    options: [
      "It completely replaces the need for firewalls",
      "Human users are often targeted as the first line of defense; awareness reduces successful breaches drastically",
      "It speeds up internet download bandwidth",
      "It prevents hardware failures in computer monitors"
    ],
    correct_option: 1,
    explanation: "Educated users who can identify and report phishing form a strong 'human firewall' for personal and organizational security.",
    category: "Phishing Basics"
  }
];

export const INITIAL_DETECTION_CHALLENGES = [
  {
    id: "det-1",
    type: "email",
    scenario_title: "Scenario 1: Urgent Account Suspension Notice",
    sender: "security-alert@service-update-portal.example",
    subject: "Action Required: Your Cloud Account will be deactivated in 12 hours",
    content: "Dear User,\nWe detected multiple failed login attempts on your cloud storage account. Your account has been temporarily restricted. To restore full access, verify your credentials immediately at the link below.\n\nLink: http://service-update-portal.example/auth/verify",
    url_mockup: "http://service-update-portal.example/auth/verify",
    is_phishing: true,
    explanation: "PHISHING: Notice the artificial 12-hour urgency, unencrypted HTTP connection, and generic greeting. The sender domain 'service-update-portal.example' is not an official cloud service domain.",
    red_flags: [
      "Artificial 12-hour urgency pressure",
      "Non-HTTPS unencrypted URL link",
      "Generic greeting ('Dear User')",
      "Unrecognized sender domain"
    ]
  },
  {
    id: "det-2",
    type: "sms",
    scenario_title: "Scenario 2: Package Redelivery Request",
    sender: "+1 (555) 014-9982",
    subject: "SMS Text Message",
    content: "[Global Express] Package #84920 could not be delivered due to invalid house number. Please update your details and pay $1.50 redelivery fee within 24 hours: https://globalexpress-redelivery-fee.example/pay",
    url_mockup: "https://globalexpress-redelivery-fee.example/pay",
    is_phishing: true,
    explanation: "PHISHING: Smishing attempt using package delivery pretext to harvest payment card credentials. Legitimate postal carriers do not request redelivery payments via random text links.",
    red_flags: [
      "Demands small payment ($1.50) to harvest full credit card numbers",
      "Shortened suspicious domain name",
      "Unsolicited text message with urgent deadline"
    ]
  },
  {
    id: "det-3",
    type: "messaging",
    scenario_title: "Scenario 3: University IT Maintenance Announcement",
    sender: "helpdesk@campus.edu",
    subject: "Scheduled Network Maintenance this Saturday",
    content: "Hello Students and Faculty,\nPlease be advised that campus Wi-Fi services will undergo scheduled maintenance this Saturday from 2:00 AM to 5:00 AM. No action is required on your part. For questions, visit the official student portal at https://student.campus.edu/status",
    url_mockup: "https://student.campus.edu/status",
    is_phishing: false,
    explanation: "SAFE: Sent from official campus email domain (@campus.edu). Links directly to the official campus subdomain without demanding login credentials, passwords, or immediate payments.",
    red_flags: []
  },
  {
    id: "det-4",
    type: "social",
    scenario_title: "Scenario 4: Social Media Gift Card Giveaway DM",
    sender: "@Alex_Official_Prizes (Direct Message)",
    subject: "Direct Message",
    content: "CONGRATULATIONS! You were selected as today's $500 Gift Card winner! Claim your reward now by submitting your account details at our promo portal: https://giftcards-free-claim.example/win",
    url_mockup: "https://giftcards-free-claim.example/win",
    is_phishing: true,
    explanation: "PHISHING: Classic online scam. Unsolicited giveaways asking for account submission are designed to steal personal identities and account credentials.",
    red_flags: [
      "Unsolicited prize notification",
      "Requests account credentials to 'claim' a reward",
      "Third-party suspicious link"
    ]
  },
  {
    id: "det-5",
    type: "fake_website",
    scenario_title: "Scenario 5: Deceptive Social Media Login Page",
    sender: "Web Browser View",
    subject: "Fake Login Screen",
    content: "Website URL: https://connect-friends.login-auth-portal.example\nPage Title: Sign In - Social Connect\nForm Fields: Email or Phone, Password, 'Remember Me'\nBanner: 'Sign in to view private photo shared with you'",
    url_mockup: "https://connect-friends.login-auth-portal.example",
    is_phishing: true,
    explanation: "PHISHING: The page imitates a familiar social network login screen, but the domain is actually 'login-auth-portal.example'. Entering your password here transfers your credentials directly to the attacker.",
    red_flags: [
      "Domain name does not match the social network brand",
      "Emotional lure ('view private photo')",
      "Subdomain trickery ('connect-friends' prepended to fake root domain)"
    ]
  }
];

export const INITIAL_POSTERS = [
  {
    id: "post-1",
    title: "THINK BEFORE YOU CLICK",
    tagline: "Always hover over links and verify sender addresses before taking action.",
    category: "Phishing",
    bg_gradient: "from-blue-600 via-indigo-700 to-slate-900",
    icon_name: "MousePointerClick",
    download_count: 142
  },
  {
    id: "post-2",
    title: "NEVER SHARE YOUR OTP",
    tagline: "One-Time Passwords are key locks to your account. Bank staff will never ask for them.",
    category: "OTP Safety",
    bg_gradient: "from-emerald-600 via-teal-700 to-slate-900",
    icon_name: "ShieldAlert",
    download_count: 215
  },
  {
    id: "post-3",
    title: "SPOT THE PHISH",
    tagline: "Check the domain, inspect urgency, and watch out for generic greetings.",
    category: "Phishing",
    bg_gradient: "from-cyan-600 via-blue-800 to-slate-950",
    icon_name: "Eye",
    download_count: 189
  },
  {
    id: "post-4",
    title: "CHECK THE URL",
    tagline: "HTTPS doesn't mean legitimate! Always read the root domain carefully.",
    category: "Fake Websites",
    bg_gradient: "from-purple-600 via-indigo-900 to-slate-950",
    icon_name: "Link",
    download_count: 167
  },
  {
    id: "post-5",
    title: "DON'T TRUST TOO-GOOD OFFERS",
    tagline: "Instant job offers or surprise prize winnings are signs of financial scams.",
    category: "Online Scams",
    bg_gradient: "from-amber-600 via-red-700 to-slate-950",
    icon_name: "Gift",
    download_count: 134
  },
  {
    id: "post-6",
    title: "FAKE WEBSITE? STOP!",
    tagline: "Never enter credentials, OTPs or card numbers on unexpected login forms.",
    category: "Fake Websites",
    bg_gradient: "from-rose-600 via-red-800 to-slate-950",
    icon_name: "OctagonX",
    download_count: 198
  },
  {
    id: "post-7",
    title: "YOUR PASSWORD IS YOURS",
    tagline: "Use long passphrases, never reuse passwords, and store them securely.",
    category: "Password Safety",
    bg_gradient: "from-violet-600 via-purple-900 to-slate-950",
    icon_name: "KeyRound",
    download_count: 156
  },
  {
    id: "post-8",
    title: "PHISHING AWARENESS STARTS WITH YOU",
    tagline: "Be the human firewall. Report suspicious emails to your security team.",
    category: "Cyber Safety",
    bg_gradient: "from-sky-500 via-blue-700 to-slate-900",
    icon_name: "ShieldCheck",
    download_count: 230
  }
];

export const INITIAL_SAFETY_RULES = [
  { id: 1, title: "Never share OTP", description: "Treat One-Time Passwords as secret keys. Never read them over phone or chat." },
  { id: 2, title: "Never share passwords", description: "Keep credentials private. No legitimate admin will ask for your password." },
  { id: 3, title: "Check sender", description: "Verify sender email domain carefully after the @ symbol." },
  { id: 4, title: "Verify links", description: "Hover over hyperlinks to inspect the destination domain before clicking." },
  { id: 5, title: "Avoid unexpected attachments", description: "Do not download or open files (.exe, .zip, macro docs) from unknown senders." },
  { id: 6, title: "Be careful with urgent requests", description: "Scammers create false panic. Stop, breathe, and verify independently." },
  { id: 7, title: "Use strong passwords", description: "Use 14+ character passphrases with mixed characters or a password manager." },
  { id: 8, title: "Enable 2FA", description: "Turn on Two-Factor Authentication across all personal and work accounts." },
  { id: 9, title: "Keep software updated", description: "Update operating systems, browsers, and security software promptly." },
  { id: 10, title: "Report suspicious content", description: "Notify your IT/security department immediately if you suspect a phishing attempt." }
];
