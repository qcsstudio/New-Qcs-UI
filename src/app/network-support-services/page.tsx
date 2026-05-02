import type { Metadata } from "next";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import {
  FAQSection,
  faqs,
  FinalCTA,
  FreelanceSupportSection,
  IndustriesSection,
  ManagedSupportSection,
  NetworkServicesGrid,
  ProblemSection,
  ProcessSection,
  ServiceHero,
  UseCasesSection,
  VendorSupportSection,
} from "@/components/network-support/NetworkSupportSections";

const title = "24x7 Network Support & Firewall Configuration Services";
const description =
  "Get SLA-based network support for Cisco, FortiGate, SD-WAN, routers, switches, firewalls, VPNs and cloud networks with freelance and managed support.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Network Support Services",
    "Managed network services",
    "24x7 network support",
    "Firewall configuration services",
    "Router and switch configuration",
    "SD-WAN configuration services",
    "FortiGate firewall support",
    "Cisco network support",
    "Cloud network configuration",
    "Freelance network engineer",
    "Network installation services",
  ],
  alternates: { canonical: "/network-support-services" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://www.qcsstudio.com/network-support-services",
  },
  twitter: { card: "summary_large_image", title, description },
};

function JsonLdSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "24x7 Network Support, Configuration and Troubleshooting Services",
    provider: { "@type": "Organization", name: "QuantumCrafters Studio Pvt. Ltd." },
    serviceType: "Network Support Services",
    areaServed: { "@type": "Country", name: "India" },
    description:
      "SLA-based network support services for routers, switches, firewalls, SD-WAN, VPN, Wi-Fi and cloud networking. Includes Cisco, Fortinet, Palo Alto, Sophos, SonicWall, Juniper, Aruba, Ubiquiti, MikroTik and Check Point support.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Network Support Services",
      itemListElement: [
        "Firewall Configuration and Support",
        "Router and Switch Configuration",
        "SD-WAN Configuration and Troubleshooting",
        "VPN and Remote Access Support",
        "Cloud Network Configuration",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

export default function Page() {
  const differentiators = [
    "Multi-vendor technical capability",
    "Remote and onsite support options",
    "Freelance and managed support models",
    "24x7 SLA-based assistance",
    "Practical troubleshooting approach",
    "Firewall, SD-WAN, VPN, cloud and LAN/WAN expertise",
    "Clear communication and documentation",
    "Support for both urgent issues and planned projects",
  ];

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <JsonLdSchema />
            <div className="cs_height_150 cs_height_lg_80" />
            <section>
              <div className="container">
                <ServiceHero />
                <ProblemSection />
                <NetworkServicesGrid />
                <FreelanceSupportSection />
                <ManagedSupportSection />
                <VendorSupportSection />
                <UseCasesSection />
                <IndustriesSection />

                <section className="mb-5">
                  <h2>Professional Support. Practical Execution. SLA-Driven Delivery.</h2>
                  <p>
                    We combine hands-on network engineering with a business-first support model.
                    Our focus is not only to configure devices, but to make sure your network is
                    secure, stable, documented and ready for growth.
                  </p>
                  <ul>
                    {differentiators.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <ProcessSection />
                <FAQSection />
                <FinalCTA />
              </div>
            </section>
            <div className="cs_height_120 cs_height_lg_60" />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
}
