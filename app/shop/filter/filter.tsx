"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import VendorsFilter from "./VendorsFilter";
import ProductsFilter from "./ProductsFilter";
import { setShowFilterR } from "@/store/filterSlice";
import { usePathname } from "next/navigation";

function Filter() {
  const show = useSelector((state: RootState) => state.filter.show);
  const showFilter = useSelector((state: RootState) => state.filter.showFilter);
  const p = usePathname();

  const dispatch = useDispatch();

  return (
    <div className={`
      absolute left-0 top-0 lg:static
      h-[100vh] w-[100vw] lg:mr-5 pt-3
      flex justify-center items-center 
      backdrop-blur-md
      lg:w-auto lg:h-auto
      ${!showFilter ? "pointer-events-none hidden lg:block lg:pointer-events-auto" : "pointer-events-auto"}
    `} onClick={() => dispatch(setShowFilterR(false))}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className={`w-[300px] lg:mt-32`}>
          {show === 'brand' && !p.startsWith('/shop/brand')
            ? <VendorsFilter/> 
            : <ProductsFilter/>
          }
        </div>
      </div>
    </div>
  );
}
export default Filter;