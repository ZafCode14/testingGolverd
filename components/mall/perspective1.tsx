import Perspective1Raw from "./perspective1/raw";
import GoldSilverPerspective1 from "./perspective1/goldSilver";

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

function Perspective1({ fromTo, setFromTo, zoomInButton, setZoomInButton,  setElev, floor, p1, p2 }: PerspectiveProp) {
  if (floor === "raw") {
    return (
      <Perspective1Raw
          zoomInButton={zoomInButton}
          setZoomInButton={setZoomInButton}
          p2={p2}
          p1={p1}
          fromTo={fromTo}
          setFromTo={setFromTo}
          setElev={setElev}
          floor={floor}
      />
    );
  }

  return (
    <GoldSilverPerspective1
      zoomInButton={zoomInButton}
      setZoomInButton={setZoomInButton}
      p2={p2}
      p1={p1}
      fromTo={fromTo}
      setFromTo={setFromTo}
      setElev={setElev}
      floor={floor}
    />
  );
}
export default Perspective1;