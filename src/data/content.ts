// All site copy. House rule: NO em dashes anywhere. Commas, colons, periods, parentheses only.

export const profile = {
  name: "Maira Haecker",
  punchy: "I make things happen: events, ideas, and the occasional hoodie.",
  roleLine: "Events & people person. Startup builder. Creative.",
  subline:
    "I'm an events-and-people person, startup builder, and creative, looking for a startup role in Munich where I can be close to the founders and the action.",
  location: "Munich",
  availability: "Available from August 2026",
  email: "mairahaecker@gmail.com",
  phone: "+34 607 84 50 01",
  whatsapp: "+41 78 828 02 60",
  whatsappLink: "https://wa.me/41788280260",
  linkedin: "https://www.linkedin.com/in/mairahaecker1502",
  instagram: "https://www.instagram.com/mairainmotion",
  instagramHandle: "@mairainmotion",
  calendly: "https://calendly.com/mairahaecker/30min",
};

// Short ticker words for the moving strip under the hero
export const ticker: string[] = [
  "Events",
  "Hosting",
  "Public speaking",
  "Venture building",
  "Partnerships",
  "Creative",
  "Go-getter",
  "Self-taught",
  "Hospitality",
  "AI-curious",
];

export const about = {
  body:
    "Hi, I'm Maira. I'm happiest between people, on my feet, making things happen, whether that's running an event for 500+ people, building a partnership and keeping it alive, hosting a webinar, or starting something from zero. I've worked in hospitality, events, and partnerships across Europe, I'm building my own edtech venture (Talkadoo), and I teach myself whatever I need to move fast (lately, a lot of AI). I love connecting people, building relationships, and turning them into real outcomes. I care about work that's creative, fun, and actually makes people's lives better. I'm looking to join a startup where I can be close to the founders and the action.",
  goGetterTitle: "If I don't know how to do it, I learn it.",
  goGetter:
    "I knew almost nothing about sustainability, then taught myself enough to write a full ESG report for a resort group. I'd never built a website, so I'm building this one. I taught myself to make a luxury jewelry catalog, to pitch, and to host. Give me something new and I'll figure it out.",
  current:
    "Right now: applying for startup roles in Munich, and always learning, lately going deep on AI.",
};

// Headline impact numbers
export const stats: { value: string; label: string }[] = [
  { value: "3", label: "luxury resorts certified under Green Globe" },
  { value: "30+", label: "events organized" },
  { value: "500+", label: "employees trained" },
];

// What I'm looking for (shown near the top)
export const lookingFor = {
  headline: "What I'm looking for",
  focus:
    "A startup role in Munich, open to relocating across the DACH region for the right fit. Available from August 2026.",
  targets: ["Partnerships", "Events", "Operations", "Building & venture"],
  note: "I'm a people-and-partnerships person and an operator at heart: I build relationships and own the messy middle where strategy turns into things that actually ship.",
};

// Where I've worked & studied (full list from the CV)
export const credibility: string[] = [
  "Nayara Resorts",
  "Jönköping University (JIBS)",
  "EHL Lausanne",
  "Les Roches Marbella",
  "NetRevenue",
  "Seeblick Höhenhotel",
  "Ermitage Wellness and Spa Hotel",
  "Science Park",
  "Talkadoo",
];

export const testimonial = {
  quote:
    "One of our guests told me I seemed so natural, like I'd been doing this my whole life.",
  attribution: "Guest, JIBS webinar",
};

export type Pillar = {
  key: string;
  title: string;
  body: string;
  icon: "spark" | "handshake" | "rocket" | "mic";
  href: string;
  related: string[];
};

export const pillars: Pillar[] = [
  {
    key: "partnerships",
    title: "Partnerships & Relationships",
    icon: "handshake",
    body:
      "Forming new partnerships, then nurturing and keeping them over time. Coordinating, organizing, and negotiating with partners. This is the people-facing work I love most.",
    href: "#highlights",
    related: [
      "EHL: connected students with hotel groups",
      "Nayara: coordinated across teams & auditors",
      "Executive introductions & company partnerships",
    ],
  },
  {
    key: "events",
    title: "Events & Experiences",
    icon: "spark",
    body:
      "I run events end to end: concept, logistics, partners, and on-site coordination, for audiences from a handful to 500+. I turn a rough idea into a room full of people having a great time.",
    href: "#highlights",
    related: [
      "30+ events organized",
      "500+ employees trained",
      "Industry nights, panels & webinars",
    ],
  },
  {
    key: "building",
    title: "Founder-facing Ops & Building",
    icon: "rocket",
    body:
      "I build the things founders need and don't have time for: validation, decks, processes, go-to-market. I move fast in the chaos and I'm not afraid of a blank page.",
    href: "#talkadoo",
    related: [
      "Talkadoo: my edtech venture",
      "ESG report, taught myself from zero",
      "Science Park startup program",
    ],
  },
  {
    key: "speaking",
    title: "Hosting & Public Speaking",
    icon: "mic",
    body:
      "I host webinars and live events, moderate Q&As, and pitch on stage. Public speaking is my favorite part of the job, and I take every chance to do it.",
    href: "#speaking",
    related: [
      "Host, JIBS 'Meetings with the Dean'",
      "Presented to 50+ hospitality CEOs",
      "Pitched ventures live on stage",
    ],
  },
];

export type Highlight = {
  title: string;
  org: string;
  tag: "Building" | "Operations" | "Creative";
  blurb: string;
  image?: string;
  link?: string;
  linkLabel?: string;
  placeholder?: string;
};

export const highlights: Highlight[] = [
  {
    title: "Nayara Resorts ESG Report",
    org: "Nayara Resorts, Costa Rica",
    tag: "Operations",
    blurb:
      "I taught myself sustainability from scratch and authored the full ESG Sustainability Report and Management Plan covering all three Nayara properties (Gardens, Springs, and Tented Camp).",
    image: "/assets/highlights/esg-cover.jpg",
    link: "https://23160175.fs1.hubspotusercontent-na1.net/hubfs/23160175/PR/Nayara%20Resorts%20ESG%20Sustainability%20Report%20and%20Management%20Plan.pdf",
    linkLabel: "Read the report",
  },
  {
    title: "500+ Employee Training Program",
    org: "Nayara Resorts, Costa Rica",
    tag: "Operations",
    blurb:
      "I designed and delivered service trainings and a cross-cultural program for 500+ employees, preparing teams for the resorts' growing European guest base.",
    image: "/assets/highlights/training.jpg",
  },
  {
    title: "Representing Nayara at Les Roches",
    org: "Les Roches, Marbella",
    tag: "Operations",
    blurb:
      "I represented Nayara at my university, running their presence at events and helping hire and recruit the next round of interns after me.",
    image: "/assets/highlights/nayara-banner.jpg",
  },
  {
    title: "Mallorca Luxury Jewelry Catalog",
    org: "Self-initiated",
    tag: "Creative",
    blurb:
      "A complete luxury jewelry catalog I created from scratch, nature-inspired and designed end to end. A small proof of range and self-starting craft.",
    image: "/assets/creative/catalog-cover.jpg",
  },
  {
    title: "Science Park Startup Program",
    org: "Science Park, Jönköping",
    tag: "Building",
    blurb:
      "I took part in a startup-planning program at a science park, meeting weekly for months to build and pitch a venture alongside other early founders.",
    image: "/assets/highlights/science-park.jpg",
  },
  {
    title: "Talkadoo",
    org: "My edtech venture",
    tag: "Building",
    blurb:
      "An interactive play mat that teaches children languages through movement. MVP in testing, 30+ validation interviews, and early grant funding.",
    image: "/assets/highlights/talkadoo-slide.jpg",
    link: "#talkadoo",
    linkLabel: "See the spotlight",
  },
];

export const talkadoo = {
  tagline: "Move. Play. Learn languages.",
  intro:
    "Talkadoo is the edtech venture I'm building. An interactive play mat where children learn languages through movement, play, and repetition.",
  traction: [
    { value: "30+", label: "validation interviews" },
    { value: "20+", label: "families tested the 1st MVP" },
    { value: "1", label: "grant secured (early funding)" },
  ],
  points: [
    {
      label: "The problem",
      text:
        "Kids learn best by moving, but most language apps glue them to a screen. Talkadoo gets them up and active while they learn.",
    },
    {
      label: "What I've built so far",
      text:
        "An MVP in testing, 30+ validation interviews with parents, educators, and child-development experts, and early-stage grant funding from a competitive venture program.",
    },
    {
      label: "What I've learned",
      text:
        "How to validate fast, talk to real users, pitch to advisors, and build a venture across the DACH startup ecosystem. This is me practicing being a founder.",
    },
  ],
  flyer: "/assets/talkadoo/flyer.jpg",
  bouncy: "/assets/talkadoo/bouncy.png",
};

export type Speaking = {
  title: string;
  detail: string;
  link?: string;
  linkLabel?: string;
};

export const speaking: Speaking[] = [
  {
    title: "Pitched my own venture, many times",
    detail:
      "I've pitched Talkadoo in front of all kinds of audiences: advisors, investors, accelerators, and ecosystem events.",
  },
  {
    title: "EHL selection: presented to 50+ CEOs",
    detail:
      "Invited as the youngest of 50 selected EHL candidates, and presented to a committee of more than 50 hospitality CEOs.",
  },
  {
    title: "Webinar host, Jönköping University (JIBS)",
    detail:
      "I host the 'Meetings with the Dean' webinar series: scripting, hosting, and running live Q&A end to end.",
    link: "https://play.ju.se/media/Meetings+with+the+Dean+JIBS+1/0_e2v23zx3",
    linkLabel: "Watch episode 1",
  },
  {
    title: "Meetings with the Dean, episode 4",
    detail:
      "A second episode of the JIBS webinar series I host, with guests and a live audience.",
    link: "https://play.ju.se/media/Meetings+with+the+Dean+JIBS+4/0_vk9zp4yl",
    linkLabel: "Watch episode 4",
  },
  {
    title: "MSc Entrepreneurship pitch",
    detail:
      "Pitched another startup venture as part of my MSc. (Video included in this section.)",
  },
  {
    title: "Toastmasters",
    detail:
      "Joined for a while to sharpen my public speaking, with regular structured practice sessions.",
  },
  {
    title: "Hosting for Startup Insider",
    detail: "Hosted an event format for the company Startup Insider.",
  },
  {
    title: "My own events",
    detail:
      "At events I organized, I regularly introduced and presented partners and gave the opening presentations myself.",
  },
  {
    title: "Presentations at EHL",
    detail: "Gave presentations and pitches throughout my time at EHL, my university.",
  },
  {
    title: "Pitch competition (private jet)",
    detail: "Took part in a pitch competition that involved, yes, a private jet.",
  },
];

export const creative = {
  intro:
    "I make things. Paintings, bleach-painted hoodies, a luxury jewelry catalog, brand visuals. When I'm curious about a craft, I just start.",
  paintings: [
    { src: "/assets/creative/painting-1.jpg", alt: "Moonlit seascape painting" },
    { src: "/assets/creative/painting-3.jpg", alt: "Textured starry night canvas painting" },
    { src: "/assets/creative/painting-2.jpg", alt: "Charcoal fantasy landscape drawing" },
  ],
  // Order matters: the first three are shown. hoodie-2's caption contains an
  // em dash baked into the image, so it is intentionally placed last (per the
  // no-em-dash rule).
  hoodies: [
    "/assets/creative/hoodie-3.jpg",
    "/assets/creative/hoodie-4.jpg",
    "/assets/creative/hoodie-5.jpg",
    "/assets/creative/hoodie-1.jpg",
    "/assets/creative/hoodie-2.jpg",
  ],
  catalog: [
    "/assets/creative/catalog-cover.jpg",
    "/assets/creative/catalog-4.jpg",
    "/assets/creative/catalog-7.jpg",
    "/assets/creative/catalog-10.jpg",
    "/assets/creative/catalog-13.jpg",
  ],
};

export const offClock = {
  travel:
    "I travel whenever I can, chasing sunsets, nature, and new places. It feeds the hospitality side of me too.",
  travelImages: [
    "/assets/travel/travel-4.jpg",
    "/assets/travel/travel-1.jpg",
    "/assets/travel/travel-2.jpg",
    "/assets/travel/travel-3.jpg",
  ],
  sports:
    "Sports keep me sharp: energy, discipline, and being a good teammate. Martial arts, jiu jitsu, snowboarding, and the slopes.",
  sportsImages: [
    "/assets/sports/sports-1.jpg",
    "/assets/sports/sports-3.jpg",
    "/assets/sports/sports-4.jpg",
    "/assets/sports/sports-2.jpg",
  ],
};

// Candid event / in-the-room shots used in the About section
export const aboutImages = {
  portrait: "/assets/people/portfolio-zoom.jpg",
  arena: "/assets/people/event-arena.jpg",
  selfie: "/assets/people/event-selfie.jpg",
};

// Her pitching on stage (featured in the Speaking section)
export const speakingPhoto = "/assets/speaking/pitch-stage.jpg";

// Video moments
export const media = {
  pitchVideo: "/assets/video/pitch.mp4",
  pitchPoster: "/assets/video/pitch-poster.jpg",
  talkadooLoop: "/assets/video/loop-talkadoo.mp4",
};

// Scripted "ask me anything" knowledge base (no API). Keyword-matched.
export type QA = { id: string; chip: string; keywords: string[]; a: string };

export const chatbot = {
  intro:
    "Hi, I'm Maira's mini-assistant. Tap a question below, or type your own.",
  fallback:
    "I'm not totally sure about that one, but Maira would happily tell you herself. The fastest way is to book a quick call or email her, both are in the Contact section.",
  starters: ["who", "role", "partnerships", "relocate", "start", "talkadoo", "cv", "book"],
  qa: [
    { id: "who", chip: "Who is Maira?", keywords: ["who", "about", "yourself", "summary", "30 second", "tell me about", "what do you do", "what i do"], a: "Short version: I'm an events, people, and partnerships person, a startup builder, and a creative, with 4+ years across hospitality, sustainability, and early-stage startups. I build and nurture partnerships, run events, host and pitch on stage, and build things from zero. I do my best work in fast-moving teams where people, strategy, and execution meet." },
    { id: "role", chip: "What role are you looking for?", keywords: ["role", "looking for", "job", "position", "hiring", "want"], a: "A startup role in partnerships, events, operations, or building. Partnerships are a big focus for me: forming new ones, keeping relationships alive, coordinating with partners, and negotiating. I'm an operator at heart, so I like owning the messy middle where strategy turns into things that actually ship." },
    { id: "partnerships", chip: "What's her partnerships experience?", keywords: ["partnership", "partnerships", "relationship", "relationships", "connect", "connections", "negotiate", "negotiating", "stakeholder", "network"], a: "Partnerships are where I'm strongest and happiest. I form new partnerships, then nurture and keep them alive over time, coordinate and organize with partners, and negotiate the details. At the EHL committee I connected hospitality students with leading hotel groups and facilitated executive introductions and company partnerships. At Nayara I coordinated across departments, auditors, and international leadership. It's deeply people-facing work, and I love turning relationships into real outcomes." },
    { id: "relocate", chip: "Are you open to relocating?", keywords: ["relocate", "relocating", "move", "where", "location", "munich", "dach", "remote"], a: "My main focus is Munich, and I'm open to relocating across the DACH region for the right fit." },
    { id: "start", chip: "When can you start?", keywords: ["start", "available", "availability", "when", "notice"], a: "I'm available from August 2026." },
    { id: "events", chip: "Tell me about your events experience", keywords: ["event", "events", "organize", "host events", "hospitality"], a: "I run events end to end: concept, logistics, partners, and on-site coordination, for audiences from a handful to 500+. I've organized 30+ events and hosted plenty of them, from industry nights to webinars." },
    { id: "talkadoo", chip: "What is Talkadoo?", keywords: ["talkadoo", "venture", "startup you", "edtech", "penguin", "bouncy"], a: "Talkadoo is the edtech venture I'm building: an interactive play mat that teaches kids languages through movement. So far I've done 30+ validation interviews, tested a first MVP with 20+ families, and secured an early grant. Scroll to the Talkadoo section to meet Bouncy." },
    { id: "ops", chip: "Operations & startup experience?", keywords: ["operations", "ops", "startup experience", "build", "building", "process", "sales"], a: "Beyond events, I'm an operator and builder. I led a Green Globe certification across three resorts on my own, built processes and trainings for 500+ staff, ran a full sales cycle at a US startup, and I'm building my own venture. I move fast in startup chaos." },
    { id: "languages", chip: "What languages do you speak?", keywords: ["language", "languages", "german", "speak", "deutsch", "spanish", "french"], a: "I'm native in German, Spanish, and Catalan, and fluent in English and French. So German is no problem at all." },
    { id: "speaking", chip: "Public speaking & hosting?", keywords: ["speaking", "public speaking", "host", "hosting", "pitch", "stage", "webinar", "moderate"], a: "Public speaking is my favorite part of the job. I host the 'Meetings with the Dean' webinar series at JIBS, I've pitched ventures on stage many times, presented to 50+ CEOs at EHL, and sharpened it at Toastmasters. There's a pitch video in the Speaking section." },
    { id: "different", chip: "What makes you different?", keywords: ["different", "stand out", "unique", "why you", "special", "strength", "strengths", "good at"], a: "Two things. First, I'm genuinely great with people: building partnerships, keeping relationships alive, and turning them into real outcomes. Second, I'm a go-getter who teaches herself anything. I taught myself sustainability and wrote a full ESG report, taught myself to pitch, host, and design a jewelry catalog, and I built this site myself. I bring warmth, range, and follow-through." },
    { id: "why", chip: "Why startups, why Munich?", keywords: ["why startup", "why munich", "why", "motivation"], a: "Startups are where people, strategy, and execution meet, and I do my best work close to the founders and the action. Munich is a growing hub in the DACH ecosystem I've been building in, and it's where I want to plant roots." },
    { id: "worklike", chip: "What are you like to work with?", keywords: ["work with", "like to work", "personality", "team", "colleague"], a: "Warm, high-energy, and reliable. I take ownership, stay calm in chaos, and genuinely like people. I'd rather figure something out than wait to be told how." },
    { id: "cv", chip: "Can I see your CV?", keywords: ["cv", "resume", "download"], a: "Of course. There's a 'Download CV' button near the top of the page, that opens the full PDF." },
    { id: "book", chip: "How do I book a call?", keywords: ["book", "call", "meeting", "chat", "calendar", "contact", "email", "reach"], a: "Easiest way is to book a 30-minute chat on my Calendly, the 'Book a chat' button does it. Or email mairahaecker@gmail.com." },
  ] as QA[],
};

export const nav = [
  { id: "about", label: "About" },
  { id: "what-i-do", label: "What I do" },
  { id: "highlights", label: "Work" },
  { id: "talkadoo", label: "Talkadoo" },
  { id: "speaking", label: "Speaking" },
  { id: "off-the-clock", label: "Off the clock" },
  { id: "contact", label: "Contact" },
];
