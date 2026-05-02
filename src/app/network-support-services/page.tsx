import type { Metadata } from "next";
import { faqs } from "@/components/network-support/NetworkSupportSections";
import NetworkSupportPage from "@/container/network-support/NetworkSupportPage";

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
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
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
  return (
    <NetworkSupportPage>
      <JsonLdSchema />
    </NetworkSupportPage>
  );
}
