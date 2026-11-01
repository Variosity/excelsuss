import Link from "next/link";

export default function AboutPage() {
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
          Our Mission
        </p>
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "2rem",
          }}
        >
          What Is The Excelsus
        </h1>
        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.12)",
            paddingTop: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
          }}
        >
          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "var(--parchment-dim)",
              lineHeight: 1.85,
            }}
          >
            <em>Excelsus</em> — Latin. Elevated. Lofty. Raised above. It is not
            a destination. It is a direction. Always upward, never finished,
            never satisfied with the man you were yesterday.
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "var(--parchment-dim)",
              lineHeight: 1.85,
            }}
          >
            The Excelsus exists because modern men are being failed — by
            institutions that stripped the curriculum of everything useful, by a
            culture that pathologizes strength, and by a self-help industry that
            sells comfort dressed as growth. We are the answer to all of that.
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "var(--parchment-dim)",
              lineHeight: 1.85,
            }}
          >
            This platform gives men the holistic education they were never
            given: stoicism and philosophy, financial sovereignty, physical
            dominance, psychological mastery, legal autonomy, and spiritual
            identity. Nine pillars. One standard. The pinnacle of what a man can
            become — forged through the ancient disciplines of the Tirocinium
            and the Agoge, rebuilt for the men of this era.
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "var(--parchment-dim)",
              lineHeight: 1.85,
            }}
          >
            This is not motivation content. It is not hustle-culture noise. It
            is a structured, rigorous ascent — built for men who are serious
            about who they are becoming, and serious about the brotherhood they
            leave behind them.
          </p>
          <div
            style={{
              borderLeft: "2px solid rgba(201,168,76,0.4)",
              paddingLeft: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "1rem",
                fontStyle: "italic",
                color: "var(--gold)",
                lineHeight: 1.7,
              }}
            >
              "The goal is not a better version of who you were. The goal is
              someone unrecognizable to who you were."
            </p>
          </div>

          {/* Latin anchor */}
          <div
            style={{
              marginTop: "2rem",
              borderTop: "1px solid rgba(201,168,76,0.1)",
              paddingTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.72rem",
                fontStyle: "italic",
                color: "var(--gold-dim)",
                letterSpacing: "0.08em",
              }}
            >
              Excelsus — semper supra
            </p>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--iron)",
                letterSpacing: "0.05em",
              }}
            >
              Always elevated. Always above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
