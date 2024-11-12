interface CustomButtonProps {
  theme: "light" | "dark";
  text: string;
  onClick: () => void;
  className?: string;
}

const CustomButton = ({
  theme,
  text,
  onClick,
  className,
}: CustomButtonProps) => {
  const getStyle = () => {
    switch (theme) {
      case "light":
        return `text-black bg-white hover:shadow-[inset_0_0_50px_rgba(0,0,0,0.1),_0_0_15px_rgba(0,0,0,0.15),_0_0_20px_rgba(0,0,0,0.2)] hover:bg-opacity-90 hover:shadow-blue-500/40`;
      case "dark":
        return `text-white bg-[#181919] border border-[#2D2D2D] hover:border-[#91919199]`;
      default:
        return "";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${getStyle()} min-w-[257px] py-3 px-6 rounded-[50px] text-center font-sfui-semibold text-lg transition-all duration-300 ease-out transform hover:scale-[1.03] ${className}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
