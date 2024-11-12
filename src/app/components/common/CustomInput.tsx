interface CustomInputProps {
  type?: "email" | "select" | "text";
  placeholder: string;
  onChange: () => void;
}

const CustomInput = ({ type, placeholder, onChange }: CustomInputProps) => {
  return (
    <input
      type={type ?? "text"}
      placeholder={placeholder}
      onChange={onChange}
      className="p-4 lg:p-[21px] text-sm lg:text-base text-white placeholder-[#9F9F9F] bg-black rounded-full border border-[#333333] hover:border-[#91919199] focus:outline-none focus:ring-2 focus:ring-[#555555] transition duration-200 w-full"
    />
  );
};

export default CustomInput;
