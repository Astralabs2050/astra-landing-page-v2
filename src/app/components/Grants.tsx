import CustomGridBox from "./common/CustomGridBox";
import CustomH2 from "./common/CustomH2";

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
      <CustomH2 text="With Grants and Incubation from:" />
      <CustomGridBox destination="grants" logos={logos} />
      <div id="how-it-works" />
    </section>
  );
};

export default Grants;
