import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "UMCEM — Unified Commerce Management",
  description: "Professional SaaS platform for ecommerce management.",
  authors: [{ name: "UMCEM" }],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#000", overflowX: "hidden",
        fontFamily: "Geist, system-ui, -apple-system, sans-serif",
        WebkitFontSmoothing: "antialiased" }}>
        {children}
      </body>
    </html>
  );
}

