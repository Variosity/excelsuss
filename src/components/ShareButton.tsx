// src/components/ShareButton.tsx — reusable share on lesson complete
"use client";
import { useState } from "react";

export default function ShareButton({
  lessonTitle,
  courseTitle,
  xpEarned,
}: {
  lessonTitle: string;
  courseTitle: string;
  xpEarned: number;
}) {
  const [copied, setCopied] = useState(false);

  const text = `Just completed "${lessonTitle}" in ${courseTitle} — earned +${xpEarned} XP on The Excelsus. Forging excellence one lesson at a time. 🔱`;
  const url = "https://excelsus.live";

  function share(platform: "twitter" | "copy") {
    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank",
        "width=560,height=420",
      );
    } else {
      navigator.clipboard.writeText(`${text} ${url}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: "1rem",
      }}
    >
      <span
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--iron)",
        }}
      >
        Share win:
      </span>
      <button
        onClick={() => share("twitter")}
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          background: "transparent",
          border: "1px solid rgba(29,161,242,0.4)",
          color: "#1DA1F2",
          padding: "0.35rem 0.85rem",
          cursor: "pointer",
        }}
      >
        𝕏 Post
      </button>
      <button
        onClick={() => share("copy")}
        style={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          background: "transparent",
          border: "1px solid rgba(201,168,76,0.25)",
          color: copied ? "var(--gold)" : "var(--iron)",
          padding: "0.35rem 0.85rem",
          cursor: "pointer",
          transition: "color 0.2s",
        }}
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>
    </div>
  );
}
