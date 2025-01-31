"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSearchR, setShowFilterR, setShowR } from "@/store/filterSlice";
import { usePathname } from "next/navigation";

function Search() {
  const show = useSelector((state: RootState) => state.filter.show);
  const showFilter = useSelector((state: RootState) => state.filter.showFilter);
  const dispatch = useDispatch();
  const p = usePathname();
  const brandId = p.split('/').pop();

  const search =  useSelector((state: RootState) => state.filter.search);
  return (
    <div className={`
      flex flex-col-reverse md:flex-row 
      w-full 
      lg:pr-0 pt-3
    `}>
      {/** Search */}
      <div className={`
          relative
          bg-[#d8d1cd] w-full 
          flex items-center
          h-[50px] flex-1 rounded-lg mr-3
      `}>
        <Image
          src={'/icons/search.svg'}
          alt={'search icon'}
          width={100}
          height={100}
          priority
          className={`h-[16px] w-auto ml-5`}
        />
        <input 
          name="search field"
          placeholder={show === 'brand' ? "Search brand" : "Search products"} 
          className={`
            ml-2 w-[70%] h-[50px]
            focus:outline-none
            bg-[#d8d1cd] text-black
          `}
          value={search}
          onChange={(e) => dispatch(setSearchR(e.target.value))}
        />
        <Image
          src={'/icons/filter.svg'}
          alt={'filter icon'}
          width={0}
          height={0}
          priority
          onClick={() => dispatch(setShowFilterR(!showFilter))}
          className={`lg:hidden h-[30px] w-auto ml-5 absolute right-5 cursor-pointer`}
        />
      </div>

      {/** Button */}
      {show !== 'brand' && show !== 'product' ?
      <Link href={`/mall?brand=${brandId}`} className="relative">
        <button className={`
          absolute right-0 top-[-70px] mr-2 md:mr-0 md:static
          bg-[#2A1C1B]
          w-[110px] h-[40px] md:w-[200px] md:h-[50px] text-[14px]
          rounded-lg
        `}>Virtual Store</button>
      </Link>
      :
      <p onClick={() => show === "brand" ? dispatch(setShowR("product")) : dispatch(setShowR("brand"))} className={`
        flex justify-center items-center relative self-end md:self-start
        bg-[#2A1C1B]
        w-[200px] h-[50px] text-[14px] mb-3 md:mb-0
        rounded-lg cursor-pointer
      `}>{show === 'brand' ? "Search by Product" : "Search by Brand"}</p>
      }
    </div>
  );
}

export default Search;