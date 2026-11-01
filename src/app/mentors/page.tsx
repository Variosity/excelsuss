import Link from "next/link";

export default function MentorsPage() {
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
          The Council
        </p>
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "1rem",
          }}
        >
          Mentors
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            color: "var(--parchment-dim)",
            lineHeight: 1.85,
            marginBottom: "3rem",
          }}
        >
          The Excelsus mentor council is being assembled. We are bringing in men
          who have built real wealth, achieved real mastery, and are willing to
          transfer what they know — not just what sounds good.
        </p>
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.15)",
            padding: "2.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.72rem",
              fontStyle: "italic",
              color: "var(--gold-dim)",
              marginBottom: "1rem",
            }}
          >
            Excelsus Tier members gain direct access to mentor sessions
          </p>
          <Link
            href="/auth/signup?plan=excelsus"
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "var(--gold)",
              color: "#0F0D0B",
              padding: "0.8rem 2rem",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Join as Excelsus
          </Link>
        </div>
      </div>
    </div>
  );
}
