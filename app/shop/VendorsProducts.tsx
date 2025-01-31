"use client";
import Brands from "@/components/brands";
import Products from "@/components/products";
import { Product, Vendor } from "@/lib/types";
import { setProductsR, setVendorsR } from "@/store/dataSlice";
import { setCategoriesR, setSearchR, setShowFilterR, setShowR } from "@/store/filterSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  vendors: Vendor[];
  products: Product[];
}
function VendorsProducts({ vendors, products }: Props) {
  const dispatch = useDispatch();
  const show = useSelector((state: RootState) => state.filter.show);

  useEffect(() => {
    dispatch(setVendorsR(vendors));
    dispatch(setProductsR(products));
    dispatch(setShowR("brand"));
    dispatch(setCategoriesR([]));
    dispatch(setShowFilterR(false));
    dispatch(setSearchR(""));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={`
      w-[1500px] max-w-full
      flex justify-end
      pt-60 md:pt-40
    `}>
      <div className="lg:w-[320px]"></div>
      <div className="flex-1">
        { show === "brand" 
          ? <Brands vendors={vendors}/>
          : <Products products={products}/> 
        }
      </div>
    </div>
  );
}

export default VendorsProducts;