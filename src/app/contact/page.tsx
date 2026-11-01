import Link from "next/link";

export default function ContactPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--stone)",
        padding: "6rem 1.5rem 4rem",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
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
          Reach Out
        </p>
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "2.5rem",
          }}
        >
          Contact
        </h1>
        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.12)",
            paddingTop: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {[
            { label: "General Inquiries", email: "hello@excelsus.live" },
            { label: "Support", email: "support@excelsus.live" },
            { label: "Partnerships & Mentors", email: "partners@excelsus.live" },
            { label: "Legal", email: "legal@excelsus.live" },
          ].map((c) => (
            <div
              key={c.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(201,168,76,0.08)",
                paddingBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--iron)",
                }}
              >
                {c.label}
              </span>
              <a
                href={`mailto:${c.email}`}
                style={{
                  fontSize: "0.88rem",
                  color: "var(--gold)",
                  textDecoration: "none",
                }}
              >
                {c.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
