"use client";
import { useState } from "react";

type TierKey = "discipulus" | "miles" | "excelsus";
type Tier = {
  name: string;
  sub: string;
  price: number;
  color: string;
  features: string[];
  locked: string[];
};

export default function UpgradeClient({
  tiers,
  currentTier,
  membershipStatus,
  stripeSubscriptionId,
  justUpgraded,
}: {
  tiers: Record<TierKey, Tier>;
  currentTier: string;
  membershipStatus: string;
  stripeSubscriptionId?: string;
  justUpgraded?: boolean;
}) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const tierOrder: TierKey[] = ["discipulus", "miles", "excelsus"];
  const currentIdx = tierOrder.indexOf(currentTier as TierKey);

  async function handleUpgrade(key: TierKey) {
    setLoading(key);
    setError("");
    try {
      const res = await fetch("/api/stripe/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: key }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.redirect) {
        window.location.href = data.redirect;
      } else if (data.error) {
        setError(data.error);
        setLoading(null);
      }
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(null);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <span
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold-dim)",
          }}
        >
          Membership
        </span>
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
            fontWeight: 700,
            color: "var(--white)",
            margin: "0.5rem 0 0.35rem",
          }}
        >
          Your Rank
        </h1>
        <p
          style={{ fontSize: "0.95rem", color: "var(--iron)", lineHeight: 1.5 }}
        >
          Current tier:{" "}
          <span
            style={{
              color: tiers[currentTier as TierKey]?.color || "var(--gold)",
              fontFamily: "Cinzel, serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {tiers[currentTier as TierKey]?.name || currentTier}
          </span>
          {" — "}
          <span
            style={{
              color: membershipStatus === "active" ? "var(--gold)" : "#B22222",
            }}
          >
            {membershipStatus}
          </span>
        </p>
      </div>

      {justUpgraded && (
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.3)",
            padding: "1.25rem",
            background: "rgba(201,168,76,0.05)",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{ color: "var(--gold)", fontSize: "1.2rem", flexShrink: 0 }}
          >
            ⚔
          </span>
          <div>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.2rem",
              }}
            >
              Rank Upgraded
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--parchment-dim)",
                lineHeight: 1.5,
              }}
            >
              Your tier has been updated. New content and features are now
              unlocked.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            border: "1px solid rgba(139,26,26,0.3)",
            padding: "1rem 1.25rem",
            background: "rgba(139,26,26,0.05)",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ fontSize: "0.85rem", color: "#B22222" }}>{error}</p>
        </div>
      )}

      {/* Tier grid — single col on mobile, 3-col on desktop */}
      <style>{`
        .upgrade-tier-grid {
          display: grid;
          grid-template-columns: 1fr;
          border: 1px solid rgba(201,168,76,0.1);
          margin-bottom: 2rem;
        }
        @media (min-width: 700px) {
          .upgrade-tier-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .upgrade-tier-card {
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .upgrade-tier-card:last-child {
          border-bottom: none;
        }
        @media (min-width: 700px) {
          .upgrade-tier-card {
            border-bottom: none;
            border-right: 1px solid rgba(201,168,76,0.1);
          }
          .upgrade-tier-card:last-child {
            border-right: none;
          }
        }
      `}</style>

      <div className="upgrade-tier-grid">
        {tierOrder.map((key) => {
          const tier = tiers[key];
          const isCurrent = key === currentTier;
          const isUpgrade = tierOrder.indexOf(key) > currentIdx;
          const isDowngrade = tierOrder.indexOf(key) < currentIdx;
          const isLoading = loading === key;

          return (
            <div
              key={key}
              className="upgrade-tier-card"
              style={{
                padding: "1.75rem 1.5rem",
                background: isCurrent ? "var(--stone3)" : "var(--stone)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {isCurrent && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background:
                      "linear-gradient(90deg,transparent,var(--gold),transparent)",
                  }}
                />
              )}
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: tier.color,
                  marginBottom: "0.2rem",
                  marginTop: "0.75rem",
                }}
              >
                {tier.name}
              </p>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontStyle: "italic",
                  color: "var(--iron)",
                  marginBottom: "1rem",
                }}
              >
                {tier.sub}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.2rem",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.9rem",
                    color: "var(--gold)",
                    marginTop: "0.3rem",
                  }}
                >
                  $
                </span>
                <span
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "var(--white)",
                    lineHeight: 1,
                  }}
                >
                  {tier.price}
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--iron)",
                    marginTop: "auto",
                    marginBottom: "0.2rem",
                  }}
                >
                  /mo
                </span>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  flex: 1,
                  marginBottom: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.45rem",
                }}
              >
                {tier.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      fontSize: "0.78rem",
                      color: "var(--parchment-dim)",
                      alignItems: "flex-start",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: tier.color,
                        fontSize: "0.55rem",
                        marginTop: "0.3rem",
                        flexShrink: 0,
                      }}
                    >
                      ✦
                    </span>
                    {f}
                  </li>
                ))}
                {tier.locked.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      fontSize: "0.78rem",
                      color: "var(--iron)",
                      textDecoration: "line-through",
                      alignItems: "flex-start",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--stone4)",
                        fontSize: "0.55rem",
                        marginTop: "0.3rem",
                        flexShrink: 0,
                      }}
                    >
                      ✦
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "auto" }}>
                {isCurrent ? (
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      padding: "0.85rem",
                      border: "1px solid rgba(201,168,76,0.2)",
                      minHeight: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✓ Current Plan
                  </div>
                ) : isUpgrade ? (
                  <button
                    onClick={() => handleUpgrade(key)}
                    disabled={!!loading}
                    style={{
                      width: "100%",
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "0.85rem",
                      background: isLoading ? "var(--gold-dim)" : "var(--gold)",
                      color: "#0F0D0B",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "background 0.2s",
                      minHeight: "44px",
                    }}
                  >
                    {isLoading ? "Processing..." : `Upgrade to ${tier.name}`}
                  </button>
                ) : isDowngrade ? (
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--iron)",
                      padding: "0.85rem",
                    }}
                  >
                    Already unlocked
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Billing management */}
      {stripeSubscriptionId && (
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.1)",
            padding: "1.25rem",
            background: "var(--stone2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--iron)",
                marginBottom: "0.25rem",
              }}
            >
              Billing
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--parchment-dim)",
                lineHeight: 1.5,
              }}
            >
              Manage your payment method, view invoices, or cancel.
            </p>
          </div>
          <a
            href="https://billing.stripe.com/p/login/test_REPLACE_WITH_CUSTOMER_PORTAL_LINK"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--iron)",
              border: "1px solid rgba(201,168,76,0.15)",
              padding: "0.75rem 1.25rem",
              textDecoration: "none",
              flexShrink: 0,
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Manage Billing →
          </a>
        </div>
      )}
      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--iron)",
          marginTop: "1rem",
          lineHeight: 1.6,
        }}
      >
        Upgrades take effect immediately. Prorated charges apply. Cancel anytime
        via Manage Billing.
      </p>
    </div>
  );
}
