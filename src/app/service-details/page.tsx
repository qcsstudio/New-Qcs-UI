
'use client'


import AboutUs from '@/components/about/AboutUs';
import BrandHomeOne from '@/components/brand/BrandHomeOne';
import ServiceDetailsFaq from '@/components/faq/ServiceDetailsFaq';
import FeatureHomeTwo from '@/components/feature/FeatureHomeTwo';
import HeroServiceDetails from '@/components/hero/HeroServiceDetails';
import InnovativeHomeTwo from '@/components/innovative/InnovativeHomeTwo';
import PipelineSection from '@/components/service/PipelineSection';
import ServiceAreaDetails from '@/components/service/ServiceAreaDetails';
import Testimonial from '@/components/testimonial/Testimonial';
import Wrapper from '@/layouts/Wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import React from 'react';
import { featureDataservice } from "@/data/featureData";

// export const metadata = {
//   title: "Service Details Vixan - Digital  Creative Agency Next js Template",
// };


const index = () => {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroServiceDetails />
            <InnovativeHomeTwo />
            <PipelineSection />
            <ServiceDetailsFaq />
            <Testimonial />
            <ServiceAreaDetails />
            <BrandHomeOne style_2={false} />
            <FeatureHomeTwo feature_data={featureDataservice} />
            <AboutUs />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default index;