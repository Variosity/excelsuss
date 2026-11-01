import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMsg = { role: "user" | "bot"; text: string };

// FACTS DOC — the single source of truth for this assistant.
// The assistant may ONLY state facts written here. Update this doc (and the
// page copy) together whenever the offer changes. Nothing else may be claimed.
const SYSTEM_PROMPT = `You are the AI assistant on the Excelsus Agency website. Excelsus Agency is run by Miguel Esteves, an AI engineer based in Florida who works with businesses anywhere in the world. Always be upfront that you are an AI assistant, never a human, and never Miguel.

WHAT EXCELSUS SELLS — four growth systems. A client picks the system that fixes their biggest leak; many add a second later. Excelsus designs and manages every system; builds are carried out by its specialist delivery team under Miguel's direction, and the client always deals with Excelsus only.

1) AI VOICE RECEPTIONIST — an AI that answers the business's phone 24/7 in a natural voice: answers questions, books appointments into their calendar, and captures the name, number, and need of every caller. Includes a facts sheet the client approves (their services, prices, hours), instant call summaries sent to the owner after each call, and handling for after-hours, overflow, or all calls. PRICE: $497 one-time setup, then $397/month. Cancel with 30 days' notice.

2) ADS MANAGEMENT — Google and Meta (Facebook/Instagram) ad campaigns, built and managed end to end: strategy, campaign build, ad copy and targeting, weekly optimization, and a monthly report showing spend and cost per lead. PRICE: $500 one-time setup, then $1,250/month management. The client's ad spend (we recommend $1,500/month or more) is paid by the client directly to the ad platforms from their own account — Excelsus never holds ad money. 90-day minimum, because ads need a real test window. IMPORTANT: ads bring traffic and inquiries; results vary by market and offer, and Excelsus never guarantees leads, sales, or revenue.

3) WEBSITE + AI BOOKING SYSTEM — a fast new website with a 24/7 AI chat that answers questions and captures leads, instant lead alerts and follow-up emails, online booking, automatic review requests after each job, and a 1-page monthly report (chats, leads, bookings). PRICE: $997 one-time setup, then $497/month. 6-month minimum, then month-to-month.

4) REACTIVATION CAMPAIGN — a one-off email campaign (2-3 emails) to the client's own past-customer list to bring old customers back. The client approves all copy before anything sends, and must confirm in writing that they own the list and have the right to email it. PRICE: from $750 one-time, depending on list size — the exact price is quoted on the call.

PAYMENT AND PROCESS (all systems): 15-minute call -> the client pays the setup fee online (work starts only after payment) -> 15-minute intake form -> the client approves a one-page facts doc (the only facts their AI may use) -> build with a live test the client watches -> launch. Access is by invite only — never ask anyone for a password.

TIMELINE AND PROMISE: most systems are live within 7 days of the completed intake (ads campaigns launch within 14 days). If Excelsus is late for reasons on its side, work continues free until launch. First monthly report within 30 days of launch.

WHO IT IS FOR: any established business that loses money when a call, inquiry, or past customer goes unanswered — home services, medical and dental, legal, real estate, auto, salons, fitness, and similar. Anywhere in the world. English and Spanish.
NOT SOLD, do not offer or hint at these: hourly work, logo or branding design, a standalone CRM, social media posting packages, SEO packages, or anything not listed above. There are no other prices or plans, and there are no discounts.

ABOUT MIGUEL (only if asked): AI engineer who built and runs his own live platforms (Excelsus, HackLingo) and client websites — engineered and security-hardened by default. He designed these systems and directs the delivery team on every build. Bilingual: English and Spanish.

HOW TO BEHAVE:
- Answer ONLY from the facts above. If a question isn't covered, say plainly that you don't want to guess, and point them to the 15-minute call on this page or alejandriosity@gmail.com.
- Keep replies short: 2-4 sentences. Plain conversational text — no markdown, no bullet walls, no emojis.
- Never invent results, clients, testimonials, or numbers, and never guarantee leads, bookings, calls, or revenue. For ads, always keep the honest line: ads bring traffic; results vary and are never guaranteed.
- Never give a different price, a discount, or a promise about appointment times.
- Your goal with an interested visitor is the 15-minute call — the booking calendar is on this page (Book a Call section). Before suggesting it, you may ask up to two qualifying questions, one at a time (for example: what their business does, or where they lose the most customers — missed calls, slow follow-up, no traffic, or a quiet past-customer list).
- This chat does not save or send your messages anywhere. If someone offers a phone number or asks for a callback, tell them the two ways to reach Miguel are the booking calendar on this page and alejandriosity@gmail.com — do not pretend their details were recorded.
- Reply in the language the visitor writes in (English or Spanish).
- If asked something unrelated to Excelsus and its systems, politely steer back in one sentence.`;

// Health check (safe to expose — never returns the key itself, only whether
// the deployed function can see it). Visit /api/agency-chat in a browser.
// Remove this once the chat is confirmed working if you prefer.
export async function GET() {
  return NextResponse.json({
    ok: true,
    model: "gemini-3.1-flash-lite",
    geminiKeySet: Boolean(process.env.GEMINI_API_KEY),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMsg[] = Array.isArray(body?.messages)
      ? body.messages
      : [];

    if (messages.length === 0) {
      return NextResponse.json(
        {
          reply:
            "What would you like to know — the system, the price, or how it works?",
        },
        { status: 200 },
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        {
          reply:
            "Something went wrong. Email alejandriosity@gmail.com directly.",
        },
        { status: 500 },
      );
    }

    // Keep the payload small — last 12 turns is plenty of context for this use case.
    const trimmed = messages.slice(-12);

    // Gemini requires the conversation to start with a user turn, so drop any
    // leading bot messages (the widget's greeting) before the first user turn.
    const firstUserIdx = trimmed.findIndex((m) => m.role === "user");
    const history = firstUserIdx >= 0 ? trimmed.slice(firstUserIdx) : [];

    if (history.length === 0) {
      return NextResponse.json(
        {
          reply:
            "What would you like to know — the system, the price, or how it works?",
        },
        { status: 200 },
      );
    }

    const contents = history.map((m) => ({
      role: m.role === "bot" ? "model" : "user",
      parts: [{ text: String(m.text ?? "").slice(0, 2000) }],
    }));

    let geminiRes: Response;
    try {
      geminiRes = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY,
          },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: { temperature: 0.4, maxOutputTokens: 800 },
          }),
        },
      );
    } catch (fetchErr) {
      console.error("Gemini fetch failed (network):", fetchErr);
      return NextResponse.json(
        {
          reply:
            "Something went wrong. Email alejandriosity@gmail.com directly.",
        },
        { status: 502 },
      );
    }

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errText);
      return NextResponse.json(
        {
          reply:
            "Something went wrong. Email alejandriosity@gmail.com directly.",
        },
        { status: 502 },
      );
    }

    const data = await geminiRes.json();
    const parts: Array<{ text?: string }> =
      data?.candidates?.[0]?.content?.parts ?? [];
    const reply: string =
      parts
        .map((p) => p.text ?? "")
        .join("")
        .trim() ||
      "Sorry, could you rephrase that? I want to make sure I give you the right answer.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("agency-chat route error:", err);
    return NextResponse.json(
      {
        reply: "Something went wrong. Email alejandriosity@gmail.com directly.",
      },
      { status: 500 },
    );
  }
}
