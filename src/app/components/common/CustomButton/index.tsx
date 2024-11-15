interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: "light" | "dark";
  text: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const CustomButton = ({
  theme,
  text,
  className,
  loading,
  disabled,
  type,
  ...rest
}: CustomButtonProps) => {
  const getStyle = () => {
    switch (theme) {
      case "light":
        return `${
          loading
            ? ` cursor-not-allowed opacity-60 shadow-[inset_0_0_30px_rgba(0,0,0,0.05),_0_0_10px_rgba(0,0,0,0.1)] bg-white`
            : `${
                disabled
                  ? "text-gray-800 bg-gray-400 hover:cursor-not-allowed"
                  : "bg-white hover:bg-opacity-90 hover:shadow-blue-500/40 hover:scale-[1.03]"
              } text-black  hover:shadow-[inset_0_0_50px_rgba(0,0,0,0.1),_0_0_15px_rgba(0,0,0,0.15),_0_0_20px_rgba(0,0,0,0.2)] `
        }`;
      case "dark":
        return `text-white bg-[#181919] border border-[#2D2D2D] hover:border-[#91919199] hover:scale-[1.03]`;
      default:
        return "";
    }
  };

  return (
    <button
      disabled={loading || disabled}
      className={`${getStyle()} min-w-[257px] py-2 lg:py-3 px-6 rounded-[50px] text-center font-sfui-semibold lg:text-lg transition-all duration-300 ease-out transform flex gap-4 justify-center ${className} mx-auto`}
      type={type}
      {...rest}
    >
      {loading ? (
        <div className="w-6 h-6 border-2 border-t-2 border-white border-t-black rounded-full animate-spin shadow-[inset_0_0_50px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.15),0_0_20px_rgba(0,0,0,0.2)] bg-opacity-90 hover:shadow-blue-500/40" />
      ) : (
        text
      )}
    </button>
  );
};

export default CustomButton;
