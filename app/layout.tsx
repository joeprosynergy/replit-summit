import type { Metadata } from "next";
import { Oswald, Open_Sans } from "next/font/google";
import Script from "next/script";
import Providers from "./providers";
import "./globals.css";

const GTM_ID = "GTM-W65NW3KB";

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
    default: "Storage Sheds & Portable Buildings in Missouri | Summit",
    template: "%s | Summit Portable Buildings",
  },
  description:
    "Shop affordable storage sheds, barns, cabins & garages hand-crafted in the USA. Free delivery in MO, IL, KY & AR. Get a free quote today!",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      <head>
        {/* Preconnect to Cloudinary (serves logo + product images) */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Preload the header logo so it's cached before React hydrates */}
        <link
          rel="preload"
          href="https://res.cloudinary.com/dmbzcxslt/image/upload/v1734462395/summit-logo_qfbfod.png"
          as="image"
          fetchPriority="high"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>{children}</Providers>
        <script
          src="https://summit-ops-journal.netlify.app/widget/chat-widget.js"
          data-widget-key="summit-chat-2026"
          async
        />

      </body>
    </html>
  );
}
