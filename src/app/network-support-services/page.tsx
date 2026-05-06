import { getNetworkSupportSchemaGraph, metadataConfig } from "@/data/networkSupportPage";
import NetworkSupportServicesPage from "@/container/network-support-services/NetworkSupportServicesPage";

export const metadata = metadataConfig;

export default function Page() {
  const schemaGraph = getNetworkSupportSchemaGraph();
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "24x7 Network Support, Firewall and SD-WAN Configuration Services",
        provider: {
          "@type": "Organization",
          name: "QuantumCrafters Studio Pvt. Ltd.",
          url: "https://www.qcsstudio.com",
        },
        serviceType: "Network Support Services",
        areaServed: [
          {
            "@type": "Country",
            name: "India",
          },
          {
            "@type": "Place",
            name: "Remote and Global Support",
          },
        ],
        description:
          "SLA-based network support services for routers, switches, firewalls, SD-WAN, VPN, Wi-Fi and cloud networking. Includes Cisco, Fortinet, Palo Alto, Sophos, SonicWall, Juniper, Aruba, Ubiquiti, MikroTik and Check Point support.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Network Infrastructure Support Services",
          itemListElement: [
            "Firewall Configuration and Support",
            "Router and Switch Configuration",
            "SD-WAN Configuration and Troubleshooting",
            "VPN and Remote Access Support",
            "Cloud Network Configuration",
            "Wi-Fi and Access Point Support",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
    ],
  };

  return (
    <NetworkSupportServicesPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaGraph),
        }}
      />
    </NetworkSupportServicesPage>
  );
}
