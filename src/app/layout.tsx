import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "@/lib/copyLogo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "GreatAsset | Talent Acquisition, Management & Development Partner",
  description: "Connecting enterprise companies with elite executive, scientific, and technical leaders. GreatAsset is the premier strategic Talent Acquisition, Management & Development Partner, offering full-lifecycle HR ecosystem services including performance management, structuring, and outsourcing support.",
  icons: {
    icon: "/great_asset_logo_transparent.png",
    apple: "/great_asset_logo_transparent.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 font-sans">
        {children}
      </body>
    </html>
  );
}
