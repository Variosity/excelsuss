import type { Course, Pillar } from "@/types";

export const PILLARS: {
  id: Pillar;
  label: string;
  icon: string;
  greek: string;
  translation: string;
  description: string;
  color: string;
}[] = [
  {
    id: "stoicism",
    label: "Stoic Philosophy",
    icon: "Ψ",
    greek: "Ἐπὶ σοί ἐστι",
    translation: '"It is up to you." — Epictetus',
    description:
      "The ancient operating system for men who refuse to be broken by circumstance.",
    color: "#8B9467",
  },
  {
    id: "warrior",
    label: "Warrior Mindset",
    icon: "⚔",
    greek: "Aut viam inveniam aut faciam",
    translation: '"I shall either find a way or make one." — Hannibal',
    description:
      "Pressure forges clarity. Discipline forges character. The warrior owns the hard path.",
    color: "#8B1A1A",
  },
  {
    id: "spirituality",
    label: "The Divine Self",
    icon: "☉",
    greek: "Γνῶθι σεαυτόν",
    translation: '"Know thyself." — Temple of Apollo at Delphi',
    description:
      "Autotheism, Greek/Roman philosophy, the god within — a framework for those who worship no institution but seek something greater.",
    color: "#C9A84C",
  },
  {
    id: "wealth",
    label: "Financial Mastery",
    icon: "◈",
    greek: "Fortuna audaces iuvat",
    translation: '"Fortune favors the bold." — Virgil',
    description:
      "Income streams, online business, AI leverage, investment frameworks, and the wealth psychology of the free man.",
    color: "#D4A84C",
  },
  {
    id: "sovereignty",
    label: "Legal Sovereignty",
    icon: "⚖",
    greek: "Divide et impera",
    translation: '"Divide and conquer." — Ancient Roman strategy',
    description:
      "Tax optimization, golden visas, offshore banking, crypto, dual citizenship. The laws of free movement and financial sovereignty.",
    color: "#6B8B9A",
  },
  {
    id: "psychology",
    label: "Dark Psychology",
    icon: "☽",
    greek: "Scientia potentia est",
    translation: '"Knowledge is power." — Francis Bacon',
    description:
      "Robert Greene. Art of War. Influence. The hidden mechanics of power, persuasion, and the dark triad.",
    color: "#6B3A6B",
  },
  {
    id: "physical",
    label: "Physical Dominion",
    icon: "❧",
    greek: "Mens sana in corpore sano",
    translation: '"A sound mind in a sound body." — Juvenal',
    description:
      "Strength, combat, nutrition, recovery. The body is your first statement to the world.",
    color: "#8B6B3A",
  },
  {
    id: "social",
    label: "Social Mastery",
    icon: "Σ",
    greek: "Si vis pacem, para bellum",
    translation: '"If you want peace, prepare for war." — Vegetius',
    description:
      "Persuasion, leadership, negotiation, charisma. Command any room without uttering a threat.",
    color: "#3A6B8B",
  },
  {
    id: "legacy",
    label: "Legacy & Purpose",
    icon: "Δ",
    greek: "Memento mori",
    translation: '"Remember you will die." — Ancient Roman',
    description:
      "A man without purpose is merely breathing. Build something that outlasts you.",
    color: "#6B4A3A",
  },
];

export const COURSES: Omit<Course, "created_at">[] = [
  // ─────────────────────────────────────────────
  // STOICISM
  // ─────────────────────────────────────────────
  {
    id: "stoicism-101",
    slug: "meditations-decoded",
    title: "Meditations: The Emperor's Manual",
    subtitle: "Marcus Aurelius decoded for modern men",
    description:
      "A line-by-line breakdown of the most powerful personal journal ever written. Marcus Aurelius led an empire while practicing total internal sovereignty. This course teaches you how.",
    pillar: "stoicism",
    tier_required: "discipulus",
    order_index: 1,
    total_lessons: 18,
    duration_hours: 9,
    is_featured: true,
    latin_quote: "Nusquam est qui ubique est",
    latin_translation: '"He who is everywhere is nowhere." — Seneca',
  },
  {
    id: "stoicism-102",
    slug: "dichotomy-of-control",
    title: "The Dichotomy of Control",
    subtitle: "Epictetus and the art of sovereign focus",
    description:
      "Learn to separate what is yours from what is not. The single most liberating mental move a man can make — and why most men never make it.",
    pillar: "stoicism",
    tier_required: "discipulus",
    order_index: 2,
    total_lessons: 12,
    duration_hours: 5,
    is_featured: false,
    latin_quote: "Omnia aliena sunt, tempus tantum nostrum est",
    latin_translation:
      '"Everything is alien to us; only time is ours." — Seneca',
  },
  {
    id: "stoicism-103",
    slug: "amor-fati",
    title: "Amor Fati: Love Your Fate",
    subtitle: "Nietzsche, Stoicism, and the will to thrive",
    description:
      "The philosophy of embracing everything that happens — not tolerating it, not accepting it, but loving it as fuel. The highest form of resilience.",
    pillar: "stoicism",
    tier_required: "miles",
    order_index: 3,
    total_lessons: 10,
    duration_hours: 4,
    is_featured: false,
    latin_quote: "Per aspera ad astra",
    latin_translation: '"Through hardship to the stars." — Latin proverb',
  },
  {
    id: "stoicism-104",
    slug: "seneca-letters",
    title: "Letters to a Modern Lucilius",
    subtitle: "Seneca's letters decoded for a man in 2025",
    description:
      "Seneca wrote to his friend Lucilius over years, teaching him to live. This course takes every major letter and asks: what does this mean for you, now, today?",
    pillar: "stoicism",
    tier_required: "discipulus",
    order_index: 4,
    total_lessons: 14,
    duration_hours: 6,
    is_featured: false,
    latin_quote: "Dum differtur vita transcurrit",
    latin_translation: '"While we delay, life passes us by." — Seneca',
  },

  // ─────────────────────────────────────────────
  // WARRIOR MINDSET
  // ─────────────────────────────────────────────
  {
    id: "warrior-101",
    slug: "the-war-within",
    title: "The War Within",
    subtitle: "Discipline protocols and the psychology of consistency",
    description:
      "The battle that matters most happens before you leave the house. Morning protocols, decision fatigue, building unbreakable daily systems that compound over years.",
    pillar: "warrior",
    tier_required: "discipulus",
    order_index: 1,
    total_lessons: 15,
    duration_hours: 7,
    is_featured: true,
    latin_quote: "Dum spiro, spero",
    latin_translation: '"While I breathe, I hope." — Cicero',
  },
  {
    id: "warrior-102",
    slug: "art-of-war-decoded",
    title: "Sun Tzu: The Art of War Decoded",
    subtitle: "Ancient strategy for modern warfare",
    description:
      "Every chapter. Every stratagem. Applied to business competition, negotiation, relationship dynamics, and personal warfare. Absolute war psychology.",
    pillar: "warrior",
    tier_required: "discipulus",
    order_index: 2,
    total_lessons: 13,
    duration_hours: 6,
    is_featured: false,
    latin_quote: "Nemo me impune lacessit",
    latin_translation: '"No one provokes me with impunity." — Scottish motto',
  },
  {
    id: "warrior-103",
    slug: "spartan-protocols",
    title: "The Spartan Protocols",
    subtitle: "Excelsus-forged systems for modern men",
    description:
      "Reconstruct your daily life around the principles that forged the most feared warriors in history. Physical + mental + social training unified into a daily operating system.",
    pillar: "warrior",
    tier_required: "miles",
    order_index: 3,
    total_lessons: 20,
    duration_hours: 11,
    is_featured: true,
    latin_quote: "Fortes fortuna adiuvat",
    latin_translation: '"Fortune favors the brave." — Terence',
  },
  {
    id: "warrior-104",
    slug: "roman-legionnaire",
    title: "The Roman Legionnaire",
    subtitle: "Discipline, structure, and conquest — the Roman way",
    description:
      "The Roman Legion was history's most successful war machine. Not because of individual heroes — but because of system, structure, and relentless execution. Apply the Legion model to your life.",
    pillar: "warrior",
    tier_required: "miles",
    order_index: 4,
    total_lessons: 14,
    duration_hours: 7,
    is_featured: false,
    latin_quote: "Veni, vidi, vici",
    latin_translation: '"I came, I saw, I conquered." — Julius Caesar',
  },
  {
    id: "warrior-105",
    slug: "gladiator-mindset",
    title: "The Gladiator Mindset",
    subtitle: "Pressure, performance, and dying with honor",
    description:
      "The gladiator entered the arena knowing he might not leave. What does it mean to perform at your absolute peak with everything on the line? This course is about high-stakes mental conditioning.",
    pillar: "warrior",
    tier_required: "discipulus",
    order_index: 5,
    total_lessons: 10,
    duration_hours: 5,
    is_featured: false,
    latin_quote: "Ave, Imperator, morituri te salutant",
    latin_translation:
      '"Hail, Emperor, those who are about to die salute you." — Roman gladiatorial salute',
  },

  // ─────────────────────────────────────────────
  // SPIRITUALITY / THE DIVINE SELF (NEW PILLAR)
  // ─────────────────────────────────────────────
  {
    id: "spirit-101",
    slug: "the-god-within",
    title: "The God Within",
    subtitle: "Autotheism, self-divinity, and the sovereign soul",
    description:
      "You were not born to worship. You were born to become. This course explores the philosophical tradition of the divine self — from Stoic logos to Hermetic philosophy to Nietzsche's Übermensch. No religion required.",
    pillar: "spirituality",
    tier_required: "discipulus",
    order_index: 1,
    total_lessons: 16,
    duration_hours: 8,
    is_featured: true,
    latin_quote: "Deus est mortali iuvare mortalem",
    latin_translation:
      '"For a mortal to help mortals — that is god." — Pliny the Elder',
  },
  {
    id: "spirit-102",
    slug: "olympian-pantheon",
    title: "The Olympian Pantheon as Psychology",
    subtitle: "Greek gods decoded as archetypes of the male psyche",
    description:
      "Zeus is will and sovereignty. Ares is raw force and aggression. Apollo is reason and beauty. Hermes is cunning and commerce. These aren't myths — they are maps of human nature. Learn to embody the gods strategically.",
    pillar: "spirituality",
    tier_required: "discipulus",
    order_index: 2,
    total_lessons: 12,
    duration_hours: 6,
    is_featured: false,
    latin_quote: "Omnia, Caesare, plena sunt",
    latin_translation:
      '"Caesar is everywhere." — The idea that divinity suffuses all things',
  },
  {
    id: "spirit-103",
    slug: "roman-virtue-system",
    title: "The Roman Virtue System",
    subtitle: "Virtus, Gravitas, Pietas, Auctoritas — the code of Roman men",
    description:
      "Roman men lived by a rigorous virtue system. Virtus (excellence), Gravitas (weight and dignity), Pietas (duty), Auctoritas (prestige through action). This is not moralism — it is a code for commanding respect.",
    pillar: "spirituality",
    tier_required: "discipulus",
    order_index: 3,
    total_lessons: 10,
    duration_hours: 5,
    is_featured: false,
    latin_quote: "Dum vivimus, vivamus",
    latin_translation: '"While we live, let us truly live." — Latin maxim',
  },
  {
    id: "spirit-104",
    slug: "karma-logos-cosmos",
    title: "Karma, Logos, and the Cosmic Order",
    subtitle: "Universal law, cause and effect, and living in alignment",
    description:
      "Across traditions — Stoic logos, Hindu karma, Tao — lies one core truth: the universe operates on law, not luck. This course teaches you to read those laws and live in alignment with them.",
    pillar: "spirituality",
    tier_required: "miles",
    order_index: 4,
    total_lessons: 11,
    duration_hours: 5,
    is_featured: false,
    latin_quote: "Fata viam invenient",
    latin_translation: '"Fate will find a way." — Virgil',
  },
  {
    id: "spirit-105",
    slug: "hermetic-philosophy",
    title: "Hermetic Philosophy",
    subtitle: "The Kybalion, Hermes Trismegistus, and the laws of the universe",
    description:
      "The seven Hermetic principles — Mentalism, Correspondence, Vibration, Polarity, Rhythm, Cause and Effect, Gender. The oldest unified theory of existence. The framework serious men study.",
    pillar: "spirituality",
    tier_required: "miles",
    order_index: 5,
    total_lessons: 14,
    duration_hours: 7,
    is_featured: true,
    latin_quote: "Ut supra, sic infra",
    latin_translation: '"As above, so below." — Hermetic axiom',
  },
  {
    id: "spirit-106",
    slug: "nietzsche-decoded",
    title: "Nietzsche for Men",
    subtitle: "Will to Power, the Übermensch, and the Death of God",
    description:
      "Nietzsche's philosophy is not nihilism — it is the most radical call to self-creation ever written. Will to Power, eternal recurrence, master vs. slave morality. Read with context, lived with conviction.",
    pillar: "spirituality",
    tier_required: "miles",
    order_index: 6,
    total_lessons: 13,
    duration_hours: 7,
    is_featured: false,
    latin_quote: "Amor fati",
    latin_translation:
      '"Love of fate" — Nietzsche\'s central concept: love everything that happens as necessary',
  },

  // ─────────────────────────────────────────────
  // WEALTH
  // ─────────────────────────────────────────────
  {
    id: "wealth-101",
    slug: "sovereign-income",
    title: "Sovereign Income",
    subtitle: "Build income that works without you",
    description:
      "From zero to cashflowing business. Freelance → Agency → Product → Investment. The full architecture of financial freedom mapped out step by step.",
    pillar: "wealth",
    tier_required: "discipulus",
    order_index: 1,
    total_lessons: 22,
    duration_hours: 14,
    is_featured: true,
    latin_quote: "Pecunia non olet",
    latin_translation: '"Money does not stink." — Emperor Vespasian',
  },
  {
    id: "wealth-102",
    slug: "ai-money-machine",
    title: "The AI Money Machine",
    subtitle: "Building income streams with AI in 2025",
    description:
      "AI agents, no-code tools, automation, content at scale. The specific ways men are generating $5k–$50k/month using AI right now. No hype — concrete systems and workflows.",
    pillar: "wealth",
    tier_required: "discipulus",
    order_index: 2,
    total_lessons: 18,
    duration_hours: 10,
    is_featured: true,
    latin_quote: "Labor omnia vincit",
    latin_translation: '"Work conquers all." — Virgil',
  },
  {
    id: "wealth-103",
    slug: "high-ticket-sales",
    title: "High-Ticket Sales Mastery",
    subtitle: "Close $5k–$50k deals on the phone and in person",
    description:
      "Cold outreach, discovery calls, objection handling, closing. The complete B2B and consultative sales playbook. The highest-paid skill in the world that anyone can learn.",
    pillar: "wealth",
    tier_required: "discipulus",
    order_index: 3,
    total_lessons: 20,
    duration_hours: 12,
    is_featured: false,
    latin_quote: "Verba movent, exempla trahunt",
    latin_translation:
      '"Words move people, examples compel them." — Latin proverb',
  },
  {
    id: "wealth-104",
    slug: "agency-empire",
    title: "Agency Empire",
    subtitle: "Build, scale, and sell a service business",
    description:
      "SMMA, lead gen, copywriting, web dev, automation agencies. Full playbook: niche selection, offer creation, outreach systems, client delivery, team building, and exit.",
    pillar: "wealth",
    tier_required: "miles",
    order_index: 4,
    total_lessons: 24,
    duration_hours: 16,
    is_featured: false,
    latin_quote: "Audentes fortuna iuvat",
    latin_translation: '"Fortune favors the daring." — Virgil',
  },
  {
    id: "wealth-105",
    slug: "copywriting-warfare",
    title: "Copywriting Warfare",
    subtitle: "Words that convert, persuade, and generate millions",
    description:
      "Direct response copywriting, email sequences, VSLs, landing pages. The skill that underlies every profitable business. Learn to write copy that makes money.",
    pillar: "wealth",
    tier_required: "discipulus",
    order_index: 5,
    total_lessons: 16,
    duration_hours: 9,
    is_featured: false,
    latin_quote: "Qui scribit bis legit",
    latin_translation:
      '"He who writes, reads twice." — Medieval scholar\'s maxim',
  },
  {
    id: "wealth-106",
    slug: "investment-architecture",
    title: "Investment Architecture",
    subtitle: "Build wealth that grows while you sleep",
    description:
      "Index funds, real estate frameworks, crypto fundamentals, angel investing, business acquisition. The investment philosophy of men who never trade time for money again.",
    pillar: "wealth",
    tier_required: "miles",
    order_index: 6,
    total_lessons: 18,
    duration_hours: 9,
    is_featured: false,
    latin_quote: "Aurum potestas est",
    latin_translation: '"Gold is power." — Medieval Latin',
  },
  {
    id: "wealth-107",
    slug: "leverage-your-assets",
    title: "Leverage What You Already Have",
    subtitle: "Monetize your skills, knowledge, network, and time",
    description:
      "Most men sit on a goldmine they've never extracted. Your skills, your experience, your network, your story. This course teaches systematic extraction and monetization of what you already possess.",
    pillar: "wealth",
    tier_required: "discipulus",
    order_index: 7,
    total_lessons: 12,
    duration_hours: 6,
    is_featured: false,
    latin_quote: "In medio stat virtus",
    latin_translation:
      '"Virtue stands in the middle." — Aristotle. Start from where you are.',
  },

  // ─────────────────────────────────────────────
  // LEGAL SOVEREIGNTY (NEW PILLAR)
  // ─────────────────────────────────────────────
  {
    id: "sov-101",
    slug: "flag-theory",
    title: "Flag Theory: The Free Man's Framework",
    subtitle: "Live, bank, and structure your life across jurisdictions",
    description:
      "Flag Theory — different flags (countries) for living, business, banking, investing, and citizenship. The complete framework for legally paying minimal tax, protecting assets, and living freely.",
    pillar: "sovereignty",
    tier_required: "miles",
    order_index: 1,
    total_lessons: 16,
    duration_hours: 9,
    is_featured: true,
    latin_quote: "Ubi bene, ibi patria",
    latin_translation:
      '"Where it is well, there is my homeland." — Ancient Latin maxim',
  },
  {
    id: "sov-102",
    slug: "golden-visas",
    title: "Golden Visas & Second Passports",
    subtitle: "Buy your freedom with legal residency programs",
    description:
      "Portugal, UAE, Panama, Paraguay, Malta, Montenegro. Every major golden visa and residency by investment program ranked. Costs, timelines, tax implications, and lifestyle.",
    pillar: "sovereignty",
    tier_required: "miles",
    order_index: 2,
    total_lessons: 12,
    duration_hours: 6,
    is_featured: false,
    latin_quote: "Orbis terrarum patria mea est",
    latin_translation: '"The whole world is my homeland." — Seneca',
  },
  {
    id: "sov-103",
    slug: "offshore-banking",
    title: "Offshore Banking & Asset Protection",
    subtitle: "Legal wealth protection across jurisdictions",
    description:
      "Swiss banks, Singapore accounts, Cayman structures, Belize LLCs. How to legally hold, protect, and grow wealth outside your home country. Compliance, reporting, and the right structures.",
    pillar: "sovereignty",
    tier_required: "miles",
    order_index: 3,
    total_lessons: 14,
    duration_hours: 7,
    is_featured: false,
    latin_quote: "Pecunia nervus belli",
    latin_translation: '"Money is the sinew of war." — Cicero',
  },
  {
    id: "sov-104",
    slug: "crypto-sovereignty",
    title: "Crypto Sovereignty",
    subtitle: "Bitcoin, self-custody, DeFi, and financial freedom",
    description:
      "Bitcoin as a savings technology. Self-custody with hardware wallets. DeFi protocols for yield. Privacy coins. Tax-advantaged structures. The complete sovereign crypto stack.",
    pillar: "sovereignty",
    tier_required: "miles",
    order_index: 4,
    total_lessons: 18,
    duration_hours: 10,
    is_featured: true,
    latin_quote: "Auri sacra fames",
    latin_translation:
      '"The accursed hunger for gold." — Virgil. Know what drives the system.',
  },
  {
    id: "sov-105",
    slug: "tax-optimization",
    title: "Legal Tax Optimization",
    subtitle: "Pay what the law requires — not a cent more",
    description:
      "Territorial tax systems, perpetual traveler strategy, offshore company structures, Puerto Rico Act 60, FEIE, Dubai residency. Comprehensive legal tax reduction for location-independent men.",
    pillar: "sovereignty",
    tier_required: "miles",
    order_index: 5,
    total_lessons: 15,
    duration_hours: 8,
    is_featured: false,
    latin_quote: "Leges sine moribus vanae",
    latin_translation:
      '"Laws without morals are useless." — Horace. Understand the law; use it.',
  },
  {
    id: "sov-106",
    slug: "best-countries-live",
    title: "The World's Best Countries for Free Men",
    subtitle: "Where to base yourself, grow wealth, and live well",
    description:
      "UAE, Georgia, Paraguay, Portugal, Thailand, Panama, Mexico. Each country ranked by tax, lifestyle, cost of living, business ease, safety, and access to women/community. Real intel from men who've lived it.",
    pillar: "sovereignty",
    tier_required: "discipulus",
    order_index: 6,
    total_lessons: 10,
    duration_hours: 5,
    is_featured: false,
    latin_quote: "Mihi patria est ubicumque est bene",
    latin_translation: '"My homeland is wherever I am well." — Cicero',
  },

  // ─────────────────────────────────────────────
  // PSYCHOLOGY
  // ─────────────────────────────────────────────
  {
    id: "psych-101",
    slug: "48-laws-decoded",
    title: "48 Laws of Power: The Excelsus Analysis",
    subtitle: "Robert Greene decoded and weaponized",
    description:
      "Every law broken down. Not just what it means — but when to use it, when to deliberately break it, and how to recognize it being used against you in real time.",
    pillar: "psychology",
    tier_required: "miles",
    order_index: 1,
    total_lessons: 24,
    duration_hours: 16,
    is_featured: true,
    latin_quote: "Divide et impera",
    latin_translation: '"Divide and conquer." — Ancient Roman strategy',
  },
  {
    id: "psych-102",
    slug: "architecture-of-influence",
    title: "The Architecture of Influence",
    subtitle: "Cialdini, dark persuasion, and ethical weaponization",
    description:
      "Reciprocity, scarcity, authority, social proof, liking, commitment/consistency, unity. Learn to use the six weapons of influence and to spot them being used on you — because they are, daily.",
    pillar: "psychology",
    tier_required: "miles",
    order_index: 2,
    total_lessons: 14,
    duration_hours: 8,
    is_featured: false,
    latin_quote: "Vincit omnia veritas",
    latin_translation:
      '"Truth conquers all." — Common Latin. Know what\'s really being said.',
  },
  {
    id: "psych-103",
    slug: "dark-triad-decoded",
    title: "The Dark Triad: Know Your Enemy",
    subtitle:
      "Narcissism, Machiavellianism, psychopathy — identification and defense",
    description:
      "Dark triad individuals exist in boardrooms, bedrooms, and brotherhoods. Learn to spot the behavioral tells, protect yourself, and understand how their psychology operates from the inside.",
    pillar: "psychology",
    tier_required: "miles",
    order_index: 3,
    total_lessons: 11,
    duration_hours: 6,
    is_featured: false,
    latin_quote: "Nosce te ipsum",
    latin_translation: '"Know thyself." — Delphic maxim',
  },
  {
    id: "psych-104",
    slug: "mastery-framework",
    title: "The Mastery Framework",
    subtitle: "Robert Greene's Mastery decoded and applied",
    description:
      "Finding your Life's Task. The apprenticeship phase. Social intelligence. The creative-active phase. True mastery. The complete roadmap from Greene's masterwork, applied to your specific situation.",
    pillar: "psychology",
    tier_required: "miles",
    order_index: 4,
    total_lessons: 20,
    duration_hours: 12,
    is_featured: true,
    latin_quote: "Repetitio mater studiorum est",
    latin_translation:
      '"Repetition is the mother of learning." — Latin proverb',
  },
  {
    id: "psych-105",
    slug: "art-of-seduction-applied",
    title: "The Art of Seduction: Applied",
    subtitle: "Greene's Art of Seduction — beyond romance",
    description:
      "Seduction of rooms, ideas, clients, followers, and allies. The nine seducer types. The 24 maneuvers. How magnetic men operate — their body language, their frame, their timing.",
    pillar: "psychology",
    tier_required: "excelsus",
    order_index: 5,
    total_lessons: 15,
    duration_hours: 8,
    is_featured: false,
    latin_quote: "Veni, vidi, vici",
    latin_translation: '"I came, I saw, I conquered." — Julius Caesar',
  },
  {
    id: "psych-106",
    slug: "cognitive-biases-warfare",
    title: "Cognitive Biases as Weapons",
    subtitle: "The 40+ biases being used against you — and how to use them",
    description:
      "Anchoring, framing, sunk cost, availability heuristic, confirmation bias. This course catalogs every major cognitive bias with real-world examples of how they're exploited in marketing, politics, and interpersonal dynamics.",
    pillar: "psychology",
    tier_required: "miles",
    order_index: 6,
    total_lessons: 16,
    duration_hours: 9,
    is_featured: false,
    latin_quote: "Errare humanum est, perseverare autem diabolicum",
    latin_translation:
      '"To err is human, but to persist in error is diabolical." — Seneca',
  },
  {
    id: "psych-107",
    slug: "frame-control",
    title: "Frame Control",
    subtitle: "He who controls the frame controls the interaction",
    description:
      "Every interaction has a frame. The man who sets and holds the frame wins — in negotiations, relationships, sales, leadership. Learn to establish, hold, and break others' frames.",
    pillar: "psychology",
    tier_required: "miles",
    order_index: 7,
    total_lessons: 10,
    duration_hours: 5,
    is_featured: false,
    latin_quote: "Qui tacet consentire videtur",
    latin_translation:
      '"He who is silent appears to consent." — Legal maxim. Silence surrenders the frame.',
  },

  // ─────────────────────────────────────────────
  // PHYSICAL DOMINION
  // ─────────────────────────────────────────────
  {
    id: "physical-101",
    slug: "iron-temple",
    title: "The Iron Temple",
    subtitle: "12-week strength foundation program",
    description:
      "A complete strength and conditioning program built around compound lifts, progressive overload, and the warrior body ideal. Squat, deadlift, press, pull. No fluff.",
    pillar: "physical",
    tier_required: "discipulus",
    order_index: 1,
    total_lessons: 36,
    duration_hours: 12,
    is_featured: false,
    latin_quote: "Mens sana in corpore sano",
    latin_translation: '"A sound mind in a sound body." — Juvenal',
  },
  {
    id: "physical-102",
    slug: "combat-fundamentals",
    title: "Combat Fundamentals",
    subtitle: "Boxing, wrestling, and the fighting man's foundation",
    description:
      "Every man should be able to fight. Not to start violence — to end it, and to carry the quiet confidence of a man who can. Boxing fundamentals, wrestling base, and the mental game of combat sports.",
    pillar: "physical",
    tier_required: "discipulus",
    order_index: 2,
    total_lessons: 20,
    duration_hours: 10,
    is_featured: true,
    latin_quote: "Cedant arma togae",
    latin_translation:
      '"Let arms yield to the toga." — Cicero. Know when to fight, when not to.',
  },
  {
    id: "physical-103",
    slug: "nutrition-warfare",
    title: "Nutrition as Warfare",
    subtitle: "Fueling the warrior body",
    description:
      "How to eat like a Spartan. Protein targets, meal timing, fasting protocols, food quality over calorie counting. Testosterone optimization through diet. No broscience — evidence-based protocols.",
    pillar: "physical",
    tier_required: "discipulus",
    order_index: 3,
    total_lessons: 10,
    duration_hours: 4,
    is_featured: false,
    latin_quote: "Edimus ut vivamus",
    latin_translation:
      '"We eat to live." — Socrates. Food is fuel, not comfort.',
  },
  {
    id: "physical-104",
    slug: "testosterone-optimization",
    title: "Testosterone Optimization",
    subtitle: "Natural and advanced protocols for peak male performance",
    description:
      "Sleep optimization, training variables, diet protocols, stress management, and supplement stacks. Everything that moves the needle on testosterone, naturally. The hormone is the man.",
    pillar: "physical",
    tier_required: "miles",
    order_index: 4,
    total_lessons: 12,
    duration_hours: 6,
    is_featured: false,
    latin_quote: "Vis consili expers mole ruit sua",
    latin_translation:
      '"Strength devoid of wisdom falls by its own weight." — Horace',
  },
  {
    id: "physical-105",
    slug: "muay-thai-mma",
    title: "Striking Arts: Muay Thai & MMA",
    subtitle: "The most complete striking system for real-world application",
    description:
      "Muay Thai fundamentals — 8-limb striking, clinch work, kicks, elbows. How MMA integrates with wrestling and jiu-jitsu. Training structure and how to get good fast.",
    pillar: "physical",
    tier_required: "miles",
    order_index: 5,
    total_lessons: 16,
    duration_hours: 8,
    is_featured: false,
    latin_quote: "Aut vincere aut mori",
    latin_translation: '"Either to conquer or to die." — Latin battle motto',
  },
  {
    id: "physical-106",
    slug: "cold-exposure-protocols",
    title: "Cold Exposure & Recovery Protocols",
    subtitle: "Wim Hof, cold plunges, sauna, and hormetic stress",
    description:
      "Cold exposure, deliberate breathing, heat therapy. The protocols that elite performers use to accelerate recovery, build mental toughness, and hack the nervous system. From Spartan rivers to modern science.",
    pillar: "physical",
    tier_required: "discipulus",
    order_index: 6,
    total_lessons: 8,
    duration_hours: 3,
    is_featured: false,
    latin_quote: "Durum patientia frango",
    latin_translation: '"I break hard things through endurance." — Latin motto',
  },

  // ─────────────────────────────────────────────
  // SOCIAL MASTERY
  // ─────────────────────────────────────────────
  {
    id: "social-101",
    slug: "command-the-room",
    title: "Command the Room",
    subtitle: "Body language, voice, and social dominance",
    description:
      "Walk into any room and own it. Posture, eye contact, vocal tonality, handshake, spatial dominance. The nonverbal language of the high-status man — and how to build it.",
    pillar: "social",
    tier_required: "discipulus",
    order_index: 1,
    total_lessons: 12,
    duration_hours: 5,
    is_featured: false,
    latin_quote: "Auctoritas",
    latin_translation:
      '"Prestige and influence earned through demonstrated excellence." — Roman ideal',
  },
  {
    id: "social-102",
    slug: "negotiation-warfare",
    title: "Negotiation Warfare",
    subtitle: "Never leave value on the table again",
    description:
      "Salary negotiation, business deals, conflict resolution, hostage-style negotiation. The complete playbook — including Chris Voss tactics, anchoring, BATNA, and the silent close.",
    pillar: "social",
    tier_required: "miles",
    order_index: 2,
    total_lessons: 14,
    duration_hours: 7,
    is_featured: true,
    latin_quote: "Qui tacet consentire videtur",
    latin_translation:
      '"He who is silent appears to consent." — Silence is your weapon.',
  },
  {
    id: "social-103",
    slug: "networking-elite",
    title: "Elite Networking",
    subtitle: "Build relationships with high-value men and women",
    description:
      "How to get in any room. How to be remembered. How to add value before extracting it. The etiquette of elite circles and how to navigate them without being seen as a networker.",
    pillar: "social",
    tier_required: "miles",
    order_index: 3,
    total_lessons: 11,
    duration_hours: 5,
    is_featured: false,
    latin_quote: "Homo homini lupus",
    latin_translation:
      '"Man is wolf to man." — Plautus. Know who is around your table.',
  },
  {
    id: "social-104",
    slug: "masculine-relationships",
    title: "Masculine Relationships",
    subtitle: "Brotherhood, mentors, and the men who shape you",
    description:
      "How to find and keep high-quality male friends. How to identify and approach mentors. What brotherhood actually means beyond the word. The relationships that determine your trajectory.",
    pillar: "social",
    tier_required: "discipulus",
    order_index: 4,
    total_lessons: 9,
    duration_hours: 4,
    is_featured: false,
    latin_quote: "Amici fures temporis",
    latin_translation:
      '"Friends are thieves of time." — Francis Bacon. Choose carefully.',
  },

  // ─────────────────────────────────────────────
  // LEGACY & PURPOSE
  // ─────────────────────────────────────────────
  {
    id: "legacy-101",
    slug: "ten-year-vision",
    title: "The 10-Year War Plan",
    subtitle: "Build the life most men only imagine",
    description:
      "Strategic long-term planning for the man who intends to actually win. Vision boards are for children. This is a war plan — with quarterly reviews, failure protocols, and non-negotiable standards.",
    pillar: "legacy",
    tier_required: "miles",
    order_index: 1,
    total_lessons: 8,
    duration_hours: 4,
    is_featured: false,
    latin_quote: "Dum vivimus, vivamus",
    latin_translation: '"While we live, let us truly live." — Latin maxim',
  },
  {
    id: "legacy-102",
    slug: "examined-life",
    title: "The Examined Life",
    subtitle: "Daily reflection, journaling, and the Socratic method applied",
    description:
      '"The unexamined life is not worth living." This course teaches daily Stoic journaling, evening review, and Socratic self-questioning as a practice of continuous self-mastery.',
    pillar: "legacy",
    tier_required: "discipulus",
    order_index: 2,
    total_lessons: 8,
    duration_hours: 3,
    is_featured: false,
    latin_quote: "Gnothi seauton",
    latin_translation: '"Know thyself." — Temple of Apollo at Delphi',
  },
  {
    id: "legacy-103",
    slug: "build-your-empire",
    title: "Build Your Empire",
    subtitle: "The long game — generational wealth and enduring impact",
    description:
      "What does it mean to leave something that lasts? From business structures to family legacy to creative work. The men who built things that outlasted them all followed recognizable patterns.",
    pillar: "legacy",
    tier_required: "excelsus",
    order_index: 3,
    total_lessons: 12,
    duration_hours: 6,
    is_featured: true,
    latin_quote: "Sic itur ad astra",
    latin_translation:
      '"Thus one goes to the stars." — Virgil. The path to legacy.',
  },
];

export const LATIN_QUOTES = [
  {
    quote: "Dum spiro, spero",
    translation: "While I breathe, I hope.",
    author: "Cicero",
  },
  {
    quote: "Virtus in arduis",
    translation: "Virtue shines in difficulty.",
    author: "Latin proverb",
  },
  {
    quote: "Per aspera ad astra",
    translation: "Through hardship to the stars.",
    author: "Latin proverb",
  },
  {
    quote: "Aut viam inveniam aut faciam",
    translation: "I shall find a way or make one.",
    author: "Hannibal",
  },
  {
    quote: "Nemo me impune lacessit",
    translation: "No one provokes me with impunity.",
    author: "Scottish/Latin motto",
  },
  {
    quote: "Fortes fortuna adiuvat",
    translation: "Fortune favors the brave.",
    author: "Terence",
  },
  {
    quote: "Memento mori",
    translation: "Remember that you will die.",
    author: "Ancient Roman",
  },
  {
    quote: "Amor fati",
    translation: "Love of fate — love everything that happens.",
    author: "Nietzsche / Stoic",
  },
  {
    quote: "Vincit qui se vincit",
    translation: "He conquers who conquers himself.",
    author: "Latin proverb",
  },
  {
    quote: "Carpe diem",
    translation: "Seize the day — while time remains.",
    author: "Horace",
  },
  {
    quote: "Ex nihilo nihil fit",
    translation: "Nothing comes from nothing. You must put in the work.",
    author: "Lucretius",
  },
  {
    quote: "Oderint dum metuant",
    translation: "Let them hate, so long as they fear.",
    author: "Accius / Caligula",
  },
  {
    quote: "Ἀρετή",
    translation: "Arete — excellence, the fullest actualization of potential.",
    author: "Ancient Greek ideal",
  },
  {
    quote: "Λόγος",
    translation: "Logos — reason, the ordering principle of the universe.",
    author: "Heraclitus",
  },
  {
    quote: "Ἀγωγή",
    translation: "Agoge — the Spartan training regimen that forged men.",
    author: "Sparta",
  },
  {
    quote: "Ut supra, sic infra",
    translation: "As above, so below.",
    author: "Hermetic axiom",
  },
  {
    quote: "Ubi bene, ibi patria",
    translation: "Where it is well, there is my homeland.",
    author: "Ancient Latin",
  },
  {
    quote: "Deus est mortali iuvare mortalem",
    translation: "For a mortal to help mortals — that is god.",
    author: "Pliny the Elder",
  },
  {
    quote: "Fata viam invenient",
    translation: "Fate will find a way.",
    author: "Virgil",
  },
  {
    quote: "Sic itur ad astra",
    translation: "Thus one goes to the stars.",
    author: "Virgil",
  },
];
