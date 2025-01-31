"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '@/components/loading';
import { useRouter } from 'next/navigation';
import { putWishlist } from '@/components/wishlist/wishlist';
import AddToCart from '@/components/productPage/cart';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import CreateAppointment from '@/app/shop/product/[productId]/components/createAppointment';
import { Product, VendorBranch } from '@/types/products';
import calculatePrice from '@/lib/getPrice';
import { useSwipeable } from 'react-swipeable';

interface Vendor {
  docID: string;
  name: string;
  branchesNew: {[key: string]: VendorBranch}
}

interface ProductPageProps {
    productId: string;
    setShowProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductPage = ({ productId, setShowProduct }: ProductPageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vendor, setVendor] = useState<any | null>(null);
  const [appointment, setAppointment] = useState(false);
  const [cart, setCart] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [totalInStock, setTotalInStock] = useState<number>(0);
  const user = auth.currentUser;
  const router = useRouter();
  const floor = vendor?.chosenShopStyle.split('/')[2];

  const [activePhoto, setActivePhoto] = useState(1);

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

  useEffect(() => {
    const getVendorandProduct = async () => {
      try {
        // Set loading to true at the beginning
        setLoading(true);

        // 1. Get product by product.docID
        const productRef = doc(firestore, "products", productId);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          console.log("No such product!");
          return;
        }

        const productData = productSnap.data() as Product;
        setProduct(productData);

        // 2. Get vendor by product.brandDocID
        const brandDocID = productData.brandDocID;
        const vendorRef = doc(firestore, "vendors", brandDocID);
        const vendorSnap = await getDoc(vendorRef);

        if (!vendorSnap.exists()) {
          console.log("No such vendor!");
          return;
        }

        const vendorData = vendorSnap.data() as Vendor;
        setVendor(vendorData);

      } catch (error) {
        console.error("Error fetching product or vendor:", error);
      } finally {
        // Set loading to false once data fetching is done
        setLoading(false);
      }
    };

    getVendorandProduct();
  }, [productId]);

  const handleUnauthUser = (callback: () => void) => {
    if (!user) {
      router.push('/login');
    } else {
      callback();
    }
  };

  const handleWishlist = () => {
    const userId = user?.uid;
    const productId = product?.docID;

    if (userId && productId) {
      putWishlist(userId, productId);
    }
  };

  const handleAppointment = () => {
    setAppointment(true);
  };

  const handleCart = () => {
    setCart(true);
  };

  if (loading) {
    return <Loading />; // Show loading component while fetching data
  }

  if (product !== null && vendor !== null) {
    return (
      <div className={`flex flex-col items-center w-full h-full bg-[#ececec] rounded-md`}>
        <div className='w-[1200px] max-w-full h-full relative'>
          <p className='mt-2 mb-5 ml-5'>{vendor?.name } / {product.category} / {product.name}</p>
          <p onClick={() => setShowProduct(false)} className='absolute right-5 top-1 text-[24px]'>X</p>
          <div className='flex flex-col md:flex-row  relative px-3 h-[80%]'>
            {/** Product Image */}
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
                    <div key={index} className="w-full h-full flex-shrink-0">
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
                    absolute bottom-2
                    flex flex-col items-center
                    w-full
                  `}>
                    <div className='flex mb-2'>
                      <p onClick={() => handleSwipe('right')} className={`text-[30px] h-[25px] mr-10`}>&larr;</p>
                      <p onClick={() => handleSwipe('left')} className={`text-[30px] h-[25px]`}>&rarr;</p>
                    </div>
                    <p className='text-[#C4A153] text-[12px]'>({activePhoto} / {product.images.length}) images</p>
                  </div>
                }
              </div>
            </div>

            {/** Product description */}
            <div className='px-2 md:px-10 w-full md:w-[60%] h-full flex flex-col items-center justify-between bg-[white] rounded-xl p-5 overflow-y-auto'>
              <div className='flex flex-col items-center w-full justify-between relative'>
                <h2 className='text-[18px] lg:text-[34px] mb-5'>{product.name}</h2>
                <p className='absolute right-0 bottom-[0px] text-[12px] lg:text-[16px]'>{calculatePrice(product, vendor)} EGP</p>
                <p className='absolute right-0 bottom-[-20px] line-through text-gray-400 text-[12px] lg:text-[16px]'>
                  {((calculatePrice(product, vendor) ?? 0) / 100 * 20 + (calculatePrice(product, vendor) ?? 0))} EGP
                </p>
              </div>
              <div className='w-full flex flex-col md:text-center items-center py-5 px-2'>
                <h5 className='font-bold text-[12px] lg:text-[16px]'>Description</h5>
                <p className='text-[12px] lg:text-[16px]'>{product.description}</p>
              </div>
              {/** Virtual Store only Tag */}
              {!vendor.branchesNew[1].active && <p className={`
                text-[#BBA153]
                text-[12px] mb-3
              `}>VSO (Virtual Store Only)</p>}
              <div className='flex justify-between w-full text-white'>
                <div className={`flex lg:flex-col`}>
                  <button onClick={() => handleUnauthUser(handleWishlist)} className={`
                    bg-[#2A1C1B] 
                    text-[10px] lg:text-[16px] 
                    w-[100px] h-[30px]
                    lg:w-[160px] lg:h-[50px]
                    ${floor === "gold" && "mr-3"}
                    rounded-md lg:mr-3
                  `}>Add to Whishlist</button>
                  {
                    totalInStock > 0 && vendor.branchesNew[1].active &&
                    <button onClick={() => handleUnauthUser(handleAppointment)} className={`
                      bg-[#2A1C1B] 
                      text-[10px] lg:text-[16px] 
                      w-[100px] h-[30px]
                      lg:w-[160px] lg:h-[50px]
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
                    text-[10px] lg:text-[16px] 
                    w-[100px] h-[30px]
                    lg:w-[160px] lg:h-[50px]
                    rounded-md
                  `}>Add to Cart</button> : floor !== "gold" &&
                  <p className='text-[red] flex items-center'>Out of Stock</p>
                }
              </div>
            </div>

            { appointment && 
              <CreateAppointment setAppointment={setAppointment} vendor={vendor} product={product}/> 
            }
            { cart && 
            <AddToCart setCart={setCart} product={product}/> 
            }

          </div>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default ProductPage;