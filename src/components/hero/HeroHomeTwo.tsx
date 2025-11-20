import React from "react";

const hero_data = {
        subtitle: `AI Agents • Business Automation • Digital Transformation`,
        title_1: `Transform Your Business Into an Intelligent,`,
        title_2: `Self-Running Growth Machine`,
        des: `Teams are overworked, systems don’t talk and opportunities slip away. We build agentic systems that automate the work, accelerate decisions and unlock predictable, compounding growth.`,
};
const { subtitle, title_1, title_2, des } = hero_data;

const HeroHomeTwo = () => {
        return (
                <>
                        <div className="cs_height_219 cs_height_lg_120"></div>
                        <section>
                                <div className="cs_hero cs_style4">
                                        <div className="cs_text_hero">
                                                <div className="cs_short_title anim_text_upanddowns">
                                                        <h6>{subtitle}</h6>
                                                        <div className="cs_hr_design cs_color_1"></div>
                                                </div>
                                                <div className="anim_banner_text_left">
                                                        <h1 className="cs_title_text cs_mp0">{title_1}</h1>
                                                </div>
                                                <div className="cs_text_section_2">
                                                        <div className="anim_banner_text_right">
                                                                <h1 className="cs_title_text cs_mp0">{title_2}</h1>
                                                        </div>
                                                        <p className="cs_detils_text cs_mp0 anim_subtext">{des}</p>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </>
        );
};

export default HeroHomeTwo;
