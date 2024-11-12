"use client";

import Image from "next/image";
import { useState } from "react";

const CustomSlider = ({
  slides,
}: {
  slides: {
    id: string;
    title: string;
    description: string;
  }[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <div>
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full flex-shrink-0 flex items-center space-x-8 border border-[#4B4B4B7A] rounded-[25px] overflow-hidden w-[1246px] bg-[url('/images/work-cover-bg.png')] bg-cover bg-no-repeat px-[165px] h-[651px] hover:border-[#91919199] transition-all duration-500 ease-out"
            >
              <div className="relative w-[375.69px] h-[375.69px] rounded-[7.55px] overflow-hidden animate-float">
                <Image
                  src={`/images/previous-work/${slide.id}.png`}
                  alt={slide.title}
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="max-w-[448px]">
                <h3 className="text-[38px] font-sfui-medium mb-[25px]">
                  {slide.title}
                </h3>
                <p className="text-[20px] text-[#9B9B9B]">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-10 items-center mt-6">
        <div className="flex gap-5 items-center">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex items-center justify-center ${
                index === currentIndex ? "text-white" : "text-[#616161]"
              }`}
            >
              <span className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:rounded-3xl after:bg-[#B5B5B5] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:shadow-[0_0_8px_#B5B5B5,0_0_15px_#B5B5B5]">
                {index + 1}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`${
            currentIndex === 0
              ? "text-[#616161]"
              : "text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:rounded-3xl after:bg-[#B5B5B5] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:shadow-[0_0_8px_#B5B5B5,0_0_15px_#B5B5B5]"
          }`}
        >
          Prev
        </button>
        <button
          onClick={goToNext}
          disabled={currentIndex === slides.length - 1}
          className={`${
            currentIndex === slides.length - 1
              ? "text-[#616161]"
              : "text-white relative after:content-[''] after:block after:w-0 after:h-[2px] after:rounded-3xl after:bg-[#B5B5B5] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:shadow-[0_0_8px_#B5B5B5,0_0_15px_#B5B5B5]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomSlider;
