"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Define types for product and cart items
interface Product {
  name: string;
  price: number;
  images: string[];
}

interface CartItem {
  product: Product;
  amount: number;
}

function Page() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to get cart items from localStorage with proper type handling
  const getCartItems = (): CartItem[] => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(cart);
        if (Array.isArray(parsedCart)) {
          return parsedCart.map((item) => {
            const { product, amount } = item;
            return { product, amount };
          });
        }
      } catch (error) {
        console.error("Error parsing cart items from localStorage", error);
      }
    }
    return [];
  };

  useEffect(() => {
    // Fetch cart items from localStorage when the component mounts
    const items = getCartItems();
    setCartItems(items);
  }, []);

  // Function to update item quantity in the cart
  const updateAmount = (index: number, newAmount: number) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];

      if (newAmount > 0) {
        updatedItems[index].amount = newAmount; // Update the amount if it's greater than 0
      } else {
        // If the new amount is 0, remove the item from the cart
        updatedItems.splice(index, 1); // Remove the item at the specified index
      }

      // Update localStorage with the modified cart
      localStorage.setItem("cart", JSON.stringify(updatedItems));

      // Manually dispatch a custom event to notify other components of cart changes
      setTimeout(() => {
        window.dispatchEvent(new Event("cart-updated"));
      }, 100);

      // Return the updated items
      return updatedItems;
    });
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.amount,
    0
  );

  // Define gem discount (e.g., 10% discount)
  const gemDiscount = subtotal * 0.1; // 10% discount

  // Define flat delivery fee
  const deliveryFee = 50; // Flat delivery fee in EGP

  // Calculate total price after discount and adding delivery fee
  const totalPrice = subtotal - gemDiscount + deliveryFee;

  return (
    <main className="flex justify-center bg-[#FFFFFF] h-[100vh] overflow-hidden">
      {
        cartItems.length > 0 ?
          <div className="flex-col w-full lg:mx-32 mx-5 h-full mt-32">
            <p>Items({cartItems.length})</p>
            <div className="flex flex-col lg:flex-row w-full h-full">
              {/* All Items */}
              <div className="flex flex-col lg:w-[65%] w-full bg-[#F1F1F1] rounded-md overflow-y-scroll lg:h-[70%] mb-5">
                {cartItems.map(({ product, amount }, index) => (
                  <div
                    key={index}
                    className="flex bg-[#FFFFFC80] items-center justify-between my-2"
                  >
                    <Image
                      alt="product image"
                      src={product.images[0]}
                      width={80}
                      height={80}
                      priority
                      className="h-[100px] w-[100px] object-contain ml-5"
                    />
                    <p>{product.name}</p>
                    <p>{product.price} EGP</p>
                    <div className="flex items-center">
                      {/* Decrease amount */}
                      <div
                        onClick={() => {
                          updateAmount(index, amount > 0 ? amount - 1 : amount)
                        }
                        }
                        className="w-[20px] h-[20px] rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
                      >
                        <p className="mb-1">-</p>
                      </div>

                      <p className="mx-2">{amount}</p>

                      {/* Increase amount */}
                      <div
                        onClick={() => updateAmount(index, amount + 1)}
                        className="w-[20px] h-[20px] rounded-full bg-gray-300 flex items-center justify-center mr-5 cursor-pointer"
                      >
                        <p className="mb-[2px]">+</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="w-full lg:w-[35%] flex flex-col items-center">
                <div className="flex flex-col lg:ml-5 w-full bg-[#F1F1F1] p-5 rounded-md justify-center">
                  {/* Sub Total */}
                  <div className="flex justify-between mb-4 text-[20px]">
                    <p>Subtotal</p>
                    <p>{subtotal.toFixed(2)} EGP</p>
                  </div>

                  {/* Gem Discount */}
                  <div className="flex justify-between mb-4">
                    <p>Gem Discount</p>
                    <p>-{gemDiscount.toFixed(2)} EGP</p>
                  </div>

                  {/* Delivery */}
                  <div className="flex justify-between mb-4">
                    <p>Delivery</p>
                    <p>{deliveryFee} EGP</p>
                  </div>

                  <div className="border-b border-[#c9c9c9] mb-4"></div>

                  {/* Total */}
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total Price</p>
                    <p>{totalPrice.toFixed(2)} EGP</p>
                  </div>
                </div>

                <Link href={'/checkout'} className="mt-10 py-3 w-[200px] bg-[#BF9944] text-white rounded-md flex justify-center">Checkout</Link>
              </div>

            </div>
          </div>
        :
        <div className="mt-[20%] flex flex-col items-center">
          <p className="text-[#BF9944]">There are no Items in the cart</p>
          <Link href={'/shop?show=product'} className="text-[#85563C] underline">Shop Now</Link>
        </div>
      }
    </main>
  );
}

export default Page;