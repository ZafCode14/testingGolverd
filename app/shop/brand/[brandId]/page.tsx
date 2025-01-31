import Products from '@/components/products';
import Search from '@/app/shop/filter/search';
import VendorImage from './vendorImage';
import { getVendorAndProductsByVendorId } from '@/lib/api';
import Filter from '../../filter/filter';
import BackButton from './BackButton';

type Props = {
  params: { 
    brandId: string;
  };
}

const Page = async ({ params }: { params: Promise<{ brandId: string }> }) => {
  const parameters = await params;
  const vendorId = parameters.brandId;
  const {vendor, products} = await getVendorAndProductsByVendorId(vendorId);

  if (!vendor || !products){
    return null
  }

  return (
    <main className={`
      flex flex-col items-center w-full text-white 
      pt-[40px] md:pt-[120px] lg:pt-[160px]
    `}>
      <div className={`
        fixed top-0 right-0 z-10
        flex flex-col items-center
        w-full
      `}>
        <div className='relative mt-[80px] w-full flex justify-center items-center'>
          <div className={`
            absolute top-0
            w-full h-[120%]
            backdrop-blur-md
          `}></div>
          <VendorImage vendor={vendor} products={products}/>
          <BackButton/>
        </div>
        <div className={`
          relative
          flex md:h-[60px]
          w-[1500px] max-w-full px-3
        `}>
          <div className={`absolute w-full lg:w-auto lg:static top-[-100px] right-0 h-full`}>
            <Filter/>
          </div>
          <Search />
        </div>
      </div>

      <div className={`
        w-[1500px] max-w-full
        flex justify-center
        pt-60 md:pt-40
      `}>
        <div className="lg:w-[420px]"></div>
        <div className={`
          relative flex items-start justify-center
          w-full px-3
        `}>
          <Products products={products}/>
        </div>
      </div>
    </main>
  );
};

export default Page;