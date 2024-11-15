import Image from "next/image";
import CustomH2 from "./common/CustomH2";
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
      <CustomH2 text="Previous Work" />
      <div className="hidden lg:block">
        <CustomSlider slides={slides} />
      </div>
      <div className="lg:hidden mb-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full border border-[#4B4B4B7A] rounded-[25px] overflow-hidden bg-[url('/images/work-cover-bg-mobile.png')] bg-cover bg-no-repeat md:px-5 px-[38px] lg:hover:border-[#91919199] pb-[78px]"
            >
              <div className="relative max-w-[334px] max-h-[334px] rounded-[10px] overflow-hidden pt-[41px]">
                <Image
                  src={`/images/previous-work/${slide.id}.png`}
                  alt={slide.title}
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="max-w-[448px] text-center">
                <h3 className="text-[22px] font-sfui-medium mb-2 mt-[30px] text-white">
                  {slide.title}
                </h3>
                <p className="text-sm text-[#9B9B9B]">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviousWork;
