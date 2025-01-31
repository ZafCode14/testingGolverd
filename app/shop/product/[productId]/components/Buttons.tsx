"use client";
import { useEffect, useState } from "react";
import useAuthUser from '@/hooks/user';
import { useRouter } from 'next/navigation';
import { putWishlist } from '@/components/wishlist/wishlist';
import AddToCart from '@/components/productPage/cart';
import CreateAppointment from './createAppointment';
import { Product, Vendor } from "@/lib/types";

type Props = {
  vendor: Vendor;
  product: Product;
}
function Buttons({ vendor, product }: Props) {
  const [theuser] = useAuthUser();
  const [totalInStock, setTotalInStock] = useState<number>(0);
  const [appointment, setAppointment] = useState(false);
  const [cart, setCart] = useState(false);
  const floor = vendor.chosenShopStyle.split('/')[2];
  const router = useRouter();

  useEffect(() => {
    if (product) {
      const totalStock = Object.values(product.branches)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((branch: any) => branch.inStock)
        .reduce((acc, inStock) => acc + inStock, 0);
      setTotalInStock(totalStock);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleUnauthUser = (callback: () => void) => {
    if (!theuser) {
      router.push('/login');
    } else {
      callback();
    }
  }

  const handleWishlist = () => {
    const userId = theuser?.id;
    const productId = product?.docID;

    if (userId && productId) {
      putWishlist(userId, productId);
    }
  }

  const handleAppointment = () => {
    setAppointment(true);
  }

  const handleCart = () => {
    setCart(true);
  }

  return (
    <div className='flex justify-between w-full text-white'>
      <div className={`flex ${floor !== "gold" ? "flex-col" : "flex-row"} lg:flex-row`}>
        <button onClick={() => handleUnauthUser(handleWishlist)} className={`
          bg-[#2A1C1B] 
          text-[12px] lg:text-[16px]
          ${floor === "gold" && "mr-3"}
          w-[140px] h-[50px] lg:w-[160px]
          rounded-md lg:mr-3
        `}>Add to Whishlist</button>
        {
          totalInStock > 0 && vendor.branchesNew[1].active &&
          <button onClick={() => handleUnauthUser(handleAppointment)} className={`
            bg-[#2A1C1B] 
            text-[12px] lg:text-[16px] lg:w-[160px]
            w-[140px] h-[50px]
            rounded-md 
          `}>Book Appointment</button>
        }
      </div>
      {
        floor !== "gold" && totalInStock > 0 ?
        <button onClick={() => handleUnauthUser(handleCart)} className={`
          self-end
          bg-gradient-to-r
          from-[#796640] via-[#C1A875] to-[#796640] 
          text-[12px] lg:text-[16px]
          w-[120px] h-[50px]
          rounded-md
        `}>Add to Cart</button> : floor !== "gold" &&
        <p className='text-[red] flex items-center'>Out of Stock</p>
      }
      { appointment && 
        <CreateAppointment 
          setAppointment={setAppointment} 
          vendor={vendor} 
          product={product}
        /> 
      }
      { cart && 
        <AddToCart 
        setCart={setCart} 
        product={product}
        />
      }
    </div>
  );
}

export default Buttons;