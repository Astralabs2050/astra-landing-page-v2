import Image from "next/image";
import CustomH2 from "./common/CustomH2";

const HowAstraWorks = () => {
  const lists = [
    {
      id: "design-with-ai",
      title: "Design with AI Agents",
      subtitle:
        "Generate unique concepts instantly using our advanced AI agents, giving you creative control and limitless possibilities.",
    },
    {
      id: "pay-a-maker",
      title: "Connect with Skilled Makers",
      subtitle:
        "Use our escrow smart contracts to collaborate securely with top-tier manufacturers—pay only when each milestone is met.",
    },
    {
      id: "receive-sample",
      title: "Get Physical Samples",
      subtitle:
        "Receive tangible prototypes delivered right to your door, so you can refine and perfect every detail before final production.",
    },
    {
      id: "sell-to-shoppers",
      title: "Sell in Physical & Virtual Stores",
      subtitle:
        "Launch your designs across multiple channels, from immersive VR showrooms to traditional retail, and reach audiences everywhere.",
    },
];

  return (
    <section>
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
