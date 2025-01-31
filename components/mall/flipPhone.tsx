import Image from "next/image";
import { usePathname } from "next/navigation";

function FlipPhone() {
  const p = usePathname();

  return (
    <div className={`
      fixed z-20 top-0 right-0
      w-full h-screen 
      flex items-center justify-center 
      backdrop-blur-md
    `}>
      <Image
        alt="flip phone"
        src={"/images/mall/mall.png"}
        width={400}
        height={400}
        className={`
          absolute rotate-90 
          min-w-[100vh] h-[100vw] 
          ${p.startsWith('/insta') ? "pl-0" : "pl-[70px]"}
          object-cover blur-md
        `}
      />
      <Image
        alt="flip phone"
        src={"/images/flipPhone/arrowLeft.png"}
        width={400}
        height={400}
        className={`absolute`}
      />
      <Image
        alt="flip phone"
        src={"/images/flipPhone/arrowRight.png"}
        width={400}
        height={400}
        className={`absolute`}
      />
      <Image
        alt="flip phone"
        src={"/images/flipPhone/g.png"}
        width={400}
        height={400}
        className={`absolute`}
      />
      <Image
        alt="flip phone"
        src={"/images/flipPhone/line.png"}
        width={400}
        height={400}
        className={`absolute`}
      />
      <Image
        alt="flip phone"
        src={"/images/flipPhone/mobile.png"}
        width={400}
        height={400}
        className={`absolute`}
        priority
      />
      <Image
        alt="flip phone"
        src={"/images/flipPhone/rotate.png"}
        width={400}
        height={400}
        className={`absolute`}
      />
    </div>
  );
}

export default FlipPhone;