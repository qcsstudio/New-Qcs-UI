import type { ReactNode } from "react";
import {
  FAQSection,
  FinalCTA,
  FreelanceSupportSection,
  IndustriesSection,
  ManagedSupportSection,
  NetworkServicesGrid,
  ProblemSection,
  ProcessSection,
  ServiceHero,
  UseCasesSection,
  VendorSupportSection,
} from "@/components/network-support/NetworkSupportSections";
import Wrapper from "@/layouts/Wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";

const differentiators = [
  "Multi-vendor technical capability",
  "Remote and onsite support options",
  "Freelance and managed support models",
  "24x7 SLA-based assistance",
  "Practical troubleshooting approach",
  "Firewall, SD-WAN, VPN, cloud and LAN/WAN expertise",
  "Clear communication and documentation",
  "Support for both urgent issues and planned projects",
];

export default function NetworkSupportPage({ children }: { children?: ReactNode }) {
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
                <ServiceHero />
                <ProblemSection />
                <NetworkServicesGrid />
                <FreelanceSupportSection />
                <ManagedSupportSection />
                <VendorSupportSection />
                <UseCasesSection />
                <IndustriesSection />

                <section className="mb-5">
                  <h2>Professional Support. Practical Execution. SLA-Driven Delivery.</h2>
                  <p>
                    We combine hands-on network engineering with a business-first support model.
                    Our focus is not only to configure devices, but to make sure your network is
                    secure, stable, documented and ready for growth.
                  </p>
                  <ul>
                    {differentiators.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <ProcessSection />
                <FAQSection />
                <FinalCTA />
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
