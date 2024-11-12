"use client";

import Image from "next/image";
import CustomButton from "./common/CustomButton";
import art from "../../../public/images/art.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="text-center bg-black mb-[120px] bg-[url('/images/line-patterns.png')] bg-contain h-full w-full -mt-[80px] pt-[39px] bg-no-repeat">
      <motion.h1
        className="font-conthrax text-[65px] leading-[82px] tracking-[-3px] max-w-[850px] text-center mx-auto mt-[225px] text-shadow-futuristic"
        initial={{ opacity: 0, y: 50 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          type: "spring",
          stiffness: 60,
          damping: 20,
        }}
      >
        The Fashion Factory Of The Future
      </motion.h1>
      <motion.p
        className="text-[#9B9B9B] text-[20px] mt-[35px] mb-10 text-shadow-futuristic"
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
        Generate unique designs with AI and find skilled makers that can bring
        it to life!
      </motion.p>
      <motion.div
        className="flex gap-[30px] w-fit mx-auto"
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
          onClick={() => null}
        />
        <CustomButton theme="dark" text="Chat With Us" onClick={() => null} />
      </motion.div>
      <div className="-mt-40 rounded-b-[50px] overflow-hidden">
        <Image src={art} alt="astra art hero cover" />
      </div>
    </section>
  );
};

export default Hero;
