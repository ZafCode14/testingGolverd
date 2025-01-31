"use client";
import { Product, Vendor } from "@/lib/types";
import { setProductsR, setVendorsR } from "@/store/dataSlice";
import { setCategoriesR, setSearchR, setShowFilterR, setShowR } from "@/store/filterSlice";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  vendor: Vendor;
  products: Product[];
}
function VendorImage({ vendor, products }: Props) {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setVendorsR([vendor]));
    dispatch(setProductsR(products));
    dispatch(setShowR('none'));
    dispatch(setCategoriesR([]));
    dispatch(setShowFilterR(false));
    dispatch(setSearchR(""));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Image
      src={vendor.logo}
      alt='brand logo'
      width={300}
      height={720}
      priority
      className='h-[70px] lg:h-[110px] object-contain my-5 w-auto relative z-10'
    />
  );
}

export default VendorImage;