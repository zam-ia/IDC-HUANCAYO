import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import SiteConfigProvider from "@/components/SiteConfigProvider";
import { getSiteConfig } from "@/lib/db";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: "#00498d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://idchhuancayo.org"
  ),
  generator: "Next.js",

  title: {
    default: "Iglesia Discípulos de Cristo — Huancayo",
    template: "%s | IDCH Huancayo",
  },
  description:
    "Sistema de gestión y campus virtual para la Iglesia Discípulos de Cristo, sede Huancayo. Devocionales, cursos de discipulado, noticias y más.",
  applicationName: "IDC Huancayo",
  referrer: "origin-when-cross-origin",

  keywords: [
    "iglesia",
    "discípulos de Cristo",
    "Huancayo",
    "Perú",
    "campus virtual",
    "devocionales",
    "discipulado",
    "cristiano",
    "formación espiritual",
    "iglesia evangélica",
  ],

  authors: [{ name: "Iglesia Discípulos de Cristo Huancayo", url: "https://idchhuancayo.org" }],
  creator: "IDCH Huancayo",
  publisher: "IDCH Huancayo",

  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  openGraph: {
    type: "website",
    locale: "es_PE",
    alternateLocale: "es_LA",
    url: "/",
    siteName: "Iglesia Discípulos de Cristo Huancayo",
    title: "Iglesia Discípulos de Cristo — Huancayo",
    description:
      "Descubre contenido edificante, testimonios de fe y nuestro campus virtual para crecer espiritualmente.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Iglesia Discípulos de Cristo Huancayo",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 600,
        height: 600,
        alt: "IDC Huancayo Logo",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@idchuancayo",
    creator: "@idchuancayo",
    title: "Iglesia Discípulos de Cristo — Huancayo",
    description:
      "Descubre contenido edificante, testimonios de fe y nuestro campus virtual para crecer espiritualmente.",
    images: {
      url: "/og-image.jpg",
      alt: "Iglesia Discípulos de Cristo Huancayo",
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon-152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-icon-120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-icon-76.png", sizes: "76x76", type: "image/png" },
    ],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
      noimageindex: false,
    },
  },

  alternates: {
    canonical: "https://idchhuancayo.org",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteConfig = await getSiteConfig();

  return (
    <html
      lang="es"
      className={`${jakarta.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content={siteConfig.primaryColor || "#00498d"} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.siteName || "IDC Huancayo"} />
        <meta name="format-detection" content="telephone=yes, date=yes, address=yes, email=yes" />

        {/* DNS Prefetch y Preconexión */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//img.youtube.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans selection:bg-[#00498d] selection:text-white">
        <Providers>
          <SiteConfigProvider config={siteConfig}>
            {/* Gradientes SVG globales */}
            <svg className="absolute -z-10 h-0 w-0" aria-hidden="true">
              <defs>
                <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00498d" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#00498d" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="brand-gradient-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00498d" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#00498d" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="brand-gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#001f3f" stopOpacity="1" />
                  <stop offset="50%" stopColor="#00498d" stopOpacity="1" />
                  <stop offset="100%" stopColor="#003366" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
            {children}
          </SiteConfigProvider>
        </Providers>
      </body>
    </html>
  );
}