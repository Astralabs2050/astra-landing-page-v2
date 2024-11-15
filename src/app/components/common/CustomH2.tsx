const CustomH2 = ({ text }: { text: string }) => {
  return (
    <h2 className="text-[22px] lg:text-[48px] font-sfui-semibold text-center mb-[15px] lg:mb-10 text-white">
      {text}
    </h2>
  );
};

export default CustomH2;
