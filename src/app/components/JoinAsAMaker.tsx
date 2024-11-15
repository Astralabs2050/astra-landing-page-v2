"use client";

import Image from "next/image";
import CustomButton from "./common/CustomButton";
import handleScroll from "../utils/handleScroll";

const JoinAsAMaker = () => {
  const images = [
    "left",
    "1",
    "right",
    "2",
    "left",
    "3",

    "4",
    "left",
    "5",
    "right",
    "6",
    "left",
  ];
  const tab_images = [
    "1",
    "left",
    "2",
    "right",
    "4",
    "left",
    "3",
    "right",
    "5",
  ];
  const mobile_images = ["1", "right", "5", "right", "2", "right", "3"];
  return (
    <section className="bg-[url('/images/join-maker-mobile-bg.png')] lg:bg-[url('/images/join-maker-bg.png')] bg-no-repeat bg-cover rounded-[25px] overflow-hidden px-[34px] lg:px-0 pb-[65px] lg:pb-0">
      <div className="text-center max-w-[561px] mx-auto mt-20">
        <h2 className="text-[22px] lg:text-[48px] font-sfui-semibold text-white">
          Join Astra as A maker
        </h2>
        <p className="text-sm lg:text-[20px] lg:leading-[30px] text-[#9B9B9B] mt-2 mb-[30px] lg:my-[30px]">
          Are you skilled at making ideas into real things? Join Astra and get a
          rare Astranaut NFT for free
        </p>
        <CustomButton
          theme="light"
          text="Join The Waitlist"
          className="mb-[85px] lg:mb-[90px]"
          onClick={() => handleScroll("join-waitlist")}
        />
      </div>
      <div className="grid-cols-6 hidden lg:grid">
        {images.map((img, idx) => (
          <div
            key={`${img}+${idx}`}
            className={` ${
              img !== "left" && img !== "right" ? "animate-pulse-glow" : ""
            } max-h-[203px] overflow-hidden`}
          >
            <Image
              src={`/images/join-as-a-maker/${img}.png`}
              alt="img place holder"
              width={1000}
              height={1000}
              className="object-cover h-auto w-full"
            />
          </div>
        ))}
      </div>
      <div className="hidden md:grid md:grid-cols-3 lg:hidden">
        {tab_images.map((img, idx) => (
          <div
            key={`${img}+${idx}`}
            className={`min-w-[201px] ${
              img !== "left" && img !== "right" ? "animate-pulse-glow" : ""
            } max-h-[250px] overflow-hidden`}
          >
            <Image
              src={`/images/join-as-a-maker/${img}.png`}
              alt="img place holder"
              width={1000}
              height={1000}
              className="object-cover w-full h-auto"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:hidden">
        {mobile_images.map((img, idx) => (
          <div
            key={`${img}+${idx}`}
            className={`${
              img !== "left" && img !== "right"
                ? "min-w-[201px] min-h-[230px]"
                : "h-[150px]"
            }`}
          >
            <Image
              src={`/images/join-as-a-maker/${img}.png`}
              alt="img place holder"
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default JoinAsAMaker;
