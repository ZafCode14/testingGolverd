"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSwipeable } from 'react-swipeable';
import { Product, Vendor } from "@/lib/types";
import { useDispatch } from "react-redux";
import { setProductsR, setVendorsR } from "@/store/dataSlice";
import { setCategoriesR, setSearchR, setShowFilterR, setShowR } from "@/store/filterSlice";

type Props = {
  product: Product;
  products: Product[];
  vendor: Vendor;
}
function ProductMainImage({ product, vendor, products }: Props) {
  const [activePhoto, setActivePhoto] = useState(1);

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


  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActivePhoto((prev) => (prev + 1 > product.images.length ? 1 : prev + 1));
    } else if (direction === 'right') {
      setActivePhoto((prev) => (prev - 1 < 1 ? product.images.length : prev - 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true,
  });

  return (
    <div className={`
      h-full w-full md:w-[40%] 
      overflow-hidden flex items-center justify-center 
      bg-[white] mr-5 rounded-xl mb-5 md:mb-0
    `}>
      <div {...handlers} className="relative overflow-hidden h-full">
        <div
          className="flex transition-transform ease-in-out duration-500 h-full"
          style={{ transform: `translateX(-${(activePhoto - 1) * 100}%)` }}
        >
          {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          product.images.map((photo:any, index:any) => (
            <div key={index} className="w-full flex-shrink-0 h-full">
              <Image
                alt='product image'
                src={photo}
                width={2000}
                height={1080}
                priority
                className='h-full object-contain'
              />
            </div>
          ))}
        </div>
        {/** Photo Navigation */}
        { product.images.length > 1 &&
          <div className={`
            absolute bottom-5
            flex flex-col items-center
            w-full
          `}>
            <div className='flex mb-2'>
              <p onClick={() => handleSwipe('right')} className={`text-[40px] h-[40px] mr-10`}>&larr;</p>
              <p onClick={() => handleSwipe('left')} className={`text-[40px] h-[40px]`}>&rarr;</p>
            </div>
            <p className='text-[#C4A153]'>({activePhoto} / {product.images.length}) images</p>
          </div>
        }
      </div>
    </div>
  );
}

export default ProductMainImage;