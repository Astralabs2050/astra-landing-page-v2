import CustomSlider from "./common/CustomSlider";

const PreviousWork = () => {
  const slides = [
    {
      id: "aamil",
      title: "Astra x Aamil",
      description:
        "Shoppers use avatars to try on future collections and add to their wish list, get data on customer preferences on different designs.",
    },
    {
      id: "balenciaga",
      title: "Astra x Balenciaga",
      description:
        "Play to win competition featuring a virtual small hourglass tote bag from Balenciaga that players could play to win in real life. ",
    },
    {
      id: "design-club",
      title: "Astra x Lone Design Club",
      description:
        "Partnering with Lone Design Club, a leading online and offline retail destination to create a virtual store featuring brands in the store.",
    },
    {
      id: "dlarep",
      title: "Astra x D la Repubblica",
      description:
        "Creating avatars, digital garments and virtual environments for one of the largest newspapers in Italy, D la Repubblica. ",
    },
    {
      id: "nft",
      title: "Astra x NFT London",
      description:
        "Showcasing a “play to wear” experience at NFT london, enabling players compete to beat the high score and win an NFT london shirt",
    },
  ];
  return (
    <section className="overflow-hidden">
      <h2 className="text-[48px] font-sfui-semibold text-center mb-10">
        Previous Work
      </h2>
      <CustomSlider slides={slides} />
    </section>
  );
};

export default PreviousWork;
