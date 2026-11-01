import Link from "next/link";

export default function PrivacyPage() {
  const updated = "June 2026";
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
          Privacy Policy
        </h1>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--iron)",
            marginBottom: "3rem",
          }}
        >
          Last updated: {updated}
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
              h: "Information We Collect",
              body: "We collect information you provide directly: name, email address, payment information processed securely via Stripe, and any profile information you choose to add. We also collect usage data including pages visited, features used, and progress through curriculum content.",
            },
            {
              h: "How We Use Your Information",
              body: "Your information is used to operate and improve The Excelsus platform, process payments, communicate with you about your membership, and personalize your experience. We do not sell your personal information to third parties.",
            },
            {
              h: "Payment Processing",
              body: "All payment processing is handled by Stripe. We do not store your full credit card details on our servers. Stripe's privacy policy governs the handling of your payment information.",
            },
            {
              h: "Data Retention",
              body: "We retain your account data for as long as your account is active. You may request deletion of your account and associated data at any time by contacting us.",
            },
            {
              h: "Cookies",
              body: "We use essential cookies to maintain your session and authenticate your account. See our Cookie Policy for more detail.",
            },
            {
              h: "Your Rights",
              body: "Depending on your jurisdiction, you may have rights including access, correction, deletion, and portability of your personal data. Contact us to exercise any of these rights.",
            },
            {
              h: "Contact",
              body: "For privacy-related inquiries: privacy@excelsus.live",
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
