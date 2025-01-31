import Image from "next/image";
import { useState } from "react";
import MiddleView from "./middleView";
import ModernFront from "./positions/modern/front";
import ClassicFront from "./positions/classic/front";
import IndustrialFront from "./positions/industrial/front";
import CaveFront from "./positions/cave/front";

interface FrontView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  frontView: string;
  setShowFront: React.Dispatch<React.SetStateAction<boolean>>;
  showFront: boolean;
}
function FrontView({ vendor, frontView, setShowFront, showFront }:FrontView) {
  const [showMiddle, setShowMiddle] = useState<boolean>(false);
  const shopStyle = vendor.vendor.chosenShopStyle.split('/')[3];

  return (
    <div className="h-full w-full absolute z-30 top-0"
    style={{
      opacity: showFront ? "1" : "0",
      transition: "1s ease",
      pointerEvents: showFront ? "auto" : "none",
    }}
    >
      <div className="w-full h-full" 
      style={{
        scale: showMiddle ? "150%" : "100%",
        transition: "1s ease",
      }}>
        <Image
          src={frontView}
          alt="front view"
          width={3840}
          height={2160}
          className="object-cover h-full"
          priority
        />      
        {/** Enter the shop button */}
        <div 
        onClick={() => setShowMiddle(true)}
        className={shopStyle === "modern" ? `
          absolute
          top-[16vw] left-[2vw]
          w-[30vw] h-[8vw]
          z-20
        ` : `
          absolute
          top-[21vw] left-[35vw]
          w-[30vw] h-[8vw]
          z-20
        `}>
        </div>
        {/** Exit the shop button */}
        <div 
        onClick={() => setShowFront(false)}
        className={shopStyle === "modern" ? `
          absolute z-20
          bottom-[4vw] left-[10vw]
          w-[15vw] h-[12vw]
        ` : `
          absolute z-20
          bottom-[4vw] left-[43vw]
          w-[15vw] h-[12vw]
        `}>
        </div>
        {
          shopStyle === "classic" ?
          <ClassicFront vendor={vendor}/> :
          shopStyle === "modern" ?
          <ModernFront vendor={vendor}/> :
          shopStyle === "cave" ?
          <CaveFront vendor={vendor}/> :
          <IndustrialFront vendor={vendor}/>
        }
      </div>
      <MiddleView
        vendor={vendor}
        middleView={vendor.middleView}
        showMiddle={showMiddle}
        setShowMiddle={setShowMiddle}
      />
    </div>
  );
}

export default FrontView;