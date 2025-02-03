"use client";
import calculatePrice from "@/lib/getPrice";
import { Product as ProductType, Vendor } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Prop = {
  product: ProductType;
  vendors: Vendor[];
}

function Product({ product, vendors }: Prop) {
  const vendor = vendors.find((vendor) => vendor.docID === product.brandDocID);
  const p = usePathname();

  return (
    <Link href={p.startsWith('/insta') ? `/insta/product/${product.docID}` : `/shop/product/${product.docID}`} className="w-full h-full text-black">
      <div className={`w-full h-full object-cover overflow-hidden flex justify-center items-center bg-[white] rounded-md`}>
        {/**
         * 
        <Image
          loading="lazy"
          src={product.images[0]}
          alt={'product image'}
          width={1000}
          height={1000}
          className={`object-contain h-full`}
        />
         */}
      </div>
      <p className="font-bold leading-[16px] mt-[5px]">{product.name}</p>
      <p className="text-[12px]">{vendor?.name || 'Unknown Vendor'}</p> {/* Handle undefined vendor */}
      <p className="text-[12px]">{calculatePrice(product, vendor)} EGP</p>
    </Link>
  );
}

export default Product;