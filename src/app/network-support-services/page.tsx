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
