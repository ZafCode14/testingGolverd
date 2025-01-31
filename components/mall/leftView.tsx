import Image from "next/image";
import ModernLeft from "./positions/modern/left";
import ClassicLeft from "./positions/classic/left";
import CaveLeft from "./positions/cave/left";
import IndustrialLeft from "./positions/industrial/left";

interface LeftView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  leftView: string;
  setShowLeft: React.Dispatch<React.SetStateAction<boolean>>;
  showLeft: boolean;
}
function LeftView({ vendor, leftView, setShowLeft, showLeft }:LeftView) {
  const shopStyle = vendor.vendor.chosenShopStyle.split('/')[3]

  return (
    <div className="h-full w-auto absolute z-30 top-0"
    style={{
      opacity: showLeft ? "1" : "0",
      transition: "1s ease",
      pointerEvents: showLeft ? "auto" : "none",
    }}
    >
      <Image
        src={leftView}
        alt="front view"
        width={3840}
        height={2160}
        className="object-cover h-full"
      />      
      {/** Back to Establishing View */}
      <div 
      onClick={() => setShowLeft(false)}
      className={`
        absolute z-20
        bottom-[2vw] left-[42vw]
        w-[16vw] h-[12vw]
      `}>
      </div>
      {
        shopStyle === "classic" ?
        <ClassicLeft vendor={vendor}/> : shopStyle === "modern" ?
        <ModernLeft vendor={vendor}/> : shopStyle === "industrial" ?
        <IndustrialLeft vendor={vendor}/> :
        <CaveLeft vendor={vendor}/>
      }
    </div>
  );
}

export default LeftView;