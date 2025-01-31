import { fetchAllProducts, fetchVendors } from "@/lib/api";
import VendorsProducts from "./VendorsProducts";
import Search from "@/app/shop/filter/search";
import Filter from "@/app/shop/filter/filter";
export const dynamic = 'force-dynamic'

async function Page() {
  const vendors =await fetchVendors();
  const products =await fetchAllProducts();

  if (!vendors || !products){
    return null
  }

  return (
    <main className={`
      flex justify-center w-full h-[100vh] text-white
    `}>
      <div className="flex items-start justify-center w-full px-3">
        <div className={`
          fixed top-[80px] z-10
          flex
          w-[1500px] max-w-full px-3
          lg:h-[50px]
        `}>
          <div className={`
            absolute
            w-full h-full
            backdrop-blur-md
          `}></div>
          <Filter/>
          <Search/>
        </div>
        <VendorsProducts
          products={products}
          vendors={vendors}
        />
      </div>
    </main>
  );
}

export default Page;