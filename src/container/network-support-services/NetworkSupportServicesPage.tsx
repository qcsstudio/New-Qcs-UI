import Link from "next/link";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import Testimonial from "@/components/testimonial/Testimonial";
import AwardsHomeOne from "@/components/awards/AwardsHomeOne";
import BlogHomeOne from "@/components/blog/BlogHomeOne";
import { architecturePillars, differentiators, faqs, freelanceItems, industries, managedSupportItems, networkServices, processSteps, trustBadges, useCases, vendors } from "@/data/networkSupportPage";

export default function NetworkSupportServicesPage({ children }: { children?: React.ReactNode }) {
  return <Wrapper><HeaderOne /><div id="smooth-wrapper"><div id="smooth-content"><main>
    {children}
    <div className="cs_height_150 cs_height_lg_80" />
    <section><div className="container">
      <section className="mb-5 cs_card cs_style_1 p-4 p-lg-5"><p className="text-uppercase">Network Infrastructure Support</p><h1>24x7 Network Support for Secure, Stable & Always-On Business Operations</h1><p>Your network is the operating layer behind every user, branch, application, cloud workload, and customer interaction. QCS helps businesses configure, troubleshoot, secure, and support their network infrastructure with SLA-based engineering support across firewalls, routers, switches, SD-WAN, VPN, Wi-Fi, and cloud networking.</p><p>From one-time specialised configuration to long-term managed network support, we provide remote and onsite assistance for business-critical infrastructure where downtime is not an option.</p><div className="d-flex gap-3 flex-wrap"><Link href="/contact" className="btn btn-dark">Get Network Support</Link><Link href="/contact?intent=network-support" className="btn btn-outline-dark">Talk to a Network Engineer</Link></div><div className="row g-2 mt-3">{trustBadges.map((b)=><div key={b} className="col-md-6 col-lg-4"><span className="badge text-bg-light p-2">{b}</span></div>)}</div></section>
      <section className="mb-5"><p className="text-uppercase">Reliable Infrastructure for Predictable Operations</p><h2>A Governed Network Support System, Not Just Break-Fix Assistance</h2><p>Most network issues are not isolated incidents.</p><p>QCS brings a structured support model to your network environment: diagnose the issue, stabilise the service, harden the configuration, document the change, and support the infrastructure through SLA-led operations.</p><div className="row g-3">{architecturePillars.map((p,idx)=><div key={p.title} className="col-md-4"><article className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">0{idx+1}. {p.title}</h3><p className="mb-0">{p.description}</p></article></div>)}</div></section>
      <section className="mb-5"><p className="text-uppercase">Our Network Support Services</p><h2>Complete Network Configuration, Troubleshooting & Managed Support</h2><p>We support businesses across the full network lifecycle.</p><div className="row g-4">{networkServices.map((s)=><article key={s.title} className="col-lg-6"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h4">{s.title}</h3><p>{s.description}</p><ul>{s.bullets.map((b)=><li key={b}>{b}</li>)}</ul></div></article>)}</div></section>
      <section className="mb-5"><h2>Need a Freelance Network Engineer for a Specific Task?</h2><ul>{freelanceItems.map((i)=><li key={i}>{i}</li>)}</ul></section>
      <section className="mb-5"><h2>24x7 Network Support for Critical Business Infrastructure</h2><ul>{managedSupportItems.map((i)=><li key={i}>{i}</li>)}</ul></section>
      <section className="mb-5"><h2>Support Across Leading Network & Security Vendors</h2><div className="row g-3">{vendors.map((v)=><div key={v} className="col-6 col-md-4 col-lg-3"><div className="cs_card cs_style_1 p-3 text-center h-100">{v}</div></div>)}</div></section>
      <section className="mb-5"><h2>Network Support for Real Business Scenarios</h2><div className="row g-4">{useCases.map((c)=><article key={c.title} className="col-md-6 col-lg-4"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">{c.title}</h3><p className="mb-0">{c.description}</p></div></article>)}</div></section>
      <section className="mb-5"><h2>Network Support for Offices, Branches, Plants & Cloud-First Teams</h2><div className="row g-2">{industries.map((i)=><div key={i} className="col-sm-6 col-lg-4"><div className="cs_card cs_style_1 p-3 h-100">{i}</div></div>)}</div></section>
      <section className="mb-5"><h2>Diagnose. Stabilise. Secure. Support.</h2><div className="row g-3">{processSteps.map((s,idx)=><div key={s.title} className="col-md-6"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">{idx+1}. {s.title}</h3><p className="mb-0">{s.description}</p></div></div>)}</div></section>
      <section className="mb-5"><h2>Engineering Discipline for Your Network Operations</h2><ul>{differentiators.map((d)=><li key={d}>{d}</li>)}</ul></section>
      <section className="mb-5"><h2>Frequently Asked Questions</h2>{faqs.map(([q,a],idx)=><details key={q} className="cs_card cs_style_1 p-3 mb-3" open={idx===0}><summary className="fw-semibold">{q}</summary><p className="mt-2 mb-0">{a}</p></details>)}</section>
      <Testimonial /><AwardsHomeOne style_2={true} /><BlogHomeOne />
      <section className="cs_card cs_style_1 p-4 p-lg-5 text-center mb-5"><h2>Need Reliable Network Support Today?</h2><p>Whether you need a freelance network engineer, a firewall specialist, FortiGate or Cisco configuration support, SD-WAN troubleshooting, cloud networking assistance, or 24x7 SLA-based managed network support, QCS can help.</p><div className="d-flex flex-wrap justify-content-center gap-3"><Link href="/contact?intent=network-support" className="btn btn-dark">Talk to a Network Engineer</Link><Link href="/contact?intent=remote-troubleshooting" className="btn btn-outline-dark">Request Remote Troubleshooting</Link></div></section>
    </div></section>
    <div className="cs_height_120 cs_height_lg_60" />
  </main><FooterOne /></div></div></Wrapper>
}
