"use client";
import { useState } from "react";
import type { Profile } from "@/types";

export default function ProfileForm({
  profile,
  email,
}: {
  profile: Profile | null;
  email: string;
}) {
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [country, setCountry] = useState(profile?.country || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Password change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setProfileError("");
    setSaved(false);

    // Validate username client-side
    const { validateUsername } = await import("@/lib/utils/contentFilter");
    const check = validateUsername(username);
    if (!check.ok) {
      setProfileError(check.reason || "Invalid username.");
      setSaving(false);
      return;
    }

    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, username, bio, country })
      .eq("user_id", profile?.user_id);
    if (error) {
      setProfileError(error.message);
      setSaving(false);
      return;
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setChangingPassword(true);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPasswordError(error.message);
      setChangingPassword(false);
      return;
    }
    setChangingPassword(false);
    setPasswordChanged(true);
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordSection(false);
    setTimeout(() => setPasswordChanged(false), 4000);
  }

  const inputStyle = {
    width: "100%",
    background: "var(--stone)",
    border: "1px solid rgba(201,168,76,0.15)",
    padding: "0.75rem 1rem",
    color: "var(--parchment)",
    fontSize: "0.95rem",
    fontFamily: "Crimson Pro, serif",
    outline: "none",
  };
  const labelStyle = {
    fontFamily: "Cinzel, serif",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "var(--iron)",
    display: "block",
    marginBottom: "0.5rem",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Profile form */}
      <form
        onSubmit={handleSave}
        style={{
          border: "1px solid rgba(201,168,76,0.15)",
          padding: "2rem",
          background: "var(--stone2)",
        }}
      >
        <div
          style={{
            height: "2px",
            background:
              "linear-gradient(90deg,transparent,var(--gold),transparent)",
            margin: "-2rem -2rem 2rem",
          }}
        />

        {profileError && (
          <p
            style={{
              fontSize: "0.82rem",
              color: "#B22222",
              background: "rgba(139,26,26,0.1)",
              border: "1px solid rgba(139,26,26,0.2)",
              padding: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            {profileError}
          </p>
        )}
        {saved && (
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--gold)",
              background: "rgba(201,168,76,0.05)",
              border: "1px solid rgba(201,168,76,0.2)",
              padding: "0.75rem",
              marginBottom: "1.25rem",
              fontFamily: "Cinzel, serif",
              letterSpacing: "0.1em",
            }}
          >
            Profile updated.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "1.25rem",
            marginBottom: "1.25rem",
          }}
        >
          <div>
            <label style={labelStyle}>Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={inputStyle}
              placeholder="How you appear to the brotherhood"
            />
          </div>
          <div>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              placeholder="@username"
            />
          </div>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            disabled
            style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }}
          />
          <p
            style={{
              fontSize: "0.72rem",
              color: "var(--iron)",
              marginTop: "0.35rem",
            }}
          >
            Email cannot be changed here. Contact{" "}
            <a
              href="mailto:support@excelsus.live"
              style={{ color: "var(--gold-dim)", textDecoration: "none" }}
            >
              support@excelsus.live
            </a>
          </p>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={inputStyle}
            placeholder="Where you operate from"
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
            placeholder="What drives you. What you're building. Who you are."
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            background: saving ? "var(--gold-dim)" : "var(--gold)",
            color: "#0F0D0B",
            padding: "0.85rem 2.5rem",
            border: "none",
            cursor: saving ? "not-allowed" : "pointer",
            minHeight: "44px",
          }}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>

      {/* Password section */}
      <div
        style={{
          border: "1px solid rgba(201,168,76,0.1)",
          background: "var(--stone2)",
        }}
      >
        {/* Header row */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            borderBottom: showPasswordSection
              ? "1px solid rgba(201,168,76,0.1)"
              : "none",
          }}
          onClick={() => {
            setShowPasswordSection(!showPasswordSection);
            setPasswordError("");
            setNewPassword("");
            setConfirmPassword("");
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--white)",
                marginBottom: "0.2rem",
              }}
            >
              Change Password
            </p>
            <p style={{ fontSize: "0.78rem", color: "var(--iron)" }}>
              Update your account password
            </p>
          </div>
          <span
            style={{
              color: "var(--gold)",
              fontFamily: "Cinzel, serif",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "transform 0.2s",
              transform: showPasswordSection ? "rotate(180deg)" : "none",
            }}
          >
            ▼
          </span>
        </div>

        {showPasswordSection && (
          <form onSubmit={handlePasswordChange} style={{ padding: "1.5rem" }}>
            {passwordError && (
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "#B22222",
                  background: "rgba(139,26,26,0.1)",
                  border: "1px solid rgba(139,26,26,0.2)",
                  padding: "0.75rem",
                  marginBottom: "1.25rem",
                }}
              >
                {passwordError}
              </p>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                gap: "1.25rem",
                marginBottom: "1.25rem",
              }}
            >
              <div>
                <label style={labelStyle}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repeat new password"
                  autoComplete="new-password"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                type="submit"
                disabled={changingPassword}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: changingPassword
                    ? "var(--gold-dim)"
                    : "var(--gold)",
                  color: "#0F0D0B",
                  padding: "0.75rem 2rem",
                  border: "none",
                  cursor: changingPassword ? "not-allowed" : "pointer",
                  minHeight: "44px",
                }}
              >
                {changingPassword ? "Updating..." : "Update Password"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordSection(false);
                  setPasswordError("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "transparent",
                  color: "var(--iron)",
                  padding: "0.75rem 1.5rem",
                  border: "1px solid rgba(201,168,76,0.15)",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Password changed toast */}
      {passwordChanged && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 200,
            background: "var(--stone2)",
            border: "1px solid var(--gold)",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ color: "var(--gold)" }}>✓</span>
          <p
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            Password updated
          </p>
        </div>
      )}
    </div>
  );
}
