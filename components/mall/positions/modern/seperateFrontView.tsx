import Image from "next/image";
import { useState } from "react";
import MiddleView from "../../middleView";
import ModernFront from "./front";
import ClassicFront from "../classic/front";
import { usePathname, useRouter } from "next/navigation";

interface FrontView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  frontView: string;
}
function SeperateFrontView({ vendor, frontView }:FrontView) {
  const [showMiddle, setShowMiddle] = useState<boolean>(false);
  const shopStyle = vendor.vendor.chosenShopStyle.split('/')[3];
  const router = useRouter();
  const p = usePathname();

  return (
    <div className="h-full w-full absolute z-30 top-0"
    style={{
      transition: "1s ease",
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
          width={2000}
          height={2000}
          className="object-cover h-full"
        />      
        {/** Enter the shop button */}
        <div 
        onClick={() => setShowMiddle(true)}
        className={`
          absolute
          top-[5vw] left-0
          w-full h-[38vw]
          z-20
        `}>
        </div>

        {/** Exit */}
        <div 
        onClick={() => router.push(p.startsWith('/insta') ? `/insta/brand/${vendor.vendor.docID}` : `/shop/brand/${vendor.vendor.docID}`)}
        className={`
          absolute z-20 cursor-pointer
          bottom-0 left-0
          bg-red
          w-full h-[12vw]
        `}>
        </div>

        {
          shopStyle === "classic" ?
          <ClassicFront vendor={vendor}/> :
          <ModernFront vendor={vendor}/>
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

export default SeperateFrontView;