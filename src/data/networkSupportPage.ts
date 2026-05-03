import type { Metadata } from "next";

export const metadataConfig: Metadata = {
  title: "24x7 Network Support Services | Firewall & SD-WAN | QCS",
  description:
    "SLA-based network infrastructure support for firewalls, routers, switches, SD-WAN, VPN, Wi-Fi, and cloud networking. Remote, onsite, freelance, and managed support.",
  keywords: [
    "network support services",
    "network infrastructure support",
    "managed network services",
    "24x7 network support",
    "firewall configuration services",
    "router and switch configuration",
    "SD-WAN configuration services",
    "cloud network configuration",
    "VPN configuration services",
    "network troubleshooting services",
    "network installation services",
    "FortiGate firewall support",
    "Cisco network support",
    "freelance network engineer",
  ],
  alternates: { canonical: "https://www.qcsstudio.com/network-support-services" },
  openGraph: {
    title: "24x7 Network Support Services | QCS",
    description:
      "Firewall, SD-WAN, VPN, cloud, router, and switch support with freelance specialist engineers and 24x7 SLA-based managed support.",
    url: "https://www.qcsstudio.com/network-support-services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "24x7 Network Support Services | QCS",
    description:
      "Firewall, SD-WAN, VPN, cloud, router, and switch support with freelance specialist engineers and 24x7 SLA-based managed support.",
  },
};

export const trustBadges = ["24x7 SLA-Based Support","Firewall, Router, Switch & SD-WAN Expertise","Remote + Onsite Assistance","Freelance / On-Demand Engineers","Multi-Vendor Network Support"];
export const architecturePillars = [
  { title: "Stable Connectivity", description: "Keep branches, users, cloud workloads, and business applications connected through structured LAN, WAN, VPN, and SD-WAN support." },
  { title: "Secure Access", description: "Protect your edge with firewall policies, access control, NAT, VPN, segmentation, security hardening, and configuration reviews." },
  { title: "SLA-Driven Response", description: "Get priority-based support for critical issues, planned changes, migrations, troubleshooting, and ongoing network operations." },
];
export const networkServices = [
  { title: "Firewall Configuration & Support", description: "We configure, troubleshoot, optimise, and harden firewall environments for secure business access.", bullets: ["Firewall policy configuration","NAT, PAT, port forwarding","Access control rules","VPN configuration","Application and web filtering","Security policy review","Firewall backup and upgrade support","Firewall migration and rule cleanup","HA and failover support","Incident troubleshooting"] },
  { title: "Router & Switch Configuration", description: "We help businesses build stable LAN, WAN, and branch connectivity through professional routing and switching support.", bullets: ["VLAN configuration","Inter-VLAN routing","Static and dynamic routing","DHCP, DNS and gateway setup","Trunk and access port setup","Switch stacking support","Port security","Routing troubleshooting","Network segmentation","Configuration backup and documentation"] },
  { title: "SD-WAN Configuration & Troubleshooting", description: "We support SD-WAN deployment, policy configuration, link failover, cloud breakout, and branch connectivity.", bullets: ["SD-WAN deployment","Branch connectivity setup","Application-aware routing","WAN failover policies","Performance SLA configuration","Link monitoring","Cloud breakout","Secure SD-WAN firewall integration","SD-WAN troubleshooting","Optimisation and policy review"] },
  { title: "VPN & Remote Access Support", description: "We configure secure connectivity for branch offices, remote users, vendors, and cloud environments.", bullets: ["Site-to-site VPN","Remote access VPN","SSL VPN","IPsec VPN","Client VPN troubleshooting","Firewall-to-cloud VPN","Multi-branch VPN architecture","VPN tunnel stability review"] },
  { title: "Cloud Network Configuration", description: "We help configure secure and reliable cloud networking across AWS, Azure, and Google Cloud.", bullets: ["VPC / VNet setup","Subnet planning","Route table configuration","Security groups and firewall rules","VPN to cloud","NAT gateway configuration","Hybrid cloud connectivity","Cloud access troubleshooting","Cloud firewall review"] },
  { title: "Wi-Fi & Access Point Support", description: "We support office, campus, branch, retail, and hospitality Wi-Fi environments.", bullets: ["Access point configuration","Controller-based Wi-Fi setup","SSID and guest network setup","Wi-Fi security configuration","Roaming optimisation","VLAN-based wireless segmentation","Captive portal support","Wi-Fi performance troubleshooting"] },
];
export const freelanceItems = ["One-time firewall configuration","FortiGate, Cisco, Palo Alto, Sophos or SonicWall support","Complex VPN setup","SD-WAN troubleshooting","Router and switch deployment","Cloud network configuration","New office network setup","Network migration","Emergency issue resolution","Remote or onsite project support"];
export const managedSupportItems = ["24x7 incident response","Priority-based ticket handling","Firewall and network troubleshooting","Configuration change support","Preventive checks","Backup and documentation support","Network performance review","Vendor coordination support","Planned maintenance support","Critical outage support"];
export const vendors = ["Cisco","Fortinet / FortiGate","Palo Alto Networks","Sophos","SonicWall","Juniper Networks","Aruba / HPE","Ubiquiti","MikroTik","Check Point"];
export const useCases = [
  { title: "New Office Network Setup", description: "Design and configure firewall, router, switch, Wi-Fi, VLAN, VPN, and internet failover for new offices or branches." },
  { title: "Firewall Migration", description: "Migrate firewall rules, NAT policies, VPN tunnels, security policies, backup, and cutover with controlled execution." },
  { title: "Branch Connectivity", description: "Connect multiple branches securely using VPN, SD-WAN, WAN failover, and routing policies." },
  { title: "Cloud Connectivity", description: "Securely connect office networks to AWS, Azure, or Google Cloud workloads." },
  { title: "Emergency Troubleshooting", description: "Resolve business-impacting network, firewall, VPN, internet, Wi-Fi, or routing issues." },
  { title: "Ongoing Network Operations", description: "Support regular changes, configuration reviews, backups, documentation, and performance checks." },
];
export const industries = ["Corporate offices","IT companies","Manufacturing units","Warehouses","Hospitals and clinics","Schools and colleges","Hotels and hospitality businesses","Retail chains","Real estate offices","Multi-branch businesses","Cloud-first organisations"];
export const processSteps = [
  { title: "Discover & Diagnose", description: "We understand the business impact, affected users, current topology, device model, configuration, and urgency." },
  { title: "Design the Fix", description: "We prepare the configuration, troubleshooting, migration, or stabilisation plan with minimum disruption." },
  { title: "Configure & Validate", description: "We implement the required change, test connectivity, validate firewall rules, VPN tunnels, routing, failover, and access." },
  { title: "Document & Support", description: "We provide handover notes, backup recommendations, change details, and SLA-based support options where required." },
];
export const differentiators = ["SLA-based support model","Multi-vendor technical capability","Remote and onsite assistance","Freelance and managed support options","Firewall, SD-WAN, VPN, cloud, LAN and WAN expertise","Clear documentation and change handover","Practical troubleshooting approach","Support for both urgent incidents and planned projects"];
export const faqs = [
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

export const painCards = [
  { title: "Unstable Connectivity", description: "Frequent drops, WAN failures, Wi-Fi issues, slow application access and branch downtime." },
  { title: "Configuration Drift", description: "Firewall rules, routing changes, VPN tunnels and VLAN structures become difficult to control over time." },
  { title: "Slow Incident Response", description: "Without clear ownership and SLA support, small issues can quickly become business-impacting outages." },
];
export const oldModelItems = ["Reactive troubleshooting","No proper change documentation","Firewall rules added without review","VPN issues fixed temporarily","No SLA ownership","Vendor dependency during emergencies","Network visibility remains fragmented"];
export const qcsModelItems = ["Structured diagnosis and remediation","Controlled configuration changes","Firewall, VPN, SD-WAN and cloud handled together","Clear documentation and handover","SLA-based response","Freelance specialists when needed","Ongoing support for critical infrastructure"];
export const whyPrinciples = [
  { title: "Precision Over Guesswork", description: "We diagnose before making changes, so fixes are controlled and explainable." },
  { title: "Governance Over Ad-Hoc Changes", description: "Every configuration change should improve stability, security and visibility." },
  { title: "Support Over One-Time Fixes", description: "We help businesses move from reactive troubleshooting to SLA-backed operations." },
];
