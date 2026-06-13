import "@/styles/globals.css";

export const metadata = {
  metadataBase: new URL("https://visull.com"),
  title: {
    default: "Visull — Business Software for Growing Teams",
    template: "%s | Visull",
  },
  description:
    "Visull builds focused software for small businesses. CyberGuard monitors your domain security 24/7. ReportMind turns 4–8 hours of client reporting into 45 seconds. Each tool does one thing exceptionally well.",
  keywords: [
    "business software for small businesses",
    "cybersecurity for small business",
    "automated client reporting tool",
    "marketing agency reporting",
    "domain security monitoring",
    "Google Ads reporting automation",
    "CyberGuard",
    "ReportMind",
    "Visull",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://visull.com",
    siteName: "Visull",
    title: "Visull — Business Software for Growing Teams",
    description:
      "CyberGuard and ReportMind. Security monitoring and client reporting automation. Each a focused tool that does one thing exceptionally well.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Visull" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visull — Business Software for Growing Teams",
    description:
      "CyberGuard and ReportMind. Two focused tools for two real business problems.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://visull.com" },
  icons: { icon: "/favicon.ico" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://visull.com/#organization",
      name: "Visull",
      url: "https://visull.com",
      description:
        "Visull builds focused business software for small and medium businesses.",
    },
    {
      "@type": "WebSite",
      "@id": "https://visull.com/#website",
      url: "https://visull.com",
      name: "Visull",
      publisher: { "@id": "https://visull.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      name: "CyberGuard",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Web",
      url: "https://cyberguard.visull.com",
      description:
        "CyberGuard runs 9 security checks on your domain — DNS, SSL, email authentication, credential breaches, open ports — and delivers a plain-English security score in under 90 seconds.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free for 1 domain",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "ReportMind",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://reportmind.visull.com",
      description:
        "ReportMind pulls live data from Google Ads, GA4, and Search Console, then uses AI to write the client email narrative in 45 seconds.",
      offers: { "@type": "Offer", price: "49", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Visull?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Visull is a suite of focused business tools. Each tool solves one specific problem for small businesses — CyberGuard for security monitoring, ReportMind for client reporting automation.",
          },
        },
        {
          "@type": "Question",
          name: "Is CyberGuard free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. CyberGuard is free for 1 domain with no credit card required. You get 9 security checks, DNS/SSL/email auth monitoring, and breach detection.",
          },
        },
        {
          "@type": "Question",
          name: "How does ReportMind save time?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ReportMind connects to Google Ads, GA4, and Search Console, pulls live data, and uses AI to write the client email narrative. A task that takes 4–8 hours per client becomes 45 seconds.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta property="og:image" content="https://visull.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Visull" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://visull.com/og-image.png" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
