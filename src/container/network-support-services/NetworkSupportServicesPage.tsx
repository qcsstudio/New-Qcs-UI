import Link from "next/link";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
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

const SectionHeading = ({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
}) => (
  <div className={`cs_section_heading cs_style_1 ${dark ? "cs_color_1" : ""}`}>
    <div className="cs_section_heading_text">
      {eyebrow ? <div className="cs_section_subtitle anim_div_ShowZoom">{eyebrow}</div> : null}
      <h2 className={`cs_section_title anim_heading_title ${dark ? "text-white" : ""}`}>{title}</h2>
      {description ? <p className={`anim_text mb-0 ${dark ? "text-white" : ""}`}>{description}</p> : null}
    </div>
  </div>
);

const ArrowIcon = () => (
  <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.5303 7.03033C18.8232 6.73744 18.8232 6.26256 18.5303 5.96967L13.7574 1.1967C13.4645 0.903806 12.9896 0.903806 12.6967 1.1967C12.4038 1.48959 12.4038 1.96447 12.6967 2.25736L16.9393 6.5L12.6967 10.7426C12.4038 11.0355 12.4038 11.5104 12.6967 11.8033C12.9896 12.0962 13.4645 12.0962 13.7574 11.8033L18.5303 7.03033ZM0 7.25H18V5.75H0V7.25Z"
      fill="currentColor"
    />
  </svg>
);

const CheckList = ({ items, light = false }: { items: readonly string[]; light?: boolean }) => (
  <ul className="cs_mp0" style={{ lineHeight: "1.9", listStyle: "none", padding: 0 }}>
    {items.map((item) => (
      <li key={item} className="d-flex gap-2 align-items-start">
        <span className={light ? "text-white" : "text-dark"}>→</span>
        <span className={light ? "text-white" : ""}>{item}</span>
      </li>
    ))}
  </ul>
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

            {/* 1. Hero - modelled after HeroHomeThree */}
            <section>
              <div className="container">
                <section className="network-support-hero mb-5 cs_card cs_style_1 p-4 p-lg-5 anim_div_ShowDowns">
                  <div className="row align-items-center g-4 g-xl-5">
                    <div className="col-lg-7">
                      <div className="cs_section_heading cs_style_1 mb-4">
                        <div className="cs_section_heading_text">
                          <p className="text-uppercase mb-2 anim_text">
                            Network Infrastructure Support
                          </p>
                          <h1 className="cs_section_title anim_heading_title">
                            24x7 Network Support for Secure, Stable & Always-On Business Operations
                          </h1>
                        </div>
                      </div>
                      <p className="anim_text">
                        Your network is the operating layer behind every user, branch, application,
                        cloud workload, and customer interaction. QCS helps businesses configure,
                        troubleshoot, secure, and support their network infrastructure with SLA-based
                        engineering support across firewalls, routers, switches, SD-WAN, VPN, Wi-Fi,
                        and cloud networking.
                      </p>
                      <p className="anim_text">
                        From one-time specialised configuration to long-term managed network support,
                        we provide remote and onsite assistance for business-critical infrastructure
                        where downtime is not an option.
                      </p>
                      <div className="cs_height_20 cs_height_lg_20" />
                      <div className="d-flex gap-3 flex-wrap anim_div_ShowDowns">
                        <Link href="/contact" className="btn btn-dark">
                          Get Network Support
                        </Link>
                        <Link href="/contact?intent=network-support" className="btn btn-outline-dark">
                          Talk to a Network Engineer
                        </Link>
                      </div>
                      <div className="row g-2 mt-3 anim_div_ShowDowns">
                        {trustBadges.map((badge) => (
                          <div key={badge} className="col-md-6 col-lg-4">
                            <span className="badge text-bg-light p-2">{badge}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-lg-5">
                      <div
                        className="network-support-hero__topology-card anim_div_ShowDowns"
                        aria-label="Network support topology status"
                      >
                        <div className="network-support-hero__card-header">
                          <div>
                            <span className="network-support-hero__eyebrow">Live Operations View</span>
                            <h2 className="network-support-hero__card-title">Topology Health</h2>
                          </div>
                          <span className="network-support-hero__pulse" aria-hidden="true" />
                        </div>

                        <div className="network-support-hero__topology" aria-hidden="true">
                          <div className="network-support-hero__node network-support-hero__node--users">
                            <span>Users / Branches</span>
                          </div>
                          <div className="network-support-hero__node network-support-hero__node--edge">
                            <span>Firewall / SD-WAN</span>
                          </div>
                          <div className="network-support-hero__node network-support-hero__node--core">
                            <span>Core Network</span>
                          </div>
                          <div className="network-support-hero__node network-support-hero__node--cloud">
                            <span>Cloud / Apps</span>
                          </div>
                        </div>

                        <div className="network-support-hero__status-grid">
                          {["Secure", "Online", "SLA Active", "Policy Synced"].map((status) => (
                            <span key={status} className="network-support-hero__status-pill">
                              {status}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
              <div className="cs_hero cs_style2">
                <div
                  className="cs_hero_bg cs_bg cs_parallax_bg"
                  style={{ backgroundImage: "url(/assets/img/design_banner.jpg)" }}
                />
                <div className="textupdowns">
                  <div className="cs_left_text">
                    <span className="cs_arrow">
                      <ArrowIcon />
                    </span>
                    <p>SCROLL DOWN</p>
                  </div>
                </div>

                <div className="container">
                  <div className="cs_hero_text">
                    <div className="anim_banner_text_left">
                      <h1 className="cs_hero_title cs_hero_title_lg">QCS</h1>
                    </div>
                    <div className="anim_banner_text_right">
                      <h6 className="cs_hero_title cs_hero_title_lg">Network Support Engine</h6>
                    </div>
                    <div className="cs_height_50 cs_height_lg_50" />
                    <div className="cs_hero_subtitle">
                      <div className="anim_subtext">
                        <p className="cs_hero_mini_details">
                          24x7 network support for secure, stable, always-on operations across
                          firewalls, routers, switches, SD-WAN, VPN, Wi-Fi, and cloud networking.
                        </p>
                      </div>
                      <div className="cs_section_heading_right cs_btn_anim">
                        <Link href="/contact?intent=network-support" className="cs_btn cs_style_1 cs_color_1">
                          <span>Get Network Support</span>
                          <ArrowIcon />
                        </Link>
                      </div>
                    </div>

                    <div className="row g-2 mt-5 anim_div_ShowLeftSide">
                      {trustBadges.map((badge) => (
                        <div key={badge} className="col-md-6 col-lg-4">
                          <span className="badge text-bg-light p-2">{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="cs_right_text">
                  <p className="colorChanegs t1">Firewall</p>
                  <p className="colorChanegs t1">SD-WAN</p>
                  <p className="colorChanegs t1">Cloud</p>
                </div>
              </div>
            </section>

            {/* 2. Pain / risk section - modelled after AuditSection and InnovativeHomeTwo rhythm */}
            <div className="cs_height_150 cs_height_lg_60" />
            <section id="network-risk">
              <div className="container">
                <div className="cs_modern_needs cs_style">
                  <div className="cs_col_md_778">
                    <SectionHeading
                      eyebrow="Pain / Risk"
                      title="Your Network Should Not Become a Business Risk"
                      description="Most network issues are not isolated incidents. A firewall rule, routing change, VPN drop, WAN failure, or Wi-Fi misconfiguration can affect users, applications, security, and revenue at the same time."
                    />
                    <div className="cs_height_65 cs_height_lg_30" />
                    <p className="anim_text">
                      QCS stabilises the operating layer behind every branch, workload, device,
                      and customer interaction—before small issues become expensive outages.
                    </p>
                    <div className="cs_height_60 cs_height_lg_30" />
                    <div className="row anim_div_ShowLeftSide">
                      {painCards.map((card, idx) => (
                        <div className="col-md-4 col-12" key={card.title}>
                          <div className="cs_stroke_text">
                            <span>{idx + 1}</span>
                          </div>
                          <div className="text-section">
                            <h6>{card.title}</h6>
                            <p>{card.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="cs_col_md_672">
                    <div className="cs_img_section">
                      <div className="cs_card cs_style_1 p-4 h-100">
                        <h3 className="h4">Risk Signals We Remove</h3>
                        <CheckList
                          items={[
                            "Frequent WAN, VPN, or Wi-Fi instability",
                            "Firewall rules added without review",
                            "Fragmented device backups and documentation",
                            "Slow emergency response during business outages",
                          ]}
                        />
                      </div>
                      <div className="cs_img_card_text anim_div_ShowZoom">
                        <h6 className="cs_color_style">Always-On Operations</h6>
                        <p>Diagnose, stabilise, harden, document, and support with SLA-led ownership.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Architecture / governed support model */}
            <div className="cs_height_150 cs_height_lg_60" />
            <section>
              <div className="container">
                <SectionHeading
                  eyebrow="Architecture / Governed Support Model"
                  title="A Governed Network Support System, Not Just Break-Fix Assistance"
                  description="We bring a structured support model to your network environment: diagnose the issue, stabilise the service, harden the configuration, document the change, and support the infrastructure through SLA-led operations."
                />
                <div className="cs_height_70 cs_height_lg_40" />
                <div className="row g-4 anim_div_ShowLeftSide">
                  {architecturePillars.map((pillar, idx) => (
                    <div key={pillar.title} className="col-md-4">
                      <article className="cs_card cs_style_1 p-4 h-100">
                        <div className="cs_stroke_text">
                          <span>0{idx + 1}</span>
                        </div>
                        <h3 className="h5">{pillar.title}</h3>
                        <p className="mb-0">{pillar.description}</p>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Old Model vs QCS Model - modelled after PipelineSection */}
            <section className="py-5 my-5" style={{ background: "#101010", color: "#fff" }}>
              <div className="container">
                <SectionHeading
                  dark
                  eyebrow="Old Model vs QCS Model"
                  title="The Old Support Model Is Not Built for Modern Infrastructure"
                  description="Modern networks span cloud, branch, SD-WAN, security, wireless, and remote access. They need governed response—not random fixes."
                />
                <div className="cs_height_70 cs_height_lg_40" />
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="p-4 rounded pipeline-box h-100" style={{ background: "#101010" }}>
                      <h3 className="h5 fw-bold text-white">The Old Model</h3>
                      <hr />
                      <CheckList items={oldModelItems} light />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4 rounded pipeline-box h-100" style={{ background: "#101010" }}>
                      <h3 className="h5 fw-bold text-white">The QCS Model</h3>
                      <hr />
                      <CheckList items={qcsModelItems} light />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Services grid */}
            <div className="cs_height_120 cs_height_lg_50" />
            <section>
              <div className="container">
                <SectionHeading
                  eyebrow="Services Grid"
                  title="Complete Network Configuration, Troubleshooting & Managed Support"
                  description="We support businesses across installation, configuration, migration, optimisation, troubleshooting, documentation, and continuous support."
                />
                <div className="cs_height_70 cs_height_lg_40" />
                <div className="row g-4">
                  {networkServices.map((service) => (
                    <article key={service.title} className="col-lg-6">
                      <div className="cs_card cs_style_1 p-4 h-100">
                        <h3 className="h4">{service.title}</h3>
                        <p>{service.description}</p>
                        <CheckList items={service.bullets} />
                      </div>
                    </article>
                  ))}
                </div>

                <div className="cs_height_80 cs_height_lg_40" />
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="cs_card cs_style_1 p-4 h-100">
                      <h3 className="h5">Freelance Network Engineer Support</h3>
                      <CheckList items={freelanceItems} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="cs_card cs_style_1 p-4 h-100">
                      <h3 className="h5">24x7 Managed Network Support</h3>
                      <CheckList items={managedSupportItems} />
                    </div>
                  </div>
                </div>

                <div className="cs_height_80 cs_height_lg_40" />
                <div className="row g-3">
                  {vendors.map((vendor) => (
                    <div key={vendor} className="col-6 col-md-4 col-lg-3">
                      <div className="cs_card cs_style_1 p-3 text-center h-100">{vendor}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Working process - modelled after ServiceAreaDetails */}
            <div className="cs_height_150 cs_height_lg_50" />
            <section>
              <div className="container">
                <div className="cs_work cs_work_text">
                  <h4 className="anim_heading_title">Specialization & Working Process</h4>
                  <p className="cs_mp0 anim_text">
                    Diagnose. Stabilise. Secure. Support. Every engagement is handled through a
                    controlled engineering workflow designed to reduce downtime and preserve change clarity.
                  </p>
                </div>
                <div className="cs_height_80 cs_height_lg_40" />
                <div className="cs_work cs_work_1">
                  <div className="cs_card_work cs_style_1">
                    {processSteps.map((step, idx) => (
                      <div key={step.title} className="cs_card cs_mt_nthchild_0 anim_div_ShowLeftSide">
                        <div className="cs_card cs_style_1">
                          <div className="cs_posagation">
                            <div className="cs_work_style_1" />
                            <div className="cs_work_style_2" />
                          </div>
                          <div className="cs_stroke_number">
                            <span>{String(idx + 1).padStart(2, "0")}</span>
                          </div>
                        </div>
                        <h6 className="cs_work_title">{step.title}</h6>
                        <p className="cs_work_subtitle">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Why QCS - modelled after FeatureHomeTwo */}
            <div className="cs_height_150 cs_height_lg_60" />
            <section className="cs_shape_wrap_3">
              <div className="cs_shape_1">
                <svg width="138" height="118" viewBox="0 0 138 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.3">
                    <path opacity="0.3" d="M61.0693 89.5549C72.1957 74.6168 102.936 49.6405 136.884 69.2405" stroke="#101010" strokeWidth="2" />
                    <path opacity="0.3" d="M74.4465 54.818C82.4465 40.8181 107.447 3.31795 135.251 18.0685" stroke="#101010" strokeWidth="2" />
                    <path opacity="0.3" d="M48.5117 82.305C55.8853 65.2002 62.1455 26.0906 28.1973 6.4906" stroke="#101010" strokeWidth="2" />
                  </g>
                </svg>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-12">
                    <SectionHeading
                      eyebrow="Why QCS"
                      title="Engineering Discipline for Your Network Operations"
                      description="QCS brings systems-thinking from automation, product, AI, and growth engineering into network infrastructure support. We focus on secure configuration, operational clarity, controlled delivery, and measurable support quality—not temporary fixes that create future instability."
                    />
                    <div className="cs_height_70 cs_height_lg_20" />
                    <div className="d-flex gap-4 align-items-center flex-wrap flex-lg-nowrap justify-content-center">
                      <div className="anim_text">
                        <CheckList items={differentiators} />
                      </div>
                      <div className="cs_startup_agency cs_card cs_mr_left">
                        <h6>SLA-Led Ownership</h6>
                        <p className="cs_font_16 cs_mp0">
                          Practical troubleshooting, clear handover, and support for urgent incidents and planned projects.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-12">
                    <div className="cs_startup_agency">
                      {whyPrinciples.map((principle, idx) => (
                        <div key={principle.title} className="cs_startup_agency cs_card">
                          <h6>{idx + 1}. {principle.title}</h6>
                          <p className="cs_font_16 cs_mp0">{principle.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Supporting use cases kept inside the Why/QCS rhythm before FAQ */}
            <div className="cs_height_120 cs_height_lg_50" />
            <section>
              <div className="container">
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
                <div className="row g-2 mt-4">
                  {industries.map((industry) => (
                    <div key={industry} className="col-sm-6 col-lg-4">
                      <div className="cs_card cs_style_1 p-3 h-100">{industry}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

                <section className="mb-5">
                  <SectionTitle title="Frequently Asked Questions" />
                  {faqs.map(({ question, answer }, idx) => (
                    <details key={question} className="cs_card cs_style_1 p-3 mb-3" open={idx === 0}>
                      <summary className="fw-semibold">{question}</summary>
                      <p className="mt-2 mb-0">{answer}</p>
                    </details>
            {/* 8. FAQ */}
            <div className="cs_height_150 cs_height_lg_60" />
            <section>
              <div className="container">
                <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
                <div className="cs_height_70 cs_height_lg_30" />
                <div className="row">
                  {faqs.map(([question, answer], idx) => (
                    <div key={question} className="col-lg-6">
                      <details className="cs_card cs_style_1 p-4 mb-4" open={idx === 0}>
                        <summary className="fw-semibold">{question}</summary>
                        <p className="mt-3 mb-0">{answer}</p>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 9. Final CTA - modelled after AboutUs */}
            <div className="cs_height_150 cs_height_lg_60" />
            <section>
              <div
                className="cs_bg cs_bg_img_about_titile"
                style={{ backgroundImage: "url(/assets/img/about_projec_ttitie_bg.jpg)" }}
              >
                <div className="container">
                  <div className="cs_learning_project">
                    <div className="cs_section_heading cs_style_1">
                      <div className="cs_section_heading_text">
                        <h3 className="cs_section_title_3 cs_color_2 anim_heading_title">
                          Need Reliable Network Support Today?
                        </h3>
                      </div>
                      <p className="pt-5 border-box text-white">
                        Whether you need a freelance network engineer, a firewall specialist,
                        FortiGate or Cisco configuration support, SD-WAN troubleshooting, cloud
                        networking assistance, or 24x7 SLA-based managed network support, QCS can help.
                      </p>
                      <div className="cs_section_heading_right cs_btn_anim d-flex flex-wrap gap-3">
                        <Link href="/contact?intent=network-support" className="cs_btn cs_style_1 cs_color_2">
                          <span>Talk to a Network Engineer</span>
                          <ArrowIcon />
                        </Link>
                        <Link href="/contact?intent=remote-troubleshooting" className="cs_btn cs_style_1 cs_color_2">
                          <span>Request Remote Troubleshooting</span>
                          <ArrowIcon />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
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
