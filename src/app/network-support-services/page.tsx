import { metadataConfig, trustBadges, architecturePillars, networkServices, freelanceItems, managedSupportItems, vendors, useCases, industries, processSteps, differentiators, faqs } from "@/data/networkSupportPage";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import Link from "next/link";
import Testimonial from "@/components/testimonial/Testimonial";
import AwardsHomeOne from "@/components/awards/AwardsHomeOne";
import BlogHomeOne from "@/components/blog/BlogHomeOne";

export const metadata = metadataConfig;

export default function Page() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {"@type":"Service",name:"24x7 Network Support, Firewall and SD-WAN Configuration Services",provider:{"@type":"Organization",name:"QuantumCrafters Studio Pvt. Ltd.",url:"https://www.qcsstudio.com"},serviceType:"Network Support Services",areaServed:[{"@type":"Country",name:"India"},{"@type":"Place",name:"Remote and Global Support"}],description:"SLA-based network support services for routers, switches, firewalls, SD-WAN, VPN, Wi-Fi and cloud networking. Includes Cisco, Fortinet, Palo Alto, Sophos, SonicWall, Juniper, Aruba, Ubiquiti, MikroTik and Check Point support.",hasOfferCatalog:{"@type":"OfferCatalog",name:"Network Infrastructure Support Services",itemListElement:["Firewall Configuration and Support","Router and Switch Configuration","SD-WAN Configuration and Troubleshooting","VPN and Remote Access Support","Cloud Network Configuration","Wi-Fi and Access Point Support"].map((name)=>({"@type":"Offer",itemOffered:{"@type":"Service",name}}))}},
      {"@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}
    ]
  };

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper"><div id="smooth-content"><main>
        <div className="cs_height_150 cs_height_lg_80" />
        <section><div className="container">
          <section className="mb-5 cs_card cs_style_1 p-4 p-lg-5"><p className="text-uppercase">Network Infrastructure Support</p><h1>24x7 Network Support for Secure, Stable & Always-On Business Operations</h1><p>Your network is the operating layer behind every user, branch, application, cloud workload, and customer interaction. QCS helps businesses configure, troubleshoot, secure, and support their network infrastructure with SLA-based engineering support across firewalls, routers, switches, SD-WAN, VPN, Wi-Fi, and cloud networking.</p><p>From one-time specialised configuration to long-term managed network support, we provide remote and onsite assistance for business-critical infrastructure where downtime is not an option.</p><div className="d-flex gap-3 flex-wrap"><Link href="/contact" className="btn btn-dark">Get Network Support</Link><Link href="/contact?intent=network-support" className="btn btn-outline-dark">Talk to a Network Engineer</Link></div><div className="row g-2 mt-3">{trustBadges.map((b)=><div key={b} className="col-md-6 col-lg-4"><span className="badge text-bg-light p-2">{b}</span></div>)}</div></section>
          <section className="mb-5"><p className="text-uppercase">Reliable Infrastructure for Predictable Operations</p><h2>A Governed Network Support System, Not Just Break-Fix Assistance</h2><p>Most network issues are not isolated incidents. A firewall rule, routing change, VPN drop, WAN failure, or Wi-Fi misconfiguration can affect users, applications, security, and revenue at the same time.</p><p>QCS brings a structured support model to your network environment: diagnose the issue, stabilise the service, harden the configuration, document the change, and support the infrastructure through SLA-led operations.</p><div className="row g-3">{architecturePillars.map((p,idx)=><div key={p.title} className="col-md-4"><article className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">0{idx+1}. {p.title}</h3><p className="mb-0">{p.description}</p></article></div>)}</div></section>
          <section className="mb-5"><p className="text-uppercase">Our Network Support Services</p><h2>Complete Network Configuration, Troubleshooting & Managed Support</h2><p>We support businesses across the full network lifecycle: installation, configuration, migration, optimisation, troubleshooting, documentation, and continuous support.</p><div className="row g-4">{networkServices.map((s)=><article key={s.title} className="col-lg-6"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h4">{s.title}</h3><p>{s.description}</p><ul>{s.bullets.map((b)=><li key={b}>{b}</li>)}</ul></div></article>)}</div></section>
          <section className="mb-5"><p className="text-uppercase">Specialised Configuration Support</p><h2>Need a Freelance Network Engineer for a Specific Task?</h2><p>Not every company needs a permanent network resource. Sometimes, you only need a specialist who can step in, understand the requirement, configure the device, troubleshoot the issue, and hand over the environment properly.</p><p>QCS provides freelance and on-demand network engineers for specialised, project-based, urgent, or vendor-specific requirements.</p><ul>{freelanceItems.map((i)=><li key={i}>{i}</li>)}</ul></section>
          <section className="mb-5"><p className="text-uppercase">SLA-Based Operations</p><h2>24x7 Network Support for Critical Business Infrastructure</h2><p>For businesses that need continuous support, QCS provides SLA-based network assistance for critical incidents, planned changes, configuration support, troubleshooting, and ongoing network operations.</p><ul>{managedSupportItems.map((i)=><li key={i}>{i}</li>)}</ul></section>
          <section className="mb-5"><p className="text-uppercase">Multi-Vendor Network Expertise</p><h2>Support Across Leading Network & Security Vendors</h2><p>We support multi-vendor network environments across firewall, routing, switching, VPN, Wi-Fi, SD-WAN, and cloud connectivity.</p><div className="row g-3">{vendors.map((v)=><div key={v} className="col-6 col-md-4 col-lg-3"><div className="cs_card cs_style_1 p-3 text-center h-100">{v}</div></div>)}</div></section>
          <section className="mb-5"><p className="text-uppercase">Where QCS Can Help</p><h2>Network Support for Real Business Scenarios</h2><div className="row g-4">{useCases.map((c)=><article key={c.title} className="col-md-6 col-lg-4"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">{c.title}</h3><p className="mb-0">{c.description}</p></div></article>)}</div></section>
          <section className="mb-5"><p className="text-uppercase">Business-Critical Environments</p><h2>Network Support for Offices, Branches, Plants & Cloud-First Teams</h2><div className="row g-2">{industries.map((i)=><div key={i} className="col-sm-6 col-lg-4"><div className="cs_card cs_style_1 p-3 h-100">{i}</div></div>)}</div></section>
          <section className="mb-5"><p className="text-uppercase">Our Working Process</p><h2>Diagnose. Stabilise. Secure. Support.</h2><div className="row g-3">{processSteps.map((s,idx)=><div key={s.title} className="col-md-6"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">{idx+1}. {s.title}</h3><p className="mb-0">{s.description}</p></div></div>)}</div></section>
          <section className="mb-5"><p className="text-uppercase">Why QuantumCrafters Studio</p><h2>Engineering Discipline for Your Network Operations</h2><p>QCS brings the same system-led approach from AI, automation, and engineering into network infrastructure support. We focus on clarity, secure configuration, reliable execution, and measurable support — not temporary fixes that create future problems.</p><ul>{differentiators.map((d)=><li key={d}>{d}</li>)}</ul></section>
          <section className="mb-5"><h2>Frequently Asked Questions</h2>{faqs.map(([q,a],idx)=><details key={q} className="cs_card cs_style_1 p-3 mb-3" open={idx===0}><summary className="fw-semibold">{q}</summary><p className="mt-2 mb-0">{a}</p></details>)}</section>
          <Testimonial /><AwardsHomeOne style_2={true} /><BlogHomeOne />
          <section className="cs_card cs_style_1 p-4 p-lg-5 text-center mb-5"><h2>Need Reliable Network Support Today?</h2><p>Whether you need a freelance network engineer, a firewall specialist, FortiGate or Cisco configuration support, SD-WAN troubleshooting, cloud networking assistance, or 24x7 SLA-based managed network support, QCS can help.</p><div className="d-flex flex-wrap justify-content-center gap-3"><Link href="/contact?intent=network-support" className="btn btn-dark">Talk to a Network Engineer</Link><Link href="/contact?intent=remote-troubleshooting" className="btn btn-outline-dark">Request Remote Troubleshooting</Link></div></section>
        </div></section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />
        <div className="cs_height_120 cs_height_lg_60" />
import type { Metadata } from "next";
import Wrapper from "@/layouts/Wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Link from "next/link";

const title = "24x7 Network Support & Firewall Configuration Services";
const description = "Get SLA-based network support for Cisco, FortiGate, SD-WAN, routers, switches, firewalls, VPNs and cloud networks with freelance and managed support.";

const faqs = [
  ["Do you provide 24x7 network support?", "Yes. We provide 24x7 SLA-based support for critical network issues, troubleshooting, firewall support, VPN problems, SD-WAN issues and business-impacting incidents."],
  ["Do you provide freelance network engineers?", "Yes. We provide freelance and on-demand network engineers for specialised configuration, troubleshooting, migration, installation and project-based network support."],
  ["Which firewall brands do you support?", "We support leading firewall vendors including Fortinet/FortiGate, Cisco, Palo Alto Networks, Sophos, SonicWall, Check Point and other enterprise firewall environments."],
] as const;

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Network Support Services", "Managed network services", "24x7 network support", "Firewall configuration services"],
  alternates: { canonical: "/network-support-services" },
  openGraph: { title, description, type: "website", url: "https://www.qcsstudio.com/network-support-services" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper"><div id="smooth-content"><main><div className="cs_height_150 cs_height_lg_80" />
        <section><div className="container">
          <h1>24x7 Network Support, Configuration & Troubleshooting Services</h1>
          <p>Keep your business network secure, stable and always available with expert support for routers, switches, firewalls, SD-WAN, VPN, Wi-Fi, cloud networking and multi-vendor infrastructure.</p>
          <div className="d-flex gap-3 flex-wrap mb-4"><Link href="/contact" className="btn btn-dark">Get Network Support</Link><Link href="/contact" className="btn btn-outline-dark">Talk to an Engineer</Link></div>
          <h2>Complete Network Infrastructure Support Under One Roof</h2>
          <p>We provide end-to-end network support across planning, installation, configuration, troubleshooting, optimisation and managed operations.</p>
          <h2>Frequently Asked Questions</h2>
          {faqs.map(([q,a])=><details key={q} className="cs_card cs_style_1 p-3 mb-3"><summary>{q}</summary><p className="mt-2 mb-0">{a}</p></details>)}
          <section className="cs_card cs_style_1 p-4 p-lg-5 text-center"><h2>Need Network Support Today?</h2><p>Whether you need a freelance network engineer, a firewall specialist, Cisco/FortiGate configuration support, SD-WAN troubleshooting, or 24x7 SLA-based managed network support, our team can assist.</p><div className="d-flex flex-wrap justify-content-center gap-3"><Link href="/contact" className="btn btn-dark">Speak with a Network Support Expert</Link><Link href="/contact" className="btn btn-outline-dark">Request Remote Troubleshooting</Link></div></section>
        </div></section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </main><FooterOne /></div></div>
    </Wrapper>
  );
}
