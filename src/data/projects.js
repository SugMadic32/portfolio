export const categoryColors = {
  "lead": "#2954C8",
  "bio": "#7C5CFF",
  "safety": "#E1554E",
  "vision": "#0EA5A0",
  "ai": "#F0A202",
  "edtech": "#2E9E5B",
  "data": "#D6449D"
}

export const projects = [
  {
    "slug": "symposium",
    "category": "lead",
    "tag": "Technical leadership",
    "title": "RSU Symposium — Technical Lead",
    "oneLiner": "Led the technical build of a university-wide ICT symposium end to end.",
    "role": "Technical Lead",
    "tools": [
      "GitHub Pages",
      "HTML/CSS",
      "Documentation"
    ],
    "overview": "The symposium, themed \"Generative AI and the Future of ICT Learning,\" needed a technical owner for its public-facing presence — someone responsible for the site existing, working, and staying accurate as the event came together. That was my role.",
    "problem": "A university event needs a web presence before, during, and after it happens — and unlike a course project, there was no second chance to get it live on time.",
    "approach": "I designed and shipped the event website, hosted on GitHub Pages at sugmadic32.github.io/rsu-symposium. Being Technical Lead meant owning the site's accuracy and uptime end to end, not just writing code for one piece of it.",
    "build": "After the event, I produced the final ICT 401 seminar report as a polished document — closing the loop from technical delivery to the academic record of the event.",
    "outcome": "The site was live and accurate for the full run of the event, and the final report was delivered as the academic record. This is the clearest example of what I do best: taking ownership of a system end to end.",
    "reflection": "A one-person technical role on an event with a hard deadline taught me to treat \"is it actually live\" as a first-class question, not an afterthought.",
    "display": [
      "RSU Symposium",
      "technical lead"
    ],
    "status": "Delivered",
    "context": "Full event cycle",
    "highlights": [
      "Owned the event website end to end, live on GitHub Pages",
      "Produced the final ICT 401 seminar report",
      "One technical owner, one hard deadline"
    ],
    "links": [
      {
        "label": "View the live site",
        "url": "https://sugmadic32.github.io/rsu-symposium?utm_source=portfolio&utm_medium=referral&utm_campaign=aizen_site"
      }
    ]
  },
  {
    "slug": "asgr1",
    "category": "bio",
    "tag": "Computational biology",
    "title": "ASGR1 Aptamer Discovery Pipeline",
    "oneLiner": "A computational pipeline combining molecular docking and ML classification for aptamer discovery.",
    "role": "Sole builder & author",
    "tools": [
      "HDOCK",
      "HADDOCK",
      "Python",
      "scikit-learn"
    ],
    "overview": "Aptamers are short synthetic DNA or RNA strands that fold into shapes able to bind a target protein — here, ASGR1, the asialoglycoprotein receptor. Testing candidates in a lab is slow and expensive; this pipeline narrows the search computationally first.",
    "problem": "Finding a strong-binding aptamer normally means physically testing huge numbers of candidate sequences. That doesn't scale.",
    "approach": "The pipeline combines two docking engines, HDOCK and HADDOCK, to model how candidate aptamers physically bind to ASGR1, then layers a machine-learning classifier on top to rank and filter candidates for virtual screening at scale — rather than relying on docking scores alone.",
    "build": "A significant part of the work has been correctness, not just modeling: finding and fixing a data-leakage issue that would have quietly inflated the classifier's apparent accuracy, and re-verifying every numeric claim in the write-up against the underlying source data.",
    "outcome": "The pipeline and results are being formatted into a paper for submission to Elsevier's Healthcare Analytics — the most research-heavy project in this portfolio, treated with the rigor that requires.",
    "reflection": "Chasing down the data-leakage bug was the most valuable part of the project — it reset how carefully I check ML results before trusting them.",
    "display": [
      "ASGR1",
      "aptamer discovery"
    ],
    "status": "In progress",
    "context": "Heading to Elsevier",
    "highlights": [
      "HDOCK + HADDOCK docking feeding an ML classifier",
      "Found and fixed a data-leakage issue",
      "Every numeric claim re-verified against source data"
    ],
    "links": []
  },
  {
    "slug": "piti-care",
    "category": "safety",
    "tag": "AI safety platform",
    "title": "Piti Care",
    "oneLiner": "An AI-powered elderly-safety platform with a smart wristband, camera monitoring, and a Claude-powered health assistant.",
    "role": "Full-stack builder",
    "tools": [
      "React",
      "Node.js",
      "Supabase",
      "Claude API",
      "Twilio"
    ],
    "overview": "Built for the IRS151 course as a full startup product rather than a slide deck: a platform that watches for signs something has gone wrong with an elderly person at home and gets a caregiver informed fast.",
    "problem": "Elderly people living alone often can't call for help the moment something goes wrong — and by the time someone checks in, it can be too late.",
    "approach": "The frontend is React on Vite, talking to a Node.js/Express backend with Supabase as the database and JWT for auth. On top of the monitoring layer sits an AI health assistant on the Claude API, giving the platform a genuine conversational layer instead of a static alert list.",
    "build": "When something needs attention, the platform pushes alerts through Twilio and Nodemailer — SMS and email — so a caregiver doesn't need to be staring at a dashboard to find out.",
    "outcome": "Delivered as a complete, working product for the course rather than a mockup — wristband concept, camera monitoring, alerting, and the AI assistant all wired together.",
    "reflection": "Building the alerting path first, before the AI assistant, kept the project honest about what actually needed to work versus what was nice to have.",
    "display": [
      "Piti Care",
      "looking out for elders"
    ],
    "status": "Delivered",
    "context": "IRS151 course startup",
    "highlights": [
      "Wristband and camera monitoring, caregiver alerts by SMS and email",
      "Health assistant powered by the Claude API",
      "React/Vite, Node/Express, Supabase, JWT auth"
    ],
    "links": []
  },
  {
    "slug": "retailsense",
    "category": "vision",
    "tag": "Computer vision",
    "title": "RetailSense v2",
    "oneLiner": "Amazon Go-style shelf monitoring with live YOLO detection, a dashboard, and a real checkout flow.",
    "role": "Full-stack builder",
    "tools": [
      "YOLO",
      "FastAPI",
      "React",
      "Flutter",
      "Firebase"
    ],
    "overview": "RetailSense v2 recreates the core idea behind cashier-less stores: cameras watch the shelf, the system knows what's been taken, and checkout happens without a register.",
    "problem": "Version one was a vision demo. Version two needed to feel like a stack you could actually deploy in a store.",
    "approach": "Detection runs on YOLO, watching shelves for product removal in real time, feeding a FastAPI backend that serves a React dashboard for store operators and a separate Flutter app for the shopper side.",
    "build": "Checkout isn't simulated — it generates a real PromptPay QR code for payment, with Firebase Firestore handling shared state between detection, dashboard, and mobile app.",
    "outcome": "A working three-part system — detection, operator dashboard, and a shopper app with real payment — rather than three disconnected demos.",
    "reflection": "Keeping detection, dashboard, and mobile in sync through Firestore turned out to be harder than the detection model itself.",
    "display": [
      "RetailSense v2",
      "a shelf that sees"
    ],
    "status": "Working build",
    "context": "Web + mobile",
    "highlights": [
      "YOLO shelf detection feeding a FastAPI backend",
      "React operator dashboard plus a Flutter shopper app",
      "Real PromptPay QR checkout, synced through Firestore"
    ],
    "links": []
  },
  {
    "slug": "ecosort",
    "category": "ai",
    "tag": "Applied AI",
    "title": "EcoSort AI",
    "oneLiner": "A smart waste-management system using Gemini Robotics for classification, with a RAG layer for sorting guidance.",
    "role": "Full-stack builder",
    "tools": [
      "Gemini Robotics",
      "Flask",
      "ChromaDB",
      "Firebase"
    ],
    "overview": "EcoSort AI identifies waste items and routes them correctly — a task that sounds simple until you account for ambiguous materials and edge cases.",
    "problem": "Fixed sorting rules break down fast in the real world; the system needed to reason about ambiguous items, not just classify clean examples.",
    "approach": "Classification runs on Gemini Robotics 1.5, with a ChromaDB-backed retrieval-augmented layer feeding it contextual sorting guidance rather than relying on classification alone. React 19 and Tailwind on the frontend, Flask on the backend, Firebase Firestore for data.",
    "build": "Beyond the working app, the project shipped with the documentation a real group deliverable needs: report chapters, unit tests, and system diagrams.",
    "outcome": "A working classification-plus-guidance system, delivered with the full supporting documentation the course required.",
    "reflection": "Adding the RAG layer after classification alone under-performed on ambiguous items was the right call — worth building the simpler version first to see it fail.",
    "display": [
      "EcoSort AI",
      "waste, sorted smarter"
    ],
    "status": "Delivered",
    "context": "ICT305 group project",
    "highlights": [
      "Gemini Robotics 1.5 classification",
      "ChromaDB RAG layer for sorting guidance",
      "Shipped with report chapters, unit tests and system diagrams"
    ],
    "links": []
  },
  {
    "slug": "wirelab",
    "category": "edtech",
    "tag": "EdTech platform",
    "title": "WireLab",
    "oneLiner": "A UI/UX learning platform with 40 lessons across 6 modules, built to actually teach the subject.",
    "role": "Full-stack builder",
    "tools": [
      "React 19",
      "TypeScript",
      "Vite",
      "Supabase"
    ],
    "overview": "WireLab teaches wireframing and UI/UX fundamentals through 40 lessons across 6 modules, rebuilt into an article-style format rather than a slide dump.",
    "problem": "Most course content platforms are built to display material, not to teach it — there's a real difference.",
    "approach": "Built on React 19, TypeScript, Vite, and Supabase for data and auth. Each lesson pairs written content with interactive diagrams and in-lesson games, so concepts get practiced, not just read.",
    "build": "The platform also has a separate instructor access system, treating course maintainers as a distinct user type rather than bolting admin controls onto the student experience.",
    "outcome": "A complete 40-lesson platform with a distinct student and instructor experience, not just a content wrapper.",
    "reflection": "Splitting instructor access out as its own system early avoided a mess of permission checks scattered through student-facing code later.",
    "display": [
      "WireLab",
      "learn UI by doing"
    ],
    "status": "Substantially built",
    "context": "40 lessons, 6 modules",
    "highlights": [
      "40 lessons across 6 modules, written article-style",
      "Interactive diagrams and in-lesson games",
      "Separate instructor access system"
    ],
    "links": []
  },
  {
    "slug": "gg-gears",
    "category": "data",
    "tag": "Data mining",
    "title": "GG Gears",
    "oneLiner": "A gaming-accessories retail simulation using association rule mining to find co-purchased products.",
    "role": "Team lead",
    "tools": [
      "Association rule mining",
      "Google Sheets"
    ],
    "overview": "Built for ICT324's Business Challenge, GG Gears is a mini retail concept for gaming accessories, mapped to the course's \"Apparel shop\" category option.",
    "problem": "The business question: which accessories sell best, and which products get bought together — not obvious from raw sales numbers alone.",
    "approach": "As team lead, I chose association rule mining as the analysis method: finding frequently co-purchased products rather than ranking individual bestsellers. An eight-product catalog was drafted in Google Sheets, with printed barcode cards for a simulated point-of-sale run.",
    "build": "My role covered the data design and coordinating the three-person team through the simulation itself, from product setup to the mining output.",
    "outcome": "A working simulation that surfaced real co-purchase patterns in the sample data, presented as the team's Business Challenge deliverable.",
    "reflection": "Designing the product catalog before choosing the mining method — instead of the reverse — kept the analysis grounded in a business question instead of just the algorithm.",
    "display": [
      "GG Gears",
      "what sells together"
    ],
    "status": "Delivered",
    "context": "ICT324 Business Challenge",
    "highlights": [
      "Association rule mining on an eight-product catalog",
      "Simulated point-of-sale run with printed barcode cards",
      "Led a three-person team"
    ],
    "links": []
  }
]

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug)
