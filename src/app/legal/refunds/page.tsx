import Link from "next/link";

export default function RefundsPage() {
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
          Refund Policy
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
              h: "General Policy",
              body: "The Excelsus operates on a no-refund policy for monthly subscriptions. When you subscribe, you gain immediate access to all content and features within your tier. Because of this immediate access, we do not issue refunds for current or past billing periods.",
            },
            {
              h: "Cancellation",
              body: "You may cancel your subscription at any time. Your access continues until the end of the paid billing period. After cancellation, no further charges will be made.",
            },
            {
              h: "7-Day Exception",
              body: "If you are a first-time subscriber and have not accessed more than 10% of the curriculum content, you may request a refund within 7 days of your initial payment. Contact support@excelsus.live with your account email to request this.",
            },
            {
              h: "Billing Errors",
              body: "If you were charged in error (duplicate charge, charge after cancellation confirmation, etc.), contact us immediately at support@excelsus.live and we will resolve it within 5 business days.",
            },
            {
              h: "Contact",
              body: "For refund-related inquiries: support@excelsus.live",
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
