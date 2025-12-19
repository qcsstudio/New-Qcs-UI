import React from "react";
import Image from "next/image";
import image from "@/assets/img/Images/growth.png";


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
	title_1: `Unified Intelligence for Predictable Growth`,
	des_1: `Replace fragmented stacks with one operating model. QCS links AI agents, automation, and marketing so plans become execution—and execution learns—driving efficiency, visibility, and measurable compounding gains.`,
	title_2: ` Your Agentic Growth Architecture`,
	des_2: `A composable foundation of modular agents, reusable workflows, and AI-native UX. It personalizes journeys, enforces guardrails, and proves ROI with clear, auditable metrics your leadership can trust.`,
	features: [
		{
			id: 1,
			title: `Policy-Driven Flows`,
			des: ` Automations aligned to rules and KPIs.`,
		},
		{
			id: 2,
			title: `Unified Data Layer`,
			des: `Customer, content, and spend in one view.`,
		},
		{
			id: 3,
			title: `Auto-Tuning Engines`,
			des: `Systems that improve every release.`,
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
