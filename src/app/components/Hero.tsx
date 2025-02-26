"use client";

import Image from "next/image";
import CustomButton from "./common/CustomButton";
import art from "../../../public/images/art.png";
import { motion } from "framer-motion";
import handleScroll from "../utils/handleScroll";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="text-center bg-black mb-20 lg:mb-[120px] bg-[url('/images/line-patterns.png')] bg-contain h-full w-full -mt-[120px] lg:-mt-[80px] pt-[39px] bg-no-repeat">
      <div className="px-10 lg:px-0">
        <motion.h1
          className="font-conthrax text-[28px] capitalize lg:text-[65px] leading-[32.03px] lg:leading-[82px] tracking-[-1.17px] lg:tracking-[-3px] max-w-[360px] lg:max-w-[900px] text-center mx-auto mt-[150px] lg:mt-[225px] text-shadow-futuristic text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 60,
            damping: 20,
          }}
        >
          Bring your fashion ideas to life with <br /> AI agents
        </motion.h1>
        <motion.p
          className="text-[#9B9B9B] text-sm lg:text-[20px] my-[22px] lg:mt-[35px] lg:mb-10 lg:max-w-[55%] mx-auto text-shadow-futuristic lg:leading-7"
          initial={{ opacity: 0, y: 50 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            type: "spring",
            delay: 0.2,
            stiffness: 60,
            damping: 20,
          }}
        >
          Design, produce, and sell your creations in both physical and virtual
          stores—powered by generative AI and on-demand manufacturing.
        </motion.p>
        <motion.div
          className="flex gap-[25px] lg:gap-[30px] w-fit mx-auto flex-col lg:flex-row"
          initial={{ opacity: 0, y: 50 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            type: "spring",
            delay: 0.4,
            stiffness: 60,
            damping: 20,
          }}
        >
          <CustomButton
            theme="light"
            text="Join The Waitlist"
            onClick={() => handleScroll("join-waitlist")}
          />
          <Link href="https://x.com/astraverse2050?s=21" target="blank">
            <CustomButton
              theme="dark"
              text="Chat With Us"
              onClick={() => null}
            />
          </Link>
        </motion.div>
      </div>
      <div className="-mt-10 lg:-mt-40 rounded-b-[25px] lg:rounded-b-[50px] overflow-hidden">
        <Image src={art} alt="astra art hero cover" />
      </div>
    </section>
  );
};

export default Hero;
