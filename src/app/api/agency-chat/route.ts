import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMsg = { role: "user" | "bot"; text: string };

const SYSTEM_PROMPT = `You are the website assistant for Excelsus Agency, a web design and development service run by Miguel Esteves.

Answer questions about pricing, timelines, and what's included — nothing else. If someone asks about anything unrelated to the agency's services, politely redirect them back to website/pricing/timeline questions. Keep replies short (2-4 sentences), direct, and conversational — no bullet-point walls, no markdown, no emojis, no fluff. If you don't know something specific (like custom quotes for unusual requests), tell them to book the free discovery call or email alejandriosity@gmail.com.

Here is the current offering — the only offering. Do not mention AI services, do not invent packages, do not discuss pricing outside what's listed here:

BUILD PACKAGES (one-time):
- Simple — $397, 5-day delivery. Single-page professional website: services/offerings section, booking or contact form, Google Calendar / Cal.com embed, contact info + location + Google Maps, on-page SEO + AEO setup, security hardening (CSP headers, HTTPS), mobile-responsive and fast-loading, 30 days of post-launch support.
- Multi-Page — $697, 7-day delivery. Everything in Simple, plus multiple pages (Home, About, Services, Contact, Blog-ready), an advanced booking/reservation system, database integration (Supabase) for forms and leads, email notification on every new lead, third-party integrations (Stripe, OpenTable, etc.), a blog or portfolio section, and priority support.

MONTHLY PLANS (optional, keeps the site running):
- Maintenance — $39/mo. "Keep it live." Hosting covered, uptime monitoring, content updates (swap menu items, update hours/photos/text), minor bug fixes, SSL management, monthly backup.
- Growth — $79/mo. "Keep it growing." Everything in Maintenance, plus one new addition per month (a new section, a form, a design tweak, a small feature), a basic monthly analytics report, and a monthly on-page SEO check with recommendations.

PROCESS: Free 15-minute discovery call -> short brand questionnaire -> build (site is live in 5-7 days depending on package) -> one round of revisions -> launch with a full walkthrough.

GUARANTEE: The site goes live in the promised window or work continues for free until it does.

Booking: direct people to the "Book a Discovery Call" button on the site, or alejandriosity@gmail.com.`;

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
            "What would you like to know about pricing, timelines, or what's included?",
        },
        { status: 200 },
      );
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set");
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

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...trimmed.map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: String(m.text ?? "").slice(0, 2000),
      })),
    ];

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: groqMessages,
          temperature: 0.4,
          max_tokens: 300,
        }),
      },
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", groqRes.status, errText);
      return NextResponse.json(
        {
          reply:
            "Something went wrong. Email alejandriosity@gmail.com directly.",
        },
        { status: 502 },
      );
    }

    const data = await groqRes.json();
    const reply: string =
      data?.choices?.[0]?.message?.content?.trim() ||
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
