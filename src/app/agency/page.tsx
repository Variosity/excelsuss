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
      text: "Hey — I'm the Excelsus AI assistant. Ask me about the booking system, the price, or what's included. What do you need?",
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
            <a href="#pricing">The System</a>
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
        <p className="hero-eyebrow animate-rise">Booking Systems for Pest Control Companies · Tampa & Orlando</p>
        <div className="hero-divider"></div>
        <h1
          className="animate-rise"
          style={{ animationDelay: "0.15s", opacity: "0" }}
        >
          Your Website Should
          <br />
          <span className="gold-shimmer">Book Jobs While You Sleep.</span>
        </h1>
        <p
          className="hero-sub animate-rise"
          style={{ animationDelay: "0.3s", opacity: "0" }}
        >
          For pest control companies: a website with a 24/7 AI chat, instant
          lead follow-up, online booking, and a campaign that brings your past
          customers back. Live in 7 days.
        </p>
        <p
          className="hero-tagline animate-rise"
          style={{ animationDelay: "0.4s", opacity: "0" }}
        >
          AI Chat · Instant Follow-Up · Online Booking · Reactivation
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
            <div className="proof-stat">$997</div>
            <div className="proof-label">One-Time Setup</div>
          </div>
          <div>
            <div className="proof-stat">$497</div>
            <div className="proof-label">Per Month — Run For You</div>
          </div>
          <div>
            <div className="proof-stat">24/7</div>
            <div className="proof-label">AI Chat Answering Customers</div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <section id="pricing">
        <div className="section-inner">
          <div className="section-head" style={{ textAlign: "left" }}>
            <span className="section-eyebrow">What You Get</span>
            <h2 className="section-title">
              One System.
              <br />
              Built to Book Jobs.
            </h2>
            <p className="section-sub" style={{ marginLeft: "0" }}>
              Not a brochure website. A booking system, built only for pest
              control companies, on the same stack I run my own platforms on.
              One offer, one price — everything below is included.
            </p>
          </div>

          <p className="service-copy">
            Most pest control websites are brochures. A homeowner finds you at
            9pm, can't book, can't ask a question — so they book whoever
            answers first. This system is the fix: it answers, follows up, and
            books, day and night, whether you're in the office or not.
          </p>
          <p className="service-copy">
            Live in 7 days from your completed intake form. Built on Next.js /
            Vercel / Cloudflare — engineered and security-hardened, not a
            rented template.
          </p>
          <div className="advantage">
            <p>Why It's Different</p>
            <p>
              I'm an AI engineer, not a template reseller. I built and run my
              own platforms (Excelsus, HackLingo) and client sites on this
              exact stack — so your system is engineered, fast, and hardened by
              default, and the person who built it is the person you talk to
              when something needs changing.
            </p>
          </div>

          <div className="tier-grid">
            <div className="tier-card featured">
              <span className="tier-badge">Founding Clients — Tampa & Orlando</span>
              <p className="tier-name">The Booking System</p>
              <p className="tier-sub">Everything included. One price.</p>
              <div className="tier-price-row">
                <span className="tier-dollar">$</span>
                <span className="tier-price">997</span>
                <span className="tier-period">setup</span>
              </div>
              <p className="tier-note">
                One-time setup · then $497/month for us to run it · 6-month
                minimum, then month-to-month
              </p>
              <ul className="tier-items">
                <li>
                  <span>✦</span> A fast new website — home, general pest,
                  termite, rodent, and booking pages
                </li>
                <li>
                  <span>✦</span> AI chat on every page, 24/7 — answers
                  questions and captures name, phone, and problem
                </li>
                <li>
                  <span>✦</span> Instant emails — you get an alert the second a
                  lead comes in, the customer gets an instant reply
                </li>
                <li>
                  <span>✦</span> Follow-up emails to leads who didn't book — 4
                  emails over 7 days
                </li>
                <li>
                  <span>✦</span> Online booking on every page
                </li>
                <li>
                  <span>✦</span> Automatic review-request email after each job
                </li>
                <li>
                  <span>✦</span> One email campaign to your past customers in
                  Week 1
                </li>
                <li>
                  <span>✦</span> A 1-page report every month: chats, leads, and
                  bookings the system produced
                </li>
              </ul>
              <div className="tier-action">
                <a href="#book-call">Book a 15-Minute Call</a>
              </div>
            </div>
          </div>

          <div className="guarantee-box">
            <span className="guarantee-icon">⚔</span>
            <div>
              <p className="guarantee-label">Our Promise</p>
              <p className="guarantee-text">
                Live within 7 days of your completed intake form, and your
                first monthly report within 30 days of launch. If we're late
                because of us, we keep working free until it's live.
              </p>
            </div>
          </div>

          <p className="retainer-label" style={{ marginTop: "2.5rem" }}>
            What the $497/Month Runs
          </p>
          <p className="retainer-intro">
            The monthly fee isn't hosting rent. It's us running the system
            every month — so it keeps booking jobs while you run yours.
          </p>
          <div className="retainer-grid">
            <div className="retainer-card featured">
              <div className="retainer-price">
                $497
                <span style={{ fontSize: "0.9rem", fontWeight: 400 }}>/mo</span>
              </div>
              <p className="retainer-name">Run For You — Included</p>
              <ul className="retainer-items">
                <li>
                  <span>✦</span> Hosting and the AI chat, kept live 24/7
                </li>
                <li>
                  <span>✦</span> Instant lead alerts and follow-up emails,
                  running
                </li>
                <li>
                  <span>✦</span> Review requests after every job
                </li>
                <li>
                  <span>✦</span> A 1-page monthly report: chats, leads,
                  bookings
                </li>
                <li>
                  <span>✦</span> Small updates — words, prices, services,
                  hours
                </li>
              </ul>
            </div>
          </div>
          <p className="retainer-intro">
            Not included, and not sold here: advertising, text-message (SMS)
            systems, a CRM, social media posts, logo design. This page sells
            one system. If it's not in the list above, it isn't part of the
            offer.
          </p>

          <p className="compare-title">Why Not a Regular Website?</p>
          <div className="compare-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>What Matters</th>
                  <th>Typical Website</th>
                  <th>Excelsus Booking System</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>After-hours visitors</td>
                  <td>Nothing happens — they leave and book a competitor</td>
                  <td className="new-way">
                    AI chat answers and captures the lead, 24/7
                  </td>
                </tr>
                <tr>
                  <td>Lead follow-up</td>
                  <td>You call back when you notice — if you notice</td>
                  <td className="new-way">
                    Instant alert to you + instant reply to the customer, in
                    seconds
                  </td>
                </tr>
                <tr>
                  <td>Online booking</td>
                  <td>A phone number, business hours only</td>
                  <td className="new-way">Booking on every page, any hour</td>
                </tr>
                <tr>
                  <td>Past customers</td>
                  <td>The list sits in a drawer, unused</td>
                  <td className="new-way">
                    Reactivation campaign emailed in Week 1
                  </td>
                </tr>
                <tr>
                  <td>Reviews</td>
                  <td>You hope happy customers remember</td>
                  <td className="new-way">
                    Automatic review request after every job
                  </td>
                </tr>
                <tr>
                  <td>Monthly proof</td>
                  <td>None — you guess what the site did</td>
                  <td className="new-way">
                    1-page report: chats, leads, bookings
                  </td>
                </tr>
                <tr>
                  <td>Built for</td>
                  <td>Any business, which means no business</td>
                  <td className="new-way">Pest control companies only</td>
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
              From Demo Call to Booked Jobs in 7 Days.
            </h2>
          </div>
          <div className="process-steps">
            {[
              {
                num: "01",
                label: "Demo Call",
                time: "Day 0",
                desc: "15 minutes. You see a live demo and exactly what the system does. If it's not a fit, I'll tell you.",
              },
              {
                num: "02",
                label: "Say Yes",
                time: "Day 0",
                desc: "$997 setup, paid online. No payment, no build — that keeps both of us serious.",
              },
              {
                num: "03",
                label: "Intake",
                time: "Day 1",
                desc: "A 15-minute form: services, prices, hours, areas. You approve one page of facts — that's all the AI chat is allowed to say.",
              },
              {
                num: "04",
                label: "Build & Test",
                time: "Days 2–6",
                desc: "I build the system, then we test a real lead together: the chat answers, the emails fire, the booking lands.",
              },
              {
                num: "05",
                label: "Launch + Campaign",
                time: "Day 7",
                desc: "Your site goes live on your domain — and your past-customer campaign goes out in Week 1.",
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
              <p>Established Pest Companies</p>
              <p>50+ Google reviews and routes you want fuller</p>
            </div>
            <div className="audience-card">
              <p>Owners Missing After-Hours Leads</p>
              <p>Your phone can't answer at 9pm. Your website can.</p>
            </div>
            <div className="audience-card">
              <p>Companies With a Past-Customer List</p>
              <p>Old customers are the cheapest new jobs you own</p>
            </div>
            <div className="audience-card">
              <p>Tampa & Orlando</p>
              <p>Local to Florida, bilingual — English & Spanish</p>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO BANNER */}
      <div className="manifesto-banner">
        <blockquote>
          "I'm not a web agency guessing what businesses need. I'm an AI
          engineer. I build one system, for one industry, on the same stack I
          run my own platforms on — and I'll show you it working before you
          pay me a dollar."
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
              and your booking system gets the same engineering, the same
              stack, and the same accountability.
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
                  under a week. Same engineering, applied to a local business
                  that lives on leads.
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
            <span>Your After-Hours Leads.</span>
          </h2>
          <p className="contact-copy">
            15 minutes. We open your current site next to a live demo. You see
            exactly what happens today when a customer finds you at night —
            and what changes with the system. The price is already on this
            page; there are no surprises on the call.
          </p>
          <div className="contact-btn-row">
            <a
              href="mailto:alejandriosity@gmail.com?subject=Demo Call — Excelsus Agency&body=Hi Miguel,%0A%0AI run a pest control company and I'd like to book a 15-minute demo call.%0A%0A[Company name / city / current website]"
              className="btn-primary"
            >
              Book a Demo Call
            </a>
            <a href="#pricing" className="btn-ghost">
              Back to the Offer
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
              <span className="val">Tampa · Orlando, FL</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-brand">EXCELSUS AGENCY</div>
            <p className="footer-tag">Booking Systems for Pest Control Companies</p>
          </div>
          <div className="footer-links">
            <a href="#pricing">The System</a>
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
            <span>The system · Pricing · What's included</span>
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
          {chatOpen ? "✕" : "⚔"}
        </button>
      </div>
    </div>
  );
}
