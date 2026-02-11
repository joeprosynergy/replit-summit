import type { Metadata } from "next";
import { Oswald, Open_Sans } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Summit Portable Buildings | Built The Old Fashioned Way",
    template: "%s | Summit Portable Buildings",
  },
  description:
    "Affordable, high quality, hand crafted, storage buildings built in the USA. Serving Missouri, Illinois, Kentucky, and Arkansas.",
  keywords: [
    "portable buildings",
    "storage sheds",
    "barns",
    "garages",
    "utility sheds",
    "outdoor storage",
    "Missouri",
    "Illinois",
    "Kentucky",
    "Arkansas",
  ],
  authors: [{ name: "Summit Portable Buildings" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://summitbuildings.com",
    siteName: "Summit Portable Buildings",
    images: [
      {
        url: "https://res.cloudinary.com/dwhwbbbev/image/upload/f_auto,q_auto,w_1200/summit-buildings/social-share",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SummitBuildings",
    images: [
      "https://res.cloudinary.com/dwhwbbbev/image/upload/f_auto,q_auto,w_1200/summit-buildings/social-share",
    ],
  },
  icons: {
    icon: "https://res.cloudinary.com/dwhwbbbev/image/upload/v1767270254/IMG_2791_aetiqb.png",
    apple: "https://res.cloudinary.com/dwhwbbbev/image/upload/v1767270254/IMG_2791_aetiqb.png",
  },
  metadataBase: new URL("https://summitbuildings.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${openSans.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
