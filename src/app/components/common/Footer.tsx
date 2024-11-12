import Image from "next/image";

const Footer = () => {
  const menu = ["Home", "How it works", "Get in touch", "FAQs"];
  const socials = ["linkedin", "twitter", "instagram"];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F0F0F] pt-[66px] pb-[90px] text-[#B5B5B5] px-[150px]">
      <ul className="flex gap-[45px] text-[#B5B5B5] justify-center mb-[25px]">
        {menu.map((item) => (
          <li
            key={item}
            className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:rounded-3xl after:bg-[#B5B5B5] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:shadow-[0_0_8px_#B5B5B5,0_0_15px_#B5B5B5]"
          >
            {item}
          </li>
        ))}
      </ul>
      <ul className="flex gap-[45px] text-[#B5B5B5] justify-center mb-[25px] border-[#616161] border-y py-[28px]">
        {socials.map((item, index) => (
          <li
            key={item}
            className={`cursor-pointer py-[25px] group ${
              index === 0
                ? "pr-20"
                : index === socials.length - 1
                ? "pl-20"
                : "px-20 border-x border-[#616161]"
            }`}
          >
            <Image
              src={`/icons/socials/${item}.svg`}
              alt={item}
              width={1000}
              height={1000}
              className="object-cover w-full h-full group-hover:animate-soft-shake"
            />
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <div className="w-[173px]">
          <Image
            src="/astra.svg"
            alt="astra logo"
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="flex gap-[38px]">
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
