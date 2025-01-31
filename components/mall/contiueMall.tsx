import Image from "next/image";
import Vendor from "./vendor";

interface Props {
  floor: string;
  p1: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  fromTo: { from: number; to: number };
}

function ContinueMall({ floor, p1, fromTo }: Props) {
  let vendorSet: any = []; // eslint-disable-line @typescript-eslint/no-explicit-any

  if (p1) {
    const vendors = Object.values(p1?.[floor]).slice(1);
    vendorSet = vendors.slice(fromTo.from + 4, fromTo.to + 4);
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={`/images/mall/perspective1/${floor}/corridor.jpeg`}
        alt="floor plan"
        width={3840}
        height={2160}
        priority
        className="absolute w-full object-cover"
      />

      <Vendor
        vendor={vendorSet[0] || { mallView: `/images/mall/perspective1/${floor}/classic1.png` }}
        floor={floor}
        bannerClassName={`
          absolute 
          top-[25%] right-[10%]
          w-[20%] h-[7%]
          flex justify-center 
        `}
        bannerStyle={{
          transform: "skewY(-22deg)",
        }}
        buttonClassName={`absolute top-[-49%] right-[4%] w-[32%] h-[35%] cursor-pointer z-10`}
        buttonStyle={{
          clipPath: "polygon(15% 39%, 100% 0%, 100% 100%, 0 95%)",
        }}
      />

      <Vendor
        vendor={vendorSet[1] || { mallView: `/images/mall/perspective1/${floor}/classic2.png` }}
        floor={floor}
        bannerClassName={`
          absolute 
          top-[28%] left-[20%]
          w-[12%] h-[7%] 
          flex justify-center
          `}
        bannerStyle={{
          transform: "skewY(21deg)",
        }}
        buttonClassName={`absolute top-[-48.5%] left-[4%] w-[32%] h-[35%] cursor-pointer opacity-[0.4] z-10`}
        buttonStyle={{
          clipPath: "polygon(0% 0, 60% 30%, 100% 90%, 0 100%)",
        }}
      />

      <Vendor
        vendor={vendorSet[2] || { mallView: `/images/mall/perspective1/${floor}/classic3.png` }}
        floor={floor}
        bannerClassName={`
          absolute 
          top-[35%] right-[32.5%]
          w-[5%] h-[3%] 
          flex justify-center
        `}
        bannerStyle={{
          transform: "skewY(-20deg)",
        }}
        buttonClassName={`absolute top-[-36%] right-[32%] w-[7%] h-[15%] cursor-pointer z-10`}
        buttonStyle={{
          clipPath: "polygon(0% 25%, 100% 0%, 100% 100%, 0 85%)",
        }}
      />

      <Vendor
        vendor={vendorSet[3] || { mallView: `/images/mall/perspective1/${floor}/classic4.png` }}
        floor={floor}
        bannerClassName={`
          absolute 
          top-[40%] left-[37%]
          w-[2.8%] h-[2.3%] 
          flex justify-center
        `}
        bannerStyle={{
          transform: "skewY(21deg)",
        }}
        buttonClassName={`absolute top-[-34%] left-[35%] w-[5%] h-[12%] cursor-pointer z-10`}
        buttonStyle={{
          clipPath: "polygon(0% 0, 100% 20%, 100% 87%, 0 100%)",
        }}
      />
    </div>
  );
}

export default ContinueMall;