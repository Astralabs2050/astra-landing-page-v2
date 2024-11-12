import "./style.css";

const LoadingText = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-container font-conthrax flex gap-20">
        {["A", "S", "T", "R", "A", " ", " ", " ", ".", ".", "."].map(
          (char, idx) => (
            <span className="letter" key={`${char}+${idx}`}>
              {char}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default LoadingText;
