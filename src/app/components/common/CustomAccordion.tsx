"use client";

import { useState } from "react";
import plus from "../../../../public/icons/plus.svg";
import Image from "next/image";

const CustomAccordion = ({
  data,
}: {
  data: { title: string; content: string }[];
}) => {
  return (
    <div className="text-white max-w-[687px] -mt-[25px]">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isLastItem={index === data.length - 1}
        />
      ))}
    </div>
  );
};

const AccordionItem = ({
  title,
  content,
  isLastItem,
}: {
  title: string;
  content: string;
  isLastItem: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={!isLastItem ? "border-b-[0.6px] border-[#616161]" : ""}>
      <button
        onClick={toggleAccordion}
        className="w-full flex gap-4 lg:gap-[27px] items-center py-4 lg:py-[25px] text-lg lg:text-[28px] focus:outline-none"
      >
        <span
          className={`text-2xl transition-transform duration-300 ease-in-out max-w-[20.74px] lg:max-w-full ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          <Image src={plus} alt="plus icon" />
        </span>
        <span className={`${isOpen ? "font-semibold" : "font-normal"}`}>
          {title}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-[#9B9B9B] text-sm lg:text-base pb-[25px] px-[50px]">
          {content}
        </div>
      </div>
    </div>
  );
};

export default CustomAccordion;
