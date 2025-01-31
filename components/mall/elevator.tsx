import Image from "next/image";

interface elevProp {
  elev: boolean
  floor: string
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  setFloor: React.Dispatch<React.SetStateAction<string>>;
  setZoomInButton: React.Dispatch<React.SetStateAction<boolean>>;
  setFromTo: React.Dispatch<React.SetStateAction<{from: number, to: number}>>;
  zoomInButton: boolean;
}
function Elevator({ elev, setElev, setFloor, floor, setFromTo, setZoomInButton }: elevProp) {

  return (
    <div onClick={() => setElev(false)} className={`
      absolute z-30 top-0
      flex flex-col justify-center items-center
      w-full h-full pb-10 px-10
    `}
    style={{
      opacity: elev ? "100" : "0",
      transition: "1s ease",
      pointerEvents: elev ? "auto" : "none",
    }}
    >
      <div className={`w-[35%] h-full flex flex-col justify-center items-center`}>
        <Image
          src={"/images/mall/elevator/goldFloor.png"}
          alt="gold"
          width={3000}
          height={3000}
          onClick={() => {
            setFromTo({from: 0, to: 4});
            setZoomInButton(false);
            setElev(prev => !prev);
            setFloor("gold");
          }}
          className={`
            object-cover
            cursor-pointer
            ${floor === "gold" && "mb-5"}
            ${floor !== "gold" && floor !== "raw" && "mb-5"}
          `}
          style={{
            transition: "0.8s ease"
          }}
        />
        <Image
          src={"/images/mall/elevator/silverFloor.png"}
          alt="silver"
          width={3000}
          height={3000}
          onClick={() => {
            setFromTo({from: 0, to: 4});
            setZoomInButton(false);
            setElev(prev => !prev);
            setFloor("silver");
          }}
          className={`
            object-cover
            cursor-pointer
          `}
          style={{
            marginBottom: !elev ? "400px" : "0px",
            marginTop: !elev ? "400px" : "0px",
            transition: "0.8s ease"
          }}
        />
        <Image
          src={"/images/mall/elevator/rawFloor.png"}
          alt="raw"
          width={3000}
          height={3000}
          onClick={() => {
            setFromTo({from: 0, to: 2});
            setZoomInButton(false);
            setElev(prev => !prev);
            setFloor("raw");
          }}
          className={`
            object-cover
            cursor-pointer
            ${floor !== "gold" && floor !== "raw" && "mt-5"}
            ${floor === "raw" && "mt-5"}
          `}
          style={{
            transition: "0.8s ease"
          }}
        />
      </div>
    </div>
  )
}
export default Elevator;