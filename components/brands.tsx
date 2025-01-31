"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Vendor } from "@/lib/types";

type Props = {
  vendors: Vendor[];
}
function Brands({ vendors }: Props) {
  const search = useSelector((state: RootState) => state.filter.search);
  const floor = useSelector((state: RootState) => state.filter.floor);

  const filteredBrands = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(search.toLowerCase()) &&
    vendor.chosenShopStyle?.includes(floor)
  );

  return (
    <div className="flex flex-wrap justify-around">
      {
        filteredBrands.map((vendor, index) => {
          return (
            <Link href={`/shop/brand/${vendor.docID}`} key={index} className="w-[200px] max-w-[48%] lg:w-[24%] relative text-black mb-5">
              <div className={`w-full h-[150px] lg:h-[10vw] overflow-hidden flex justify-center items-center bg-[white] rounded-md`}>
                <Image
                  src={vendor.logo}
                  alt={vendor.name}
                  width={500}
                  height={500}
                  priority
                  className={`object-contain h-full w-full`}
                />
              </div>
              <p className="relative font-bold">{vendor.name}</p>
            </Link>
          )
        })
      }
    </div>
  );
}

export default Brands;