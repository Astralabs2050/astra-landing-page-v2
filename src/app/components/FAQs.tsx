import CustomAccordion from "./common/CustomAccordion";

const FAQs = () => {
  const data = [
    {
      title: "Who owns the design created?",
      content:
        "We make it possible to save your designs on the blockchain, to prove you generated the unique designs which can then be brought to life. Your prompt is your art, so if you come up with a unique design, please save it so there’s proof that you did it first!",
    },
    {
      title: "Do you vet partners selected?",
      content:
        "Yes, we vet all partners carefully to ensure quality and alignment with our values and goals.",
    },
    {
      title: "What blockchain is this built on?",
      content:
        "We are built on a secure and scalable blockchain that supports our vision for the platform.",
    },
  ];
  return (
    <section
      className="flex flex-col lg:flex-row justify-between -mt-[850px]"
    >
      <h2 className="text-[22px] lg:text-[48px] font-sfui-semibold leading-[55px] lg:max-w-[380px] mb-[36px] lg:mb-0 text-white">
        Frequently Ask Questions
      </h2>
      <CustomAccordion data={data} />
    </section>
  );
};

export default FAQs;
