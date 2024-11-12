"use client";

import Image from "next/image";
import coin from "../../../public/images/astra-token/coin.png";
import CustomButton from "./common/CustomButton";

const AstraToken = () => {
  return (
    <section className=" bg-[url('/images/astra-token/mobile-bg.png')] lg:bg-[url('/images/astra-token/bg.png')] rounded-[25px] bg-cover bg-no-repeat py-[70px] lg:py-[86px] text-center group px-[35px] lg:px-0">
      <div className="max-w-[176px] mx-auto rotate-y-180">
        <div className="w-[144px] lg:w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 ">
          <Image src={coin} alt="astra coin" className="backface-hidden " />
        </div>
      </div>
      <div className="text-center max-w-[606px] mx-auto mt-5 lg:mt-[35px]">
        <div className="mb-[30px]">
          <h2 className="text-[26px] lg:text-[45px] font-sfui-semibold tracking-[-1px]">
            Powered by the Astra Token
          </h2>
          <p className="text-[#9B9B9B] text-sm lg:text-[20px] mt-2 lg:mt-[15px]">
            A Utility Token Used To Generate Unique Designs With AI and Vote On
            Features To Be Built.
          </p>
        </div>
        <div>
          <p className="font-sfui-semibold text-[22px] lg:text-[30px] mb-2 lg:mb-[15px]">
            Want To Be An Early Investor?
          </p>
          <CustomButton
            theme="light"
            text="Join Our Token Presale"
            className="px-[42px]"
            onClick={() => null}
          />
        </div>
      </div>
    </section>
  );
};

export default AstraToken;
