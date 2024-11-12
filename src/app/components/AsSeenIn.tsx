import CustomGridBox from "./common/CustomGridBox";
import CustomH2 from "./common/CustomH2";

const AsSeenIn = () => {
  const logos = [
    "bloomberg",
    "g",
    "quartz",
    "yahoo",
    "beyond-games",
    "techcabal",
    "okayafrica",
    "thisday",
  ];
  return (
    <section>
      <CustomH2 text="As Seen In" />
      <CustomGridBox destination="as-seen-in" logos={logos} />
    </section>
  );
};

export default AsSeenIn;
