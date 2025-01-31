import Image from "next/image";
import ModernEnd from "./positions/modern/end";
import ClassicEnd from "./positions/classic/end";
import IndustrialEnd from "./positions/industrial/end";
import CaveEnd from "./positions/cave/end";

interface EndView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  endView: string;
  setShowEnd: React.Dispatch<React.SetStateAction<boolean>>;
  showEnd: boolean;
}

function EndView({ vendor, endView, setShowEnd, showEnd }: EndView) {
  const shopStyle = vendor.vendor.chosenShopStyle.split('/')[3]

  return (
    <div className="h-full w-auto absolute z-30 top-0"
      style={{
        opacity: showEnd ? "1" : "0",
        transition: "1s ease",
        pointerEvents: showEnd ? "auto" : "none",
      }}
    >
      <Image
        src={endView}
        alt="end view"
        width={3840}
        height={2160}
        className="object-cover h-full"
      />
      {/** Enter the shop button */}
      <div
        onClick={() => setShowEnd(false)}
        className={shopStyle === "modern" ?`
          absolute z-20
          bottom-[1vw] left-[42vw]
          w-[16vw] h-[10vw]
        `: `
          absolute z-20
          bottom-[3vw] left-[40vw]
          w-[16vw] h-[10vw]
        `}
      >
      </div>
      {
        shopStyle === "classic" ?
        <ClassicEnd vendor={vendor}/> : shopStyle === "modern" ?
        <ModernEnd vendor={vendor}/> : shopStyle === "industrial" ?
        <IndustrialEnd vendor={vendor}/> :
        <CaveEnd vendor={vendor}/>
      }
    </div>
  );
}

export default EndView;