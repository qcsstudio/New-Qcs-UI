import Link from "next/link";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import Testimonial from "@/components/testimonial/Testimonial";
import AwardsHomeOne from "@/components/awards/AwardsHomeOne";
import BlogHomeOne from "@/components/blog/BlogHomeOne";
import {
  architecturePillars,
  differentiators,
  faqs,
  freelanceItems,
  industries,
  managedSupportItems,
  networkServices,
  processSteps,
  trustBadges,
  useCases,
  vendors,
  painCards,
  oldModelItems,
  qcsModelItems,
  whyPrinciples,
} from "@/data/networkSupportPage";

const SectionTitle = ({ eyebrow, title }: { eyebrow?: string; title: string }) => (
  <div className="cs_section_heading cs_style_1 mb-4">
    <div className="cs_section_heading_text">
      {eyebrow ? <p className="text-uppercase mb-2">{eyebrow}</p> : null}
      <h2 className="cs_section_title">{title}</h2>
    </div>
  </div>
);

export default function NetworkSupportServicesPage({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {children}
            <div className="cs_height_150 cs_height_lg_80" />
            <section>
              <div className="container">
                <section className="mb-5 cs_card cs_style_1 p-4 p-lg-5">
                  <p className="text-uppercase mb-2">Network Infrastructure Support</p>
                  <h1 className="cs_section_title">
                    24x7 Network Support for Secure, Stable & Always-On Business Operations
                  </h1>
                  <p>
                    Your network is the operating layer behind every user, branch, application,
                    cloud workload, and customer interaction. QCS helps businesses configure,
                    troubleshoot, secure, and support their network infrastructure with SLA-based
                    engineering support across firewalls, routers, switches, SD-WAN, VPN, Wi-Fi,
                    and cloud networking.
                  </p>
                  <p>
                    From one-time specialised configuration to long-term managed network support,
                    we provide remote and onsite assistance for business-critical infrastructure
                    where downtime is not an option.
                  </p>
                  <div className="d-flex gap-3 flex-wrap">
                    <Link href="/contact" className="btn btn-dark">
                      Get Network Support
                    </Link>
                    <Link href="/contact?intent=network-support" className="btn btn-outline-dark">
                      Talk to a Network Engineer
                    </Link>
                  </div>
                  <div className="row g-2 mt-3">
                    {trustBadges.map((badge) => (
                      <div key={badge} className="col-md-6 col-lg-4">
                        <span className="badge text-bg-light p-2">{badge}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-5">
                  <SectionTitle
                    eyebrow="Reliable Infrastructure for Predictable Operations"
                    title="A Governed Network Support System, Not Just Break-Fix Assistance"
                  />
                  <p>
                    Most network issues are not isolated incidents. A firewall rule, routing
                    change, VPN drop, WAN failure, or Wi-Fi misconfiguration can affect users,
                    applications, security, and revenue at the same time.
                  </p>
                  <p>
                    QCS brings a structured support model to your network environment: diagnose the
                    issue, stabilise the service, harden the configuration, document the change,
                    and support the infrastructure through SLA-led operations.
                  </p>
                  <div className="row g-3">
                    {architecturePillars.map((pillar, idx) => (
                      <div key={pillar.title} className="col-md-4">
                        <article className="cs_card cs_style_1 p-4 h-100">
                          <h3 className="h5">0{idx + 1}. {pillar.title}</h3>
                          <p className="mb-0">{pillar.description}</p>
                        </article>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-5">
                  <SectionTitle title="Your Network Should Not Become a Business Risk" />
                  <div className="row g-3">{painCards.map((card,idx)=><div key={card.title} className="col-md-4"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">0{idx+1}. {card.title}</h3><p className="mb-0">{card.description}</p></div></div>)}</div>
                </section>

                <section className="mb-5">
                  <SectionTitle title="The Old Support Model Is Not Built for Modern Infrastructure" />
                  <div className="row g-4">
                    <div className="col-md-6"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">Old Model</h3><ul>{oldModelItems.map((i)=><li key={i}>{i}</li>)}</ul></div></div>
                    <div className="col-md-6"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">QCS Model</h3><ul>{qcsModelItems.map((i)=><li key={i}>{i}</li>)}</ul></div></div>
                  </div>
                </section>

                <section className="mb-5">
                  <SectionTitle
                    eyebrow="Our Network Support Services"
                    title="Complete Network Configuration, Troubleshooting & Managed Support"
                  />
                  <p>
                    We support businesses across the full network lifecycle: installation,
                    configuration, migration, optimisation, troubleshooting, documentation, and
                    continuous support.
                  </p>
                  <div className="row g-4">
                    {networkServices.map((service) => (
                      <article key={service.title} className="col-lg-6">
                        <div className="cs_card cs_style_1 p-4 h-100">
                          <h3 className="h4">{service.title}</h3>
                          <p>{service.description}</p>
                          <ul>
                            {service.bullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="mb-5">
                  <SectionTitle title="Need a Freelance Network Engineer for a Specific Task?" />
                  <ul>{freelanceItems.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>

                <section className="mb-5">
                  <SectionTitle title="24x7 Network Support for Critical Business Infrastructure" />
                  <ul>{managedSupportItems.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>

                <section className="mb-5">
                  <SectionTitle title="Support Across Leading Network & Security Vendors" />
                  <div className="row g-3">
                    {vendors.map((vendor) => (
                      <div key={vendor} className="col-6 col-md-4 col-lg-3">
                        <div className="cs_card cs_style_1 p-3 text-center h-100">{vendor}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-5">
                  <SectionTitle title="Network Support for Real Business Scenarios" />
                  <div className="row g-4">
                    {useCases.map((useCase) => (
                      <article key={useCase.title} className="col-md-6 col-lg-4">
                        <div className="cs_card cs_style_1 p-4 h-100">
                          <h3 className="h5">{useCase.title}</h3>
                          <p className="mb-0">{useCase.description}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="mb-5">
                  <SectionTitle title="Network Support for Offices, Branches, Plants & Cloud-First Teams" />
                  <div className="row g-2">
                    {industries.map((industry) => (
                      <div key={industry} className="col-sm-6 col-lg-4">
                        <div className="cs_card cs_style_1 p-3 h-100">{industry}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-5">
                  <SectionTitle title="Diagnose. Stabilize. Secure. Support." />
                  <SectionTitle title="Diagnose. Stabilise. Secure. Support." />
                  <div className="row g-3">
                    {processSteps.map((step, idx) => (
                      <div key={step.title} className="col-md-6">
                        <div className="cs_card cs_style_1 p-4 h-100">
                          <h3 className="h5">{idx + 1}. {step.title}</h3>
                          <p className="mb-0">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-5">
                  <SectionTitle title="Engineering Discipline for Your Network Operations" />
                  <p>QCS brings the same systems-thinking used across automation, product, AI and growth engineering into network infrastructure support. We focus on secure configuration, operational clarity, controlled delivery and measurable support quality — not temporary fixes that create future instability.</p>
                  <div className="row g-3">{whyPrinciples.map((p,idx)=><div key={p.title} className="col-md-4"><div className="cs_card cs_style_1 p-4 h-100"><h3 className="h5">{idx+1}. {p.title}</h3><p className="mb-0">{p.description}</p></div></div>)}</div>
                  <ul className="mt-3">{differentiators.map((item) => <li key={item}>{item}</li>)}</ul>
                  <ul>{differentiators.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>

                <section className="mb-5">
                  <SectionTitle title="Frequently Asked Questions" />
                  {faqs.map(([question, answer], idx) => (
                    <details key={question} className="cs_card cs_style_1 p-3 mb-3" open={idx === 0}>
                      <summary className="fw-semibold">{question}</summary>
                      <p className="mt-2 mb-0">{answer}</p>
                    </details>
                  ))}
                </section>

                <Testimonial />
                <AwardsHomeOne style_2={true} />
                <BlogHomeOne />

                <section className="cs_card cs_style_1 p-4 p-lg-5 text-center mb-5">
                  <h2>Need Reliable Network Support Today?</h2>
                  <p>
                    Whether you need a freelance network engineer, a firewall specialist, FortiGate
                    or Cisco configuration support, SD-WAN troubleshooting, cloud networking
                    assistance, or 24x7 SLA-based managed network support, QCS can help.
                  </p>
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <Link href="/contact?intent=network-support" className="btn btn-dark">
                      Talk to a Network Engineer
                    </Link>
                    <Link
                      href="/contact?intent=remote-troubleshooting"
                      className="btn btn-outline-dark"
                    >
                      Request Remote Troubleshooting
                    </Link>
                  </div>
                </section>
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
