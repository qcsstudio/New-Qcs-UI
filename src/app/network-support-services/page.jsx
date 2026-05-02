import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";

export const metadata = {
  title: "24x7 Network Support & Firewall Configuration Services",
  description:
    "Get SLA-based network support for Cisco, FortiGate, SD-WAN, routers, switches, firewalls, VPNs and cloud networks with freelance and managed support.",
  alternates: {
    canonical: "/network-support-services",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "24x7 Network Support, Configuration and Troubleshooting Services",
  provider: {
    "@type": "Organization",
    name: "QuantumCrafters Studio Pvt. Ltd.",
  },
  serviceType: "Network Support Services",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  description:
    "SLA-based network support services for routers, switches, firewalls, SD-WAN, VPN, Wi-Fi and cloud networking. Includes Cisco, Fortinet, Palo Alto, Sophos, SonicWall, Juniper, Aruba, Ubiquiti, MikroTik and Check Point support.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Network Support Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Firewall Configuration and Support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Router and Switch Configuration" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SD-WAN Configuration and Troubleshooting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "VPN and Remote Access Support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Network Configuration" } },
    ],
  },
};

const page = () => {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="container pt-120 pb-120">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

            <section className="mb-80">
              <h1>24x7 Network Support, Configuration & Troubleshooting Services</h1>
              <p>Keep your business network secure, stable and always available with expert support for routers, switches, firewalls, SD-WAN, VPN, Wi-Fi, cloud networking and multi-vendor infrastructure.</p>
              <p>From one-time specialised configuration to long-term SLA-based managed support, QuantumCrafters Studio provides professional network engineering assistance for businesses that cannot afford downtime, misconfiguration or slow incident response.</p>
            </section>

            <section className="mb-80">
              <h2>Network Issues Should Not Slow Down Your Business</h2>
              <ul>
                <li>Frequent internet or branch connectivity drops</li>
                <li>Firewall rules blocking business-critical applications</li>
                <li>VPN instability between offices, users or cloud workloads</li>
                <li>Poor Wi-Fi coverage and access point misconfiguration</li>
                <li>Slow application performance across WAN or SD-WAN links</li>
                <li>Router, switch, VLAN and routing misconfiguration</li>
                <li>No proper backup, documentation or change control</li>
                <li>Lack of 24x7 technical support during critical outages</li>
              </ul>
            </section>

            <section className="mb-80">
              <h2>Complete Network Infrastructure Support Under One Roof</h2>
              <h3>Firewall Configuration & Support</h3>
              <p>Firewall policy configuration, NAT/PAT, access control, VPN setup, web filtering, backups, HA and incident response.</p>
              <h3>Router & Switch Configuration</h3>
              <p>VLANs, inter-VLAN routing, static/dynamic routing, trunking, port security, segmentation and backups.</p>
              <h3>SD-WAN Configuration & Troubleshooting</h3>
              <p>Branch connectivity, application-aware routing, WAN failover, SLA policies, cloud breakout and optimization.</p>
              <h3>VPN & Remote Access Support</h3>
              <p>Site-to-site VPN, remote access VPN, SSL VPN, IPsec and cloud-to-firewall tunnels.</p>
              <h3>Cloud Network Configuration</h3>
              <p>AWS, Azure and Google Cloud VPC/VNet setup, route tables, security groups, hybrid connectivity and troubleshooting.</p>
              <h3>Wi-Fi & Access Point Support</h3>
              <p>Controller-based setup, SSID and guest setup, wireless segmentation and performance optimization.</p>
            </section>

            <section className="mb-80">
              <h2>Freelance & Managed Network Support</h2>
              <p>Get on-demand engineers for one-time tasks or opt for 24x7 SLA-based managed support with preventive checks, change support and critical incident response.</p>
            </section>

            <section className="mb-80">
              <h2>Supported Vendors</h2>
              <p>Cisco, Fortinet/FortiGate, Palo Alto Networks, Sophos, SonicWall, Juniper, Aruba/HPE, Ubiquiti, MikroTik and Check Point.</p>
            </section>

            <section>
              <h2>Frequently Asked Questions</h2>
              <h3>Do you provide 24x7 network support?</h3>
              <p>Yes. We provide 24x7 SLA-based support for critical incidents.</p>
              <h3>Do you provide freelance network engineers?</h3>
              <p>Yes. We provide freelance and on-demand engineers for specialized projects.</p>
              <h3>Do you support Cisco and FortiGate?</h3>
              <p>Yes. We support Cisco, FortiGate and other major network/security vendors.</p>
            </section>
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default page;
