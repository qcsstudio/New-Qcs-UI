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

const Spacer = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
  const spacingClass = {
    sm: "cs_height_80 cs_height_lg_40",
    md: "cs_height_100 cs_height_lg_60",
    lg: "cs_height_150 cs_height_lg_80",
  }[size];

  return <div className={spacingClass} />;
};

const SectionTitle = ({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) => (
  <div className="cs_section_heading cs_style_1 mb-4">
    <div className="cs_section_heading_text">
      {eyebrow ? (
        <p className="text-uppercase mb-2 anim_text">{eyebrow}</p>
      ) : null}
      <h2 className="cs_section_title anim_heading_title">{title}</h2>
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
            <Spacer size="lg" />
            <div className="container">
              <section className="cs_card cs_style_1 p-4 p-lg-5 anim_div_ShowDowns">
                <p className="text-uppercase mb-2 anim_text">
                  Network Infrastructure Support
                </p>
                <h1 className="cs_section_title anim_heading_title">
                  24x7 Network Support for Secure, Stable & Always-On Business
                  Operations
                </h1>
                <p className="anim_text">
                  Your network is the operating layer behind every user, branch,
                  application, cloud workload, and customer interaction. QCS
                  helps businesses configure, troubleshoot, secure, and support
                  their network infrastructure with SLA-based engineering
                  support across firewalls, routers, switches, SD-WAN, VPN,
                  Wi-Fi, and cloud networking.
                </p>
                <p className="anim_text">
                  From one-time specialised configuration to long-term managed
                  network support, we provide remote and onsite assistance for
                  business-critical infrastructure where downtime is not an
                  option.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Link href="/contact" className="btn btn-dark">
                    Get Network Support
                  </Link>
                  <Link
                    href="/contact?intent=network-support"
                    className="btn btn-outline-dark"
                  >
                    Talk to a Network Engineer
                  </Link>
                </div>
                <div className="row g-2 mt-3">
                  {trustBadges.map((badge) => (
                    <div
                      key={badge}
                      className="col-md-6 col-lg-4 anim_div_ShowDowns"
                    >
                      <span className="badge text-bg-light p-2">{badge}</span>
                    </div>
                  ))}
                </div>
              </section>

              <Spacer />

              <section>
                <SectionTitle
                  eyebrow="Reliable Infrastructure for Predictable Operations"
                  title="A Governed Network Support System, Not Just Break-Fix Assistance"
                />
                <p className="anim_text">
                  Most network issues are not isolated incidents. A firewall
                  rule, routing change, VPN drop, WAN failure, or Wi-Fi
                  misconfiguration can affect users, applications, security, and
                  revenue at the same time.
                </p>
                <p className="anim_text">
                  QCS brings a structured support model to your network
                  environment: diagnose the issue, stabilise the service, harden
                  the configuration, document the change, and support the
                  infrastructure through SLA-led operations.
                </p>
                <div className="row g-3">
                  {architecturePillars.map((pillar, idx) => (
                    <div key={pillar.title} className="col-md-4">
                      <article className="cs_card cs_style_1 p-4 h-100 anim_div_ShowDowns">
                        <h3 className="h5 anim_heading_title">
                          0{idx + 1}. {pillar.title}
                        </h3>
                        <p className="mb-0 anim_text">{pillar.description}</p>
                      </article>
                    </div>
                  ))}
                </div>
              </section>

              <Spacer />

              <section>
                <SectionTitle title="Your Network Should Not Become a Business Risk" />
                <div className="row g-3">
                  {painCards.map((card, idx) => (
                    <div key={card.title} className="col-md-4">
                      <article className="cs_card cs_style_1 p-4 h-100 anim_div_ShowDowns">
                        <h3 className="h5 anim_heading_title">
                          0{idx + 1}. {card.title}
                        </h3>
                        <p className="mb-0 anim_text">{card.description}</p>
                      </article>
                    </div>
                  ))}
                </div>
              </section>

              <Spacer />

              <section>
                <SectionTitle title="The Old Support Model Is Not Built for Modern Infrastructure" />
                <div className="row g-4">
                  <div className="col-md-6">
                    <article className="cs_card cs_style_1 p-4 h-100 anim_div_ShowDowns">
                      <h3 className="h5 anim_heading_title">Old Model</h3>
                      <ul className="anim_text">
                        {oldModelItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  </div>
                  <div className="col-md-6">
                    <article className="cs_card cs_style_1 p-4 h-100 anim_div_ShowDowns">
                      <h3 className="h5 anim_heading_title">QCS Model</h3>
                      <ul className="anim_text">
                        {qcsModelItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </div>
              </section>

              <Spacer size="md" />

              <section>
                <SectionTitle
                  eyebrow="Our Network Support Services"
                  title="Complete Network Configuration, Troubleshooting & Managed Support"
                />
                <p className="anim_text">
                  We support businesses across the full network lifecycle:
                  installation, configuration, migration, optimisation,
                  troubleshooting, documentation, and continuous support.
                </p>
                <div className="cs_card_1_list">
                  {networkServices.map((service, idx) => (
                    <article
                      key={service.title}
                      className="cs_card cs_style_1 cs_color_1 anim_div_ShowDowns"
                    >
                      <div className="cs_card_left">
                        <div
                          className="cs_card_number cs_primary_font"
                          style={{
                            backgroundImage: "url(/assets/img/hero_img_1.jpg)",
                          }}
                        >
                          0{idx + 1}
                        </div>
                      </div>
                      <div className="cs_card_right">
                        <div className="cs_card_right_in">
                          <h3 className="cs_card_title anim_heading_title">
                            {service.title}
                          </h3>
                          <p className="cs_card_subtitle anim_text">
                            {service.description}
                          </p>
                          <ul className="anim_text">
                            {service.bullets.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <Spacer size="md" />

              <section>
                <SectionTitle title="Need a Freelance Network Engineer for a Specific Task?" />
                <ul className="anim_text">
                  {freelanceItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <Spacer />

              <section>
                <SectionTitle title="24x7 Network Support for Critical Business Infrastructure" />
                <ul className="anim_text">
                  {managedSupportItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <Spacer />

              <section>
                <SectionTitle title="Support Across Leading Network & Security Vendors" />
                <div className="row g-3">
                  {vendors.map((vendor) => (
                    <div key={vendor} className="col-6 col-md-4 col-lg-3">
                      <div className="cs_card cs_style_1 p-3 text-center h-100 anim_div_ShowDowns">
                        {vendor}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <Spacer />

              <section>
                <SectionTitle title="Network Support for Real Business Scenarios" />
                <div className="row g-4">
                  {useCases.map((useCase) => (
                    <div key={useCase.title} className="col-md-6 col-lg-4">
                      <article className="cs_card cs_style_1 p-4 h-100 anim_div_ShowDowns">
                        <h3 className="h5 anim_heading_title">
                          {useCase.title}
                        </h3>
                        <p className="mb-0 anim_text">{useCase.description}</p>
                      </article>
                    </div>
                  ))}
                </div>
              </section>

              <Spacer />

              <section>
                <SectionTitle title="Network Support for Offices, Branches, Plants & Cloud-First Teams" />
                <div className="row g-2">
                  {industries.map((industry) => (
                    <div key={industry} className="col-sm-6 col-lg-4">
                      <div className="cs_card cs_style_1 p-3 h-100 anim_div_ShowDowns">
                        {industry}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <Spacer size="md" />

              <section>
                <SectionTitle title="Diagnose. Stabilise. Secure. Support." />
                <div className="cs_work cs_work_1">
                  <div className="cs_card_work cs_style_1">
                    {processSteps.map((step, idx) => (
                      <article
                        key={step.title}
                        className="cs_card cs_mt_nthchild_0 anim_div_ShowDowns"
                      >
                        <div className="cs_card cs_style_1">
                          <div className="cs_posagation">
                            <div className="cs_work_style_1" />
                            <div className="cs_work_style_2" />
                          </div>
                          <div className="cs_stroke_number">
                            <span>0{idx + 1}</span>
                          </div>
                        </div>
                        <h3 className="cs_work_title anim_heading_title">
                          {step.title}
                        </h3>
                        <p className="cs_work_subtitle anim_text">
                          {step.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <Spacer />

              <section>
                <SectionTitle title="Engineering Discipline for Your Network Operations" />
                <p className="anim_text">
                  QCS brings the same systems-thinking used across automation,
                  product, AI and growth engineering into network infrastructure
                  support. We focus on secure configuration, operational
                  clarity, controlled delivery and measurable support quality —
                  not temporary fixes that create future instability.
                </p>
                <div className="row g-3">
                  {whyPrinciples.map((principle, idx) => (
                    <div key={principle.title} className="col-md-4">
                      <article className="cs_card cs_style_1 p-4 h-100 anim_div_ShowDowns">
                        <h3 className="h5 anim_heading_title">
                          {idx + 1}. {principle.title}
                        </h3>
                        <p className="mb-0 anim_text">
                          {principle.description}
                        </p>
                      </article>
                    </div>
                  ))}
                </div>
                <ul className="mt-3 anim_text">
                  {differentiators.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <Spacer />

              <section>
                <SectionTitle title="Frequently Asked Questions" />
                {faqs.map(([question, answer], idx) => (
                  <details
                    key={question}
                    className="cs_card cs_style_1 p-3 mb-3 anim_div_ShowDowns"
                    open={idx === 0}
                  >
                    <summary className="fw-semibold anim_heading_title">
                      {question}
                    </summary>
                    <p className="mt-2 mb-0 anim_text">{answer}</p>
                  </details>
                ))}
              </section>

              <Spacer size="md" />

              <Testimonial />
              <AwardsHomeOne style_2={true} />
              <BlogHomeOne />

              <Spacer size="md" />

              <section className="cs_card cs_style_1 p-4 p-lg-5 text-center anim_div_ShowDowns">
                <h2 className="anim_heading_title">
                  Need Reliable Network Support Today?
                </h2>
                <p className="anim_text">
                  Whether you need a freelance network engineer, a firewall
                  specialist, FortiGate or Cisco configuration support, SD-WAN
                  troubleshooting, cloud networking assistance, or 24x7
                  SLA-based managed network support, QCS can help.
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link
                    href="/contact?intent=network-support"
                    className="btn btn-dark"
                  >
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
            <Spacer size="md" />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
}
