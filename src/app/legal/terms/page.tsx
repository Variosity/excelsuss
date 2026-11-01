import Link from "next/link";

export default function TermsPage() {
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
          Terms of Service
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
              h: "Acceptance of Terms",
              body: "By accessing and using The Excelsus platform, you accept and agree to be bound by these Terms of Service. If you do not agree, do not use the platform.",
            },
            {
              h: "Membership & Billing",
              body: "Memberships are billed monthly on a recurring basis. You may cancel at any time from your account dashboard. Cancellation takes effect at the end of the current billing period. No partial refunds are issued for unused time within a billing period unless required by law.",
            },
            {
              h: "Acceptable Use",
              body: "You agree to use The Excelsus for lawful purposes only. You may not share your account credentials, resell or redistribute platform content, scrape or copy curriculum materials, or use the platform to harass other members.",
            },
            {
              h: "Intellectual Property",
              body: "All content on The Excelsus — curriculum, videos, written materials, branding — is the property of The Excelsus and protected by applicable intellectual property laws. References to third-party works (such as books by Robert Greene, Sun Tzu, etc.) are for educational discussion purposes only.",
            },
            {
              h: "Disclaimer of Warranties",
              body: 'The platform is provided "as is." We make no guarantees regarding financial results, income, or outcomes from following curriculum content. Results depend entirely on your own effort, decisions, and circumstances.',
            },
            {
              h: "Limitation of Liability",
              body: "To the maximum extent permitted by law, The Excelsus shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.",
            },
            {
              h: "Governing Law",
              body: "These terms are governed by applicable law. Disputes shall be resolved through binding arbitration unless prohibited by your local jurisdiction.",
            },
            { h: "Contact", body: "Legal inquiries: legal@excelsus.live" },
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
