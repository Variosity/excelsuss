import Link from "next/link";

export default function CookiesPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--stone)",
        padding: "6rem 1.5rem 4rem",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "3rem",
          }}
        >
          ← Back to The Excelsus
        </Link>
        <p
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.75rem",
          }}
        >
          Legal
        </p>
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "0.5rem",
          }}
        >
          Cookie Policy
        </h1>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--iron)",
            marginBottom: "3rem",
          }}
        >
          Last updated: June 2026
        </p>
        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.12)",
            paddingTop: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {[
            {
              h: "What Are Cookies",
              body: "Cookies are small text files stored on your device by your browser. They help websites remember information about your visit.",
            },
            {
              h: "Essential Cookies",
              body: "We use strictly necessary cookies to authenticate your session, maintain your login state, and secure the platform. These cannot be disabled as they are required for the site to function.",
            },
            {
              h: "Analytics Cookies",
              body: "We may use anonymous analytics to understand how users interact with the platform — page visits, time on content, feature usage. This data is aggregated and never tied to personally identifiable information.",
            },
            {
              h: "Third-Party Cookies",
              body: "Stripe (our payment processor) may set cookies during the checkout flow. These are governed by Stripe's own cookie policy.",
            },
            {
              h: "Your Choices",
              body: "You can configure your browser to block or delete cookies, but doing so will prevent you from logging in and using the platform.",
            },
            {
              h: "Contact",
              body: "Cookie-related questions: privacy@excelsus.live",
            },
          ].map((s) => (
            <div key={s.h}>
              <h2
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.75rem",
                }}
              >
                {s.h}
              </h2>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--parchment-dim)",
                  lineHeight: 1.8,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
