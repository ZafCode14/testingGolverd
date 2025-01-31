import Image from "next/image";
import ContinueRawMall from "../continueRawMall";
import { useState } from "react";
import FrontView from "../frontView";

interface PerspectiveProp {
  setZoomInButton: React.Dispatch<React.SetStateAction<boolean>>;
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  floor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p2: any;
  fromTo: {from: number, to: number}
  setFromTo: React.Dispatch<React.SetStateAction<{from: number, to: number}>>;
}

function Perspective2Raw({ fromTo, setFromTo, setZoomInButton,  setElev, floor, p2 }: PerspectiveProp) {
  const [showFrontRaw, setShowFrontRaw] = useState<boolean>(false);
  const allVendors = Object.entries(p2[floor])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, _]) => !key.startsWith("cor"))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([_, value]) => value); 

  return (
    <div className={`
      absolute
      flex justify-center items-center
      h-full w-full
    `}>
        <Image
          src={p2.raw[`corridor${fromTo.from}`]}
          alt="floor plan"
          width={3000}
          height={3000}
          priority
          className={`
            absolute
            object-cover
            w-full
          `}
        />

        {/** Continue mall once */}
        {
          fromTo.to < allVendors.length * 2 &&
          <div className={`
          absolute flex justify-center pointer-events-none
          bottom-[20vw] left-[38vw] overflow-hidden
          w-[22vw] h-[14vw]
          `}>
            <div
              className={`
                min-w-[30vw] h-[10vw] cursor-pointer
              `} 
            >
              <ContinueRawMall/>
            </div>
          </div>
        }

        {/** P2 arrow */}
        <div className={`absolute w-full object-cover`}>
          <Image
            src={`/images/mall/arrows/raw/P2.png`}
            alt="floor plan"
            width={3000}
            height={3000}
            className={`w-full h-full`}
          />
        </div>

        {/** botton for the Elevator */}
        <div className={`
          absolute 
          left-[5vw] bottom-[5vw] 
        `}>
          <button
            onClick={() => setElev((prev) => !prev)}
            className={`
              h-[40vw] w-[30vw] 
              cursor-pointer
            `}
          ></button>
        </div>

        {/** botton for the backwards arrow P2 */}
        <div className={`
          absolute bottom-[2vw] left-[42vw]
        `}>
          <button
            onClick={() => {
              setZoomInButton(false);
            }}
            className={`
              w-[12vw] h-[12vw] cursor-pointer
            `} 
          ></button>
        </div>

        {/** botton go to next set of perspectives */}
        {
          fromTo.to < allVendors.length * 2 &&
          <div className={`
            absolute bottom-[10vw] left-[42vw]
          `}>
            <button
              onClick={() => {
                setZoomInButton(false);
                setFromTo({from: fromTo.to, to: fromTo.to + 2})
              }}
              className={`
                w-[12vw] h-[8vw] cursor-pointer
              `} 
            ></button>
          </div>
        }


        {/** botton for the right close vendor */}
        {
          p2.raw[`vendor${fromTo.from + 2}`] && 
          <div className={`
            absolute bottom-[5vw] right-[4vw]
          `}>
            <button
              onClick={() =>{
                setShowFrontRaw(true);
              }}
              className={`
                w-[38vw] h-[50vw] cursor-pointer
              `} 
              style={{
                clipPath: "polygon(15% 39%, 100% 0%, 100% 100%, 0 95%)"
              }}
              disabled={!p2.raw[`vendor${fromTo.from + 2}`].frontView}
            ></button>
          </div>
        }

        {p2.raw[`vendor${fromTo.from + 2}`] &&
          <FrontView
            vendor={p2.raw[`vendor${fromTo.from + 2}`] || {mallView: `/images/mall/perspective2/raw/i.jpeg`}}
            frontView={p2.raw[`vendor${fromTo.from + 2}`].frontView}
            setShowFront={setShowFrontRaw}
            showFront={showFrontRaw}
          />
        }
    </div>
  );
}

export default Perspective2Raw;