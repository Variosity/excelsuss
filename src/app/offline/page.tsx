"use client";

export default function OfflinePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "3rem" }}>⚔️</div>
      <h1
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "2rem",
          fontWeight: 900,
          color: "#C9A84C",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        No Connection
      </h1>
      <p
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.85rem",
          color: "#8a8a8a",
          letterSpacing: "0.15em",
          maxWidth: "320px",
          lineHeight: 1.8,
        }}
      >
        Even warriors rest. You are offline — reconnect to resume your forge.
      </p>
      <p
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.7rem",
          fontStyle: "italic",
          color: "#C9A84C",
          opacity: 0.6,
          letterSpacing: "0.1em",
        }}
      >
        Per aspera ad astra — Through hardship to the stars
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: "1rem",
          fontFamily: "Cinzel, serif",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#0a0a0a",
          background: "#C9A84C",
          border: "none",
          padding: "0.9rem 2.5rem",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        Try Again
      </button>
    </div>
  );
}
