"use client";

import Image from "next/image";
import coin from "../../../public/images/astra-token/coin.png";
import CustomButton from "./common/CustomButton";

const AstraToken = () => {
  return (
    <section className="bg-[url('/images/astra-token/bg.png')] bg-cover bg-no-repeat py-[86px] text-center group">
      <div className="max-w-[176px] mx-auto rotate-y-180">
        <div className="w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
          <Image src={coin} alt="astra coin" className="backface-hidden" />
        </div>
      </div>
      <div className="text-center max-w-[606px] mx-auto mt-[35px]">
        <div className="mb-[30px]">
          <h2 className="text-[45px] font-sfui-semibold tracking-[-1px]">
            Powered by the Astra Token
          </h2>
          <p className="text-[#9B9B9B] text-[20px] mt-[15px]">
            A Utility Token Used To Generate Unique Designs With AI and Vote On
            Features To Be Built.
          </p>
        </div>
        <div>
          <p className="font-sfui-semibold text-[30px] mb-[15px]">
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
