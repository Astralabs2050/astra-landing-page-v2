import CustomGridBox from "./common/CustomGridBox";

const Grants = () => {
  const logos = [
    "meta",
    "kpmg",
    "draper-uni",
    "epic",
    "cambridge",
    "stellar",
    "nvidia",
    "brinc",
  ];

  return (
    <section>
      <h2 className="text-[48px] font-sfui-semibold text-center mb-10">
        With Grants and Incubation from:
      </h2>
      <CustomGridBox destination="grants" logos={logos} />
    </section>
  );
};

export default Grants;
