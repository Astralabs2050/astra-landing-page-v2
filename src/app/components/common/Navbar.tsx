"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import logo from "../../../../public/astra.svg";
import hamburger from "../../../../public/icons/hamburger.svg";
import close from "../../../../public/icons/close.svg";
import toKebabCase from "@/app/utils/toKebabCase";
import handleScroll from "@/app/utils/handleScroll";

const Navbar = () => {
  const menu = ["Home", "How it works", "Get in touch", "FAQs"];
  const [showMenu, setShowMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [ticking, setTicking] = useState(false);

  const scroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const viewportWidth = window.innerWidth;

    if (viewportWidth >= 1024) {
      const scrollThreshold = 200;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (
            currentScrollY > lastScrollY &&
            currentScrollY > scrollThreshold
          ) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setIsVisible(true);
          }
          setLastScrollY(currentScrollY);
          setTicking(false);
        });
        setTicking(true);
      }
    } else {
      setIsVisible(true);
    }
  }, [lastScrollY, ticking]);

  useEffect(() => {
    const handleScrollEvent = () => scroll();

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      setTicking(false);
    };
  }, [scroll]);

  const closeMenu = () => setShowMenu(false);

  return (
    <nav
      className={`bg-[#181919] px-[22px] lg:px-[35px] py-[14px] lg:py-[17px] lg:mt-0 rounded-[50px] lg:mx-[97px] sticky top-[39px] flex justify-between items-center z-50 transition-transform duration-500 ${
        isVisible
          ? "transform translate-y-0 mt-[50px] mx-4"
          : "transform -translate-y-[150%] m-0"
      }`}
    >
      <div className="max-w-[110px] lg:max-w-[173px]">
        <Image src={logo} alt="astra logo" />
      </div>
      {/* Desktop Navigation */}
      <ul className="gap-[45px] text-[#B5B5B5] hidden lg:flex">
        {menu.map((item) => (
          <li
            key={toKebabCase(item)}
            onClick={() => handleScroll(toKebabCase(item))}
            className="cursor-pointer relative after:content-[''] after:block after:w-0 after:h-[2px] after:rounded-3xl after:bg-[#B5B5B5] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:shadow-[0_0_8px_#B5B5B5,0_0_15px_#B5B5B5]"
          >
            {item}
          </li>
        ))}
      </ul>
      {/* Mobile Navigation Toggle Button */}
      <button
        className="max-w-[42px] lg:hidden"
        onClick={() => setShowMenu(true)}
      >
        <Image src={hamburger} alt="open menu icon" />
      </button>
      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed -top-12 -left-4 right-0 h-[110vh] w-[100vw] bg-black transition-transform duration-500 pt-10 ${
          showMenu ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Close Icon */}
        <button
          className="absolute top-[64px] right-[20px] max-w-[42px]"
          onClick={closeMenu}
        >
          <Image src={close} alt="close menu icon" />
        </button>
        <ul className="flex flex-col px-4 gap-[60px] text-[#B5B5B5] pt-[100px] bg-black">
          {menu.map((item) => (
            <li
              key={toKebabCase(item)}
              onClick={() => {
                handleScroll(toKebabCase(item));
                closeMenu();
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
