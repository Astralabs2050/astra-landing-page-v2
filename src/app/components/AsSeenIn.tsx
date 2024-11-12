import CustomGridBox from "./common/CustomGridBox";

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
      <h2 className="text-[48px] font-sfui-semibold text-center mb-10">
        As Seen In
      </h2>
      <CustomGridBox destination="as-seen-in" logos={logos} />
    </section>
  );
};

export default AsSeenIn;
