import Products from '@/components/products';
import { getProductAndVendorByProductId } from '@/lib/api';
import calculatePrice from '@/lib/getPrice';
import Buttons from './components/Buttons';
import ProductMainImage from './components/ProductMainIMage';

interface ProductPageProps {
  params: { 
    productId: string;
  };
}

const Page = async ({ params }: ProductPageProps) => {
  const { productId } = await params;
  const { vendor, product, products } = await getProductAndVendorByProductId(productId);

  if (!product || !vendor || !products) {
    return null;
  }

  return (
    <main className={`flex flex-col items-center w-full md:mt-[70px]`}>
      <div className='w-[1200px] max-w-full'>
        <p className='mt-24 mb-5 ml-5'>{vendor?.name } / {product.category} / {product.name}</p>
        <div className='flex flex-col md:flex-row h-[900px] md:h-[500px] relative px-3'>

          {/** Product Main Image */}
          <ProductMainImage
            product={product}
            products={products}
            vendor={vendor}
          />

          <div className='px-2 md:px-10 w-full md:w-[60%] h-full flex flex-col items-center justify-between bg-[white] rounded-xl p-5'>
            <div className='flex flex-col items-center w-full justify-between relative'>
              <h2 className='text-[28px] lg:text-[34px] mb-5'>{product.name}</h2>
              <p className='absolute right-0 bottom-[0px]'>{calculatePrice(product, vendor)} EGP</p>
              <p className='absolute right-0 bottom-[-20px] line-through text-gray-400'>
                {((calculatePrice(product, vendor) ?? 0) / 100 * 20 + (calculatePrice(product, vendor) ?? 0))} EGP
              </p>
            </div>
            <div className='w-full flex flex-col md:text-center items-center py-5 px-2'>
              <h5 className='font-bold'>Description</h5>
              <p>{product.description}</p>
            </div>
            {/** Virtual Store only Tag */}
            {!vendor.branchesNew[1].active && <p className={`
              text-[#BBA153]
              text-[12px]
            `}>VSO (Virtual Store Only)</p>}

            <Buttons
              product={product}
              vendor={vendor}
            />
          </div>

        </div>

        <div className='flex items-center mt-10'>
          <div className='border-t border-gray-400 flex-1'></div>
          <p className='mx-5'>More From {vendor?.name}</p>
          <div className='border-t border-gray-400 flex-1'></div>
        </div>
        <div className='px-2'>
          <Products products={products}/>
        </div>
      </div>
    </main>
  );
}

export default Page;