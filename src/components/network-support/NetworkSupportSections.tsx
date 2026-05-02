import type { ReactNode } from "react";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

type ServiceItem = {
  title: string;
  description: string;
  bullets: string[];
};

type UseCaseItem = {
  title: string;
  description: string;
};

type StepItem = {
  title: string;
  description: string;
};

export const trustBadges: string[] = [
  "24x7 SLA-based support",
  "Remote and onsite assistance",
  "Freelance/on-demand network engineers",
  "Multi-vendor configuration expertise",
  "Firewall, SD-WAN, VPN and cloud network support",
];

export const commonIssues: string[] = [
  "Frequent internet or branch connectivity drops",
  "Firewall rules blocking business-critical applications",
  "VPN instability between offices, users or cloud workloads",
  "Poor Wi-Fi coverage and access point misconfiguration",
  "Slow application performance across WAN or SD-WAN links",
  "Router, switch, VLAN and routing misconfiguration",
  "No proper backup, documentation or change control",
  "Lack of 24x7 technical support during critical outages",
];

export const services: ServiceItem[] = [
  {
    title: "Firewall Configuration & Support",
    description:
      "We help configure, troubleshoot and optimise firewall environments for secure business access.",
    bullets: [
      "Firewall policy configuration",
      "NAT, PAT and port forwarding",
      "Access control rules",
      "VPN configuration",
      "Application and web filtering",
      "Security policy review",
      "Firewall backup and firmware upgrade support",
      "Firewall migration and rule cleanup",
      "High availability and failover setup",
      "Incident troubleshooting and emergency support",
    ],
  },
  {
    title: "Router & Switch Configuration",
    description:
      "We provide professional router and switch configuration support for stable LAN, WAN and branch connectivity.",
    bullets: [
      "VLAN configuration",
      "Inter-VLAN routing",
      "Static and dynamic routing",
      "DHCP, DNS and gateway setup",
      "Trunk and access port configuration",
      "Switch stacking support",
      "Routing protocol troubleshooting",
      "Port security and access control",
      "Network segmentation",
      "Configuration backup and documentation",
    ],
  },
  {
    title: "SD-WAN Configuration & Troubleshooting",
    description:
      "We support SD-WAN deployment, branch connectivity, application-aware routing, cloud access and secure WAN failover.",
    bullets: [
      "SD-WAN deployment and configuration",
      "Branch connectivity setup",
      "Application-aware routing",
      "WAN failover policies",
      "Performance SLA configuration",
      "Link monitoring",
      "Cloud breakout configuration",
      "Secure SD-WAN firewall integration",
      "SD-WAN troubleshooting and optimisation",
    ],
  },
  {
    title: "VPN & Remote Access Support",
    description:
      "We configure secure VPN access for branches, remote users, vendors and cloud environments.",
    bullets: [
      "Site-to-site VPN",
      "Remote access VPN",
      "SSL VPN",
      "IPsec VPN",
      "Client VPN troubleshooting",
      "VPN between firewall and cloud",
      "Multi-branch VPN architecture",
      "VPN performance and tunnel stability review",
    ],
  },
  {
    title: "Cloud Network Configuration",
    description:
      "We assist businesses with secure cloud networking across AWS, Azure and Google Cloud.",
    bullets: [
      "VPC/VNet setup",
      "Subnet planning",
      "Route table configuration",
      "Security groups and firewall rules",
      "VPN to cloud setup",
      "Cloud NAT and gateway configuration",
      "Hybrid cloud connectivity",
      "Network access troubleshooting",
      "Cloud firewall and security review",
    ],
  },
  {
    title: "Wi-Fi & Access Point Support",
    description:
      "We help design, configure and troubleshoot office, campus and branch Wi-Fi networks.",
    bullets: [
      "Access point configuration",
      "Controller-based Wi-Fi setup",
      "SSID and guest network setup",
      "Wi-Fi security configuration",
      "Roaming and coverage optimisation",
      "VLAN-based wireless segmentation",
      "Captive portal support",
      "Wi-Fi performance troubleshooting",
    ],
  },
];

export const freelanceSupportItems: string[] = [
  "One-time firewall configuration",
  "Complex VPN setup",
  "SD-WAN troubleshooting",
  "Router and switch deployment",
  "Cloud network configuration",
  "Network migration",
  "Vendor-specific technical support",
  "Emergency issue resolution",
  "Project-based implementation",
  "Remote or onsite support",
];

export const managedSupportItems: string[] = [
  "24x7 incident response",
  "Priority-based ticket handling",
  "Firewall and network troubleshooting",
  "Configuration change support",
  "Preventive checks",
  "Backup and documentation support",
  "Network performance review",
  "Vendor coordination support",
  "Planned maintenance assistance",
  "Critical outage support",
];

export const vendors: string[] = [
  "Cisco",
  "Fortinet / FortiGate",
  "Palo Alto Networks",
  "Sophos",
  "SonicWall",
  "Juniper Networks",
  "Aruba / HPE",
  "Ubiquiti",
  "MikroTik",
  "Check Point",
];

export const useCases: UseCaseItem[] = [
  {
    title: "New Office Network Setup",
    description:
      "We help design and configure routers, switches, firewalls, Wi-Fi and VPN connectivity for new office or branch locations.",
  },
  {
    title: "Firewall Migration",
    description:
      "We assist with firewall replacement, rule migration, NAT configuration, VPN migration, backup and controlled cutover.",
  },
  {
    title: "Branch Connectivity & SD-WAN",
    description:
      "We help businesses connect multiple locations securely with SD-WAN, VPN and WAN failover policies.",
  },
  {
    title: "Cloud Connectivity",
    description:
      "We configure secure connectivity between office networks and cloud workloads hosted on AWS, Azure or GCP.",
  },
  {
    title: "Network Troubleshooting",
    description:
      "We diagnose and resolve routing, switching, firewall, VPN, internet, Wi-Fi and application access issues.",
  },
  {
    title: "Emergency Support",
    description:
      "We provide urgent technical assistance when your business network is down or facing critical performance issues.",
  },
];

export const industries: string[] = [
  "Corporate offices",
  "Manufacturing units",
  "Warehouses",
  "Hospitals and clinics",
  "Schools and colleges",
  "Hotels and hospitality businesses",
  "Retail chains",
  "IT companies",
  "Real estate offices",
  "Multi-branch businesses",
  "Data-driven and cloud-first organisations",
];

export const processSteps: StepItem[] = [
  {
    title: "Requirement Understanding",
    description:
      "We understand your existing network, device model, issue, business requirement and urgency.",
  },
  {
    title: "Network Assessment",
    description:
      "We review the current configuration, topology, firewall rules, routing, VPN, VLAN, WAN links and security posture.",
  },
  {
    title: "Action Plan",
    description:
      "We prepare a clear technical plan for configuration, troubleshooting, migration or deployment.",
  },
  {
    title: "Implementation",
    description:
      "Our engineers perform the required configuration or troubleshooting with proper change control.",
  },
  {
    title: "Testing & Validation",
    description:
      "We validate connectivity, security rules, VPN tunnels, failover, application access and user experience.",
  },
  {
    title: "Documentation & Support",
    description:
      "We provide configuration notes, backup recommendations and ongoing support options where required.",
  },
];

export const faqs = [
  ["Do you provide 24x7 network support?", "Yes. We provide 24x7 SLA-based support for critical network issues, troubleshooting, firewall support, VPN problems, SD-WAN issues and business-impacting incidents."],
  ["Do you provide freelance network engineers?", "Yes. We provide freelance and on-demand network engineers for specialised configuration, troubleshooting, migration, installation and project-based network support."],
  ["Which firewall brands do you support?", "We support leading firewall vendors including Fortinet/FortiGate, Cisco, Palo Alto Networks, Sophos, SonicWall, Check Point and other enterprise firewall environments."],
  ["Can you configure SD-WAN?", "Yes. We support SD-WAN configuration, branch connectivity, application-aware routing, WAN failover, cloud breakout, performance SLA policies and troubleshooting."],
  ["Do you support Cisco router and switch configuration?", "Yes. We provide Cisco router and switch configuration support, including VLANs, routing, trunking, port security, VPN, WAN setup and troubleshooting."],
  ["Can you support FortiGate firewall configuration?", "Yes. We support FortiGate firewall policy configuration, NAT, VPN, SD-WAN, HA, firmware upgrade support, backup, optimisation and troubleshooting."],
  ["Do you provide remote network support?", "Yes. Most configuration and troubleshooting tasks can be handled remotely. Onsite support can also be arranged depending on location and project requirement."],
  ["Do you support cloud networking?", "Yes. We support cloud network configuration for AWS, Azure and Google Cloud, including VPC/VNet, route tables, security groups, VPN, firewall rules and hybrid connectivity."],
  ["Can you help with office network installation?", "Yes. We help with new office network setup including firewall, router, switch, Wi-Fi, VLAN, VPN and internet failover configuration."],
  ["Do you provide ongoing managed network services?", "Yes. We provide ongoing managed network support with SLA-based assistance, preventive checks, troubleshooting, change support and incident response."],
] as const;

const SectionCard = ({ children }: { children: ReactNode }) => (
  <div className="cs_card cs_style_1 p-4 h-100">{children}</div>
);

export const ServiceHero = () => (
  <section className="mb-5 rounded-4 p-4 p-lg-5" style={{ background: "linear-gradient(120deg,#0b1f3a,#123b6d)", color: "white" }}>
    <p className="text-uppercase small fw-semibold">Network Support Services</p>
    <h1>24x7 Network Support, Configuration & Troubleshooting Services</h1>
    <p>Keep your business network secure, stable and always available with expert support for routers, switches, firewalls, SD-WAN, VPN, Wi-Fi, cloud networking and multi-vendor infrastructure.</p>
    <p>From one-time specialised configuration to long-term SLA-based managed support, QuantumCrafters Studio provides professional network engineering assistance for businesses that cannot afford downtime, misconfiguration or slow incident response.</p>
    <div className="d-flex flex-wrap gap-3 my-4">
      <Link href="/contact" className="btn btn-light">Get Network Support</Link>
      <Link href="/contact" className="btn btn-outline-light">Talk to an Engineer</Link>
    </div>
    <div className="row g-2">
      {trustBadges.map((item) => (
        <div key={item} className="col-md-6 col-lg-4">
          <span className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2" style={{ background: "rgba(255,255,255,0.14)" }}>
            <FiCheckCircle /> {item}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export const ProblemSection = () => (
  <section className="mb-5">
    <h2>Network Issues Should Not Slow Down Your Business</h2>
    <p>A small firewall rule mistake, routing issue, VPN failure or unstable WAN link can directly impact business operations. Many companies face recurring network problems because their infrastructure is configured once and then left unmanaged.</p>
    <ul>{commonIssues.map((item) => <li key={item}>{item}</li>)}</ul>
    <p><strong>Our role is simple:</strong> stabilise your network, secure your edge, improve visibility, and provide reliable support when your team needs it most.</p>
  </section>
);

export const NetworkServicesGrid = () => (
  <section className="mb-5">
    <h2>Complete Network Infrastructure Support Under One Roof</h2>
    <p>We provide end-to-end network support across planning, installation, configuration, troubleshooting, optimisation and managed operations.</p>
    <div className="row g-4">
      {services.map((service) => (
        <article key={service.title} className="col-lg-6">
          <SectionCard>
            <h3 className="h4">{service.title}</h3>
            <p>{service.description}</p>
            <ul>{service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </SectionCard>
        </article>
      ))}
    </div>
  </section>
);

export const FreelanceSupportSection = () => (
  <section className="mb-5">
    <h2>Need a Specialist for a Specific Configuration?</h2>
    <p>Not every business needs a full-time network engineer. Sometimes, you only need the right expert for a specific task.</p>
    <h3 className="h4">Freelance and On-Demand Network Engineer Support</h3>
    <ul>{freelanceSupportItems.map((item) => <li key={item}>{item}</li>)}</ul>
    <p>This is ideal for companies that need expert help without hiring a permanent resource.</p>
  </section>
);

export const ManagedSupportSection = () => (
  <section className="mb-5">
    <h2>24x7 SLA-Based Network Support</h2>
    <p>For businesses that need continuous support, we provide SLA-based network assistance to keep infrastructure stable, secure and supported.</p>
    <ul>{managedSupportItems.map((item) => <li key={item}>{item}</li>)}</ul>
  </section>
);

export const VendorSupportSection = () => (
  <section className="mb-5">
    <h2>Multi-Vendor Network Support</h2>
    <p>We support leading network and security vendors across firewall, routing, switching, SD-WAN, VPN, Wi-Fi and cloud networking environments.</p>
    <div className="row g-3">
      {vendors.map((vendor) => (
        <div key={vendor} className="col-6 col-md-4 col-lg-3">
          <SectionCard>
            <p className="mb-0 text-center fw-semibold">{vendor}</p>
          </SectionCard>
        </div>
      ))}
    </div>
  </section>
);

export const UseCasesSection = () => (
  <section className="mb-5">
    <h2>Where We Can Help</h2>
    <div className="row g-4">
      {useCases.map((item) => (
        <article key={item.title} className="col-md-6 col-lg-4">
          <SectionCard>
            <h3 className="h5">{item.title}</h3>
            <p className="mb-0">{item.description}</p>
          </SectionCard>
        </article>
      ))}
    </div>
  </section>
);

export const IndustriesSection = () => (
  <section className="mb-5">
    <h2>Network Support for Business-Critical Environments</h2>
    <div className="row g-3">
      {industries.map((industry) => (
        <div key={industry} className="col-sm-6 col-lg-4">
          <SectionCard>{industry}</SectionCard>
        </div>
      ))}
    </div>
  </section>
);

export const ProcessSection = () => (
  <section className="mb-5">
    <h2>Our Network Support Process</h2>
    <ol className="ps-3">
      {processSteps.map((step) => (
        <li key={step.title} className="mb-3">
          <strong>{step.title}:</strong> {step.description}
        </li>
      ))}
    </ol>
  </section>
);

export const FAQSection = () => (
  <section className="mb-5">
    <h2>Frequently Asked Questions</h2>
    {faqs.map(([question, answer], index) => (
      <details key={question} className="cs_card cs_style_1 p-3 mb-3" open={index === 0}>
        <summary className="fw-semibold">{question}</summary>
        <p className="mt-2 mb-0">{answer}</p>
      </details>
    ))}
  </section>
);

export const FinalCTA = () => (
  <section className="cs_card cs_style_1 p-4 p-lg-5 text-center">
    <h2>Need Network Support Today?</h2>
    <p>Whether you need a freelance network engineer, a firewall specialist, Cisco/FortiGate configuration support, SD-WAN troubleshooting, or 24x7 SLA-based managed network support, our team can assist.</p>
    <div className="d-flex flex-wrap justify-content-center gap-3">
      <Link href="/contact" className="btn btn-dark">Speak with a Network Support Expert</Link>
      <Link href="/contact" className="btn btn-outline-dark">Request Remote Troubleshooting</Link>
    </div>
  </section>
);
