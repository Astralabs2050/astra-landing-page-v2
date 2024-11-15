/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import CustomButton from "./common/CustomButton";
import CustomInput from "./common/CustomInput";
import { joinWaitlist } from "../utils/services/api";
import { Slide, toast } from "react-toastify";

const JoinWaitlist = () => {
  const initialPayload = {
    fullName: "",
    email: "",
    make: "",
    link: "",
    occasion: "",
  };

  const [payload, setPayload] = useState(initialPayload);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { value: string; name: string } }) => {
    setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toastErrorStyle = {
    className:
      "bg-gradient-to-r from-[#2a0000] to-[#550505] border border-[#ff6b6b] text-[#ffb3b3] rounded-lg shadow-[0_0_15px_rgba(255,107,107,0.3),0_0_30px_rgba(255,107,107,0.2)]",
    progressClassName:
      "bg-gradient-to-r from-[#ff6b6b] to-[#d7385e] animate-pulse",
    transition: Slide,
    autoClose: 3000,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await joinWaitlist(payload);
      if (response?.status) {
        toast.success(response?.message, {
          className:
            "bg-gradient-to-r from-[#0e201a] to-[#153a30] border border-[#3aa37a] text-[#99d1b0] rounded-lg shadow-[0_0_15px_rgba(58,163,122,0.3),0_0_30px_rgba(58,163,122,0.2)]",
          progressClassName:
            "bg-gradient-to-r from-[#3aa37a] to-[#275e4f] animate-pulse",
          transition: Slide,
        });
        setPayload(initialPayload);
      } else {
        toast.error(
          response?.message ?? "Something went wrong, try again.",
          toastErrorStyle
        );
      }
    } catch (err: any) {
      toast.error(err?.message, toastErrorStyle);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="my-20 lg:my-[120px] bg-[url('/images/join-waitlist-mobile-bg.png')] lg:bg-[url('/images/join-waitlist-bg.png')] bg-cover bg-no-repeat py-[31px] lg:py-[13px]"
      id="join-waitlist"
    >
      <form
        className="w-[352px] lg:w-[465px] mx-auto bg-black lg:bg-[#0F0F0F] border border-[#4B4B4B7A] rounded-[25px] overflow-hidden px-5 lg:px-[54px] py-[48px] hover:border-[#91919199] transition-all duration-500 ease-out"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-[22px] lg:text-[38px] font-sfui-semibold tracking-[-1px] mb-[35px] lg:mb-[49px] text-white">
          Join The Waitlist
        </h3>
        <div className="flex flex-col gap-4">
          <CustomInput
            placeholder="Enter your full name"
            name="fullName"
            onChange={handleChange}
            value={payload.fullName}
          />
          <CustomInput
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={payload.email}
          />
          <CustomInput
            placeholder="What do you make?"
            name="make"
            onChange={handleChange}
            value={payload.make}
          />
          <CustomInput
            placeholder="Website/social media link"
            name="link"
            onChange={handleChange}
            value={payload.link}
          />
          <CustomInput
            placeholder="Select occasion"
            name="occasion"
            onChange={handleChange}
            value={payload.occasion}
          />
        </div>
        <CustomButton
          loading={loading}
          type="submit"
          theme="light"
          text="Join The Waitlist"
          className="w-full mt-[35px] lg:mt-10"
          id="faqs"
          disabled={Object.values(payload).some((item: string) => item === "")}
        />
      </form>
    </section>
  );
};

export default JoinWaitlist;
