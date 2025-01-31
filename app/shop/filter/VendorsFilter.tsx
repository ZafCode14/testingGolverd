import { setFloorR, setShowFilterR } from "@/store/filterSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function VendorsFilter() {
  const [gold, setGold] = useState<boolean>(false);
  const [silver, setSilver] = useState<boolean>(false);
  const [raw, setRaw] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (gold) {
      dispatch(setFloorR("gold"));
    } else if (silver) {
      dispatch(setFloorR("silver"));
    } else if (raw) {
      dispatch(setFloorR("raw"));
    } else {
      dispatch(setFloorR(""));
    }
  }, [gold, silver, raw, dispatch])


  const handleFloorChange = (floor: string) => {
    if (floor === "gold") {
      setGold(!gold);
      setSilver(false);
      setRaw(false);
    } else if (floor === "silver") {
      setSilver(!silver);
      setGold(false);
      setRaw(false);
    } else if (floor === "raw") {
      setRaw(!raw);
      setGold(false);
      setSilver(false);
    }
  }

  return (
    <div className='bg-[#2A1C1B] rounded-md flex flex-col h-[400px]'>
      <Image
        alt='gold'
        src={'/images/mall/elevator/goldFloor.png'}
        width={500}
        height={500}
        priority
        onClick={() => {
          handleFloorChange("gold");
          setTimeout(() => dispatch(setShowFilterR(false)), 500);
        }}
        className={`w-full h-auto`}
        style={{
          marginBottom: gold ? "20px" : "0px",
          transition: ".4s ease"
        }}
      />
      <Image
        alt='silver'
        src={'/images/mall/elevator/silverFloor.png'}
        width={500}
        height={500}
        onClick={() => {
          handleFloorChange("silver");
          setTimeout(() => dispatch(setShowFilterR(false)), 500);
        }}
        className={`w-full h-auto`}
        style={{
          marginBottom: silver ? "10px" : "0px",
          marginTop: silver ? "10px" : "0px",
          transition: ".4s ease"
        }}
      />
      <Image
        alt='raw'
        src={'/images/mall/elevator/rawFloor.png'}
        width={500}
        height={500}
        onClick={() => {
          handleFloorChange("raw");
          setTimeout(() => dispatch(setShowFilterR(false)), 500);
        }}
        className={`w-full h-auto`}
        style={{
          marginTop: raw ? "12px" : "0px",
          transition: ".4s ease"
        }}
      />
    </div>
  );
}

export default VendorsFilter;