"use client";

import Image from "next/image";
import CustomButton from "./common/CustomButton";

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
  return (
    <section className="bg-[url('/images/join-maker-bg.png')] bg-no-repeat bg-cover rounded-[25px] overflow-hidden">
      <div className="text-center max-w-[561px] mx-auto mt-20">
        <h2 className="text-[48px] font-sfui-semibold">
          Join Astra as A maker
        </h2>
        <p className="text-[#9B9B9B] text-[20px] my-[30px]">
          Are you skilled at making ideas into real things? Join Astra and get a
          rare Astranaut NFT for free
        </p>
        <CustomButton
          theme="light"
          text="Join The Waitlist"
          className="mb-[90px]"
          onClick={() => null}
        />
      </div>
      <div className="grid grid-cols-6">
        {images.map((img, idx) => (
          <div
            key={`${img}+${idx}`}
            className={`min-w-[201px] min-h-[230px] ${
              (img !== "left" && img !== "right") ? "animate-pulse-glow" : ""
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
