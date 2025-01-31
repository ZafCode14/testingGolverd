import Image from "next/image";
import { useState } from "react";
import LeftView from "./leftView";
import EndView from "./endView";
import RightView from "./rightView";
import ModernEnd from "./positions/modern/end";
import ModernMiddle from "./positions/modern/middle";
import ClassicEnd from "./positions/classic/end";
import ClassicMiddle from "./positions/classic/middle";
import ClassicCenter from "./positions/classic/center";
import IndustrialEnd from "./positions/industrial/end";
import CaveMiddle from "./positions/cave/middle";
import IndustrialMiddle from "./positions/industrial/middle";
import CaveEnd from "./positions/cave/end";

interface MiddleView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  middleView: string;
  setShowMiddle: React.Dispatch<React.SetStateAction<boolean>>;
  showMiddle: boolean;
}
function MiddleView({ vendor, middleView, setShowMiddle, showMiddle }:MiddleView) {
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showEnd, setShowEnd] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(false);

  const shopStyle = vendor.vendor.chosenShopStyle.split('/')[3]

  return (
    <div className="h-full w-auto absolute z-30 top-0"
    style={{
      opacity: showMiddle ? "1" : "0",
      transition: "1s ease",
      pointerEvents: showMiddle ? "auto" : "none",
    }}
    >
      <LeftView
        vendor={vendor}
        leftView={vendor.leftView}
        showLeft={showLeft}
        setShowLeft={setShowLeft}
      />
      <EndView
        vendor={vendor}
        endView={vendor.endView}
        showEnd={showEnd}
        setShowEnd={setShowEnd}
      />
      <RightView
        vendor={vendor}
        rightView={vendor.rightView}
        showRight={showRight}
        setShowRight={setShowRight}
      />

      <div className="h-full w-full" style={{
        scale: showEnd || showLeft || showRight ? "150%" : "100%", // Only scale
        transformOrigin: showLeft
          ? "left center" // Zoom from the left
          : showRight
          ? "right center" // Zoom from the right
          : "center", // Zoom from the center (end view)
        transition: "1s ease",
      }}>
        <Image
          src={middleView}
          alt="front view"
          width={3840}
          height={2160}
          className="object-cover h-full"
        />      
        {/** Go To the Left view */}
        <div onClick={() => setShowLeft(true)}
        className={`
          absolute z-20 
          bottom-[8vw] left-[8vw]
          h-[10vw] w-[10vw]
        `}> </div>

        {/** Go To the Center view */}
        <div onClick={() => setShowEnd(true)}
        className={shopStyle === "modern" ? `
          absolute z-20 
          top-[9vw] left-0
          h-[23vw] w-full
        ` : `
          absolute z-20 
          top-[13vw] left-[20vw]
          h-[18vw] w-[60vw]
        `}></div>

        {/** Go To the Right view */}
        <div onClick={() => setShowRight(true)}
        className={shopStyle === "modern" ? `
          absolute z-20 
          bottom-[8vw] right-[16vw]
          h-[10vw] w-[10vw]
        ` : `
          absolute z-20 
          bottom-[8vw] right-[10vw]
          h-[10vw] w-[10vw]
        `}></div>

        {/** Go back to Fron View */}
        <div 
        onClick={() => setShowMiddle(false)}
        className={shopStyle === "modern" ? `
          absolute z-20
          bottom-[3vw] left-[42vw]
          w-[16vw] h-[12vw]
        ` : `
          absolute z-20
          bottom-[1vw] left-[42vw]
          w-[16vw] h-[12vw]
        `}>
        </div>

        {/** Display The End Items */}
        {
        shopStyle === "classic" ?
          <div className="relative top-[-11.5vw] right-[0.2vw]" style={{
            scale: "55%",
          }}>
            <ClassicEnd vendor={vendor}/>
          </div> : shopStyle === "modern" ?
          <div className="relative top-[-12.8vw] right-[2.8vw]" style={{
            scale: "60%",
          }}>
            <ModernEnd vendor={vendor}/>
          </div> : shopStyle === "industrial" ?
          <div className="relative top-[-12.8vw] right-[1.3vw]" style={{
            scale: "49%",
          }}>
            <IndustrialEnd vendor={vendor}/>
          </div> :
          <div className="relative top-[-9.5vw] right-[0vw]" style={{
            scale: "63%",
          }}>
            <CaveEnd vendor={vendor}/>
          </div>
        }

        { 
        shopStyle === "classic" &&
          <ClassicCenter vendor={vendor}/>
        }

        {
          shopStyle === "classic" ?
          <ClassicMiddle vendor={vendor}/> : shopStyle === "modern" ?
          <ModernMiddle vendor={vendor}/> : shopStyle === "industrial" ?
          <IndustrialMiddle vendor={vendor}/> :
          <CaveMiddle vendor={vendor}/>
        }
      </div>
    </div>
  );
}

export default MiddleView;