import Image from "next/image";

const CustomGridBox = ({
  destination,
  logos,
}: {
  destination: string;
  logos: string[];
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#2B2B2B] overflow-hidden border border-[#2B2B2B] rounded-[25px]">
      {logos.map((logo) => (
        <div
          key={logo}
          className="bg-black flex items-center justify-center p-8 lg:p-10 group relative overflow-hidden cursor-pointer lg:hover:border-[#91919199] transition-all duration-500 ease-out border border-transparent"
        >
          <Image
            src={`/icons/${destination}/${logo}.svg`}
            alt={`${logo} icon`}
            width={0}
            height={0}
            className="w-auto h-auto"
          />
        </div>
      ))}
    </div>
  );
};

export default CustomGridBox;
