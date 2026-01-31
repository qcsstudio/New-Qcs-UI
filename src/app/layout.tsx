
import Script from "next/script";
import "../styles/index.scss";
import { PolicyProvider } from "@/context/policyContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/assets/img/Images/favicon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;900&family=Kanit:wght@400;500;600;700&display=swap"
        />
        <title>QuantaumCrafter Studio</title>
         <link
          rel="canonical"
          href="https://www.qcsstudio.com"
          key="canonical"
        />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "tjdh7hfz98");
            `,
          }}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TGNFYNFQQ2');
          `}
        </Script>
         <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "QuantumCrafters Studio Pvt. Ltd.",
              "url": "https://www.qcsstudio.com/",
              "logo": "https://www.qcsstudio.com/assets/img/Images/favicon.png",
              "description":
                "AI-powered growth studio offering AI development, web/app engineering, automation, analytics, and marketing solutions to help businesses scale.",
              "telephone": "+91-8264017346",
              "email": "info@qcsstudio.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress":
                  "D266 (C) 203, Second Floor Ram Hari Tower, Phase 8B, Industrial Area, Sector 74",
                "addressLocality": "Mohali",
                "addressRegion": "Punjab",
                "postalCode": "160055",
                "addressCountry": "IN",
              },
              "sameAs": [
                "https://www.linkedin.com/company/quantumcrafters-studio",
                "https://www.facebook.com/quantumcraftersstudio",
                "https://www.instagram.com/quantumcraftersstudio",
              ],
              "founder": {
                "@type": "Person",
                "name": "Ravi K. Sankhyan",
              },
            }),
          }}
        />
      </head>

      <body suppressHydrationWarning={true}>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          // strategy="afterInteractive"
          strategy="beforeInteractive"
        />
        <PolicyProvider>

          {children}
        </PolicyProvider>
      </body>
    </html>
  );
}
