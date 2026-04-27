

import React from 'react';
import Wrapper from '@/layouts/Wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import AboutHomeFour from '@/components/about/AboutHomeFour';
import PortfolioDetailsArea from '@/components/details/PortfolioDetailsArea';


export const metadata = {
  title: 'Portfolio Details | QuantumCrafters Studio',
  description: 'Case studies and project outcomes delivered by QuantumCrafters Studio.',
};


const index = () => {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <PortfolioDetailsArea />
            <AboutHomeFour />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default index;