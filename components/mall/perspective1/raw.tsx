import Image from "next/image";
import ContinueRawMall from "../continueRawMall";
import { useState } from "react";
import FrontView from "../frontView";
import Perspective2Raw from "../perspective2/raw";

interface PerspectiveProp {
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  setZoomInButton: React.Dispatch<React.SetStateAction<boolean>>;
  zoomInButton: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p1: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p2: any;
  floor: string;
  fromTo: {from: number, to: number}
  setFromTo: React.Dispatch<React.SetStateAction<{from: number, to: number}>>;
}

function Perspective1Raw({ fromTo, setFromTo, zoomInButton, setZoomInButton,  setElev, floor, p1, p2 }: PerspectiveProp) {
  const [activeVendor, setActiveVendor] = useState(1);
  const [showFrontRaw, setShowFrontRaw] = useState<boolean>(false);
  const vendors = Object.entries(p1[floor])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, _]) => !key.startsWith("cor"))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([_, value]) => value); 

  return (
    <div
      className={`relative h-[50vw] w-full flex justify-center items-center overflow-hidden`}
    >
      {/** Perspective 2 */}
      <div className={`
        w-full h-full flex justify-center items-center relative
      `}>
        <Perspective2Raw 
          setZoomInButton={setZoomInButton}
          p2={p2}
          fromTo={fromTo}
          setFromTo={setFromTo}
          setElev={setElev}
          floor={floor}
        />
      </div>

      <div className="absolute h-full w-full flex items-center justify-center"
      style={{
        scale: zoomInButton ? "160%" : "100%",
        opacity: zoomInButton ? "0" : "1",
        transition: "1s ease",
        pointerEvents: !zoomInButton ? "auto" : "none",
      }}
      >
        <Image
          src={p1.raw[`corridor${fromTo.to / 2}`]}
          alt="floor plan"
          width={3000}
          height={3000}
          priority
          className={`absolute w-full object-cover`}
        />

        {/** Continue mall once */}
        {
          fromTo.to < vendors.length &&
          <div className={`
            absolute flex justify-center pointer-events-none
            bottom-[20vw] left-[42vw] overflow-hidden
            w-[15vw] h-[14vw]
          `}>
            <div
            className={`
              min-w-[34vw] h-[10vw] cursor-pointer
            `} 
            >
              <ContinueRawMall/>
            </div>
          </div>
        }

        {/** P1 arrow */}
        <div className={`absolute w-full object-cover top-0 right-0`}>
          <Image
            src={`/images/mall/arrows/raw/P1.png`}
            alt="floor plan"
            width={3000}
            height={3000}
            className={`w-full h-full`}
          />
        </div>

        {/** botton for the Elevator */}
        <div className={`
          absolute 
          left-[30vw] top-[10vw] 
        `}>
          <button
            onClick={() => setElev((prev) => !prev)}
            className={`
              h-[25vw] w-[10vw] 
              cursor-pointer
            `}
          ></button>
        </div>

        {/** botton for the forward arrow P1 */}
        <div className={`
          absolute bottom-[10vw] left-[40vw]
        `}>
          <button
            onClick={() => {
              setZoomInButton(prev => !prev);
            }}
            className={`
              w-[15vw] h-[12vw] cursor-pointer
            `} 
          ></button>
        </div>

        {/** button go to the prev set */}
        {
          fromTo.from != 0 &&
          <div className={`
            absolute 
            bottom-[0vw] left-[40vw]
          `}>
            <button
              onClick={() => {
                setZoomInButton(prev => !prev);
                setFromTo({from: fromTo.from - 2, to: fromTo.from})
              }}
              className={`
                w-[15vw] h-[12vw] cursor-pointer
                bg-[red]
              `} 
            ></button>
          </div>
        }

        {/** botton for the right close vendor */}
        {
          p1.raw[`vendor${fromTo.from + 1}`] && 
          <div className={`
              absolute bottom-[5vw] right-[5vw]
          `}>
            <button
              onClick={() =>{
                setActiveVendor(1);
                setShowFrontRaw(true);
              }}
              className={`
                w-[34vw] h-[50vw] cursor-pointer
              `} 
              style={{
                clipPath: "polygon(15% 39%, 100% 0%, 100% 100%, 0 95%)"
              }}
              disabled={!p1.raw[`vendor${fromTo.from + 1}`].frontView}
            ></button>
          </div>
        }

        {/** botton for the right far vendor */}
        {
          p1.raw[`vendor${fromTo.from + 2}`] &&
          <div className={`
            absolute bottom-[18vw] right-[36vw]
          `}>
            <button
              onClick={() => {
                setActiveVendor(2);
                setShowFrontRaw(true)
              }}
              className={`
                w-[7vw] h-[14vw] cursor-pointer
              `} 
              disabled={!p1.raw[`vendor${fromTo.from + 2}`].frontView}
            ></button>
          </div>
        }

        {
          p1.raw[`vendor${fromTo.from + activeVendor}`] &&
          <FrontView 
            vendor={p1.raw[`vendor${fromTo.from + activeVendor}`] || {mallView: `/images/mall/perspective1/raw/C-I.jpeg`}}
            frontView={p1.raw[`vendor${fromTo.from + activeVendor}`].frontView}
            setShowFront={setShowFrontRaw}
            showFront={showFrontRaw}
          />
        }
      </div>
    </div>
  );
}

export default Perspective1Raw;