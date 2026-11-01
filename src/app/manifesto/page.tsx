import Link from "next/link";

export default function ManifestoPage() {
  const tenets = [
    {
      num: "I",
      title: "The Man Is Forged, Not Born",
      body: "Excellence is not inherited. It is constructed through repeated deliberate action under pressure. Every man capable of greatness was once incapable of it.",
    },
    {
      num: "II",
      title: "Mind, Body, and Soul Are One",
      body: "A weak body reflects a weak mind. A scattered mind reflects a broken spirit. The Excelsus trains all three simultaneously — because you cannot separate them.",
    },
    {
      num: "III",
      title: "Comfort Is the Enemy",
      body: "Ease corrodes. The man who chases comfort becomes comfortable with mediocrity. We do not make this comfortable. We make it worth it.",
    },
    {
      num: "IV",
      title: "Knowledge Is a Weapon",
      body: "Understanding philosophy, psychology, and power is not academic — it is tactical. The man who does not understand how the world works is manipulated by those who do.",
    },
    {
      num: "V",
      title: "Wealth Is a Moral Obligation",
      body: "A broke man cannot protect his family, fund his mission, or command respect. Building wealth is not greed — it is duty. We teach it without apology.",
    },
    {
      num: "VI",
      title: "The Brotherhood Is Non-Negotiable",
      body: "No man rises in isolation. The men around you determine your ceiling. Choose them deliberately. Hold them to a standard. Rise together.",
    },
    {
      num: "VII",
      title: "Sovereignty Is the Goal",
      body: "The free man controls his time, his money, his body, and his mind. He is not dependent on a single employer, a single country, or a single system. This is what we build toward.",
    },
  ];
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
          The Creed
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
          The Excelsus Manifesto
        </h1>
        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.12)",
            paddingTop: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {tenets.map((t) => (
            <div
              key={t.num}
              style={{
                display: "grid",
                gridTemplateColumns: "2.5rem 1fr",
                gap: "1.5rem",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.7rem",
                  color: "var(--gold)",
                  letterSpacing: "0.1em",
                  paddingTop: "0.2rem",
                }}
              >
                {t.num}
              </span>
              <div>
                <h2
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: "0.6rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.title}
                </h2>
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--parchment-dim)",
                    lineHeight: 1.8,
                  }}
                >
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
