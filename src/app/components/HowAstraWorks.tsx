import Image from "next/image";
import CustomH2 from "./common/CustomH2";

const HowAstraWorks = () => {
  const lists = [
    {
      id: "design-with-ai",
      title: "Design Clothes With AI",
      subtitle:
        "Generate unique designs with AI and save them on the blockchain as NFTs generating digital product passports.",
    },
    {
      id: "pay-a-maker",
      title: "Pay a Maker To Make It Real",
      subtitle:
        "Pay a maker with escrow smart contracts that release funds to makers based on completed work.",
    },
    {
      id: "receive-sample",
      title: "Receive Sample In Real Life",
      subtitle:
        "Receive sample in real life for special occasions or to start a fashion business.",
    },
    {
      id: "sell-to-shoppers",
      title: "Sell To Shoppers In VR Store",
      subtitle:
        "No need for stock, shoppers can shop your design and a maker ships the outfit IRL.",
    },
  ];

  return (
    <section id="how-it-works">
      <CustomH2 text="How Astra Works" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {lists.map((list) => (
          <div
            key={list.id}
            className={`relative rounded-[25px] overflow-hidden px-4 pb-4 pt-[38px] lg:p-[34px] cursor-pointer transition-shadow duration-500 ease-out lg:hover:shadow-[0_0_5px_rgba(80,80,80,0.4),0_0_15px_rgba(50,50,50,0.3)] after:content-[''] after:absolute after:inset-0 after:rounded-[25px] after:border after:border-transparent after:transition-all after:duration-500 after:ease-out lg:hover:after:border-[rgba(145,145,145,0.6)] ${
              list.id === "receive-sample"
                ? "bg-[url('/images/how-it-works/bg/unique.png')]"
                : "bg-[url('/images/how-it-works/bg/default.png')]"
            } bg-no-repeat bg-cover max-w-[611px]`}
          >
            <p className="font-sfui-medium text-[20px] lg:text-[30px] tracking-[-1px] text-[#B2B2B2] mb-4 lg:mb-5">
              {list.title}
            </p>
            <p className="text-sm lg:text-base text-[#9B9B9B] max-w-[478px] mb-[25px]">
              {list.subtitle}
            </p>
            <div className="w-full h-full">
              <Image
                src={`/images/how-it-works/${list.id}.png`}
                alt={`${list.title} cover img`}
                width={544}
                height={240}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowAstraWorks;
