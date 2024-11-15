interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "email" | "select" | "text";
  placeholder: string;
  name: string;
  onChange: (e: { target: { value: string; name: string } }) => void;
  value: string;
}

const CustomInput = ({
  type,
  placeholder,
  name,
  onChange,
  value,
}: CustomInputProps) => {
  return (
    <input
      type={type ?? "text"}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="p-4 lg:p-[21px] text-sm lg:text-base text-white placeholder-[#9F9F9F] bg-black rounded-full border border-[#333333] hover:border-[#91919199] focus:outline-none focus:ring-2 focus:ring-[#555555] transition duration-200 w-full"
    />
  );
};

export default CustomInput;
