import Image from "next/image";
import ModernRight from "./positions/modern/right";
import ClassicRight from "./positions/classic/right";
import CaveRight from "./positions/cave/right";
import IndustrialRight from "./positions/industrial/right";

interface RightView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  rightView: string;
  setShowRight: React.Dispatch<React.SetStateAction<boolean>>;
  showRight: boolean;
}

function RightView({ vendor, rightView, setShowRight, showRight }: RightView) {
  const shopStyle = vendor.vendor.chosenShopStyle.split('/')[3]

  return (
    <div className="h-full w-auto absolute z-30 top-0"
      style={{
        opacity: showRight ? "1" : "0",
        transition: "1s ease",
        pointerEvents: showRight ? "auto" : "none",
      }}
    >
      <Image
        src={rightView}
        alt="right view"
        width={3840}
        height={2160}
        className="object-cover h-full"
      />
      {/** Back to Establishing View */}
      <div
        onClick={() => setShowRight(false)}
        className={`
          absolute z-20
          bottom-[2vw] left-[42vw]
          w-[16vw] h-[12vw]
        `}
      >
      </div>
      {
        shopStyle === "classic" ?
        <ClassicRight vendor={vendor}/> : shopStyle === "modern" ?
        <ModernRight vendor={vendor}/> : shopStyle === "industrial" ?
        <IndustrialRight vendor={vendor}/> :
        <CaveRight vendor={vendor}/>
      }
    </div>
  );
}

export default RightView;