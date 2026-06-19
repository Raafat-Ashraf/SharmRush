import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0bb1bf",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Sharm Kite Dreams",
    default: "Sharm Kite Dreams | Watersports in Sharm El Sheikh",
  },
  description:
    "Sharm Kite Dreams — Premium kitesurfing, windsurfing and wingfoil on the Red Sea in Sharm El Sheikh, Egypt.",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
