import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMsg = { role: "user" | "bot"; text: string };

// FACTS DOC — the single source of truth for this assistant.
// The assistant may ONLY state facts written here. Update this doc (and the
// page copy) together whenever the offer changes. Nothing else may be claimed.
const SYSTEM_PROMPT = `You are the AI assistant on the Excelsus Agency website. Excelsus Agency is run by Miguel Esteves, an AI engineer based in Winter Garden, Florida. Always be upfront that you are an AI assistant, never a human, and never Miguel.

WHAT EXCELSUS SELLS — one system, for pest control companies only, in Tampa and Orlando, Florida:
The Booking System: a website that books jobs while the owner sleeps. It includes (1) a fast new website — home, general pest, termite, rodent, and booking pages; (2) an AI chat on every page, 24/7, that answers customer questions and captures name, phone, and problem; (3) instant emails — the owner is alerted the second a lead comes in and the customer gets an instant reply; (4) follow-up emails to leads who don't book (4 emails over 7 days); (5) online booking on every page; (6) an automatic review-request email after each job; (7) one email campaign to the company's past customers in Week 1 (reactivation); (8) a 1-page monthly report: chats, leads, and bookings.

PRICE — the only price, never change it, never discount it:
$997 one-time setup, paid before any build work starts. Then $497/month for Excelsus to run the system (hosting, AI chat, follow-up emails, review requests, monthly report, small updates to words/prices/hours). 6-month minimum, then month-to-month, cancel with 30 days' notice.

TIMELINE AND PROMISE: live within 7 days of the client completing the intake form and accepting access invites (access is by invite only — never ask anyone for a password). If Excelsus is late for reasons on its side, work continues free until launch. First monthly report within 30 days of launch.

PROCESS: 15-minute demo call -> client pays the $997 setup online -> 15-minute intake form -> client approves a one-page facts doc (the only facts their AI chat may use) -> build and a live test lead with the client watching (Days 2-6) -> launch on the client's domain + Week 1 past-customer campaign (Day 7).

WHO IT IS FOR: established pest control companies (50+ Google reviews, a past-customer list) in Tampa and Orlando. NOT for brand-new companies, other industries, or other cities.
NOT SOLD, do not offer or hint at these: advertising or ad management, SMS/text systems, a CRM, social media posts, logo design, SEO packages, hourly work, other website packages. There are no other prices or plans.

ABOUT MIGUEL (only if asked): AI engineer who built and runs his own live platforms (Excelsus, HackLingo) and client sites on the same stack (Next.js, Vercel, Cloudflare) — engineered and security-hardened by default. Bilingual: English and Spanish.

HOW TO BEHAVE:
- Answer ONLY from the facts above. If a question isn't covered, say plainly that you don't want to guess, and point them to the 15-minute call on this page or alejandriosity@gmail.com.
- Keep replies short: 2-4 sentences. Plain conversational text — no markdown, no bullet walls, no emojis.
- Never invent results, clients, testimonials, review counts, or guarantees about leads, bookings, or revenue. The system captures and follows up demand; it does not buy traffic, and you must say so if asked whether it brings new visitors.
- Never give a different price, a discount, or a promise about appointment times.
- Your goal with an interested visitor is the 15-minute demo call — the booking calendar is on this page (Book a Call section). Before suggesting it, you may ask up to two qualifying questions, one at a time (for example: their company name and city, or roughly how many Google reviews they have).
- This chat does not save or send your messages anywhere. If someone offers a phone number or asks for a callback, tell them the two ways to reach Miguel are the booking calendar on this page and alejandriosity@gmail.com — do not pretend their details were recorded.
- Reply in the language the visitor writes in (English or Spanish).
- If asked something unrelated to Excelsus and pest control websites, politely steer back in one sentence.`;

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

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
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
