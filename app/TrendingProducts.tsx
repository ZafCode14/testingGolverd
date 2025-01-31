import Product from "@/components/product";
import { fetchTenProducts, fetchVendors } from "@/lib/api";
export const dynamic = 'force-dynamic'

async function TrendingProducts() {
  const [vendors, products] = await Promise.all([
    fetchVendors(),
    fetchTenProducts(),
  ]);

  if (!vendors || !products) {
    return null
  }

  return (
    <div className="p-3 md:p-10 bg-[#E7E7E7] w-full">
      <div className="flex-col items-center pb-5 md:pb-0 bg-[#F1F1F1] rounded-[10vw] md:rounded-[5vw]">
        <p className="flex justify-center md:block w-full py-10 my-5 md:ml-10 text-[24px] font-bold">
          Trending Products
        </p>

        <div className="w-full">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="w-full md:w-[50%] h-[90vw] md:h-[40vw] flex flex-wrap justify-end items-center">
              {products.slice(0, 4).map((product) => (
                <div key={product.docID} className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                  <Product vendors={vendors} product={product}/>
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/2 md:mt-20 flex items-center">
              {products[4] && (
                <div className="w-[97.5%] h-[90vw] md:h-[40vw] mb-20">
                  <Product vendors={vendors} product={products[4]}/>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex mt-20 mb-20 pb-20 w-full">
          <div className="flex flex-col-reverse md:flex-row-reverse w-full">
            <div className="h-[90vw] md:h-[40vw] w-full md:w-1/2 flex flex-wrap items-center">
              {products.slice(5, 9).map((product) => (
                <div key={product.docID} className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                  <Product vendors={vendors} product={product}/>
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-end mt-20 md:mt-10">
              {products[9] && (
                <div className="w-[97.5%] h-[90vw] md:h-[40vw] mb-20">
                  <Product vendors={vendors} product={products[9]}/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingProducts;