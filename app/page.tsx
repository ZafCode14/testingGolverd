import Image from "next/image";
import Link from "next/link";
import TrendingProducts from "./TrendingProducts";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      {/** Hero Section */}
      <div className="flex h-[400px] w-full mt-[80px]">
        <div className="h-full w-full md:w-1/2 relative flex justify-center items-end">
          <Image
            src={'/images/hero2.png'}
            alt="hero image"
            width={1080}
            height={720}
            priority
            className="absolute w-full h-full object-cover"
          />
          <div className="relative text-white flex flex-col justify-center items-center">
            <h2 className="text-[18px] md:text-[22px] font-bold">Experience Something New</h2>
            <h2 className="md:hidden text-[18px] md:text-[22px] font-bold">All Your Favorite Brands In One Place</h2>
            <div className="flex">
              <Link href={"/mall"} className="text-[14px] bg-[#2A1C1B] w-[150px] md:w-[180px] h-[44px] rounded-[4px] mb-12 mt-2 flex justify-center items-center">
                Shop in Mall
              </Link>
              <Link href={"/shop?show=brand"} className="md:hidden text-[14px] bg-[#2A1C1B] w-[150px] md:w-[180px] h-[44px] rounded-[4px] mb-8 mt-2 ml-3 flex justify-center items-center">
                Shop by Brand
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:flex h-full w-1/2 relative flex-col justify-end">
          <Image
            src={'/images/hero1.png'}
            alt="hero image"
            width={1080}
            height={720}
            className="absolute w-full h-full object-cover"
          />
          <div className="relative text-white flex flex-col justify-center items-center">
            <h2 className="text-[22px] font-bold">All Your Favorite Brands In One Place</h2>
            <Link href={"/shop?show=brand"} className="text-[14px] bg-[#2A1C1B] w-[180px] h-[44px] rounded-[4px] mb-12 mt-2 flex justify-center items-center">Shop by Brand</Link>
          </div>
        </div>
      </div>

      <TrendingProducts/>
    </main>
  );
}