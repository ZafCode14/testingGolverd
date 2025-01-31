import Image from "next/image";
import FrontView from "./frontView";
import { useState } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  buttonClassName: string;
  buttonStyle: {[key: string]: string}
  bannerClassName: string;
  bannerStyle: {[key: string]: string}
  floor: string
}
function Vendor({ vendor, buttonClassName, buttonStyle, bannerClassName, bannerStyle }: Props) {
  const [showFront, setShowFront] = useState<boolean>(false);
  if (vendor) {
  return (
    <div className={`absolute w-full object-cover`}>
      <Image
        src={vendor.mallView}
        alt="floor plan"
        width={3840}
        height={2160}
        priority
      />
      {
        vendor?.banner &&
        <div className={bannerClassName} style={bannerStyle}>
          <Image
            src={vendor.banner}
            alt="floor plan"
            width={3840}
            height={2160}
            className={`w-full h-full object-contain`}
            priority
          />
        </div>
      }
      {/** botton for the right close vendor */}
      <div className="relative">
        <button
          onClick={() => setShowFront(true)}
          className={buttonClassName} 
          style={buttonStyle}
          disabled={!vendor.frontView}
        ></button>
      </div>
      
      {vendor.vendor &&
        <FrontView
          vendor={vendor}
          frontView={vendor.frontView}
          showFront={showFront}
          setShowFront={setShowFront}
        />
      }
    </div>
  );

  }
}

export default Vendor;