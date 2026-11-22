"use client";

/**
 * EXCELSUS — OnlyFans Management Agency Landing Page
 * Drop-in for a Next.js App Router project:
 *   1. Copy this file to  src/app/talent/page.tsx   (or src/app/page.tsx)
 *   2. Requires Tailwind CSS. No extra packages needed.
 *   3. Booking form POSTs to /api/excelsus-apply — wire that route to your
 *      email / CRM / Telegram / Calendly. A ready stub is in route.ts.txt
 *   4. Replace the placeholder hero image URLs with your own shoot photos
 *      in /public/excelsus/  — keep them tasteful / platform-safe for ads.
 *
 * NO PRICES are shown anywhere, by design.
 * Earnings figures are industry-published / self-reported — sources are
 * listed in the footer so the page stays honest and legally safe.
 */

import { useState } from "react";

const CAL_LINK = "https://cal.com/miguelesteves/15min";

/* ---------------------------------- data --------------------------------- */

const STATS = [
  { value: "$131–$180", label: "Median creator / month, solo", note: "What most creators actually take home alone" },
  { value: "$1,243", label: "Top 10% threshold / month", note: "Where a managed page starts to become real income" },
  { value: "$20,500+", label: "Top 1% threshold / month", note: "March 2026 creator-reported threshold" },
  { value: "$110,000+", label: "Top 0.1% threshold / month", note: "The gallery level. This is the room we curate for." },
  { value: "33%", label: "Of ALL OnlyFans revenue", note: "Captured by the top 1% of creators alone" },
  { value: "30–60%", label: "Revenue uplift reported", note: "When a good agency takes over chats, pricing & PPV" },
];

const TOP_EARNERS = [
  { name: "Sophie Rain", figure: "$100M+", detail: "Self-reported lifetime earnings, May 2023 – Jan 2026. Built with a full team behind content, virality & DMs." },
  { name: "Bhad Bhabie", figure: "$57M+ net", detail: "$1M in her first 6 hours. $32M+ of her net came from DMs alone — not subscriptions." },
  { name: "Corinna Kopf", figure: "$67M", detail: "Self-reported over ~3 years. A managed, cross-platform funnel, not luck." },
  { name: "Amouranth", figure: "$1.5M / mo at peak", detail: "~$57M over 4 years. $26.5M from paid messages — the chat is the business." },
  { name: "Bella Thorne", figure: "$1M in 24 hours", detail: "First creator to do it. A launch engineered like a premiere, not a post." },
];

const COMPETITORS = [
  {
    name: "Creators Inc",
    based: "Los Angeles + Miami",
    does: "Full management, celebrity launches, claims $2B+ in creator sales. Big roster, big machine.",
    gap: "You are one name on a very long roster.",
  },
  {
    name: "Unruly Agency",
    based: "Los Angeles",
    does: "Mainstream influencer → OnlyFans transitions, brand deals, full-service chats & marketing.",
    gap: "Built for already-famous influencers first.",
  },
  {
    name: "Bunny Agency / TDM / Behave",
    based: "US / UK / LA",
    does: "24/7 chatters, PPV scripts, Reddit / TikTok / X promotion, account management.",
    gap: "Playbook-driven. The same funnel for everybody.",
  },
];

const SERVICES = [
  { title: "We Post For You", body: "OnlyFans, Fansly, X, Reddit, TikTok, Instagram — planned, captioned, scheduled and posted by us. You never stare at a blank caption again." },
  { title: "We Chat For You — In Your Voice", body: "Trained chatters who learn how you talk, flirt and tease. DMs and PPV are where the real money lives — Amouranth made $26.5M there. We never let a whale go cold." },
  { title: "We Direct Your Shoots", body: "In-house photographers, creative direction, outfits, sets, lighting and poses — directed with you, hand in hand, on the day. You show up and be the art. We build the scene around you." },
  { title: "We Chase Trends Before They Peak", body: "Daily trend intel: sounds, formats, niches, viral hooks and platform shifts — translated into a shoot list made only for your body, your persona, your audience." },
  { title: "We Build Your Persona", body: "Positioning, pricing, bundles, PPV strategy, menus, welcome messages and retention — tailored to you, not copied from another girl's page." },
  { title: "We Protect You", body: "Leak monitoring & DMCA takedowns, privacy screening, geo-blocking help, and a team that treats your boundaries as law. Your limits are written into your plan." },
];

const FOR_WHO = ["Women", "Trans creators", "Gay creators", "Couples", "Alt / cosplay / e-girls", "Femme, masc & everyone between", "Brand new, no page yet", "Already earning & stuck"];

export default function ExcelsusTalentPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", stageName: "", email: "", social: "", identity: "",
    currentEarnings: "", followers: "", date: "", time: "", goal: "", consent: false,
  });
  const set = (k: keyof typeof form) => (e: any) =>
    setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/excelsus-apply", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "excelsus-talent-landing" }),
      });
    } catch { /* still show confirmation — also log in your CRM route */ }
    setLoading(false); setSent(true); window.open(CAL_LINK, "_blank", "noreferrer");
  }

  const input =
    "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder:text-white/35 outline-none backdrop-blur transition focus:border-rose-400/70 focus:bg-white/[0.09] focus:ring-2 focus:ring-rose-500/30";
  const label = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-200/70";

  return (
    <main className="min-h-screen overflow-x-clip bg-[#0a0508] font-sans text-white antialiased selection:bg-rose-600 selection:text-white">
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-rose-600/25 blur-[140px]" />
        <div className="absolute right-[-10rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-700/20 blur-[120px]" />
        <div className="absolute bottom-[-8rem] left-[-6rem] h-[26rem] w-[26rem] rounded-full bg-red-800/20 blur-[120px]" />
      </div>

      {/* nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-10">
        <div className="text-2xl font-black tracking-[0.35em]">EXCELSUS<span className="text-rose-500">.</span></div>
        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 md:flex">
          <a href="#numbers" className="hover:text-white">The Numbers</a>
          <a href="#experience" className="hover:text-white">The Experience</a>
          <a href="#proof" className="hover:text-white">The Proof</a>
          <a href="#apply" className="hover:text-white">Apply</a>
        </div>
        <a href={CAL_LINK} target="_blank" rel="noreferrer" className="rounded-full bg-gradient-to-r from-rose-600 to-red-500 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] shadow-lg shadow-rose-900/50 transition hover:scale-[1.03]">Book a Call</a>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-10 text-center lg:px-10 lg:pt-16">
        <p className="mx-auto mb-6 w-fit rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-rose-200">
          OnlyFans Management — For Women · Trans · Gay · Couples · Alt
        </p>
        <h1 className="mx-auto max-w-5xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          You are the <span className="bg-gradient-to-r from-rose-400 via-rose-500 to-amber-300 bg-clip-text text-transparent italic">art.</span><br />
          We are your <span className="bg-gradient-to-r from-amber-200 via-rose-400 to-fuchsia-500 bg-clip-text text-transparent italic">curators.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
          A masterpiece doesn't sell itself on the side of the road. It belongs in a world-class
          gallery — lit perfectly, placed in front of the right collectors, and sold for what it's
          truly worth. <strong className="text-white">That's Excelsus.</strong> You create. We do
          absolutely everything else.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={CAL_LINK} target="_blank" rel="noreferrer" className="w-full rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-red-500 px-9 py-4 text-sm font-black uppercase tracking-[0.15em] shadow-2xl shadow-rose-900/60 transition hover:scale-[1.03] sm:w-auto">Book My Private Appointment</a>
          <a href="#numbers" className="w-full rounded-full border border-white/20 bg-white/5 px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] backdrop-blur transition hover:bg-white/10 sm:w-auto">See The Real Numbers ↓</a>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">100% confidential · No obligation · All identities welcome · 18+ only</p>

        <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {FOR_WHO.map((x) => (
            <span key={x} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/75">{x}</span>
          ))}
        </div>
      </section>

      {/* THE ANALOGY */}
      <section className="relative z-10 border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-10">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">Posting alone</p>
            <h3 className="mt-3 text-3xl font-black text-white/80">Art on the side of the road</h3>
            <ul className="mt-6 space-y-3 text-white/60">
              <li>✕ You shoot, edit, caption, post, chat, promote — alone, every day</li>
              <li>✕ Guessing at prices, trends and what your fans actually want</li>
              <li>✕ DMs dying while you sleep. Whales leaving unseen.</li>
              <li>✕ Burnout, inconsistency, an algorithm that forgets you</li>
              <li>✕ Median result: <strong className="text-white">$131–$180 a month</strong></li>
            </ul>
          </div>
          <div className="relative rounded-3xl border border-rose-400/30 bg-gradient-to-br from-rose-950/80 via-[#1a0812] to-black p-8 shadow-2xl shadow-rose-950/50">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-300">With Excelsus</p>
            <h3 className="mt-3 text-3xl font-black">Art in the gallery — sold like a masterpiece</h3>
            <ul className="mt-6 space-y-3 text-white/80">
              <li>✓ A curator, director, photographer &amp; team pouring everything into <em>you</em></li>
              <li>✓ Every post, chat, idea and trend handled — you don't have to think</li>
              <li>✓ Your work placed in front of the audience that pays for it</li>
              <li>✓ A persona and a price built around your worth, not your desperation</li>
              <li>✓ Your only job: <strong className="text-white">show up and work your craft</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section id="numbers" className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-rose-400">No fantasy. Published numbers.</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-center text-4xl font-black leading-tight sm:text-5xl">The gap isn't talent.<br />It's the team behind the talent.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-white/65">
          OnlyFans paid creators roughly <strong className="text-white">$6.2 billion in its last reported year</strong> —
          but the money is brutally concentrated. The top 1% take a third of everything.
          Solo creators don't lose because they're not desirable. They lose because one person
          cannot shoot, direct, edit, market, chat 24/7 and study trends at the same time.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-rose-400/40 hover:bg-white/[0.05]">
              <div className="bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-4xl font-black text-transparent">{s.value}</div>
              <div className="mt-2 font-bold">{s.label}</div>
              <p className="mt-1 text-sm text-white/55">{s.note}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-amber-300/20 bg-amber-400/[0.05] p-7 text-center">
          <p className="text-lg leading-relaxed text-white/80">
            Do the maths on a real agency case study: one creator went from{" "}
            <strong className="text-white">$2,298/month solo</strong> to a{" "}
            <strong className="text-white">$76,521 peak month</strong> in her tenth month with a
            full team running marketing, editing, chats and pricing behind her.
            Same woman. Same craft. Different curation.
          </p>
        </div>
      </section>

      {/* EXPERIENCE / SERVICES */}
      <section id="experience" className="relative z-10 border-y border-white/10 bg-gradient-to-b from-transparent via-rose-950/20 to-transparent">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-400">Hand in hand. Literally.</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">You never do this alone again.</h2>
          <p className="mt-5 max-w-2xl text-lg text-white/65">
            This is not a dashboard and a monthly report. This is a small, obsessed team in your
            corner every day — leading you, directing you, hyping you, and handling every boring,
            draining, money-leaking task so your energy goes only into your craft.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <article key={s.title} className="group rounded-3xl border border-white/10 bg-black/40 p-7 transition hover:-translate-y-1 hover:border-rose-400/50">
                <div className="text-sm font-black text-rose-500">0{i + 1}</div>
                <h3 className="mt-3 text-xl font-black">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-white/60">{s.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:grid-cols-3">
            {[
              ["1 — Your private call", "We learn you: your look, your limits, your fantasies for your career, your income goal. No pitch deck. A real conversation."],
              ["2 — Your curated plan", "Persona, shoot calendar, pricing, content pillars and a launch / relaunch strategy built only for you — within days, not weeks."],
              ["3 — We run it, together", "We shoot with you, post for you, chat for you and report to you. You approve your image. We carry the business."],
            ].map(([t, b]) => (
              <div key={t}><h4 className="font-black text-rose-200">{t}</h4><p className="mt-2 text-sm leading-relaxed text-white/60">{b}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF / COMPETITORS */}
      <section id="proof" className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-rose-400">The proof is public</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-center text-4xl font-black leading-tight sm:text-5xl">Nobody at the top is doing it alone.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-white/65">Every name below built their number with managers, chatters, marketers and producers behind them. The difference was never the body. It was the machine — and the curation.</p>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10">
          {TOP_EARNERS.map((c, i) => (
            <div key={c.name} className={`grid gap-2 p-6 sm:grid-cols-[1fr_auto] sm:items-center ${i % 2 ? "bg-white/[0.02]" : "bg-black/30"}`}>
              <div><div className="text-lg font-black">{c.name}</div><p className="mt-1 text-sm text-white/55">{c.detail}</p></div>
              <div className="bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-3xl font-black text-transparent">{c.figure}</div>
            </div>
          ))}
        </div>

        <h3 className="mt-16 text-center text-2xl font-black">What the big agencies do — and where we go further</h3>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {COMPETITORS.map((a) => (
            <div key={a.name} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="font-black">{a.name}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">{a.based}</div>
              <p className="mt-4 text-sm leading-relaxed text-white/65">{a.does}</p>
              <p className="mt-4 border-t border-white/10 pt-4 text-sm font-semibold text-rose-300">The gap: {a.gap}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-3xl bg-gradient-to-r from-rose-700 via-rose-600 to-red-600 p-8 text-center shadow-2xl shadow-rose-950/60">
          <h4 className="text-2xl font-black sm:text-3xl">Excelsus is boutique on purpose.</h4>
          <p className="mx-auto mt-3 max-w-2xl text-white/85">
            Fewer creators. Deeper obsession. Your own photographer, your own director, your own
            strategist who knows your name, your body, your boundaries and your goal — and works
            with you hand in hand until you're hanging in the gallery, not on the roadside.
          </p>
        </div>
      </section>

      {/* INTIMATE PROMISE */}
      <section className="relative z-10 border-y border-white/10 bg-black/40">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-10">
          <h2 className="text-4xl font-black leading-tight sm:text-5xl">Your body. Your art.<br /><span className="italic text-rose-400">Your rules. Always.</span></h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-white/65">
            You set your limits and they are never pushed. You own your account, your content and
            your name. You approve what represents you. We exist to amplify the creator you already
            are — more desired, more seen, more paid — without you ever having to become someone else,
            or carry the business alone at 2am again.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
            {["You own everything", "Boundaries in writing", "Confidential & discreet", "18+ creators only", "Leave-friendly terms discussed on your call"].map((x) => (
              <span key={x} className="rounded-full border border-white/15 px-4 py-2">{x}</span>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="apply" className="relative z-10 mx-auto max-w-4xl px-5 py-24 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-rose-400/25 bg-gradient-to-b from-[#1c0a14] to-black shadow-2xl shadow-rose-950/50">
          <div className="p-8 text-center sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-400">Private application</p>
            <h2 className="mt-3 text-4xl font-black">Book your appointment</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/60">Tell us who you are and where you want to go. We reply personally — a human, not a bot — and everything you share stays confidential.</p>
            <a href={CAL_LINK} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-gradient-to-r from-rose-600 to-red-500 px-8 py-3.5 text-sm font-black uppercase tracking-[0.15em] shadow-xl shadow-rose-900/50 transition hover:scale-[1.03]">Pick My Time on Cal.com →</a>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/40">15 minutes · Private · Or apply below first</p>
          </div>
          {sent ? (
            <div className="px-8 pb-12 text-center sm:px-10">
              <div className="mx-auto w-fit rounded-full bg-rose-600/20 px-6 py-3 text-2xl">♥</div>
              <h3 className="mt-5 text-2xl font-black">You're in. Check your inbox.</h3>
              <p className="mx-auto mt-3 max-w-md text-white/60">Your Cal.com booking window just opened — pick your 15 minutes there if you haven't yet. Come as you are — bring your questions, your limits and your ambition.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-5 px-8 pb-10 sm:grid-cols-2 sm:px-10">
              <div><label className={label}>Your name *</label><input required value={form.name} onChange={set("name")} className={input} placeholder="First name or full name" /></div>
              <div><label className={label}>Stage / creator name</label><input value={form.stageName} onChange={set("stageName")} className={input} placeholder="What your fans know you as" /></div>
              <div><label className={label}>Email *</label><input required type="email" value={form.email} onChange={set("email")} className={input} placeholder="you@email.com" /></div>
              <div><label className={label}>Instagram / X / Telegram *</label><input required value={form.social} onChange={set("social")} className={input} placeholder="@yourhandle" /></div>
              <div><label className={label}>I am a…</label>
                <select value={form.identity} onChange={set("identity")} className={input}>
                  <option value="" className="bg-neutral-900">Select (optional)</option>
                  {["Woman", "Trans woman", "Trans man", "Gay man", "Non-binary", "Couple", "Other / prefer to say on the call"].map((x) => <option key={x} className="bg-neutral-900">{x}</option>)}
                </select></div>
              <div><label className={label}>Current monthly earnings</label>
                <select value={form.currentEarnings} onChange={set("currentEarnings")} className={input}>
                  <option value="" className="bg-neutral-900">Select a range</option>
                  {["Not started yet", "$0 – $500", "$500 – $2,000", "$2,000 – $10,000", "$10,000 – $50,000", "$50,000+"].map((x) => <option key={x} className="bg-neutral-900">{x}</option>)}
                </select></div>
              <div><label className={label}>Followers (all platforms)</label><input value={form.followers} onChange={set("followers")} className={input} placeholder="e.g. 12k IG, 40k X" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={label}>Preferred date *</label><input required type="date" value={form.date} onChange={set("date")} className={input} /></div>
                <div><label className={label}>Preferred time *</label><input required type="time" value={form.time} onChange={set("time")} className={input} /></div>
              </div>
              <div className="sm:col-span-2"><label className={label}>What do you want this to become?</label>
                <textarea rows={4} value={form.goal} onChange={set("goal")} className={input} placeholder="Your income goal, your dream schedule, your limits, what you're tired of doing alone… tell us everything." /></div>
              <label className="flex items-start gap-3 text-sm text-white/60 sm:col-span-2">
                <input required type="checkbox" checked={form.consent} onChange={set("consent")} className="mt-1 h-4 w-4 accent-rose-600" />
                I confirm I am 18 or older and I agree to be contacted privately about Excelsus management. *
              </label>
              <button disabled={loading} className="rounded-full bg-gradient-to-r from-rose-600 to-red-500 px-8 py-4 text-sm font-black uppercase tracking-[0.15em] shadow-xl shadow-rose-900/50 transition hover:scale-[1.02] disabled:opacity-60 sm:col-span-2">
                {loading ? "Sending…" : "Book My Appointment ♥"}
              </button>
              <p className="text-center text-xs text-white/35 sm:col-span-2">Discreet. No spam, no sharing your details, no obligation to sign anything.</p>
            </form>
          )}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10 text-center text-xs leading-relaxed text-white/35 lg:px-10">
        <div className="text-base font-black tracking-[0.35em] text-white/70">EXCELSUS<span className="text-rose-500">.</span></div>
        <p className="mx-auto mt-4 max-w-3xl">
          Earnings figures are industry-published estimates and creator self-reported totals, not guarantees and not
          Excelsus results: median / average creator earnings (~$131–$180/mo), percentile thresholds and the top 1%
          revenue share are compiled from Fenix International filings and creator-reported OnlyFans statistics;
          agency uplift (30–60%) and the $2,298 → $76,521 case study are published agency / industry-guide figures;
          top-earner totals are as self-reported by Sophie Rain, Bhad Bhabie, Corinna Kopf, Amouranth and Bella Thorne.
          Your results depend on your content, consistency and market. Excelsus is a management agency for adult
          creators aged 18+. All models / creators must be 18+.
        </p>
        <p className="mt-4">© {new Date().getFullYear()} Excelsus. All rights reserved.</p>
      </footer>
    </main>
  );
}
