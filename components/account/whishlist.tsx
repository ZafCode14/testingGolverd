import Link from "next/link";
import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../wishlist/wishlist";
import useAuthUser from "@/hooks/user";
import Loading from "../loading";
import getProductById from "../wishlist/productsById";
import Image from "next/image";
import { fetchVendors } from "@/lib/api";

function Whishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [theuser] = useAuthUser();
  const userId = theuser?.id;

  useEffect(() => {
    try {
      const loadVendors = async () => {
        const fetchedVendors = await fetchVendors();
        setVendors(fetchedVendors);
      }
      loadVendors();
    } catch (error) {
      console.error(error);
    }
  }, [])

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        try {
          const wl = await getWishlist(userId);
          setWishlist(wl);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchWishlist();
  }, [userId]);

  // Fetch products based on wishlist
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading when fetching products
      try {
        const productPromises = wishlist.map(async (productId) => {
          try {
            const product = await getProductById(productId);
            return product;
          } catch (error) {
            console.error(`Error fetching product ${productId}: `, error);
            return null;
          }
        });

        const fetchedProducts = await Promise.all(productPromises);
        setProducts(fetchedProducts.filter(Boolean)); // Remove null products
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false); // End loading after fetching products
      }
    };

    if (wishlist.length > 0) {
      fetchProducts();
    } else {
      setLoading(false); // End loading if there are no wishlist items
    }
  }, [wishlist]);

const deleteWishlist = async (productId: string) => {
  if (userId) {
    try {
      // Remove the product from Firestore
      await removeFromWishlist(userId, productId);

      // Update the local wishlist state by finding and removing the item by index
      setWishlist((prevWishlist) => {
        const index = prevWishlist.indexOf(productId);
        if (index !== -1) {
          const newWishlist = [...prevWishlist];
          newWishlist.splice(index, 1); // Remove the product by index
          return newWishlist; // Return the updated wishlist
        }
        return prevWishlist; // If not found, return the current state
      });

    } catch (error) {
      console.error("Failed to remove product from wishlist:", error);
    }
  }
};

  // Show loading state while fetching
  if (loading) {
    return <Loading />;
  }

  // Render products if they exist
  if (products.length > 0) {
    return (
      <div className="flex justify-center w-full flex-wrap pb-24 overflow-y-auto" style={{
        height: "calc(100vh - 210px)"
      }}>
        {products.map((product, index) => {
          if (!product) return null;
          const brand = vendors.find((vendor) => vendor.docID === product.brandDocID);
          return (
            <div key={index} className="w-[240px] max-w-[48%] h-[180px] md:h-[240px] relative text-black mx-[1%] mb-20">
              <Link href={`/shop/product/${product.docID}`} className="relative w-full h-full object-cover overflow-hidden flex justify-center items-center bg-[white] rounded-md">
                <Image
                  src={product.images[0]}
                  alt={'search icon'}
                  width={400}
                  height={400}
                  priority
                  className="object-contain h-full"
                />
              </Link>
              <p className="relative font-bold leading-[16px] mt-[5px]">{product.name}</p>
              <p className="relative text-[12px]">{brand?.name}</p>
              <p className="relative text-[12px]">{product.price} EGP</p>
              <p onClick={() => deleteWishlist(product.docID)} className="absolute text-[12px] font-bold underline bottom-[-55px] right-0">Remove from wishlist</p>
            </div>
          );
        })}
      </div>
    );
  }

  // Show message when the wishlist is empty
  return (
    <div className="w-full h-[300px] flex flex-col justify-center items-center">
      <p className="text-[#BF9944] mb-1">We’re pretty sure you’ll find something you like!</p>
      <Link href="/shop?show=product" className="text-[#85563C] underline">Shop Now</Link>
    </div>
  );
}

export default Whishlist;