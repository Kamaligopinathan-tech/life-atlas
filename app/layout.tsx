import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "LIFE ATLAS — Your Life, In Receipts",
  description:
    "Every moment leaves a trace. Connect the traces. Discover the story. A digital museum and personal story explorer for the WebRush challenge.",
  keywords: [
    "Life Atlas",
    "WebRush",
    "Digital Museum",
    "Data Storytelling",
    "Personal Archive",
    "Data Visualization",
  ],
  authors: [{ name: "Life Atlas Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-museum-950 text-museum-100 antialiased selection:bg-gold selection:text-museum-950">
        {children}
      </body>
    </html>
  );
}
