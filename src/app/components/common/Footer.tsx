import handleScroll from "@/app/utils/handleScroll";
import toKebabCase from "@/app/utils/toKebabCase";
import Image from "next/image";

const Footer = () => {
  const menu = ["Home", "How it works", "Get in touch", "FAQs"];
  const socials = ["linkedin", "twitter", "instagram"];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F0F0F] pt-[66px] pb-[74px] lg:pb-[90px] text-[#B5B5B5] lg:px-[150px]">
      <ul className="flex flex-col lg:flex-row gap-[45px] text-[#B5B5B5] justify-center mb-10 lg:mb-[25px] px-4 ">
        {menu.map((item) => (
          <li
            key={toKebabCase(item)}
            onClick={() => handleScroll(toKebabCase(item))}
            className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:rounded-3xl lg:after:bg-[#B5B5B5] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full lg:hover:after:shadow-[0_0_8px_#B5B5B5,0_0_15px_#B5B5B5]"
          >
            {item}
          </li>
        ))}
      </ul>
      <ul
        className="flex justify-center mb-[25px] border-[#2C2C2C] border-y lg:py-[28px]"
        id="get-in-touch"
      >
        {socials.map((item, index) => (
          <li
            key={item}
            className={`cursor-pointer py-[25px] group ${
              index === 0
                ? "pr-[35px] lg:pr-20"
                : index === socials.length - 1
                ? "pl-[35px] lg:pl-20"
                : "px-20 border-x border-[#2C2C2C]"
            }`}
          >
            <Image
              src={`/icons/socials/${item}.svg`}
              alt={item}
              width={1000}
              height={1000}
              className="object-cover w-full max-w-[27px] lg:max-w-full h-full group-hover:animate-soft-shake"
            />
          </li>
        ))}
      </ul>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center px-[14px] gap-10 lg:gap-0">
        <div className="max-w-[136px] lg:w-[173px]">
          <Image
            src="/astra.svg"
            alt="astra logo"
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="flex gap-[38px] text-[#B5B5B5]">
          <span>© {currentYear} - Astra</span>
          <span className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:rounded-3xl after:bg-[#B5B5B5] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:shadow-[0_0_8px_#B5B5B5,0_0_15px_#B5B5B5]">
            Privacy and Terms
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
