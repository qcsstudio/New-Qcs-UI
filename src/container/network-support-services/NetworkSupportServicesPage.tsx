import type { ReactNode } from "react";
import Link from "next/link";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import Testimonial from "@/components/testimonial/Testimonial";
import AwardsHomeOne from "@/components/awards/AwardsHomeOne";
import BlogHomeOne from "@/components/blog/BlogHomeOne";
import FaqAccordion from "@/components/faq/FaqAccordion";
import {
  architecturePillars,
  differentiators,
  faqs,
  freelanceItems,
  heroStats,
  industries,
  managedSupportItems,
  networkServices,
  oldModelItems,
  painCards,
  processSteps,
  qcsModelItems,
  topologyNodes,
  trustBadges,
  useCases,
  vendors,
  whyPrinciples,
} from "@/data/networkSupportPage";

type CardItem = {
  title: string;
  description: string;
};

type SectionShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
};

const Spacer = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
  const spacingClass = {
    sm: "cs_height_80 cs_height_lg_40",
    md: "cs_height_100 cs_height_lg_60",
    lg: "cs_height_150 cs_height_lg_80",
  }[size];

  return <div className={spacingClass} />;
};

const ArrowIcon = () => (
  <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M18.5303 7.03033C18.8232 6.73744 18.8232 6.26256 18.5303 5.96967L13.7574 1.1967C13.4645 0.903806 12.9896 0.903806 12.6967 1.1967C12.4038 1.48959 12.4038 1.96447 12.6967 2.25736L16.9393 6.5L12.6967 10.7426C12.4038 11.0355 12.4038 11.5104 12.6967 11.8033C12.9896 12.0962 13.4645 12.0962 13.7574 11.8033L18.5303 7.03033ZM0 7.25H18V5.75H0V7.25Z"
      fill="currentColor"
    />
  </svg>
);

const SectionShell = ({
  eyebrow,
  title,
  description,
  children,
  className = "",
  headerClassName = "",
}: SectionShellProps) => (
  <section className={`network-support-section ${className}`.trim()}>
    <div className={`network-support-section__header ${headerClassName}`.trim()}>
      {eyebrow ? <p className="network-support-eyebrow">{eyebrow}</p> : null}
      <h2 className="network-support-section__title">{title}</h2>
      {description ? <p className="network-support-section__description">{description}</p> : null}
    </div>
    {children}
  </section>
);

const CheckList = ({ items, muted = false }: { items: readonly string[]; muted?: boolean }) => (
  <ul className={`network-support-checklist ${muted ? "network-support-checklist--muted" : ""}`.trim()}>
    {items.map((item) => (
      <li key={item}>
        <span aria-hidden="true">✓</span>
        <strong>{item}</strong>
      </li>
    ))}
  </ul>
);

const InsightGrid = ({
  items,
  columns = "network-support-grid--3",
  tone = "light",
}: {
  items: readonly CardItem[];
  columns?: string;
  tone?: "light" | "warning";
}) => (
  <div className={`network-support-grid ${columns}`.trim()}>
    {items.map((item, index) => (
      <article key={item.title} className={`network-support-card network-support-card--${tone}`}>
        <span className="network-support-card__index">{String(index + 1).padStart(2, "0")}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </article>
    ))}
  </div>
);

const HeroTopology = () => (
  <div className="network-support-topology" aria-label="Network layers covered by QCS support">
    <div className="network-support-topology__header">
      <div>
        <span>Live support model</span>
        <h2>Diagnose → Stabilise → Secure</h2>
      </div>
      <span className="network-support-topology__pulse" aria-hidden="true" />
    </div>
    <div className="network-support-topology__map">
      {topologyNodes.map((node) => (
        <span key={node.label} className={`network-support-topology__node network-support-topology__node--${node.modifier}`}>
          {node.label}
        </span>
      ))}
    </div>
    <div className="network-support-topology__badges">
      {trustBadges.map((badge) => (
        <span key={badge}>{badge}</span>
      ))}
    </div>
  </div>
);

const HeroSection = () => (
  <section className="network-support-hero" aria-labelledby="network-support-hero-title">
    <div className="network-support-hero__content">
      <p className="network-support-eyebrow">Network Infrastructure Support</p>
      <h1 id="network-support-hero-title">24x7 Network Support for Secure, Stable & Always-On Business Operations</h1>
      <p className="network-support-hero__lead">
        Your network is the operating layer behind every user, branch, application, cloud workload, and customer interaction.
        QCS helps businesses configure, troubleshoot, secure, and support their network infrastructure with SLA-based
        engineering support across firewalls, routers, switches, SD-WAN, VPN, Wi-Fi, and cloud networking.
      </p>
      <p>
        From one-time specialised configuration to long-term managed network support, we provide remote and onsite assistance
        for business-critical infrastructure where downtime is not an option.
      </p>
      <div className="network-support-hero__actions">
        <Link href="/contact" className="cs_btn cs_style_1">
          <span>Get Network Support</span>
          <ArrowIcon />
        </Link>
        <Link href="/contact?intent=network-support" className="network-support-link-button">
          Talk to a Network Engineer
        </Link>
      </div>
      <div className="network-support-hero__stats" aria-label="Network support highlights">
        {heroStats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
    <HeroTopology />
  </section>
);

const ComparisonSection = () => (
  <SectionShell
    eyebrow="Support model"
    title="The Old Support Model Is Not Built for Modern Infrastructure"
    description="Modern environments need documented ownership, controlled changes, and a support path that connects firewall, VPN, SD-WAN, cloud, and LAN operations."
    className="network-support-section--comparison"
  >
    <div className="network-support-comparison">
      <article className="network-support-comparison__panel network-support-comparison__panel--old">
        <span>Reactive</span>
        <h3>Old model</h3>
        <CheckList items={oldModelItems} muted />
      </article>
      <article className="network-support-comparison__panel network-support-comparison__panel--new">
        <span>Governed</span>
        <h3>QCS model</h3>
        <CheckList items={qcsModelItems} />
      </article>
    </div>
  </SectionShell>
);

const ServicesSection = () => (
  <SectionShell
    eyebrow="Our network support services"
    title="Complete Network Configuration, Troubleshooting & Managed Support"
    description="We support businesses across the full network lifecycle: installation, configuration, migration, optimisation, troubleshooting, documentation, and continuous support."
  >
    <div className="network-support-services-grid">
      {networkServices.map((service, index) => (
        <article key={service.title} className="network-support-service-card">
          <div className="network-support-service-card__header">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{service.title}</h3>
          </div>
          <p>{service.description}</p>
          <CheckList items={service.bullets} />
        </article>
      ))}
    </div>
  </SectionShell>
);

const EngagementSection = () => (
  <SectionShell
    eyebrow="Engagement options"
    title="Use QCS for a One-Time Network Task or Continuous SLA Support"
    description="Choose the support format that fits the urgency and ownership model of your infrastructure."
  >
    <div className="network-support-engagement">
      <article>
        <span>Project / freelance</span>
        <h3>Need a Freelance Network Engineer for a Specific Task?</h3>
        <CheckList items={freelanceItems} />
      </article>
      <article>
        <span>Managed operations</span>
        <h3>24x7 Network Support for Critical Business Infrastructure</h3>
        <CheckList items={managedSupportItems} />
      </article>
    </div>
  </SectionShell>
);

const VendorSection = () => (
  <SectionShell
    eyebrow="Multi-vendor coverage"
    title="Support Across Leading Network & Security Vendors"
    description="QCS can coordinate troubleshooting and configuration across the platforms commonly found in multi-branch and cloud-connected businesses."
  >
    <div className="network-support-pill-cloud">
      {vendors.map((vendor) => (
        <span key={vendor}>{vendor}</span>
      ))}
    </div>
  </SectionShell>
);

const ProcessSection = () => (
  <SectionShell
    eyebrow="Delivery workflow"
    title="Diagnose. Stabilise. Secure. Support."
    description="Every support request follows a clear operating rhythm so fixes are controlled, validated, and documented."
  >
    <div className="network-support-timeline">
      {processSteps.map((step, index) => (
        <article key={step.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </article>
      ))}
    </div>
  </SectionShell>
);

const WhySection = () => (
  <SectionShell
    eyebrow="Why QCS"
    title="Engineering Discipline for Your Network Operations"
    description="Practical troubleshooting, clear handover, and support for urgent incidents and planned projects."
    className="network-support-section--dark"
  >
    <div className="network-support-why">
      <div>
        <h3>What you get</h3>
        <CheckList items={differentiators} />
      </div>
      <div className="network-support-why__principles">
        {whyPrinciples.map((principle, index) => (
          <article key={principle.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </article>
        ))}
      </div>
    </div>
  </SectionShell>
);

const CtaSection = () => (
  <section className="network-support-cta">
    <p className="network-support-eyebrow">Ready for stable operations?</p>
    <h2>Need Reliable Network Support Today?</h2>
    <p>
      Whether you need a freelance network engineer, a firewall specialist, FortiGate or Cisco configuration support,
      SD-WAN troubleshooting, cloud networking assistance, or 24x7 SLA-based managed network support, QCS can help.
    </p>
    <div className="network-support-hero__actions network-support-cta__actions">
      <Link href="/contact?intent=network-support" className="cs_btn cs_style_1">
        <span>Talk to a Network Engineer</span>
        <ArrowIcon />
      </Link>
      <Link href="/contact?intent=remote-troubleshooting" className="network-support-link-button">
        Request Remote Troubleshooting
      </Link>
    </div>
  </section>
);

export default function NetworkSupportServicesPage({ children }: { children?: ReactNode }) {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="network-support-page">
            {children}
            <Spacer size="lg" />
            <div className="container">
              <HeroSection />

              <Spacer />

              <SectionShell
                eyebrow="Reliable infrastructure for predictable operations"
                title="A Governed Network Support System, Not Just Break-Fix Assistance"
                description="QCS brings a structured support model to your network environment: diagnose the issue, stabilise the service, harden the configuration, document the change, and support the infrastructure through SLA-led operations."
              >
                <InsightGrid items={architecturePillars} />
              </SectionShell>

              <Spacer />

              <SectionShell title="Your Network Should Not Become a Business Risk" headerClassName="network-support-section__header--compact">
                <InsightGrid items={painCards} tone="warning" />
              </SectionShell>

              <Spacer />

              <ComparisonSection />

              <Spacer size="md" />

              <ServicesSection />

              <Spacer />

              <EngagementSection />

              <Spacer />

              <VendorSection />

              <Spacer />

              <SectionShell title="Network Support for Real Business Scenarios" headerClassName="network-support-section__header--compact">
                <InsightGrid items={useCases} columns="network-support-grid--3" />
              </SectionShell>

              <Spacer />

              <SectionShell title="Network Support for Offices, Branches, Plants & Cloud-First Teams" headerClassName="network-support-section__header--compact">
                <div className="network-support-pill-cloud network-support-pill-cloud--muted">
                  {industries.map((industry) => (
                    <span key={industry}>{industry}</span>
                  ))}
                </div>
              </SectionShell>

              <Spacer />

              <ProcessSection />

              <Spacer />

              <WhySection />

              <Spacer />

              <SectionShell title="Frequently Asked Questions" headerClassName="network-support-section__header--compact">
                <FaqAccordion faqs={faqs} />
              </SectionShell>

              <Spacer />

              <CtaSection />
            </div>

            <Spacer />
            <Testimonial />
            <AwardsHomeOne />
            <BlogHomeOne />
            <Spacer />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
}
