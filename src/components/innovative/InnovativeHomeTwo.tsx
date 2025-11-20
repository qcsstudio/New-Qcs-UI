import React from "react";
import Image from "next/image";
import image from "@/assets/img/modern_digital_need.jpg";

interface DataType {
        title_1: string;
        des_1: string;
        title_2: string;
        des_2: string;
        features: {
                id: number;
                title: string;
                des: string;
        }[];
}

const innovative_data: DataType = {
        title_1: `Businesses Don’t Need More Tools. They Need Intelligence.`,
        des_1: `Most companies run dozens of tools, yet work still feels manual, slow and disconnected. QuantumCrafters builds agentic systems that connect your tools, automate workflows and give you one intelligent source of truth across the business.`,
        title_2: `The Agentic Operating System for Growing Businesses`,
        des_2: `AI Isn’t the Future. Agentic Intelligence Is. AI can automate tasks. Agentic systems can analyse, decide, act and improve like a high-performing team. QuantumCrafters designs these systems across your operations, sales, support and digital channels so your business becomes faster, leaner and smarter.`,
        features: [
                {
                        id: 1,
                        title: `Remove Operational Friction`,
                        des: `Automate repetitive tasks across sales, support, HR and ops so your team can focus on real growth.`,
                },
                {
                        id: 2,
                        title: `Make Data Actually Work`,
                        des: `Connect your CRM, ERP, website and analytics so nothing gets lost, delayed or duplicated.`,
                },
                {
                        id: 3,
                        title: `Grow Without Hiring More`,
                        des: `Use AI agents to scale output and decision-making without constantly increasing headcount.`,
                },
        ],
};

const { title_1, des_1, title_2, des_2, features } = innovative_data;

const InnovativeHomeTwo = () => {
        return (
                <>
                        <div className="cs_height_150 cs_height_lg_60"></div>
                        <section>
                                <div className="container">
                                        <div className="cs_modern_needs cs_style">
                                                <div className="cs_col_md_778">
                                                        <div className="cs_text">
                                                                <div className="cs_section_heading cs_style_1">
                                                                        <div className="cs_section_heading_text">
                                                                                <h2 className="cs_section_title anim_heading_title">
                                                                                        {title_1}
                                                                                </h2>
                                                                        </div>
                                                                </div>
                                                                <div className="cs_height_65"></div>
                                                                <p className="anim_text">{des_1}</p>
                                                        </div>
                                                        <div className="cs_height_85"></div>
                                                        <div className="row anim_div_ShowLeftSide">
                                                                {features.map((item, i) => (
                                                                        <div className="col-md-4 col-12" key={i}>
                                                                                <div className="cs_stroke_text">
                                                                                        <span>{item.id}</span>
                                                                                </div>
                                                                                <div className="text-section">
                                                                                        <h6>{item.title}</h6>
                                                                                        <p>{item.des}</p>
                                                                                </div>
                                                                        </div>
                                                                ))}
                                                        </div>
                                                </div>
                                                <div className="cs_col_md_672">
                                                        <div className="cs_img_section">
                                                                <Image src={image} alt="modern_digital_need" />
                                                                <div className="cs_img_card_text anim_div_ShowZoom">
                                                                        <h6 className="cs_color_style">{title_2}</h6>
                                                                        <p>{des_2}</p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </>
        );
};

export default InnovativeHomeTwo;
