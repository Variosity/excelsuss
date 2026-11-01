"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { Profile } from "@/types";

const navItems = [
  {
    href: "/dashboard",
    label: "Command Center",
    icon: "◈",
    exact: true,
    adminOnly: false,
  },
  {
    href: "/dashboard/courses",
    label: "Curriculum",
    icon: "Σ",
    exact: false,
    adminOnly: false,
  },
  {
    href: "/dashboard/community",
    label: "Brotherhood",
    icon: "⊕",
    exact: false,
    adminOnly: false,
  },
  {
    href: "/dashboard/psychology",
    label: "Psychology",
    icon: "☽",
    exact: false,
    adminOnly: false,
  },
  {
    href: "/dashboard/wealth",
    label: "Wealth Track",
    icon: "◉",
    exact: false,
    adminOnly: false,
  },
  {
    href: "/dashboard/sovereignty",
    label: "Sovereignty",
    icon: "⚖",
    exact: false,
    adminOnly: false,
  },
  {
    href: "/dashboard/cell",
    label: "My Cell",
    icon: "❧",
    exact: false,
    adminOnly: false,
  },
  {
    href: "/dashboard/goals",
    label: "Goal Tracker",
    icon: "◎",
    exact: false,
    adminOnly: false,
  },
  {
    href: "/dashboard/workbook",
    label: "Workbook",
    icon: "✦",
    exact: false,
    adminOnly: false,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: "Ψ",
    exact: false,
    adminOnly: false,
  },
  {
    href: "/dashboard/upgrade",
    label: "Upgrade",
    icon: "▲",
    exact: false,
    adminOnly: false,
  },
  {
    href: "/dashboard/admin",
    label: "Admin",
    icon: "⚙",
    exact: false,
    adminOnly: true,
  },
];

interface Props {
  profile: Profile | null;
  isAdmin?: boolean;
}

export default function DashboardNav({ profile, isAdmin = false }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const filtered = navItems.filter(
    (item) => !item.adminOnly || isAdmin || profile?.is_admin,
  );

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const isActive = (item: (typeof navItems)[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const NavContent = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "1.5rem 1.25rem 1rem",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          flexShrink: 0,
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <p
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.9rem",
              fontWeight: 900,
              letterSpacing: "0.2em",
              color: "var(--gold)",
            }}
          >
            THE EXCELSUS
          </p>
        </Link>
        {profile && (
          <div style={{ marginTop: "0.75rem" }}>
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--parchment-dim)",
                fontWeight: 600,
              }}
            >
              {profile.display_name || profile.username}
            </p>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold-dim)",
                marginTop: "0.2rem",
              }}
            >
              {profile.membership_tier} · {profile.xp} XP
            </p>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "0.75rem 0" }}>
        {filtered.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.6rem 1.25rem",
                textDecoration: "none",
                background: active ? "rgba(201,168,76,0.08)" : "transparent",
                borderLeft: active
                  ? "2px solid var(--gold)"
                  : "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  color: active ? "var(--gold)" : "var(--iron)",
                  width: "18px",
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: active ? "var(--gold)" : "var(--iron)",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={handleSignOut}
          style={{
            width: "100%",
            textAlign: "left",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "Cinzel, serif",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--iron)",
            padding: "0.5rem 0",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--blood-bright)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--iron)")}
        >
          <span>↩</span> Sign Out
        </button>
      </div>
    </div>
  );

  // Mobile: top bar + slide-in drawer
  if (isMobile) {
    return (
      <>
        {/* Mobile top bar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: "rgba(15,13,11,0.97)",
            borderBottom: "1px solid rgba(201,168,76,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.25rem",
            height: "56px",
            backdropFilter: "blur(12px)",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.85rem",
                fontWeight: 900,
                letterSpacing: "0.2em",
                color: "var(--gold)",
              }}
            >
              THE EXCELSUS
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              background: "none",
              border: "1px solid rgba(201,168,76,0.2)",
              padding: "0.4rem 0.75rem",
              cursor: "pointer",
              color: "var(--gold)",
              fontSize: "1.1rem",
              lineHeight: 1,
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Overlay */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 101,
              background: "rgba(0,0,0,0.5)",
            }}
          />
        )}

        {/* Drawer */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 102,
            width: "260px",
            background: "var(--stone2)",
            borderRight: "1px solid rgba(201,168,76,0.1)",
            transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease",
            paddingTop: "56px",
          }}
        >
          <NavContent />
        </div>
      </>
    );
  }

  // Desktop: fixed sidebar
  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "220px",
        background: "var(--stone2)",
        borderRight: "1px solid rgba(201,168,76,0.1)",
        zIndex: 50,
      }}
    >
      <NavContent />
    </aside>
  );
}
