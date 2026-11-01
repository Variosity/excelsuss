// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import PWAInit from "./PWAInit";

export const metadata: Metadata = {
  title: "The Excelsus | Brotherhood of Earned Excellence",
  description:
    "Where boys end and men begin. Forged through philosophy, hardened by discipline, enriched by mastery.",
  keywords:
    "stoicism, masculinity, wealth building, discipline, brotherhood, warrior mindset",
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "The Excelsus",
  },
  openGraph: {
    title: "The Excelsus",
    description: "Brotherhood of Earned Excellence",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#C9A84C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="noise">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        {/* Favicon set */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          href="/favicon-96x96.png"
          sizes="96x96"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* PWA */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="The Excelsus" />
        <meta name="msapplication-TileColor" content="#0F0D0B" />
        <meta
          name="msapplication-TileImage"
          content="/web-app-manifest-192x192.png"
        />
      </head>
      <body>
        {children}
        <PWAInit />
      </body>
    </html>
  );
}
