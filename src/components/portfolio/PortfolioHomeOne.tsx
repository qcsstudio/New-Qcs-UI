'use client'
import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

import { Swiper, SwiperSlide } from "swiper/react";

import portfolio_img_1 from '@/assets/img/portfolio_1.jpg';
import portfolio_img_2 from '@/assets/img/portfolio_2.jpg';
import portfolio_img_3 from '@/assets/img/portfolio_3.jpg';

interface DataType {
  img: StaticImageData;
  title: string;
  category: string;
}[]

const portfolio_slider: DataType[] = [
  {
    img: portfolio_img_1,
    title: ` AI Agent CRM for B2B SaaS`,
    category: ` Mid-market SaaS with long sales cycles; SDR bandwidth tight.`,
  },
  {
    img: portfolio_img_2,
    title: `Ecommerce Funnel Personalization`,
    category: `D2C brand with high traffic, flat AOV, rising CAC.`,
  },
  {
    img: portfolio_img_3,
    title: `AI Helpdesk for Fintech Support`,
    category: ` Regulated fintech with L1 ticket volume spikes.`,
  },
  {
    img: portfolio_img_1,
    title: ` Local SEO + LinkedIn Lead Engine`,
    category: `B2B services firm expanding into new geos.`,
  },
  {
    img: portfolio_img_2,
    title: `Headless Web/App for D2C Scale`,
    category: ` Rapid product launches; site speed + ops bottlenecks`,
  },
  // {
  //   img: portfolio_img_3,
  //   title: `Project Task Management`,
  //   category: `Digital Services / Figma Design`,
  // },
]


const PortfolioHomeOne = () => {
  return (
    <>
      <div className="cs_horizontal_scroll_wrap">
        <div className="cs_height_145 cs_height_lg_60"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 cs_type_2">
            <div className="cs_section_heading_text">
              <div className="cs_section_subtitle anim_div_ShowZoom">
                Portfolio
              </div>
              <h2 className="cs_section_title anim_heading_title">
                Some Recent Project We Successfully Done
              </h2>
            </div>
          </div>
          <div className="cs_height_100 cs_height_lg_60"></div>
        </div>
        <Swiper
          loop={true}
          speed={1000}
          slidesPerView="auto" 
          pagination={{
            el: ".cs_pagination",
            clickable: true,
          }}
          className="cs_horizontal_scrolls anim_div_ShowDowns">
          {portfolio_slider.map((item, i) =>
            <SwiperSlide key={i} className="swiper-slide">
              <div className="cs_horizontal_scroll">
                <Link href="/portfolio-details" className="cs_portfolio cs_style_1">
                  <div className="cs_portfolio_img">
                    <Image src={item.img} alt="Thumb" />
                  </div>
                  <div className="cs_portfolio_overlay"></div>
                  <div className="cs_portfolio_info">
                    <h2 className="cs_portfolio_title">
                      {item.title}
                    </h2>
                    <div className="cs_portfolio_subtitle">
                      {item.category}
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          )} 

        </Swiper>
      </div>
      <div className="cs_height_145 cs_height_lg_60"></div>
    </>
  );
};

export default PortfolioHomeOne;