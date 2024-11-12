"use client";

import CustomButton from "./common/CustomButton";
import CustomInput from "./common/CustomInput";

const JoinWaitlist = () => {
  return (
    <section className="my-20 lg:my-[120px] bg-[url('/images/join-waitlist-mobile-bg.png')] lg:bg-[url('/images/join-waitlist-bg.png')] bg-cover bg-no-repeat py-[31px] lg:py-[13px]">
      <form className="w-[352px] lg:w-[465px] mx-auto bg-black lg:bg-[#0F0F0F] border border-[#4B4B4B7A] rounded-[25px] overflow-hidden px-5 lg:px-[54px] py-[48px] hover:border-[#91919199] transition-all duration-500 ease-out">
        <h3 className="text-center text-[22px] lg:text-[38px] font-sfui-semibold tracking-[-1px] mb-[35px] lg:mb-[49px]">
          Join The Waitlist
        </h3>
        <div className="flex flex-col gap-4">
          <CustomInput
            placeholder="Enter your full name"
            onChange={() => null}
          />
          <CustomInput placeholder="Email" onChange={() => null} />
          <CustomInput placeholder="What do you make?" onChange={() => null} />
          <CustomInput
            placeholder="Website/social media link"
            onChange={() => null}
          />
          <CustomInput placeholder="Select ocation" onChange={() => null} />
        </div>
        <CustomButton
          theme="light"
          text="Join The Waitlist"
          className="w-full mt-[35px] lg:mt-10"
          onClick={() => null}
        />
      </form>
    </section>
  );
};

export default JoinWaitlist;
