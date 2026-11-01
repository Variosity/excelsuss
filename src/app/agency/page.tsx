"use client";

import { useState, useRef, useEffect } from "react";
import Script from "next/script";

type ChatMsg = { role: "user" | "bot"; text: string };

export default function AgencyPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    {
      role: "bot",
      text: "Hey — I'm the Excelsus AI assistant. Ask me about the voice receptionist, ads, the booking system, reactivation, or prices. What does your business do?",
    },
  ]);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages, chatLoading]);

  async function sendChat() {
    const msg = chatInput.trim();
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
    <div>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
:root{
  --accent:#0B7A55;--accent-strong:#095C43;--accent-light:#0E9F6E;--accent-soft:#E9F7F1;
  --ink:#0B1220;--body:#3D4756;--muted:#68707E;--faint:#98A0AD;
  --bg:#FFFFFF;--alt:#F6F7F8;--card:#FFFFFF;
  --line:#E5E8EC;--line-strong:#D4D9DF;
  --gold:#0B7A55;--gold-light:#0E9F6E;--gold-dim:#095C43;
  --stone:#FFFFFF;--stone2:#F6F7F8;--stone3:#FFFFFF;
  --iron:#68707E;--parchment:#3D4756;--parchment-dim:#3D4756;
  --white:#0B1220;
  --shadow-sm:0 1px 2px rgba(16,24,40,0.05);
  --shadow-md:0 8px 24px -8px rgba(16,24,40,0.12);
  --shadow-lg:0 24px 48px -16px rgba(16,24,40,0.18);
  --radius:14px;
}
html{scroll-behavior:smooth;overflow-x:hidden}
body{background:var(--bg);color:var(--body);font-family:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden}
::selection{background:var(--accent);color:#fff}
::-webkit-scrollbar{width:8px}
::-webkit-scrollbar-track{background:var(--alt)}
::-webkit-scrollbar-thumb{background:#CBD2DA;border-radius:8px}

/* NAV */
nav.topnav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,0.88);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--line);padding:0 clamp(1rem,4vw,3rem)}
.nav-inner{max-width:1120px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px}
.nav-logo{font-weight:800;font-size:0.95rem;letter-spacing:0.14em;color:var(--ink);text-decoration:none}
.nav-links{display:flex;gap:2.25rem;align-items:center}
.nav-links a{font-size:0.82rem;font-weight:500;letter-spacing:0.01em;color:var(--muted);text-decoration:none;transition:color 0.2s}
.nav-links a:hover{color:var(--ink)}
.nav-cta{font-size:0.82rem!important;font-weight:600!important;letter-spacing:0.01em!important;background:var(--accent);color:#fff!important;padding:0.55rem 1.2rem;border-radius:9px;text-decoration:none;transition:background 0.2s,transform 0.2s}
.nav-cta:hover{background:var(--accent-strong)!important}

/* HERO */
.hero{min-height:92vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:7rem 1.5rem 5rem;position:relative;overflow:hidden;background:radial-gradient(1100px 520px at 50% -8%,var(--accent-soft) 0%,rgba(233,247,241,0) 62%),var(--bg)}
.hero-bg{position:absolute;inset:0;pointer-events:none}
.hero-glow{display:none}
.hero-line{display:none}
.hero-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:var(--accent);margin-bottom:1.4rem}
.hero-divider{width:3.5rem;height:3px;border-radius:3px;margin:0 auto 1.75rem;background:var(--accent)}
.hero h1{font-weight:800;line-height:1.04;letter-spacing:-0.03em;color:var(--ink);margin-bottom:1.4rem;font-size:clamp(2.6rem,6.5vw,4.6rem);max-width:900px}
.hero-sub{font-size:clamp(1.05rem,2.2vw,1.28rem);font-weight:400;color:var(--body);max-width:640px;line-height:1.65;margin-bottom:1rem}
.hero-tagline{font-size:0.78rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--faint);margin-bottom:2.75rem}
.hero-btns{display:flex;gap:0.85rem;flex-wrap:wrap;justify-content:center}
.btn-primary{font-size:0.92rem;font-weight:600;letter-spacing:0.01em;background:var(--accent);color:#fff;padding:0.95rem 2.1rem;border-radius:11px;text-decoration:none;transition:background 0.2s,box-shadow 0.2s,transform 0.2s;white-space:nowrap;border:none;cursor:pointer;display:inline-block;box-shadow:0 10px 24px -10px rgba(11,122,85,0.55)}
.btn-primary:hover{background:var(--accent-strong);transform:translateY(-1px)}
.btn-ghost{font-size:0.92rem;font-weight:600;letter-spacing:0.01em;border:1px solid var(--line-strong);color:var(--ink);padding:0.95rem 2.1rem;border-radius:11px;text-decoration:none;transition:all 0.2s;white-space:nowrap;background:#fff;display:inline-block}
.btn-ghost:hover{border-color:var(--ink);background:var(--alt)}
@keyframes riseUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.gold-shimmer{background:linear-gradient(92deg,#0B7A55 10%,#12B981 50%,#0B7A55 90%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 5s linear infinite}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
.animate-rise{animation:riseUp 0.7s cubic-bezier(0.22,0.61,0.36,1) forwards}

/* PROOF / STATS STRIP */
.proof-strip{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:#fff;padding:2rem clamp(1rem,4vw,3rem)}
.proof-grid{max-width:1120px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;text-align:center}
.proof-stat{font-size:2rem;font-weight:800;letter-spacing:-0.02em;color:var(--ink);line-height:1}
.proof-label{font-size:0.7rem;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted);margin-top:0.5rem}

/* SECTION COMMON */
section{padding:clamp(3.5rem,8vw,6.5rem) clamp(1rem,4vw,3rem)}
.section-inner{max-width:1120px;margin:0 auto}
.section-head{text-align:center;margin-bottom:3rem}
.section-eyebrow{font-size:0.7rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:var(--accent);display:block;margin-bottom:0.9rem}
.section-title{font-size:clamp(1.7rem,3.6vw,2.6rem);font-weight:800;letter-spacing:-0.025em;color:var(--ink);line-height:1.12}
.section-sub{font-size:1.02rem;font-weight:400;color:var(--body);max-width:620px;line-height:1.7;margin:0.9rem auto 0}

.service-copy{font-size:1rem;color:var(--body);line-height:1.75;margin-bottom:1rem;max-width:660px}

/* Advantage callout */
.advantage{margin-top:1.75rem;border-left:3px solid var(--accent);background:var(--accent-soft);border-radius:0 12px 12px 0;padding:1.1rem 1.35rem;max-width:720px}
.advantage p:first-child{font-size:0.68rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent-strong);margin-bottom:0.5rem}
.advantage p:last-child{font-size:0.92rem;color:var(--body);line-height:1.7}

/* TIER / PRICING CARDS */
.tier-grid{display:grid;grid-template-columns:minmax(min(100%,560px),560px);justify-content:center;gap:1rem;margin:2.25rem 0}
.tier-card{border:1px solid var(--line);background:var(--card);border-radius:18px;padding:2.1rem;position:relative;display:flex;flex-direction:column;box-shadow:var(--shadow-sm);transition:box-shadow 0.25s,border-color 0.25s}
.tier-card:hover{box-shadow:var(--shadow-md)}
.tier-card.featured{border-color:rgba(11,122,85,0.45);box-shadow:var(--shadow-md)}
.tier-card.featured::before{content:'';position:absolute;top:0;left:24px;right:24px;height:3px;border-radius:0 0 4px 4px;background:var(--accent)}
.tier-badge{display:inline-block;align-self:flex-start;font-size:0.64rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;background:var(--accent);color:#fff;padding:0.32rem 0.7rem;border-radius:999px;margin-bottom:1rem}
.tier-name{font-size:0.78rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--accent-strong);margin-bottom:0.2rem}
.tier-sub{font-size:0.92rem;color:var(--muted);margin-bottom:1.1rem}
.tier-price-row{display:flex;align-items:flex-start;gap:0.15rem;margin-bottom:0.15rem}
.tier-dollar{font-size:1.15rem;font-weight:700;color:var(--accent);margin-top:0.55rem}
.tier-price{font-size:3rem;font-weight:800;letter-spacing:-0.03em;color:var(--ink);line-height:1}
.tier-period{font-size:0.9rem;font-weight:500;color:var(--muted);align-self:flex-end;margin-bottom:0.35rem}
.tier-note{font-size:0.86rem;color:var(--muted);line-height:1.55;margin-bottom:1.4rem}
.tier-items{list-style:none;flex:1;margin-bottom:1.6rem;display:flex;flex-direction:column;gap:0.6rem}
.tier-items li{display:flex;gap:0.6rem;font-size:0.94rem;color:var(--body);align-items:flex-start;line-height:1.55}
.tier-items li span{font-size:0.6rem;margin-top:0.42rem;flex-shrink:0;color:var(--accent)}
.tier-action a{display:block;text-align:center;font-size:0.92rem;font-weight:600;letter-spacing:0.01em;padding:0.95rem;border-radius:11px;border:1px solid var(--line-strong);color:var(--ink);text-decoration:none;background:#fff;transition:all 0.2s;margin-top:auto}
.tier-action a:hover{border-color:var(--ink)}
.tier-card.featured .tier-action a{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 10px 24px -10px rgba(11,122,85,0.55)}
.tier-card.featured .tier-action a:hover{background:var(--accent-strong)}

/* Guarantee box */
.guarantee-box{border:1px solid rgba(11,122,85,0.35);background:var(--accent-soft);border-radius:var(--radius);padding:1.3rem 1.6rem;margin:1.5rem auto;max-width:860px;display:flex;align-items:center;gap:1.1rem}
.guarantee-icon{font-size:1.25rem;flex-shrink:0;color:var(--accent)}
.guarantee-label{font-size:0.68rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--accent-strong);margin-bottom:0.25rem}
.guarantee-text{font-size:0.95rem;color:var(--body);line-height:1.6}

/* Retainers */
.retainer-label{font-size:0.72rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--ink);margin-bottom:0.8rem}
.retainer-intro{font-size:0.98rem;color:var(--body);line-height:1.75;max-width:660px;margin-bottom:1.6rem}
.retainer-grid{display:grid;grid-template-columns:minmax(min(100%,520px),520px);gap:1rem;margin-bottom:2rem}
.retainer-card{border:1px solid var(--line);background:var(--card);border-radius:16px;padding:1.7rem;position:relative;box-shadow:var(--shadow-sm)}
.retainer-card.featured{border-color:rgba(11,122,85,0.4)}
.retainer-price{font-size:1.9rem;font-weight:800;letter-spacing:-0.02em;color:var(--ink);margin-bottom:0.2rem}
.retainer-name{font-size:0.7rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--accent-strong);margin-bottom:1rem}
.retainer-items{list-style:none;display:flex;flex-direction:column;gap:0.5rem}
.retainer-items li{display:flex;gap:0.55rem;font-size:0.9rem;color:var(--body);align-items:flex-start;line-height:1.55}
.retainer-items li span{color:var(--accent);font-size:0.55rem;margin-top:0.4rem;flex-shrink:0}

/* Comparison table */
.compare-wrap{overflow-x:auto;margin-top:1rem;border:1px solid var(--line);border-radius:16px;background:#fff;box-shadow:var(--shadow-sm)}
.compare-title{font-size:1.05rem;font-weight:700;letter-spacing:-0.01em;color:var(--ink);margin:2.75rem 0 1.1rem}
.compare-table{width:100%;border-collapse:collapse;min-width:540px}
.compare-table th{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);padding:1rem 1.25rem;text-align:left;border-bottom:1px solid var(--line);background:var(--alt)}
.compare-table th:last-child{color:var(--accent-strong)}
.compare-table td{padding:1rem 1.25rem;border-bottom:1px solid var(--line);vertical-align:top;line-height:1.55;font-size:0.92rem;color:var(--muted)}
.compare-table tr:last-child td{border-bottom:none}
.compare-table td:first-child{color:var(--ink);font-size:0.9rem;font-weight:600;letter-spacing:0}
.compare-table td.new-way{color:var(--body);font-weight:500}
.compare-table tr:nth-child(even){background:#FBFCFC}

/* Stack pills */
.stack-label{font-size:0.68rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);margin-bottom:0.7rem}
.stack-pills{display:flex;gap:0.5rem;flex-wrap:wrap}
.stack-pill{font-size:0.72rem;font-weight:600;letter-spacing:0.04em;border:1px solid var(--line);background:#fff;color:var(--muted);padding:0.32rem 0.75rem;border-radius:999px}

/* Process steps */
.process-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,196px),1fr));gap:1rem;margin-top:2.25rem}
.process-step{border:1px solid var(--line);background:#fff;border-radius:16px;padding:1.6rem;position:relative;box-shadow:var(--shadow-sm)}
.step-num{font-size:1.7rem;font-weight:800;letter-spacing:-0.02em;color:rgba(11,122,85,0.22);line-height:1;margin-bottom:0.85rem}
.step-label{font-size:0.86rem;font-weight:700;letter-spacing:0.01em;color:var(--ink);margin-bottom:0.3rem}
.step-time{font-size:0.76rem;font-weight:600;color:var(--accent-strong);margin-bottom:0.55rem}
.step-desc{font-size:0.88rem;color:var(--muted);line-height:1.65}

/* Who this is for */
.audience-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr));gap:0.85rem;margin-top:1.1rem}
.audience-card{border:1px solid var(--line);border-radius:14px;padding:1.25rem;background:#fff;box-shadow:var(--shadow-sm)}
.audience-card p:first-child{font-size:0.95rem;font-weight:700;color:var(--ink);margin-bottom:0.3rem}
.audience-card p:last-child{font-size:0.88rem;color:var(--muted);line-height:1.55}

/* MANIFESTO BANNER */
.manifesto-banner{padding:clamp(3rem,6vw,4.5rem) clamp(1rem,4vw,3rem);text-align:center;background:#0B1220;border-top:1px solid #0B1220;border-bottom:1px solid #0B1220}
.manifesto-banner blockquote{font-size:clamp(1.15rem,2.4vw,1.5rem);font-weight:600;color:#FFFFFF;max-width:780px;margin:0 auto;line-height:1.55;letter-spacing:-0.01em}
.manifesto-banner cite{display:block;margin-top:1.4rem;font-size:0.68rem;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:var(--accent-light);font-style:normal}

/* PORTFOLIO */
.portfolio-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:1rem;margin-top:2.25rem}
.portfolio-card{border:1px solid var(--line);background:#fff;border-radius:16px;padding:1.5rem;display:flex;gap:1rem;align-items:flex-start;box-shadow:var(--shadow-sm);transition:box-shadow 0.25s}
.portfolio-card:hover{box-shadow:var(--shadow-md)}
.portfolio-bar{width:3px;background:var(--accent);flex-shrink:0;border-radius:2px;align-self:stretch}
.portfolio-tag{font-size:0.66rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent-strong);margin-bottom:0.4rem}
.portfolio-card h3{font-size:1.02rem;font-weight:700;letter-spacing:-0.01em;color:var(--ink);margin-bottom:0.45rem}
.portfolio-card p.desc{font-size:0.9rem;color:var(--muted);line-height:1.65}
.portfolio-stack{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.85rem}

/* BOOK-A-CALL / CONTACT */
.contact-section{background:var(--alt);border-top:1px solid var(--line);text-align:center}
.contact-inner{max-width:720px;margin:0 auto}
.contact-title span{color:var(--accent)}
.contact-copy{font-size:1.05rem;color:var(--body);line-height:1.75;margin:1.4rem auto 2.5rem}
.contact-btn-row{display:flex;gap:0.85rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.25rem}
.contact-info-row{display:flex;gap:2.5rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.5rem}
.contact-info-row:last-of-type{margin-bottom:0}
.contact-info-col{text-align:center}
.contact-info-col .lbl{font-size:0.66rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted);margin-bottom:0.3rem}
.contact-info-col .val{font-size:0.92rem;font-weight:500;color:var(--accent-strong);text-decoration:none}
.contact-info-col .val:hover{color:var(--accent)}

/* Cal.com inline embed */
.cal-embed-wrap{max-width:720px;margin:0 auto 2.5rem;border:1px solid var(--line);border-radius:16px;background:#fff;box-shadow:var(--shadow-md);padding:1.4rem;position:relative;overflow:hidden;text-align:left}
.cal-embed-wrap::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--accent)}
.cal-embed-label{font-size:0.7rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent-strong);margin-bottom:1rem;text-align:center}
#my-cal-inline-15min{min-height:600px}

/* CHATBOT WIDGET */
.chatbot-widget{position:fixed;bottom:1.5rem;right:1.5rem;z-index:100;display:flex;flex-direction:column;align-items:flex-end;gap:0.75rem}
.chatbot-bubble{background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow-lg);width:min(340px,calc(100vw - 2rem));display:none;flex-direction:column;overflow:hidden}
.chatbot-bubble.open{display:flex}
.chat-header{padding:1rem 1.15rem;border-bottom:1px solid var(--line);background:var(--accent-soft)}
.chat-header strong{color:var(--accent-strong);font-size:0.78rem;font-weight:700;letter-spacing:0.04em;display:block}
.chat-header span{font-size:0.76rem;color:var(--muted)}
.chatbot-btn{width:58px;height:58px;border-radius:50%;background:var(--accent);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.35rem;color:#fff;box-shadow:0 14px 30px -8px rgba(11,122,85,0.55);transition:transform 0.2s,background 0.2s}
.chatbot-btn:hover{transform:scale(1.06);background:var(--accent-strong)}
.chat-input-row{display:flex;border-top:1px solid var(--line);background:#fff}
.chat-input-row input{flex:1;background:#fff;border:none;padding:0.8rem 1rem;color:var(--ink);font-size:0.92rem;font-family:'Inter',sans-serif;outline:none}
.chat-input-row input::placeholder{color:var(--faint)}
.chat-input-row button{background:var(--accent);color:#fff;border:none;padding:0.8rem 1.05rem;cursor:pointer;font-family:'Inter',sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.02em;flex-shrink:0;transition:background 0.2s}
.chat-input-row button:hover{background:var(--accent-strong)}
.chat-input-row button:disabled{opacity:0.5;cursor:not-allowed}
.chat-messages{max-height:280px;min-height:130px;overflow-y:auto;display:flex;flex-direction:column;gap:0.55rem;padding:0.9rem}
.chat-msg{font-size:0.9rem;line-height:1.55;padding:0.55rem 0.75rem;max-width:88%;border-radius:12px}
.chat-msg.user{background:var(--accent);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.chat-msg.bot{background:var(--alt);color:var(--body);align-self:flex-start;border-bottom-left-radius:4px}
.chat-typing{display:flex;gap:0.32rem;align-items:center;padding:0.55rem 0.75rem}
@keyframes blink{0%,80%,100%{opacity:0.25}40%{opacity:1}}
.chat-typing span{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:blink 1.2s infinite}
.chat-typing span:nth-child(2){animation-delay:0.2s}
.chat-typing span:nth-child(3){animation-delay:0.4s}

/* FOOTER */
footer{border-top:1px solid var(--line);background:#fff;padding:2rem clamp(1rem,4vw,3rem)}
.footer-inner{max-width:1120px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}
.footer-brand{font-weight:800;font-size:0.92rem;letter-spacing:0.16em;color:var(--ink)}
.footer-tag{font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-top:0.3rem}
.footer-links{display:flex;gap:1.4rem;flex-wrap:wrap}
.footer-links a{font-size:0.8rem;font-weight:500;color:var(--muted);text-decoration:none;transition:color 0.2s}
.footer-links a:hover{color:var(--ink)}
.footer-copy{font-size:0.8rem;color:var(--muted)}

@media(max-width:767px){
  .nav-links{display:none}
  .compare-table{min-width:520px}
  .tier-card{padding:1.6rem}
  .guarantee-box{flex-direction:column;align-items:flex-start}
  .hero{padding-top:5.5rem}
}
`}</style>

      {/* NAV */}
      <nav className="topnav">
        <div className="nav-inner">
          <a className="nav-logo" href="#">
            EXCELSUS AGENCY
          </a>
          <div className="nav-links">
            <a href="#pricing">Services</a>
            <a href="#portfolio">Proof</a>
            <a href="#process">Process</a>
            <a href="#book-call" className="nav-cta">
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-glow"></div>
          <div className="hero-line"></div>
        </div>
        <p className="hero-eyebrow animate-rise">Growth Systems for Businesses · Anywhere in the World</p>
        <div className="hero-divider"></div>
        <h1
          className="animate-rise"
          style={{ animationDelay: "0.15s", opacity: "0" }}
        >
          Your Business Should
          <br />
          <span className="gold-shimmer">Never Miss a Customer.</span>
        </h1>
        <p
          className="hero-sub animate-rise"
          style={{ animationDelay: "0.3s", opacity: "0" }}
        >
          An AI receptionist that answers every call. Ads that bring buyers
          to your door. A website that books jobs on its own. Campaigns that
          wake up the customers you already earned. Pick your leak — we build
          the system, run it, and report what it made you.
        </p>
        <p
          className="hero-tagline animate-rise"
          style={{ animationDelay: "0.4s", opacity: "0" }}
        >
          AI Voice Receptionist · Ads · Booking Systems · Reactivation
        </p>
        <div
          className="hero-btns animate-rise"
          style={{ animationDelay: "0.5s", opacity: "0" }}
        >
          <a href="#book-call" className="btn-primary">
            Book a 15-Minute Call
          </a>
          <a href="#pricing" className="btn-ghost">
            See What You Get
          </a>
        </div>
      </section>

      {/* PROOF / STATS STRIP */}
      <div className="proof-strip">
        <div className="proof-grid">
          <div>
            <div className="proof-stat">7</div>
            <div className="proof-label">Days to Launch</div>
          </div>
          <div>
            <div className="proof-stat">24/7</div>
            <div className="proof-label">Always Answering</div>
          </div>
          <div>
            <div className="proof-stat">4</div>
            <div className="proof-label">Growth Systems</div>
          </div>
          <div>
            <div className="proof-stat">100%</div>
            <div className="proof-label">Done For You</div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <section id="pricing">
        <div className="section-inner">
          <div className="section-head" style={{ textAlign: "left" }}>
            <span className="section-eyebrow">What We Do</span>
            <h2 className="section-title">
              Pick the Leak.
              <br />
              We Plug It.
            </h2>
            <p className="section-sub" style={{ marginLeft: "0" }}>
              Every business loses money in a different place — a phone that
              rings out, leads that never get followed up, ads nobody manages,
              a customer list asleep in a drawer. Four systems, each built to
              plug one leak. Fixed prices, everything run for you, no
              surprises on the call.
            </p>
          </div>

          <p className="service-copy">
            Most businesses don't have a product problem. They have a
            response problem. A customer calls at 8pm and gets voicemail. A
            lead fills out a form and hears back tomorrow — or never. An old
            customer is ready to buy again and nobody asks. Whoever answers
            first wins the job — and most of the time, nobody answers.
          </p>
          <p className="service-copy">
            Each system below fixes one of those leaks completely — set up
            for you, run for you, and reported to you every month in plain
            numbers. Most are live within 7 days of your intake.
          </p>
          <div className="advantage">
            <p>Why It's Different</p>
            <p>
              You get an operator, not freelancer roulette. I'm an AI
              engineer — I designed these systems, I built and run my own
              platforms (Excelsus, HackLingo), and my delivery team builds
              under my direction on every single job. One firm, one point of
              contact, one report.
            </p>
          </div>

          <div className="tier-grid" style={{ gridTemplateColumns: "minmax(min(100%, 680px), 680px)" }}>
            <div className="tier-card featured">
              <span className="tier-badge">Start Here — Most Popular</span>
              <p className="tier-name">AI Voice Receptionist</p>
              <p className="tier-sub">Every call answered. Every caller captured or booked.</p>
              <div className="tier-price-row">
                <span className="tier-dollar">$</span>
                <span className="tier-price">497</span>
                <span className="tier-period">setup</span>
              </div>
              <p className="tier-note">
                One-time setup · then $397/month · cancel with 30 days' notice
              </p>
              <ul className="tier-items">
                <li><span>✦</span> A natural-voice AI answers your phone 24/7 — nights, weekends, holidays</li>
                <li><span>✦</span> Books appointments straight into your calendar</li>
                <li><span>✦</span> Captures name, number, and need on every single call</li>
                <li><span>✦</span> Answers questions from facts you approve — services, prices, hours</li>
                <li><span>✦</span> Instant summary to you after every call</li>
                <li><span>✦</span> Covers after-hours, overflow, or every call you get</li>
                <li><span>✦</span> Never sick, never late, never quits — compare a $3,000+/month receptionist</li>
              </ul>
              <div className="tier-action">
                <a href="#book-call">Book a 15-Minute Call</a>
              </div>
            </div>
            <div className="tier-card">
              <p className="tier-name">Ads Management</p>
              <p className="tier-sub">Google + Meta campaigns, built and managed for you.</p>
              <div className="tier-price-row">
                <span className="tier-dollar">$</span>
                <span className="tier-price">500</span>
                <span className="tier-period">setup</span>
              </div>
              <p className="tier-note">
                One-time setup · then $1,250/month management · ad spend stays
                on your card (we recommend $1,500+/month) · 90-day minimum
              </p>
              <ul className="tier-items">
                <li><span>✦</span> Campaign strategy, build, and launch on Google + Meta</li>
                <li><span>✦</span> Ad copy and audience targeting done for you</li>
                <li><span>✦</span> Weekly optimization — budget follows what works</li>
                <li><span>✦</span> Monthly report: spend, leads, cost per lead — plain numbers</li>
                <li><span>✦</span> Your ad accounts stay 100% yours, always</li>
                <li><span>✦</span> Straight talk: ads bring traffic and inquiries — results vary, and no honest agency guarantees sales</li>
              </ul>
              <div className="tier-action">
                <a href="#book-call">Book a 15-Minute Call</a>
              </div>
            </div>
            <div className="tier-card">
              <p className="tier-name">Website + AI Booking System</p>
              <p className="tier-sub">A website that books jobs while you sleep.</p>
              <div className="tier-price-row">
                <span className="tier-dollar">$</span>
                <span className="tier-price">997</span>
                <span className="tier-period">setup</span>
              </div>
              <p className="tier-note">
                One-time setup · then $497/month · 6-month minimum, then
                month-to-month
              </p>
              <ul className="tier-items">
                <li><span>✦</span> A fast new website, built for your business</li>
                <li><span>✦</span> AI chat on every page, 24/7 — captures name, phone, and problem</li>
                <li><span>✦</span> Instant lead alert to you + instant reply to the customer</li>
                <li><span>✦</span> Follow-up emails to leads who didn't book — 4 emails over 7 days</li>
                <li><span>✦</span> Online booking on every page</li>
                <li><span>✦</span> Automatic review request after each job</li>
                <li><span>✦</span> A 1-page monthly report: chats, leads, bookings</li>
              </ul>
              <div className="tier-action">
                <a href="#book-call">Book a 15-Minute Call</a>
              </div>
            </div>
            <div className="tier-card">
              <p className="tier-name">Reactivation Campaign</p>
              <p className="tier-sub">Wake up the customers you already earned.</p>
              <div className="tier-price-row">
                <span className="tier-dollar">$</span>
                <span className="tier-price">750</span>
                <span className="tier-period">one-off, from</span>
              </div>
              <p className="tier-note">
                One-time · final price depends on list size, quoted on the call
              </p>
              <ul className="tier-items">
                <li><span>✦</span> 2–3 emails written for your business, sent to your past customers</li>
                <li><span>✦</span> You approve every word before anything sends</li>
                <li><span>✦</span> Your list stays 100% yours — never shared, never reused</li>
                <li><span>✦</span> Replies and bookings tracked for you</li>
                <li><span>✦</span> A results report when the campaign ends</li>
              </ul>
              <div className="tier-action">
                <a href="#book-call">Book a 15-Minute Call</a>
              </div>
            </div>
          </div>

          <div className="guarantee-box">
            <span className="guarantee-icon">✓</span>
            <div>
              <p className="guarantee-label">Our Promise</p>
              <p className="guarantee-text">
                Most systems live within 7 days of your completed intake
                (ad campaigns within 14 days), and your first monthly report
                lands within 30 days of launch. If we're late because of us,
                we keep working free until it's live.
              </p>
            </div>
          </div>

          <p className="retainer-label" style={{ marginTop: "2.5rem" }}>
            One Partner — Everything Run For You
          </p>
          <p className="retainer-intro">
            You don't get logins, homework, or freelancers to babysit. Every
            system is monitored, updated, and reported on by Excelsus — you
            get one point of contact and one plain monthly report.
          </p>
          <div className="retainer-grid">
            <div className="retainer-card featured">
              <p className="retainer-name">Every Month, For Every System</p>
              <ul className="retainer-items">
                <li><span>✦</span> One point of contact — Miguel, not a ticket queue</li>
                <li><span>✦</span> One monthly report: calls, chats, leads, bookings, cost per lead</li>
                <li><span>✦</span> Systems monitored and kept live 24/7</li>
                <li><span>✦</span> Small updates included — prices, hours, services</li>
                <li><span>✦</span> Add a second system any time — most clients do once the first one pays</li>
              </ul>
            </div>
          </div>
          <p className="retainer-intro">
            Not sold here: hourly work, logos and branding, standalone social
            posting, SEO packages. If it's not one of the four systems above,
            ask on the call — we'd rather tell you straight than sell you
            wrong.
          </p>

          <p className="compare-title">Why Not the Usual Way?</p>

          <div className="compare-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>What Matters</th>
                  <th>Typical Website</th>
                  <th>Excelsus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Missed calls</td>
                  <td>A receptionist: $3,000+/month, 9-to-5, sick days and turnover</td>
                  <td className="new-way">AI receptionist answers 24/7 for $397/month</td>
                </tr>
                <tr>
                  <td>Lead follow-up</td>
                  <td>Whoever notices first — hours or days later</td>
                  <td className="new-way">Instant alert to you, instant reply to the customer</td>
                </tr>
                <tr>
                  <td>New customers</td>
                  <td>Hope, referrals, and word of mouth</td>
                  <td className="new-way">Managed Google + Meta ads with cost-per-lead reporting</td>
                </tr>
                <tr>
                  <td>Past customers</td>
                  <td>A list sitting in a drawer, going cold</td>
                  <td className="new-way">A campaign that wakes them up and books them again</td>
                </tr>
                <tr>
                  <td>Proof it works</td>
                  <td>Gut feeling</td>
                  <td className="new-way">One monthly report — plain numbers</td>
                </tr>
                <tr>
                  <td>Who runs it</td>
                  <td>You, on top of everything else</td>
                  <td className="new-way">Excelsus — built, managed, reported</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="stack-label" style={{ marginTop: "2.5rem" }}>
            Built On
          </p>
          <div className="stack-pills">
            <span className="stack-pill">Next.js</span>
            <span className="stack-pill">Supabase</span>
            <span className="stack-pill">Stripe</span>
            <span className="stack-pill">Vercel</span>
            <span className="stack-pill">Resend</span>
            <span className="stack-pill">Cal.com</span>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="process"
        style={{
          background: "var(--stone2)",
          borderTop: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div className="section-inner">
          <div className="section-head" style={{ textAlign: "left" }}>
            <span className="section-eyebrow">How It Works</span>
            <h2 className="section-title">
              From First Call to Working System in Days.
            </h2>
          </div>
          <div className="process-steps">
            {[
              {
                num: "01",
                label: "Demo Call",
                time: "Day 0",
                desc: "15 minutes. We find the leak that's costing you the most customers. If we can't fix it, I'll tell you straight.",
              },
              {
                num: "02",
                label: "Say Yes",
                time: "Day 0",
                desc: "The setup fee for your system, paid online. No payment, no start — that keeps both of us serious.",
              },
              {
                num: "03",
                label: "Intake",
                time: "Day 1",
                desc: "A 15-minute form: services, prices, hours. You approve one page of facts — that's all your AI is ever allowed to say.",
              },
              {
                num: "04",
                label: "Build & Launch",
                time: "Days 2–6",
                desc: "Our team builds it, then we test it live with you watching — a real call, a real lead, end to end. Ad campaigns launch within 14 days.",
              },
              {
                num: "05",
                label: "Report & Grow",
                time: "Day 30",
                desc: "Your first monthly report lands: exactly what your systems produced, in plain numbers. Most clients add a second system here.",
              },
            ].map((step) => (
              <div className="process-step" key={step.num}>
                <div className="step-num">{step.num}</div>
                <div className="step-label">{step.label}</div>
                <div className="step-time">{step.time}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>

          <p className="compare-title">Who This Is For</p>
          <div className="audience-grid">
            <div className="audience-card">
              <p>Home Services</p>
              <p>Pest, HVAC, plumbing, roofing — your phone is your storefront</p>
            </div>
            <div className="audience-card">
              <p>Medical & Dental</p>
              <p>A drowning front desk, and after-hours calls going nowhere</p>
            </div>
            <div className="audience-card">
              <p>Legal & Professional</p>
              <p>Every unanswered call is a client who signed with someone else</p>
            </div>
            <div className="audience-card">
              <p>Any Lead-Driven Business</p>
              <p>Realtors, auto, salons, fitness — if a missed call costs you money, we fix it</p>
            </div>
            <div className="audience-card">
              <p>Anywhere in the World</p>
              <p>Remote-first, in English & Spanish — your customers never know or care where we sit</p>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO BANNER */}
      <div className="manifesto-banner">
        <blockquote>
          "I'm not a freelancer guessing what might work, and this isn't a
          template shop. I'm an AI engineer running a systems firm: we find
          the leak that's costing you customers, plug it with a system that
          runs 24/7, and report exactly what it produced. You run your
          business. The systems run the rest."
        </blockquote>
        <cite>— Miguel Esteves, Founder, Excelsus Agency</cite>
      </div>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ background: "var(--stone2)" }}>
        <div className="section-inner">
          <div className="section-head" style={{ textAlign: "left" }}>
            <span className="section-eyebrow">Proof of Work</span>
            <h2 className="section-title">Built by an Engineer. Not a Template.</h2>
            <p className="section-sub" style={{ marginLeft: "0" }}>
              I don't resell page builders. I build and run real platforms —
              and every system we run for you gets the same engineering, the
              same standards, and the same accountability.
            </p>
          </div>

          <div className="portfolio-grid">
            <div className="portfolio-card">
              <div className="portfolio-bar"></div>
              <div>
                <p className="portfolio-tag">Live Platform</p>
                <h3>Excelsus</h3>
                <p className="desc">
                  Full-stack personal brand and membership platform. Next.js +
                  Supabase + Stripe + Vercel. Auth, subscriptions, community,
                  and an admin panel — built and maintained by me.
                </p>
                <div className="portfolio-stack">
                  <span className="stack-pill">Next.js</span>
                  <span className="stack-pill">Supabase</span>
                  <span className="stack-pill">Stripe</span>
                  <span className="stack-pill">Vercel</span>
                </div>
              </div>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-bar"></div>
              <div>
                <p className="portfolio-tag">Live Platform</p>
                <h3>HackLingo</h3>
                <p className="desc">
                  Gamified cybersecurity learning platform with an XP system for
                  learning ethical hacking. Built from scratch on the same
                  stack.
                </p>
                <div className="portfolio-stack">
                  <span className="stack-pill">Next.js</span>
                  <span className="stack-pill">Supabase</span>
                  <span className="stack-pill">TypeScript</span>
                </div>
              </div>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-bar"></div>
              <div>
                <p className="portfolio-tag">Client Work</p>
                <h3>Orlando Realtor — Roxanne Fernandez</h3>
                <p className="desc">
                  Full real estate listing site with lead capture and property
                  inquiry forms for a local business in Orlando. Delivered in
                  under a week. Same engineering, applied to a business that
                  lives on leads.
                </p>
                <div className="portfolio-stack">
                  <span className="stack-pill">Next.js</span>
                  <span className="stack-pill">Vercel</span>
                  <span className="stack-pill">SEO</span>
                </div>
              </div>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-bar"></div>
              <div>
                <p className="portfolio-tag">Security</p>
                <h3>Security Hardening — Standard Practice</h3>
                <p className="desc">
                  OWASP Top 10, CSP headers, input validation, auth hardening.
                  Every site I build is hardened by default — cybersecurity
                  isn't an add-on, it's baked into the foundation.
                </p>
                <div className="portfolio-stack">
                  <span className="stack-pill">OWASP</span>
                  <span className="stack-pill">CSP</span>
                  <span className="stack-pill">Auth</span>
                </div>
              </div>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-bar"></div>
              <div>
                <p className="portfolio-tag">Engineering</p>
                <h3>Achlys — Custom Programming Language</h3>
                <p className="desc">
                  Built a complete programming language from scratch — lexer,
                  parser, interpreter, standard library. Not a tutorial project.
                  A working language. This is the caliber of thinking applied to
                  every system I build.
                </p>
                <div className="portfolio-stack">
                  <span className="stack-pill">Language Design</span>
                  <span className="stack-pill">Systems Engineering</span>
                  <span className="stack-pill">C / Rust</span>
                </div>
              </div>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-bar"></div>
              <div>
                <p className="portfolio-tag">Systems</p>
                <h3>Custom OS / Kernel</h3>
                <p className="desc">
                  Wrote a kernel and operating system from scratch — memory
                  management, process scheduling, system calls. The kind of
                  low-level systems knowledge that informs how every application
                  I build is architected.
                </p>
                <div className="portfolio-stack">
                  <span className="stack-pill">Systems Programming</span>
                  <span className="stack-pill">OS Design</span>
                  <span className="stack-pill">C / Assembly / LLVM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK A CALL / CONTACT */}
      <section id="book-call" className="contact-section">
        <div className="contact-inner">
          <span className="section-eyebrow">
            Book a Call · 15 Minutes
          </span>
          <h2 className="section-title contact-title">
            Let's Talk About
            <br />
            <span>Your Biggest Leak.</span>
          </h2>
          <p className="contact-copy">
            15 minutes. We look at where customers are slipping away — the
            ringing phone, the slow follow-up, the sleeping list — and which
            system plugs it first. Every price is already on this page;
            there are no surprises on the call.
          </p>
          <div className="contact-btn-row">
            <a
              href="mailto:alejandriosity@gmail.com?subject=Call — Excelsus Agency&body=Hi Miguel,%0A%0AI run a business and I'd like to book a 15-minute call.%0A%0A[Business name / what you sell / where you lose customers]"
              className="btn-primary"
            >
              Book a 15-Minute Call
            </a>
            <a href="#pricing" className="btn-ghost">
              Back to Services
            </a>
          </div>

          {/* Cal inline embed */}
          <div className="cal-embed-wrap">
            <p className="cal-embed-label">Or Pick a Time Below</p>
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
          Cal.ns["15min"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#0B7A55"},"dark":{"cal-brand":"#0B7A55"}},"hideEventTypeDetails":false,"layout":"month_view"});
        `,
            }}
          />

          <div className="contact-info-row">
            <div className="contact-info-col">
              <p className="lbl">Email</p>
              <a className="val" href="mailto:alejandriosity@gmail.com">
                alejandriosity@gmail.com
              </a>
            </div>
            <div className="contact-info-col">
              <p className="lbl">LinkedIn</p>
              <a
                className="val"
                href="https://www.linkedin.com/in/miguel-esteves-129879314/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Miguel Esteves
              </a>
            </div>
            <div className="contact-info-col">
              <p className="lbl">Service Area</p>
              <span className="val">Worldwide · English & Spanish</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-brand">EXCELSUS AGENCY</div>
            <p className="footer-tag">Growth Systems for Businesses That Live on Leads</p>
          </div>
          <div className="footer-links">
            <a href="#pricing">Services</a>
            <a href="#portfolio">Proof</a>
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
        <div
          style={{
            maxWidth: "1100px",
            margin: "1.5rem auto 0",
            borderTop: "1px solid rgba(201,168,76,0.08)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p className="footer-copy">© 2026 Excelsus Agency — Miguel Esteves</p>
          <p className="footer-copy" style={{ fontStyle: "italic" }}>
            Excelsus — semper supra
          </p>
        </div>
      </footer>

      {/* CHATBOT WIDGET */}
      <div className="chatbot-widget" id="chatWidget">
        <div
          className={`chatbot-bubble${chatOpen ? " open" : ""}`}
          id="chatBubble"
        >
          <div className="chat-header">
            <strong>Excelsus AI Assistant</strong>
            <span>Systems · Pricing · What's included</span>
          </div>
          <div
            className="chat-messages"
            id="chatMessages"
            ref={chatMessagesRef}
          >
            {chatMessages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.text}
              </div>
            ))}
            {chatLoading && (
              <div className="chat-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
          <div className="chat-input-row">
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
            <button onClick={sendChat} disabled={chatLoading}>
              {chatLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
        <button
          className="chatbot-btn"
          onClick={() => setChatOpen((v) => !v)}
          title="Chat with the Excelsus AI assistant"
        >
          {chatOpen ? "✕" : "💬"}
        </button>
      </div>
    </div>
  );
}
