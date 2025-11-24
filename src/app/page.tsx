
'use client'

import AboutUs from "@/components/about/AboutUs";
import AwardsHomeOne from "@/components/awards/AwardsHomeOne";
import BlogHomeOne from "@/components/blog/BlogHomeOne";
import BrandHomeOne from "@/components/brand/BrandHomeOne";
import FeatureHomeTwo from "@/components/feature/FeatureHomeTwo";
import HeroHomeTwo from "@/components/hero/HeroHomeTwo";
import InnovativeHomeTwo from "@/components/innovative/InnovativeHomeTwo";
import PortfolioHomeOne from "@/components/portfolio/PortfolioHomeOne";
import Service from "@/components/service/Service";
import ServiceHomeOne from "@/components/service/ServiceHomeOne";
import Testimonial from "@/components/testimonial/Testimonial";
import VideoHomeTwo from "@/components/video/VideoHomeTwo";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";



// export const metadata = {
//   title: "Vixan - Digital  Creative Agency Next js Template",
// };


const index = () => {

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroHomeTwo />
            <VideoHomeTwo />
            <InnovativeHomeTwo />
            <ServiceHomeOne/>
            <Service />
            <FeatureHomeTwo />
            <PortfolioHomeOne />
            <Testimonial />
            <BrandHomeOne style_2={false} />
            <AwardsHomeOne />
            <BlogHomeOne />
            <AboutUs />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default index;
