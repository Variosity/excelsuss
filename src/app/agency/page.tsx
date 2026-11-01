"use client";

import { useState, useRef, useEffect } from "react";
import Script from "next/script";

type ChatMsg = { role: "user" | "bot"; text: string };

const SYSTEMS = {
  featured: {
    name: "AI Voice Receptionist",
    tagline: "Every call answered. Every caller captured or booked.",
    setup: "$497",
    monthly: "$397",
    terms: "One-time setup, then $397/month. Cancel with 30 days' notice.",
    items: [
      "A natural-voice AI answers your phone 24/7: nights, weekends, holidays",
      "Books appointments straight into your calendar",
      "Captures name, number, and need on every single call",
      "Answers questions from facts you approve: services, prices, hours",
      "Instant summary to you after every call",
      "Covers after-hours, overflow, or every call you get",
    ],
  },
  others: [
    {
      name: "Ads Management",
      tagline: "Google + Meta campaigns, built and managed for you.",
      setup: "$500",
      monthly: "$1,250",
      terms:
        "One-time setup, then $1,250/month. Ad spend stays on your card (we recommend $1,500+/month). 90-day minimum.",
      items: [
        "Strategy, build, and launch on Google + Meta",
        "Ad copy and audience targeting done for you",
        "Weekly optimization: budget follows what works",
        "Monthly report: spend, leads, cost per lead",
        "Your ad accounts stay 100% yours, always",
      ],
      note: "Straight talk: ads bring traffic and inquiries. Results vary, and no honest agency guarantees sales.",
    },
    {
      name: "Website + AI Booking",
      tagline: "A website that books jobs while you sleep.",
      setup: "$997",
      monthly: "$497",
      terms:
        "One-time setup, then $497/month. 6-month minimum, then month-to-month.",
      items: [
        "A fast new website, built for your business",
        "AI chat on every page, 24/7: captures name, phone, and problem",
        "Instant lead alert to you, instant reply to the customer",
        "Follow-up emails to leads who didn't book: 4 emails over 7 days",
        "Online booking and automatic review requests",
        "A 1-page monthly report: chats, leads, bookings",
      ],
    },
    {
      name: "Reactivation Campaign",
      tagline: "Wake up the customers you already earned.",
      setup: "$750",
      monthly: null as string | null,
      terms:
        "One-time, from $750. Final price depends on list size and is quoted on the call.",
      items: [
        "2–3 emails written for your business, sent to your past customers",
        "You approve every word before anything sends",
        "Your list stays 100% yours: never shared, never reused",
        "Replies and bookings tracked for you",
        "A results report when the campaign ends",
      ],
    },
  ],
};

const LEAKS = [
  {
    title: "The phone rings out",
    body: "A customer calls at 8pm and gets voicemail. They don't leave a message. They call the next company.",
  },
  {
    title: "Leads go cold",
    body: "Someone fills out your form and hears back tomorrow, or never. Whoever answers first wins the job.",
  },
  {
    title: "The list sleeps",
    body: "Past customers are ready to buy again and nobody asks. It's the cheapest revenue you own.",
  },
];

const COMPARE = [
  [
    "Missed calls",
    "A receptionist: $3,000+/month, 9-to-5, sick days and turnover",
    "AI receptionist answers 24/7 for $397/month",
  ],
  [
    "Lead follow-up",
    "Whoever notices first, hours or days later",
    "Instant alert to you, instant reply to the customer",
  ],
  [
    "New customers",
    "Hope, referrals, and word of mouth",
    "Managed Google + Meta ads with cost-per-lead reporting",
  ],
  [
    "Past customers",
    "A list sitting in a drawer, going cold",
    "A campaign that wakes them up and books them again",
  ],
  ["Proof it works", "Gut feeling", "One monthly report in plain numbers"],
  [
    "Who runs it",
    "You, on top of everything else",
    "Excelsus: built, managed, reported",
  ],
];

const STEPS = [
  {
    n: "01",
    t: "Demo call",
    d: "Day 0",
    p: "15 minutes. We find the leak costing you the most customers. If we can't fix it, I'll tell you straight.",
  },
  {
    n: "02",
    t: "Say yes",
    d: "Day 0",
    p: "The setup fee for your system, paid online. No payment, no start. That keeps both of us serious.",
  },
  {
    n: "03",
    t: "Intake",
    d: "Day 1",
    p: "A 15-minute form: services, prices, hours. You approve one page of facts. That's all your AI is ever allowed to say.",
  },
  {
    n: "04",
    t: "Build & launch",
    d: "Days 2–6",
    p: "We build it, then test it live with you watching: a real call, a real lead, end to end. Ad campaigns launch within 14 days.",
  },
  {
    n: "05",
    t: "Report & grow",
    d: "Day 30",
    p: "Your first monthly report lands: exactly what your systems produced, in plain numbers. Add a second system whenever you're ready.",
  },
];

const AUDIENCE = [
  "Home services",
  "Medical & dental",
  "Legal & professional",
  "Realtors",
  "Auto",
  "Salons & fitness",
  "Any lead-driven business",
];

const PROOF = [
  {
    tag: "Live platform",
    name: "Excelsus",
    desc: "Full-stack brand and membership platform: auth, subscriptions, community, and an admin panel. Built and maintained by me.",
    stack: ["Next.js", "Supabase", "Stripe", "Vercel"],
  },
  {
    tag: "Live platform",
    name: "HackLingo",
    desc: "Gamified cybersecurity learning platform with an XP system for learning ethical hacking. Built from scratch.",
    stack: ["Next.js", "Supabase", "TypeScript"],
  },
  {
    tag: "Client work",
    name: "Orlando Realtor, Roxanne Fernandez",
    desc: "Real estate listing site with lead capture and property inquiry forms. Delivered in under a week.",
    stack: ["Next.js", "Vercel", "SEO"],
  },
  {
    tag: "Security",
    name: "Hardened by default",
    desc: "OWASP Top 10, CSP headers, input validation, auth hardening. Security is part of the foundation, not an add-on.",
    stack: ["OWASP", "CSP", "Auth"],
  },
  {
    tag: "Engineering",
    name: "Achlys, a programming language",
    desc: "A complete language built from scratch: lexer, parser, interpreter, standard library. The caliber of thinking behind every system.",
    stack: ["Language design", "C / Rust"],
  },
  {
    tag: "Systems",
    name: "Custom OS / kernel",
    desc: "A kernel and operating system written from scratch: memory management, scheduling, system calls.",
    stack: ["Systems", "C / Assembly / LLVM"],
  },
];

const FAQ = [
  [
    "Do I have to manage anything?",
    "No. We build, run, monitor, and report. You approve one page of facts and, for reactivation, the emails. We handle the rest.",
  ],
  [
    "What does the AI say to my customers?",
    "Only what's on the one-page facts sheet you approve: your services, prices, and hours. It answers from those facts and captures the caller's details for you.",
  ],
  [
    "Do I keep my ad accounts and customer list?",
    "Yes. Ad accounts stay 100% yours, and your customer list is never shared or reused.",
  ],
  [
    "How long am I locked in?",
    "Voice receptionist: cancel with 30 days' notice. Ads: 90-day minimum. Website + AI booking: 6-month minimum, then month-to-month. Reactivation is a one-time project.",
  ],
  [
    "Can I start with one system and add more later?",
    "Yes. Start with the leak that costs you the most and add a second system any time.",
  ],
];

const QUICK_PROMPTS = [
  "What does it cost?",
  "How does the voice receptionist work?",
  "How fast can I be live?",
];

export default function AgencyPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    {
      role: "bot",
      text: "Hey, I'm the Excelsus AI assistant. Ask me about the voice receptionist, ads, the booking system, reactivation, or prices. What does your business do?",
    },
  ]);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages, chatLoading]);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  async function sendChat(preset?: string) {
    const msg = (preset ?? chatInput).trim();
    if (!msg || chatLoading) return;
    setChatInput("");
    const updated: ChatMsg[] = [...chatMessages, { role: "user", text: msg }];
    setChatMessages(updated);
    setChatLoading(true);
    try {
      const res = await fetch("/api/agency-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "Sorry, could you try that again?" },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Something went wrong. Email alejandriosity@gmail.com directly.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <div className="ex">
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

.ex *{box-sizing:border-box;margin:0;padding:0}
.ex{
  --ink:#08110D;--body:#3A4640;--muted:#6B7770;--faint:#9AA59F;
  --bg:#FBFCFB;--alt:#F3F6F4;--card:#FFFFFF;
  --line:#E4EAE6;--line-strong:#CFD8D2;
  --accent:#0A7F57;--accent-deep:#06503A;--accent-bright:#18C58A;--accent-soft:#E8F6EF;
  --dark:#07120D;
  --shadow-sm:0 1px 2px rgba(8,17,13,.05);
  --shadow-md:0 12px 32px -12px rgba(8,17,13,.14);
  --shadow-lg:0 32px 64px -24px rgba(8,17,13,.28);
  --serif:'Instrument Serif',Georgia,'Times New Roman',serif;
  background:var(--bg);color:var(--body);
  font-family:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
  overflow-x:hidden;line-height:1.6;
}
html{scroll-behavior:smooth}
.ex ::selection{background:var(--accent);color:#fff}
.ex a{color:inherit}
.wrap{max-width:1160px;margin:0 auto;padding:0 clamp(1.1rem,4vw,2.5rem)}
.sec{padding:clamp(4rem,9vw,7.5rem) 0}
.eyebrow{display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent)}
.h2{font-size:clamp(2rem,4.4vw,3.2rem);font-weight:700;letter-spacing:-.035em;line-height:1.05;color:var(--ink);margin-top:.9rem}
.h2 em{font-family:var(--serif);font-style:italic;font-weight:400;letter-spacing:-.01em;color:var(--accent)}
.lede{font-size:1.08rem;color:var(--body);max-width:620px;margin-top:1.1rem;line-height:1.7}

/* reveal */
.reveal{opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1)}
.reveal.in{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}html{scroll-behavior:auto}}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;font-size:.95rem;font-weight:600;letter-spacing:-.005em;padding:.95rem 1.6rem;border-radius:12px;text-decoration:none;border:1px solid transparent;cursor:pointer;transition:transform .2s,box-shadow .2s,background .2s,border-color .2s;white-space:nowrap;font-family:inherit}
.btn-primary{background:var(--accent);color:#fff!important;box-shadow:0 12px 28px -12px rgba(10,127,87,.7)}
.btn-primary:hover{background:var(--accent-deep);transform:translateY(-1px)}
.btn-ghost{background:#fff;color:var(--ink)!important;border-color:var(--line-strong)}
.btn-ghost:hover{border-color:var(--ink);transform:translateY(-1px)}
.btn-block{width:100%}

/* nav */
.nav{position:sticky;top:0;z-index:60;background:rgba(251,252,251,.82);backdrop-filter:saturate(180%) blur(16px);-webkit-backdrop-filter:saturate(180%) blur(16px);border-bottom:1px solid var(--line)}
.nav-in{display:flex;align-items:center;justify-content:space-between;height:68px}
.brand{display:flex;align-items:center;gap:.65rem;text-decoration:none;font-weight:800;font-size:.9rem;letter-spacing:.16em;color:var(--ink)!important}
.brand-mark{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,var(--accent-bright),var(--accent-deep));display:grid;place-items:center;color:#fff;font-size:.8rem;letter-spacing:0}
.nav-links{display:flex;align-items:center;gap:2rem}
.nav-links a{font-size:.85rem;font-weight:500;color:var(--muted);text-decoration:none;transition:color .2s}
.nav-links a:hover{color:var(--ink)}
.nav-links .btn{padding:.6rem 1.15rem;font-size:.84rem;border-radius:10px;color:#fff}
.nav-links .btn:hover{color:#fff}

/* hero */
.hero{position:relative;overflow:hidden;padding:clamp(4rem,8vw,7rem) 0 clamp(3.5rem,6vw,5rem)}
.hero::before{content:'';position:absolute;inset:0;background:
  radial-gradient(900px 480px at 78% -10%,rgba(24,197,138,.18),transparent 60%),
  radial-gradient(700px 400px at 5% 10%,rgba(10,127,87,.08),transparent 60%);pointer-events:none}
.hero::after{content:'';position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:56px 56px;opacity:.5;mask-image:radial-gradient(ellipse at 50% 0%,#000 0%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse at 50% 0%,#000 0%,transparent 70%);pointer-events:none}
.hero-grid{position:relative;z-index:1;display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(2rem,5vw,4.5rem);align-items:center}
.pill{display:inline-flex;align-items:center;gap:.55rem;font-size:.76rem;font-weight:600;color:var(--accent-deep);background:var(--accent-soft);border:1px solid rgba(10,127,87,.2);padding:.4rem .85rem;border-radius:999px}
.dot{width:7px;height:7px;border-radius:50%;background:var(--accent-bright);box-shadow:0 0 0 0 rgba(24,197,138,.6);animation:pulse 2s infinite}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(24,197,138,.55)}70%{box-shadow:0 0 0 10px rgba(24,197,138,0)}100%{box-shadow:0 0 0 0 rgba(24,197,138,0)}}
.hero h1{font-size:clamp(2.7rem,6.2vw,4.9rem);font-weight:700;line-height:1;letter-spacing:-.045em;color:var(--ink);margin:1.4rem 0 1.4rem}
.hero h1 em{font-family:var(--serif);font-style:italic;font-weight:400;letter-spacing:-.015em;color:var(--accent)}
.hero-sub{font-size:clamp(1.05rem,1.8vw,1.2rem);color:var(--body);max-width:560px;line-height:1.7}
.hero-cta{display:flex;gap:.8rem;flex-wrap:wrap;margin-top:2.1rem}
.hero-trust{display:flex;gap:1.4rem;flex-wrap:wrap;margin-top:2rem;font-size:.82rem;font-weight:500;color:var(--muted)}
.hero-trust span{display:inline-flex;align-items:center;gap:.45rem}
.hero-trust i{font-style:normal;color:var(--accent);font-weight:700}

/* call mock */
.mock{position:relative;background:#fff;border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow-lg);padding:1.3rem;max-width:440px;margin-left:auto;width:100%}
.mock::before{content:'';position:absolute;inset:-1px;border-radius:24px;padding:1px;background:linear-gradient(160deg,rgba(24,197,138,.55),transparent 45%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.mock-head{display:flex;align-items:center;justify-content:space-between;padding-bottom:1rem;border-bottom:1px solid var(--line);margin-bottom:1rem}
.mock-who{display:flex;align-items:center;gap:.7rem}
.mock-ava{width:38px;height:38px;border-radius:50%;background:var(--accent-soft);display:grid;place-items:center;font-size:1rem}
.mock-title{font-size:.88rem;font-weight:700;color:var(--ink);line-height:1.2}
.mock-sub{font-size:.74rem;color:var(--muted)}
.mock-live{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-deep);background:var(--accent-soft);padding:.28rem .6rem;border-radius:999px;display:inline-flex;align-items:center;gap:.4rem}
.bubble{font-size:.88rem;line-height:1.5;padding:.7rem .9rem;border-radius:16px;max-width:86%;margin-bottom:.6rem}
.bubble small{display:block;font-size:.64rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.2rem;opacity:.65}
.b-caller{background:var(--alt);color:var(--body);border-bottom-left-radius:5px}
.b-ai{background:var(--accent);color:#fff;margin-left:auto;border-bottom-right-radius:5px}
.mock-result{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-top:1rem}
.mock-chip{border:1px solid var(--line);border-radius:12px;padding:.7rem .8rem;background:#fff}
.mock-chip b{display:block;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:.15rem}
.mock-chip span{font-size:.86rem;font-weight:600;color:var(--ink)}
.mock-cap{text-align:center;font-size:.7rem;color:var(--faint);margin-top:.9rem}
.mock-float{position:absolute;left:-1.5rem;bottom:2.5rem;background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:var(--shadow-md);padding:.7rem .95rem;font-size:.8rem;font-weight:600;color:var(--ink);display:flex;align-items:center;gap:.55rem}
.mock-float i{font-style:normal;color:var(--accent)}

/* stat strip */
.strip{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:#fff}
.strip-grid{display:grid;grid-template-columns:repeat(4,1fr)}
.strip-item{padding:1.6rem 1rem;text-align:center;border-right:1px solid var(--line)}
.strip-item:last-child{border-right:none}
.strip-n{font-size:1.9rem;font-weight:700;letter-spacing:-.03em;color:var(--ink);line-height:1}
.strip-l{font-size:.7rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:.5rem}

/* leaks */
.leaks{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:3rem}
.leak{padding:1.9rem;border:1px solid var(--line);background:#fff;border-radius:20px;box-shadow:var(--shadow-sm)}
.leak-n{font-family:var(--serif);font-style:italic;font-size:2.2rem;color:var(--accent);line-height:1;margin-bottom:1.1rem}
.leak h3{font-size:1.12rem;font-weight:700;letter-spacing:-.015em;color:var(--ink);margin-bottom:.5rem}
.leak p{font-size:.95rem;color:var(--muted);line-height:1.65}

/* systems */
.sys-head{display:flex;justify-content:space-between;align-items:flex-end;gap:2rem;flex-wrap:wrap}
.feat{display:grid;grid-template-columns:1.05fr .95fr;margin-top:3rem;background:var(--dark);color:#fff;border-radius:28px;overflow:hidden;box-shadow:var(--shadow-lg);position:relative}
.feat::before{content:'';position:absolute;right:-10%;top:-40%;width:520px;height:520px;background:radial-gradient(circle,rgba(24,197,138,.28),transparent 65%);pointer-events:none}
.feat-l{padding:clamp(1.8rem,4vw,3rem);position:relative;z-index:1}
.feat-r{padding:clamp(1.8rem,4vw,3rem);background:rgba(255,255,255,.04);border-left:1px solid rgba(255,255,255,.08);position:relative;z-index:1;display:flex;flex-direction:column}
.badge{display:inline-block;font-size:.66rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;background:var(--accent-bright);color:#032417;padding:.32rem .75rem;border-radius:999px}
.feat h3{font-size:clamp(1.7rem,3.2vw,2.3rem);font-weight:700;letter-spacing:-.03em;margin:1.1rem 0 .6rem;line-height:1.1}
.feat-tag{color:rgba(255,255,255,.72);font-size:1.02rem;max-width:440px}
.price-row{display:flex;align-items:flex-end;gap:.4rem;margin-top:1.8rem}
.price-big{font-size:3.4rem;font-weight:700;letter-spacing:-.04em;line-height:1}
.price-unit{font-size:.9rem;color:rgba(255,255,255,.6);padding-bottom:.45rem}
.price-plus{font-size:.95rem;color:rgba(255,255,255,.75);margin-top:.6rem}
.feat-terms{font-size:.82rem;color:rgba(255,255,255,.5);margin-top:.5rem}
.checks{list-style:none;display:flex;flex-direction:column;gap:.8rem}
.checks li{display:flex;gap:.7rem;font-size:.95rem;line-height:1.5;align-items:flex-start}
.checks li::before{content:'';flex-shrink:0;width:18px;height:18px;margin-top:.15rem;border-radius:50%;background:var(--accent-soft) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 8.5l2.6 2.6L12 5.6' fill='none' stroke='%230A7F57' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/12px no-repeat}
.feat-r .checks li{color:rgba(255,255,255,.88)}
.feat-r .checks li::before{background-color:rgba(24,197,138,.2)}
.feat-cta{margin-top:auto;padding-top:2rem}
.feat .btn-primary{background:var(--accent-bright);color:#032417!important;box-shadow:0 14px 30px -12px rgba(24,197,138,.7)}
.feat .btn-primary:hover{background:#2EDDA0}

.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1rem}
.card{background:#fff;border:1px solid var(--line);border-radius:22px;padding:1.9rem;display:flex;flex-direction:column;box-shadow:var(--shadow-sm);transition:transform .25s,box-shadow .25s,border-color .25s}
.card:hover{transform:translateY(-3px);box-shadow:var(--shadow-md);border-color:var(--line-strong)}
.card h3{font-size:1.2rem;font-weight:700;letter-spacing:-.02em;color:var(--ink)}
.card-tag{font-size:.9rem;color:var(--muted);margin:.3rem 0 1.4rem;min-height:2.7em}
.card .price-row{margin-top:0}
.card .price-big{font-size:2.6rem;color:var(--ink)}
.card .price-unit{color:var(--muted)}
.card .price-plus{color:var(--body);font-weight:600;margin-top:.5rem}
.card-terms{font-size:.8rem;color:var(--muted);margin:.55rem 0 1.4rem;line-height:1.55}
.card .checks{flex:1;margin-bottom:1.6rem;gap:.65rem}
.card .checks li{font-size:.9rem;color:var(--body)}
.card-note{font-size:.78rem;color:var(--muted);background:var(--alt);border-radius:12px;padding:.8rem .9rem;margin-bottom:1.3rem;line-height:1.55}

.promise{display:flex;align-items:center;gap:1.2rem;margin-top:1.4rem;padding:1.4rem 1.7rem;border:1px solid rgba(10,127,87,.28);background:var(--accent-soft);border-radius:20px}
.promise-ic{flex-shrink:0;width:42px;height:42px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-weight:700}
.promise b{display:block;font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--accent-deep);margin-bottom:.2rem}
.promise p{font-size:.96rem;color:var(--body)}

/* compare */
.cmp{margin-top:3rem;border:1px solid var(--line);border-radius:24px;overflow:hidden;background:#fff;box-shadow:var(--shadow-sm)}
.cmp-row{display:grid;grid-template-columns:.8fr 1.1fr 1.1fr;gap:0;border-bottom:1px solid var(--line)}
.cmp-row:last-child{border-bottom:none}
.cmp-row>div{padding:1.15rem 1.5rem;font-size:.93rem}
.cmp-head>div{font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);background:var(--alt);padding:1rem 1.5rem}
.cmp-head>div:last-child{color:var(--accent-deep)}
.cmp-k{font-weight:600;color:var(--ink)}
.cmp-old{color:var(--muted)}
.cmp-new{color:var(--ink);font-weight:500;background:linear-gradient(90deg,rgba(232,246,239,.7),transparent)}

/* process */
.steps{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-top:3rem;position:relative}
.step{background:#fff;border:1px solid var(--line);border-radius:20px;padding:1.5rem;box-shadow:var(--shadow-sm);position:relative}
.step-n{font-family:var(--serif);font-style:italic;font-size:2.1rem;color:var(--accent);line-height:1}
.step h3{font-size:1rem;font-weight:700;color:var(--ink);margin:.9rem 0 .15rem;letter-spacing:-.01em}
.step-d{font-size:.74rem;font-weight:700;letter-spacing:.06em;color:var(--accent-deep);margin-bottom:.6rem}
.step p{font-size:.86rem;color:var(--muted);line-height:1.6}
.chips{display:flex;flex-wrap:wrap;gap:.55rem;margin-top:1.4rem}
.chip{font-size:.85rem;font-weight:500;color:var(--ink);background:#fff;border:1px solid var(--line-strong);padding:.5rem .95rem;border-radius:999px}
.chip-accent{background:var(--accent-soft);border-color:rgba(10,127,87,.25);color:var(--accent-deep);font-weight:600}

/* manifesto */
.manifesto{background:var(--dark);color:#fff;padding:clamp(4rem,8vw,6.5rem) 0;position:relative;overflow:hidden;text-align:center}
.manifesto::before{content:'';position:absolute;left:50%;top:-50%;transform:translateX(-50%);width:800px;height:600px;background:radial-gradient(circle,rgba(24,197,138,.22),transparent 65%);pointer-events:none}
.manifesto blockquote{position:relative;font-family:var(--serif);font-size:clamp(1.55rem,3.4vw,2.5rem);line-height:1.3;letter-spacing:-.01em;max-width:900px;margin:0 auto}
.manifesto cite{position:relative;display:block;margin-top:1.8rem;font-style:normal;font-size:.72rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--accent-bright)}

/* proof */
.proof{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:3rem}
.pcard{background:#fff;border:1px solid var(--line);border-radius:20px;padding:1.6rem;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s}
.pcard:hover{transform:translateY(-3px);box-shadow:var(--shadow-md)}
.ptag{font-size:.66rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
.pcard h3{font-size:1.05rem;font-weight:700;letter-spacing:-.015em;color:var(--ink);margin:.55rem 0 .5rem}
.pcard p{font-size:.9rem;color:var(--muted);line-height:1.65;flex:1}
.pstack{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1.1rem}
.pill-s{font-size:.7rem;font-weight:600;color:var(--muted);border:1px solid var(--line);padding:.25rem .65rem;border-radius:999px;background:var(--alt)}

/* faq */
.faq{max-width:820px;margin:3rem auto 0}
.faq details{border-bottom:1px solid var(--line);padding:1.25rem 0}
.faq summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:1rem;font-size:1.05rem;font-weight:600;color:var(--ink);letter-spacing:-.01em}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:'+';font-size:1.4rem;font-weight:400;color:var(--accent);transition:transform .2s;flex-shrink:0}
.faq details[open] summary::after{transform:rotate(45deg)}
.faq p{margin-top:.8rem;font-size:.97rem;color:var(--muted);line-height:1.7;max-width:700px}

/* contact */
.contact{background:var(--alt);border-top:1px solid var(--line);text-align:center}
.contact .lede{margin-left:auto;margin-right:auto}
.cal{max-width:760px;margin:2.5rem auto 2rem;background:#fff;border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow-md);padding:1.4rem;text-align:left;position:relative;overflow:hidden}
.cal::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--accent),var(--accent-bright))}
.cal-label{text-align:center;font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent-deep);margin-bottom:1rem}
#my-cal-inline-15min{min-height:600px}
.contact-row{display:flex;justify-content:center;gap:clamp(1.5rem,4vw,3rem);flex-wrap:wrap;margin-top:2rem}
.contact-col .lbl{font-size:.66rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:.25rem}
.contact-col a,.contact-col span.v{font-size:.95rem;font-weight:500;color:var(--accent-deep);text-decoration:none}
.contact-col a:hover{color:var(--accent)}

/* footer */
.foot{background:#fff;border-top:1px solid var(--line);padding:2.2rem 0}
.foot-in{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.2rem}
.foot-tag{font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-top:.5rem}
.foot-links{display:flex;gap:1.5rem;flex-wrap:wrap}
.foot-links a{font-size:.84rem;color:var(--muted);text-decoration:none}
.foot-links a:hover{color:var(--ink)}
.foot-bot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:.5rem;margin-top:1.6rem;padding-top:1.4rem;border-top:1px solid var(--line);font-size:.8rem;color:var(--muted)}

/* chat */
.chat{position:fixed;bottom:1.3rem;right:1.3rem;z-index:100;display:flex;flex-direction:column;align-items:flex-end;gap:.8rem}
.chat-box{display:none;flex-direction:column;width:min(370px,calc(100vw - 2rem));background:#fff;border:1px solid var(--line);border-radius:22px;box-shadow:var(--shadow-lg);overflow:hidden}
.chat-box.open{display:flex;animation:pop .25s cubic-bezier(.22,.61,.36,1)}
@keyframes pop{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}
.chat-top{display:flex;align-items:center;gap:.75rem;padding:1rem 1.15rem;background:linear-gradient(135deg,var(--accent-deep),var(--accent));color:#fff}
.chat-top .ava{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.18);display:grid;place-items:center}
.chat-top strong{display:block;font-size:.88rem;line-height:1.2}
.chat-top span{font-size:.74rem;opacity:.8}
.chat-msgs{max-height:300px;min-height:150px;overflow-y:auto;display:flex;flex-direction:column;gap:.55rem;padding:1rem;background:var(--bg)}
.msg{font-size:.9rem;line-height:1.55;padding:.6rem .85rem;max-width:88%;border-radius:14px}
.msg.user{background:var(--accent);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.msg.bot{background:#fff;color:var(--body);align-self:flex-start;border:1px solid var(--line);border-bottom-left-radius:4px}
.quick{display:flex;flex-wrap:wrap;gap:.4rem;padding:0 1rem .9rem;background:var(--bg)}
.quick button{font-family:inherit;font-size:.76rem;font-weight:600;color:var(--accent-deep);background:var(--accent-soft);border:1px solid rgba(10,127,87,.22);padding:.4rem .75rem;border-radius:999px;cursor:pointer;transition:background .2s}
.quick button:hover{background:#d6efe3}
.typing{display:flex;gap:.3rem;padding:.6rem .85rem}
.typing span{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:blink 1.2s infinite}
.typing span:nth-child(2){animation-delay:.2s}
.typing span:nth-child(3){animation-delay:.4s}
@keyframes blink{0%,80%,100%{opacity:.25}40%{opacity:1}}
.chat-in{display:flex;border-top:1px solid var(--line);background:#fff}
.chat-in input{flex:1;border:none;outline:none;padding:.9rem 1rem;font-size:.92rem;font-family:inherit;color:var(--ink);background:#fff}
.chat-in input::placeholder{color:var(--faint)}
.chat-in button{background:var(--accent);color:#fff;border:none;padding:0 1.2rem;font-size:.82rem;font-weight:600;font-family:inherit;cursor:pointer;transition:background .2s}
.chat-in button:hover{background:var(--accent-deep)}
.chat-in button:disabled{opacity:.5;cursor:not-allowed}
.chat-fab{width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;background:var(--accent);color:#fff;font-size:1.4rem;display:grid;place-items:center;box-shadow:0 16px 34px -10px rgba(10,127,87,.7);transition:transform .2s,background .2s}
.chat-fab:hover{transform:scale(1.06);background:var(--accent-deep)}

/* responsive */
@media(max-width:980px){
  .hero-grid{grid-template-columns:1fr}
  .mock{margin:1rem auto 0}
  .mock-float{display:none}
  .feat{grid-template-columns:1fr}
  .feat-r{border-left:none;border-top:1px solid rgba(255,255,255,.08)}
  .cards,.proof,.leaks{grid-template-columns:1fr 1fr}
  .steps{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:700px){
  .nav-links a:not(.btn){display:none}
  .strip-grid{grid-template-columns:1fr 1fr}
  .strip-item:nth-child(2){border-right:none}
  .strip-item:nth-child(-n+2){border-bottom:1px solid var(--line)}
  .cards,.proof,.leaks,.steps{grid-template-columns:1fr}
  .cmp-row{grid-template-columns:1fr}
  .cmp-head{display:none}
  .cmp-row>div{padding:.55rem 1.25rem}
  .cmp-row>div:first-child{padding-top:1.1rem;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent-deep)}
  .cmp-row>div:last-child{padding-bottom:1.1rem}
  .promise{flex-direction:column;align-items:flex-start}
  .btn{width:100%}
  .hero-cta .btn{flex:1 1 100%}
  .nav-links .btn{width:auto}
}
`}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top">
            <span className="brand-mark">E</span>
            EXCELSUS
          </a>
          <div className="nav-links">
            <a href="#systems">Systems</a>
            <a href="#process">Process</a>
            <a href="#proof">Proof</a>
            <a href="#faq">FAQ</a>
            <a href="#book-call" className="btn btn-primary">
              Book a call
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="wrap hero-grid">
          <div>
            <span className="pill reveal">
              <span className="dot"></span>
              Growth systems for businesses · Anywhere in the world
            </span>
            <h1 className="reveal">
              Never miss
              <br />a <em>customer</em> again.
            </h1>
            <p className="hero-sub reveal">
              An AI receptionist that answers every call. Ads that bring buyers
              to your door. A website that books jobs on its own. Campaigns
              that wake up the customers you already earned. Pick your leak.
              We build the system, run it, and report what it made you.
            </p>
            <div className="hero-cta reveal">
              <a href="#book-call" className="btn btn-primary">
                Book a 15-minute call
              </a>
              <a href="#systems" className="btn btn-ghost">
                See the systems
              </a>
            </div>
            <div className="hero-trust reveal">
              <span>
                <i>✓</i> Fixed public prices
              </span>
              <span>
                <i>✓</i> Done for you
              </span>
              <span>
                <i>✓</i> English & Spanish
              </span>
            </div>
          </div>

          <div className="reveal" aria-hidden="true">
            <div className="mock">
              <div className="mock-head">
                <div className="mock-who">
                  <div className="mock-ava">📞</div>
                  <div>
                    <div className="mock-title">Incoming call · 8:42 PM</div>
                    <div className="mock-sub">After hours</div>
                  </div>
                </div>
                <span className="mock-live">
                  <span className="dot"></span>Answered
                </span>
              </div>
              <div className="bubble b-caller">
                <small>Caller</small>
                Hi, my kitchen sink is leaking and I need someone out as soon
                as possible.
              </div>
              <div className="bubble b-ai">
                <small>AI receptionist</small>
                I can get you booked. We have tomorrow at 9:00 AM open. What's
                the best number and address for the visit?
              </div>
              <div className="mock-result">
                <div className="mock-chip">
                  <b>Booked</b>
                  <span>Tomorrow · 9:00 AM</span>
                </div>
                <div className="mock-chip">
                  <b>Owner alert</b>
                  <span>Summary sent</span>
                </div>
              </div>
              <p className="mock-cap">Illustrative example of a call</p>
            </div>
          </div>
        </div>
      </header>

      {/* STRIP */}
      <div className="strip">
        <div className="wrap strip-grid">
          {[
            ["7", "Days to launch"],
            ["24/7", "Always answering"],
            ["4", "Growth systems"],
            ["1", "Point of contact"],
          ].map(([n, l]) => (
            <div className="strip-item" key={l}>
              <div className="strip-n">{n}</div>
              <div className="strip-l">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* LEAKS */}
      <section className="sec">
        <div className="wrap">
          <span className="eyebrow reveal">The problem</span>
          <h2 className="h2 reveal">
            Most businesses don't have a product problem.
            <br />
            They have a <em>response</em> problem.
          </h2>
          <div className="leaks">
            {LEAKS.map((l, i) => (
              <div className="leak reveal" key={l.title}>
                <div className="leak-n">0{i + 1}</div>
                <h3>{l.title}</h3>
                <p>{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEMS */}
      <section className="sec" id="systems" style={{ background: "var(--alt)", paddingTop: "clamp(4rem,8vw,6rem)" }}>
        <div className="wrap">
          <div className="sys-head">
            <div>
              <span className="eyebrow reveal">What we do</span>
              <h2 className="h2 reveal">
                Pick the leak.
                <br />
                We <em>plug</em> it.
              </h2>
            </div>
            <p className="lede reveal" style={{ marginTop: 0 }}>
              Four systems, each built to plug one leak. Fixed prices, run for
              you, reported monthly in plain numbers. No surprises on the call.
            </p>
          </div>

          {/* Featured */}
          <div className="feat reveal">
            <div className="feat-l">
              <span className="badge">Start here</span>
              <h3>{SYSTEMS.featured.name}</h3>
              <p className="feat-tag">{SYSTEMS.featured.tagline}</p>
              <div className="price-row">
                <span className="price-big">{SYSTEMS.featured.setup}</span>
                <span className="price-unit">setup</span>
              </div>
              <p className="price-plus">
                then {SYSTEMS.featured.monthly}/month
              </p>
              <p className="feat-terms">{SYSTEMS.featured.terms}</p>
            </div>
            <div className="feat-r">
              <ul className="checks">
                {SYSTEMS.featured.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <div className="feat-cta">
                <a href="#book-call" className="btn btn-primary btn-block">
                  Book a 15-minute call
                </a>
              </div>
            </div>
          </div>

          {/* Others */}
          <div className="cards">
            {SYSTEMS.others.map((s) => (
              <div className="card reveal" key={s.name}>
                <h3>{s.name}</h3>
                <p className="card-tag">{s.tagline}</p>
                <div className="price-row">
                  <span className="price-big">{s.setup}</span>
                  <span className="price-unit">
                    {s.monthly ? "setup" : "one-off, from"}
                  </span>
                </div>
                {s.monthly && (
                  <p className="price-plus">then {s.monthly}/month</p>
                )}
                <p className="card-terms">{s.terms}</p>
                <ul className="checks">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                {s.note && <p className="card-note">{s.note}</p>}
                <a href="#book-call" className="btn btn-ghost btn-block">
                  Book a 15-minute call
                </a>
              </div>
            ))}
          </div>

          <div className="promise reveal">
            <div className="promise-ic">✓</div>
            <div>
              <b>Our promise</b>
              <p>
                Most systems live within 7 days of your completed intake (ad
                campaigns within 14 days), and your first monthly report lands
                within 30 days of launch. If we're late because of us, we keep
                working free until it's live.
              </p>
            </div>
          </div>

          <p className="lede reveal" style={{ marginTop: "1.6rem", fontSize: ".95rem" }}>
            One partner, everything run for you: one point of contact, systems
            monitored 24/7, small updates included, one plain monthly report.
            Not sold here: hourly work, logos, standalone social posting, SEO
            packages. If it's not one of the four systems above, ask on the
            call. We'd rather tell you straight than sell you wrong.
          </p>
        </div>
      </section>

      {/* COMPARE */}
      <section className="sec">
        <div className="wrap">
          <span className="eyebrow reveal">Why Excelsus</span>
          <h2 className="h2 reveal">
            Why not the <em>usual</em> way?
          </h2>
          <div className="cmp reveal">
            <div className="cmp-row cmp-head">
              <div>What matters</div>
              <div>The usual way</div>
              <div>Excelsus</div>
            </div>
            {COMPARE.map(([k, o, n]) => (
              <div className="cmp-row" key={k}>
                <div className="cmp-k">{k}</div>
                <div className="cmp-old">{o}</div>
                <div className="cmp-new">{n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec" id="process" style={{ background: "var(--alt)" }}>
        <div className="wrap">
          <span className="eyebrow reveal">How it works</span>
          <h2 className="h2 reveal">
            From first call to working system
            <br />
            in <em>days</em>.
          </h2>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step reveal" key={s.n}>
                <div className="step-n">{s.n}</div>
                <h3>{s.t}</h3>
                <div className="step-d">{s.d}</div>
                <p>{s.p}</p>
              </div>
            ))}
          </div>

          <p className="eyebrow reveal" style={{ marginTop: "3.5rem" }}>
            Who this is for
          </p>
          <div className="chips reveal">
            {AUDIENCE.map((a) => (
              <span className="chip" key={a}>
                {a}
              </span>
            ))}
            <span className="chip chip-accent">
              Anywhere in the world · English & Spanish
            </span>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <div className="manifesto">
        <div className="wrap">
          <blockquote className="reveal">
            "I'm not a freelancer guessing what might work, and this isn't a
            template shop. I'm an AI engineer running a systems firm: we find
            the leak costing you customers, plug it with a system that runs
            24/7, and report exactly what it produced. You run your business.
            The systems run the rest."
          </blockquote>
          <cite>Miguel Esteves · Founder, Excelsus Agency</cite>
        </div>
      </div>

      {/* PROOF */}
      <section className="sec" id="proof">
        <div className="wrap">
          <span className="eyebrow reveal">Proof of work</span>
          <h2 className="h2 reveal">
            Built by an engineer.
            <br />
            Not a <em>template</em>.
          </h2>
          <p className="lede reveal">
            I don't resell page builders. I build and run real platforms, and
            every system we run for you gets the same engineering, the same
            standards, and the same accountability.
          </p>
          <div className="proof">
            {PROOF.map((p) => (
              <div className="pcard reveal" key={p.name}>
                <span className="ptag">{p.tag}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="pstack">
                  {p.stack.map((s) => (
                    <span className="pill-s" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" id="faq" style={{ background: "var(--alt)" }}>
        <div className="wrap">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow reveal">Questions</span>
            <h2 className="h2 reveal">
              Straight <em>answers</em>.
            </h2>
          </div>
          <div className="faq reveal">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK A CALL */}
      <section className="sec contact" id="book-call">
        <div className="wrap">
          <span className="eyebrow reveal">Book a call · 15 minutes</span>
          <h2 className="h2 reveal">
            Let's find your
            <br />
            biggest <em>leak</em>.
          </h2>
          <p className="lede reveal">
            15 minutes. We look at where customers are slipping away (the
            ringing phone, the slow follow-up, the sleeping list) and which
            system plugs it first. Every price is already on this page.
          </p>
          <div className="hero-cta reveal" style={{ justifyContent: "center" }}>
            <a
              href="mailto:alejandriosity@gmail.com?subject=Call — Excelsus Agency&body=Hi Miguel,%0A%0AI run a business and I'd like to book a 15-minute call.%0A%0A[Business name / what you sell / where you lose customers]"
              className="btn btn-primary"
            >
              Email to book
            </a>
            <a href="#systems" className="btn btn-ghost">
              Back to systems
            </a>
          </div>

          <div className="cal reveal">
            <p className="cal-label">Or pick a time below</p>
            <div
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              id="my-cal-inline-15min"
            ></div>
          </div>
          <Script
            id="cal-embed"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "15min", {origin:"https://app.cal.com"});
          Cal.config = Cal.config || {};
          Cal.config.forwardQueryParams = true;
          Cal.ns["15min"]("inline", {
            elementOrSelector:"#my-cal-inline-15min",
            config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
            calLink: "miguelesteves/15min",
          });
          Cal.ns["15min"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#0A7F57"},"dark":{"cal-brand":"#0A7F57"}},"hideEventTypeDetails":false,"layout":"month_view"});
        `,
            }}
          />

          <div className="contact-row">
            <div className="contact-col">
              <p className="lbl">Email</p>
              <a href="mailto:alejandriosity@gmail.com">
                alejandriosity@gmail.com
              </a>
            </div>
            <div className="contact-col">
              <p className="lbl">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/miguel-esteves-129879314/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Miguel Esteves
              </a>
            </div>
            <div className="contact-col">
              <p className="lbl">Service area</p>
              <span className="v">Worldwide · English & Spanish</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-in">
            <div>
              <a className="brand" href="#top">
                <span className="brand-mark">E</span>
                EXCELSUS AGENCY
              </a>
              <p className="foot-tag">
                Growth systems for businesses that live on leads
              </p>
            </div>
            <div className="foot-links">
              <a href="#systems">Systems</a>
              <a href="#proof">Proof</a>
              <a
                href="https://excelsus.live"
                target="_blank"
                rel="noopener noreferrer"
              >
                Excelsus Platform
              </a>
              <a href="mailto:alejandriosity@gmail.com">
                alejandriosity@gmail.com
              </a>
            </div>
          </div>
          <div className="foot-bot">
            <span>© 2026 Excelsus Agency · Miguel Esteves</span>
            <span style={{ fontStyle: "italic" }}>Excelsus — semper supra</span>
          </div>
        </div>
      </footer>

      {/* CHAT */}
      <div className="chat" id="chatWidget">
        <div className={`chat-box${chatOpen ? " open" : ""}`} id="chatBubble">
          <div className="chat-top">
            <div className="ava">✦</div>
            <div>
              <strong>Excelsus AI Assistant</strong>
              <span>Systems · Pricing · What's included</span>
            </div>
          </div>
          <div className="chat-msgs" id="chatMessages" ref={chatMessagesRef}>
            {chatMessages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.text}
              </div>
            ))}
            {chatLoading && (
              <div className="typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
          {chatMessages.length === 1 && !chatLoading && (
            <div className="quick">
              {QUICK_PROMPTS.map((q) => (
                <button key={q} onClick={() => sendChat(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
          <div className="chat-in">
            <input
              type="text"
              id="chatInput"
              placeholder="Ask about pricing, timeline..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendChat();
              }}
              disabled={chatLoading}
            />
            <button onClick={() => sendChat()} disabled={chatLoading}>
              {chatLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
        <button
          className="chat-fab"
          onClick={() => setChatOpen((v) => !v)}
          title="Chat with the Excelsus AI assistant"
          aria-label="Open chat"
        >
          {chatOpen ? "✕" : "💬"}
        </button>
      </div>
    </div>
  );
}
