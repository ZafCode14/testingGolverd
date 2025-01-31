"use client";
import { setShowFilterR, setShowR } from "@/store/filterSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";

function BackButton() {
  const dispatch = useDispatch();
  return (
    <Link
      onClick={() => {
        dispatch(setShowR('brand'));
        dispatch(setShowFilterR(false));
      }}
      href={'/shop'}
      className={`
        absolute left-[10%] z-10
        flex justify-center items-center
        text-[40px] w-[80px] h-[80px] rounded-full
        cursor-pointer
        hover:bg-[#e4e4e4]
      `}
    >
      <p className={`text-black mb-[5px]`}>&larr;</p>
    </Link>
  );
}

export default BackButton;