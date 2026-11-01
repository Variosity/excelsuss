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
      text: "Hey — I'm Miguel's website assistant. Ask me about pricing, timelines, or what's included. What do you need?",
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
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#C9A84C;--gold-light:#E8C97A;--gold-dim:#8b6914;
  --stone:#0F0D0B;--stone2:#1A1714;--stone3:#211E1A;
  --iron:#6B6357;--parchment:#F5EED8;--parchment-dim:#C8B98A;
  --white:#FAFAF8;
}
html{scroll-behavior:smooth;overflow-x:hidden}
body{background:var(--stone);color:var(--parchment);font-family:'Crimson Pro',Georgia,serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:var(--stone2)}
::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.27)}

/* NAV */
nav.topnav{position:sticky;top:0;z-index:50;background:rgba(15,13,11,0.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(201,168,76,0.1);padding:0 clamp(1rem,4vw,3rem)}
.nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:60px}
.nav-logo{font-family:'Cinzel',serif;font-weight:900;font-size:1rem;letter-spacing:0.25em;color:var(--gold);text-decoration:none}
.nav-links{display:flex;gap:2rem;align-items:center}
.nav-links a{font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--iron);text-decoration:none;transition:color 0.2s}
.nav-links a:hover{color:var(--gold)}
.nav-cta{font-family:'Cinzel',serif;font-size:0.62rem!important;font-weight:700;letter-spacing:0.15em!important;text-transform:uppercase;background:var(--gold);color:var(--stone)!important;padding:0.5rem 1.25rem;text-decoration:none;transition:background 0.2s}
.nav-cta:hover{background:var(--gold-light)!important}

/* HERO */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 1.5rem 4rem;position:relative;overflow:hidden}
.hero-bg{position:absolute;inset:0;pointer-events:none}
.hero-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:900px;height:600px;background:radial-gradient(ellipse,rgba(201,168,76,0.06) 0%,transparent 60%)}
.hero-line{position:absolute;top:0;left:50%;transform:translateX(-50%);width:1px;height:100%;background:linear-gradient(to bottom,transparent,rgba(201,168,76,0.12),transparent)}
.hero-eyebrow{font-family:'Cinzel',serif;font-size:0.65rem;letter-spacing:0.45em;text-transform:uppercase;color:var(--gold);margin-bottom:1.25rem}
.hero-divider{width:6rem;height:1px;margin:0 auto 1.5rem;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.hero h1{font-family:'Cinzel',serif;font-weight:900;line-height:0.9;letter-spacing:0.04em;color:var(--white);margin-bottom:1.25rem;font-size:clamp(2.5rem,8vw,6rem)}
.hero-sub{font-size:clamp(1rem,2.5vw,1.3rem);font-weight:300;font-style:italic;color:var(--parchment-dim);max-width:600px;line-height:1.6;margin-bottom:0.75rem}
.hero-tagline{font-family:'Cinzel',serif;font-size:0.68rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--iron);margin-bottom:2.5rem}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}
.btn-primary{font-family:'Cinzel',serif;font-size:0.78rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;background:var(--gold);color:#0F0D0B;padding:0.9rem 2.5rem;text-decoration:none;transition:background 0.2s;white-space:nowrap;border:none;cursor:pointer;display:inline-block}
.btn-primary:hover{background:var(--gold-light)}
.btn-ghost{font-family:'Cinzel',serif;font-size:0.78rem;letter-spacing:0.18em;text-transform:uppercase;border:1px solid rgba(201,168,76,0.35);color:var(--gold);padding:0.9rem 2.5rem;text-decoration:none;transition:all 0.2s;white-space:nowrap;background:transparent;display:inline-block}
.btn-ghost:hover{border-color:var(--gold);background:rgba(201,168,76,0.06)}
@keyframes riseUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.gold-shimmer{background:linear-gradient(90deg,var(--gold-dim),var(--gold-light),var(--gold),var(--gold-dim));background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
.animate-rise{animation:riseUp 0.8s ease-out forwards}

/* PROOF / STATS STRIP */
.proof-strip{border-top:1px solid rgba(201,168,76,0.1);border-bottom:1px solid rgba(201,168,76,0.1);background:var(--stone2);padding:1.5rem clamp(1rem,4vw,3rem)}
.proof-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;text-align:center}
.proof-stat{font-family:'Cinzel',serif;font-size:1.6rem;font-weight:900;color:var(--gold);line-height:1}
.proof-label{font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--iron);margin-top:0.4rem}

/* SECTION COMMON */
section{padding:clamp(3rem,8vw,6rem) clamp(1rem,4vw,3rem)}
.section-inner{max-width:1100px;margin:0 auto}
.section-head{text-align:center;margin-bottom:3rem}
.section-eyebrow{font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.35em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:0.75rem}
.section-title{font-family:'Cinzel',serif;font-size:clamp(1.5rem,3.5vw,2.5rem);font-weight:700;color:var(--white);line-height:1.15}
.section-sub{font-size:1rem;font-weight:300;color:var(--parchment-dim);max-width:600px;line-height:1.7;margin:0.75rem auto 0}

.service-copy{font-size:0.95rem;color:var(--parchment-dim);line-height:1.75;margin-bottom:1rem;max-width:640px}

/* Advantage callout */
.advantage{margin-top:1.5rem;border-left:2px solid var(--gold);padding-left:1.25rem}
.advantage p:first-child{font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:0.5rem}
.advantage p:last-child{font-size:0.85rem;color:var(--iron);line-height:1.7}

/* TIER / PRICING CARDS */
.tier-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:1rem;margin:2rem 0}
.tier-card{border:1px solid rgba(201,168,76,0.12);background:var(--stone2);padding:1.75rem;position:relative;display:flex;flex-direction:column;transition:border-color 0.2s}
.tier-card:hover{border-color:rgba(201,168,76,0.3)}
.tier-card.featured{border-color:rgba(201,168,76,0.4);background:rgba(201,168,76,0.05)}
.tier-card.featured::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.tier-badge{display:inline-block;font-family:'Cinzel',serif;font-size:0.5rem;letter-spacing:0.15em;text-transform:uppercase;background:var(--gold);color:var(--stone);padding:0.18rem 0.6rem;margin-bottom:0.8rem}
.tier-name{font-family:'Cinzel',serif;font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:0.15rem}
.tier-sub{font-size:0.72rem;font-style:italic;color:var(--iron);margin-bottom:0.9rem}
.tier-price-row{display:flex;align-items:flex-start;gap:0.15rem;margin-bottom:0.15rem}
.tier-dollar{font-family:'Cinzel',serif;font-size:1rem;color:var(--gold);margin-top:0.4rem}
.tier-price{font-family:'Cinzel',serif;font-size:2rem;font-weight:900;color:var(--white);line-height:1}
.tier-period{font-size:0.72rem;color:var(--iron);align-self:flex-end;margin-bottom:0.2rem}
.tier-note{font-size:0.75rem;color:var(--iron);margin-bottom:1.25rem}
.tier-items{list-style:none;flex:1;margin-bottom:1.25rem;display:flex;flex-direction:column;gap:0.4rem}
.tier-items li{display:flex;gap:0.5rem;font-size:0.82rem;color:var(--parchment-dim);align-items:flex-start;line-height:1.5}
.tier-items li span{font-size:0.55rem;margin-top:0.35rem;flex-shrink:0;color:var(--gold)}
.tier-action a{display:block;text-align:center;font-family:'Cinzel',serif;font-size:0.65rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;padding:0.8rem;border:1px solid rgba(201,168,76,0.3);color:var(--gold);text-decoration:none;background:transparent;transition:all 0.2s;margin-top:auto}
.tier-action a:hover{background:var(--gold);color:var(--stone)}
.tier-card.featured .tier-action a{background:var(--gold);color:var(--stone)}
.tier-card.featured .tier-action a:hover{background:var(--gold-light)}

/* Guarantee box */
.guarantee-box{border:1px solid rgba(201,168,76,0.3);background:rgba(201,168,76,0.05);padding:1.25rem 1.5rem;margin:1.5rem 0;display:flex;align-items:center;gap:1rem}
.guarantee-icon{font-size:1.2rem;flex-shrink:0;color:var(--gold)}
.guarantee-label{font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);margin-bottom:0.2rem}
.guarantee-text{font-size:0.88rem;color:var(--parchment-dim)}

/* Retainers */
.retainer-label{font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--iron);margin-bottom:0.75rem}
.retainer-intro{font-size:0.9rem;color:var(--parchment-dim);line-height:1.75;max-width:640px;margin-bottom:1.5rem}
.retainer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:1rem;margin-bottom:2rem}
.retainer-card{border:1px solid rgba(201,168,76,0.1);background:var(--stone2);padding:1.5rem;position:relative}
.retainer-card.featured{border-color:rgba(201,168,76,0.3);background:rgba(201,168,76,0.04)}
.retainer-price{font-family:'Cinzel',serif;font-size:1.5rem;font-weight:900;color:var(--gold);margin-bottom:0.2rem}
.retainer-name{font-family:'Cinzel',serif;font-size:0.62rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--iron);margin-bottom:0.9rem}
.retainer-items{list-style:none;display:flex;flex-direction:column;gap:0.4rem}
.retainer-items li{display:flex;gap:0.5rem;font-size:0.8rem;color:var(--iron);align-items:flex-start;line-height:1.5}
.retainer-items li span{color:var(--gold);font-size:0.5rem;margin-top:0.38rem;flex-shrink:0}

/* Comparison table */
.compare-wrap{overflow-x:auto;margin-top:1rem}
.compare-title{font-family:'Cinzel',serif;font-size:0.85rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--white);margin:2.5rem 0 1rem}
.compare-table{width:100%;border-collapse:collapse;min-width:540px}
.compare-table th{font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--iron);padding:0.75rem 1rem;text-align:left;border-bottom:1px solid rgba(201,168,76,0.1)}
.compare-table th:last-child{color:var(--gold)}
.compare-table td{padding:0.85rem 1rem;border-bottom:1px solid rgba(201,168,76,0.06);vertical-align:top;line-height:1.5;font-size:0.8rem;color:var(--iron)}
.compare-table td:first-child{color:var(--white);font-family:'Cinzel',serif;font-size:0.78rem;font-weight:600;letter-spacing:0.05em}
.compare-table td.new-way{color:var(--parchment-dim)}
.compare-table tr:nth-child(even){background:rgba(201,168,76,0.02)}

/* Stack pills */
.stack-label{font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--iron);margin-bottom:0.6rem}
.stack-pills{display:flex;gap:0.5rem;flex-wrap:wrap}
.stack-pill{font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.08em;text-transform:uppercase;border:1px solid rgba(201,168,76,0.15);color:var(--iron);padding:0.25rem 0.65rem}

/* Process steps */
.process-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:1rem;margin-top:2rem}
.process-step{border:1px solid rgba(201,168,76,0.1);background:var(--stone2);padding:1.5rem;position:relative}
.step-num{font-family:'Cinzel',serif;font-size:2rem;font-weight:900;color:rgba(201,168,76,0.15);line-height:1;margin-bottom:0.75rem}
.step-label{font-family:'Cinzel',serif;font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:0.25rem}
.step-time{font-size:0.72rem;color:var(--iron);margin-bottom:0.5rem}
.step-desc{font-size:0.8rem;color:var(--iron);line-height:1.6}

/* Who this is for */
.audience-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,220px),1fr));gap:0.75rem;margin-top:1rem}
.audience-card{border:1px solid rgba(201,168,76,0.1);padding:1rem;background:var(--stone2)}
.audience-card p:first-child{font-family:'Cinzel',serif;font-size:0.75rem;color:var(--white);margin-bottom:0.25rem}
.audience-card p:last-child{font-size:0.78rem;color:var(--iron)}

/* MANIFESTO BANNER */
.manifesto-banner{padding:clamp(2.5rem,6vw,4rem) clamp(1rem,4vw,3rem);text-align:center;background:var(--stone2);border-top:1px solid rgba(201,168,76,0.08);border-bottom:1px solid rgba(201,168,76,0.08)}
.manifesto-banner blockquote{font-family:'Cinzel',serif;font-size:clamp(1rem,2.2vw,1.3rem);font-weight:400;color:var(--white);max-width:750px;margin:0 auto;line-height:1.65;letter-spacing:0.02em}
.manifesto-banner cite{display:block;margin-top:1rem;font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold-dim);font-style:normal}

/* PORTFOLIO */
.portfolio-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:1rem;margin-top:2rem}
.portfolio-card{border:1px solid rgba(201,168,76,0.1);padding:1.25rem;display:flex;gap:1rem;align-items:flex-start}
.portfolio-bar{width:3px;background:var(--gold);flex-shrink:0;border-radius:2px;align-self:stretch}
.portfolio-tag{font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);margin-bottom:0.35rem}
.portfolio-card h3{font-family:'Cinzel',serif;font-size:0.88rem;font-weight:700;color:var(--white);margin-bottom:0.4rem}
.portfolio-card p.desc{font-size:0.82rem;color:var(--iron);line-height:1.6}
.portfolio-stack{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.75rem}

/* BOOK-A-CALL / CONTACT */
.contact-section{background:var(--stone2);border-top:1px solid rgba(201,168,76,0.08);text-align:center}
.contact-inner{max-width:700px;margin:0 auto}
.contact-title span{color:var(--gold)}
.contact-copy{font-size:1rem;color:var(--parchment-dim);line-height:1.8;margin:1.25rem auto 2.5rem}
.contact-btn-row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:2rem}
.contact-info-row{display:flex;gap:2rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.5rem}
.contact-info-row:last-of-type{margin-bottom:0}
.contact-info-col{text-align:center}
.contact-info-col .lbl{font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--iron);margin-bottom:0.25rem}
.contact-info-col .val{font-size:0.82rem;color:rgba(201,168,76,0.8);text-decoration:none}
.contact-info-col .val:hover{color:var(--gold)}

/* Cal.com inline embed */
.cal-embed-wrap{max-width:700px;margin:0 auto 2.5rem;border:1px solid rgba(201,168,76,0.2);background:var(--stone);padding:1.25rem;position:relative;overflow:hidden;text-align:left}
.cal-embed-wrap::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.cal-embed-label{font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:0.9rem;text-align:center}
#my-cal-inline-15min{min-height:600px}

/* CHATBOT WIDGET */
.chatbot-widget{position:fixed;bottom:1.5rem;right:1.5rem;z-index:100;display:flex;flex-direction:column;align-items:flex-end;gap:0.75rem}
.chatbot-bubble{background:var(--stone2);border:1px solid rgba(201,168,76,0.25);width:320px;display:none;flex-direction:column;overflow:hidden}
.chatbot-bubble.open{display:flex}
.chat-header{padding:0.85rem 1rem;border-bottom:1px solid rgba(201,168,76,0.12)}
.chat-header strong{color:var(--gold);font-family:'Cinzel',serif;font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;display:block}
.chat-header span{font-size:0.68rem;color:var(--iron)}
.chatbot-btn{width:56px;height:56px;border-radius:50%;background:var(--gold);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.4rem;box-shadow:0 4px 20px rgba(201,168,76,0.3);transition:transform 0.2s,background 0.2s}
.chatbot-btn:hover{transform:scale(1.1);background:var(--gold-light)}
.chat-input-row{display:flex;border-top:1px solid rgba(201,168,76,0.12)}
.chat-input-row input{flex:1;background:var(--stone);border:none;padding:0.6rem 0.85rem;color:var(--parchment);font-size:0.85rem;font-family:'Crimson Pro',serif;outline:none}
.chat-input-row input::placeholder{color:var(--iron)}
.chat-input-row button{background:var(--gold);color:#0F0D0B;border:none;padding:0.6rem 0.9rem;cursor:pointer;font-family:'Cinzel',serif;font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;flex-shrink:0}
.chat-input-row button:disabled{opacity:0.5;cursor:not-allowed}
.chat-messages{max-height:260px;min-height:120px;overflow-y:auto;display:flex;flex-direction:column;gap:0.5rem;padding:0.75rem}
.chat-msg{font-size:0.8rem;line-height:1.5;padding:0.4rem 0.6rem;max-width:88%}
.chat-msg.user{background:rgba(201,168,76,0.08);color:var(--parchment-dim);align-self:flex-end;text-align:right}
.chat-msg.bot{color:var(--parchment-dim);align-self:flex-start}
.chat-typing{display:flex;gap:0.3rem;align-items:center;padding:0.4rem 0.6rem}
@keyframes blink{0%,80%,100%{opacity:0.2}40%{opacity:1}}
.chat-typing span{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:blink 1.2s infinite}
.chat-typing span:nth-child(2){animation-delay:0.2s}
.chat-typing span:nth-child(3){animation-delay:0.4s}

/* FOOTER */
footer{border-top:1px solid rgba(201,168,76,0.08);padding:1.5rem clamp(1rem,4vw,3rem)}
.footer-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}
.footer-brand{font-family:'Cinzel',serif;font-weight:900;font-size:0.85rem;letter-spacing:0.25em;color:var(--gold)}
.footer-tag{font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--iron);margin-top:0.25rem;font-style:italic}
.footer-links{display:flex;gap:1.25rem;flex-wrap:wrap}
.footer-links a{font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--iron);text-decoration:none;transition:color 0.2s}
.footer-links a:hover{color:var(--gold)}
.footer-copy{font-size:0.72rem;color:var(--iron)}

@media(max-width:767px){
  .nav-links{display:none}
  .compare-table{min-width:520px}
}
      `}</style>

      {/* NAV */}
      <nav className="topnav">
        <div className="nav-inner">
          <a className="nav-logo" href="#">
            EXCELSUS AGENCY
          </a>
          <div className="nav-links">
            <a href="#pricing">Pricing</a>
            <a href="#portfolio">Portfolio</a>
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
        <p className="hero-eyebrow animate-rise">Professional Web Services</p>
        <div className="hero-divider"></div>
        <h1
          className="animate-rise"
          style={{ animationDelay: "0.15s", opacity: "0" }}
        >
          Your Business Deserves
          <br />
          <span className="gold-shimmer">a Website That Works.</span>
        </h1>
        <p
          className="hero-sub animate-rise"
          style={{ animationDelay: "0.3s", opacity: "0" }}
        >
          Professional, fast-loading websites built to convert visitors into
          clients. Live in 5–7 days, done for you.
        </p>
        <p
          className="hero-tagline animate-rise"
          style={{ animationDelay: "0.4s", opacity: "0" }}
        >
          Booking · Lead Capture · SEO · Security · Support
        </p>
        <div
          className="hero-btns animate-rise"
          style={{ animationDelay: "0.5s", opacity: "0" }}
        >
          <a href="#book-call" className="btn-primary">
            Book a Discovery Call
          </a>
          <a href="#pricing" className="btn-ghost">
            See the Packages
          </a>
        </div>
      </section>

      {/* PROOF / STATS STRIP */}
      <div className="proof-strip">
        <div className="proof-grid">
          <div>
            <div className="proof-stat">5–7</div>
            <div className="proof-label">Days to Launch</div>
          </div>
          <div>
            <div className="proof-stat">$397</div>
            <div className="proof-label">Starting Price</div>
          </div>
          <div>
            <div className="proof-stat">$39</div>
            <div className="proof-label">Per Month to Keep It Live</div>
          </div>
          <div>
            <div className="proof-stat">100%</div>
            <div className="proof-label">Satisfaction Guaranteed</div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <section id="pricing">
        <div className="section-inner">
          <div className="section-head" style={{ textAlign: "left" }}>
            <span className="section-eyebrow">What I Build</span>
            <h2 className="section-title">
              A Website That Actually
              <br />
              Brings In Business
            </h2>
            <p className="section-sub" style={{ marginLeft: "0" }}>
              Built on the same stack I use for my own platforms — not a
              template, not outsourced code. No nickel-and-diming: every package
              comes fully equipped.
            </p>
          </div>

          <p className="service-copy">
            A done-for-you website built on Next.js / Supabase / Stripe / Vercel
            — the exact stack that powers my own platforms. Delivered in 5–7
            days instead of the 4–8 weeks a typical agency takes.
          </p>
          <p className="service-copy">
            Every build includes a conversion-focused design, booking / lead
            capture, on-page SEO, and security hardening baked in as standard —
            not sold separately.
          </p>
          <div className="advantage">
            <p>Why It's Different</p>
            <p>
              I built my own platforms (Excelsus, HackLingo, a realtor's listing
              site) on this exact stack. I'm not a freelancer guessing what
              works — I'm a builder who eats my own cooking. Security hardened
              by default because of my cybersecurity background — most website
              sellers have never heard of a CSP header.
            </p>
          </div>

          <div className="tier-grid">
            <div className="tier-card">
              <p className="tier-name">Simple</p>
              <p className="tier-sub">Get online, fast</p>
              <div className="tier-price-row">
                <span className="tier-dollar">$</span>
                <span className="tier-price">397</span>
              </div>
              <p className="tier-note">One-time · 5-day delivery</p>
              <ul className="tier-items">
                <li>
                  <span>✦</span> Single-page professional website
                </li>
                <li>
                  <span>✦</span> Services / offerings section
                </li>
                <li>
                  <span>✦</span> Booking or contact form
                </li>
                <li>
                  <span>✦</span> Google Calendar / Cal.com embed
                </li>
                <li>
                  <span>✦</span> Contact info, location, Google Maps
                </li>
                <li>
                  <span>✦</span> On-page SEO + AEO setup
                </li>
                <li>
                  <span>✦</span> Security hardening (CSP, HTTPS)
                </li>
                <li>
                  <span>✦</span> Mobile-responsive, fast-loading
                </li>
                <li>
                  <span>✦</span> 30 days post-launch support
                </li>
              </ul>
              <div className="tier-action">
                <a href="#book-call">Get Started</a>
              </div>
            </div>
            <div className="tier-card featured">
              <span className="tier-badge">Most Popular</span>
              <p className="tier-name">Multi-Page</p>
              <p className="tier-sub">The full professional presence</p>
              <div className="tier-price-row">
                <span className="tier-dollar">$</span>
                <span className="tier-price">697</span>
              </div>
              <p className="tier-note">One-time · 7-day delivery</p>
              <ul className="tier-items">
                <li>
                  <span>✦</span> Everything in Simple
                </li>
                <li>
                  <span>✦</span> Multiple pages (Home, About, Services, Contact,
                  Blog-ready)
                </li>
                <li>
                  <span>✦</span> Advanced booking / reservation system
                </li>
                <li>
                  <span>✦</span> Database integration (Supabase) for forms and
                  leads
                </li>
                <li>
                  <span>✦</span> Email notification on every new lead
                </li>
                <li>
                  <span>✦</span> Third-party integrations (Stripe, OpenTable,
                  etc.)
                </li>
                <li>
                  <span>✦</span> Blog or portfolio section
                </li>
                <li>
                  <span>✦</span> Priority support
                </li>
              </ul>
              <div className="tier-action">
                <a href="#book-call">Get Started</a>
              </div>
            </div>
          </div>

          <div className="guarantee-box">
            <span className="guarantee-icon">⚔</span>
            <div>
              <p className="guarantee-label">Guarantee</p>
              <p className="guarantee-text">
                Your site goes live within the promised timeframe — or I keep
                working for free until it does.
              </p>
            </div>
          </div>

          <p className="retainer-label" style={{ marginTop: "2.5rem" }}>
            Monthly Plans — Optional
          </p>
          <p className="retainer-intro">
            A website without maintenance is a liability. Hosting expires,
            content gets stale, and slow sites lose rankings. These plans keep
            everything running.
          </p>
          <div className="retainer-grid">
            <div className="retainer-card">
              <div className="retainer-price">
                $39
                <span style={{ fontSize: "0.9rem", fontWeight: 400 }}>/mo</span>
              </div>
              <p className="retainer-name">Maintenance — "Keep It Live"</p>
              <ul className="retainer-items">
                <li>
                  <span>✦</span> Hosting covered (no separate bill)
                </li>
                <li>
                  <span>✦</span> Content updates (menu items, hours, photos,
                  text)
                </li>
                <li>
                  <span>✦</span> Uptime monitoring
                </li>
                <li>
                  <span>✦</span> Minor bug fixes
                </li>
              </ul>
            </div>
            <div className="retainer-card featured">
              <div className="retainer-price">
                $79
                <span style={{ fontSize: "0.9rem", fontWeight: 400 }}>/mo</span>
              </div>
              <p className="retainer-name">Growth — "Keep It Growing"</p>
              <ul className="retainer-items">
                <li>
                  <span>✦</span> Everything in Maintenance
                </li>
                <li>
                  <span>✦</span> One new addition per month (section, form,
                  design tweak)
                </li>
                <li>
                  <span>✦</span> Basic monthly analytics report
                </li>
                <li>
                  <span>✦</span> Monthly on-page SEO check
                </li>
              </ul>
            </div>
          </div>

          <p className="compare-title">Why Not Just Use Wix?</p>
          <div className="compare-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Wix / Squarespace</th>
                  <th>Excelsus Agency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Delivery time</td>
                  <td>You do it yourself — weeks if you're lucky</td>
                  <td className="new-way">5–7 days, done for you</td>
                </tr>
                <tr>
                  <td>Monthly cost</td>
                  <td>$20–$50/mo forever, you own nothing</td>
                  <td className="new-way">
                    $39/mo optional — you own the code
                  </td>
                </tr>
                <tr>
                  <td>Performance</td>
                  <td>Template bloat, slow by default</td>
                  <td className="new-way">
                    Optimized Next.js — fast by design
                  </td>
                </tr>
                <tr>
                  <td>SEO setup</td>
                  <td>Basic meta fields, no schema</td>
                  <td className="new-way">Full on-page SEO + schema + AEO</td>
                </tr>
                <tr>
                  <td>Security</td>
                  <td>Platform-level only, frequent breaches</td>
                  <td className="new-way">
                    CSP headers, auth hardening, input validation
                  </td>
                </tr>
                <tr>
                  <td>Lead database</td>
                  <td>None — forms email you and disappear</td>
                  <td className="new-way">
                    Supabase database, every lead captured
                  </td>
                </tr>
                <tr>
                  <td>You own the site</td>
                  <td>No — cancel the subscription, site dies</td>
                  <td className="new-way">
                    Yes — your code, your domain, yours
                  </td>
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
              From Call to Live Site in One Week.
            </h2>
          </div>
          <div className="process-steps">
            {[
              {
                num: "01",
                label: "Discovery Call",
                time: "Day 0",
                desc: "15 minutes. You tell me what you do, who you serve, and what you want the site to accomplish. That's it.",
              },
              {
                num: "02",
                label: "Questionnaire",
                time: "Day 1",
                desc: "Short brand questionnaire — colors, tone, examples you like. No homework, no lengthy briefs.",
              },
              {
                num: "03",
                label: "Build",
                time: "Days 1–5",
                desc: "I build the site on your chosen package. You don't need to do anything during this phase.",
              },
              {
                num: "04",
                label: "Review & Revise",
                time: "Day 5–6",
                desc: "You review the live preview. One round of revisions included.",
              },
              {
                num: "05",
                label: "Launch",
                time: "Day 6–7",
                desc: "Your domain connected, site live, everything tested. You get credentials and a walkthrough.",
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
              <p>Coaches & Consultants</p>
              <p>Look credible before your calendar fills up</p>
            </div>
            <div className="audience-card">
              <p>Restaurants & Cafes</p>
              <p>Menu, hours, reservations, location — all in one place</p>
            </div>
            <div className="audience-card">
              <p>Local Service Businesses</p>
              <p>Plumbers, contractors, salons — every call is money</p>
            </div>
            <div className="audience-card">
              <p>Freelancers & Agencies</p>
              <p>Your portfolio is the pitch</p>
            </div>
            <div className="audience-card">
              <p>Real Estate Agents</p>
              <p>Listings, contact, booking, professional first impression</p>
            </div>
            <div className="audience-card">
              <p>Medical & Dental Practices</p>
              <p>Patient trust starts online, booking included</p>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO BANNER */}
      <div className="manifesto-banner">
        <blockquote>
          "I'm not a web agency guessing what founders need. I left my job to
          build my own platforms — on the exact stack I'd build yours on. Your
          site is fast. And it's hardened. Most people selling websites right
          now can't say that."
        </blockquote>
        <cite>— Miguel Esteves, Excelsus Agency</cite>
      </div>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ background: "var(--stone2)" }}>
        <div className="section-inner">
          <div className="section-head" style={{ textAlign: "left" }}>
            <span className="section-eyebrow">Proof of Work</span>
            <h2 className="section-title">Built. Shipped. Running.</h2>
            <p className="section-sub" style={{ marginLeft: "0" }}>
              Every client build uses the same stack I built my own platforms
              on. No outsourcing. No templates. My code, my architecture, my
              accountability.
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
                  Full real estate listing site with lead capture, property
                  inquiry forms, and local SEO setup. Delivered in under a week.
                  Live and converting.
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
            Discovery Call · Ready to Build
          </span>
          <h2 className="section-title contact-title">
            Let's Talk About Your Business
            <br />
            <span>One Call. Live in 7 Days.</span>
          </h2>
          <p className="contact-copy">
            15 minutes. No pitch deck. No pressure. You tell me what's broken or
            slow — I tell you exactly what I'd build, when it would be done, and
            what it costs. If it's not a fit, I'll tell you that too.
          </p>
          <div className="contact-btn-row">
            <a
              href="mailto:alejandriosity@gmail.com?subject=Discovery Call — Excelsus Agency&body=Hi Miguel,%0A%0AI'd like to book a discovery call. Here's a bit about my business:%0A%0A[Your business / what you need help with]"
              className="btn-primary"
            >
              Book a Discovery Call
            </a>
            <a
              href="https://github.com/Variosity"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              See the Code
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
          Cal.ns["15min"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#6B6357"},"dark":{"cal-brand":"#C9A84C"}},"hideEventTypeDetails":false,"layout":"month_view"});
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
              <p className="lbl">GitHub</p>
              <a
                className="val"
                href="https://github.com/Variosity"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Variosity
              </a>
            </div>
            <div className="contact-info-col">
              <p className="lbl">Portfolio</p>
              <a
                className="val"
                href="https://alejandriosity.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                alejandriosity.vercel.app
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-brand">EXCELSUS AGENCY</div>
            <p className="footer-tag">Build. Launch. Grow.</p>
          </div>
          <div className="footer-links">
            <a href="#pricing">Pricing</a>
            <a href="#portfolio">Portfolio</a>
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
            <strong>Ask Me Anything</strong>
            <span>Pricing · Timeline · What's included</span>
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
          title="Chat with Miguel's assistant"
        >
          {chatOpen ? "✕" : "⚔"}
        </button>
      </div>
    </div>
  );
}
