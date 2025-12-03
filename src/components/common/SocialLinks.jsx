import Link from "next/link";

// hero social links home three
const hero_link_home_three = [
  {
    id: 1,
    link: "https://www.facebook.com",
    title: "Facebook",
  },
  {
    id: 2,
    link: "https://www.linkedin.com",
    title: "Linkedin",
  },
  {
    id: 3,
    link: "https://www.instagram.com",
    title: "Instagram",
  },
  {
    id: 4,
    link: "https://www.twitter.com",
    title: "Twitter",
  },
  {
    id: 5,
    link: "https://www.dribbble.com",
    title: "Dribbble",
  },
];

export const SocialLinks = () => {
  return (
    <>
      {hero_link_home_three.map((h_item, index) => (
        <Link
          key={index}
          href={h_item.link}
          className="cs_center"
          target="_blank"
        >
          {h_item.title}
        </Link>
      ))}
    </>
  );
};

// copy right text
const copy_right_text = {
  copy_right: (
    <>
      Copyright {new Date().getFullYear()}, All Right reserved
    </>
  ),
};

const { copy_right } = copy_right_text;

export const CopyRight = () => {
  return <>{copy_right}</>;
};
