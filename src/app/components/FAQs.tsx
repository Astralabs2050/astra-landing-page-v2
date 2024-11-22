import CustomAccordion from "./common/CustomAccordion";

const FAQs = () => {
  const data = [
    {
      title: "Who owns designs made?",
      content:
        "The designs generated are tokenised and owned by the creator, with a small slice of ownership attributed the AI that helped generate the design.",
    },
    {
      title: "How do you vet?",
      content:
        "Being a decentralised platform we plan on being permissionless and will admit makers that can share proof of work, but protect buyers with smart contracts that only release funds based on milestones completed.",
    },
    {
      title: "What blockchain?",
      content:
        "We plan on being multichain and allowing as many blockchains, but we will be starting with Stellar, Solana and Sui.",
    },
  ];
  return (
    <section className="flex flex-col lg:flex-row justify-between -mt-[850px]">
      <h2 className="text-[22px] lg:text-[48px] font-sfui-semibold leading-[55px] lg:max-w-[380px] mb-[36px] lg:mb-0 text-white">
        Frequently Asked Questions
      </h2>
      <CustomAccordion data={data} />
    </section>
  );
};

export default FAQs;
