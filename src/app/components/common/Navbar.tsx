"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../public/astra.svg";

const Navbar = () => {
  const menu = ["Home", "How it works", "Get in touch", "FAQs"];
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-[#181919] px-[35px] py-[17px] rounded-[50px] mx-[97px] sticky top-[39px] flex justify-between items-center z-50 transition-transform duration-500 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-[150%]"
      }`}
    >
      <div className="max-w-[173px]">
        <Image src={logo} alt="astra logo" />
      </div>
      <ul className="flex gap-[45px] text-[#B5B5B5]">
        {menu.map((item) => (
          <li
            key={item}
            className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:rounded-3xl after:bg-[#B5B5B5] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:shadow-[0_0_8px_#B5B5B5,0_0_15px_#B5B5B5]"
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
