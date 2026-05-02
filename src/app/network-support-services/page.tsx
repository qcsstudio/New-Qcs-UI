import type { Metadata } from "next";
import Link from "next/link";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import Testimonial from "@/components/testimonial/Testimonial";
import AwardsHomeOne from "@/components/awards/AwardsHomeOne";
import BlogHomeOne from "@/components/blog/BlogHomeOne";

const routePath = "/network-support-services";

export const metadata: Metadata = {
  title: "24x7 Network Support, Firewall & SD-WAN Configuration Services",
  description:
    "Get SLA-based network support for Cisco, FortiGate, SD-WAN, routers, switches, firewalls, VPNs and cloud networks with freelance and managed support.",
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
    "VPN configuration services",
    "Network troubleshooting services",
    "Managed firewall services",
  ],
  alternates: { canonical: routePath },
  openGraph: {
    title: "24x7 Network Support, Firewall & SD-WAN Configuration Services | QCS",
    description:
      "SLA-based network infrastructure support for firewalls, routers, switches, SD-WAN, VPN, Wi-Fi and cloud networking.",
    type: "website",
    url: `https://www.qcsstudio.com${routePath}`,
  },
  twitter: {
    card: "summary_large_image",
    title: "24x7 Network Support, Firewall & SD-WAN Configuration Services | QCS",
    description:
      "SLA-based network infrastructure support for firewalls, routers, switches, SD-WAN, VPN, Wi-Fi and cloud networking.",
  },
};

const networkTrustBadges = ["24x7 SLA-Based Support", "Firewall, Router, Switch & SD-WAN Expertise", "Remote + Onsite Assistance", "Freelance / On-Demand Engineers", "Multi-Vendor Network Support"];
const networkPillars = [
  { title: "Stable Connectivity", description: "Keep branches, users, cloud workloads, and business applications connected through structured LAN, WAN, VPN, and SD-WAN support." },
  { title: "Secure Access", description: "Protect your edge with firewall policies, access control, NAT, VPN, segmentation, security hardening, and configuration reviews." },
  { title: "SLA-Driven Response", description: "Get priority-based support for critical issues, planned changes, migrations, troubleshooting, and ongoing network operations." },
];
const networkServices = [
  { title: "Firewall Configuration & Support", description: "We configure, troubleshoot, optimise, and harden firewall environments for secure business access.", bullets: ["Firewall policy configuration", "NAT, PAT, port forwarding", "Access control rules", "VPN configuration", "Application and web filtering", "Security policy review", "Firewall backup and upgrade support", "Firewall migration and rule cleanup", "HA and failover support", "Incident troubleshooting"] },
  { title: "Router & Switch Configuration", description: "We help businesses build stable LAN, WAN, and branch connectivity through professional routing and switching support.", bullets: ["VLAN configuration", "Inter-VLAN routing", "Static and dynamic routing", "DHCP, DNS and gateway setup", "Trunk and access port setup", "Switch stacking support", "Port security", "Routing troubleshooting", "Network segmentation", "Configuration backup and documentation"] },
  { title: "SD-WAN Configuration & Troubleshooting", description: "We support SD-WAN deployment, policy configuration, link failover, cloud breakout, and branch connectivity.", bullets: ["SD-WAN deployment", "Branch connectivity setup", "Application-aware routing", "WAN failover policies", "Performance SLA configuration", "Link monitoring", "Cloud breakout", "Secure SD-WAN firewall integration", "SD-WAN troubleshooting", "Optimisation and policy review"] },
  { title: "VPN & Remote Access Support", description: "We configure secure connectivity for branch offices, remote users, vendors, and cloud environments.", bullets: ["Site-to-site VPN", "Remote access VPN", "SSL VPN", "IPsec VPN", "Client VPN troubleshooting", "Firewall-to-cloud VPN", "Multi-branch VPN architecture", "VPN tunnel stability review"] },
  { title: "Cloud Network Configuration", description: "We help configure secure and reliable cloud networking across AWS, Azure, and Google Cloud.", bullets: ["VPC / VNet setup", "Subnet planning", "Route table configuration", "Security groups and firewall rules", "VPN to cloud", "NAT gateway configuration", "Hybrid cloud connectivity", "Cloud access troubleshooting", "Cloud firewall review"] },
  { title: "Wi-Fi & Access Point Support", description: "We support office, campus, branch, retail, and hospitality Wi-Fi environments.", bullets: ["Access point configuration", "Controller-based Wi-Fi setup", "SSID and guest network setup", "Wi-Fi security configuration", "Roaming optimisation", "VLAN-based wireless segmentation", "Captive portal support", "Wi-Fi performance troubleshooting"] },
];
const freelanceUseCases = ["One-time firewall configuration", "FortiGate, Cisco, Palo Alto, Sophos or SonicWall support", "Complex VPN setup", "SD-WAN troubleshooting", "Router and switch deployment", "Cloud network configuration", "New office network setup", "Network migration", "Emergency issue resolution", "Remote or onsite project support"];
const managedSupportItems = ["24x7 incident response", "Priority-based ticket handling", "Firewall and network troubleshooting", "Configuration change support", "Preventive checks", "Backup and documentation support", "Network performance review", "Vendor coordination support", "Planned maintenance support", "Critical outage support"];
const vendors = ["Cisco", "Fortinet / FortiGate", "Palo Alto Networks", "Sophos", "SonicWall", "Juniper Networks", "Aruba / HPE", "Ubiquiti", "MikroTik", "Check Point"];
const useCases = [
  { title: "New Office Network Setup", description: "Design and configure firewall, router, switch, Wi-Fi, VLAN, VPN, and internet failover for new offices or branches." },
  { title: "Firewall Migration", description: "Migrate firewall rules, NAT policies, VPN tunnels, security policies, backup, and cutover with controlled execution." },
  { title: "Branch Connectivity", description: "Connect multiple branches securely using VPN, SD-WAN, WAN failover, and routing policies." },
  { title: "Cloud Connectivity", description: "Securely connect office networks to AWS, Azure, or Google Cloud workloads." },
  { title: "Emergency Troubleshooting", description: "Resolve business-impacting network, firewall, VPN, internet, Wi-Fi, or routing issues." },
  { title: "Ongoing Network Operations", description: "Support regular changes, configuration reviews, backups, documentation, and performance checks." },
];
const industries = ["Corporate offices", "IT companies", "Manufacturing units", "Warehouses", "Hospitals and clinics", "Schools and colleges", "Hotels and hospitality businesses", "Retail chains", "Real estate offices", "Multi-branch businesses", "Cloud-first organisations"];
const processSteps = [
  { title: "Discover & Diagnose", description: "We understand the business impact, affected users, current topology, device model, configuration, and urgency." },
  { title: "Design the Fix", description: "We prepare the configuration, troubleshooting, migration, or stabilisation plan with minimum disruption." },
  { title: "Configure & Validate", description: "We implement the required change, test connectivity, validate firewall rules, VPN tunnels, routing, failover, and access." },
  { title: "Document & Support", description: "We provide handover notes, backup recommendations, change details, and SLA-based support options where required." },
];
const differentiators = ["SLA-based support model", "Multi-vendor technical capability", "Remote and onsite assistance", "Freelance and managed support options", "Firewall, SD-WAN, VPN, cloud, LAN and WAN expertise", "Clear documentation and change handover", "Practical troubleshooting approach", "Support for both urgent incidents and planned projects"];
const faqs = [
  ["Do you provide 24x7 network support?", "Yes. QCS provides 24x7 SLA-based support for critical network issues, firewall problems, VPN failures, SD-WAN issues, routing problems, Wi-Fi instability, and business-impacting incidents."],
  ["Do you provide freelance network engineers?", "Yes. We provide freelance and on-demand network engineers for specialised configuration, troubleshooting, migration, installation, and project-based support."],
  ["Which vendors do you support?", "We support Cisco, Fortinet/FortiGate, Palo Alto Networks, Sophos, SonicWall, Juniper Networks, Aruba/HPE, Ubiquiti, MikroTik, and Check Point."],
  ["Can you configure FortiGate firewalls?", "Yes. We support FortiGate firewall policies, NAT, VPN, SD-WAN, HA, firmware upgrade support, backup, optimisation, troubleshooting, and security hardening."],
  ["Can you support Cisco router and switch configuration?", "Yes. We support Cisco VLANs, routing, trunking, port security, VPN, WAN setup, switch configuration, router configuration, and troubleshooting."],
  ["Do you provide SD-WAN support?", "Yes. We support SD-WAN deployment, application-aware routing, branch connectivity, WAN failover, performance SLA policies, cloud breakout, and troubleshooting."],
  ["Can you support cloud networking?", "Yes. We support cloud networking across AWS, Azure, and Google Cloud, including VPC/VNet, routing, VPN, firewall rules, security groups, NAT, and hybrid connectivity."],
  ["Do you provide remote support?", "Yes. Most troubleshooting and configuration work can be handled remotely. Onsite support can also be arranged depending on location and project requirement."],
  ["Can you support new office network installation?", "Yes. We support new office network setup including firewall, router, switch, Wi-Fi, VLAN, VPN, internet failover, and secure access configuration."],
  ["Do you provide ongoing managed network services?", "Yes. We provide ongoing SLA-based network support for configuration changes, troubleshooting, incident response, preventive checks, documentation, and performance review."],
] as const;

export default function Page() {
  const serviceSchema = {"@context":"https://schema.org","@type":"Service",name:"24x7 Network Support, Firewall and SD-WAN Configuration Services",provider:{"@type":"Organization",name:"QuantumCrafters Studio Pvt. Ltd.",url:"https://www.qcsstudio.com"},serviceType:"Network Support Services",areaServed:[{"@type":"Country",name:"India"},{"@type":"Place",name:"Remote and Global Support"}],description:"SLA-based network support services for routers, switches, firewalls, SD-WAN, VPN, Wi-Fi and cloud networking. Includes Cisco, Fortinet, Palo Alto, Sophos, SonicWall, Juniper, Aruba, Ubiquiti, MikroTik and Check Point support.",hasOfferCatalog:{"@type":"OfferCatalog",name:"Network Infrastructure Support Services",itemListElement:["Firewall Configuration and Support","Router and Switch Configuration","SD-WAN Configuration and Troubleshooting","VPN and Remote Access Support","Cloud Network Configuration","Wi-Fi and Access Point Support"].map((name)=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper"><div id="smooth-content"><main>
        <div className="cs_height_150 cs_height_lg_80" />
        <section><div className="container">
          <section className="mb-5 cs_card cs_style_1 p-4 p-lg-5"><p className="text-uppercase">Network Infrastructure Support</p><h1>24x7 Network Support for Secure, Stable & Always-On Business Operations</h1><p>Your network is the operating layer behind every user, branch, application, cloud workload, and customer interaction. QCS helps businesses configure, troubleshoot, secure, and support their network infrastructure with SLA-based engineering support across firewalls, routers, switches, SD-WAN, VPN, Wi-Fi, and cloud networking.</p><p>From one-time specialised configuration to long-term managed network support, we provide remote and onsite assistance for business-critical infrastructure where downtime is not an option.</p><div className="d-flex gap-3 flex-wrap"><Link href="/contact" className="btn btn-dark">Get Network Support</Link><Link href="/contact" className="btn btn-outline-dark">Talk to a Network Engineer</Link></div><div className="row g-2 mt-3">{networkTrustBadges.map((b)=><div key={b} className="col-md-6 col-lg-4"><span className="badge text-bg-light p-2">{b}</span></div>)}</div></section>

          <section className="mb-5"><p className="text-uppercase">Reliable Infrastructure for Predictable Operations</p><h2>A Governed Network Support System, Not Just Break-Fix Assistance</h2><p>Most network issues are not isolated incidents. A firewall rule, routing change, VPN drop, WAN failure, or Wi-Fi misconfiguration can affect users, applications, security, and revenue at the same time.</p><p>QCS brings a structured support model to your network environment: diagnose the issue, stabilise the service, harden the configuration, document the change, and support the infrastructure through SLA-led operations.</p><div className="row g-3">{networkPillars.map((p,idx)=><div key={p.title} className="col-md-4"><article className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">0{idx+1}. {p.title}</h3><p className="mb-0">{p.description}</p></article></div>)}</div></section>

          <section className="mb-5"><p className="text-uppercase">Our Network Support Services</p><h2>Complete Network Configuration, Troubleshooting & Managed Support</h2><p>We support businesses across the full network lifecycle: installation, configuration, migration, optimisation, troubleshooting, documentation, and continuous support.</p><div className="row g-4">{networkServices.map((s)=><article key={s.title} className="col-lg-6"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h4">{s.title}</h3><p>{s.description}</p><ul>{s.bullets.map((b)=><li key={b}>{b}</li>)}</ul></div></article>)}</div></section>

          <section className="mb-5"><p className="text-uppercase">Specialised Configuration Support</p><h2>Need a Freelance Network Engineer for a Specific Task?</h2><p>Not every company needs a permanent network resource. Sometimes, you only need a specialist who can step in, understand the requirement, configure the device, troubleshoot the issue, and hand over the environment properly.</p><p>QCS provides freelance and on-demand network engineers for specialised, project-based, urgent, or vendor-specific requirements.</p><ul>{freelanceUseCases.map((i)=><li key={i}>{i}</li>)}</ul></section>

          <section className="mb-5"><p className="text-uppercase">SLA-Based Operations</p><h2>24x7 Network Support for Critical Business Infrastructure</h2><p>For businesses that need continuous support, QCS provides SLA-based network assistance for critical incidents, planned changes, configuration support, troubleshooting, and ongoing network operations.</p><ul>{managedSupportItems.map((i)=><li key={i}>{i}</li>)}</ul></section>

          <section className="mb-5"><p className="text-uppercase">Multi-Vendor Network Expertise</p><h2>Support Across Leading Network & Security Vendors</h2><p>We support multi-vendor network environments across firewall, routing, switching, VPN, Wi-Fi, SD-WAN, and cloud connectivity.</p><div className="row g-3">{vendors.map((v)=><div key={v} className="col-6 col-md-4 col-lg-3"><div className="cs_card cs_style_1 p-3 text-center h-100">{v}</div></div>)}</div></section>

          <section className="mb-5"><p className="text-uppercase">Where QCS Can Help</p><h2>Network Support for Real Business Scenarios</h2><div className="row g-4">{useCases.map((c)=><article key={c.title} className="col-md-6 col-lg-4"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">{c.title}</h3><p className="mb-0">{c.description}</p></div></article>)}</div></section>

          <section className="mb-5"><p className="text-uppercase">Business-Critical Environments</p><h2>Network Support for Offices, Branches, Plants & Cloud-First Teams</h2><div className="row g-2">{industries.map((i)=><div key={i} className="col-sm-6 col-lg-4"><div className="cs_card cs_style_1 p-3 h-100">{i}</div></div>)}</div></section>

          <section className="mb-5"><p className="text-uppercase">Our Working Process</p><h2>Diagnose. Stabilise. Secure. Support.</h2><div className="row g-3">{processSteps.map((s,idx)=><div key={s.title} className="col-md-6"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">{idx+1}. {s.title}</h3><p className="mb-0">{s.description}</p></div></div>)}</div></section>

          <section className="mb-5"><p className="text-uppercase">Why QuantumCrafters Studio</p><h2>Engineering Discipline for Your Network Operations</h2><p>QCS brings the same system-led approach from AI, automation, and engineering into network infrastructure support. We focus on clarity, secure configuration, reliable execution, and measurable support — not temporary fixes that create future problems.</p><ul>{differentiators.map((d)=><li key={d}>{d}</li>)}</ul></section>

          <section className="mb-5"><h2>Frequently Asked Questions</h2>{faqs.map(([q,a],idx)=><details key={q} className="cs_card cs_style_1 p-3 mb-3" open={idx===0}><summary className="fw-semibold">{q}</summary><p className="mt-2 mb-0">{a}</p></details>)}</section>

          <Testimonial />
          <AwardsHomeOne style_2={true} />
          <BlogHomeOne />

          <section className="cs_card cs_style_1 p-4 p-lg-5 text-center mb-5"><h2>Need Reliable Network Support Today?</h2><p>Whether you need a freelance network engineer, a firewall specialist, FortiGate or Cisco configuration support, SD-WAN troubleshooting, cloud networking assistance, or 24x7 SLA-based managed network support, QCS can help.</p><div className="d-flex flex-wrap justify-content-center gap-3"><Link href="/contact" className="btn btn-dark">Talk to a Network Engineer</Link><Link href="/contact" className="btn btn-outline-dark">Request Remote Troubleshooting</Link></div></section>

        </div></section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="cs_height_120 cs_height_lg_60" />
      </main><FooterOne /></div></div>
    </Wrapper>
  );
}
