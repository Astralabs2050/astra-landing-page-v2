"use client";

import Navbar from "./components/common/Navbar";
import Hero from "./components/Hero";
import Grants from "./components/Grants";
import JoinAsAMaker from "./components/JoinAsAMaker";
import AstraToken from "./components/AstraToken";
import JoinWaitlist from "./components/JoinWaitlist";
import FAQs from "./components/FAQs";
import AsSeenIn from "./components/AsSeenIn";
import PreviousWork from "./components/PreviousWork";
import Footer from "./components/common/Footer";
import HowAstraWorks from "./components/HowAstraWorks";
import { Suspense, useState, useEffect } from "react";
import LoadingText from "./components/common/LoadingText";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<LoadingText />}>
      {isLoading ? (
        <LoadingText />
      ) : (
        <div
          className={`bg-black transition-transform duration-1000 ease-out relative ${
            isLoading
              ? "-translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          }`}
          id="home"
        >
          <Navbar />
          <Hero />
          <div className="flex flex-col gap-[80px] lg:gap-[120px] px-3 md:px-10 lg:px-[97px]">
            <Grants />
            <HowAstraWorks />
            <JoinAsAMaker />
            <AstraToken />
          </div>
          <JoinWaitlist />
          <div className="h-[1182px] bg-[url('/images/faq-bg.png')] bg-cover bg-no-repeat -mt-80" />
          <div className="flex flex-col gap-[80px] lg:gap-[120px] px-3 md:px-10 lg:px-[97px] lg:mb-[120px]">
            <FAQs />
            <AsSeenIn />
            <PreviousWork />
          </div>
          <Footer />
        </div>
      )}
    </Suspense>
  );
}
