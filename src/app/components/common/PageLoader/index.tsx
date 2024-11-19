import "./style.css";
import coin from "../../../../../public/images/astra-token/coin.png";
import Image from "next/image";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white overflow-hidden">
      <div className="max-w-[150px] md:max-w-[200px] flip-animation">
        <Image src={coin} alt="astra coin" />
      </div>
    </div>
  );
};

export default PageLoader;
